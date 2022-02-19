import { div, evaluateNode, minus } from "./formula/Formula.js";
import { Material } from "./formula/Material.js";
import { SPrimitive } from "./Primitives.js";


export class AggregateSeries {
  /**
   * @param {import("./Simulator").Simulator} simulate
   * @param {string} mid
   * @param {number|Material} mSpacing
   */
  constructor(simulate, mid, mSpacing) {
    this.simulate = simulate;

    this.id = mid;
    this.spacing = mSpacing;
    /** @type {Material[]} */
    this.oldValues = [];
  }

  /**
   * @param {string} mid
   * @returns {boolean}
   */
  match(mid) {
    return this.id === mid;
  }

  get(data) {
    let index = 0;
    if (this.spacing < 0) {
      index = 0;
    } else if (this.spacing === 0) {
      index = Math.floor(div(minus(this.simulate.time(), this.simulate.timeStart), this.simulate.userTimeStep).value);
    } else if (this.spacing instanceof Material) {
      index = Math.floor(div(minus(this.simulate.time(), this.simulate.timeStart), this.spacing.forceUnits(this.simulate.timeUnits)).value);
    } else {
      console.error("Invalid spacing:", this.spacing);
    }

    while (this.oldValues.length - 1 < index) {
      let value = evaluateNode(data.node, data.scope, this.simulate);
      // If it's a primitive, take its current value.
      // Otherwise we'll keep returning the primitive itself
      // leading to a new value taken each time it is used.
      if (value instanceof SPrimitive) {
        value = value.value();
      }
      this.oldValues.push(value);
    }

    if (this.oldValues[index].fullClone) {
      return this.oldValues[index].fullClone();
    } else {
      return this.oldValues[index];
    }
  }
}


export class DataBank {
  constructor() {
    /** @type {Object<string, any[]>} */
    this.dataSeries = {};
  }

  series() {
    return Object.keys(this.dataSeries);
  }

  clone() {
    let d = new DataBank();
    let keys = this.series();
    for (let i = 0; i < keys.length; i++) {
      d.dataSeries[keys[i]] = this.dataSeries[keys[i]];
    }
    return d;
  }

  /**
   * @param {string} n
   *
   * @returns {any[]}
   */
  getSeries(n) {
    if (!(n in this.dataSeries)) {
      this.dataSeries[n] = [];
    }
    return this.dataSeries[n];
  }

  trimValues(newUbound) {
    let series = this.series();
    for (let i = 0; i < series.length; i++) {
      let d = this.getSeries(series[i]);
      if (d.length - 1 > newUbound) {
        d.splice(newUbound + 1, d.length - newUbound + 1);
      }
    }
  }
}
