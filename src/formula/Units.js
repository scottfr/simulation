import { toHTML } from "../Utilities.js";
import { fn } from "../CalcMap.js";



/**
 * @param {string[]} names
 * @param {number[]} exponents
 *
 * @returns
 */
function sortAndCollapseUnits(names, exponents) {
  if (names.length <= 1) {
    if (names.length === 1) {
      names[0] = names[0].toLowerCase();
    }
  } else {
    let sorter = [];
    for (let i = 0; i < names.length; i++) {
      sorter.push({
        name: names[i].toLowerCase(),
        exponent: exponents[i]
      });
    }
    sorter.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    names = [];
    exponents = [];
    for (let i = 0; i < sorter.length; i++) {
      names.push(sorter[i].name);
      exponents.push(sorter[i].exponent);
    }
    for (let i = 0; i < names.length; i++) {
      for (let j = i + 1; j < names.length; j++) {
        if (names[i] === names[j]) {
          exponents[i] = exponents[i] + exponents[j];

          names.splice(j, 1);
          exponents.splice(j, 1);

          j--;
        }
      }

      if (exponents[i] === 0) {
        names.splice(i, 1);
        exponents.splice(i, 1);
        i--;
      }
    }
  }

  return { names: names, exponents: exponents };
}



/**
 * @param {string[]} names
 * @param {number[]} exponents
 *
 * @returns {string}
 */
function getUnitsId(names, exponents) {
  return names.join(",") + exponents.join(",");
}


export class UnitStore {
  /**
   * @param {UnitManager} manager
   * @param {string[]} names
   * @param {number[]} exponents
   */
  constructor(manager, names, exponents) {
    this.manager = manager;

    this.names = names;

    this.exponents = exponents;

    /** @type {number} */
    this.toBase = null;

    /** @type {UnitStore} */
    this.baseUnits = null;

    /** @type {Map<UnitStore, [number, UnitStore, boolean]>} */
    this.multiples = new Map();
    /** @type {Map<UnitStore, [number, UnitStore, boolean]>} */
    this.divisions = new Map();

    this.id = getUnitsId(this.names, this.exponents);
  }

  isUnitless() {
    return !this.exponents.find(x => x !== 0);
  }

  /**
   * Also check if the units would simplify to unitless.
   * 
   * @returns 
   */
  isDeepUnitless() {
    if (!this.exponents.find(x => x !== 0)) {
      return true;
    }
  
    this.addBase();
  
    return !this.baseUnits.exponents.find(x => x !== 0);
  }
  
  addBase() {
    if (this.toBase !== null) {
      return;
    }

    this.toBase = 1;


    let names = this.names.slice();
    let exponents = this.exponents.slice();

    let modified = true;
    while (modified) {
      modified = false;

      for (let i = names.length - 1; i >= 0; i--) {
        let u = this.manager.findSource(names[i]);
        if (u !== null && !(u.target.names.length === 1 && u.target.names[0] === names[i])) {
          this.toBase = fn["*"](this.toBase, fn.expt(u.scale, exponents[i]));
          names = names.concat(u.target.names);
          names.splice(i, 1);
          let exp = exponents[i];
          exponents = exponents.concat(u.target.exponents.map((x) => {
            return x * exp;
          }));
          exponents.splice(i, 1);
          modified = true;
          break;
        }
      }
    }

    let x = sortAndCollapseUnits(names, exponents);

    this.baseUnits = this.manager.getUnitStore(x.names, x.exponents, false, true);
  }

  /**
   * @param {number} exponent
   * @returns {UnitStore}
   */
  power(exponent) {
    let names = this.names.slice();
    let exponents = this.exponents.slice();
    for (let i = 0; i < exponents.length; i++) {
      exponents[i] = exponents[i] * exponent;
    }
    return this.manager.getUnitStore(names, exponents);
  }

  /**
   * @returns {string}
   */
  toStringShort() {
    let den = [];
    let num = [];
    let s = "";
    for (let i = 0; i < this.names.length; i++) {
      if (this.exponents[i] > 0) {
        num.push({ name: this.names[i], exponent: this.exponents[i] });
      } else if (this.exponents[i] < 0) {
        den.push({ name: this.names[i], exponent: -this.exponents[i] });
      }
    }
    if (num.length > 0) {
      s = num.map(x => x.name + (x.exponent !== 1 ? "^" + x.exponent : "")).join("*");
    } else {
      s = "1";
    }
    if (den.length > 0) {
      s = s + "/" + den.map(x => x.name + (x.exponent !== 1 ? "^" + x.exponent : "")).join("*");
    }

    return s;
  }

  /**
   * @param {UnitStore} rhs
   * @param {boolean} multiplication (false if division)
   *
   * @returns {[number, UnitStore, boolean]}
   */
  multiply(rhs, multiplication) {
    let exponent = multiplication ? 1 : -1;
    let cache = multiplication ? this.multiples : this.divisions;


    if (!cache.has(rhs)) {
      let lhsUnits = /** @type {UnitStore} */ (this);
      let rhsUnits = rhs;
      
      let lhsNames = null;
      let lhsExponents = null;
      let rhsNames = null;
      let rhsExponents = null;
      for (let i = 0; i < (lhsNames || lhsUnits.names).length; i++) {
        let j = (rhsNames || rhsUnits.names).indexOf((lhsNames || lhsUnits.names)[i]);
        if (j > -1 && (lhsExponents || lhsUnits.exponents)[i] === (-exponent) * (rhsExponents || rhsUnits.exponents)[j]) {
          if (!lhsNames) {
            lhsNames = lhsUnits.names.slice();
            lhsExponents = lhsUnits.exponents.slice();
            rhsNames = rhsUnits.names.slice();
            rhsExponents = rhsUnits.exponents.slice();
          }
          lhsNames.splice(i, 1);
          lhsExponents.splice(i, 1);
          rhsNames.splice(j, 1);
          rhsExponents.splice(j, 1);
          i--;
        }
      }

      if (lhsNames) {
        lhsUnits = lhsUnits.manager.getUnitStore(lhsNames, lhsExponents);
        rhsUnits = rhsUnits.manager.getUnitStore(rhsNames, rhsExponents);
      }

      if (!lhsUnits && !rhsUnits) {
        cache.set(rhs, [1, undefined, true]);
        return cache.get(rhs);
      } else if (!lhsUnits) {
        cache.set(rhs, [1, multiplication ? rhsUnits : rhsUnits.power(-1), true]);
        return cache.get(rhs);
      } else if (!rhsUnits) {
        cache.set(rhs, [1, lhsUnits, true]);
        return cache.get(rhs);
      }
      
      if (lhsUnits.toBase === null) {
        lhsUnits.addBase();
      }
      if (rhsUnits.toBase === null) {
        rhsUnits.addBase();
      }


      let lhsBaseUnits = lhsUnits.baseUnits.names;
      let rhsBaseUnits = rhsUnits.baseUnits.names;
      // check if there is any overlap
      let overlap = false;
      for (let i = 0; i < lhsBaseUnits.length; i++) {
        if (rhsBaseUnits.includes(lhsBaseUnits[i])) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        let newUnits = lhsUnits.manager.getUnitStore(
          lhsUnits.names.concat(rhsUnits.names),
          lhsUnits.exponents.concat(multiplication ? rhsUnits.exponents : rhsUnits.exponents.map(x => -x))
        );
        cache.set(rhs, [1, newUnits, true]);
        return cache.get(rhs);
      }
      


      let names;
      let exponents;
      if (lhsUnits.baseUnits) {
        names = lhsUnits.baseUnits.names.slice();
        exponents = lhsUnits.baseUnits.exponents.slice();


        if (rhsUnits.baseUnits) {
          for (let i = 0; i < rhsUnits.baseUnits.names.length; i++) {
            let j = names.indexOf(rhsUnits.baseUnits.names[i]);
            if (j !== -1) {
              exponents[j] = exponents[j] + rhsUnits.baseUnits.exponents[i] * exponent;
            } else {
              let found = false;
              for (let k = 0; k < names.length; k++) {
                if (rhsUnits.baseUnits.names[i] < names[k]) {
                  names.splice(k, 0, rhsUnits.baseUnits.names[i]);
                  exponents.splice(k, 0, rhsUnits.baseUnits.exponents[i] * exponent);
                  found = true;
                  break;
                }
              }
              if (!found) {
                names.push(rhsUnits.baseUnits.names[i]);
                exponents.push(rhsUnits.baseUnits.exponents[i] * exponent);
              }
            }
          }

          for (let i = exponents.length - 1; i >= 0; i--) {
            if (exponents[i] === 0) {
              exponents.splice(i, 1);
              names.splice(i, 1);
            }
          }
        }
      } else {
        names = rhsUnits.baseUnits.names.slice();
        exponents = rhsUnits.baseUnits.exponents.slice();
      }
      let newUnits = this.manager.getUnitStore(names, exponents);
      cache.set(rhs, [
        multiplication ? fn["*"](lhsUnits.toBase, rhsUnits.toBase) : fn["/"](lhsUnits.toBase, rhsUnits.toBase),
        newUnits,
        !newUnits
      ]);
    }

    return cache.get(rhs);
  }

  /**
   * @returns {string}
   */
  toString() {
    let n = "",
      den = "";
    let numItems = 0,
      denItems = 0;
    for (let i = 0; i < this.names.length; i++) {
      if (this.names[i] !== "") {
        let item = "<span class=\"unit\">" + toHTML(toTitleCase(this.names[i])) + "</span>";
        if (this.exponents[i] !== 1 && this.exponents[i] !== -1) {
          item = item + "<span class='markup'>^</span><sup>" + Math.abs(this.exponents[i]) + "</sup>";
        }
        if (this.exponents[i] > 0) {
          if (numItems > 0) {
            n = n + "<span class='markup'>*</span>";
          }
          n = n + item;
          numItems = numItems + 1;
        } else {
          if (denItems > 0) {
            den = den + "<span class='markup'>*</span>";
          }
          den = den + item;
          denItems = denItems + 1;
        }
      }
    }


    if (n === "") {
      n = "Unitless";
    }
    if (den === "") {
      return "<div class=\"units\">" + n + "</div>";
    } else {
      if (n === "Unitless") {
        n = "1";
      }
      return "<span class=\"units\">" + n + "<hr/><span class='markup'>/(</span>" + den + "<span class='markup'>)</span></span>";
    }
  }

}



const titleCaseReg = /\w\S*/g;
/**
 * @param {string} txt
 *
 * @returns {string}
 */
function titleCaseFunc(txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}


/**
 * @param {string} str
 *
 * @returns {string}
 */
function toTitleCase(str) {
  return str.replace(titleCaseReg, titleCaseFunc);
}


/**
 * @param {UnitStore} source
 * @param {UnitStore} target
 * @param {boolean=} allowUnitApplication
 *
 * @returns {number}
 */
export function convertUnits(source, target, allowUnitApplication = false) {
  if (source === target) {
    return 1;
  }

  let sourceUnitless = !source || source.isUnitless();
  let targetUnitless = !target || target.isUnitless();

  if (sourceUnitless && targetUnitless) {
    return 1;
  }

  if (!sourceUnitless && targetUnitless) {
    return 0;
  }

  if (sourceUnitless && !targetUnitless) {
    if (allowUnitApplication) {
      // we apply the target units onto the unitless source
      return 1;
    }
    return 0;
  }

  if (source.toBase === null) {
    source.addBase();
  }
  if (target.toBase === null) {
    target.addBase();
  }

  if (source.baseUnits !== target.baseUnits) {
    return 0;
  }

  return fn["/"](source.toBase, target.toBase);
}


/**
 * @typedef {object} UnitDefinition
 * @property {string=} sourceString
 * @property {RegExp=} source
 * @property {string=} targetString
 * @property {UnitStore=} target
 * @property {number} scale
 */

/** @type {UnitDefinition[]} */
const DEFAULT_UNITS = [
  {
    "source": /^Degree$/i,
    "targetString": "Degrees",
    "scale": 1
  },
  {
    "source": /^Radians?$/i,
    "targetString": "Degrees",
    "scale": 180 / Math.PI
  },
  {
    "source": /^Ampere$/i,
    "targetString": "Amperes",
    "scale": 1
  },
  {
    "source": /^Gram$/i,
    "targetString": "Grams",
    "scale": 1
  },
  {
    "source": /^Second$/i,
    "targetString": "Seconds",
    "scale": 1
  },
  {
    "source": /^Meter$/i,
    "targetString": "Meters",
    "scale": 1
  },
  {
    "source": /^(Meters? ?Squared?|Squared? ?Meters?)$/i,
    "targetString": "Meters^2",
    "scale": 1
  },
  {
    "source": /^(Centimeters? ?Squared?|Squared? ?Centimeters?)$/i,
    "targetString": "Centimeters^2",
    "scale": 1
  },
  {
    "source": /^(Centimeters? ?Cubed?|Cubic ?Centimeters?)$/i,
    "targetString": "Centimeters^3",
    "scale": 1
  },
  {
    "source": /^(Meters? Cubed?|Cubic ?Meters?)$/i,
    "targetString": "Meters^3",
    "scale": 1
  },
  {
    "source": /^(Kilometers? ?Cubed?|Cubic ?Kilometers?)$/i,
    "targetString": "Kilometers^3",
    "scale": 1
  },
  {
    "source": /^(Inches? Squared?|Squared? ?Inches?)$/i,
    "targetString": "Inches^2",
    "scale": 1
  },
  {
    "source": /^(Miles? ?Squared?|Squared? ?Miles?)$/i,
    "targetString": "Miles^2",
    "scale": 1
  },
  {
    "source": /^(Kilometers? Squared?|Squared? ?Kilometers?)$/i,
    "targetString": "Kilometers^2",
    "scale": 1
  },
  {
    "source": /^Acre? ?(Feet|Foot)$/i,
    "targetString": "Acres,Feet",
    "scale": 1
  },
  {
    "source": /^Meters? ?per ?Seconds?$/i,
    "targetString": "Meters,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Meters? ?per ?Seconds? ?Squared?$/i,
    "targetString": "Meters,Seconds^-2",
    "scale": 1
  },
  {
    "source": /^(Foot|Feet) ?per ?Seconds?$/i,
    "targetString": "Feet,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^(Foot|Feet) ?per ?Seconds? ?Squared?$/i,
    "targetString": "Feet,Seconds^-2",
    "scale": 1
  },
  {
    "source": /^Miles? ?per ?Hours?$/i,
    "targetString": "Miles,Hours^-1",
    "scale": 1
  },
  {
    "source": /^Miles? ?per ?Hours? ?Squared?$/i,
    "targetString": "Miles,Hours^-2",
    "scale": 1
  },
  {
    "source": /^Kilometers? ?per ?Hours?$/i,
    "targetString": "Kilometers,Hours^-1",
    "scale": 1
  },
  {
    "source": /^Kilometers? ?per ?Hours? ?Squared?$/i,
    "targetString": "Kilometers,Hours^-2",
    "scale": 1
  },
  {
    "source": /^Liters? ?per ?Seconds?$/i,
    "targetString": "Liters,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^(Cubic ?Meters?|Meters? ?Cubed?) ?per ?Seconds?$/i,
    "targetString": "Meters^3,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^(Squared? ?Yards?|Yards? ?Squared?)$/i,
    "targetString": "Yards^2",
    "scale": 1
  },
  {
    "source": /^(Squared? ?(Feet|Foot)|(Feet|Foot) ?Squared?)$/i,
    "targetString": "Feet^2",
    "scale": 1
  },
  {
    "source": /^(Squared? Millimeters?|Millimeters? ?Squared?)$/i,
    "targetString": "Millimeters^2",
    "scale": 1
  },
  {
    "source": /^(Millimeters? ?Cubed?|Cubic ?Millimeters?)$/i,
    "targetString": "Millimeters^3",
    "scale": 1
  },
  {
    "source": /^Gallons? ?per ?Seconds?$/i,
    "targetString": "Gallons,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Gallons? ?per ?Minutes?$/i,
    "targetString": "Gallons,Minutes^-1",
    "scale": 1
  },
  {
    "source": /^Pounds? ?per ?Seconds?$/i,
    "targetString": "Pounds,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Kilograms? ?per ?Seconds?$/i,
    "targetString": "Kilograms,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Seconds?$/i,
    "targetString": "Dollars,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Hours?$/i,
    "targetString": "Dollars,Hours^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Days?$/i,
    "targetString": "Dollars,Days^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Weeks?$/i,
    "targetString": "Dollars,Weeks^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Months?$/i,
    "targetString": "Dollars,Months^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Quarters?$/i,
    "targetString": "Dollars,Quarters^-1",
    "scale": 1
  },
  {
    "source": /^Dollars? ?per ?Years?$/i,
    "targetString": "Dollars,Years^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Seconds?$/i,
    "targetString": "Euros,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Hours?$/i,
    "targetString": "Euros,Hours^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Days?$/i,
    "targetString": "Euros,Days^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Weeks?$/i,
    "targetString": "Euros,Weeks^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Months?$/i,
    "targetString": "Euros,Months^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Quarters?$/i,
    "targetString": "Euros,Quarters^-1",
    "scale": 1
  },
  {
    "source": /^Euros? ?per ?Years?$/i,
    "targetString": "Euros,Years^-1",
    "scale": 1
  },
  {
    "source": /^Centimeters?$/i,
    "targetString": "Meters",
    "scale": 0.01
  },
  {
    "source": /^Millimeters?$/i,
    "targetString": "Meters",
    "scale": 0.001
  },
  {
    "source": /^Kilometers?$/i,
    "targetString": "Meters",
    "scale": 1000
  },
  {
    "source": /^Inch(es)?$/i,
    "targetString": "Meters",
    "scale": 0.0254
  },
  {
    "source": /^(Foot|Feet)$/i,
    "targetString": "Meters",
    "scale": 0.3048
  },
  {
    "source": /^Yards?$/i,
    "targetString": "Meters",
    "scale": 0.9144
  },
  {
    "source": /^Miles?$/i,
    "targetString": "Meters",
    "scale": 1609.344
  },
  {
    "source": /^Acres?$/i,
    "targetString": "Meters^2",
    "scale": 4046.85642
  },
  {
    "source": /^Hectares?$/i,
    "targetString": "Meters^2",
    "scale": 10000
  },
  {
    "source": /^Liters?$/i,
    "targetString": "Meters^3",
    "scale": 0.001
  },
  {
    "source": /^Gallons?$/i,
    "targetString": "Meters^3",
    "scale": 0.003785
  },
  {
    "source": /^Quarts?$/i,
    "targetString": "Meters^3",
    "scale": 0.000946
  },
  {
    "source": /^Fluid ?Ounces?$/i,
    "targetString": "Meters^3",
    "scale": 0.00003
  },
  {
    "source": /^Years?$/i,
    "targetString": "Seconds",
    "scale": 31536000
  },
  {
    "source": /^Quarters?$/i,
    "targetString": "Seconds",
    "scale": 7884000
  },
  {
    "source": /^Months?$/i,
    "targetString": "Seconds",
    "scale": 2628000
  },
  {
    "source": /^Weeks?$/i,
    "targetString": "Seconds",
    "scale": 604800
  },
  {
    "source": /^Days?$/i,
    "targetString": "Seconds",
    "scale": 86400
  },
  {
    "source": /^Hours?$/i,
    "targetString": "Seconds",
    "scale": 3600
  },
  {
    "source": /^Minutes?$/i,
    "targetString": "Seconds",
    "scale": 60
  },
  {
    "source": /^Kilograms?$/i,
    "targetString": "Grams",
    "scale": 1000
  },
  {
    "source": /^Milligrams?$/i,
    "targetString": "Grams",
    "scale": 0.001
  },
  {
    "source": /^Ounces?$/i,
    "targetString": "Grams",
    "scale": 28.349523
  },
  {
    "source": /^Pounds?$/i,
    "targetString": "Grams",
    "scale": 453.59237
  },
  {
    "source": /^Tonnes?$/i,
    "targetString": "Grams",
    "scale": 1000000
  },
  {
    "source": /^Tons?$/i,
    "targetString": "Grams",
    "scale": 907184.74
  },
  {
    "source": /^Watts?$/i,
    "targetString": "Joules,Seconds^-1",
    "scale": 1
  },
  {
    "source": /^Kilowatts?$/i,
    "targetString": "Watts",
    "scale": 1000
  },
  {
    "source": /^Megawatts?$/i,
    "targetString": "Watts",
    "scale": 1000000
  },
  {
    "source": /^Gigawatts?$/i,
    "targetString": "Watts",
    "scale": 1000000000
  },
  {
    "source": /^Calories?$/i,
    "targetString": "Joules",
    "scale": 4.184
  },
  {
    "source": /^Kilocalories?$/i,
    "targetString": "Joules",
    "scale": 4184
  },
  {
    "source": /^(BTUs?|British ?Thermal ?units?)$/i,
    "targetString": "Joules",
    "scale": 1055.05585
  },
  {
    "source": /^Kilojoules?$/i,
    "targetString": "Joules",
    "scale": 1000
  },
  {
    "source": /^Joules?$/i,
    "targetString": "Newtons,Meters",
    "scale": 1
  },
  {
    "source": /^Coulombs?$/i,
    "targetString": "Amperes,Seconds",
    "scale": 1
  },
  {
    "source": /^Volts?$/i,
    "targetString": "Watts,Amperes^-1",
    "scale": 1
  },
  {
    "source": /^Millivolts?$/i,
    "targetString": "Volts",
    "scale": 0.001
  },
  {
    "source": /^Kilovolts?$/i,
    "targetString": "Volts",
    "scale": 1000
  },
  {
    "source": /^Newtons?$/i,
    "targetString": "Kilograms,Meters,Seconds^-2",
    "scale": 1
  },
  {
    "source": /^Pounds? ?Force$/i,
    "targetString": "Pounds,Feet per Second Squared",
    "scale": 32.17405
  },
  {
    "source": /^Atoms?$/i,
    "targetString": "Moles",
    "scale": 1 / 6.02214076e23
  },
  {
    "source": /^Molecules?$/i,
    "targetString": "Moles",
    "scale": 1 / 6.02214076e23
  },
  {
    "source": /^Farads?$/i,
    "targetString": "Joules,Volts^-2",
    "scale": 1
  },
  {
    "source": /^Pascals?$/i,
    "targetString": "Newton,Meters^-2",
    "scale": 1
  },
  {
    "source": /^Kilopascals?$/i,
    "targetString": "Pascals",
    "scale": 1000
  },
  {
    "source": /^Bars?$/i,
    "targetString": "Pascals",
    "scale": 100000
  },
  {
    "source": /^Atmospheres?$/i,
    "targetString": "Pascals",
    "scale": 101325
  },
  {
    "source": /^Pounds? ?per ?Squared? ?Inch(es)?$/i,
    "targetString": "Pascals",
    "scale": 6894
  }
];




export class UnitManager {
  constructor() {
    /** @type {UnitDefinition[]} */
    this.unitDefinitions = [];

    /** @type {Object<string, UnitDefinition>} */
    this.cachedUnits = Object.create(null);

    /**
     * @type {Object<string, UnitStore>}
     */
    this.unitsBank = Object.create(null);

    this.addUnits(DEFAULT_UNITS);
  }


  /**
   * @param {UnitDefinition[]} units
   */
  addUnits(units) {
    for (let unit of units) {
      if (!unit.source) {
        unit.source = new RegExp("^" + unit.sourceString + "$", "i");
      }
      if (!unit.target) {
        unit.target = this.unitsFromString(unit.targetString.toLowerCase());
      }
    }

    this.unitDefinitions = units.concat(this.unitDefinitions);
  }


  /**
   * @param {string} name
   *
   * @returns {UnitDefinition}
   */
  findSource(name) {
    if (!(name in this.cachedUnits)) {
      this.cachedUnits[name] = null;

      for (let i = this.unitDefinitions.length - 1; i >= 0; i--) {
        if (this.unitDefinitions[i].source.test(name)) {
          this.cachedUnits[name] = this.unitDefinitions[i];

          break;
        }
      }
    }


    return this.cachedUnits[name];
  }

  /**
   * @param {string[]} names
   * @param {number[]} exponents
   * @param {boolean=} checkNames
   * @param {boolean=} alwaysReturn - units must be returned, when calling setBase
   *
   * @returns {UnitStore}
   */
  getUnitStore(names, exponents, checkNames = false, alwaysReturn = false) {
    if (checkNames) {
      let x = sortAndCollapseUnits(names, exponents);
      names = x.names;
      exponents = x.exponents;
    }

    if (!alwaysReturn && !names.length) {
      return;
    }

    let id = getUnitsId(names, exponents);

    if (!this.unitsBank[id]) {
      this.unitsBank[id] = new UnitStore(this, names, exponents);
    }

    return this.unitsBank[id];
  }


  /**
   * @param {string} expandString
   *
   * @returns {UnitStore}
   */
  unitsFromString(expandString) {
    let names = [];
    let exponents = [];
    if (expandString) {
      let expandItems = expandString.split(",");
      for (let j = 0; j < expandItems.length; j++) {
        names.push(expandItems[j].split("^")[0]);
        if (expandItems[j].indexOf("^") !== -1) {
          exponents.push(parseFloat(expandItems[j].split("^")[1]));
        } else {
          exponents.push(1);
        }
      }
    }
    return this.getUnitStore(names, exponents, true);
  }
}

