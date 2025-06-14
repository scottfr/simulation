import { div, plus, minus, eq, lessThan, toNum, PARENT_SYMBOL } from "./formula/Formula.js";
import { TaskQueue, Task } from "./TaskScheduler.js";
import { checkErr, cleanData, formatSimResults, simpleEquation, updateDisplayed } from "./Modeler.js";
import { Material } from "./formula/Material.js";
// eslint-disable-next-line
import { SState, SFlow, SPopulation, SAgent, updateTrigger, SPrimitive } from "./Primitives.js";
import { fn } from "./CalcMap.js";
import { Vector } from "./formula/Vector.js";
import { ModelError } from "./formula/ModelError.js";
import { UnitManager } from "./formula/Units.js";
import Big from "../vendor/bigjs/big.js";

/**
 * @typedef {object} SolverType
 * @property {string=} SolverType.id
 * @property {string=} SolverType.algorithm
 * @property {number=} SolverType.maxLoaded
 * @property {number=} SolverType.RKOrder
 * @property {number=} SolverType.RKPosition
 * @property {boolean=} SolverType.completedFirstPass
 * @property {Material=} SolverType.timeStep
 * @property {Material=} SolverType.userTimeStep
 * @property {import('./Primitives').SStock[]=} SolverType.stocks
 * @property {import('./Primitives').SFlow[]=} SolverType.flows
 * @property {import('./Primitives').SAction[]=} SolverType.actions
 * @property {import('./Primitives').STransition[]=} SolverType.transitions
 * @property {import('./Primitives').SState[]=} SolverType.states
 * @property {import('./Primitives').SPrimitive[]=} SolverType.valued
 * @property {import('./Primitives').SPrimitive[]=} SolverType.displayed
 */


/**
 * @typedef {object} ResultsType
 * @property {number[]=} times
 * @property {string=} timeUnits
 * @property {any=} window
 * @property {ResultsDataType[]=} data
 * @property {boolean=} stochastic
 * @property {string=} error
 * @property {string=} errorSource
 * @property {import("./api/Blocks").Primitive=} errorPrimitive
 * @property {number=} errorLine
 * @property {number=} errorCode
 * @property {function=} value
 * @property {function=} lastValue
 * @property {number=} periods
 * @property {function=} resume
 * @property {function=} setValue
 * @property {Object<string, { indexedNames?: string[], indexedFullNames?: string[], results?: ResultsResultsType[], states?: Set<string>, dataMode?: "auto"|"agents"|"float", data?: ResultsDataType}>=} children
 */

/**
 * @typedef {object} AgentResultsType
 * @property {string} id
 * @property {import("./api/Blocks").Population} item
 * @property {ResultsDataType} data
 * @property {ResultsResultsType} results
 */


/**
 * @typedef {object} ResultsDataType
 */


/**
 * @typedef {object} ResultsResultsType
 */


/**
 * @typedef {object} DisplayInformationType
 * @property {boolean=} populated
 * @property {string[]=} ids
 * @property {string[]=} colors
 * @property {string[]=} headers
 * @property {AgentResultsType[]=} agents
 * @property {{header: string, id: string, type: string}[]=} displayedItems
 * @property {function[]=} renderers
 * @property {string[]=} elementIds
 * @property {ResultsType=} res
 * @property {number[]=} times
 * @property {SPrimitive[]=} objects
 * @property {string[]=} origIds
 * @property {any=} store
 * @property {any=} scripter
 * @property {any[]=} maps
 * @property {any[]=} histograms
 */


export class Simulator {
  constructor() {
    this.resultsWindow = undefined;

    /** @type {function} */
    this.setResultsCallback = undefined;
    /** @type {function} */
    this.setStatusCallback = undefined;

    /** @type {function} */
    this.finished = undefined;

    /** @type {"RUNNING"|"PAUSED"|"TERMINATED"} */
    this.status = undefined;

    /** @type {boolean} */
    this.valueChange = undefined;

    /** @type {import("./Primitives").SState[]} */
    this.transitionPrimitives = undefined;

    /** @type {number} */
    this.timer = undefined;

    /** @type {DisplayInformationType} */
    this.displayInformation = undefined;

    this.randLoc = -1;

    /** @type {import("./api/Model.js").Model} */
    this.model = null;

    this.lastRandPos = -1;

    /** @type {import("./formula/Rand").RandList[]} */
    this.previousRandLists = [];

    /** @type {Set<SPrimitive>} */
    this.valuedPrimitives = new Set();

    // Used to prevent evaluation loops
    /** @type {Set<SPrimitive>} */
    this.evaluatedPrimitives = new Set();

    /** @type {Object<string, Material>} */
    this.distanceCache = {};

    /** @type {number} */
    this.distanceCacheCount = 0;

    /** @type {Object<string, any[]>} */
    this.sliders = {};

    /** @type {Object<string, number>} */
    this.ids = {};

    this.timeToStateMapping = new Map();

    this.idCount = 0;

    this.stochastic = false;

    /** @type {number} */
    this.RKOrder = undefined;

    /** @type {import("./Modeler").SimulationConfigType=} */
    this.config = null;

    /** @type {ResultsType} */
    this.results = undefined;

    /** @type {{ line: number, source: string }} */
    this.evaluatingPosition = null;

    /** @type {Map<import("./formula/Formula.js").PARENT_SYMBOL|string, any>} */
    this.varBank = new Map();

    this.unitManager = new UnitManager();

    /** @type {function} */
    this.random = null;

    /** any[][] */
    this.clusters = null;

    /** @type {string} */
    this.timeUnitsString = null;
  }


  /**
   * @param {import('./Modeler').ModelType} model
   */
  setup(model) {
    this.simulationModel = model;

    this.solversCompletedFirstPass = 0;

    this.timeStart = this.simulationModel.timeStart;
    this.timeLength = this.simulationModel.timeLength;
    this.timePause = this.simulationModel.timePause;
    // @ts-ignore - Big.js is mistyped
    this.timeEnd = new Material(Big(this.timeStart.value).plus(this.timeLength.value).toNumber(), this.timeLength.units);
    this.timeStep = this.simulationModel.solvers.base.timeStep;
    this.userTimeStep = this.simulationModel.solvers.base.userTimeStep;
    this.timeStepCount = Math.floor(this.timeLength.value / this.userTimeStep.value);
    this.timeUnits = this.timeStart.units;
    this.timeUnits.addBase();

    /** @type {Map<string, import("./AggregateSeries").AggregateSeries>} */
    this.aggregateSeries = new Map();

    this.distanceCache = {};

    this.tasks = new TaskQueue({
      start: this.timeStart,
      end: this.timeEnd
    });

  }

  /**
   * @param {string} x
   * @returns {number}
   */
  getID(x) {
    if (!this.ids[x]) {
      this.idCount++;
      this.ids[x] = this.idCount;
    }
    return this.ids[x];
  }

  time() {
    return this.tasks.time.fullClone();
  }

  timeProgressed() {
    return minus(this.time(), this.timeStart);
  }

  /**
   * @param {SPrimitive[]} valued
   * @param {SPrimitive[]} displayed
   */
  frame(valued, displayed) {
    let l = valued.length;

    for (let i = 0; i < l; i++) {
      valued[i].storeValue();
    }

    this.printStates(displayed);
  }

  /**
   * @param {SolverType} solver
   */
  step(solver) {
    if (!solver.completedFirstPass) {
      solver.completedFirstPass = true;
      this.solversCompletedFirstPass++;
      if (this.solversCompletedFirstPass === Object.keys(this.simulationModel.solvers).length) {
        if (this.config.onCompletedFirstPass) {
          this.config.onCompletedFirstPass();
        }
      }
    }

    if (solver.displayed.length > 0) {
      for (let i = this.results.children[solver.displayed[0].id].results.length; i < this.results.times.length; i++) {
        for (let display of solver.displayed) {
          this.results.children[display.id].results.push(this.results.data[i][display.id]);
        }
      }
    }

    if (this.config.onStep) {
      this.config.onStep(solver);
    }
  }

  sleep(shouldUpdateValues) {
    if (this.config) {
      if (!this.config.silent) {
        this.shouldSleep = true;
        this.shouldUpdateValues = shouldUpdateValues;
      } else {
        if (this.config.onPause) {
          this.shouldSleep = true;
        }
      }
    }

  }

  resume() {
    try {
      this.run();
    } catch (err) {
      return checkErr(err, this.config, this);
    }
  }

  completed() {
    return this.terminated || this.tasks.completed();
  }

  terminate() {
    this.setStatus("TERMINATED");

    if (!this.terminated) {
      clearTimeout(this.timer);
      this.sleep();
      this.terminated = true;
    }
  }

  setStatus(s) {
    this.status = s;
    if (this.setStatusCallback) {
      this.setStatusCallback(s);
    }
  }

  /**
   * @param {import("./Modeler").SimulationConfigType=} config
   * @returns
   */
  run(config) {
    this.setStatus("RUNNING");

    let me = this;

    /**
     * @param {Material} time
     * @param {boolean} repeat
     */
    let addPause = (time, repeat) => {
      this.tasks.add(new Task({
        time: time,
        expires: 1,
        name: "Interval Pause",
        priority: 1,
        action: (_task) => {
          this.sleep(true);
          if (
            repeat
            && (
              this.config.pauseEachTimeStep ||
              lessThan(plus(time, this.timePause), this.timeEnd))
          ) {
            addPause(plus(time,
              this.config.pauseEachTimeStep ? this.userTimeStep : this.timePause
            ), repeat);
          }
        }
      }));

      this.tasks.add(new Task({
        time: time,
        expires: 1,
        name: "Interval Pause",
        priority: 1,
        action: (_task) => {
          if (this.valueChange) {
            me.evaluatedPrimitives = new Set();
            for (let s in this.simulationModel.solvers) {
              let solver = this.simulationModel.solvers[s];
              for (let i = 0; i < solver.valued.length; i++) {
                solver.valued[i].clearCached();
              }
              for (let i = 0; i < solver.flows.length; i++) {
                solver.flows[i].predict(true);
              }
            }
            this.valueChange = false;
          }
        }
      }));
    };

    if (config) {

      for (let solver in this.simulationModel.solvers) {
        this.createSolver(this.simulationModel.solvers[solver]);
      }

      if (
        this.config.pauseEachTimeStep
        || this.timePause
      ) {
        addPause(
          this.config.pauseEachTimeStep ? this.timeStart.fullClone() : plus(this.timeStart, this.timePause),
          true
        );
      }

      this.tasks.cursor = this.tasks.tasks.minNode();
    }

    this.wakeUpTime = Date.now();

    try {
      while (!this.completed()) {
        this.tasks.step();

        if (this.shouldSleep) {
          for (let solver in this.simulationModel.solvers) {
            updateDisplayed(this.simulationModel.solvers[solver], this);
          }

          if (this.setResultsCallback) {
            this.setResultsCallback(formatSimResults(this.results));
          }

          if (this.shouldUpdateValues) {
            this.setStatus("PAUSED");
            this.shouldUpdateValues = false;
          }
          
          if (this.config.onPause) {
            setTimeout(() => {
              let res = formatSimResults(this.results);
              let l = res.data.length;
              let data = res.data[l - 1];
              for (let key in data) {
                if (key === "time") {
                  continue;
                }
                if (!res.children[key]) {
                  return; // stale call
                }
                if (res.children[key].results.length < l) {
                  res.children[key].results.push(data[key]);
                }
              }

              res.resume = this.resume.bind(this);
              res.setValue = (cell, value) => {
                let val = simpleEquation("" + value, this, new Map([[PARENT_SYMBOL, this.varBank]]));

                let found = false;

                [...this.valuedPrimitives.values()].forEach((x) => {
                  if (x.id === cell.id) {
                    found = true;
                    if (val.fullClone) {
                      x.dna.equation = val.fullClone();
                      x.equation = val.fullClone();
                    } else {
                      x.dna.equation = val;
                      x.equation = val;
                    }
                  }
                });

                if (found) {
                  this.valueChange = true;
                } else {
                  throw new ModelError("Could not find the primitive to update with setValue().", {
                    code: 8002
                  });
                }
              };
              this.config.onPause(res);
            }, 10);
          }

          this.shouldSleep = false;
          return;
        }
      }
    } catch (err) {
      if (err.simulationCommand !== "STOP") {
        throw err;
      }
    }


    this.results = formatSimResults(this.results);


    this.results.stochastic = this.stochastic;

    if (this.config.onSuccess) {
      this.config.onSuccess(this.results);
    }

    this.terminate();

    if (this.resultsWindow) {
      this.results.window = this.resultsWindow;
      for (let solver in this.simulationModel.solvers) {
        updateDisplayed(this.simulationModel.solvers[solver], this);
      }
    }

    return this.results;
  }

  progress() {
    return div(minus(this.time(), this.timeStart), this.timeLength).value;
  }

  /**
   * @param {SPrimitive[]} displayed
   */
  printStates(displayed) {
    if (!this.timeToStateMapping.has(this.tasks.time.value)) {
      let t = parseFloat(this.tasks.time.value.toPrecision(20));

      let newData = {};
      let i;
      for (i = this.results.times.length; i > 0; i--) {
        if (this.results.times[i - 1] < t) {
          this.results.times.splice(i, 0, t);
          this.results.data.splice(i, 0, newData);
          break;
        }
      }
      if (i === 0) {
        this.results.times.splice(0, 0, t);
        this.results.data.splice(0, 0, newData);
      }
      this.timeToStateMapping.set(this.tasks.time.value, newData);
    }

    let data = this.timeToStateMapping.get(this.tasks.time.value);

    for (let i = 0; i < displayed.length; i++) {
      let v = displayed[i];

      if (!((v instanceof SState) && data[v.id] !== undefined)) {
        if (v instanceof SPopulation) {
          this.results.children[v.id].dataMode = "agents";
          data[v.id] = { current: v.collectData() };
        } else {
          let x = v.value();

          if ((x instanceof Vector) && (!x.names)) {
            x.recurseApply((x) => {
              return this.adjustNum(v, x);
            });
            data[v.id] = cleanData(x);
            this.results.children[v.id].dataMode = "auto";
          } else if (x instanceof Vector) {
            x.recurseApply((x) => {
              return this.adjustNum(v, x);
            });
            data[v.id] = cleanData(x);
          } else if (x instanceof SAgent) {
            data[v.id] = x;
            this.results.children[v.id].dataMode = "auto";
          } else {
            data[v.id] = cleanData(this.adjustNum(v, x));
          }

        }
      }
    }
  }


  /**
   * @param {SPrimitive} v
   * @param {Material} x
   *
   * @return {number}
   */
  adjustNum(v, x) {
    if (v.dna.unitless && x.units) {
      throw new ModelError(`The result of the calculation has units <i>${x.units.toString()}</i>, but the primitive is unitless. Please set the units for the primitive so we can determine the proper output.`,
        {
          primitive: v,
          showEditor: true,
          code: 8000
        });
    }


    if ((v instanceof SState) || ((!x.units) && !(v instanceof SFlow))) {
      if (typeof x === "object" && "value" in x) {
        return +x.value;
      }
      // string, boolean, ...
      // @ts-ignore
      return x;
    } else {
      let m = v.matchPrimitiveUnits(x.units);
      if (m === 1) {
        return x.value;
      }
      return +fn["*"](x.value, m);
    }
  }

  /**
   * @param {SolverType} solver
   */
  createSolver(solver) {
    let me = this;

    let stocks = solver.stocks;
    let flows = solver.flows;

    let actions = solver.actions;
    let transitions = solver.transitions;
    let valued = solver.valued;
    valued.forEach(v => this.valuedPrimitives.add(v));
    let displayed = solver.displayed;

    let id = solver.id;

    let timeStep = solver.timeStep;
    let RKOrder = solver.RKOrder;
    solver.RKPosition = 1;


    let index = 0;
    /** @type {Material[]} */
    let times = [];
    // @ts-ignore - Big.js is mistyped
    let maxIndex = Math.ceil((new Big(this.timeEnd.value)).minus(this.timeStart.value).div(timeStep.value).toNumber());
    for (let i = 0; i <= maxIndex + 2; i++) {
      // @ts-ignore - Big.js is mistyped
      times.push(new Material((new Big(this.timeStart.value).plus(new Big(i).times(timeStep.value))).toNumber(), timeStep.units));
    }


    /**
     * @param {Material} time
     * @param {boolean} repeat
     * @param {boolean=} clear
     */
    let addRK1Solver = (time, repeat, clear) => {
      this.tasks.add(new Task({
        time: time,
        expires: 1,
        priority: 0,
        name: "RK1 Solver - " + solver.id,
        action: (_task) => {
          me.evaluatedPrimitives = new Set();
          if (clear) {
            let l = flows.length;
            for (let i = 0; i < l; i++) {
              flows[i].clean();
            }


            l = valued.length;
            for (let i = 0; i < l; i++) {
              valued[i].clearCached();
            }
          }

          this.frame(valued, displayed);

          let l = actions.length;
          for (let i = 0; i < l; i++) {
            if (!actions[i].initialized || (actions[i].dna.recalculate && !actions[i].block)) {
              updateTrigger.call(actions[i]);
            }
          }

          l = transitions.length;
          for (let i = 0; i < l; i++) {
            if (!transitions[i].initialized || transitions[i].dna.recalculate) {
              updateTrigger.call(transitions[i]);
            }
          }

          this.step(solver);


          if (repeat && index <= maxIndex) {
            index++;
            addRK1Solver(times[index], true, true);
          }

        }
      })
      );
    };

    /**
     * @param {Material} time
     * @param {boolean} repeat
     */
    let addRK4Solver = (time, repeat) => {
      /*

      1. (t=0) Calculate rates at t=0, move to t=0.5 (rollback restore stocks)
      2. (t=0.5) Calculate rates at t=0.5
      3. (t=0) Use rate of (t=0.5) to move to t=0.5 (rollback restores stocks)
      4. (t=0.5) Calculate rates at t=0.5
      5. (t=0) Use rates of (t=0.5 (2)) to move to t=1 (rollback restores stocks)
      6. (t=1) Calculate rates at t=1
      7. (t=0) Use average rates to move to t=0

      */


      this.tasks.add(new Task({
        time: time,
        name: "RK4 Solver (Init)  - " + solver.id,
        priority: -10,
        expires: 1,
        blocker: id + " init",
        action: (task) => {
          let l = flows.length;
          for (let i = 0; i < l; i++) {
            flows[i].clean();
          }

          me.evaluatedPrimitives = new Set();

          l = valued.length;
          for (let i = 0; i < l; i++) {
            valued[i].clearCached();
          }

          solver.RKPosition = 1;

          task.unblock(id + " start");
          task.block();
        }
      })
      );
      this.tasks.add(new Task({
        time: time,
        name: "RK4 Solver (step 1) - " + solver.id,
        priority: -5,
        expires: 4,
        blocker: id + " start",
        action: (task) => {
          if (solver.RKPosition > 1) {
            me.evaluatedPrimitives = new Set();
            let l = valued.length;
            for (let i = 0; i < l; i++) {
              valued[i].clearCached();
              valued[i].pastValues.pop();
            }

            if (solver.RKPosition === 4) {
              l = flows.length;
              for (let i = 0; i < l; i++) {
                let initialRate = flows[i].checkRate(flows[i].RKPrimary[0].fullClone());
                flows[i].doRK4Aggregation();
                flows[i].rate = initialRate;
              }
            }

          }

          this.frame(valued, displayed);

          if (solver.RKPosition === 4) {

            let l = actions.length;
            for (let i = 0; i < l; i++) {
              if (!actions[i].initialized || (actions[i].dna.recalculate && !actions[i].block)) {
                updateTrigger.call(actions[i]);
              }
            }

            l = transitions.length;
            for (let i = 0; i < l; i++) {
              if (!transitions[i].initialized || transitions[i].dna.recalculate) {
                updateTrigger.call(transitions[i]);
              }
            }

            task.unblock(id + " init");

            if (repeat && index <= maxIndex) {
              index += 2;
              addRK4Solver(times[index], true);
            }

            this.step(solver);
          } else if (eq(me.time(), me.timeEnd)) {
            this.step(solver);
          } else {
            let l = stocks.length;
            for (let i = 0; i < l; i++) {
              stocks[i].preserveLevel();
            }
          }

          task.block();
          task.unblock(id + " mid");
        },
        rollback: function () {
          let l = stocks.length;
          for (let i = 0; i < l; i++) {
            stocks[i].restoreLevel();
          }
        }
      })
      );
      this.tasks.add(new Task({
        time: times[index + 1],
        name: "RK4 Solver (step 2,3) - " + solver.id,
        priority: -10,
        expires: 2,
        blocker: id + " mid",
        action: (task) => {
          me.evaluatedPrimitives = new Set();
          let l = valued.length;
          for (let i = 0; i < l; i++) {
            if (!(valued[i] instanceof SState)) {
              valued[i].clearCached();
            }
          }


          solver.RKPosition++;

          l = flows.length;
          for (let i = 0; i < l; i++) {
            flows[i].rate = null;
          }

          for (let i = 0; i < l; i++) {
            flows[i].value();
          }

          task.unblock(id + " start");
          task.block();
        },
        timeShift: () => {
          this.tasks.moveTo(times[index]);
        }
      })
      );

      this.tasks.add(new Task({
        time: times[index + 2],
        name: "RK4 Solver (step 4) - " + solver.id,
        priority: -30,
        expires: 1,
        action: (task) => {
          me.evaluatedPrimitives = new Set();
          let l = valued.length;
          for (let i = 0; i < l; i++) {
            if (!(valued[i] instanceof SState)) {
              valued[i].clearCached();
            }
          }

          solver.RKPosition++;

          l = flows.length;
          for (let i = 0; i < l; i++) {
            flows[i].rate = null;
          }

          for (let i = 0; i < l; i++) {
            flows[i].value();
          }

          task.unblock(id + " start");
        },
        timeShift: () => {
          this.tasks.moveTo(times[index]);
        }
      })
      );
    };

    function valMatches(val, fn) {
      if (val instanceof Vector) {
        let matches = false;
        val.recurseApply((x) => {
          matches = matches || fn(x);
        });
        return matches;
      } else {
        return fn(val);
      }
    }

    function valHasNegative(val) {
      return val && valMatches(toNum(val), (x) => {
        return (x instanceof Material) && x.value < 0;
      });
    }

    function valHasPositive(val) {
      return val && valMatches(toNum(val), (x) => {
        return (x instanceof Material) && x.value > 0;
      });
    }

    /**
     * @param {Material} timeChange
     * @param {Material} oldTime
     */
    function doFlows(timeChange, oldTime) {

      // first apply flows that won't be limited by non-negative stocks
      let post = [];
      for (let flow of flows) {
        if (flow.alpha && flow.alpha.dna.nonNegative && valHasPositive(flow.rate)) {
          post.push(flow);
        } else if (flow.omega && flow.omega.dna.nonNegative && valHasNegative(flow.rate)) {
          post.push(flow);
        } else {
          flow.apply(timeChange, oldTime);
        }
      }


      // we use the topological sort order for nonnegative stocks so
      // "upstream" flows will be applied before downstream ones
      post.sort((a, b) => {
        let aOrder = me.clusters[a.id];
        let bOrder = me.clusters[b.id];
        if (aOrder.cluster < bOrder.cluster) {
          return -1;
        }
        if (aOrder.cluster > bOrder.cluster) {
          return 1;
        }
        if (aOrder.flow < bOrder.flow) {
          return -1;
        }
        if (aOrder.flow > bOrder.flow) {
          return 1;
        }
        return 0;
      });

      for (let p of post) {
        p.apply(timeChange, oldTime);
      }
    }


    if (RKOrder === 1) {
      this.tasks.addEvent((timeChange, oldTime) => {
        doFlows(timeChange, oldTime);
      });

      addRK1Solver(this.timeStart, true);
    } else if (RKOrder === 4) {
      this.tasks.addEvent((timeChange, oldTime) => {
        if (timeChange.value > 0) {
          doFlows(timeChange, oldTime);
        }
      });

      addRK4Solver(this.timeStart, true);
    } else {
      throw new ModelError("Unknown solution algorithm.", {
        code: 8001
      });
    }
  }
}
