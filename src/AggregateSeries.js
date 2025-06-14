import { div, evaluateNode, minus, toNum } from "./formula/Formula.js";
// eslint-disable-next-line no-unused-vars
import { Material } from "./formula/Material.js";


export class AggregateSeries {
  /**
   * @param {import("./Simulator").Simulator} simulate
   * @param {Material} mSpacing
   */
  constructor(simulate, mSpacing) {
    this.simulate = simulate;

    /** @type {Material} */
    this.spacing = mSpacing;
    /** @type {Material[]} */
    this.oldValues = [];
  }


  get(data) {
    let index = 0;

    if (this.spacing === null) {
      index = 0;
    } else if (this.spacing.value < 0) {
      // we treat negative spacing as the same as no defined spacing
      index = 0;
    } else if (this.spacing.value === 0) {
      index = Math.floor(div(minus(this.simulate.time(), this.simulate.timeStart), this.simulate.userTimeStep).value);
    } else {
      index = Math.floor(div(minus(this.simulate.time(), this.simulate.timeStart), this.spacing.forceUnits(this.simulate.timeUnits)).value);
    }

    while (this.oldValues.length - 1 < index) {
      let value = evaluateNode(data.node, data.scope, this.simulate);
      
      // ensure things like primitives or functions are converted to values
      this.oldValues.push(toNum(value));
    }

    if (this.oldValues[index].fullClone) {
      return this.oldValues[index].fullClone();
    } else {
      return this.oldValues[index];
    }
  }
}
