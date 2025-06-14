import { convertUnits, UnitStore } from "./Units.js";
import { fn } from "../CalcMap.js";
import { ModelError } from "./ModelError.js";
import { PrimitiveStore } from "./Formula.js";


export class Material {
  /**
   * @param {number} value
   * @param {import("./Units").UnitStore=} units
   * @param {boolean=} explicitUnits
   */
  constructor(value, units, explicitUnits=true) {
    /** @type {number} */
    this.value = value;
    /** @type {import("./Units").UnitStore} */
    this.units = units;
    /** @type {boolean} */
    this.explicitUnits = explicitUnits;
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
    return new Material(this.value, this.units, this.explicitUnits);
  }

  /**
   * @param {import("./Units").UnitStore} newUnits
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


/** @typedef {"MATERIAL"|"VECTOR"|"PRIMITIVE"|null} OperandType */

/**
 * @param {Material|UnitStore} lhs 
 * @param {Material|UnitStore} rhs 
 * @param {string} type 
 * @param {string=} operator
 * @param {import("./Formula").TreeNode=} lhsNode
 * @param {import("./Formula").TreeNode=} rhsNode
 */
export function unitAlert(lhs, rhs, type, operator, lhsNode, rhsNode) {
  if (lhs instanceof UnitStore && rhs instanceof UnitStore) {
    throw new ModelError(`Incompatible units for the ${type} of ${((lhs && !lhs.isUnitless()) ? lhs.toString() : "unitless")} and ${((rhs && !rhs.isUnitless()) ? rhs.toString() : "unitless")}.`, {
      code: 5000
    });
  } else if (lhs instanceof Material && rhs instanceof Material) {
    let lhsUnits = lhs.units;
    let rhsUnits = rhs.units;
    let msg = `Incompatible units for the ${type} of ${((lhsUnits && !lhsUnits.isUnitless()) ? lhsUnits.toString() : "unitless")} and ${((rhsUnits && !rhsUnits.isUnitless()) ? rhsUnits.toString() : "unitless")}.`;

    let formatMat = (mat) => {
      if (mat.units && !mat.units.isUnitless()) {
        return `{${mat.value} ${mat.units.toStringShort()}}`;
      } else {
        return mat.value;
      }
    };

    msg += `<br/><br/>Attempted ${type}: <b>${formatMat(lhs)} ${operator.replace("<", "&lt;").replace(">", "&gt;")} ${formatMat(rhs)}</b>`;

    if (!lhsUnits) {
      if (lhsNode instanceof Material) {
        let lhsSuggested = lhs.fullClone();
        lhsSuggested.units = rhsUnits;
        msg += `<br/><br/>Consider replacing <b>${formatMat(lhs)}</b> with <b>${formatMat(lhsSuggested)}</b>.`;
      } else if (lhsNode instanceof PrimitiveStore) {
        msg += "<br/><br/>Consider setting the units of <b>[" + lhsNode.primitive.dna.name + "]</b> to <b>" + rhsUnits.toStringShort() + "</b>.";
      }
    }

    if (!rhsUnits) {
      if (rhsNode instanceof Material) {
        let rhsSuggested = rhs.fullClone();
        rhsSuggested.units = lhsUnits;
        msg += `<br/><br/>Consider replacing <b>${formatMat(rhs)}</b> with <b>${formatMat(rhsSuggested)}</b>.`;
      } else if (rhsNode instanceof PrimitiveStore) {
        msg += "<br/><br/>Consider setting the units of <b>[" + rhsNode.primitive.dna.name + "]</b> to <b>" + lhsUnits.toStringShort() + "</b>.";
      }
    }

    throw new ModelError(msg, {
      code: 5000
    });
  }
}

