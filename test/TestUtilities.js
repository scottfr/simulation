import { Model } from "../src/api/Model.js";


export let testConfig = {
  globals: ""
};


export function setupComplexExample() {
  let m = new Model();

  let c = m.Converter({
    name: "My Converter"
  });

  let x = m.Stock({
    name: "x"
  });

  m.Stock({
    name: "y"
  });

  m.Stock({
    name: "y"
  });

  let ms = m.Stock({
    name: "My Stock"
  });

  m.Variable({
    name: "a"
  });

  let b = m.Variable({
    name: "b"
  });

  m.Link(x, b);

  m.Link(x, c);

  m.Flow(x, ms, {
    name: "My Flow"
  });

  return m;
}


/**
 * @param {string} eqn
 * @param {any} out
 * @param {number=} decimals
 */
export function check(eqn, out, decimals = null) {
  let m = new Model();

  m.timeLength = 2;

  m.globals = testConfig.globals;

  let variable = m.Variable();

  variable.value = eqn;

  let res = m.simulate();
  let x = res.value(variable);
  if (typeof x === "number") {
    if (decimals !== null) {
      x = +x.toFixed(decimals);
    }
  }
  expect(x).toStrictEqual(out);
}


/**
 * @param {string} eqn
 * @param {string=} errorMsg
 */
export function failure(eqn, errorMsg = null) {
  let m = new Model();

  m.timeLength = 2;

  m.globals = testConfig.globals;


  let variable = m.Variable();

  variable.value = eqn;

  if (errorMsg) {
    expect(() => m.simulate()).toThrow(errorMsg);
  } else {
    expect(() => m.simulate()).toThrow();
  }
}



/**
 * Checks simulation equality including agent locations and states for equality.
 *
 * @param {import("../src/Simulator").ResultsType} a
 * @param {import("../src/Simulator").ResultsType} b
 */
export function areResultsDifferent(a, b) {
  if (a === null && b === null) {
    return false;
  }

  if (a.errorCode !== b.errorCode) {
    return `Different error code: ${a.errorCode} "${a.error ? a.error.slice(0, 60) : a.error}..." ${b.errorCode} "${b.error ? b.error.slice(0, 60) : b.error}..."`;
  }

  if (a.error !== b.error) {
    // generally skip this test
    // return `Different error text: "${a.error ? a.error.slice(0, 60) : a.error}..." "${b.error ? b.error.slice(0, 60) : b.error}..."`;
  }

  if (a.periods !== b.periods) {
    return `Different periods: "${a.periods}" "${b.periods}"`;
  }

  for (let i = 0; i < a.periods; i++) {
    let dA = a.data[i];
    let dB = b.data[i];
    for (let key in dA) {
      let oA = dA[key];
      let oB = dB[key];
      if (!oA.current) {
        if (("" + oA) !== ("" + oB)) {
          return `Different value at "${key}": "${oA}" "${oB}"`;
        }
      } else {
        for (let j = 0; j < oA.current.length; j++) {
          let pA = oA.current[j];
          let pB = oB.current[j];

          if (pA.instanceId !== pB.instanceId) {
            return "Different instance id";
          }
          if ("" + pA.location.items[0] !== "" + pB.location.items[0]) {
            return `Different location x: "${pA.location.items[0]}" "${pB.location.items[0]}"`;
          }
          if ("" + pA.location.items[1] !== "" + pB.location.items[1]) {
            return `Different location y: "${pA.location.items[1]}" "${pB.location.items[1]}"`;
          }
          if (!(pA.state === null && pB.state === null)) {
            for (let k = 0; k < pA.state.length; k++) {
              let sA = pA.state[k];
              let sB = pB.state[k];
              if (sA.active !== sB.active) {
                return `Different active state: ${sA.dna.name}  -  ${sA.active}; ${sB.dna.name} - ${sB.active}`;
              }
            }
          }
        }
      }
    }
  }

  return false;
}
