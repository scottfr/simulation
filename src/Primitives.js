import { DataBank } from "./PrimitivePastValues.js";
import { simpleNum, simpleEquation, decodeDNA, linkPrimitive, simpleUnitsTest, setAgentInitialValues, getPrimitiveNeighborhood, validateAgentLocation } from "./Modeler.js";
import { div, plus, mult, evaluateTree, trimTree, trueValue, lessThanEq, greaterThan, minus, eq, createTree, negate, toNum, lessThan } from "./formula/Formula.js";
import { Material } from "./formula/Material.js";
import { convertUnits } from "./formula/Units.js";
import { Task } from "./TaskScheduler.js";
import { Rand, RandExp } from "./formula/Rand.js";
import { Vector } from "./formula/Vector.js";
import { ModelError } from "./formula/ModelError.js";
import { toHTML } from "./Utilities.js";
import { stringify } from "./formula/Utilities.js";
import Big from "../vendor/bigjs/big.js";


export class SPrimitive {
  /**
   * @param {import("./Simulator").Simulator} simulate
   */
  constructor(simulate) {
    /** @type {string} */
    this.id = null;

    /** @type {string} */
    this.agentId = null;

    /** @type {number} */
    this.index = null;

    /** @type {number} */
    this.instanceId = null;

    /** @type {SAgent} */
    this.container = null;

    this.constructorFunction = null; // is overridden

    /** @type {import("./DNA").DNA} */
    this.dna = null;

    /** @type {import("./DNA").DNA[]} */
    this.DNAs = null;

    /** @type {any} */
    this.equation = null;

    /** @type {ValueType} */
    this.cachedValue = undefined;

    /** @type {ValueType[]} */
    this.pastValues = [];

    this.pastData = new DataBank();

    /** @type {boolean} */
    this.frozen = false;

    this.simulate = simulate;

    /** @type {SPrimitive} */
    this.neighborProxyPrimitive = null;

    this.parent = simulate.varBank["primitivebase"];
  }

  orig() {
    return this.neighborProxyPrimitive || this;
  }

  clone() {
    /** @type {SPrimitive} */
    let p = new this.constructorFunction(this.simulate);

    p.dna = this.dna;
    p.container = this.container;
    p.agentId = this.agentId;
    p.index = this.index;
    p.id = this.id;
    p.createIds();
    p.pastValues = this.pastValues.slice();


    p.neighborProxyPrimitive = this.neighborProxyPrimitive;

    if (this.dna.slider) {
      if (this.simulate.sliders[this.dna.id]) {
        this.simulate.sliders[this.dna.id].push(p);
      } else {
        this.simulate.sliders[this.dna.id] = [p];
      }

    }

    p.cachedValue = this.cachedValue ? this.cachedValue.fullClone() : this.cachedValue;

    this.innerClone(p);

    return p;
  }


  // eslint-disable-next-line
  innerClone(_p) { }

  clearCached() {
    this.cachedValue = undefined;
  }

  storeValue() {
    if (this.cachedValue === undefined) {
      this.value();
    }
    this.pastValues.push(this.cachedValue);
  }

  toNum() {
    let val = this.value();
    if (typeof val === "string") {
      // if it is a string, properly stringify it
      return stringify(val, this.simulate);
    }
    return val;
  }

  /**
   * @return {ValueType}
   */
  calculateValue() {
    throw new ModelError(`<i>[${toHTML(this.dna.name)}]</i> does not have a value and can not be used as a value in an equation.`, {
      code: 1080
    });
  }

  createIds() {
    this.instanceId = this.simulate.getID(this.agentId + "-" + this.index);
  }

  /**
   * @param {Material} length
   *
   * @return {ValueType[]}
   */
  getPastValues(length) {
    let items = this.pastValues.slice();

    /* Add current value to array if needed */
    let bins = Math.ceil(div(this.simulate.time(), this.dna.solver.userTimeStep).value) + 1;
    if (items.length < bins) {
      items.push(this.value());
    }

    let res;
    if (length === undefined) {
      res = items.map(x => x.fullClone());
    } else {
      let bins = Math.ceil(div(length.forceUnits(this.simulate.timeUnits), this.dna.solver.userTimeStep).value);

      res = [];
      for (let i = Math.max(0, items.length - 1 - bins); i < items.length; i++) {
        res.push(items[i].fullClone());
      }
    }

    return res;
  }

  /**
   * @param {Material} delay
   * @param {ValueType=} defaultValue
   *
   * @returns {ValueType}
   */
  pastValue(delay, defaultValue = null) {
    let periods;

    // check whether we have evaluated the current time period and stored it
    if (this.pastValues.length - 1 < Math.round((this.simulate.time().value - this.simulate.timeStart.value) / this.dna.solver.userTimeStep.value)) {
      periods = div(delay.forceUnits(this.simulate.timeUnits), this.dna.solver.userTimeStep).value;
    } else {
      periods = div(delay.forceUnits(this.simulate.timeUnits), this.dna.solver.userTimeStep).value + 1;
    }


    if (periods === 0) {
      return this.value();
    }

    if (Math.ceil(periods) > this.pastValues.length) {
      // prior to when we have data, use the default
      if (defaultValue === null) {
        if (this.pastValues.length > 0) {
          return this.pastValues[0].fullClone();
        } else {
          return this.value();
        }
      } else {
        return defaultValue;
      }
    }


    if (periods === Math.round(periods)) {
      // we have an exact value get it
      return this.pastValues[this.pastValues.length - periods].fullClone();
    }


    // it's between two past values, average them proportionally
    let fraction = periods - Math.floor(periods);
    let entry = Math.floor(periods);
    let firstPeriod, secondPeriod;
    if (entry === 0) {
      firstPeriod = this.value();
    } else {
      firstPeriod = this.pastValues[this.pastValues.length - entry];
    }
    secondPeriod = this.pastValues[this.pastValues.length - 1 - entry];
    return plus(mult(firstPeriod, new Material(1 - fraction)), mult(secondPeriod, new Material(fraction)));
  }


  /**
   * @param {ValueType} m
   * @param {boolean=} ignoreFlow
   */
  testUnits(m, ignoreFlow) {

    if (m instanceof Vector) {
      m.recurseApply(x => {
        this.testUnits(x, ignoreFlow);
        return x;
      });
      return;
    }

    if (this.dna.adoptUnits) {
      if (!m.units) {
        m.units = this.simulate.unitManager.getUnitStore([], [], false, true);
      }

      this.dna.units = m.units;
      this.dna.flowUnitless = false;
    }

    if (!this.dna.units && m.units && !m.units.isUnitless()) {
      throw new ModelError(`Wrong units generated for <i>[${toHTML(this.dna.name)}]</i>. Expected no units and got <i>${m.units.toString()}</i>. Either specify units for the primitive or adjust the equation.`, {
        primitive: this.orig(),
        showEditor: true,
        code: 1081
      });
    } else if (this.dna.units !== m.units) {
      if (typeof m === "boolean" || typeof m === "string" || m instanceof String || m instanceof Boolean) {
        if (!this.dna.units) {
          return;
        }
        throw new ModelError(`Cannot add units to a String or Boolean in <i>[${toHTML(this.dna.name)}]</i>.`, {
          primitive: this.orig(),
          showEditor: true,
          code: 1082
        });
      }

      // we allow applying the primitive units onto a unitless value so
      // the allow unit application is true
      let scale = convertUnits(m.units, this.dna.units, true);

      if (scale === 0) {
        throw new ModelError(`Wrong units generated for <i>[${toHTML(this.dna.name)}]</i>. Expected <i>${this.dna.units ? this.dna.units.toString() : "unitless"}</i>, and got <i>${m.units ? m.units.toString() : "unitless"}</i>.`, {
          primitive: this.orig(),
          showEditor: true,
          code: 1083
        });
      } else {
        m.value = m.value * scale;
        m.units = this.dna.units;
      }
    }

    if (this instanceof SFlow && ignoreFlow !== true && this.dna.flowUnitless) {
      let x = mult(m, new Material(1, this.simulate.timeUnits));
      m.value = x.value;
      m.units = x.units;
    }
  }

  setValue(_v) {
    throw new ModelError("You cannot set the value for that primitive.", {
      code: 1084
    });
  }

  /**
   * @returns {ValueType}
   */
  value() {
    if (this.cachedValue === undefined && this.frozen && this.pastValues.length > 0) {
      let v = this.pastValues[this.pastValues.length - 1];
      if (v.fullClone) {
        this.cachedValue = v.fullClone();
      } else {
        this.cachedValue = v;
      }
    }

    if (this.cachedValue === undefined) {
      if (this.simulate.valuedPrimitives.includes(this)) {
        throw new ModelError(`Circular equation loop identified including the primitives: ${toHTML(this.simulate.valuedPrimitives.slice(this.simulate.valuedPrimitives.indexOf(this)).map(x => x.dna.name).join(", "))}`, {
          primitive: this.orig(),
          showEditor: true,
          code: 1085
        });
      }
      this.simulate.valuedPrimitives.push(this);

      let x;
      try {
        x = toNum(this.calculateValue());
        if (x instanceof Material && !isFinite(x.value)) {
          if (this instanceof SStock) {
            throw new ModelError("The stock has become infinite in size. Check the flows into it for rapid growth.", {
              primitive: this.orig(),
              showEditor: true,
              code: 1086
            });
          } else {
            throw new ModelError("The result of this calculation is not finite (are you dividing by 0?).", {
              primitive: this.orig(),
              showEditor: true,
              code: 1087
            });
          }
        }
      } catch (err) {
        if (err instanceof ModelError) {
          if (err.primitive && err.showEditor) {
            throw err; // don't want to override the target primitive
          }
          throw new ModelError(err.message, {
            primitive: this.orig(),
            showEditor: true,
            code: 1088
          });
        } else {
          throw err;
        }
      }
      if (!(this instanceof SState)) {
        this.testUnits(x);
        this.testConstraints(x);
      }

      this.cachedValue = x;
    }


    if (this.cachedValue.fullClone) {
      return this.cachedValue.fullClone();
    } else {
      return this.cachedValue;
    }
  }

  testConstraints(x) {
    let test = (x) => {
      if (this.dna.useMaxConstraint && x.value > this.dna.maxConstraint) {
        constraintAlert(this, "max", x, this.simulate);
      }
      if (this.dna.useMinConstraint && x.value < this.dna.minConstraint) {
        constraintAlert(this, "min", x, this.simulate);
      }
      return x;
    };
    if (x instanceof Vector) {
      x.recurseApply(test);
    } else {
      test(x);
    }
  }

  setEquation(tree, neighborhood) {
    if (this instanceof SFlow || this instanceof STransition) {
      if (this.omega !== null) {
        neighborhood.omega = this.omega;
      }
      if (this.alpha !== null) {
        neighborhood.alpha = this.alpha;
      }
    }

    try {
      this.equation = trimTree(tree, neighborhood, this.simulate);
    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: true,
          code: 1089
        });
      } else {
        throw err;
      }
    }
  }
}


export class Placeholder extends SPrimitive {
  /**
   * @param {import("./DNA").DNA} dna
   * @param {SPrimitive | SPopulation} primitive
   * @param {import("./Simulator").Simulator} simulate
   */
  constructor(dna, primitive, simulate) {
    super(simulate);

    /** @type {import("./DNA").DNA} */
    this.dna = dna;
    /** @type {string} */
    this.id = dna.id;
    /** @type {SPrimitive | SPopulation} */
    this.primitive = primitive;
  }

  // @ts-ignore
  calculateValue() {
    throw new ModelError(`<i>[${toHTML(this.dna.name)}]</i> is a placeholder and cannot be used as a direct value in equations.`, {
      primitive: this.primitive.dna.primitive,
      showEditor: true,
      code: 1091
    });
  }
}


export class SState extends SPrimitive {
  constructor(simulate) {
    super(simulate);
    /** @type {boolean} */
    this.active = null;

    /** @type {STransition[]} */
    this.downStreamTransitions = [];

    this.constructorFunction = SState;
  }


  innerClone(p) {
    p.setValue(this.active);
  }

  /**
   * @param {Material} value
   */
  setValue(value) {
    this.setActive(trueValue(value));
    this.cachedValue = undefined;
    this.simulate.valuedPrimitives = [];
    this.value();
    if (this.agentId) {
      this.container.updateStates();
    }
  }

  calculateValue() {
    if (this.active === null) {
      this.setInitialActive(true);
    }

    if (this.active) {
      return new Material(1);
    } else {
      return new Material(0);
    }

  }

  /**
   * @param {boolean=} suppress
   */
  setInitialActive(suppress) {
    let init;

    try {
      init = toNum(evaluateTree(this.equation, globalVars(this, this.simulate), this.simulate));
    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: true,
          code: 1092
        });
      } else {
        throw err;
      }
    }

    this.setActive(trueValue(init), suppress);
    if (this.agentId) {
      this.container.updateStates();
    }

  }

  setActive(active, suppress) {
    this.active = active;

    if (!active || this.dna.residency === null) {
      if (!suppress) {
        if (active) {
          if (!this.simulate.transitionPrimitives) {
            this.simulate.transitionPrimitives = [];
          }

          if (this.simulate.transitionPrimitives.length > 1200 && this.simulate.transitionPrimitives.includes(this)) {
            throw new ModelError(`Circular fully active transition loop identified including the states: ${toHTML(this.simulate.transitionPrimitives.slice(0, 5).map(x => "[" + x.dna.name + "]").join(", "))}`, {
              code: 1105
            });
          }
          this.simulate.transitionPrimitives.push(this);
        }

        for (let transition of this.downStreamTransitions) {
          scheduleTrigger.call(transition);
        }

        if (active) {
          this.simulate.transitionPrimitives = [];
        }

      }
    } else {
      this.simulate.tasks.add(new Task({
        name: "State Residency",
        time: plus(this.simulate.time(), this.dna.residency),
        priority: 5,
        expires: 1,
        action: (_task) => {
          for (let transition of this.downStreamTransitions) {
            scheduleTrigger.call(transition);
          }
        }
      }));
    }

  }

  /**
   * @returns {boolean}
   */
  getActive() {
    if (this.active === null) {
      this.setInitialActive(true);
    }
    return this.active;
  }
}


export class STransition extends SPrimitive {
  constructor(simulate) {
    super(simulate);
    /** @type {SState} */
    this.alpha = null;

    /** @type {SState} */
    this.omega = null;

    /** @type {Task} */
    this.scheduledTrigger = null;

    this.initialized = false;

    this.constructorFunction = STransition;
  }

  innerClone() { }

  /**
   * @param {SState} alpha
   * @param {SState} omega
   */
  setEnds(alpha, omega) {
    this.alpha = alpha;
    this.omega = omega;
    if (alpha) {
      alpha.downStreamTransitions.push(this);
    }
  }

  /**
   * @returns {boolean}
   */
  canTrigger() {
    return !this.alpha || (this.alpha && this.alpha.getActive()) || (this.dna.repeat && this.dna.trigger !== "Condition");
  }

  trigger() {
    this.scheduledTrigger = null;

    if (this.frozen) {
      return;
    }

    if (this.alpha) {
      this.alpha.setActive(false);
    }
    if (this.omega) {
      this.omega.setActive(true);
    }
    if (this.agentId) {
      this.container.updateStates();
    }
    if (this.dna.repeat && this.dna.trigger !== "Condition") {
      scheduleTrigger.call(this);
    }
  }
}


/**
 * @this {STransition|SAction}
 */
function scheduleTrigger() {
  updateTrigger.call(this, true);
}


/**
 * @this {STransition|SAction}
 *
 * @param {boolean} force
 */
function clearTrigger(force) {
  if (this.scheduledTrigger && (force || !this.dna.repeat)) {
    this.scheduledTrigger.kill();
    this.scheduledTrigger = null;
  }
}


/**
 * @this {STransition|SAction}
 *
 * @param {boolean} clear
 */
export function updateTrigger(clear) {
  this.initialized = true;

  if (clear) {
    clearTrigger.call(this);
  }


  if (this.canTrigger()) {
    let v;
    try {
      v = toNum(evaluateTree(this.equation, globalVars(this, this.simulate), this.simulate));
    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: false,
          code: 1090
        });
      } else {
        throw err;
      }
    }

    try {
      if (this.dna.trigger === "Condition") {
        if (trueValue(v)) {
          this.trigger();
        }
      } else {
        if (!(v instanceof Material)) {
          throw new ModelError(`The value of this trigger must evaluate to a number. Got <i>${toHTML("" + v)}</i>.`, {
            primitive: this.orig(),
            showEditor: true,
            code: 1112
          });
        }

        /** @type {Material} */
        let t;

        if (this.dna.trigger === "Timeout") {

          if (!v.units) {
            verifyValuedType(v, this);

            v.units = this.simulate.timeUnits;
          } else {
            v.units.addBase();
            let base = /** @type {import("./formula/Units").UnitStore} */ (v.units.baseUnits);
            if (base.names.length !== 1 || base.names[0] !== "seconds" || base.exponents[0] !== 1) {
              throw new ModelError(`A trigger Timeout must have units of time, got <i>${v.units.toString()}</i>.`, {
                primitive: this.orig(),
                showEditor: true,
                code: 1113
              });
            }
          }

          if (this.scheduledTrigger && eq(v, this.scheduledTrigger.data.value)) {
            return;
          }

          if (v.value === 0) {
            if (this.dna.repeat) {
              throw new ModelError("A trigger Timeout of 0 with 'Repeat' set to true results in an infinite loop.", {
                primitive: this.orig(),
                showEditor: true,
                code: 1114
              });
            } else {
              this.trigger();
              return;
            }
          }


          if (v.value < 0) {
            throw new ModelError("The timeout for a transition cannot be less than 0.", {
              primitive: this.orig(),
              showEditor: true,
              code: 1115
            });
          }

          if (isNaN(v.value)) {
            throw new ModelError("The timeout for the transition is not a valid number.", {
              primitive: this.orig(),
              showEditor: true,
              code: 1116
            });
          }

          t = v;

        } else if (this.dna.trigger === "Probability") {
          if (v.units && !v.units.isUnitless()) {
            throw new ModelError(`The probability for the trigger had units of <i>${v.units.toString()}</i>. Probabilities must be unitless.`, {
              primitive: this.orig(),
              showEditor: true,
              code: 1121
            });
          }

          if (isNaN(v.value)) {
            throw new ModelError("The probability for the transition is not a valid number.", {
              primitive: this.orig(),
              showEditor: true,
              code: 1117
            });
          }

          v = v.value;
          if (this.scheduledTrigger && eq(v, this.scheduledTrigger.data.value)) {
            return;
          }

          if (v === 1) {
            if (this.dna.repeat) {
              throw new ModelError("A trigger probability of 1 with 'Repeat' as true results in an infinite loop.", {
                primitive: this.orig(),
                showEditor: true,
                code: 1118
              });
            } else {
              this.trigger();
              return;
            }
          } else if (v > 1) {
            throw new ModelError("The probability for the trigger must be less than or equal to 1.", {
              primitive: this.orig(),
              showEditor: true,
              code: 1119
            });
          } else if (v < 0) {
            throw new ModelError("The probability for the trigger must be greater than or equal to 0.", {
              primitive: this.orig(),
              showEditor: true,
              code: 1120
            });
          } else if (v === 0) {
            if (!this.scheduledTrigger) {
              return;
            }
          } else {
            let l = -Math.log(1 - v);
            t = new Material(RandExp(this.simulate, l), this.simulate.timeUnits);
          }

        }

        let start = this.simulate.time();

        if (this.scheduledTrigger) {
          this.scheduledTrigger.kill();
          if (this.dna.trigger === "Timeout") {
            if (lessThanEq(t, minus(this.simulate.time(), this.scheduledTrigger.data.start))) {
              this.scheduledTrigger = null;
              this.trigger();
              return;
            } else {
              start = this.scheduledTrigger.data.start;
              t = minus(t, minus(this.simulate.time(), start));
              this.scheduledTrigger = null;
            }
          } else if (this.dna.trigger === "Probability") {
            if (v === 0) {
              this.scheduledTrigger = null;
              return;
            }
            t = minus(this.scheduledTrigger.time, this.simulate.time());

            let v0 = this.scheduledTrigger.data.value;
            if (v0 !== v) {
              let l0 = -Math.log(1 - v0);
              // @ts-ignore - v is going to be a number at this point
              let l = -Math.log(1 - v);

              t = mult(t, new Material(l0 / l));
            }

            start = this.scheduledTrigger.data.start;

            this.scheduledTrigger = null;
          }
        }

        t = plus(t, this.simulate.time());

        this.scheduledTrigger = new Task({
          name: "Trigger",
          time: t,
          priority: 5,
          expires: 1,
          action: (_task) => {
            this.trigger();
          },
          data: { start: start, value: v }
        });

        this.simulate.tasks.add(this.scheduledTrigger);

      }
    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: true,
          code: 1094
        });
      } else {
        throw err;
      }
    }
  }
}


export class SAction extends SPrimitive {
  constructor(simulate) {
    super(simulate);

    /** @type {any} */
    this.action = null;

    /** @type {Task} */
    this.scheduledTrigger = null;

    /** @type {boolean} */
    this.block = false;

    this.initialized = false;

    this.constructorFunction = SAction;
  }

  innerClone() { }

  /**
   * @returns {boolean}
   */
  canTrigger() {
    return !this.block;
  }

  resetTimer() {
    scheduleTrigger.call(this);
  }

  trigger() {
    this.scheduledTrigger = null;

    if (this.frozen) {
      return;
    }

    try {
      evaluateTree(this.action, globalVars(this, this.simulate), this.simulate);

      if (this.dna.repeat) {
        if (this.dna.trigger !== "Condition") {
          scheduleTrigger.call(this);
        }
      } else {
        this.block = true;
      }
    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: true,
          code: 1096
        });
      } else {
        throw err;
      }
    }
  }
}

export class SPopulation extends SPrimitive {
  constructor(simulate) {
    super(simulate);

    /** @type {number} */
    this.size = null;
    /** @type {SAgent[]} */
    this.agents = null;
    /** @type {Material} */
    this.geoWidth = null;
    /** @type {Material} */
    this.geoHeight = null;
    /** @type {Material} */
    this.halfWidth = null;
    /** @type {Material} */
    this.halfHeight = null;
    /** @type {string} */
    this.geoDimUnits = null;
    /** @type {import('./formula/Units').UnitStore} */
    this.geoDimUnitsObject = null;
    /** @type {boolean} */
    this.geoWrap = null;
    /** @type {import("./DNA").DNA[]} */
    this.DNAs = null;
    /** @type {Set<string>} */
    this.stateIds = new Set();
    /** @type {PlacementType} */
    this.placement = undefined;
    /** @type {string} */
    this.placementFunction = undefined;
    /** @type {NetworkType} */
    this.network = undefined;
    /** @type {string} */
    this.networkFunction = undefined;
    /** @type {any} */
    this.agentBase = undefined;

    this.constructorFunction = SPopulation;

    this.vector = new Vector([], simulate, [], simulate.varBank["primitivebase"]);
  }

  collectData() {
    let x = [];
    for (let agent of this.agents) {
      x.push({
        instanceId: agent.instanceId,
        connected: agent.connected.map(x => x.instanceId),
        location: simpleNum(agent.location.clone(), this.geoDimUnitsObject, this.simulate),
        state: agent.states.length > 0 ? agent.states.slice() : null
      });
    }
    return x;
  }

  /**
   * @returns {Set<string>}
   */
  states() {
    return this.stateIds;
  }

  /**
   * @returns {Material}
   */
  toNum() {
    throw new ModelError(`<i>[${toHTML(this.dna.name)}]</i> is a population of agents and cannot be used as a direct value in equations.`, {
      code: 1107
    });
  }

  /**
   * @param {SAgent=} base
   * @returns
   */
  add(base) {
    this.size = 1 + this.size;
    /** @type {SAgent} */
    let agent;

    if (base) {
      agent = base.agentClone();
      agent.agentId = this.agentId;
      agent.setIndex(this.size - 1);
      agent.createAgentIds();

      for (let i = 0; i < this.DNAs.length; i++) {
        let x = agent.children[i];
        let dna = this.DNAs[i];

        x.container = agent;

        linkPrimitive(x, dna, this.simulate);
      }

      agent.updateStates();

    } else {
      agent = new SAgent(this.simulate);
      agent.container = this;
      agent.children = [];
      agent.childrenId = {};
      agent.agentId = this.agentId;

      for (let dna of this.DNAs) {
        decodeDNA(dna, agent, this.simulate);
      }

      agent.setIndex(this.size - 1);
      agent.createAgentIds();

      for (let i = 0; i < this.DNAs.length; i++) {
        linkPrimitive(agent.children[i], this.DNAs[i], this.simulate);
      }

      setAgentInitialValues(agent);

      let neighbors = getPrimitiveNeighborhood(this, this.dna, this.simulate, []);

      if (this.placement === "Custom Function") {
        // @ts-ignore - Agent is equivalent to Primitive for this use case
        neighbors.self = agent;
        agent.location = simpleUnitsTest(/** @type {Vector} */(simpleEquation(this.placementFunction, this.simulate, { "-parent": this.simulate.varBank, self: agent }, neighbors)), this.geoDimUnitsObject, this.simulate, null, null, "Agent placement functions must return a two element vector");

        validateAgentLocation(agent.location, this);

        if (!agent.location.names) {
          agent.location.names = ["x", "y"];
          agent.location.namesLC = ["x", "y"];
        }
      } else {
        agent.location = new Vector([mult(this.geoWidth, new Material(Rand(this.simulate))), mult(this.geoHeight, new Material(Rand(this.simulate)))], this.simulate, ["x", "y"]);
      }
      if (this.network === "Custom Function") {
        let tree = trimTree(createTree(this.networkFunction), neighbors, this.simulate);
        for (let a of this.agents) {
          if (agent !== a) {
            if (trueValue(simpleEquation(this.networkFunction, this.simulate, { "-parent": this.simulate.varBank, "a": agent, "b": a }, neighbors, tree))) {
              agent.connect(a);
            }
          }
        }
      }
    }

    this.simulate.tasks.add(new Task({
      priority: 10,
      expires: 1,
      name: "Add Agent",
      time: this.simulate.time(),
      action: (_task) => {
        this.agents.push(agent);

        for (let i = 0; i < agent.children.length; i++) {
          let x = agent.children[i];

          let dna = this.DNAs[i];

          if (x instanceof SAction || x instanceof STransition) {
            if (dna.trigger !== "Condition") {
              scheduleTrigger.call(x);
            }
          }

          if (base) {
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
          }


        }


      }
    }));

    return agent;
  }
}


export class SAgent {
  constructor(simulate) {
    /** @type {string} */
    this.agentId = null;

    /** @type {string} */
    this.instanceId = null;

    /** @type {number} */
    this.index = null;

    /** @type {SPrimitive[]} */
    this.children = null;

    /** @type {Vector<Material>} */
    this.location = null;

    /** @type {SAgent[]} */
    this.connected = [];

    /** @type {Material[]} */
    this.connectedWeights = [];

    /** @type {boolean} */
    this.dead = false;

    this.constructorFunction = SAgent;

    /** @type {Set<string>} */
    this.stateIDs = new Set();

    /** @type {SState[]} */
    this.states = [];

    /** @type {Partial<SPopulation>} */
    this.container = undefined;

    /** @type {import("./DNA").DNA} */
    this.dna = undefined;

    /** @type {Object<string, SPrimitive>} */
    this.childrenId = undefined;

    this.simulate = simulate;

    this.vector = new Vector([], simulate, [], simulate.varBank["agentbase"]);
  }

  createIds() {
    // same as Primitive
    this.instanceId = this.simulate.getID(this.agentId + "-" + this.index);
  }

  /**
   * @returns {string}
   */
  toString() {
    return "Agent " + (this.index + 1);
  }

  toNum() {
    return this;
  }

  updateStates() {
    this.states = [];
    this.stateIDs = new Set();
    for (let child of this.children) {
      if (child instanceof SState) {
        if (child.active) {
          this.states.push(child);
          this.stateIDs.add(child.dna.id);
        }
      }
    }
  }

  /**
   * @returns {SAgent}
   */
  agentClone() {
    let agent = new SAgent(this.simulate);
    agent.dna = this.dna;
    agent.children = [];
    agent.childrenId = {};

    for (let child of this.children) {
      agent.children.push(child.clone());
      agent.childrenId[child.dna.id] = child;
    }

    agent.location = this.location.clone();
    agent.connected = this.connected.slice();
    agent.connectedWeights = this.connectedWeights.slice();
    agent.container = this.container;


    return agent;
  }

  /**
   * @param {number} index
   */
  setIndex(index) {
    this.index = index;
    for (let child of this.children) {
      child.index = index;
    }
  }

  createAgentIds() {
    this.createIds();
    for (let child of this.children) {
      child.createIds();
    }
  }

  die() {
    while (this.connected.length > 0) {
      this.unconnect(this.connected[0]);
    }

    for (let i = 0; i < this.container.agents.length; i++) {
      if (this.container.agents[i] === this) {
        this.container.agents.splice(i, 1);
        break;
      }
    }

    for (let child of this.children) {
      let solver = child.dna.solver;
      if (child instanceof SAction) {
        solver.actions.splice(solver.actions.indexOf(child), 1);
        clearTrigger.call(child, true);
      } else if (child instanceof STransition) {
        solver.transitions.splice(solver.transitions.indexOf(child), 1);
        clearTrigger.call(child, true);
      } else if (!(child instanceof SPopulation)) {
        solver.valued.splice(solver.valued.indexOf(child), 1);
        if (child instanceof SFlow) {
          solver.flows.splice(solver.flows.indexOf(child), 1);
        } else if (child instanceof SStock) {
          solver.stocks.splice(solver.stocks.indexOf(child), 1);
        } else if (child instanceof SState) {
          solver.states.splice(solver.states.indexOf(child), 1);
        }
      }
    }


    this.dead = true;
  }

  /**
   * @param {SAgent} x
   * @param {Material=} weight
   */
  connect(x, weight) {
    let w = weight === undefined ? new Material(1) : weight;
    if (x !== this) {
      if (!this.connected.includes(x)) {
        if (x instanceof SAgent) {
          this.connected.push(x);
          this.connectedWeights.push(w);
          x.connected.push(this);
          x.connectedWeights.push(w);
        } else {
          throw new ModelError("Only agents may be connected.", {
            code: 1106
          });
        }
      } else if (weight !== undefined) {
        this.connectedWeights[this.connected.indexOf(x)] = weight;
        x.connectedWeights[x.connected.indexOf(x)] = weight;
      }
    }

  }

  /**
   * @param {SAgent} x
   */
  unconnect(x) {
    if (x !== this) {
      let i = this.connected.indexOf(x);
      if (i !== -1) {
        this.connected.splice(i, 1);
        this.connectedWeights.splice(i, 1);
        i = x.connected.indexOf(this);
        x.connected.splice(i, 1);
        x.connectedWeights.splice(i, 1);
      }
    }
  }

  /**
   * @param {SAgent} x
   * @returns {Material}
   */
  connectionWeight(x) {
    if (x !== this) {
      let i = this.connected.indexOf(x);

      if (i !== -1) {
        return this.connectedWeights[i].fullClone();
      }
    }
    throw new ModelError("Agents are not connected and so do not have a connection weight.", {
      code: 1108
    });
  }


  /**
   * @param {SAgent} x
   * @param {Material} w
   */
  setConnectionWeight(x, w) {
    if (x !== this) {
      let i = this.connected.indexOf(x);
      if (i !== -1) {
        this.connectedWeights[i] = w.fullClone();
        return;
      }
    }
    throw new ModelError("Agents are not connected and so do not have a connection weight.", {
      code: 1109
    });
  }
}


function verifyValuedType(x, primitive) {
  if (x instanceof Vector || x instanceof Material) {
    // pass
    return;
  }

  throw new ModelError(`This value may only be numbers or vectors, found a ${typeof x}.`, {
    primitive: primitive,
    showEditor: false,
    code: 1110
  });
}


export class SStock extends SPrimitive {
  constructor(simulate) {
    super(simulate);

    /** @type {ValueType} */
    this.level = null;
    this.constructorFunction = SStock;
    /** @type {Material} */
    this.delay = undefined;
    /** @type {Task[]} */
    this.tasks = [];
    /** @type {ValueType} */
    this.initRate = null;
    /** @type {ValueType} */
    this.oldLevel = null;
  }

  innerClone(p) {
    p.level = this.level;
    p.oldLevel = this.oldLevel;
    p.tasks = this.tasks;
    p.delay = this.delay;
  }

  /**
   * @param {Material} value
   */
  setValue(value) {
    this.level = value;
    this.cachedValue = undefined;
    this.simulate.valuedPrimitives = [];
    this.value();
  }


  preserveLevel() {
    for (let i = this.tasks.length - 1; i >= 0; i--) {
      this.tasks[i].data.tentative = false;
    }
    this.oldLevel = this.level;
  }

  restoreLevel() {
    for (let i = this.tasks.length - 1; i >= 0; i--) {
      if (this.tasks[i].data.tentative) {
        this.tasks[i].remove();
        this.tasks.splice(i, 1);
      }
    }
    this.level = this.oldLevel;
  }

  /**
   * @param {Material=} delay
   */
  setDelay(delay) {
    delay = delay || this.dna.delay;
    this.delay = delay;
    if (this.delay?.value === 0) {
      // if the delay is 0, treat it as if there was no delay
      this.delay = undefined;
    }
  }

  setInitialValue() {
    /** @type {ValueType} */
    let init;

    try {
      init = toNum(evaluateTree(this.equation, globalVars(this, this.simulate), this.simulate));
    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: true,
          code: 1098
        });
      } else {
        throw err;
      }
    }

    if (typeof init === "boolean") {
      if (init) {
        init = new Material(1);
      } else {
        init = new Material(0);
      }
    }

    if (init instanceof Vector) {
      let d = this.dna;
      init.recurseApply((x) => {
        verifyValuedType(x);

        if (d.nonNegative && x.value < 0) {
          x = new Material(0, d.units);
        }
        if (!x.units) {
          x.units = d.units;
        }
        return x;
      });
    } else {
      verifyValuedType(init);

      if (this.dna.nonNegative && init.value < 0) {
        init = new Material(0, this.dna.units);
      }
      if (!init.units) {
        init.units = this.dna.units;
      }
    }


    if (
      this.delay === undefined
      || lessThanEq(this.delay, this.simulate.timeStep.fullClone())
    ) {
      // it's a non-serialized stock;
      this.level = init;
    } else {
      // it's serialized
      this.initRate = div(init, this.delay.forceUnits(this.simulate.timeUnits));
      let startValue = mult(this.initRate, this.simulate.userTimeStep.fullClone());

      this.level = startValue;


      this.simulate.tasks.addEvent((timeChange, oldTime, newTime) => {
        if (timeChange.value > 0) {
          let delaySpanEnd = minus(this.delay, this.simulate.userTimeStep);
          let eventSpan = [minus(oldTime, this.simulate.timeStart), minus(newTime, this.simulate.timeStart)];
          // No overlaps between the two spans
          if (lessThan(delaySpanEnd, eventSpan[0])) {
            return;
          }

          let overlap = minus(this.simulate.varBank["min"]([delaySpanEnd, eventSpan[1]]), eventSpan[0]);
          
          this.level = plus(this.level, mult(overlap, this.initRate));
        }
      });
    }
  }

  /**
   * @param {ValueType} amnt
   */
  subtract(amnt) {
    this.level = minus(this.level, amnt);
    if (this.dna.nonNegative) {
      if (this.level instanceof Vector) {
        let d = this.dna;
        this.level.recurseApply((x) => {
          if (x.value < 0) {
            return new Material(0, d.units);
          } else {
            return x;
          }
        });
      } else if (this.level.value < 0) {
        this.level = new Material(0, this.dna.units);
      }
    }
  }

  /**
   * @param {ValueType} amnt
   * @param {Material} oldTime
   */
  add(amnt, oldTime) {

    let targetTime;
    
    if (this.delay !== undefined) {
      // @ts-ignore bigjs is misstyped
      targetTime = new Material(Big(oldTime.value).plus(this.delay.forceUnits(oldTime.units).value).toNumber(), oldTime.units);
    }

    if (this.delay === undefined || lessThanEq(targetTime, this.simulate.time())) {
      this.level = plus(this.level, amnt);
      if (this.dna.nonNegative) {
        if (this.level instanceof Vector) {
          let d = this.dna;
          this.level.recurseApply((x) => {
            if (x.value < 0) {
              return new Material(0, d.units);
            } else {
              return x;
            }
          });
        } else if (this.level.value < 0) {
          this.level = new Material(0, this.dna.units);
        }
      }
    } else {
      this.scheduleAdd(amnt, targetTime);
    }
  }

  /**
   * @param {ValueType} amnt
   * @param {Material} targetTime
   */
  scheduleAdd(amnt, targetTime) {
    let oldLevel;

    let t = new Task({
      time: targetTime,
      data: {
        amnt: amnt,
        tentative: true
      },
      priority: -100,
      name: "Conveyor Add (" + this.dna.name + ")",
      action: (_task) => {
        oldLevel = this.level;
        this.level = plus(this.level, amnt);

        if (this.dna.nonNegative) {
          if (this.level instanceof Vector) {
            let d = this.dna;
            this.level.recurseApply((x) => {
              if (x.value < 0) {
                return new Material(0, d.units);
              } else {
                return x;
              }
            });
          } else if (this.level.value < 0) {
            this.level = new Material(0, this.dna.units);
          }
        }
      },
      rollback: () => {
        this.level = oldLevel;
      }
    });
    this.tasks.push(t);
    this.simulate.tasks.add(t);
  }

  /**
   * @returns {ValueType}
   */
  totalContents() {
    if (this.level === null) {
      this.setInitialValue();
    }

    if (this.delay !== undefined) {
      let res = this.level;
      let t = this.simulate.time();
      for (let i = this.tasks.length - 1; i >= 0; i--) {
        if (greaterThan(this.tasks[i].time, t)) {
          res = plus(res, /** @type {ValueType} */ (this.tasks[i].data.amnt));
        } else {
          break;
        }
      }

      // add in any pending `addEvent` mass from initialization
      let progressed = plus(this.simulate.timeProgressed(), this.simulate.userTimeStep);
      if (greaterThan(this.delay, progressed)) {
        let timeLeft = minus(this.delay, progressed);
        res = plus(res, mult(this.initRate, timeLeft));
      }

      return res;
    } else {
      return this.level;
    }
  }

  calculateValue() {
    if (this.level === null) {
      this.setInitialValue();
    }
    if (this.delay !== undefined && this.dna.solver.RKOrder === 4) {
      let res = this.level;
      for (let i = 0; i < this.tasks.length; i++) {
        if (greaterThan(this.tasks[i].time, this.simulate.time()) && lessThanEq(this.tasks[i].time, plus(this.simulate.time(), this.dna.solver.timeStep))) {
          res = plus(res, /** @type {ValueType} */(this.tasks[i].data.amnt));
        }
      }
      return res;
    } else {
      return this.level;
    }
  }
}


export class SConverter extends SPrimitive {
  constructor(simulate) {
    super(simulate);

    /** @type {SPrimitive|string} */
    this.source = null;
    this.constructorFunction = SConverter;
  }

  innerClone() { }

  /**
   * @param {SPrimitive|string} source
   */
  setSource(source) {
    this.source = source;
  }

  /**
   * @returns {Material}
   */
  getInputValue() {
    if (this.source === "*time") {
      return this.simulate.time();
    } else if (this.source instanceof SPrimitive) {
      let inp = toNum(this.source.value());
      if (!inp) {
        throw new ModelError("Undefined input value.", {
          primitive: this.orig(),
          showEditor: false,
          code: 1199
        });
      }
      if (inp instanceof Vector) {
        throw new ModelError("Converters do not accept vectors as input values.", {
          primitive: this.orig(),
          showEditor: false,
          code: 1200
        });
      } else {
        return inp;
      }
    } else {
      console.error("Invalid source", this.source);
      throw new Error("Invalid source");
    }
  }

  calculateValue() {
    return new Material(this.getOutputValue().value, this.dna.units);
  }

  /**
   * @returns {Material}
   */
  getOutputValue() {
    let inp = this.getInputValue();

    if (!this.dna.inputs.length) {
      return new Material(0);
    }
    for (let i = 0; i < this.dna.inputs.length; i++) {
      if (this.dna.interpolation === "discrete") {

        if (greaterThan(this.dna.inputs[i], inp)) {
          if (i === 0) {
            return this.dna.outputs[0];
          } else {
            return this.dna.outputs[i - 1];
          }
        }

      } else if (this.dna.interpolation === "linear") {
        if (eq(this.dna.inputs[i], inp)) {
          return this.dna.outputs[i];
        } else if (greaterThan(this.dna.inputs[i], inp)) {
          if (i === 0) {
            return this.dna.outputs[0];
          } else {
            let x = div(
              plus(
                mult(minus(inp, this.dna.inputs[i - 1]), this.dna.outputs[i]),
                mult(minus(this.dna.inputs[i], inp), this.dna.outputs[i - 1])
              ),
              minus(this.dna.inputs[i], this.dna.inputs[i - 1]));
            return x;
          }
        }
      }
    }
    return this.dna.outputs[this.dna.outputs.length - 1];
  }
}


export class SVariable extends SPrimitive {
  constructor(simulate) {
    super(simulate);

    this.constructorFunction = SVariable;
  }

  innerClone() { }

  calculateValue() {
    let x = evaluateTree(this.equation, globalVars(this, this.simulate), this.simulate);
    if (typeof x === "boolean") {
      if (x) {
        x = new Material(1);
      } else {
        x = new Material(0);
      }
    } else if (x instanceof Vector) {
      return x;
    } else if (typeof x === "string") {
      return x;
    }
    if (!x.units) {
      x.units = this.dna.units;
    }

    return x;
  }
}


export class SFlow extends SPrimitive {
  constructor(simulate) {
    super(simulate);

    /** @type {SStock} */
    this.alpha = null;

    /** @type {SStock} */
    this.omega = null;

    /** @type {ValueType} */
    this.rate = null;

    /** @type {ValueType} */
    this.blendedRate = null;

    /** @type {ValueType[]} */
    this.RKPrimary = [];

    this.constructorFunction = SFlow;
  }

  innerClone() { }

  /**
   * @param {SStock} alpha
   * @param {SStock} omega
   */
  setEnds(alpha, omega) {
    this.alpha = alpha;
    this.omega = omega;
  }

  calculateValue() {
    this.predict();
    return this.rate.fullClone();
  }

  clean() {
    this.rate = null;
    this.blendedRate = null;

    this.RKPrimary = [];
  }

  doRK4Aggregation() {
    this.blendedRate = div(plus(plus(plus(this.RKPrimary[0], mult(new Material(2), this.RKPrimary[1])), mult(new Material(2), this.RKPrimary[2])), this.RKPrimary[3]), new Material(6));

    this.blendedRate = this.checkRate(this.blendedRate);
  }

  checkRate(rate) {
    let newRate = div(rate, this.dna.adoptUnits ? new Material(this.dna.solver.timeStep.value) : this.dna.solver.timeStep.fullClone());

    if (this.dna.nonNegative) {
      if (newRate instanceof Vector) {
        newRate.recurseApply((x) => {
          if (x.value >= 0) {
            return x;
          } else {
            return new Material(0, x.units);
          }
        });
      } else {
        if (newRate.value <= 0) {
          newRate = new Material(0, newRate.units);
        }
      }
    }

    return newRate;
  }

  /**
   * @param {boolean=} override
   */
  predict(override) {
    if (this.rate === null || override) {
      let x;

      try {
        x = toNum(evaluateTree(this.equation, globalVars(this, this.simulate), this.simulate));

        if (!(x instanceof Vector || isFinite(x.value))) {
          verifyValuedType(x, this);
          throw new ModelError("The result of this calculation is not finite. Flows must have finite values. Are you dividing by 0?", {
            primitive: this.orig(),
            showEditor: true,
            code: 1111
          });
        }

      } catch (err) {
        if (err instanceof ModelError) {
          if (err.primitive && err.showEditor) {
            throw err; // don't want to override the target primitive
          }
          throw new ModelError(err.message, {
            primitive: this.orig(),
            showEditor: true,
            code: 1100
          });
        } else {
          throw err;
        }
      }

      if (typeof x === "boolean") {
        if (x) {
          x = new Material(1);
        } else {
          x = new Material(0);
        }
      }

      this.rate = x.fullClone();

      if (!this.dna.adoptUnits) {
        if (this.rate instanceof Vector) {
          let d = this.dna;
          this.rate.recurseApply((x) => {
            verifyValuedType(x, this);

            if (!x.units) {
              x.units = d.units;
            }
            return x;
          });
        } else if (!this.rate.units) {
          verifyValuedType(this.rate, this);

          this.rate.units = this.dna.units;
        }
      }


      this.testUnits(this.rate, true);

      this.rate = mult(this.rate, this.dna.adoptUnits ? new Material(this.dna.solver.timeStep.value) : this.dna.solver.timeStep.fullClone());

      if (override) {
        if (this.RKPrimary.length > 0) {
          this.RKPrimary[this.RKPrimary.length - 1] = this.rate;
        } else {
          this.RKPrimary.push(this.rate);
        }
      } else {
        this.RKPrimary.push(this.rate);
      }


      this.rate = this.checkRate(this.rate);
    }
  }

  /**
   * @param {Material} timeChange
   * @param {Material} oldTime
   *
   * @returns
   */
  apply(timeChange, oldTime) {

    try {
      if (this.rate === null && this.blendedRate === null) {
        return;
      }

      let rate = this.blendedRate ? this.blendedRate.fullClone() : this.rate.fullClone();

      rate = mult(rate, this.dna.adoptUnits ? new Material(timeChange.forceUnits(this.simulate.timeUnits).value) : timeChange);



      let inRate = rate;
      let outRate = rate;
      let collapsed = false;

      if (this.alpha !== null) {
        let v = this.alpha.level;
        if (rate instanceof Vector && (!(v instanceof Vector) || v.depth() < rate.depth())) {
          inRate = rate.fullClone().collapseDimensions(v);
          collapsed = true;
        } else if (v instanceof Vector && (!(rate instanceof Vector) || v.depth() > rate.depth())) {
          throw new ModelError("The start of the flow is a vector with a higher order than the flow rate. There has to be at least one element in the flow rate for each element in the start.", {
            primitive: this.orig(),
            showEditor: true,
            code: 1201
          });
        }
      }
      if (this.omega !== null) {
        let v = this.omega.level;
        if (rate instanceof Vector && (!(v instanceof Vector) || v.depth() < rate.depth())) {
          outRate = rate.fullClone().collapseDimensions(v);
          collapsed = true;
        } else if (v instanceof Vector && (!(rate instanceof Vector) || v.depth() > rate.depth())) {
          throw new ModelError("The end of the flow is a vector with a higher order than the flow rate. There has to be at least one element in the flow rate for each element in the end.", {
            primitive: this.orig(),
            showEditor: true,
            code: 1202
          });
        }
      }

      if (!collapsed) {

        if (this.omega !== null && this.omega.dna.nonNegative) {
          let modifier;
          try {
            modifier = plus(toNum(this.omega.level), rate);
          } catch (err) {
            throw new ModelError(`Incompatible units for flow <i>[${toHTML(this.dna.name)}]</i> and connected stock <i>[${toHTML(this.omega.dna.name)}]</i>. Stock has units of <i>${this.omega.dna.units ? this.omega.dna.units.toString() : "unitless"}</i>. The flow should have the equivalent units divided by some time unit such as Years.`, {
              primitive: this.orig(),
              showEditor: false,
              code: 1203
            });
          }
          if (modifier instanceof Vector) {
            modifier.recurseApply((x) => {
              if (x.value < 0) {
                return x;
              } else {
                return new Material(0, x.units);
              }
            });
            rate = minus(rate, modifier);
          } else {
            if (modifier.value < 0) {
              rate = negate(toNum(this.omega.level));
            }
          }
        }

        if (this.alpha !== null && this.alpha.dna.nonNegative) {
          let modifier;
          try {
            modifier = minus(toNum(this.alpha.level), rate);
          } catch (err) {
            throw new ModelError(`Incompatible units for flow <i>[${toHTML(this.dna.name)}]</i> and connected stock <i>[${toHTML(this.alpha.dna.name)}]</i>. Stock has units of <i>${this.alpha.dna.units ? this.alpha.dna.units.toString() : "unitless"}</i>. The flow should have the equivalent units divided by some time unit such as Years.`, {
              primitive: this.orig(),
              showEditor: false,
              code: 1204
            });
          }
          if (modifier instanceof Vector) {
            modifier.recurseApply((x) => {
              if (x.value < 0) {
                return x;
              } else {
                return new Material(0, x.units);
              }
            });
            rate = minus(rate, modifier);
            rate = minus(rate, modifier);
          } else {
            if (modifier.value < 0) {
              rate = toNum(this.alpha.level);
            }
          }
        }

        if (this.omega && this.omega.dna.nonNegative) {
          if (rate instanceof Vector) {
            /** @type {Vector} */
            let vec = this.simulate.varBank["flatten"]([plus(toNum(this.omega.level), rate)]);
            for (let item of vec.items) {
              if (item instanceof Material && item.value < 0) {
                throw new ModelError("Inconsistent non-negative constraints for flow.", {
                  primitive: this.orig(),
                  showEditor: false,
                  code: 1205
                });
              }
            }
          } else {
            let n = plus(toNum(this.omega.level), rate);
            if (n instanceof Material && n.value < 0) {
              throw new ModelError("Inconsistent non-negative constraints for flow.", {
                primitive: this.orig(),
                showEditor: false,
                code: 1206
              });
            }
          }
        }
      } else {
        if (this.alpha && this.alpha.dna.nonNegative) {
          throw new ModelError("Cannot use non-negative stocks when the flow rate is a vector that needs to be collapsed.", {
            primitive: this.alpha.dna.primitive,
            showEditor: false,
            code: 1207
          });
        }
        if (this.omega && this.omega.dna.nonNegative) {
          throw new ModelError("Cannot use non-negative stocks when the flow rate is a vector that needs to be collapsed.", {
            primitive: this.omega.dna.primitive,
            showEditor: false,
            code: 1208
          });
        }
      }

      let additionTest = 0;
      try {
        if (this.omega !== null) {
          additionTest = 1;
          if (collapsed) {
            this.omega.add(outRate, oldTime);
          } else {
            this.omega.add(rate, oldTime);
          }
        }
        if (this.alpha !== null) {
          additionTest = 2;

          if (collapsed) {
            this.alpha.subtract(inRate);
          } else {
            this.alpha.subtract(rate);
          }
        }
      } catch (err) {
        /** @type {SStock} */
        let stock;
        if (additionTest === 1) {
          stock = this.omega;
        } else if (additionTest === 2) {
          stock = this.alpha;
        }

        if (err.code === 2000) {
          throw new ModelError(`Incompatible vector keys for flow <i>[${toHTML(this.dna.name)}]</i> and connected stock <i>[${toHTML(stock.dna.name)}]</i>.`, {
            primitive: this.orig(),
            showEditor: false,
            code: 1209
          });
        } else {
          throw new ModelError(`Incompatible units for flow <i>[${toHTML(this.dna.name)}]</i> and connected stock <i>[${toHTML(stock.dna.name)}]</i>. Stock has units of <i>${stock.dna.units ? stock.dna.units.toString() : "unitless"}</i>. The flow should have the equivalent units divided by some time unit such as Years.`, {
            primitive: this.orig(),
            showEditor: false,
            code: 1210
          });
        }
      }

    } catch (err) {
      if (err instanceof ModelError) {
        if (err.primitive && err.showEditor) {
          throw err; // don't want to override the target primitive
        }
        throw new ModelError(err.message, {
          primitive: this.orig(),
          showEditor: true,
          code: 1102
        });
      } else {
        throw err;
      }
    }
  }
}


/**
 * @param {SPrimitive} primitive
 * @param {import("./Simulator").Simulator} simulate
 */
function globalVars(primitive, simulate) {
  if (primitive instanceof SAgent) {
    return { "-parent": simulate.varBank, "self": primitive };
  } else if (primitive.container) {
    return { "-parent": simulate.varBank, "self": primitive.container };
  } else {
    return simulate.varBank;
  }
}


/**
 * @param {SPrimitive} item
 * @param {string} type
 * @param {Material} val
 * @param {import("./Simulator").Simulator} simulate
 */
function constraintAlert(item, type, val, simulate) {
  let msg = "The " + (type === "max" ? "maximum" : "minimum") + " constraint on the primitive [<i>" + toHTML(simulate.model.getId(item.id).name) + "</i>] has been violated. The primitive's value attempted to become " + toHTML("" + val.value) + " when the " + (type === "max" ? "maximum" : "minimum") + " allowed value is " + (type === "max" ? item.dna.maxConstraint : item.dna.minConstraint) + ".";

  throw new ModelError(msg, {
    primitive: item.dna.primitive,
    showEditor: false,
    code: 1150
  });
}
