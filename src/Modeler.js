import { Simulator } from "./Simulator.js";
// eslint-disable-next-line
import { SAgent, SPopulation, STransition, SAction, SState, SStock, SVariable, SFlow, SConverter, Placeholder, SPrimitive } from "./Primitives.js";
// eslint-disable-next-line
import { Action, Agent, Converter, Flow, Population, Primitive, State, Stock, Transition, ValuedPrimitive, Variable } from "./api/Blocks.js";
import { Material } from "./formula/Material.js";
import { div, plus, mult, evaluateTree, trimTree, trueValue, eq, createTree, bootCalc, TreeNode } from "./formula/Formula.js";
import { fn } from "./CalcMap.js";
import { convertUnits } from "./formula/Units.js";
import { Rand } from "./formula/Rand.js";
import { Vector } from "./formula/Vector.js";
import { selectFromMatrix } from "./formula/Utilities.js";
import { DNA } from "./DNA.js";
import { ModelError } from "./formula/ModelError.js";
import { commaStr, toHTML } from "./Utilities.js";
import { Graph, Layout } from "../vendor/graph.js";
import toposort from "../vendor/toposort.js";
import { Model } from "./api/Model.js";


/**
 * @typedef {SPopulation & { node?: import("./api/Blocks").Primitive }} SubModelType=
 */


/**
 * @typedef {object} ModelType
 * @property {Object<string, import("./Simulator").SolverType>=} model.solvers
 * @property {Object<string, SubModelType>=} model.submodels
 * @property {Material=} model.timeLength
 * @property {Material=} model.timeStart
 * @property {Material=} model.timeStep
 * @property {Material=} model.timePause
 * @property {import("./formula/Units.js").UnitStore} model.timeUnits
 */




/**
 * @typedef {object} SimulationConfigType
 * @property {boolean=} silent
 * @property {function(import("./Simulator").SolverType)=} onStep
 * @property {function(import("./Simulator").ResultsType)=} onPause
 * @property {function(import("./Simulator").ResultsType)=} onSuccess
 * @property {function(import("./Simulator").ResultsType)=} onError
 * @property {function(string, "error"|"warning"|"notice"|"success"=)=} showNotification
 * @property {function=} processError
 * @property {function=} showMacros
 * @property {function=} handleErrorObject
 * @property {function=} onCompletedFirstPass
 * @property {function(Primitive)=} getColor
 * @property {any=} resultsWindow
 * @property {GraphNode=} selectedDisplay
 * @property {number=} rate
 * @property {function=} createResultsWindow
 * @property {import("./api/Model.js").Model=} model
 */


/**
 * @param {SimulationConfigType} config
 *
 * @returns
 */
export function runSimulation(config) {
  let simulate;
  try {
    simulate = new Simulator();
    simulate.model = config.model;
    return innerRunSimulation(simulate, config); // have an inner function call to escape try-catch performance pathologies
  } catch (err) {
    return checkErr(err, config, simulate);
  }
}


/**
 *
 * @param {*} err
 * @param {*} config
 * @param {import("./Simulator").Simulator} simulate
 * @returns
 */
export function checkErr(err, config, simulate) {
  simulate.terminate();

  /** @type {import("./Simulator").ResultsType} */
  let errOut;
  if (err instanceof ModelError) {
    errOut = {
      error: err.message,
      errorPrimitive: err.primitive ? simulate.model.getId(err.primitive.id) : null,
      errorCode: err.code
    };
  } else {
    console.log(err);

    if (config.processError) {
      config.processError(err);
    }

    errOut = {
      error: "An unknown simulation error occurred. Please report this issue to the Insight Maker team at <a href='mailto:support@insightmaker.com' style='color: white'>support@insightmaker.com</a>.",
      errorPrimitive: null,
      errorCode: 1
    };

    err = new ModelError(errOut.error, {
      code: 1
    });
  }

  if (!simulate.results) {
    simulate.results = {};
  }
  simulate.results.error = err.msg;


  if (errOut.error) {
    // remove HTML
    errOut.error = errOut.error.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>?/gm, "");
  }

  if (config.onError) {
    config.onError(errOut);
  }

  if (config.handleErrorObject) {
    config.handleErrorObject(err, simulate);
  } else {
    return errOut;
  }
}


/**
 * @param {import("./Simulator").Simulator} simulate
 * @param {SimulationConfigType} config
 *
 * @returns
 */
function innerRunSimulation(simulate, config) {
  if (config) {
    simulate.config = config;
  }

  simulate.evaluatingPosition = {
    line: null,
    source: null
  };

  if (config.resultsWindow) {
    if (!config.resultsWindow.windowContext.simulate.completed()) {
      // kill simulation if still running
      config.resultsWindow.windowContext.simulate.terminate();
    }
    simulate.resultsWindow = config.resultsWindow;
    config.resultsWindow.windowContext.simulate = simulate;
    config.resultsWindow.data.simulation = simulate;
    config.resultsWindow.windowContext.componentRef.rerender();
    config.resultsWindow.windowContext.notFirstRun = true;
  }

  bootCalc(simulate);


  simulate.allPlaceholders = {};

  /** @type {string} */
  let timeUnits = simulate.model.timeUnits;
  if (!timeUnits) {
    throw new ModelError("You must set the time units in the model settings.", {
      code: 1072
    });
  }
  timeUnits = timeUnits.toLowerCase();
  simulate.timeUnitsString = timeUnits;

  /** @type {ModelType} */
  let model = {};
  model.submodels = {
    // @ts-ignore
    base: {
      id: "base",
      DNAs: [],
      agents: [/** @type {SAgent} */ ({
        children: [],
        childrenId: {}
      })],
      size: 1
    }
  };


  // Begin custom units setup

  let customUnits = simulate.model.customUnits;
  if (customUnits) {
    /** @type {import("./formula/Units").UnitDefinition[]} */
    let units = [];
    for (let unit of customUnits) {
      if (unit.target.trim()) { // It has a synonym, otherwise we don't need to add it
        let newUnit = {
          sourceString: unit.name,
          scale: unit.scale,
        };
        let newTarget = createUnitStore(unit.target, simulate);
        if (!newTarget) {
          throw new ModelError("You cannot define a units synonym for \"unitless\".", {
            code: 1001
          });
        } else {
          newUnit.target = newTarget;
        }
        units.push(newUnit);
      }
    }
    simulate.unitManager.addUnits(units);
  }

  // End custom units setup

  // Set Up simulation time settings

  model.timeUnits = simulate.unitManager.getUnitStore([timeUnits], [1]);
  model.timeLength = new Material(simulate.model.timeLength, model.timeUnits);
  model.timeStart = new Material(simulate.model.timeStart || 0, model.timeUnits);
  model.timeStep = new Material(simulate.model.timeStep, model.timeUnits);

  if (model.timeStep.value <= 0 || isNaN(model.timeStep.value)) {
    throw new ModelError("The model time step must be a positive number.", {
      code: 1002
    });
  }

  if (model.timeLength.value <= 0 || isNaN(model.timeLength.value)) {
    throw new ModelError("The model time length must be a positive number.", {
      code: 1003
    });
  }



  if (simulate.model.timePause > 0) {
    model.timePause = new Material(simulate.model.timePause, model.timeUnits);

    if (model.timePause.value < model.timeStep.value) {
      throw new ModelError("Time pause cannot be smaller than the time step.", {
        code: 1004
      });
    }
  }

  simulate.timeUnits = model.timeUnits;


  // End Simulation time settings setup

  /** @type {Object<string, import('./Simulator').SolverType>} */
  let solvers = {}; // Simulation solvers
  solvers.base = {
    timeStep: new Material(simulate.model.timeStep, model.timeUnits),
    algorithm: simulate.model.algorithm,
    id: "base",
    maxLoaded: -1
  };


  model.solvers = solvers;
  let folders = simulate.model.findFolders().concat(simulate.model.findAgents());
  for (let i = 0; i < folders.length; i++) {
    let solver = folders[i].customTimeSettings;
    if (solver) {
      if (solver.enabled) {
        solvers[folders[i].id] = Object.assign({}, solver, { timeStep: new Material(+solver.timeStep, model.timeUnits) });
        if (solvers[folders[i].id].timeStep.value <= 0 || isNaN(solvers[folders[i].id].timeStep.value)) {
          throw new ModelError("The folder time step must be a positive number.", {
            primitive: folders[i],
            showEditor: false,
            code: 1005
          });
        }
        solvers[folders[i].id].id = folders[i].id;
        solvers[folders[i].id].maxLoaded = -1;
      }
    }
  }

  for (let solver of Object.values(solvers)) {
    solver.userTimeStep = solver.timeStep;
    if (solver.algorithm === "RK4") {
      solver.RKOrder = 4;
    } else {
      solver.RKOrder = 1;
    }
    if (solver.RKOrder === 4) {
      solver.timeStep = div(solver.userTimeStep, new Material(2));
    }

    solver.stocks = [];
    solver.flows = [];
    solver.transitions = [];
    solver.actions = [];
    solver.states = [];
    solver.valued = [];
    solver.displayed = [];
  }


  try {
    // Initialize actual simulation
    simulate.setup(model);

    if (simulate.model.globals !== undefined) {
      try {
        evaluateGlobals(simulate.model.globals, simulate);
      } catch (err) {
        
        if (err.simulationCommand === "STOP") {
          // pass a STOP() error up
          throw err;
        }

        let annotations = [];

        let msg = "An error with the macros prevented the simulation from running.";

        if (err instanceof ModelError) {
          msg = msg + "<br/><br/>" + err.message;
          if (simulate.evaluatingPosition?.line) {
            annotations.push({
              type: "error",
              row: simulate.evaluatingPosition.line - 1,
              text: err.message
            });
          }
        } else {
          if (err.toString) {
            if (err.match && err.match(/line (\d+)/i)) {
              let l = err.match(/line (\d+)/i)[1];

              annotations.push({
                type: "error",
                row: l !== undefined ? l - 1 : simulate.evaluatingPosition.line - 1,
                text: err
              });
            }
          }
        
          if (config.processError) {
            config.processError(err);
          }
        }

        if (config.showMacros) {
          config.showMacros(annotations);
        }

        throw new ModelError(msg, {
          code: 1000
        });
      }
    }

    let modelItems = simulate.model.find();

    // generated topological sort of flows allowing
    // us to evaluate them from "upstream" to "downstream"
    // when dealing with non-negative stocks
    simulate.clusters = makeClusters(simulate);

    for (let item of modelItems) {
      if (item instanceof Population) {
        if (item.isInAgent()) {
          throw new ModelError(`Cannot have the agent population <i>[${toHTML(item.name)}]</i> placed within an agent folder.`, {
            primitive: item,
            showEditor: false,
            code: 1006
          });
        }

        let agentBase = item.agentBase;
        if (!agentBase || !(agentBase instanceof Agent)) {
          throw new ModelError(`You must select a base agent for the primitive <i>[${toHTML(item.name)}]</i>. You can create agent definitions using Folder primitives.`, {
            primitive: item,
            showEditor: false,
            code: 1007
          });
        }

        let x = new SPopulation(simulate);

        x.dna = new DNA(item, agentBase.id);
        x.id = item.id;

        x.agentId = agentBase.id;
        x.createIds();

        x.dna.solver = folderSolvers(item, solvers);
        x.dna.solver.displayed.push(x);

        x.geoDimUnits = item.geoUnits;
        x.geoDimUnitsObject = createUnitStore(item.geoUnits, simulate, item);
        try {
          x.geoWidth = simpleUnitsTest(/** @type {Material} */(simpleEquation(item.geoWidth, simulate)), x.geoDimUnitsObject, simulate, item);
        } catch (_err) {
          throw new ModelError(`Invalid width for the agent population <i>[${toHTML(item.name)}]</i>.`, {
            primitive: item,
            showEditor: false,
            code: 1008
          });
        }
        try {
          x.geoHeight = simpleUnitsTest(/** @type {Material} */(simpleEquation(item.geoHeight, simulate)), x.geoDimUnitsObject, simulate, item);
        } catch (_err) {
          throw new ModelError(`Invalid height for the agent population <i>[${toHTML(item.name)}]</i>.`, {
            primitive: item,
            showEditor: false,
            code: 1009
          });
        }
        x.halfWidth = div(x.geoWidth, new Material(2));
        x.halfHeight = div(x.geoHeight, new Material(2));
        x.geoWrap = item.geoWrapAround;
        x.placement = item.geoPlacementType;
        x.placementFunction = item.geoPlacementFunction;
        x.network = item.networkType;
        x.networkFunction = item.networkFunction;
        x.agentBase = agentBase.agentParent;
        if (x.agentBase && x.agentBase.trim()) {
          try {
            x.agentBase = simpleEquation(x.agentBase, simulate, simulate.varBank);
          } catch (_err) {
            throw new ModelError(`Invalid Agent Parent for the primitive <i>[${toHTML(agentBase.name)}]</i>.`, {
              primitive: agentBase,
              showEditor: false,
              code: 1010
            });
          }
        }

        let agentNodes = agentBase.children();

        x.DNAs = [];
        for (let agentNode of agentNodes) {
          if (modelType(agentNode)) {
            x.DNAs.push(getDNA(agentNode, x, solvers, simulate));
          }
          if (agentNode instanceof State) {
            x.stateIds.add(agentNode.id);
          }
        }


        x.size = item.populationSize;

        x.agents = [];

        x.dna.agents = x;

        model.submodels[item.id] = x;
        model.submodels.base.DNAs.push(x.dna);
      } else if (!item.isInAgent()) {
        if (modelType(item)) {
          model.submodels.base.DNAs.push(getDNA(item, model.submodels.base, solvers, simulate));
        }
      }
    }



    for (let submodel of Object.values(model.submodels)) {
      submodel.DNAs.sort((a, b) => {
        if (a.neighborProxyDNA && !b.neighborProxyDNA) {
          return 1;
        }
        if (b.neighborProxyDNA && !a.neighborProxyDNA) {
          return -1;
        }
        return 0;
      });

      for (let j = 0; j < submodel.size; j++) {
        let agent;
        if (submodel.id === "base") {
          agent = submodel.agents[0];
        } else {
          agent = new SAgent(simulate);
          agent.container = submodel;
          agent.index = j;
          agent.children = [];
          agent.childrenId = {};
          agent.agentId = submodel.id;
          agent.createIds();
          if (submodel.agentBase) {
            agent.vector.parent = submodel.agentBase;
          }

          submodel.agents.push(agent);
        }
        for (let dna of submodel.DNAs) {
          decodeDNA(dna, agent, simulate, submodel.id !== "base");
        }
      }
    }


    for (let submodelId in model.submodels) {
      let submodel = model.submodels[submodelId];
      for (let j = 0; j < submodel.size; j++) {
        for (let i = 0; i < submodel.DNAs.length; i++) {
          linkPrimitive(submodel.agents[j].children[i], submodel.DNAs[i], simulate);
        }
      }
    }

    for (let submodelId in model.submodels) {
      let submodel = model.submodels[submodelId];
      for (let j = 0; j < submodel.size; j++) {
        setAgentInitialValues(submodel.agents[j]);
      }
    }

    for (let submodel in model.submodels) {
      if (submodel !== "base") {
        try {
          buildNetwork(model.submodels[submodel], simulate);
        } catch (err) {
          let msg = "An error with the custom network function prevented the simulation from running.";
          if (err instanceof ModelError) {
            msg = msg + "<br/><br/>" + err.message;
          }

          throw new ModelError(msg, {
            primitive: model.submodels[submodel].node,
            showEditor: false,
            code: 1011
          });
        }


        try {
          buildPlacements(model.submodels[submodel], simulate);
        } catch (err) {
          let msg = "An error with the agent placement function prevented the simulation from running.";
          if (err instanceof ModelError) {
            msg = msg + "<br/><br/>" + err.message;
          }

          throw new ModelError(msg, {
            primitive: model.submodels[submodel].node,
            showEditor: false,
            code: 1012
          });
        }

      }
    }
  


    simulate.results = {
      times: [],
      data: [],
      timeUnits: simulate.timeUnitsString
    };
    simulate.displayInformation = {
      populated: false,
      ids: [],
      times: [],
      objects: [],
      maps: [],
      histograms: []
    };

    model.submodels["base"].agents[0].children.forEach((x) => {
      if (!(x instanceof SAction || x instanceof STransition)) {

        if (!x.dna.noOutput) {
          simulate.displayInformation.objects.push(x);
          simulate.displayInformation.ids.push(x.id);
        }
        let data = {};
        if (x instanceof SPopulation) {
          data.width = x.geoWidth;
          data.height = x.geoHeight;
          data.units = x.geoDimUnitsObject;
          data.states = x.states();
        } else {
          if (!x.dna.noOutput) {
            x.dna.solver.displayed.push(x);
          }
        }
        if (!simulate.results.children) {
          simulate.results.children = {};
        }
        simulate.results.children[x.id] = {
          data: data,
          results: [],
          dataMode: "float"
        };
      }
    });
  


    let hasCompletedFirstPass = false;
    function completedFirstPass() {
      if (hasCompletedFirstPass) {
        return;
      }
      hasCompletedFirstPass = true;
      if (simulate.displayInformation.populated) {

        for (let i = 0; i < simulate.displayInformation.origIds.length; i++) {

          let id = simulate.displayInformation.origIds[i];
          let object = simulate.displayInformation.objects[i];

          if (object instanceof SPopulation) {
            simulate.results.children[id].states = object.stateIds;

            simulate.displayInformation.agents[id.toString()].data = simulate.results.children[id].data;
            simulate.displayInformation.agents[id.toString()].results = simulate.results.children[id].results;


          } else if (simulate.results.data[0][id] instanceof Vector && simulate.results.data[0][id].names) {

            let names = simulate.results.data[0][id].fullNames();

            simulate.results.children[id].indexedFullNames = names.slice();
            for (let j = 0; j < names.length; j++) {
              names[j] = names[j].join(", ");
            }
            simulate.results.children[id].indexedNames = names;

          }
        }

      } else {
        simulate.displayInformation.populated = true;
        simulate.displayInformation.colors = [];
        simulate.displayInformation.headers = [];
        simulate.displayInformation.agents = [];
        simulate.displayInformation.displayedItems = [];
        simulate.displayInformation.renderers = [];
        simulate.displayInformation.elementIds = [];
        simulate.displayInformation.res = simulate.results;

        let ids = [];

        simulate.displayInformation.origIds = simulate.displayInformation.ids.slice();
        for (let i = 0; i < simulate.displayInformation.origIds.length; i++) {
          let id = simulate.displayInformation.origIds[i];
          let object = simulate.displayInformation.objects[i];
          let dna = object.dna;

          simulate.displayInformation.displayedItems.push({
            id,
            header: dna.name,
            type: dna.primitive._node.value.nodeName
          });


          if (object instanceof SPopulation) {
            let states = object.stateIds;

            simulate.results.children[id].states = states;

            states.forEach(state => {
              let innerItem = simulate.model.getId(state);
              ids.push(id);
              simulate.displayInformation.elementIds.push("e" + id + "-" + state);
              simulate.displayInformation.headers.push(innerItem.name);
              simulate.displayInformation.colors.push(config.getColor ? config.getColor(innerItem) : "#000000");
              if (simulate.results.children[id].dataMode === "float") {
                simulate.displayInformation.renderers.push(commaStr);
              } else if (simulate.results.children[id].dataMode === "agents") {
                simulate.displayInformation.renderers.push((x) => {
                  return x;
                });
              } else {
                simulate.displayInformation.renderers.push(undefined);
              }
            });

            simulate.displayInformation.agents[id.toString()] = {
              id: id,
              item: dna.primitive,
              data: simulate.results.children[id].data,
              results: simulate.results.children[id].results
            };


          } else if (simulate.results.data.length && simulate.results.data[0][id] instanceof Vector && simulate.results.data[0][id].names) {

            let col = config.getColor ? config.getColor(dna.primitive) : "#000000";

            let names = simulate.results.data[0][id].fullNames();

            simulate.results.children[id].indexedFullNames = names.slice();
            for (let j = 0; j < names.length; j++) {
              names[j] = names[j].join(", ");
            }
            simulate.results.children[id].indexedNames = names;

            for (let j = 0; j < names.length; j++) {
              ids.push(id);
              simulate.displayInformation.elementIds.push("e" + id + "-" + j);
              simulate.displayInformation.headers.push(dna.name + " (" + names[j] + ")");
              simulate.displayInformation.colors.push(col);
              simulate.displayInformation.renderers.push(commaStr);
            }

          } else {
            ids.push(id);
            simulate.displayInformation.elementIds.push("e" + id);
            simulate.displayInformation.headers.push(dna.name);
            simulate.displayInformation.colors.push(config.getColor ? config.getColor(dna.primitive) : "#000000");
            if (simulate.results.children[id].dataMode === "float") {
              simulate.displayInformation.renderers.push(commaStr);
            } else {
              simulate.displayInformation.renderers.push(undefined);
            }
          }

        }

      


        simulate.displayInformation.store = {
          data: []
        };
        simulate.displayInformation.ids = ids;
      }
    }


    if (config.silent) {
      if (config.onPause) {
        simulate.run(config);
      } else {
        return formatSimResults(simulate.run(config));
      }
    } else {

      let count = div(model.timeLength, model.timeStep);

      // Max size for a JS array is a 32-bit integer
      const MAX_ARRAY_LENGTH = 4294967294;
      if (count.value > MAX_ARRAY_LENGTH) {
        throw new ModelError(`You have ${count} time steps, maximum is ${MAX_ARRAY_LENGTH}.`,
          {
            code: 9108
          });
      }
      for (let i = 0; i <= count.value; i++) {
        simulate.displayInformation.times.push(plus(model.timeStart, mult(model.timeStep, new Material(i))).value);
      }


      let oldSuccess = config.onSuccess;
      config.onSuccess = function (res) {
        completedFirstPass(); // simulation may have terminated via stop() before first pass

        for (let solver in simulate.simulationModel.solvers) {
          updateDisplayed(simulate.simulationModel.solvers[solver], simulate);
        }

        if (simulate.setResultsCallback) {
          simulate.setResultsCallback(formatSimResults(simulate.results));
        }

        if (oldSuccess) {
          oldSuccess(res);
        }
      };

      config.onCompletedFirstPass = function () {
        completedFirstPass();
      };



      let oldStep = config.onStep;
      config.onStep = function (solver) {

        // See if we should sleep to let the main UI update

        let updated = false;
        let progress = simulate.progress();


        if (!simulate.shouldSleep) {
          let timeTaken = Date.now() - simulate.wakeUpTime;
        
          let complexityMultiplier = 1;
          if (simulate.results.times.length > 20000) {
            complexityMultiplier = 4;
          } else if (simulate.results.times.length > 5000) {
            complexityMultiplier = 2;
          } else if (simulate.results.times.length > 1000) {
            complexityMultiplier = 1.3;
          }

          if ((!simulate.resultsWindow && timeTaken > 100 * complexityMultiplier) || timeTaken > 600 * complexityMultiplier) {
            updateDisplayed(solver, simulate);
            updated = true;

            // @ts-ignore
            simulate.timer = setTimeout(() => {
              simulate.resume();
            }, 20 * Math.pow(complexityMultiplier, 1.5));

            simulate.sleep();
          }
        }

        if (progress === 1 && !updated) {
          updateDisplayed(solver, simulate);
        }

        // Call any user defined step function

        if (oldStep) {
          oldStep(solver);
        }
      };

      let oldError = config.onError;
      config.onError = function (res) {

        try {
          for (let solver in simulate.simulationModel.solvers) {
            updateDisplayed(simulate.simulationModel.solvers[solver], simulate);
          }
        } catch (err) {
        // pass
        }

        if (simulate.finished) {
          simulate.finished();
        }

        if (oldError) {
          oldError(res);
        }
      };

      simulate.run(config);
    }
  } catch (err) {
    // we need to catch STOP() calls during initialization (e.g. stock initial values)
    if (err.simulationCommand !== "STOP") {
      throw err;
    } else {
      if (config.silent) {
        return {
          times: [],
          value: () => {
            return [];
          },
          lastValue: () => {
          },
          error: "stop() called during initialization",
        };
      }
    }
  }
}


/**
 * @param {any} x
 * @param {boolean=} removeVectors - if true, Vectors will be converted to basic types
 *
 * @returns
 */
export function cleanData(x, removeVectors = false) {
  if (x instanceof Vector) {
    if (removeVectors) {
      if (x.names && x.names.length) {
        let r = {};
        for (let i = 0; i < x.names.length; i++) {
          r[x.names[i]] = cleanData(x.items[i], removeVectors);
        }
        return r;
      } else {
        return x.items.map((x) => cleanData(x, removeVectors));
      }
    } else {
      return new Vector(x.items.map((x) => cleanData(x, removeVectors)), x.simulate, x.names, x.parent);
    }
  } else if (typeof x === "number") {
    return +x.toPrecision(15);
  } else if (Array.isArray(x)) {
    return x.map(x => cleanData(x, removeVectors));
  }

  return x;
}


/**
 * @param {import("./Simulator").ResultsType} res
 *
 * @returns {import("./Simulator").ResultsType}
 */
export function formatSimResults(res) {
  /** @type {import("./Simulator").ResultsType} */
  let r = {};
  r.times = res.times.slice();
  r.data = res.data;
  r.timeUnits = res.timeUnits;
  r.children = res.children;
  r.error = res.error;
  r.errorPrimitive = res.errorPrimitive;
  r.stochastic = res.stochastic;


  if (!r.error) {
    r.error = null;
    r.errorPrimitive = null;
  }
  r.value = function (item) {
    if (!item) {
      throw new Error("Cannot get result value() of null or undefined primitive.");
    }
    let entry = this.children[item.id];
    if (!entry) {
      throw new Error("Cannot find primitive in value() results.");
    }
    return cleanData(entry.results, true);
  };
  r.lastValue = function (item) {
    if (!item) {
      throw new Error("Cannot get result lastValue() of null or undefined primitive.");
    }
    let entry = this.children[item.id];
    if (!entry) {
      throw new Error("Cannot find primitive in lastValue() results.");
    }
    return cleanData(entry.results[entry.results.length - 1], true);
  };
  if (r.times) {
    r.periods = r.times.length;
  }

  return r;
}


/**
 * @param {string} u
 * @param {import("./Simulator").Simulator} simulate
 * @param {import("./api/Blocks.js").Primitive=} primitive
 *
 * @returns {import('./formula/Units').UnitStore}
 */
export function createUnitStore(u, simulate, primitive) {
  if (!u || u.trim() === "" || u.trim().toLowerCase() === "unitless") {
    return;
  }

  try {
    // @ts-ignore
    return simpleEquation("{1 " + u + "}", simulate, new Map()).units;
  } catch (_err) {
    throw new ModelError(`Invalid units: "<i>${u}</i>"`, {
      primitive: primitive,
      showEditor: true,
      code: 1012
    });
  }
}


/**
 * @param {string} eq
 * @param {import("./Simulator").Simulator} simulate
 * @param {Map=} scope
 * @param {Map=} nodeBase
 * @param {object=} tree
 */
export function simpleEquation(eq, simulate, scope, nodeBase, tree) {
  if (!scope) {
    scope = new Map();
  }
  if (!nodeBase) {
    nodeBase = new Map();
  }
  if (!tree) {
    tree = trimTree(createTree(eq, "_", simulate), nodeBase, simulate);
  }

  let res = evaluateTree(tree, scope, simulate);

  return res;
}


/**
 * @template {Material|Vector} T
 * @param {T} mat
 * @param {import('./formula/Units').UnitStore} units
 * @param {import('./Simulator').Simulator} simulate
 *
 * @returns {T extends Vector ? Vector : number}
 */
export function simpleNum(mat, units, simulate) {
  if (mat instanceof Vector) {
    return /** @type {any} */ (new Vector(mat.items.map((x) => {
      return simpleNum(x, units, simulate);
    }), simulate));
  }

  if (mat instanceof Material) {
    if (!units && mat.units) {
      throw new ModelError(`The result of the calculation has units <i>${mat.units.toString()}</i>, but no units are specified for the calculation. Please set the units for the calculation so we can determine the proper output.`,
        {
          code: 1013
        });
    }

    if (!mat.units) {
      return /** @type {any} */ (+mat.value);
    } else {

      mat.units.addBase();
      units.addBase();

      return /** @type {any} */ (+fn["*"](mat.value, fn["/"](mat.units.toBase, units.toBase)));
    }

  }
}


/**
 * @template {Material|Vector} T
 * @param {T} mat
 * @param {import('./formula/Units').UnitStore} units
 * @param {import("./Simulator").Simulator} simulate
 * @param {(SPrimitive|import("./api/Blocks").Primitive)=} primitive
 * @param {boolean=} showEditor
 * @param {string=} fallbackError
 *
 * @returns {T extends Vector ? Vector : Material}
 */
export function simpleUnitsTest(mat, units, simulate, primitive = null, showEditor = false, fallbackError = "Unknown simpleUnits type") {
  if (mat instanceof Vector) {
    return /** @type {any} */ (new Vector(mat.items.map((x) => {
      return simpleUnitsTest(x, units, simulate, primitive, showEditor, fallbackError);
    }), simulate));
  }


  if (mat instanceof Material) {
    if (!mat.units && !units) {
      return /** @type {any} */ (mat);
    } else if (!mat.units) {
      mat.units = units;
      return /** @type {any} */ (mat);
    } else if (mat.units === units) {
      return /** @type {any} */ (mat);
    } else {
      let scale = convertUnits(mat.units, units);
      if (scale === 0) {
        throw new ModelError(`Wrong units generated. Expected <i>${units ? units.toString() : "unitless"}</i>, and got <i>${mat.units.toString()}</i>.`, {
          primitive: primitive,
          showEditor: showEditor,
          code: 1014
        });
      } else {
        mat.value = mat.value * scale;
        mat.units = units;
        return /** @type {any} */ (mat);
      }
    }
  }

  throw new ModelError(fallbackError, {
    code: 1015
  });

}


/**
 * @param {string} globals
 * @param {import("./Simulator").Simulator} simulate
 */
function evaluateGlobals(globals, simulate) {
  evaluateTree(trimTree(createTree(globals, "macros", simulate), new Map(), simulate), simulate.varBank, simulate);
}


/**
 * @param {import("./api/Blocks").Primitive} node
 * @param {SubModelType} submodel
 * @param {Object<string, import("./Simulator").SolverType>} solvers
 * @param {import("./Simulator").Simulator} simulate
 *
 * @returns {DNA}
 */
function getDNA(node, submodel, solvers, simulate) {
  let dna = new DNA(node);

  let l;
  dna.solver = folderSolvers(node, solvers);
  if (node) {
    let p = node.parent;
    if (p) {
      dna.frozen = p.frozen;
    }
  }

  if (node instanceof Variable || node instanceof Flow) {
    if (node.external) {
      dna.slider = true;
    }
  }

  if (node instanceof Flow || node instanceof Transition) {
    if (node.end !== null) {
      dna.targetId = node.end.id;
    }
    if (node.start !== null) {
      dna.sourceId = node.start.id;
    }
  }

  if (node instanceof Converter) {
    dna.value = node.values;
  } else {
    try {
      if (node instanceof Stock) {
        dna.value = replaceMacros(node, dna, createTree(node.initial, "p:" + dna.id + ":initial", simulate), submodel, solvers, simulate, true);
      } else if (node instanceof Flow) {
        dna.value = replaceMacros(node, dna, createTree(node.rate, "p:" + dna.id + ":rate", simulate), submodel, solvers, simulate, false);
      } else if (node instanceof Variable) {
        dna.value = replaceMacros(node, dna, createTree(node.value, "p:" + dna.id + ":value", simulate), submodel, solvers, simulate, false);
      } else if (node instanceof State) {
        dna.value = replaceMacros(node, dna, createTree("" + node.startActive, "p:" + dna.id + ":startActive", simulate), submodel, solvers, simulate, true);
      } else if (node instanceof Transition) {
        dna.value = replaceMacros(node, dna, createTree("" + node.value, "p:" + dna.id + ":value", simulate), submodel, solvers, simulate, false);
      } else if (node instanceof Action) {
        dna.value = replaceMacros(node, dna, createTree(node.action, "p:" + dna.id + ":action", simulate), submodel, solvers, simulate, false);
      }
    } catch (err) {
      let msg = `The primitive <i>[${toHTML(dna.name)}]</i> has an equation error that must be corrected before the model can be run.`;
      if (err instanceof ModelError) {
        msg = msg + "<br/><br/>" + err.message;
      } else {
        console.error(err);
        msg = msg + "<br/><br/>Unknown error.";
      }

      l = undefined;
      if (err.match && err.match(/line (\d+)/i)) {
        l = err.match(/line (\d+)/i)[1];
      }

      throw new ModelError(msg, {
        code: 1055,
        primitive: node,
        showEditor: true,
        line: l,
        details: err.match ? err : undefined
      });
    }
  }


  if (node instanceof Action) {
    dna.trigger = node.trigger;
    dna.repeat = node.repeat;
    dna.recalculate = node.recalculate || node.trigger === "Condition";
    try {
      dna.triggerValue = createTree(node.value, "p:" + node.id + ":triggerValue", simulate);
    } catch (err) {
      let msg = `The trigger for <i>[${toHTML(dna.name)}]</i> has an equation error that must be corrected before the model can be run.`;
      if (err instanceof ModelError) {
        msg = msg + "<br/><br/>" + err.message;
      }
      throw new ModelError(msg, {
        code: 1056,
        primitive: node,
        showEditor: true,
        line: l
      });
    }
  } else if (node instanceof Transition) {
    dna.trigger = node.trigger;
    dna.repeat = node.repeat;
    dna.recalculate = node.recalculate || node.trigger === "Condition";
  } else if (node instanceof State) {
    if (node.residency === undefined || node.residency.trim() === "") {
      dna.residency = null;
    } else {
      try {
        dna.residency = evaluateTree(trimTree(createTree(node.residency, "p:" + dna.id + ":residency", simulate), new Map(), simulate), new Map(), simulate);
        if (!dna.residency.units) {
          dna.residency.units = simulate.timeUnits;
        }
        if (eq(dna.residency, new Material(0, simulate.timeUnits))) {
          dna.residency = null;
        }
      } catch (err) {
        throw new ModelError("Invalid state residency.", {
          primitive: node,
          showEditor: false,
          code: 1016
        });
      }
    }
  } else if (node instanceof Stock) {
    dna.nonNegative = node.nonNegative;
    if (node.type === "Conveyor") {
      dna.stockType = "Conveyor";
      try {
        dna.delay = evaluateTree(trimTree(createTree(node.delay, "p:" + node.id + ":delay", simulate), new Map(), simulate), new Map(), simulate);
        if (!dna.delay.units) {
          dna.delay.units = simulate.timeUnits;
        }
      } catch (err) {
        throw new ModelError("Invalid stock delay.", {
          primitive: node,
          showEditor: false,
          code: 1017
        });
      }
      if (!(dna.delay instanceof Material)) {
        throw new ModelError("Stock delay must be a number.", {
          primitive: node,
          showEditor: false,
          code: 1073
        }); 
      }
      if (dna.delay.value < 0) {
        throw new ModelError("Stock delay cannot be less than 0.", {
          primitive: node,
          showEditor: false,
          code: 1074
        }); 
      }
    }
  } else if (node instanceof Flow) {
    dna.nonNegative = node.nonNegative;
  } else if (node instanceof Converter) {
    dna.interpolation = node.interpolation === "Linear" ? "linear" : "discrete";

    let data = node.values;

    if (!data || !data.length) {
      throw new ModelError(`The converter <i>[${toHTML(dna.name)}]</i> does not have any data.`, {
        primitive: node,
        showEditor: true,
        code: 1018
      });
    }

    /** @type {Material[]} */
    let inp = [];
    /** @type {Material[]} */
    let out = [];

    /** @type {import('./formula/Units').UnitStore} */
    let myU;

    if (node.input === "Time") {
      myU = simulate.timeUnits;
    } else {
      let sourcePrimitive = node.input;
      if (sourcePrimitive) {
        myU = createUnitStore(sourcePrimitive.units, simulate, node);
      } else {
        throw new ModelError(`The converter <i>[${toHTML(dna.name)}]</i> does not have a source.`, {
          primitive: node,
          showEditor: true,
          code: 1019
        });
      }
    }

    dna.source = node.input === "Time" ? node.input : node.input.id;

    for (let i = 0; i < data.length; i++) {
      inp.push(new Material(data[i].x, myU));
      out.push(new Material(data[i].y));
    }
    dna.inputs = inp;
    dna.outputs = out;
  }

  if (node instanceof ValuedPrimitive) {
    if (!(node instanceof Transition) && !(node instanceof Action)) {
      let u = node.units;
      try {
        if (!(node instanceof Flow) || (u && u.trim() && u.trim().toLowerCase() !== "unitless")) {
          dna.units = createUnitStore(u, simulate, node);
        } else {
          dna.units = simulate.timeUnits.power(-1);
          dna.flowUnitless = true;
        }
      } catch (err) {
        throw new ModelError(`Invalid units specified for primitive: "<i>${toHTML(u)}</i>"`, {
          primitive: node,
          showEditor: true,
          code: 1020
        });
      }
    } else {
      if (dna.trigger === "Timeout") {
        dna.units = simulate.timeUnits;
      }
    }
    let constraints = node.constraints;
    dna.maxConstraint = constraints.max;
    dna.useMaxConstraint = "max" in constraints;
    dna.minConstraint = constraints.min;
    dna.useMinConstraint = "min" in constraints;

  }

  if (dna.units && !dna.units.isUnitless()) {
    dna.units.addBase();
    dna.toBase = dna.units.toBase;
  } else {
    dna.toBase = 1;
  }

  dna.unitless = !dna.units;

  return dna;
}


/**
 * @param {import("./api/Blocks").Primitive} node
 * @param {Object<string, import("./Simulator").SolverType>} solvers
 *
 * @return {import("./Simulator").SolverType}
 */
function folderSolvers(node, solvers) {
  if (!node) {
    return solvers.base;
  }
  if (node instanceof Population) {
    let x = node.agentBase;
    if (x && solvers[x.id]) {
      return solvers[x.id];
    }
  }

  let p = node.parent;
  if (p && solvers[p.id]) {
    return solvers[p.id];
  }

  return folderSolvers(p, solvers);
}


/**
 * @param {DNA} dna
 * @param {SAgent} agent
 * @param {import("./Simulator").Simulator} simulate
 * @param {boolean} inContainer
 * 
 */
export function decodeDNA(dna, agent, simulate, inContainer) {
  /** @type {SPrimitive} */
  let x;
  if (dna.primitive instanceof Variable) {
    x = new SVariable(simulate);
  } else if (dna.primitive instanceof State) {
    x = new SState(simulate);
  } else if (dna.primitive instanceof Transition) {
    x = new STransition(simulate);
  } else if (dna.primitive instanceof Action) {
    x = new SAction(simulate);
  } else if (dna.primitive instanceof Stock) {
    x = new SStock(simulate);
  } else if (dna.primitive instanceof Flow) {
    x = new SFlow(simulate);
  } else if (dna.primitive instanceof Converter) {
    x = new SConverter(simulate);
  }

  if (x) {
    x.dna = dna;
    x.id = dna.id;
    if (inContainer) {
      x.index = agent.index;
      x.agentId = agent.agentId;
      x.container = agent;
      x.createIds();
    }

    x.frozen = dna.frozen;

    agent.children.push(x);
    agent.childrenId[x.id] = x;

    if (dna.slider) {
      if (simulate.sliders[dna.id]) {
        simulate.sliders[dna.id].push(x);
      } else {
        simulate.sliders[dna.id] = [x];
      }
    }


    if (x instanceof SAction) {
      dna.solver.actions.push(x);
    } else if (x instanceof STransition) {
      dna.solver.transitions.push(x);
    } else if (!(x instanceof SPopulation)) {
      dna.solver.valued.push(x);
      if (x instanceof SFlow) {
        dna.solver.flows.push(x);
      } else if (x instanceof SStock) {
        dna.solver.stocks.push(x);
      } else if (x instanceof SState) {
        dna.solver.states.push(x);
      }
    }

    if (dna.neighborProxyDNA) {
      x.neighborProxyPrimitive = agent.children.find(x => x.dna === dna.neighborProxyDNA);
    }
  } else if (dna.primitive instanceof Population) {
    agent.children.push(dna.agents);
    agent.childrenId[dna.id] = dna.agents;
  }

}


/**
 * @param {import("./Primitives").SPrimitive} primitive
 * @param {DNA} dna
 * @param {import("./Simulator").Simulator} simulate
 */
export function linkPrimitive(primitive, dna, simulate) {
  if (!(primitive instanceof SPopulation)) {
    let myNeighborhood = getPrimitiveNeighborhood(primitive.neighborProxyPrimitive ? primitive.neighborProxyPrimitive : primitive, primitive.neighborProxyPrimitive ? primitive.dna.neighborProxyDNA : dna, simulate, primitive.dna.extraLinksPrimitives);

    if (primitive instanceof SFlow || primitive instanceof STransition) {
      let localNeighborhood = myNeighborhood;
      if (primitive.neighborProxyPrimitive) {
        localNeighborhood = getPrimitiveNeighborhood(primitive, dna, simulate, primitive.dna.extraLinksPrimitives);
      }

      let alpha = null,
        omega = null;

      if (localNeighborhood.has("[alpha")) {
        alpha = /** @type {any} */ (localNeighborhood.get("[alpha"));
        if (!localNeighborhood.has("alpha")) {
          localNeighborhood.set("alpha", alpha);
        }
      }

      if (localNeighborhood.has("[omega")) {
        omega = /** @type {any} */ (localNeighborhood.get("[omega"));
        if (!localNeighborhood.has("omega")) {
          localNeighborhood.set("omega", omega);
        }
      }

      if (primitive instanceof STransition) {
        if (alpha && !(alpha instanceof SState)) {
          throw new ModelError(`The start of the primitive <i>[${dna.name}]</i> must be a state.`, {
            primitive: dna.primitive,
            showEditor: false,
            code: 1060
          });
        }
        if (omega && !(omega instanceof SState)) {
          throw new ModelError(`The end of the primitive <i>[${dna.name}]</i> must be a state.`, {
            primitive: dna.primitive,
            showEditor: false,
            code: 1061
          });
        }
      }

      if (primitive instanceof SFlow) {
        if (alpha && !(alpha instanceof SStock)) {
          throw new ModelError(`The start of the primitive <i>[${dna.name}]</i> must be a stock.`, {
            primitive: dna.primitive,
            showEditor: false,
            code: 1062
          });
        }
        if (omega && !(omega instanceof SStock)) {
          throw new ModelError(`The end of the primitive <i>[${dna.name}]</i> must be a stock.`, {
            primitive: dna.primitive,
            showEditor: false,
            code: 1063
          });
        }
      }

      primitive.setEnds(alpha, omega);
    }

    if (primitive instanceof SAction) {
      try {
        primitive.equation = trimTree(dna.triggerValue, myNeighborhood, primitive.simulate);
      } catch (err) {
        let msg = `The primitive <i>[${toHTML(dna.name)}]</i> has an equation error that must be corrected before the model can be run.`;
        if (err instanceof ModelError) {
          msg = msg + "<br/><br/>" + err.message;
        }

        throw new ModelError(msg, {
          primitive: dna.primitive,
          showEditor: false,
          code: 1064
        });
      }
      try {
        primitive.action = trimTree(dna.value, myNeighborhood, primitive.simulate);
      } catch (err) {
        let msg = `The primitive <i>[${toHTML(dna.name)}]</i> has an equation error that must be corrected before the model can be run.`;
        if (err instanceof ModelError) {
          msg = msg + "<br/><br/>" + err.message;
        }
        let l = undefined;
        if (err.match && err.match(/line (\d+)/i)) {
          l = err.match(/line (\d+)/i)[1];
        }

        throw new ModelError(msg, {
          primitive: dna.primitive,
          showEditor: true,
          code: 1065,
          line: l,
          details: err.match ? err : undefined
        });
      }
    } else if (primitive instanceof SConverter) {
      if (dna.source === "Time") {
        primitive.setSource("*time");
      } else {
        let source = dna.source;
        let sourceSet = false;
        for (let neighbor of myNeighborhood.keys()) {
          if (source === myNeighborhood.get(neighbor).id) {
            primitive.setSource(myNeighborhood.get(neighbor));
            sourceSet = true;
            break;
          }
        }

        if (!sourceSet) {
          throw new ModelError("Converter source could not be found. Please redefine it.", {
            primitive: dna.primitive,
            showEditor: false,
            code: 1066
          });
        }


      }
    } else {
      primitive.setEquation(dna.value, myNeighborhood);
    }
  }
}


/**
 * @param {SAgent} agent
 */
export function setAgentInitialValues(agent) {
  for (let child of agent.children) {
    if (child instanceof SStock) {
      child.setDelay();
      try {
        child.setInitialValue();
      } catch (err) {
        if (err instanceof ModelError) {
          if (!err.primitive) {
            // if we don't have a primitive, use this one
            // otherwise keep the original error source
            err.primitive = child.orig();
          }
          throw err;
        } else {
          throw err;
        }
      }
    } else if (child instanceof SState) {
      try {
        if (child.active === null) {
          child.setInitialActive(true);
        }
      } catch (err) {
        if (err instanceof ModelError) {
          if (!err.primitive) {
            // if we don't have a primitive, use this one
            // otherwise keep the original error source
            err.primitive = child.orig();
          }
          throw err;
        } else {
          throw err;
        }
      }
    }
  }
}


/**
 * @param {SubModelType} submodel
 * @param {import("./Simulator").Simulator} simulate
 */
function buildNetwork(submodel, simulate) {
  if (submodel.network === "Custom Function") {
    let neighbors = getPrimitiveNeighborhood(submodel, submodel.dna, simulate, []);
    let tree = trimTree(createTree(submodel.networkFunction, "p:" + submodel.id + ":networkFunction", simulate), neighbors, simulate);
    for (let i = 0; i < submodel.agents.length - 1; i++) {
      for (let j = i + 1; j < submodel.agents.length; j++) {
        // @ts-ignore
        if (trueValue(simpleEquation(submodel.networkFunction, simulate, new Map([
          ["-parent", simulate.varBank],
          ["a", submodel.agents[i]],
          ["b", submodel.agents[j]]
        ]), neighbors, tree))) {
          submodel.agents[i].connect(submodel.agents[j]);
        }
      }
    }
  } else if (submodel.network === "None") {
    // nothing to do
  } else {
    throw new ModelError(`Unknown network type: ${toHTML(submodel.network)}.`, {
      primitive: submodel.node,
      showEditor: false,
      code: 1020
    });
  }
}


/**
 * @param {SubModelType} submodel
 * @param {import("./Simulator").Simulator} simulate
 */
function buildPlacements(submodel, simulate) {
  let tree;
  /** @type {number} */
  let wCount;
  /** @type {number} */
  let hCount;


  if (submodel.placement === "Random") {
    for (let agent of submodel.agents) {
      agent.location = new Vector([mult(submodel.geoWidth, new Material(Rand(simulate))), mult(submodel.geoHeight, new Material(Rand(simulate)))], simulate, ["x", "y"]);
    }
  } else if (submodel.placement === "Custom Function") {
    submodel.agents.forEach((s) => {
      let n = getPrimitiveNeighborhood(submodel, submodel.dna, simulate, []);
      // @ts-ignore
      n.set("self", s);
      // @ts-ignore
      s.location = simpleUnitsTest(/** @type {Vector} */(simpleEquation(submodel.placementFunction, simulate, new Map([
        ["-parent", simulate.varBank],
        ["self", s]
      ]), n)), submodel.geoDimUnitsObject, simulate, null, null, "Agent placement functions must return a two element vector");

      validateAgentLocation(s.location, submodel.node);

      if (!s.location.names) {
        s.location.names = ["x", "y"];
        s.location.namesLC = ["x", "y"];
      }
    });
  } else if (submodel.placement === "Grid") {
    tree = trimTree(createTree("{x: x*width(self), y: y*height(self)}", "_", simulate), new Map(), simulate);
    let size = submodel.agents.length;
    // @ts-ignore
    let ratio = /** @type {number} */ (simpleNum(simpleEquation("width(self)/height(self)", simulate, new Map([
      ["-parent", simulate.varBank],
      ["self", submodel]
    ]), new Map()), submodel.geoDimUnitsObject, simulate));

    hCount = Math.sqrt(size / ratio);
    wCount = Math.floor(hCount * ratio);

    hCount = Math.ceil(hCount);
    if (hCount * wCount < size) {
      wCount = wCount + 1;
    }

    let j = 0;
    submodel.agents.forEach((s) => {
      let xPos = (j % wCount + 0.5) / wCount;
      let yPos = (Math.floor(j / wCount) + 0.5) / hCount;
      // @ts-ignore
      s.location = simpleUnitsTest(/** @type {Vector} */(simpleEquation("{x: x*width(self), y: y*height(self)}", simulate, new Map([
        ["self", s],
        ["x", new Material(xPos)],
        ["y", new Material(yPos)],
        ["-parent", simulate.varBank]
      ]), new Map(), tree)), submodel.geoDimUnitsObject, simulate);
      j++;
    });
  } else if (submodel.placement === "Ellipse") {
    tree = trimTree(createTree("{width(self), height(self)}/2+{sin(index(self)/size*2*3.14159), cos(index(self)/size*2*3.14159)}*{width(self), height(self)}/2", "_", simulate), new Map(), simulate);
    let size = new Material(submodel.agents.length);
    submodel.agents.forEach((s) => {
      // @ts-ignore
      s.location = simpleUnitsTest(/** @type {Vector} */(simpleEquation("{width(self), height(self)}/2+{sin(index(self)/size*2*3.14159), cos(index(self)/size*2*3.14159)}*{width(self), heigh(self)}/2", simulate, new Map([
        ["self", s],
        ["size", size],
        ["-parent", simulate.varBank]
      ]), new Map(), tree)), submodel.geoDimUnitsObject, simulate);
    });
  } else if (submodel.placement === "Network") {
    tree = trimTree(createTree("{x: x*width(self), y: y*height(self)}", "_", simulate), new Map(), simulate);

    let graph = new Graph();

    let nodes = submodel.agents.map((s) => {
      return graph.newNode({
        data: s
      });
    });
    let getNode = function (item) {
      for (let node of nodes) {
        if (node.data.data === item) {
          return node;
        }
      }
      return null;
    };
    submodel.agents.forEach((a) => {
      a.connected.forEach((target) => {
        graph.newEdge(getNode(a), getNode(target));
      });
    });

    let layout = new Layout.ForceDirected(graph, 400.0, 600.0, 0.5);
    layout.getRandom = () => Rand(simulate);

    for (let i = 0; i < 60; i++) {
      layout.applyCoulombsLaw();
      layout.applyHookesLaw();
      layout.attractToCentre();
      layout.updateVelocity(0.03);
      layout.updatePosition(0.03);
    }

    let bb = layout.getBoundingBox();

    bb.width = bb.topright.x - bb.bottomleft.x;
    bb.height = bb.topright.y - bb.bottomleft.y;

    let scalePoint = function (p) {
      return {
        x: (p.x - bb.bottomleft.x) / bb.width,
        y: (p.y - bb.bottomleft.y) / bb.height
      };
    };

    layout.eachNode((node, point) => {
      let p = scalePoint(point.p);
      // @ts-ignore
      node.data.data.location = simpleUnitsTest(simpleEquation("{x: x*width(self), y: y*height(self)}", simulate, new Map([
        ["self", submodel],
        ["x", new Material(p.x)],
        ["y", new Material(p.y)],
        ["-parent", simulate.varBank]
      ]), new Map(), tree), submodel.geoDimUnitsObject, simulate);
    });

  } else {
    throw new ModelError(`Unknown placement type: ${toHTML(submodel.placement)}.`, {
      primitive: submodel.node,
      showEditor: false,
      code: 1021
    });
  }

}


/**
 * @param {import("./Primitives").SPrimitive} primitive
 * @param {DNA} dna
 * @param {import("./Simulator").Simulator} simulate
 * @param {Primitive[]} extraLinksPrimitives
 *
 * @returns {Map<string, import('./Primitives').SPrimitive>}
 */
export function getPrimitiveNeighborhood(primitive, dna, simulate, extraLinksPrimitives) {
  let neighbors = dna.primitive.neighbors();
  if (extraLinksPrimitives) {
    for (let link of extraLinksPrimitives) {
      neighbors.push({
        item: link,
        type: "direct"
      });
    }
  }

  /** @type {Object<string, Placeholder>} */
  let placeholders = simulate.allPlaceholders[dna.id] ? simulate.allPlaceholders[dna.id] : {};

  /** @type {Map} */
  let ns = new Map([[
    "self", primitive
  ]]);


  if (primitive instanceof SPopulation) {
    for (let dna of primitive.DNAs) {
      placeholders[dna.name.toLowerCase()] = new Placeholder(dna, primitive, simulate);
    }
  }

  for (let neighbor of neighbors) {
    let item = neighbor.item;
    if (item instanceof Population) {
      ns.set(primitive.simulate.simulationModel.submodels[item.id].dna.name.toLowerCase(),  primitive.simulate.simulationModel.submodels[item.id]);

      for (let dna of primitive.simulate.simulationModel.submodels[item.id].DNAs) {
        let key = dna.name.toLowerCase();
        if (!ns.has(key)) {
          ns.set(key, new Placeholder(dna, primitive, simulate));
        }
      }
    } else if (neighbor.type !== "agent") {
      let found = false;
      /** @type {string} */
      let neighborhoodName;
      if (primitive.container) {
        if (primitive.container.childrenId[item.id]) {
          neighborhoodName = primitive.container.childrenId[item.id].dna.name.toLowerCase();

          ns.set(neighborhoodName,  primitive.container.childrenId[item.id]);
          found = true;
        }
      }
      if (!found) {
        if (primitive.simulate.simulationModel.submodels["base"]["agents"][0].childrenId[item.id]) {
          neighborhoodName = primitive.simulate.simulationModel.submodels["base"]["agents"][0].childrenId[item.id].dna.name.toLowerCase();

          ns.set(neighborhoodName, primitive.simulate.simulationModel.submodels["base"]["agents"][0].childrenId[item.id]);
          found = true;
        }
      }


      if (!found && (primitive instanceof SFlow || primitive instanceof STransition) && item === simulate.model.getId(item.id)) {
        if (primitive instanceof SFlow) {
          throw new ModelError("Flow primitives may not cross agent boundaries.", {
            primitive: dna.primitive,
            showEditor: false,
            code: 1070
          });
        } else {
          throw new ModelError("Transition primitives may not cross agent boundaries.", {
            primitive: dna.primitive,
            showEditor: false,
            code: 1071
          });
        }
      }

      if (primitive instanceof SFlow || primitive instanceof STransition) {
        if (ns.has(neighborhoodName)) {
          if (dna.targetId === ns.get(neighborhoodName).id) {
            ns.set("[omega", ns.get(neighborhoodName));
          } else if (dna.sourceId === ns.get(neighborhoodName).id) {
            ns.set("[alpha", ns.get(neighborhoodName));
          }
        }
      }
    }
  }


  for (let key in placeholders) {
    if (!ns.has(key)) {
      ns.set(key, placeholders[key]);
    }
  }

  simulate.allPlaceholders[dna.id] = placeholders;

  return ns;
}


/**
 * @param {import("./api/Blocks").Primitive} node
 *
 * @returns {boolean}
 */
function modelType(node) {
  return (node instanceof Stock) || (node instanceof Flow) || (node instanceof State) || (node instanceof Transition) || (node instanceof Converter) || (node instanceof Variable) || (node instanceof Action) || (node instanceof Population);
}


/**
 * @param {import("./Simulator").SolverType} solver
 * @param {import("./Simulator").Simulator} simulate
 */
export function updateDisplayed(solver, simulate) {
  let displayed = solver.displayed;

  if (simulate.displayInformation.store) {
    for (let k = simulate.displayInformation.store.data.length; k < simulate.results.times.length; k++) {
      let inStore = simulate.displayInformation.store.data[k];
      let d = {};
      if (!inStore) {
        d["id"] = k;
        d["Time"] = simulate.results.times[k];
      }

      if (displayed.length > 0) {
        if (simulate.results.data[k][displayed[0].id] === undefined) {
          // continue;
        } else {
          for (let j = 0; j < displayed.length; j++) {

            let i = simulate.displayInformation.ids.indexOf(displayed[j].id);

            if (i > -1) {
              if (simulate.results.children[simulate.displayInformation.ids[i]].states) {
                let states = simulate.results.children[simulate.displayInformation.ids[i]].states;

                if (simulate.results.data[k][displayed[j].id]) {
                  let current = simulate.results.data[k][displayed[j].id].current;

                  /** @type {Object<string, number>} */
                  let tally = {};
                  for (let item of current) {
                    if (item.state) {
                      for (let state of item.state) {
                        tally[state.id.toString()] = tally[state.id.toString()] + 1 || 1;
                      }
                    }
                  }

                  let q = 0;
                  states.forEach(state => {
                    d[simulate.displayInformation.elementIds[i + q]] = tally[state] || 0;
                    q++;
                  });
                }
              } else if (simulate.results.children[simulate.displayInformation.ids[i]].indexedNames) {
                let z = 0;
                while (i < simulate.displayInformation.ids.length && simulate.displayInformation.ids[i] === displayed[j].id) {
                  try {
                    d[simulate.displayInformation.elementIds[i]] = selectFromMatrix(simulate.results.data[k][displayed[j].id].fullClone(), simulate, simulate.results.children[simulate.displayInformation.ids[i]].indexedFullNames[z].slice());
                  } catch (err) {
                    throw new ModelError("Cannot change vector keys during a simulation.", {
                      primitive: displayed[j].dna.primitive,
                      showEditor: true,
                      code: 1022
                    });

                  }

                  z++;
                  i++;
                }

              } else {
                d[simulate.displayInformation.elementIds[i]] = simulate.results.data[k][displayed[j].id];
              }
            }
          }
        }
      }

      if (inStore) {
        Object.assign(inStore, d);
      } else {
        simulate.displayInformation.store.data.push(d);
      }
    }

    if (!simulate.resultsWindow) {
      simulate.resultsWindow = simulate.config.createResultsWindow(simulate);
    }
  }
}


export function validateAgentLocation(location, primitive) {
  let invalidLocationError = () => {
    throw new ModelError("Agent placement functions must return a two element vector", {
      primitive,
      showEditor: false,
      code: 1023
    });
  };

  if (!(location instanceof Vector)) {
    invalidLocationError();
  }

  if (location.length() !== 2) {
    invalidLocationError();
  }

  if (!(location.items[0] instanceof Material)) {
    invalidLocationError();
  }

  if (!(location.items[1] instanceof Material)) {
    invalidLocationError();
  }

}

/**
 * @param {import("./Simulator").Simulator} simulate} simulate
 */
function makeClusters(simulate) {
  let ordering = {};

  let flows = simulate.model.findFlows();
  let clusterId = 0;
  while (flows.length) {
    clusterId++;

    let flow = flows[0];

    let cluster = {
      availableFlows: flows,
      edges: [],
      stockSet: new Set(),
      flowSet: new Set(),
      simulate
    };

    clusterAddFlow(cluster, flow);

    let sorted;
    try {
      sorted = toposort(cluster.edges);
    } catch (_err) {
      // circular - so order by id.
      // TODO: explore if there is something better we can do in this
      // case
      let items = [...cluster.flowSet.entries()].map(x => x[0]);
      items.sort((a, b) => a.id - b.id);
      let flowCount = 0;
      for (let flow of items) {
        flowCount++;
        ordering[flow.id] = {
          cluster: clusterId,
          flow: flowCount
        };
      }
      continue;
    }

    let flowCount = 0;
    for (let item of sorted) {
      if (item instanceof Flow) {
        flowCount++;
        ordering[item.id] = {
          cluster: clusterId,
          flow: flowCount
        };
      }
    }
  }

  return ordering;
}



/**
 * @param {*} cluster
 * @param {Flow} flow
 */
function clusterAddFlow(cluster, flow) {
  cluster.flowSet.add(flow);
  cluster.availableFlows.splice(cluster.availableFlows.indexOf(flow), 1);
  let alpha = flow.start;
  let omega = flow.end;

  if (alpha && alpha.nonNegative) {
    cluster.edges.push([alpha, flow]);
    if (!cluster.stockSet.has(alpha)) {
      cluster.stockSet.add(alpha);
      clusterAddStock(cluster, alpha);
    }
  }
  if (omega && omega.nonNegative) {
    cluster.edges.push([flow, omega]);
    if (!cluster.stockSet.has(omega)) {
      cluster.stockSet.add(omega);
      clusterAddStock(cluster, omega);
    }
  }
}

/**
 * @param { {availableFlows: Flow[], simulate: import("./Simulator").Simulator} } cluster
 * @param {Stock} stock
 */
function clusterAddStock(cluster, stock) {
  let found = true;
  while (found) {
    found = false;
    for (let flow of cluster.availableFlows) {
      let alpha = flow.start;
      let omega = flow.end;

      if (alpha === stock || omega === stock) {
        clusterAddFlow(cluster, flow);
        found = true;
        break;
      }
    }
  }
}


// Ensures each macro primitive has a unique name
let macroCounter = 0;




function delayGenerator(parameters, primitiveDNA, node, submodel, solvers, simulate) {
  let {
    input,
    initialValue,
    period,
    order
  } = parameters;

  order = evaluateTree(trimTree(order, new Map(), simulate), new Map(), simulate).value;

  
  if (order < 1 || order !== Math.floor(order)) {
    throw new ModelError("DelayN order must be an integer greater than or equal to 1.", {
      primitive: primitiveDNA.primitive,
      showEditor: true,
      code: 1078
    });
  }

  let m = new Model();


  let outflowName = "__DelayN Outflow " + macroCounter++;

  let stockNames = [];
  let stocks = [];
  let flows = [];



  for (let i = 0; i < order; i++) {
    stockNames.push("__DelayN Stock " + macroCounter++);
    stocks.push(m.Stock({
      name: stockNames[stockNames.length - 1],
      initial: "(iv) || (i)"
    }));
    stocks[i]._node.id = "" + Math.random();
  }


  let f = m.Flow(null, stocks[0], {
    name: "DelayN Inflow",
    rate: "(i)",
    nonNegative: false
  });
  f._node.id = "" + Math.random();
  flows.push(f);

  for (let i = 1; i < order; i++) {
    f = m.Flow(stocks[i - 1], stocks[i], {
      name: "DelayN Flow " + i,
      rate: "(alpha) / (p/order)",
      nonNegative: false
    });
    f._node.id = "" + Math.random();
    flows.push(f);
  }

  f = m.Flow(stocks[order - 1], null, {
    name: outflowName,
    rate: "(alpha) / (p/order)",
    nonNegative: false
  });
  f._node.id = "" + Math.random();
  flows.push(f);




  period = new TreeNode("LINES", "LINES", node.position, [
    // create temp variable with unitless value
    new TreeNode("ASSIGN", "ASSIGN", node.position, [
      new TreeNode("ASSIGNED", "ASSIGNED", node.position, [
        new TreeNode("__tmp_macro_period", "IDENT", node.position)
      ]),
      new TreeNode("INNER", "INNER", node.position, [
        new TreeNode("RemoveUnits", "IDENT", node.position),
        new TreeNode("FUNCALL", "FUNCALL", node.position, [
          period,
          new TreeNode("\"" + simulate.timeUnitsString + "\"", "STRING", node.position)
        ])
      ])
    ]),
    // assert it's greater than 0
    new TreeNode("INNER", "INNER", node.position, [
      new TreeNode("Assert", "IDENT", node.position),
      new TreeNode("FUNCALL", "FUNCALL", node.position, [
        // Code for:
        //   > not contains({PERIOD > 0}, false)
        // this confirms all the values in period are greater than 0
        // period can be a scalar or vector
        new TreeNode("NOT", "NOT", node.position, [

          new TreeNode("INNER", "INNER", node.position, [
            new TreeNode("Contains", "IDENT", node.position),
            new TreeNode("FUNCALL", "FUNCALL", node.position, [

              new TreeNode("ARRAY", "ARRAY", node.position, [
                new TreeNode("LABEL", "LABEL", node.position, [
                  new TreeNode("INNER", "INNER", node.position, [
                    new TreeNode(">", "GT", node.position, [
                      new TreeNode("__tmp_macro_period", "IDENT", node.position),
                      new TreeNode("0", "INTEGER", node.position)
                    ])
                  ])
                ])
              ]),
              new TreeNode("FALSE", "FALSE", node.position)
            ])
          ]),
        ]),

        new TreeNode("\"Period for Delay() must be greater than 0.\"", "STRING", node.position)
      ])
    ]),
    // return it
    new TreeNode("__tmp_macro_period", "IDENT", node.position)
  ]);

  let periodOverOrder = new TreeNode("DIV", "DIV", node.position, [
    period,
    new TreeNode("" + order, "INTEGER", node.position)
  ]);

  let sDNAs = stocks.map((s) => getDNA(s, submodel, solvers, simulate));
  let fDNAs = flows.map((i) => getDNA(i, submodel, solvers, simulate));

  
  for (let i = 1; i < fDNAs.length; i++) {
    fDNAs[i].extraLinksPrimitives.push(stocks[i - 1]);
  }

  primitiveDNA.extraLinksPrimitives.push(flows[flows.length - 1]);

  fDNAs[0].value = input.cloneStructure();
  let init = new TreeNode("MULT", "MULT", node.position, [
    initialValue ? initialValue.cloneStructure() : input.cloneStructure(),
    periodOverOrder.cloneStructure()
  ]);
  for (let i = 0; i < sDNAs.length; i++) {
    sDNAs[i].value = init.cloneStructure();
  }

  for (let i = 1; i < fDNAs.length; i++) {
    fDNAs[i].value = new TreeNode("DIV", "DIV", node.position, [
      new TreeNode("[" + stockNames[i - 1] + "]", "PRIMITIVE", node.position),
      periodOverOrder.cloneStructure()
    ]);
  }

  for (let i = 0; i < sDNAs.length; i++) {
    sDNAs[i].noOutput = true;
    sDNAs[i].adoptUnits = true;
    sDNAs[i].neighborProxyDNA = primitiveDNA;
    submodel.DNAs.push(sDNAs[i]);
  }

  for (let i = 0; i < fDNAs.length; i++) {
    fDNAs[i].noOutput = true;
    fDNAs[i].adoptUnits = true;
    fDNAs[i].neighborProxyDNA = primitiveDNA;
    submodel.DNAs.push(fDNAs[i]);
  }


  return new TreeNode("[" + outflowName + "]", "PRIMITIVE", node.position);
}


function smoothGenerator(parameters, primitiveDNA, node, submodel, solvers, simulate) {
  let {
    input,
    initialValue,
    period,
    order
  } = parameters;

  order = evaluateTree(trimTree(order, new Map(), simulate), new Map(), simulate).value;

  if (order < 1 || order !== Math.floor(order)) {
    throw new ModelError("SmoothN order must be an integer greater than or equal to 1.", {
      primitive: primitiveDNA.primitive,
      showEditor: true,
      code: 1079
    });
  }

  let m = new Model();


  let stockNames = [];
  let stocks = [];
  let flows = [];


  for (let i = 0; i < order; i++) {
    stockNames.push("__SmoothN Stock " + macroCounter++);
    stocks.push(m.Stock({
      name: stockNames[stockNames.length - 1],
      initial: "(iv) || (i)"
    }));
    stocks[i]._node.id = "" + Math.random();
  }

  for (let i = 0; i < order; i++) {
    let f = m.Flow(null, stocks[i], {
      name: "SmoothN Flow " + i,
      rate: "(alpha) / (p/order)",
      nonNegative: false
    });
    f._node.id = "" + Math.random();
    flows.push(f);
  }




  period = new TreeNode("LINES", "LINES", node.position, [
    // create temp variable with unitless value
    new TreeNode("ASSIGN", "ASSIGN", node.position, [
      new TreeNode("ASSIGNED", "ASSIGNED", node.position, [
        new TreeNode("__tmp_macro_period", "IDENT", node.position)
      ]),
      new TreeNode("INNER", "INNER", node.position, [
        new TreeNode("RemoveUnits", "IDENT", node.position),
        new TreeNode("FUNCALL", "FUNCALL", node.position, [
          period,
          new TreeNode("\"" + simulate.timeUnitsString + "\"", "STRING", node.position)
        ])
      ])
    ]),
    // assert it's greater than 0
    new TreeNode("INNER", "INNER", node.position, [
      new TreeNode("Assert", "IDENT", node.position),
      new TreeNode("FUNCALL", "FUNCALL", node.position, [
        

        // Code for:
        //   > not contains({PERIOD > 0}, false)
        // this confirms all the values in period are greater than 0
        // period can be a scalar or vector
        new TreeNode("NOT", "NOT", node.position, [

          new TreeNode("INNER", "INNER", node.position, [
            new TreeNode("Contains", "IDENT", node.position),
            new TreeNode("FUNCALL", "FUNCALL", node.position, [

              new TreeNode("ARRAY", "ARRAY", node.position, [
                new TreeNode("LABEL", "LABEL", node.position, [
                  new TreeNode("INNER", "INNER", node.position, [
                    new TreeNode(">", "GT", node.position, [
                      new TreeNode("__tmp_macro_period", "IDENT", node.position),
                      new TreeNode("0", "INTEGER", node.position)
                    ])
                  ])
                ])
              ]),
              new TreeNode("FALSE", "FALSE", node.position)
            ])
          ]),
        ]),

        new TreeNode("\"Period for Smooth() must be greater than 0.\"", "STRING", node.position)
      ])
    ]),
    // return it
    new TreeNode("__tmp_macro_period", "IDENT", node.position)
  ]);

  let periodOverOrder = new TreeNode("DIV", "DIV", node.position, [
    period,
    new TreeNode("" + order, "INTEGER", node.position)
  ]);

  let sDNAs = stocks.map((s) => getDNA(s, submodel, solvers, simulate));
  let fDNAs = flows.map((i) => getDNA(i, submodel, solvers, simulate));

  for (let i = 0; i < order; i++) {
    fDNAs[i].extraLinksPrimitives.push(stocks[i]);
    if (i > 0) {
      fDNAs[i].extraLinksPrimitives.push(stocks[i - 1]);
    }
  }

  primitiveDNA.extraLinksPrimitives.push(stocks[stocks.length - 1]);
  

  for (let i = 0; i < order; i++) {
    sDNAs[i].value = initialValue ? initialValue.cloneStructure() : input.cloneStructure();
  }

  for (let i = 0; i < order; i++) {
    fDNAs[i].value = new TreeNode("DIV", "DIV", node.position, [
      new TreeNode("MINUS", "MINUS", node.position, [
        i === 0 ? input.cloneStructure() : new TreeNode("[" + stockNames[i - 1] + "]", "PRIMITIVE", node.position),
        new TreeNode("[" + stockNames[i] + "]", "PRIMITIVE", node.position)
      ]),
      periodOverOrder.cloneStructure()
    ]);
  }

  for (let i = 0; i < order; i++) {
    fDNAs[i].noOutput = true;
    fDNAs[i].adoptUnits = true;
    fDNAs[i].neighborProxyDNA = primitiveDNA;
    submodel.DNAs.push(fDNAs[i]);
    sDNAs[i].noOutput = true;
    sDNAs[i].adoptUnits = true;
    sDNAs[i].neighborProxyDNA = primitiveDNA;
    submodel.DNAs.push(sDNAs[i]);
  }



  return new TreeNode("[" + stockNames[stockNames.length - 1] + "]", "PRIMITIVE", node.position);

}




/** @type {Object<string, { replacement: function(any, DNA, TreeNode, any, any, import("./Simulator").Simulator): TreeNode}>} */
const MACRO_FNS = {
  "_initial": {
    replacement: (parameters) => {
      let {
        input,
        initialValue
      } = parameters;

      // when used in a stock or state initial value, just replace with the initial value
      return initialValue ? initialValue.cloneStructure() : input.cloneStructure();
    }
  },
  "smooth": {
    replacement: (parameters, primitiveDNA, node, submodel, solvers, simulate) => {
      parameters.order = new TreeNode("1", "INTEGER", node.position);
      return smoothGenerator(parameters, primitiveDNA, node, submodel, solvers, simulate);
    }
  },
  "smoothn": {
    replacement: (...params) => smoothGenerator(...params)
  },
  "delay1": {
    replacement: (parameters, primitiveDNA, node, submodel, solvers, simulate) => {
      parameters.order = new TreeNode("1", "INTEGER", node.position);
      return delayGenerator(parameters, primitiveDNA, node, submodel, solvers, simulate);
    }
  },
  "delay3": {
    replacement: (parameters, primitiveDNA, node, submodel, solvers, simulate) => {
      parameters.order = new TreeNode("3", "INTEGER", node.position);
      return delayGenerator(parameters, primitiveDNA, node, submodel, solvers, simulate);
    }
  },
  "delayn": {
    replacement: (...params) => delayGenerator(...params)
  }
};


/**
 * @param {TreeNode[]} children
 * @param {string} name
 * @param {{ target: string, value: TreeNode }[]} assigns
 *
 * @returns
 */
function getMacroParameters(children, name, assigns) {
  let requiresOrder = name.toLowerCase().endsWith("n");

  if (children.length > 3 + (requiresOrder ? 1 : 0) || children.length < 2 + (requiresOrder ? 1 : 0) ) {
    throw new ModelError(`Wrong number of parameters for ${name}().`, {
      code: 10001
    });
  }

  // We pull in the first level of assigns. fully solving the local state may not be possible
  // but this will address any reasonable use cases
  /**
   * @param {TreeNode} node
   */
  function pullInAssigns(node) {
    if (node.typeName === "IDENT") {
      for (let assign of assigns) {
        if (assign.target === node.text) {
          return assign.value.cloneStructure();
        }
      }
    }

    node.children = node.children.map(n => pullInAssigns(n));

    return node;
  }

  if (assigns.length) {
    children = children.map(n => pullInAssigns(n));
  }

  return {
    input: children[0],
    period: children[1],
    order: requiresOrder ? children[2] : null,
    initialValue: requiresOrder ? children[3] : children[2]
  };
}


const MACRO_FNS_NAMES = Object.keys(MACRO_FNS).filter(x => !x.startsWith("_"));


/**
 * @param {Primitive} primitive
 * @param {DNA} primitiveDNA
 * @param {import("./formula/Formula").TreeNode} node
 * @param {SubModelType} submodel
 * @param {Object<string, import("./Simulator.js").SolverType>} solvers
 * @param {import("./Simulator").Simulator} simulate
 * @param {boolean} isInitial
 * @param {object[]=} assigns
 *
 * @returns {TreeNode}
 */
function replaceMacros(primitive, primitiveDNA, node, submodel, solvers, simulate, isInitial, assigns = []) {
  let macroName;
  let parameters;

  if (node.typeName === "INNER") {
    if (node.children.length === 2) {
      if (node.children[0].typeName === "IDENT" && MACRO_FNS_NAMES.includes(node.children[0].text)) {
        macroName = node.children[0].text;
        if (node.children[1].typeName === "FUNCALL") {
          parameters = getMacroParameters(node.children[1].children.slice(), macroName, assigns);
        }
      }
    } else if (
      node.children.length === 3
      && node.children[0].typeName === "PRIMITIVE"
      && (node.children[1].typeName === "SELECTOR"
        && node.children[1].children[0].typeName === "DOTSELECTOR"
        && MACRO_FNS_NAMES.includes(node.children[1].children[0].children[0].text))
      && node.children[2].typeName === "FUNCALL"
    ) {
      macroName = node.children[1].children[0].children[0].text;
      parameters = getMacroParameters([node.children[0]].concat(node.children[2].children), macroName, assigns);
    }
  }

  if (macroName) {
    if (isInitial) {
      // for things like stock or state initial values, we can just use the input, and don't
      // need to create everything else
      return MACRO_FNS["_initial"].replacement(parameters, primitiveDNA, node, submodel, solvers, simulate);
    } else {
      return MACRO_FNS[macroName].replacement(parameters, primitiveDNA, node, submodel, solvers, simulate);
    }
  } else {
    node.children = node.children.map(n => replaceMacros(primitive, primitiveDNA, n, submodel, solvers, simulate, isInitial, assigns));
  }


  if (node.typeName === "ASSIGN" && node.children.length === 2 && node.children[0].typeName === "ASSIGNED" && node.children[0].children.length) {
    assigns.push({
      target: node.children[0].children[0].text,
      value: node.children[1]
    });
  }

  return node;
}

