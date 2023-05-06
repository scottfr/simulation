import { agent, agents, getPopulation } from "../Functions.js";
import { SPrimitive, SAgent, SPopulation } from "../Primitives.js";
import { fn } from "../CalcMap.js";
import { div, eq, evaluateNode, greaterThan, lessThan, minus, mult, plus, power, StringObject, toNum, trueValue, UserFunction, VectorObject } from "./Formula.js";
import { Rand, RandBeta, RandBinomial, RandDist, RandExp, RandGamma, RandLognormal, RandNegativeBinomial, RandNormal, RandPoisson, RandTriangular } from "./Rand.js";
import { Material } from "./Material.js";
import { stringify, strictEquals } from "./Utilities.js";
import { Vector } from "./Vector.js";
import { ModelError } from "./ModelError.js";
import { jStat } from "../../vendor/jstat/jstat.js";
import { SeedRandom } from "../../vendor/random.js";


/**
 * @param {import("../Simulator").Simulator} simulate
 */
export function createFunctions(simulate) {
  defineFunction(simulate, "RandBeta", { params: [{ name: "Alpha", noUnits: true, noVector: true }, { name: "Beta", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandBeta(simulate, x[0].value, x[1].value));
  });

  defineFunction(simulate, "RandDist", { params: [{ name: "Distribution", noUnits: true, needVector: true }, { name: "Y (in which case Distribution is X)", noUnits: true, needVector: true, defaultVal: false }] }, (x) => {
    let xVals, yVals;
    if (x.length === 1 || x[1] === false) {
      let vec = x[0];
      xVals = [];
      yVals = [];
      for (let i = 0; i < vec.items.length; i++) {
        if (!(vec.items[i] instanceof Vector)) {
          throw new ModelError("Invalid vector provided to RandDist.", {
            code: 6000
          });
        }
        xVals.push(toNum(vec.items[i].items[0]).value);
        yVals.push(toNum(vec.items[i].items[1]).value);
      }
    } else {
      xVals = toNum(x[0]).items.map(x => x.value);
      yVals = toNum(x[1]).items.map(x => x.value);
    }
    return new Material(RandDist(simulate, xVals, yVals));
  });

  defineFunction(simulate, "RandBoolean", { params: [{ name: "Probability", defaultVal: 0.5, noUnits: true, noVector: true }] }, (x) => {
    let p;
    if (x.length !== 0) {
      p = toNum(x[0]).value;
    } else {
      p = 0.5;
    }

    if (Rand(simulate) < p) {
      return true;
    } else {
      return false;
    }
  });
  defineFunction(simulate, "Rand", { params: [{ name: "Lower Bound", defaultVal: 0, noUnits: true, noVector: true }, { name: "Upper Bound", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    if (x.length === 0) {
      return new Material(Rand(simulate));
    } else if (x.length === 2) {
      return new Material(Rand(simulate, toNum(x[0]).value, toNum(x[1]).value));
    } else {
      throw new ModelError("Rand() must either have no parameters or a two: Min and Max bounds.", {
        code: 6001
      });
    }
  });
  defineFunction(simulate, "RandNormal", { params: [{ name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    if (x.length === 0) {
      return new Material(RandNormal(simulate));
    } else if (x.length === 2) {
      return new Material(RandNormal(simulate, toNum(x[0]).value, toNum(x[1]).value));
    } else {
      throw new ModelError("RandNormal() must either have no parameters or a two: Mean and Standard Deviation.", {
        code: 6002
      });
    }
  });
  defineFunction(simulate, "RandExp", { params: [{ name: "Rate", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    if (x.length !== 0) {
      return new Material(RandExp(simulate, toNum(x[0]).value));
    } else {
      return new Material(RandExp(simulate));
    }
  });
  defineFunction(simulate, "RandLognormal", { params: [{ name: "Mean", noUnits: true, noVector: true }, { name: "Standard Deviation", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandLognormal(simulate, toNum(x[0]).value, toNum(x[1]).value));
  });
  defineFunction(simulate, "RandBinomial", { params: [{ name: "Count", noUnits: true, noVector: true }, { name: "Probability", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandBinomial(simulate, toNum(x[0]).value, toNum(x[1]).value));
  });
  defineFunction(simulate, "RandNegativeBinomial", { params: [{ name: "Successes", noUnits: true, noVector: true }, { name: "Probability", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandNegativeBinomial(simulate, toNum(x[0]).value, toNum(x[1]).value));
  });
  defineFunction(simulate, "RandGamma", { params: [{ name: "Alpha", noUnits: true, noVector: true }, { name: "Beta", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandGamma(simulate, toNum(x[0]).value, toNum(x[1]).value));
  });
  defineFunction(simulate, "RandPoisson", { params: [{ name: "Rate", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandPoisson(simulate, toNum(x[0]).value));
  });
  defineFunction(simulate, "RandTriangular", { params: [{ name: "Minimum", noUnits: true, noVector: true }, { name: "Maximum", noUnits: true, noVector: true }, { name: "Peak", noUnits: true, noVector: true }] }, (x) => {
    return new Material(RandTriangular(simulate, toNum(x[0]).value, toNum(x[1]).value, toNum(x[2]).value));
  });

  defineFunction(simulate, "Magnitude", { params: [{ name: "Number" }] }, (x) => {
    if (toNum(x[0]) instanceof Vector) {
      return simulate.varBank["sqrt"]([simulate.varBank["sum"]([mult(x[0], x[0])])]);
    }
    let r = toNum(x[0]);
    r.value = fn.magnitude(r.value);
    return r;
  });



  defineFunction(simulate, "Abs", { params: [{ name: "Number" }], recurse: true, leafNeedNum: true }, (x) => {
    let r = toNum(x[0]);
    r.value = fn.abs(r.value);
    return r;
  });
  defineFunction(simulate, "sin", { params: [{ name: "Number" }], recurse: true, leafNeedNum: true }, (x) => {
    let z = toNum(x[0]);

    if (z.units && !z.units.isUnitless()) {
      z = mult(z, new Material(1, simulate.unitManager.getUnitStore(["radians"], [-1])));
    }
    if (!z.units) {
      return new Material(fn.sin(z.value));
    } else {
      throw new ModelError("Non-angular units cannot be used in Sin().", {
        code: 6003
      });
    }
  });
  defineFunction(simulate, "cos", { params: [{ name: "Number" }], recurse: true, leafNeedNum: true }, (x) => {
    let z = toNum(x[0]);

    if (z.units && !z.units.isUnitless()) {
      z = mult(z, new Material(1, simulate.unitManager.getUnitStore(["radians"], [-1])));
    }
    if (!z.units) {
      return new Material(fn.cos(z.value));
    } else {
      throw new ModelError("Non-angular units cannot be used in Cos().", {
        code: 6004
      });
    }
  });
  defineFunction(simulate, "tan", { params: [{ name: "Number" }], recurse: true, leafNeedNum: true }, (x) => {
    let z = toNum(x[0]);

    if (z.units && !z.units.isUnitless()) {
      z = mult(z, new Material(1, simulate.unitManager.getUnitStore(["radians"], [-1])));
    }
    if (!z.units) {
      return new Material(fn.tan(z.value));
    } else {
      throw new ModelError("Non-angular units cannot be used in Tan().", {
        code: 6005
      });
    }
  });
  defineFunction(simulate, "asin", { params: [{ name: "Number", noUnits: true }], recurse: true, leafNeedNum: true }, (x) => {
    return new Material(fn.asin(toNum(x[0]).value));
  });
  defineFunction(simulate, "acos", { params: [{ name: "Number", noUnits: true }], recurse: true, leafNeedNum: true }, (x) => {
    return new Material(fn.acos(toNum(x[0]).value));
  });
  defineFunction(simulate, "atan", { params: [{ name: "Number", noUnits: true }], recurse: true, leafNeedNum: true }, (x) => {
    return new Material(fn.atan(toNum(x[0]).value));
  });

  defineFunction(simulate, "arcsin", { params: [{ name: "Number", noUnits: true }], recurse: true, leafNeedNum: true }, (x) => {
    return new Material(fn.asin(toNum(x[0]).value), simulate.unitManager.getUnitStore(["radians"], [1]));
  });
  defineFunction(simulate, "arccos", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    return new Material(fn.acos(toNum(x[0]).value), simulate.unitManager.getUnitStore(["radians"], [1]));
  });
  defineFunction(simulate, "arctan", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    return new Material(fn.atan(toNum(x[0]).value), simulate.unitManager.getUnitStore(["radians"], [1]));
  });

  defineFunction(simulate, "Sign", { params: [{ name: "Number", leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]);
    if (r.value < 0) {
      return div(new Material(-1), new Material(1));
    } else if (r.value > 0) {
      return div(new Material(1), new Material(1));
    } else if (r.value === 0) {
      return new Material(0);
    }
    throw new ModelError("Invalid value for <i>Sign</i>.", {
      code: 6006
    });
  });
  defineFunction(simulate, "Sqrt", { params: [{ name: "Number", leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]).fullClone();
    if (r.value < 0) {
      throw new ModelError("Sqrt() requires a number greater than or equal to 0.", {
        code: 6007
      });
    }
    r.value = fn.sqrt(r.value);
    if (r.units && !r.units.isUnitless()) {
      r.units = r.units.power(0.5);
    }
    return r;
  });
  defineFunction(simulate, "Ln", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0) {
      throw new ModelError("Ln() requires a number greater than or equal to 0.", {
        code: 6008
      });
    }
    return new Material(fn.log(val));
  });
  defineFunction(simulate, "Log", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0) {
      throw new ModelError("Log() requires a number greater than or equal to 0.", {
        code: 6009
      });
    }
    return new Material(fn.log(val, 10));
  });
  defineFunction(simulate, "Logit", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]);
    r.value = fn["-"](fn.log(r.value), fn.log(fn["-"](1, r.value)));
    return r;
  });
  defineFunction(simulate, "Expit", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]);
    r.value = fn["/"](1, fn["+"](1, fn.exp(fn["-"](r.value))));
    return r;
  });
  defineFunction(simulate, "Round", { params: [{ name: "Number", noUnits: false, leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]);
    r.value = fn.round(r.value);
    return r;
  });
  defineFunction(simulate, "Ceiling", { params: [{ name: "Number", noUnits: false, leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]);
    r.value = fn.ceiling(r.value);
    return r;
  });
  defineFunction(simulate, "Floor", { params: [{ name: "Number", noUnits: false, leafNeedNum: true }], recurse: true }, (x) => {
    let r = toNum(x[0]);
    r.value = fn.floor(r.value);
    return r;
  });
  defineFunction(simulate, "Exp", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    return new Material(fn.exp(toNum(x[0]).value));
  });

  simulate.varBank["ifthenelse"] = function (x) {
    testArgumentsSize(x, "IfThenElse", 3, 3);

    let v = toNum(evaluateNode(x[0].node, x[0].scope, simulate));

    if (v instanceof Vector) {
      return vecIfThenElse(v, evaluateNode(x[1].node, x[1].scope, simulate), evaluateNode(x[2].node, x[2].scope, simulate));
    }

    if (trueValue(v)) {
      return evaluateNode(x[1].node, x[1].scope, simulate);
    } else {
      return evaluateNode(x[2].node, x[2].scope, simulate);
    }
  };
  simulate.varBank["ifthenelse"].delayEvalParams = true;


  simulate.varBank["assert"] = function (x) {
    testArgumentsSize(x, "Assert", 1, 2);

    let v = evaluateNode(x[0].node, x[0].scope, simulate);

    if (!trueValue(v)) {
      throw new ModelError(x[1] ? evaluateNode(x[1].node, x[1].scope, simulate) : "Assert() failed", {
        code: 20000
      });
    } else {
      return new Material(1);
    }
  };
  simulate.varBank["assert"].delayEvalParams = true;

  function vecIfThenElse(test, tVal, fVal) {

    let choiceFn = function (t, f) {
      if (t instanceof Vector) {
        return t.combine(f, choiceFn);
      } else {
        return [t, f];
      }
    };

    tVal = toNum(tVal);
    fVal = toNum(fVal);
    let choices;
    if (tVal instanceof Vector) {
      choices = tVal.cloneCombine(fVal, choiceFn);
    } else if (fVal instanceof Vector) {
      choices = fVal.cloneCombine(tVal, (a, b) => {
        return choiceFn(b, a);
      });
    } else {
      choices = choiceFn(tVal, fVal);
    }

    let testFn = function (test, val) {
      if (test instanceof Vector) {
        return test.combine(val, testFn);
      }

      if (trueValue(test)) {
        return val[0];
      } else {
        return val[1];
      }
    };

    return test.cloneCombine(choices, testFn);
  }


  simulate.varBank["map"] = function (x) {
    testArgumentsSize(x, "Map", 2, 2);
    let v;
    if (x[0].node instanceof Vector) {
      v = x[0].node;
    } else if (x[0] instanceof Vector) {
      v = x[0];
    } else {
      v = evaluateNode(x[0].node, x[1].scope, simulate);
    }

    if (v instanceof SPrimitive) {
      v = toNum(v);
    }
    if (!(v instanceof Vector)) {
      throw new ModelError("Map() requires a vector as its first argument.", {
        code: 6010
      });
    }
    v = v.fullClone();

    let fn;
    let scope = { x: null, "-parent": x[1].scope };
    let node = x[1].node;
    try {
      fn = evaluateNode(node, scope, simulate);
    } catch (err) {
      // pass
    }

    let f;
    if (fn instanceof Function || fn instanceof UserFunction) {
      if (fn.fn) {
        fn = fn.fn;
      }
      f = function (x) {
        return fn([x]);
      };
    } else {
      f = function (input, key) {
        scope.x = input;
        scope.key = key || "";
        return evaluateNode(node, scope, simulate);
      };
    }

    return v.apply(f);
  };
  simulate.varBank["map"].delayEvalParams = true;
  VectorObject["map"] = simulate.varBank["map"];

  defineFunction(simulate, "Sample", { object: [simulate.varBank, VectorObject], params: [{ name: "Vector", needVector: true }, { name: "Sample Size" }, { name: "Repeat", noVector: true, allowBoolean: true, defaultVal: false }] }, (x) => {
    let v = toNum(x[0]);
    let count = toNum(x[1]).value;
    if (count === 0) {
      return new Vector([], simulate);
    }

    let length = v.length();
    let repeat = x[2] && trueValue(toNum(x[2]));

    if (length === 0) {
      throw new ModelError("Sample() requires a non-empty vector.", {
        code: 6011
      });
    }
    let res = [];
    if (repeat) {
      for (let i = 0; i < count; i++) {
        res.push(v.items[Math.floor(Rand(simulate) * length)]);
      }
    } else {
      if (length < count) {
        throw new ModelError("Vector for Sample() is too small for the given sample size.", {
          code: 6012
        });
      }

      let shuffled = v.items.slice();
      for (let i = 0; i < count; i++) {
        res.push(shuffled.splice(Math.floor(Rand(simulate) * shuffled.length), 1)[0]);
      }
    }

    return new Vector(res, simulate);
  });

  defineFunction(simulate, "IndexOf", { object: [simulate.varBank, VectorObject], params: [{ name: "Haystack", needVector: true, noUnits: true }, { name: "Needle", allowBoolean: true, allowString: true }] }, (x) => {

    let v = x[1];

    if (v instanceof Vector) {
      let res = [];
      for (let i = 0; i < v.items.length; i++) {
        res.push(findElement(v.items[i], x[0]));
      }
      return new Vector(res, simulate);
    } else {
      return findElement(v, x[0]);
    }
  });

  defineFunction(simulate, "Contains", { object: [simulate.varBank, VectorObject], params: [{ name: "Haystack", needVector: true, noUnits: true }, { name: "Needle", allowBoolean: true, noVector: true, allowString: true }] }, (x) => {

    if (eq(new Material(0), simulate.varBank["indexof"](x))) {
      return false;
    } else {
      return true;
    }
  });

  defineFunction(simulate, "Collapse", { params: [{ name: "Source", needVector: true, noUnits: false }, { name: "Target", noVector: false }] }, (x) => {
    return toNum(x[0]).collapseDimensions(toNum(x[1]));
  });

  function findElement(needle, haystack) {
    for (let i = 0; i < haystack.length(); i++) {
      if (eq(needle, haystack.items[i])) {
        return new Material(i + 1);
      }
    }
    return new Material(0);
  }

  simulate.varBank["filter"] = function (x) {
    testArgumentsSize(x, "Filter", 2, 2);

    let v;
    if (x[0].node instanceof Vector) {
      v = x[0].node;
    } else if (x[0] instanceof Vector) {
      v = x[0];
    } else {
      v = evaluateNode(x[0].node, x[0].scope, simulate);
    }

    if (v instanceof SPrimitive) {
      v = toNum(v);
    }
    if (!(v instanceof Vector)) {
      throw new ModelError("Filter() requires a vector as its first argument.", {
        code: 6013
      });
    }
    v = v.fullClone();

    let t = simulate.varBank["map"](x);
    return simulate.varBank["select"]([v, t]);
  };
  simulate.varBank["filter"].delayEvalParams = true;
  VectorObject["filter"] = simulate.varBank["filter"];

  simulate.varBank["join"] = function (x) {
    let res = [];
    let names = [];
    let hasNames = false;
    for (let i = 0; i < x.length; i++) {
      let y = x[i];

      if (y instanceof SPrimitive) {
        y = toNum(y);
      }

      if (y instanceof Vector) {
        res = res.concat(y.items);
        if (y.names) {
          names = names.concat(y.names);
          hasNames = true;
        } else {
          for (let j = 0; j < y.items.length; j++) {
            names.push(undefined);
          }
        }
      } else {
        res.push(y);
        names.push(undefined);
      }
    }
    return new Vector(res, simulate, hasNames ? names : undefined);
  };

  simulate.varBank["repeat"] = function (x) {
    testArgumentsSize(x, "Repeat", 2, 2);
    let items = toNum(evaluateNode(x[1].node, x[1].scope, simulate));
    let count = items;
    if (items instanceof Vector) {
      if (items.names && items.names.length) {
        throw new ModelError(`If a repeat count is a vector, it can't have names. Got, <i>${items}</i>.`, {
          code: 6070
        });
      }

      let innerItems = items.items;
      if (innerItems.find(x => !(typeof x === "string" || x instanceof String))) {
        throw new ModelError(`If a repeat count is a vector, it must consist of all strings. Got, <i>${items}</i>.`, {
          code: 6071
        });
      }

      if (new Set(innerItems).size !== innerItems.length) {
        throw new ModelError(`If a repeat count is a vector, it must contain unique strings. Got, <i>${items}</i>.`, {
          code: 6072
        });
      }

      count = items.items.length;
    } else if (items instanceof Material) {
      if (items.units && !items.units.isUnitless()) {
        throw new ModelError(`Repeat count must be unitless. Got, <i>${items}</i>.`, {
          code: 6073
        });
      }
    } else {
      throw new ModelError(`Repeat count must be a Number or Vector. Got, <i>${items}</i>.`, {
        code: 6074
      });
    }

    let res = [];
    let scope = { x: null, "-parent": x[1].scope, key: null };
    for (let i = 0; i < count; i++) {
      if (items instanceof Vector) {
        scope.key = items.items[i];
      }
      scope.x = new Material(i + 1);
      res.push(evaluateNode(x[0].node, scope, simulate));
    }

    return new Vector(res, simulate, items instanceof Vector ? items.items.slice() : undefined);
  };
  simulate.varBank["repeat"].delayEvalParams = true;

  defineFunction(simulate, "Select", { params: [{ name: "Haystack", needVector: true, noUnits: true }, { name: "Indexes", noUnits: true }] }, (x) => {
    if (x[1] instanceof Vector) {
      let v = toNum(x[1]);
      let isBoolean = true;
      for (let i = 0; i < v.length(); i++) {
        if (v.items[i] instanceof Material) {
          isBoolean = false;
          break;
        }
      }
      if (isBoolean === true) {
        let res = [];
        let names = x[0].names ? [] : undefined;
        if (v.length() !== x[0].length()) {
          throw new ModelError("Length of vector must be equal for boolean selection.", {
            code: 6014
          });
        }
        for (let i = 0; i < v.length(); i++) {
          if (trueValue(v.items[i])) {
            res.push(x[0].items[i]);

            if (x[0].names) {
              names.push(x[0].names[i]);
            }
          }
        }
        return new Vector(res, simulate, names);
      } else {
        let res = [];
        let names = x[0].names ? [] : undefined;
        for (let i = 0; i < v.length(); i++) {
          let q = v.items[i].value;
          if (q <= 0 || q > x[0].length()) {
            throw new ModelError("Selected element out of range.", {
              code: 6015
            });
          }
          res.push(x[0].items[q - 1]);

          if (x[0].names) {
            names.push(x[0].names[q - 1]);
          }
        }
        return new Vector(res, simulate, names);
      }
    } else {
      if (x[1].value > 0 && x[1].value <= x[0].length()) {
        return x[0].items[x[1].value - 1];
      } else {
        throw new ModelError("Selected element out of range.", {
          code: 6016
        });
      }
    }
  });

  defineFunction(simulate, "Reverse", {
    allowEmpty: true, params: { name: "Items..." }, prep: function (x) {
      return simulate.varBank["join"](x);
    }
  }, (x) => {
    return new Vector(x.items.slice().reverse(), simulate, x.names ? x.names.slice().reverse() : undefined);
  });
  defineFunction(simulate, "Reverse", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["reverse"](x);
  });

  defineFunction(simulate, "Sort", {
    allowEmpty: true, params: { name: "Items..." }, prep: function (x) {
      return toNum(simulate.varBank["join"](x));
    }
  },
  /**
     * @param {Vector} x
     * @returns
     */
  (x) => {
    let res = x.stackApply((x) => {
      let items = [];
      for (let i = 0; i < x.items.length; i++) {
        items.push({ item: x.items[i], name: x.names ? x.names[i] : undefined });
      }

      let res = items.sort((a, b) => {
        if (lessThan(a.item, b.item)) {
          return -1;
        }
        if (greaterThan(a.item, b.item)) {
          return 1;
        }
        return 0;
      });


      let names = x.names ? [] : undefined;
      items = [];

      for (let i = 0; i < res.length; i++) {
        items.push(res[i].item);
        if (names) {
          names.push(res[i].name);
        }
      }

      return new Vector(items, simulate, names);
    });

    return res;
  });
  defineFunction(simulate, "Sort", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["sort"](x);
  });

  defineFunction(simulate, "Unique", {
    allowEmpty: true, params: { name: "Items....", allowBoolean: true }, prep: function (x) {
      return toNum(simulate.varBank["join"](x));
    }
  }, (x) => {
    if (!x.items.length) {
      return new Vector([], simulate);
    }

    let res = [];
    let names = x.names ? [] : undefined;

    for (let i = 0; i < x.items.length; i++) {
      let found = false;

      for (let j = 0; j < res.length; j++) {
        if (strictEquals(x.items[i], res[j])) {
          found = true;
          break;
        }
      }
      if (!found) {
        res.push(x.items[i]);
        if (names) {
          names.push(x.names[i]);
        }
      }
    }

    return new Vector(res, simulate, names);
  });
  defineFunction(simulate, "Unique", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["unique"](x);
  });


  defineFunction(simulate, "Union", { object: [simulate.varBank, VectorObject], params: [{ name: "Vector 1", needVector: true }, { name: "Vector 2", needVector: true }] }, (x) => {
    return simulate.varBank["unique"](simulate.varBank["join"](x).items);
  });

  defineFunction(simulate, "Intersection", { object: [simulate.varBank, VectorObject], params: [{ name: "Vector 1", needVector: true }, { name: "Vector 2", needVector: true }] }, (x) => {
    let v1 = x[0];
    let v2 = x[1];

    let res = [];

    for (let i = 0; i < v1.items.length; i++) {
      for (let j = 0; j < v2.items.length; j++) {
        if (strictEquals(v1.items[i], v2.items[j])) {
          res.push(v1.items[i]);
          break;
        }
      }
    }
    return simulate.varBank["unique"](res);
  });


  defineFunction(simulate, "Difference", { object: [simulate.varBank, VectorObject], params: [{ name: "Vector 1", needVector: true }, { name: "Vector 2", needVector: true }] }, (x) => {
    let v1 = x[0];
    let v2 = x[1];

    let res = [];

    for (let i = 0; i < v1.items.length; i++) {
      let found = false;
      for (let j = 0; j < v2.items.length; j++) {
        if (strictEquals(v1.items[i], v2.items[j])) {
          found = true;
          break;
        }
      }
      if (!found) {
        res.push(v1.items[i]);
      }
    }
    for (let i = 0; i < v2.items.length; i++) {
      let found = false;
      for (let j = 0; j < v1.items.length; j++) {
        if (strictEquals(v2.items[i], v1.items[j])) {
          found = true;
          break;
        }
      }
      if (!found) {
        res.push(v2.items[i]);
      }
    }

    return simulate.varBank["unique"](res);
  });

  defineFunction(simulate, "Factorial", { params: [{ name: "Number", noUnits: true, leafNeedNum: true }], recurse: true }, (x) => {
    return new Material(factorial(toNum(x[0]).value));
  });

  defineFunction(simulate, "Max", { params: { name: "Items..." }, prep: joinVector }, (x) => {

    let res = x.stackApply((v) => {
      let x = v.items;
      if (x.length > 0) {
        let max = x[0];
        for (let i = 1; i < x.length; i++) {
          if (greaterThan(x[i], max)) {
            max = x[i];
          }
        }
        return max;
      } else {
        throw new ModelError("You must have at least one element to calculate a max.", {
          code: 6017
        });
      }
    });

    return res;
  });
  defineFunction(simulate, "Max", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["max"](x);
  });

  function joinVector(x, notToNum, skip) {
    if (!notToNum) {
      for (let i = 0; i < x.length; i++) {
        x[i] = toNum(x[i]);
      }
    }
    if (x.length === 1 && x[0] instanceof Vector) {
      if (skip) {
        return x[0];
      } else {
        return simulate.varBank["flatten"]([x[0]]);
      }
    } else {
      return new Vector(scalarsToVectors(x), simulate);
    }
  }
  function joinArray(x) {
    for (let i = 0; i < x.length; i++) {
      if (x[i].toNum) {
        x[i] = toNum(x[i]);
      }
    }
    if (x.length === 1 && x[0] instanceof Vector) {
      return simulate.varBank["flatten"]([toNum(x[0])]).items;
    }
    return joinVector(x, undefined, true).items;
  }
  function scalarsToVectors(x) {
    let needVector = false;
    let vec;

    for (let i = 0; i < x.length; i++) {
      if (x[i] instanceof Vector) {
        vec = x[i];
        needVector = true;
        break;
      }
    }

    if (needVector) {
      for (let i = 0; i < x.length; i++) {
        if (!(x[i] instanceof Vector)) {
          x[i] = replicateVectorStructure(vec, x[i]);
        }
      }
    }

    return x;
  }
  function replicateVectorStructure(vec, val) {
    let v = vec.fullClone();
    for (let i = 0; i < v.items.length; i++) {
      if (v.items[i] instanceof Vector) {
        v.items[i] = replicateVectorStructure(v.items[i], val);
      } else {
        v.items[i] = val;
      }
    }
    return v;
  }

  defineFunction(simulate, "Lookup", { params: [{ name: "Value", noVector: true }, { name: "Value Vector", needVector: true }, { name: "Results Vector", needVector: true }] }, (x) => {
    let v = toNum(x[0]);
    let xVec = toNum(x[1]);
    let yVec = toNum(x[2]);

    if (xVec.items.length !== yVec.items.length) {
      throw new ModelError("The <i>value</i> and <i>results</i> vectors must be the same length", {
        code: 6018
      });
    }

    if (xVec.items.length < 1) {
      throw new ModelError("You must have at least one element in your vectors", {
        code: 6019
      });
    }

    let vec = [];
    for (let i = 0; i < xVec.items.length; i++) {
      vec.push({ x: xVec.items[i], y: yVec.items[i] });
    }

    vec.sort((a, b) => {
      if (greaterThan(a.x, b.x)) {
        return 1;
      } else if (lessThan(a.x, b.x)) {
        return -1;
      } else {
        return 0;
      }
    });

    for (let i = 0; i < vec.length; i++) {
      if (eq(vec[i].x, v)) {
        return vec[i].y.fullClone();
      } else if (greaterThan(vec[i].x, v)) {
        if (i === 0) {
          return vec[i].y.fullClone();
        }

        let dist = minus(vec[i].x, vec[i - 1].x);
        let distLower = minus(v, vec[i - 1].x);
        let distUpper = minus(vec[i].x, v);
        let fLower = div(distUpper, dist);
        let fUpper = div(distLower, dist);
        return plus(mult(vec[i - 1].y, fLower), mult(vec[i].y, fUpper));
      }
    }

    return vec[vec.length - 1].y.fullClone();
  });

  defineFunction(simulate, "Fill", { object: [simulate.varBank, VectorObject], params: [{ name: "Vector", needVector: true }, { name: "Value", allowBoolean: true }] }, (x) => {
    return replicateVectorStructure(x[0], x[1]);
  });

  defineFunction(simulate, "Min", { params: { name: "Items..." }, prep: joinVector },
    /**
     * @param {Vector} x
     * @returns
     */
    (x) => {
      let res = x.stackApply((v) => {
        let x = v.items;
        if (x.length > 0) {
          let min = x[0];
          for (let i = 1; i < x.length; i++) {
            if (lessThan(x[i], min)) {
              min = x[i];
            }
          }
          return min;

        } else {
          throw new ModelError("You must have at least one element to calculate a min.", {
            code: 6020
          });
        }
      });

      return res;
    });
  defineFunction(simulate, "Min", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["min"](x);
  });
  defineFunction(simulate, "Mean", { params: { name: "Items..." }, prep: joinArray },
    /**
     * @param {any[]} x
     * @returns
     */
    (x) => {
      let sum = x[0];
      for (let i = 1; i < x.length; i++) {
        sum = plus(sum, x[i]);
      }
      return div(sum, new Material(x.length));
    });
  defineFunction(simulate, "Mean", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["mean"](x);
  });
  defineFunction(simulate, "Sum", { params: { name: "Items..." }, prep: joinArray },
    /**
     * @param {any[]} x
     * @returns
     */
    (x) => {
      let sum = x[0];

      for (let i = 1; i < x.length; i++) {
        sum = plus(sum, x[i]);
      }

      return sum;
    });
  defineFunction(simulate, "Sum", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["sum"](x);
  });
  defineFunction(simulate, "Product", { params: { name: "Items..." }, prep: joinArray }, (x) => {
    let total = x[0];
    for (let i = 1; i < x.length; i++) {
      total = mult(total, x[i]);
    }
    return total;
  });
  defineFunction(simulate, "Product", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["product"](x);
  });
  defineFunction(simulate, "Median", { params: { name: "Items..." }, prep: joinVector }, (x) => {
    let res = x.stackApply((v) => {
      /** @type {Material[]} */
      let x = simulate.varBank["sort"]([v]).items;
      if (x.length > 0) {
        if (Math.floor((x.length - 1) / 2) === (x.length - 1) / 2) {
          return x[(x.length - 1) / 2];
        } else {
          return div(plus(x[Math.floor((x.length - 1) / 2)], x[Math.ceil((x.length - 1) / 2)]), new Material(2));
        }
      } else {
        throw new ModelError("You must have at least one element to calculate a median.", {
          code: 6021
        });
      }
    });
    return res;
  });
  defineFunction(simulate, "Median", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["median"](x);
  });
  defineFunction(simulate, "StdDev", { params: { name: "Items..." }, prep: joinVector }, (x) => {
    let res = x.stackApply((v) => {
      let x = v.items;
      if (x.length > 1) {

        let mean = simulate.varBank["mean"](x);
        let sum = power(minus(x[0], mean), new Material(2));

        for (let i = 1; i < x.length; i++) {
          sum = plus(sum, power(minus(x[i], mean), new Material(2)));
        }
        let r = power(div(sum, new Material(x.length - 1)), new Material(0.5));

        return r;
      } else {
        throw new ModelError("You must have at least two elements to calculate the standard deviation.", {
          code: 6022
        });
      }
    });
    return res;
  });
  defineFunction(simulate, "StdDev", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["stddev"](x);
  });
  defineFunction(simulate, "Correlation", { params: [{ name: "Vector 1", needVector: true }, { name: "Vector 2", needVector: true }] }, (x) => {
    let v1 = toNum(x[0]);
    let v2 = toNum(x[1]);

    if (v1.length() <= 1) {
      throw new ModelError("You must have at least two elements in your vectors to calculate their correlation.", {
        code: 6023
      });
    }
    if (v1.length() !== v2.length()) {
      throw new ModelError("The vectors for Correlation() must be of the same size.", {
        code: 6024
      });
    }


    let v1Mean = simulate.varBank["mean"]([v1]);
    let v2Mean = simulate.varBank["mean"]([v2]);

    let v1StdDev = simulate.varBank["stddev"]([v1]);
    let v2StdDev = simulate.varBank["stddev"]([v2]);

    if (v1StdDev.value === 0 || v2StdDev.value === 0) {
      return new Material(0);
    }

    return div(simulate.varBank["sum"]([mult(minus(v1.clone(), v1Mean), minus(v2.clone(), v2Mean))]), mult(minus(simulate.varBank["count"]([v1]), new Material(1)), mult(v1StdDev, v2StdDev)));
  });
  simulate.varBank["count"] = function (x) {
    x = simulate.varBank["join"](x).items;
    return new Material(x.length);
  };
  simulate.varBank["flatten"] = function (x) {
    let res = flatten(simulate.varBank["join"](x));
    return new Vector(res.items, simulate, res.hasName ? res.names : undefined);
  };

  defineFunction(simulate, "Keys", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    if (!x[0].names) {
      return new Vector([], simulate);
    }
    return new Vector(x[0].names.filter(x => x !== undefined).map(x => stringify(x, simulate)), simulate);
  });
  defineFunction(simulate, "Values", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return new Vector(x[0].items, simulate);
  });
  defineFunction(simulate, "Length", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return new Material(x[0].items.length);
  });
  defineFunction(simulate, "Count", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return new Material(x[0].items.length);
  });
  defineFunction(simulate, "Flatten", { object: VectorObject, params: [{ name: "Vector", needVector: true }] }, (x) => {
    return simulate.varBank["flatten"](x);
  });

  function flatten(x) {
    let res = [];
    let names = [];
    let hasName = undefined;

    for (let i = 0; i < x.length(); i++) {
      if (x.items[i] instanceof Vector) {
        let z = flatten(x.items[i]);
        res = res.concat(z.items);
        names = names.concat(z.names);
        hasName = hasName || z.hasName;
      } else {
        res.push(x.items[i]);
        if (x.names) {
          names.push(x.names[i]);
          hasName = true;
        } else {
          names.push(undefined);
        }
      }
    }
    return { items: res, names: names, hasName: hasName };
  }


  /* Statistics */

  defineFunction(simulate, "CDFNormal", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let mu = x[1] ? toNum(x[1]).value : 0;
    let sd = x[2] ? toNum(x[2]).value : 1;

    return new Material(jStat.normal.cdf(val, mu, sd));
  });

  defineFunction(simulate, "PDFNormal", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let mu = x[1] ? toNum(x[1]).value : 0;
    let sd = x[2] ? toNum(x[2]).value : 1;

    return new Material(jStat.normal.pdf(val, mu, sd));
  });

  defineFunction(simulate, "InvNormal", { params: [{ name: "p", noUnits: true, noVector: true }, { name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0 || val > 1) {
      throw new ModelError("<i>p</i> is a probability and must be between 0 and 1 inclusive.", {
        code: 6025
      });
    }
    let mu = x[1] ? toNum(x[1]).value : 0;
    let sd = x[2] ? toNum(x[2]).value : 1;

    return new Material(jStat.normal.inv(val, mu, sd));
  });

  defineFunction(simulate, "CDFLogNormal", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let mu = x[1] ? toNum(x[1]).value : 0;
    let sd = x[2] ? toNum(x[2]).value : 1;

    return new Material(jStat.lognormal.cdf(val, mu, sd));
  });

  defineFunction(simulate, "PDFLogNormal", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let mu = x[1] ? toNum(x[1]).value : 0;
    let sd = x[2] ? toNum(x[2]).value : 1;

    return new Material(jStat.lognormal.pdf(val, mu, sd));
  });

  defineFunction(simulate, "InvLogNormal", { params: [{ name: "p", noUnits: true, noVector: true }, { name: "Mean", defaultVal: 0, noUnits: true, noVector: true }, { name: "Standard Deviation", defaultVal: 1, noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0 || val > 1) {
      throw new ModelError("<i>p</i> is a probability and must be between 0 and 1 inclusive.", {
        code: 6026
      });
    }
    let mu = x[1] ? toNum(x[1]).value : 0;
    let sd = x[2] ? toNum(x[2]).value : 1;

    return new Material(jStat.lognormal.inv(val, mu, sd));
  });

  defineFunction(simulate, "CDFt", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Degrees of Freedom", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let dof = toNum(x[1]).value;
    if (dof <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6027
      });
    }

    return new Material(jStat.studentt.cdf(val, dof));
  });

  defineFunction(simulate, "PDFt", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Degrees of Freedom", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let dof = toNum(x[1]).value;
    if (dof <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6028
      });
    }

    return new Material(jStat.studentt.pdf(val, dof));
  });

  defineFunction(simulate, "Invt", { params: [{ name: "p", noUnits: true, noVector: true }, { name: "Degrees of Freedom", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0 || val > 1) {
      throw new ModelError("<i>p</i> is a probability and must be between 0 and 1 inclusive.", {
        code: 6029
      });
    }
    let dof = toNum(x[1]).value;
    if (dof <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6030
      });
    }

    return new Material(jStat.studentt.inv(val, dof));
  });

  defineFunction(simulate, "CDFF", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Degrees of Freedom 1", noUnits: true, noVector: true }, { name: "Degrees of Freedom 2", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let dof1 = toNum(x[1]).value;
    if (dof1 <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6031
      });
    }
    let dof2 = toNum(x[2]).value;
    if (dof2 <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6032
      });
    }

    return new Material(jStat.centralF.cdf(val, dof1, dof2));
  });

  defineFunction(simulate, "PDFF", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Degrees of Freedom 1", noUnits: true, noVector: true }, { name: "Degrees of Freedom 2", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let dof1 = toNum(x[1]).value;
    if (dof1 <= 0) {
      throw new ModelError("<i>Degrees of Freedom 1</i> must be greater than 0.", {
        code: 6033
      });
    }
    let dof2 = toNum(x[2]).value;
    if (dof2 <= 0) {
      throw new ModelError("<i>Degrees of Freedom 2</i> must be greater than 0.", {
        code: 6034
      });
    }

    return new Material(jStat.centralF.pdf(val, dof1, dof2));
  });

  defineFunction(simulate, "InvF", { params: [{ name: "p", noUnits: true, noVector: true }, { name: "Degrees of Freedom 1", noUnits: true, noVector: true }, { name: "Degrees of Freedom 2", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0 || val > 1) {
      throw new ModelError("<i>p</i> is a probability and must be between 0 and 1 inclusive.", {
        code: 6035
      });
    }
    let dof1 = toNum(x[1]).value;
    if (dof1 <= 0) {
      throw new ModelError("<i>Degrees of Freedom 1</i> must be greater than 0.", {
        code: 6036
      });
    }
    let dof2 = toNum(x[2]).value;
    if (dof2 <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6037
      });
    }

    return new Material(jStat.centralF.inv(val, dof1, dof2));
  });

  defineFunction(simulate, "CDFChiSquared", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Degrees of Freedom", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let dof = toNum(x[1]).value;
    if (dof <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6038
      });
    }

    return new Material(jStat.chisquare.cdf(val, dof));
  });

  defineFunction(simulate, "PDFChiSquared", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Degrees of Freedom", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let dof = toNum(x[1]).value;
    if (dof <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6039
      });
    }

    return new Material(jStat.chisquare.pdf(val, dof));
  });

  defineFunction(simulate, "InvChiSquared", { params: [{ name: "p", noUnits: true, noVector: true }, { name: "Degrees of Freedom", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0 || val > 1) {
      throw new ModelError("<i>p</i> is a probability and must be between 0 and 1 inclusive.", {
        code: 6040
      });
    }
    let dof = toNum(x[1]).value;
    if (dof <= 0) {
      throw new ModelError("<i>Degrees of Freedom</i> must be greater than 0.", {
        code: 6041
      });
    }

    return new Material(jStat.chisquare.inv(val, dof));
  });


  defineFunction(simulate, "CDFExponential", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Rate", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let rate = toNum(x[1]).value;
    if (rate <= 0) {
      throw new ModelError("<i>Rate</i> must be greater than 0.", {
        code: 6042
      });
    }

    return new Material(jStat.exponential.cdf(val, rate));
  });

  defineFunction(simulate, "PDFExponential", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Rate", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let rate = toNum(x[1]).value;
    if (rate <= 0) {
      throw new ModelError("<i>Rate</i> must be greater than 0.", {
        code: 6043
      });
    }

    return new Material(jStat.exponential.pdf(val, rate));
  });

  defineFunction(simulate, "InvExponential", { params: [{ name: "p", noUnits: true, noVector: true }, { name: "DRate", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    if (val < 0 || val > 1) {
      throw new ModelError("<i>p</i> is a probability and must be between 0 and 1 inclusive.", {
        code: 6044
      });
    }
    let rate = toNum(x[1]).value;
    if (rate <= 0) {
      throw new ModelError("<i>Rate</i> must be greater than 0.", {
        code: 6045
      });
    }

    return new Material(jStat.exponential.inv(val, rate));
  });

  defineFunction(simulate, "CDFPoisson", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Lambda", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let Lambda = toNum(x[1]).value;
    if (Lambda <= 0) {
      throw new ModelError("<i>Lambda</i> must be greater than 0.", {
        code: 6046
      });
    }

    return new Material(jStat.poisson.cdf(val, Lambda));
  });

  defineFunction(simulate, "PMFPoisson", { params: [{ name: "x", noUnits: true, noVector: true }, { name: "Lambda", noUnits: true, noVector: true }] }, (x) => {
    let val = toNum(x[0]).value;
    let Lambda = toNum(x[1]).value;
    if (Lambda <= 0) {
      throw new ModelError("<i>Rate</i> must be greater than 0.", {
        code: 6047
      });
    }

    return new Material(jStat.poisson.pdf(val, Lambda));
  });



  /* End Statistics */



  defineFunction(simulate, "SetRandSeed", { params: [{ name: "Seed Number", noUnits: true, noVector: true }] }, (x) => {
    simulate.random = new SeedRandom.seedrandom(toNum(x[0]).value);
    return stringify("Random Seed Set", simulate);
  });

  defineFunction(simulate, "Alert", { params: [{ name: "Message", allowString: true, allowBoolean: true }] }, (x) => {
    if (typeof alert === "undefined") {
      throw new ModelError("Alert() is not implemented on this platform.", {
        code: 6048
      });
    }

    alert(x[0]);
    return new Material(1);
  });

  defineFunction(simulate, "Console", { params: [{ name: "Message", allowString: true, allowBoolean: true }] }, (x) => {
    console.log(x[0]);
    return new Material(1);
  });

  defineFunction(simulate, "Prompt", { params: [{ name: "Message", allowString: true, allowBoolean: true }, { name: "Default", defaultVal: "", allowString: true, allowBoolean: true }] }, (x) => {
    if (typeof prompt === "undefined") {
      throw new ModelError("Prompt() is not implemented on this platform.", {
        code: 6049
      });
    }

    let y = x[1];

    if (y instanceof Material && !y.units) {
      y = y.value;
    }

    x = prompt(x[0], y);

    if (parseFloat(x).toString() === x) {
      return new Material(parseFloat(x));
    } else if (x === null) {
      return new Material(0);
    } else {
      return stringify(x, simulate);
    }
  });

  defineFunction(simulate, "Confirm", { params: [{ name: "Message", allowString: true, allowBoolean: true }] }, (x) => {
    if (typeof window === "undefined" || (typeof window.confirm === "undefined")) {
      throw new ModelError("Confirm() is not implemented on this platform.", {
        code: 6050
      });
    }

    return window.confirm(x[0]);
  });

  defineFunction(simulate, "Parse", { object: StringObject, params: [{ name: "String", allowString: true }] }, (x) => {
    return new Material(parseFloat(x[0]));
  });

  defineFunction(simulate, "Split", { object: StringObject, params: [{ name: "String", needString: true }, { name: "Splitter", needString: true }] }, (x) => {
    return stringify(new Vector(x[0].split(x[1]), simulate), simulate);
  });

  defineFunction(simulate, "Join", { object: VectorObject, params: [{ name: "String", needVector: true }, { name: "Joiner", needString: true }] }, (x) => {
    return stringify(x[0].items.join(x[1]), simulate);
  });

  defineFunction(simulate, "Trim", { object: StringObject, params: [{ name: "String", needString: true }], recurse: true }, (x) => {
    return stringify(x[0].trim(), simulate);
  });

  defineFunction(simulate, "Range", { object: StringObject, params: [{ name: "String", needString: true }, { name: "Indexes", noUnits: true, allowVector: true }] }, (x) => {
    if (x[1] instanceof Vector) {
      let res = "";
      for (let i = 0; i < x[1].items.length; i++) {
        res += x[0].charAt(toNum(x[1].items[i]).value - 1);
      }
      return stringify(res, simulate);
    } else {
      return stringify(x[0].charAt(toNum(x[1]).value - 1), simulate);
    }
  });

  defineFunction(simulate, "Length", { object: StringObject, params: [{ name: "String", needString: true }] }, (x) => {
    return new Material(x[0].length);
  });

  defineFunction(simulate, "IndexOf", { object: StringObject, params: [{ name: "Haystack", needString: true }, { name: "Needle", needString: true }] }, (x) => {
    return new Material(x[0].indexOf(x[1]) + 1);
  });

  defineFunction(simulate, "Contains", { object: StringObject, params: [{ name: "Haystack", needString: true }, { name: "Needle", needString: true }] }, (x) => {
    return !eq(StringObject["indexof"](x), new Material(0));
  });

  defineFunction(simulate, "Lowercase", { object: StringObject, params: [{ name: "String", needString: true }] }, (x) => {
    return stringify(x[0].toLowerCase(), simulate);
  });

  defineFunction(simulate, "Uppercase", { object: StringObject, params: [{ name: "String", needString: true }] }, (x) => {
    return stringify(x[0].toUpperCase(), simulate);
  });

  simulate.varBank["stringbase"] = makeObjectBase(StringObject, simulate);
  simulate.varBank["vectorbase"] = makeObjectBase(VectorObject, simulate);
}


/**
 * @param {*} x
 * @param {import("../Simulator").Simulator} simulate
 *
 * @returns
 */
export function makeObjectBase(x, simulate) {
  let names = Object.keys(x);
  let items = [];
  for (let name of names) {
    items.push(objectizeFunction(x[name]));
  }
  let vec = new Vector(items, simulate, names);
  vec.parent = undefined;
  return vec;
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {string} name
 * @param {any} definition
 * @param {function} fn
 */
export function defineFunction(simulate, name, definition, fn) {
  let configs = definition.params;
  let arr = Array.isArray(configs);

  let vectorized = [];

  let requiredLength = configs.length;
  for (let i = 0; i < configs.length; i++) {
    if ("defaultVal" in configs[i]) {
      requiredLength = i;
      break;
    }
  }

  for (let i = 0; i < configs.length; i++) {
    if (configs[i].vectorize) {
      vectorized.push(i);
      if (configs[i].noVector) {
        throw new ModelError(`Cannot have a non-vector vectorized parameter. Function '${name}', parameter '${configs[i].name}'.`, {
          code: 6051
        });
      }
    }
  }



  let standardFnName;
  let objectFnName;

  if (arr) {
    standardFnName = name + "(" + configs.map((x) => {
      return x.name + ("defaultVal" in x ? "=" + x.defaultVal.toString() : "");
    }).join(", ") + ")";
    objectFnName = name + "(" + configs.slice(1).map((x) => {
      return x.name + ("defaultVal" in x ? "=" + x.defaultVal.toString() : "");
    }).join(", ") + ")";
  } else {
    standardFnName = name + "(items...)";
    objectFnName = name + "(items...)";
  }

  let f = function (x, id, _ls, config = {}) {
    let fnName;
    if (config.isObjectCaller) {
      // e.g. [test].x()
      fnName = objectFnName;
    } else {
      // e.g. x([test])
      fnName = standardFnName;
    }

    if (definition.prep) {
      x = definition.prep(x);
    }

    if (arr && (x.length > configs.length || x.length < requiredLength)) {
      throw new ModelError(`Wrong number of parameters for ${fnName}.`, {
        code: 6052
      });
    } else if (!arr && !x.length && !definition.allowEmpty) {
      throw new ModelError(`At least one parameter required for ${name}().`, {
        code: 6053
      });
    }

    for (let i = 0; i < x.length; i++) {
      let config = arr ? configs[i] : configs;

      if (config.noUnits && (toNum(x[i]) instanceof Material) && toNum(x[i]).units && !toNum(x[i]).units.isUnitless()) {
        throw new ModelError(`${fnName} does not accept units for the parameter '${config.name}'.`, {
          code: 6054
        });
      }
      if (config.noVector && x[i] instanceof Vector) {
        throw new ModelError(`${fnName} does not accept vectors for the parameter '${config.name}'.`, {
          code: 6055
        });
      }
      if (config.vectorize && x[i] instanceof Vector && !x[i].names) {
        throw new ModelError(`${fnName} does not accepted non-named vectors for the parameter '${config.name}'.`, {
          code: 6056
        });
      }
      if (config.needVector) {
        if (x[i] instanceof SPrimitive) {
          x[i] = toNum(x[i]);
        }
        if (!(x[i] instanceof Vector)) {
          throw new ModelError(`${fnName} requires a vector for the parameter '${config.name}'.`, {
            code: 6057
          });
        }
      }
      if (config.needNum) {
        if (x[i] instanceof SPrimitive) {
          x[i] = toNum(x[i]);
        }
        if (!(x[i] instanceof Material)) {
          throw new ModelError(`${fnName} requires a number for the parameter '${config.name}'.`, {
            code: 6058
          });
        }
      }
      if (config.needPrimitive && !(x[i] instanceof SPrimitive)) {
        throw new ModelError(`${fnName} requires a primitive for the parameter '${config.name}'.`, {
          code: 6059
        });
      }
      if (!config.allowBoolean && typeof x[i] === "boolean") {
        throw new ModelError(`${fnName} does not accept boolean values for the parameter '${config.name}'.`, {
          code: 6060
        });
      }
      if (config.needAgent && !(x[i] instanceof SAgent)) {
        x[i] = agent(x[i], simulate);
      }
      if (config.needString) {
        if (!(typeof x[i] === "string" || x[i] instanceof String)) {
          throw new ModelError(`${fnName} requires a string for the parameter '${config.name}'.`, {
            code: 6061
          });
        }
      }
      if (!config.allowString && !config.needString
        && (typeof x[i] === "string" || x[i] instanceof String)) {
        throw new ModelError(`${fnName} does not accept string values for the parameter '${config.name}'.`, {
          code: 6062
        });
      }
      if (config.needAgents && !(x[i] instanceof SPopulation)) {
        x[i] = agents(x[i]);
      }
      if (config.needPopulation && !(x[i] instanceof Vector)) {
        x[i] = getPopulation(x[i], simulate);
      }
      if (config.needFunction && !(x[i] instanceof Function || x[i] instanceof UserFunction)) {
        throw new ModelError(`${fnName} requires a function for the parameter '${config.name}'.`, {
          code: 6063
        });
      }
    }
    let q;
    if (definition.recurse) {
      q = toNum(x[0]);
      if (configs[0] && configs[0].leafNeedNum) {
        if (!(q instanceof Vector)) {
          if (!(q instanceof Material)) {
            throw new ModelError(`${fnName} requires a number for the parameter '${configs[0].name}'.`, {
              code: 6058
            });
          }
        }
      }
    }
    if (definition.recurse && q instanceof Vector) {
      return q.cloneApply((z) => {
        if (!(z instanceof Vector) && configs[0] && configs[0].leafNeedNum) {
          if (!(z instanceof Material)) {
            throw new ModelError(`${fnName} requires a number for the parameter '${configs[0].name}'.`, {
              code: 6058
            });
          }
        }
        return f([z].concat(x.slice(1)), id);
      });
    } else if (vectorized.length > 0) {
      // Auto-vectorize the inner function


      let base = undefined, baseI = -1;
      for (let i = 0; i < vectorized.length; i++) {
        if (x[vectorized[i]]) {
          let v = toNum(x[vectorized[i]]);
          if (v instanceof Vector && v.namesLC) {
            if (!base) {
              base = v;
              baseI = vectorized[i];
            } else {
              if (!base.keysMatch(v.namesLC)) {
                throw new ModelError(`Vector keys do not match between parameters '${configs[baseI].name}' and '${configs[vectorized[i]].name}' in ${fnName}.`, {
                  code: 6064
                });
              }
            }
          }
        }
      }

      if (!base) {
        // Nothing is vectorized, we can behave normally
        return fn(x, id);
      } else {
        // We need to vectorize
        let keys = base.namesLC;
        let res = [];
        for (let i = 0; i < keys.length; i++) {
          let newX = [];
          for (let j = 0; j < x.length; j++) {
            if (vectorized.indexOf(j) === -1) {
              newX.push(x[j]);
            } else {
              let v = toNum(x[j]);
              if (v instanceof Vector && v.namesLC) {
                newX.push(v.select([keys[i]]));
              } else {
                newX.push(v);
              }

            }
          }
          let z = fn(newX, id);
          if (z instanceof Vector) {
            if (!base.keysMatch(z.namesLC)) {
              throw new ModelError(`Vector keys do not match between parameter '${configs[baseI].name}' and calculation result.`, {
                code: 6065
              });
            }

            res.push(z.select([keys[i]]));
          } else {
            res.push(z);
          }
        }
        return new Vector(res, simulate, keys);
      }


    } else {
      return fn(x, id);
    }
  };

  if (!definition.object) {
    simulate.varBank[name.toLowerCase()] = f;
  } else {
    if (definition.object instanceof Array) {
      for (let i = 0; i < definition.object.length; i++) {
        definition.object[i][name.toLowerCase()] = f;
      }
    } else {
      definition.object[name.toLowerCase()] = f;
    }
  }

  if (definition.recurse) {
    VectorObject[name.toLowerCase()] = f;
  }
}


function objectizeFunction(fn) {
  let f = function (x, fingerprint, lastSelf) {
    if (!lastSelf) {
      throw new ModelError("Object function not used on object", {
        code: 6066
      });
    }
    return fn([lastSelf].concat(x), fingerprint, lastSelf, {
      isObjectCaller: true
    });
  };
  f.delayEvalParams = fn.delayEvalParams;
  return f;
}


/**
 * @param {number} x
 * @returns {number}
 */
function factorial(x) {
  if (Math.round(x) !== x) {
    throw new ModelError("The factorial() function only accepts integers.", {
      code: 6067
    });
  } else if (x < 0) {
    throw new ModelError("The factorial() function is only defined for integers 0 or larger.", {
      code: 6068
    });
  }
  if (x > 1) {
    return x * factorial(x - 1);
  } else {
    return 1;
  }
}


export function testArgumentsSize(x, name, min, max) {
  if (x.length < min || x.length > max) {
    throw new ModelError(`Wrong number of parameters for ${name}().`, {
      code: 6069
    });
  }
}
