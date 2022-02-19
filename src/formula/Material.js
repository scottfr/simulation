import { convertUnits } from "./Units.js";
import { fn } from "../CalcMap.js";
import { ModelError } from "./ModelError.js";


export class Material {
  /**
	 * @param {number} value
	 * @param {import("./Units").UnitStore=} units
	 */
  constructor(value, units) {
    /** @type {number} */
    this.value = value;
    /** @type {import("./Units").UnitStore} */
    this.units = units;
  }

  /**
   * @returns {Material}
   */
  toNum() {
    return this;
  }

  toString() {
    if (this.units && !this.units.isUnitless()) {
      return "{" + this.value + " " + this.units.toStringShort() + "}";
    } else {
      return this.value + "";
    }
  }

  fullClone() {
    return new Material(this.value, this.units);
  }

  /**
	 * @param {import("./Units").UnitStore=} newUnits
   *
	 * @returns {Material}
	 */
  forceUnits(newUnits) {
    if (!this.units) {
      this.units = newUnits;
    } else {
      let scale = convertUnits(this.units, newUnits);
      if (scale === 0) {
        unitAlert(this.units, newUnits, "conversion of units");
      } else {
        this.value = fn["*"](this.value, scale);
        this.units = newUnits;
      }
    }

    return this;
  }
}


export function unitAlert(lhs, rhs, type) {
  throw new ModelError("Incompatible units for the " + type + " of " + ((lhs && !lhs.isUnitless()) ? lhs.toString() : "unitless") + " and " + ((rhs && !rhs.isUnitless()) ? rhs.toString() : "unitless") + ".", {
    code: 5000
  });
}

