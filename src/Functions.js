import { mult, minus, eq, greaterThanEq, lessThanEq, plus, div, evaluateNode, lessThan, greaterThan, negate, VectorObject, toNum } from "./formula/Formula.js";
import { defineFunction, makeObjectBase, testArgumentsSize } from "./formula/CalcFunctions.js";
import { Material } from "./formula/Material.js";
import { ModelError } from "./formula/ModelError.js";
import { convertUnits } from "./formula/Units.js";
import { Vector } from "./formula/Vector.js";
import { AggregateSeries } from "./AggregateSeries.js";
import { createUnitStore } from "./Modeler.js";
import { SAction, SAgent, SConverter, SPopulation, SPrimitive, SState, SStock, STransition, SVariable } from "./Primitives.js";
import { fn } from "./CalcMap.js";
import { Task } from "./TaskScheduler.js";
import { State } from "./api/Blocks.js";


/**
 * @typedef {{ location: Vector<Material>, agent: SAgent }} LocationType
 */


/**
 * @param {import("./Simulator").Simulator} simulate
 */
export function createFunctions(simulate) {
  let AgentObject = {};

  let PrimitiveObject = {};

  defineFunction(simulate, "Stop", { params: [] }, () => {
    if (simulate.config.showNotification) {
      simulate.config.showNotification("Simulation ended early by a call to stop().");
    }

    // eslint-disable-next-line
    throw {
      simulationCommand: "STOP"
    };
  });

  defineFunction(simulate, "Pause", { params: [] }, () => {
    simulate.sleep(true);
    return new Material(0);
  });

  defineFunction(simulate, "Time", { params: [] }, () => {
    return simulate.time().fullClone();
  });

  defineFunction(simulate, "TimeStep", { params: [] }, () => {
    return simulate.timeStep.fullClone();
  });

  defineFunction(simulate, "TimeLength", { params: [] }, () => {
    return simulate.timeLength.fullClone();
  });

  defineFunction(simulate, "TimeStart", { params: [] }, () => {
    return simulate.timeStart.fullClone();
  });

  defineFunction(simulate, "TimeEnd", { params: [] }, () => {
    return simulate.timeEnd.fullClone();
  });

  defineFunction(simulate, "Seconds", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["seconds"], [-1])));
  });

  defineFunction(simulate, "Minutes", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["minutes"], [-1])));
  });

  defineFunction(simulate, "Hours", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["hours"], [-1])));
  });

  defineFunction(simulate, "Days", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["days"], [-1])));
  });

  defineFunction(simulate, "Weeks", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["weeks"], [-1])));
  });

  defineFunction(simulate, "Months", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["months"], [-1])));
  });

  defineFunction(simulate, "Years", { params: [{ name: "Value", defaultVal: "time", vectorize: true }] }, (x) => {
    let item;
    if (!x.length) {
      item = simulate.time().fullClone();
    } else {
      item = toNum(x[0]);
    }
    return mult(item, new Material(1, simulate.unitManager.getUnitStore(["years"], [-1])));
  });

  defineFunction(simulate, "Seasonal", { params: [{ name: "Peak", defaultVal: "0", vectorize: true }] }, (x) => {
    /** @type {Material} */
    let peak;
    if (!x.length) {
      peak = new Material(0, simulate.timeUnits);
    } else {
      peak = toNum(x[0]).fullClone();
      if (!peak.units) {
        peak.units = simulate.timeUnits;
      }
    }
    let position = minus(/** @type {Material} */(simulate.varBank.get("time")([])), peak);
    let dist = position.forceUnits(createUnitStore("years", simulate)).value * 2 * Math.PI;
    return new Material(Math.cos(dist));
  });

  defineFunction(simulate, "Unitless", { params: [{ name: "Value", noVector: true }] }, (x) => {
    return new Material(toNum(x[0]).value);
  });


  defineFunction(simulate, "RemoveUnits", { params: [{ name: "Value", vectorize: true }, { name: "ExpectedUnits", needString: true }] }, (x) => {
    let m = toNum(x[0]);
    return new Material(m.forceUnits(createUnitStore(x[1], simulate)).value);
  });


  defineFunction(simulate, "PastMean", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", defaultVal: "All Time", vectorize: true }] }, (x) => {
    if (x.length === 1) {
      return simulate.varBank.get("mean")(x[0].getPastValues());
    } else {
      return simulate.varBank.get("mean")(x[0].getPastValues(toNum(x[1])));
    }
  });

  defineFunction(simulate, "PastMedian", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", defaultVal: "All Time", vectorize: true }] }, (x) => {

    if (x.length === 1) {
      return simulate.varBank.get("median")(x[0].getPastValues());
    } else {
      return simulate.varBank.get("median")(x[0].getPastValues(toNum(x[1])));
    }
  });

  defineFunction(simulate, "PastValues", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", defaultVal: "All Time", vectorize: true }] }, (x) => {

    let items;
    if (x.length === 1) {
      items = x[0].getPastValues();
    } else {
      items = x[0].getPastValues(toNum(x[1]));
    }
    return new Vector(items, simulate);
  });

  defineFunction(simulate, "PastStdDev", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", defaultVal: "All Time", vectorize: true }] }, (x) => {

    let items;
    if (x.length === 1) {
      items = x[0].getPastValues();
    } else {
      items = x[0].getPastValues(toNum(x[1]));
    }
    if (items.length > 1) {
      return simulate.varBank.get("stddev")(items);
    } else {
      return new Material(0);
    }
  });

  defineFunction(simulate, "PastCorrelation", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", vectorize: true, defaultVal: "All Time" }] }, (x) => {
    let items1;
    let items2;
    if (x.length === 2) {
      items1 = x[0].getPastValues();
      items2 = x[1].getPastValues();
    } else {
      items1 = x[0].getPastValues(toNum(x[2]));
      items2 = x[1].getPastValues(toNum(x[2]));
    }

    if (items1.length > 1) {
      return simulate.varBank.get("correlation")([new Vector(items1, simulate), new Vector(items2, simulate)]);
    } else {
      return new Material(0);
    }
  });

  defineFunction(simulate, "PastMax", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", defaultVal: "All Time", vectorize: true }] }, (x) => {

    if (x.length === 1) {
      return simulate.varBank.get("max")(x[0].getPastValues());
    } else {
      return simulate.varBank.get("max")(x[0].getPastValues(toNum(x[1])));
    }
  });

  defineFunction(simulate, "PastMin", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Past Range", defaultVal: "All Time", vectorize: true }] }, (x) => {

    if (x.length === 1) {
      return simulate.varBank.get("min")(x[0].getPastValues());
    } else {
      return simulate.varBank.get("min")(x[0].getPastValues(toNum(x[1])));
    }
  });

  defineFunction(simulate, "Pulse", { params: [{ name: "Start Time", vectorize: true }, { name: "Height", vectorize: true, defaultVal: 1 }, { name: "Width", vectorize: true, defaultVal: 0 }, { name: "Repeat Period", vectorize: true, defaultVal: 0 }] },
    /**
     * @param {[Material, Material, Material, Material]} x
     */
    (x) => {

      /** @type {Material} */
      let start = toNum(x[0]);
      let height = new Material(1);
      let width = new Material(0);
      let repeat = new Material(0);

      if (x.length > 1) {
        height = toNum(x[1]);
        if (x.length > 2) {
          width = toNum(x[2]);
          if (x.length > 3) {
            repeat = toNum(x[3]);
          }
        }
      }

      if (!start.units) {
        start.units = simulate.timeUnits;
      }
      if (!width.units) {
        width.units = simulate.timeUnits;
      }
      if (!repeat.units) {
        repeat.units = simulate.timeUnits;
      }

      if (repeat.value <= 0) {
        if (eq(simulate.time(), start) || (greaterThanEq(simulate.time(), start) && lessThanEq(simulate.time(), plus(start, width)))) {
          return height;
        }
      } else if (greaterThanEq(simulate.time(), start)) {
        let x = minus(simulate.time(), mult(simulate.varBank.get("floor")([div(minus(simulate.time(), start), repeat)]), repeat));
        let dv = minus(simulate.time(), start);
        if (minus(/** @type {Material} */(simulate.varBank.get("round")([div(dv, repeat)])), div(dv, repeat)).value === 0 || (greaterThanEq(x, start) && lessThanEq(x, plus(start, width)))) {
          return height;
        }
      }

      return new Material(0, height.units);
    });

  defineFunction(simulate, "Ramp", { params: [{ name: "Start Time", vectorize: true }, { name: "Finish Time", vectorize: true }, { name: "Height", vectorize: true, defaultVal: 1 }] },
    /**
     * @param {[Material, Material, Material]} x
     */
    (x) => {

      let start = toNum(x[0]);
      let finish = toNum(x[1]);
      let height = new Material(1);
      if (x.length === 3) {
        height = toNum(x[2]);
      }
      if (!start.units) {
        start.units = simulate.timeUnits;
      }
      if (!finish.units) {
        finish.units = simulate.timeUnits;
      }
      if (greaterThanEq(simulate.time(), start)) {
        let q = div(mult(simulate.varBank.get("min")([minus(finish, start), minus(simulate.time(), start)]), height), minus(finish, start));
        return q;
      }
      return new Material(0, height.units);
    });

  defineFunction(simulate, "Step", { params: [{ name: "Start Time", vectorize: true }, { name: "Height", vectorize: true, defaultVal: 1 }] },
    /**
     * @param {[Material, Material]} x
     */
    (x) => {
      let start = toNum(x[0]);
      let height = new Material(1);
      if (x.length === 2) {
        height = toNum(x[1]);
      }
      if (!start.units) {
        start.units = simulate.timeUnits;
      }

      if (greaterThanEq(simulate.time(), start)) {
        return height;
      }

      return new Material(0, height.units);
    });
  simulate.varBank.set("staircase", simulate.varBank.get("step"));


  defineFunction(simulate, "ConverterTable", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Converter]", noVector: true, needPrimitive: true }] },
    /**
     * @param {[SPrimitive]} x
     *
     * @returns {Vector}
     */
    (x) => {
      if (!(x[0] instanceof SConverter)) {
        throw new ModelError("ConverterTable() requires a Converter primitive as its parameter.", {
          code: 1045
        });
      }

      let input = x[0].dna.inputs;
      let outputs = x[0].dna.outputs;

      let items = [];

      let clean = function(x) {
        if (x instanceof Material) {
          return new Material(x.value);
        }
        return new Material(x);
      };
      
      for (let i = 0; i < input.length; i++) {
        items.push(new Vector([clean(input[i].value), clean(outputs[i])], simulate, ["x", "y"]));
      }

      return new Vector(items, simulate);
    });


  defineFunction(simulate, "Delay", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Primitive]", noVector: true, needPrimitive: true }, { name: "Delay", vectorize: true }, { name: "Initial Value", defaultVal: "None" }] },
    /**
     * @param {[SPrimitive, Material, ValueType?]} x
     *
     * @returns {ValueType}
     */
    (x) => {
      if (toNum(x[1]).value < 0) {
        throw new ModelError("The delay must be greater than or equal to 0.", {
          code: 1026
        });
      }

      if (x.length === 2) {
        return x[0].pastValue(toNum(x[1]));
      } else {
        return x[0].pastValue(toNum(x[1]), toNum(x[2])); // With default value
      }
    });

  // TODO: consider vectoring the delay/period for DelayN and smoothN

  defineFunction(simulate, "Smooth", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "Expression", noVector: true }, { name: "Period", vectorize: true, needNum: true }, { name: "Initial Value", defaultVal: "None" }] },
    (_x) => {
      throw new ModelError("Smooth() may only be called in a top level primitive equation", {
        code: 1052
      });
    });


  defineFunction(simulate, "SmoothN", { object: [simulate.varBank, PrimitiveObject], params: [
    { name: "Expression", noVector: true },
    { name: "Period", vectorize: true, needNum: true }, 
    { name: "Order", noUnits: true, noVector: true, needNum: true },
    { name: "Initial Value", defaultVal: "None" }
  ] },
  (_x) => {
    throw new ModelError("SmoothN() may only be called in a top level primitive equation", {
      code: 1052
    });
  });

  defineFunction(simulate, "Delay1", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "Expression", noVector: true }, { name: "Delay", vectorize: true, needNum: true }, { name: "Initial Value", defaultVal: "None" }] },
    (_x) => {
      throw new ModelError("Delay1() may only be called in a top level primitive equation", {
        code: 1053
      });
    });

  defineFunction(simulate, "Delay3", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "Expression", noVector: true }, { name: "Delay", vectorize: true, needNum: true }, { name: "Initial Value", defaultVal: "None" }] },
    (_x) => {
      throw new ModelError("Delay3() may only be called in a top level primitive equation", {
        code: 1054
      });
    });

  
  defineFunction(simulate, "DelayN", { object: [simulate.varBank, PrimitiveObject], params: [
    { name: "Expression", noVector: true },
    { name: "Delay", vectorize: true, needNum: true },
    { name: "Order", noUnits: true, noVector: true, needNum: true },
    { name: "Initial Value", defaultVal: "None" }
  ] },
  (_x) => {
    throw new ModelError("DelayN() may only be called in a top level primitive equation", {
      code: 1055
    });
  });



  simulate.varBank.set("fix", function (x, id) {
    testArgumentsSize(x, "Fix", 1, 2);

    /** @type {Material} */
    let spacing = null;
    if (x.length === 2) {
      spacing = toNum(evaluateNode(x[1].node, x[1].scope, simulate));

      if (!(spacing instanceof Material)) {
        throw new ModelError("fix() requires a number for the parameter 'spacing'.", {
          code: 6058
        });
      }
    }

    let mySeries = simulate.aggregateSeries.get(id);

    if (!mySeries) {
      mySeries = new AggregateSeries(simulate, spacing);
      simulate.aggregateSeries.set(id, mySeries);
    }

    return mySeries.get(x[0]);
  });
  simulate.varBank.get("fix").delayEvalParams = true;


  simulate.varBank.set("populationsize", function (x) {
    testArgumentsSize(x, "PopulationSize", 1, 1);
    if (x[0] instanceof SPopulation) {
      return new Material(x[0].agents.length);
    }
    throw new ModelError("PopulationSize must be passed an agent population as an argument.", {
      code: 1327
    });
  });
  PrimitiveObject["populationsize"] = simulate.varBank.get("populationsize");

  defineFunction(simulate, "Remove", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent]" }] }, (x) => {
    if (x[0].dead) {
      throw new ModelError("Cannot remove an already removed agent.", {
        code: 1328
      });
    }

    simulate.tasks.add(new Task({
      time: simulate.time(),
      priority: 10,
      expires: 1,
      name: "Remove Agent",
      action: (_task) => {
        x[0].die();
      }
    }));


    return new Material(1);
  });

  defineFunction(simulate, "Add", { object: [simulate.varBank, PrimitiveObject], params: [{ name: "[Agent Population]", allowOptionalPrimitive: true }, { needAgent: true, name: "[Base]", defaultVal: "Agent Base" }] }, (x) => {
    while ((!(x[0] instanceof SPopulation)) && !(x[0].container === null || x[0].container === undefined)) {
      x[0] = x[0].container;
    }
    if (!(x[0] instanceof SPopulation)) {
      throw new ModelError("You must pass an agent population as the first argument to Add().", {
        code: 1029
      });
    }

    if (x.length === 2) {
      return x[0].add(x[1]);
    } else {
      return x[0].add();
    }
  });

  defineFunction(simulate, "FindAll", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }] }, (x) => {
    return x[0];
  });

  defineFunction(simulate, "ResetTimer", { object: [simulate.varBank, PrimitiveObject], params: [{ needPrimitive: true, name: "[Action]" }] }, (x) => {
    if (!(x[0] instanceof SAction)) {
      throw new ModelError("ResetTimer requires an Action primitive.", {
        code: 1030
      });
    }
    x[0].resetTimer();
    return new Material(0);
  });

  defineFunction(simulate, "Transition", { object: [simulate.varBank, PrimitiveObject], params: [{ needPrimitive: true, name: "[Transition]" }] }, (x) => {
    if (!(x[0] instanceof STransition)) {
      throw new ModelError("Transition requires an Transition primitive.", {
        code: 1031
      });
    }
    x[0].trigger();
    return new Material(0);
  });

  defineFunction(simulate, "Value", { object: [simulate.varBank, VectorObject, AgentObject], params: [{ name: "[Population]" }, { needPrimitive: true, name: "[Primitive]" }] }, (x) => { // need population should be false

    let id = x[1].id;

    let population = null;

    if (!((x[0] instanceof SPopulation) || (x[0] instanceof SAgent) || (x[0] instanceof Vector) || (!x[0]))) {
      x[0] = toNum(x[0]);
    }

    if (x[0] instanceof SPopulation) {
      population = getPopulation(x[0], simulate);
    }

    if (x[0] instanceof Vector) {
      population = x[0];
    }
    if (population !== null) {
      let res = [];
      let q = -1;
      for (let item of population.items) {
        if (!(item instanceof SAgent)) {
          throw new ModelError("Cannot take \"Value()\" of vector that does not contain agents.", {
            code: 1172
          });
        }
        if (q !== -1) {
          res.push(item.children[q]);
        } else {
          for (let j = 0; j < item.children.length; j++) {
            if (item.children[j].id === id) {
              res.push(item.children[j]);
              q = j;
              break;
            }
          }
        }
      }

      return new Vector(res, simulate);
    } else if (x[0] instanceof SAgent) {
      for (let child of x[0].children) {
        if (child.id === id) {
          return child;
        }
      }
      throw new ModelError("Could not find referenced primitive for \"Value()\".", {
        code: 1032
      });
    }

    throw new ModelError("Invalid type for the first argument of \"Value()\".", {
      code: 1033
    });
  });

  defineFunction(simulate, "SetValue", { object: [simulate.varBank, VectorObject, PrimitiveObject, AgentObject], params: [{ name: "[Population]" }, { needPrimitive: true, name: "[Primitive]" }, { name: "Value", allowBoolean: true }] }, (x) => { // need population should be false
    let id = x[1].id;

    let population = null;

    if (x[0] instanceof SPopulation) {
      population = getPopulation(x[0], simulate);
    }

    if (x[0] instanceof Vector) {
      population = x[0];
    }

    if (population !== null) {
      for (let i = 0; i < population.length(); i++) {
        for (let child of population.items[i].children) {
          if (child.id === id) {
            child.setValue(x[2]);
          }
        }
      }
      return new Material(1);
    } else if (x[0] instanceof SAgent) {
      for (let child of x[0].children) {
        if (child.id === id) {
          child.setValue(x[2]);
          return new Material(1);
        }
      }

      throw new ModelError("Could not find referenced primitive for \"SetValue()\".", {
        code: 1034
      });
    }

    throw new ModelError("Invalid type for the first argument of \"SetValue()\".", {
      code: 1035
    });
  });

  defineFunction(simulate, "FindIndex", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }, { name: "Index", noVector: true, needNum: true, noUnits: true }] },
    /**
     * @param {[Vector, Material]} x
     *
     * @returns
     */
    (x) => {
      let population = x[0];
      for (let item of population.items) {
        if (item.index + 1 === x[1].value) {
          return item;
        }
      }

      throw new ModelError("Index not found in population.", {
        code: 1036
      });
    });

  defineFunction(simulate, "FindState", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }, { needPrimitive: true, name: "[State]" }] },
    /**
     * @param {[Vector, SPrimitive]} x
     *
     * @returns
     */
    (x) => {

      let population = x[0];

      if (!((x[1] instanceof SState) || (x[1].dna.primitive instanceof State))) {
        throw new ModelError("FindState() requires a State primitive as its argument.", {
          code: 1037
        });
      }

      let id = x[1].id;
      let res = [];

      for (let i = 0; i < population.items.length; i++) {
        if (population.items[i].stateIDs.has(id)) {
          res.push(population.items[i]);
        }
      }

      return new Vector(res, simulate);
    });

  defineFunction(simulate, "FindNotState", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }, { needPrimitive: true, name: "[State]" }] },
    /**
     * @param {[Vector, SPrimitive]} x
     *
     * @returns
     */
    (x) => {

      let population = x[0];
      if (!((x[1] instanceof SState) || (x[1].dna.primitive instanceof State))) {
        throw new ModelError("FindNotState() requires a State primitive as its argument.", {
          code: 1038
        });
      }

      let id = x[1].id;
      let res = [];

      for (let item of population.items) {
        if (!item.stateIDs.has(id)) {
          res.push(item);
        }
      }

      return new Vector(res, simulate);
    });

  defineFunction(simulate, "FindNearby", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }, { name: "Target", allowOptionalPrimitive: true }, { name: "Distance Limit", needNum: true, noVector: true }] },
    /**
     * @param {[Vector, SPrimitive, Material]} x
     *
     * @returns
     */
    (x) => {
      let population = x[0];

      let loc = locationValue(x[1]);

      let a;
      try {
        a = agent(x[1], simulate);
      } catch (err) {
        // pass
      }


      let res = [];
      for (let i = 0; i < population.length(); i++) {
        let item = agent(population.items[i], simulate);
        if (item !== a) {
          if (lessThanEq(distance(loc, locationValue(item), simulate), x[2])) {
            res.push(item);
          }
        }
      }
      return new Vector(res, simulate);
    });

  defineFunction(simulate, "FindNearest", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }, { name: "Target", allowOptionalPrimitive: true }, { noUnits: true, noVector: true, needNum: true, defaultVal: 1, name: "Count" }] },
    /**
     * @param {[Vector, SPrimitive, Material]} x
     *
     * @returns
     */
    (x) => {
      let population = x[0];
      let count = 1;

      if (x.length === 3) {
        count = x[2].value;

        if (count < 1) {
          throw new ModelError("You must select at least one agent in FindNearest().", {
            code: 1039
          });
        }
        if (count !== Math.floor(count)) {
          throw new ModelError("Count must be an integer.", {
            code: 1040
          });
        }
      }


      let loc = locationValue(x[1]);

      let a;
      try {
        a = agent(x[1], simulate);
      } catch (err) {
        // pass
      }

      let res = [];
      for (let item of population.items) {
        item = agent(item, simulate);
        if (item !== a) {
          res.push({
            distance: distance(loc, locationValue(item), simulate),
            item: item
          });
        }
      }

      if (res.length < count) {
        throw new ModelError(`Can't find nearest ${count} agents of a population of size ${res.length}.`, {
          code: 1041
        });
      }


      let minItems = [res[0]];
      for (let i = 1; i < res.length; i++) {
        let added = false;
        for (let j = 0; j < minItems.length; j++) {
          if (lessThan(res[i].distance, minItems[j].distance)) {
            minItems.splice(j, 0, res[i]);
            added = true;
            break;
          }
        }
        if ((!added) && minItems.length < count) {
          minItems.push(res[i]);
        } else if (minItems.length > count) {
          minItems.length = count;
        }
      }

      if (minItems.length === 1) {
        return minItems[0].item;
      } else {
        return new Vector(minItems.map(x => x.item), simulate);
      }
    });


  defineFunction(simulate, "FindFurthest", { object: [simulate.varBank, VectorObject, PrimitiveObject], params: [{ needPopulation: true, name: "[Agent Population]" }, { name: "Target", allowOptionalPrimitive: true }, { noUnits: true, noVector: true, needNum: true, defaultVal: 1, name: "Count" }] },
    /**
     * @param {[Vector, SPrimitive, Material]} x
     * @returns
     */
    (x) => {

      let population = x[0];

      let count = 1;
      if (x.length === 3) {
        count = x[2].value;

        if (count < 1) {
          throw new ModelError("You must select at least one agent in FindFurthest().", {
            code: 1042
          });
        }
        if (count !== Math.floor(count)) {
          throw new ModelError("Count must be an integer.", {
            code: 1043
          });
        }
      }



      let loc = locationValue(x[1]);
      /** @type {SAgent} */
      let a;
      try {
        a = agent(x[1], simulate);
      } catch (err) {
        // pass
      }


      let res = [];
      for (let i of population.items) {
        let item = agent(i, simulate);
        if (item !== a) {
          res.push({ distance: distance(loc, locationValue(item), simulate), item: item });
        }
      }

      if (res.length < count) {
        throw new ModelError(`Can't find furthest ${count} agents of a population of size ${res.length}.`, {
          code: 1044
        });
      }

      let minItems = [res[0]];
      for (let i = 1; i < res.length; i++) {
        let added = false;
        for (let j = 0; j < minItems.length; j++) {
          if (greaterThan(res[i].distance, minItems[j].distance)) {
            minItems.splice(j, 0, res[i]);
            added = true;
            break;
          }
        }
        if ((!added) && minItems.length < count) {
          minItems.push(res[i]);
        } else if (minItems.length > count) {
          minItems.length = count;
        }
      }

      if (minItems.length === 1) {
        return minItems[0].item;
      } else {
        return new Vector(minItems.map(x => x.item), simulate);
      }
    });

  defineFunction(simulate, "Index", { object: [simulate.varBank, AgentObject], params: [{ noVector: true, needAgent: true, name: "[Agent]" }] }, (x) => {
    return new Material(x[0].index + 1);
  });

  defineFunction(simulate, "Connect", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent 1]" }, { name: "[Agent 2]" }, { name: "Weight", defaultVal: "missing", needNum: true }] },
    /**
     * @param {[SAgent, SAgent, Material|"missing"]} x
     *
     * @returns
     */
    (x) => {

      let weight = undefined;
      if (x[2] !== "missing") {
        weight = x[2];
      }

      if (x[1] instanceof Vector) {
        x[1].items.forEach((a) => {
          x[0].connect(a, weight);
        });
      } else {
        x[0].connect(x[1], weight);
      }

      return new Material(1);
    });

  defineFunction(simulate, "Unconnect", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent 1]" }, { name: "[Agent 2]" }] },
    /**
     * @param {[SAgent, SAgent]} x
     *
     * @returns
     */
    (x) => {
      if (x[1] instanceof Vector) {
        x[1].items.forEach((a) => {
          x[0].unconnect(a);
        });
      } else {
        x[0].unconnect(x[1]);
      }

      return new Material(1);
    });

  defineFunction(simulate, "Connected", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent]" }] }, (x) => {
    return new Vector(x[0].connected.slice(), simulate);
  });

  defineFunction(simulate, "ConnectionWeight", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent 1]" }, { name: "[Agent 2]" }] }, (x) => {
    if (x[1] instanceof Vector) {
      return new Vector(x[1].items.map((a) => {
        return x[0].connectionWeight(a);
      }), simulate);
    } else {
      return x[0].connectionWeight(x[1]);
    }
  });

  defineFunction(simulate, "SetConnectionWeight", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent 1]" }, { name: "[Agent 2]" }, { name: "Weight", needNum: true }] },
    /**
     * @param {[SAgent, SAgent|Vector, Material]} x
     */
    (x) => {
      if (x[1] instanceof Vector) {
        x[1].items.forEach((a) => {
          x[0].setConnectionWeight(a, x[2]);
        });
      } else {
        x[0].setConnectionWeight(x[1], x[2]);
      }
      return new Material(1);
    });

  simulate.varBank.set("print", function (x) {
    function makePrimitiveString(x) {
      if (x instanceof String) {
        x = "" + x;
      }
      return x;
    }

    if (x.length === 2) {
      console.log(makePrimitiveString(x[0].value.toString()));
      console.log(makePrimitiveString(x[1]));
      return x[1];
    } else {
      console.log(makePrimitiveString(x[0]));
      return x[0];
    }
  });

  defineFunction(simulate, "Width", { params: [{ needAgents: true, name: "[Agent Population]" }] }, (x) => {
    return x[0].geoWidth;
  });

  defineFunction(simulate, "Height", { params: [{ needAgents: true, name: "[Agent Population]" }] }, (x) => {
    return x[0].geoHeight;
  });

  defineFunction(simulate, "Distance", { object: [simulate.varBank, AgentObject], params: [{ name: "Location 1" }, { name: "Location 2" }] }, (x) => {
    let loc1 = locationValue(x[0]);
    let loc2 = locationValue(x[1]);

    return distance(loc1, loc2, simulate);
  });

  defineFunction(simulate, "Location", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent]" }] }, (x) => {
    if (!x[0].location) {
      throw new ModelError("The location is not defined.", {
        code: 1046
      });
    } else {
      return x[0].location.fullClone();
    }
  });

  defineFunction(simulate, "SetLocation", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Agent]" }, { needVector: true, name: "Direction" }] },
    /**
     * @param {[SAgent, Vector<Material>]} x
     * @returns
     */
    (x) => {
      let v = toNum(x[1]);
      let agent = x[0];
      agent.location = v.fullClone();
      if (!agent.location.names) {
        agent.location.names = ["x", "y"];
        agent.location.namesLC = ["x", "y"];
      }
      return new Material(0);
    });

  defineFunction(simulate, "Move", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Mover]" }, { needVector: true, name: "Direction" }] },
    /**
     * @param {[SAgent, Vector<Material>]} x
     * @returns
     */
    (x) => {
      let v = toNum(x[1]);
      
      shiftLocation(x[0], plus(x[0].location, v));
      return new Material(0);
    });


  /**
   * @param {*} x
   * @returns {LocationType}
   */
  function locationValue(x) {
    const NOT_INIT = "Location not initialized yet for agents. Location initialization happens after agent primitive value initialization.";
    if (x instanceof Vector) {
      if (x.items.length !== 2 || !(x.items[0] instanceof Material) || !(x.items[1] instanceof Material)) {
        throw new ModelError("Location vector does not contain exactly two numbers.", {
          code: 1047
        });
      } else {
        return {
          location: x,
          agent: null
        };
      }
    } else {
      try {
        let a = agent(x, simulate);
        let loc = a.location;
        if (loc === null) {
          throw new ModelError(NOT_INIT, {
            code: 1048
          });
        }
        return {
          location: loc,
          agent: a
        };
      } catch (err) {
        if (err.message === NOT_INIT) {
          throw err;
        }
        throw new ModelError("Location must be a vector or an agent.", {
          code: 1049
        });
      }
    }
  }

  defineFunction(simulate, "MoveTowards", { object: [simulate.varBank, AgentObject], params: [{ needAgent: true, name: "[Mover]" }, { name: "[Target]" }, { name: "Distance", noVector: true, needNum: true }] },
    /**
     * @param {[SAgent, Vector<Material>, Material]} x
     * @returns
     */
    (x) => {

      let loc1 = locationValue(x[0]);
      let loc2 = locationValue(x[1]);

      let l1 = loc1.location;
      let l2 = loc2.location;

      let distX = minus(l2.items[0], l1.items[0]);
      let distY = minus(l2.items[1], l1.items[1]);

      if (distX.value === 0 && distY.value === 0) {
        return new Material(1);
      }

      let a = loc1.agent;
      if (a.container.geoWrap) {
        if (greaterThan(distX, a.container.halfWidth)) {
          distX = minus(distX, a.container.geoWidth);
        } else if (lessThan(distX, negate(a.container.halfWidth))) {
          distX = plus(distX, a.container.geoWidth);
        }
        if (greaterThan(distY, a.container.halfHeight)) {
          distY = minus(distY, a.container.geoHeight);
        } else if (lessThan(distY, negate(a.container.halfHeight))) {
          distY = plus(distY, a.container.geoHeight);
        }
      }

      let dir = new Vector([distX, distY], simulate, ["x", "y"]);

      shiftLocation(a, plus(a.location, mult(dir, div(x[2], distance(loc1, loc2, simulate)))));

      return new Material(1);
    });

  simulate.varBank.set("primitivebase", makeObjectBase(PrimitiveObject, simulate));

  simulate.varBank.set("agentbase", makeObjectBase(AgentObject, simulate));

  simulate.varBank.get("primitivebase").parent = simulate.varBank.get("agentbase");

  simulate.varBank.set("vectorbase", makeObjectBase(VectorObject, simulate));
}


// Only store these many distance caches. When doing many comparisons,
// the distance cache may grow too large
const MAX_DISTANCE_CACHES = 1e6;

/**
 * @param {LocationType} a
 * @param {LocationType} b
 * @param {import("./Simulator").Simulator} simulate
 *
 * @returns {Material}
 */
function distance(a, b, simulate) {
  let l1 = a.location;
  let l2 = b.location;

  simulate.distanceCacheCount++;

  /** @type {Partial<SPopulation>} */
  let agents = a.agent ? a.agent.container : (b.agent ? b.agent.container : null);

  let cacheKey;
  if (simulate.distanceCacheCount < MAX_DISTANCE_CACHES) {
    let s1 = l1.items[0].toString() + "," + l1.items[1].toString();
    let s2 = l2.items[0].toString() + "," + l2.items[1].toString();
    if (s2 < s1) {
      [s1, s2] = [s2, s1];
    }
    cacheKey = s1 + ":" + s2;
    if (agents) {
      cacheKey += "/" + agents.id;
    }

    if (cacheKey in simulate.distanceCache) {
      return simulate.distanceCache[cacheKey];
    }
  }

  let distx = /** @type {Material} */ (minus(l1.items[0], l2.items[0]));
  let disty = /** @type {Material} */ (minus(l1.items[1], l2.items[1]));


  if (agents && agents.geoWrap) {
    if (greaterThan(distx, agents.halfWidth)) {
      distx = minus(agents.geoWidth, distx);
    } else if (lessThan(distx, negate(agents.halfWidth))) {
      distx = minus(distx, negate(agents.geoWidth));
    }
    if (greaterThan(disty, agents.halfHeight)) {
      disty = minus(agents.geoHeight, disty);
    } else if (lessThan(disty, negate(agents.halfHeight))) {
      disty = minus(disty, negate(agents.geoHeight));
    }
  }

  let v1 = distx.value;
  let v2 = disty.value;

  if (distx.units !== disty.units) {
    v2 = fn["*"](v2, convertUnits(distx.units, disty.units));
  }

  let distN = fn["sqrt"](fn["+"](fn["*"](v1, v1), fn["*"](v2, v2)));
  let dist = new Material(distN, distx.units);

  if (simulate.distanceCacheCount < MAX_DISTANCE_CACHES) {
    simulate.distanceCache[cacheKey] = dist;
  }

  return dist;
}


/**
 * @param {*} obj
 * @param {import("./Simulator").Simulator} simulate
 *
 * @returns {SAgent}
 */
export function agent(obj, simulate) {
  if ((obj instanceof SVariable) || (obj instanceof SStock)) {
    obj = toNum(obj);
  }
  if (obj instanceof SAgent) {
    return obj;
  } else if (obj instanceof SPrimitive) {
    return agent(obj.container, simulate);
  } else {
    throw new ModelError("An agent is required here.", {
      code: 1050
    });
  }
}


/**
 * @param {*} obj
 *
 * @returns {SPopulation}
 */
export function agents(obj) {
  if (obj instanceof SPopulation) {
    return obj;
  } else if ((obj instanceof SPrimitive) || (obj instanceof SAgent)) {
    return agents(obj.container);
  } else {
    throw new ModelError("An agent population is required here.", {
      code: 1051
    });
  }
}


/**
 * @param {*} item
 * @param {import("./Simulator").Simulator} simulate
 *
 * @returns {Vector}
 */
export function getPopulation(item, simulate) {
  if (item.items) {
    return item;
  }
  if (item instanceof SPopulation) {
    return new Vector(item.agents.slice(), simulate);
  } else if (toNum(item) instanceof Vector) {
    return toNum(item);
  } else {
    return new Vector([agent(item, simulate)], simulate);
  }
}


/**
 * @param {SAgent} agent
 * @param {Vector<Material>} newLocation
 */
function shiftLocation(agent, newLocation) {
  if (agent.container.geoWrap) {
    while (lessThan(newLocation.items[0], new Material(0))) {
      newLocation.items[0] = plus(newLocation.items[0], agent.container.geoWidth);
    }
    while (greaterThan(newLocation.items[0], agent.container.geoWidth)) {
      newLocation.items[0] = minus(newLocation.items[0], agent.container.geoWidth);
    }
    while (lessThan(newLocation.items[1], new Material(0))) {
      newLocation.items[1] = plus(newLocation.items[1], agent.container.geoHeight);
    }
    while (greaterThan(newLocation.items[1], agent.container.geoHeight)) {
      newLocation.items[1] = minus(newLocation.items[1], agent.container.geoHeight);
    }
  }

  agent.location = newLocation;
  if (!agent.location.names) {
    agent.location.names = ["x", "y"];
    agent.location.namesLC = ["x", "y"];
  }
}



export function testPrimitive(x, name, primitiveIndexes) {
  for (let index of primitiveIndexes) {
    if (!(x[index] instanceof SPrimitive)) {
      throw new ModelError(`${name}() requires a primitive reference to be passed to it as argument number ${index + 1}.`, {
        code: 1024
      });
    }
  }
}
