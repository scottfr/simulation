import { toNum } from "./Formula.js";
import { Material } from "./Material.js";
import { ModelError } from "./ModelError.js";
import { selectFromMatrix, strictEquals } from "./Utilities.js";


/**
 * @param {string[]} thisNames
 * @param {string[]} keys
 *
 * @returns {boolean}
 */
function keysMatch(thisNames, keys) {
  if (!keys.includes("*")) {
    for (let i = 0; i < thisNames.length; i++) {
      if (thisNames[i] !== "*") {
        if (thisNames[i] === undefined) {
          return false;
        }
        if (!keys.includes(thisNames[i])) {
          return false;
        }
      }
    }
  }

  if (!thisNames.includes("*")) {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "*") {
        if (keys[i] === undefined) {
          return false;
        }
        if (!thisNames.includes(keys[i])) {
          return false;
        }
      }
    }
  }

  return true;
}


/** @template {any} T */
export class Vector {
  /**
   * @param {T[]} items
   * @param {import("../Simulator").Simulator} simulate
   * @param {string[]=} names
   * @param {Vector=} parent
   */
  constructor(items, simulate, names, parent) {
    this.simulate = simulate;

    this.parent = parent ? parent : simulate.varBank["vectorbase"];
    this.items = items;
    this.names = names;
    this.namesLC = undefined;
    this.isNum = undefined;
    this.terminateApply = undefined;

    if (names) {
      this.namesLC = [];
      for (let name of names) {
        if (name) {
          this.namesLC.push(name.toLowerCase());
        } else {
          this.namesLC.push(undefined);
        }
      }
    }

  }

  toNum() {
    if (this.isNum) {
      return this;
    }

    let v = this.fullClone();
    for (let i = 0; i < v.items.length; i++) {
      v.items[i] = toNum(v.items[i]);
    }
    v.isNum = true;
    return v;
  }

  /**
   * @returns {string}
   */
  toString() {
    let items = [];
    for (let i = 0; i < this.items.length; i++) {
      try {
        let str = toNum(this.items[i]).toString();
        if (this.names && this.names[i]) {
          str = this.names[i] + ": " + str;
        }
        items.push(str);
      } catch (err) {
        items.push("{Cannot convert value to string}");
      }
    }
    return "{" + items.join(", ") + "}";
  }

  /**
   * @returns {number}
   */
  length() {
    return this.items.length;
  }

  cloneCombine(other, operation, rhs, noSwitch) {
    return this.fullClone().combine(other, operation, rhs, noSwitch);
  }

  combine(other, operation, rhs, noSwitch) {
    if (other instanceof Vector) {
      if (this.length() !== other.length() && !this.names && !other.names) {
        throw new ModelError("Vectors must have equal length when combined.", {
          code: 2001
        });
      }
    }

    if (other instanceof Vector && this.names && other.names) {
      if (!noSwitch && other.depth() > this.depth()) {
        return other.combine(this, operation, !rhs);
      }
      if (!this.keysMatch(other.namesLC)) {
        if (this.items[0] instanceof Vector) {
          for (let i = 0; i < this.items.length; i++) {
            /** @type {Vector} */ (this.items[i]).combine(other, operation, rhs, true);
          }
          return this;
        } else {
          throw new ModelError("Keys do not match for vector operation.", {
            code: 2000
          });
        }
      }
    }

    for (let i = 0; i < this.length(); i++) {
      let x;
      if (other instanceof Vector) {
        if (this.names && other.names) {
          let index = other.namesLC.indexOf(this.namesLC[i]);
          if (this.names.length === 1 && this.names[0] === "*"){
            index = -2;
          }
          if (index === -1) {
            index = other.names.indexOf("*");
          }
          if (index === -1) {
            throw new ModelError("Mismatched keys for vector operation.", {
              code: 2002
            });
          }
          if (index === -2) {
            x = undefined;
          } else {
            x = other.items[index];
          }
        } else {
          x = other.items[i];
        }
      } else {
        x = other;
      }
      if (x !== undefined) {
        if (rhs) {
          this.items[i] = operation(x, this.items[i]);
        } else {
          this.items[i] = operation(this.items[i], x);
        }
      }
    }

    if (this.names && this.names.includes("*") && other instanceof Vector && other.names) {
      let starred = this.items[this.names.indexOf("*")];
      for (let i = 0; i < other.names.length; i++) {
        if (other.names[i] && (!this.namesLC.includes(other.namesLC[i]))) {

          if (rhs) {
            this.items.push(operation(other.items[i], starred));
          } else {
            this.items.push(operation(starred, other.items[i]));
          }
          this.names.push(other.names[i]);
          this.namesLC.push(other.namesLC[i]);
        }
      }
    }

    return this;
  }

  collapseDimensions(target) {
    if (target instanceof Vector) {
      if (this.depth() === target.depth()) {
        return this;
      } else {
        let selector = [];
        /** @type {Vector} */
        let base = this;
        let targetLevel = target;
        for (let i = 0; i < this.depth(); i++) {
          if (!(targetLevel instanceof Vector)) {
            selector.push((x) => {
              return this.simulate.varBank["sum"](x[0].items);
            });
            base = /** @type {Vector} */ (base.items[0]);
          } else if ((base.namesLC === undefined && targetLevel.namesLC === undefined) || (base.namesLC !== undefined && targetLevel.namesLC !== undefined && keysMatch(base.namesLC, targetLevel.namesLC))) {
            selector.push("*");
            base =  /** @type {Vector} */ (base.items[0]);
            targetLevel =  /** @type {Vector} */ (targetLevel.items[0]);
          } else {
            selector.push((x) => {
              return this.simulate.varBank["sum"](x[0].items);
            });

            base =  /** @type {Vector} */ (base.items[0]);
          }
        }
        if (targetLevel.items) {
          throw new ModelError("Keys do not match for vector collapsing.", {
            code: 2003
          });
        }
        return selectFromMatrix(this, this.simulate, selector);
      }
    } else {
      return this.simulate.varBank["sum"]([this.simulate.varBank["flatten"]([this])]);
    }
  }

  /**
   * @returns {number}
   */
  depth() {
    if (!this.items.length) {
      return 1;
    }
    let firstItem = this.items[0];
    if (firstItem instanceof Vector) {
      return firstItem.depth() + 1;
    }
    return 1;
  }

  keysMatch(keys) {
    if (this.names) {
      return keysMatch(this.namesLC, keys);
    }
    return false;
  }

  /**
   * @param {function} operation
   * @returns
   */
  cloneApply(operation) {
    return this.fullClone().apply(operation);
  }

  /**
   * @param {function} operation
   * @returns
   */
  apply(operation) {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = operation(this.items[i], this.names ? this.names[i] : undefined);
    }
    return this;
  }

  /**
   * @param {function(Vector): any} operation
   *
   * @returns {Vector}
   */
  stackApply(operation) {
    if (this.depth() === 1) {
      return operation(this);
    }
    let s = this.stack();

    return s.recurseApply(operation);
  }

  /**
   * @param {any[]=} selector
   *
   * @returns
   */
  stack(selector) {
    let res = [];

    selector = selector || [0];

    let base = /** @type {Vector} */ (this.select(selector));


    for (let i = 1; i < this.items.length; i++) {
      selector[0] = i;
      let alt = this.select(selector);
      if (base instanceof Vector && alt instanceof Vector) {
        if ((base.names && !alt.names) || (alt.names && !base.names)) {
          throw new ModelError("Mismatched keys for vector collapsing.", {
            code: 2004
          });
        } else if (base.items.length !== alt.items.length) {
          throw new ModelError("Vectors of unequal size.", {
            code: 2005
          });
        }
      } else if (!(base instanceof Vector || alt instanceof Vector)) {
        throw new ModelError("Mismatched keys for vector collapsing.", {
          code: 2006
        });
      }
    }
    selector[0] = 0;

    selector.push(0);

    for (let i = 0; i < base.items.length; i++) {
      selector[selector.length - 1] = base.names ? base.namesLC[i] : i;

      if (base.items[i] instanceof Vector) {
        res.push(this.stack(selector.slice()));
      } else {
        let vecs = [];
        for (let j = 0; j < this.items.length; j++) {
          let newSelector = selector.slice();
          newSelector[0] = j;

          let item = this.select(newSelector);
          if (item instanceof Vector) {
            throw new ModelError("Number where vector expected in vector collapsing.", {
              code: 2007
            });
          }
          vecs.push(item);
        }
        let v = new Vector(vecs, this.simulate);
        v.terminateApply = true;
        res.push(v);
      }
    }

    return new Vector(res, this.simulate, base.names ? base.names.slice() : undefined);
  }


  select(selector) {
    /** @type {VectorElementType} */
    let b = this;

    for (let s = 0; s < selector.length; s++) {
      if (!(b instanceof Vector)) {
        throw new ModelError("Number where vector expected in vector collapsing.", {
          code: 2008
        });
      }

      if (selector[s] instanceof String || typeof selector[s] === "string") {
        let ind = b.namesLC.indexOf(selector[s].valueOf());
        if (ind === -1) {
          throw new ModelError("Mismatched keys for vector collapsing.", {
            code: 2009
          });
        }
        b = b.items[ind];
      } else {
        b = b.items[selector[s]];
      }
    }
    return b;
  }

  /**
   * @param {function} operation
   *
   * @returns {Vector}
   */
  recurseApply(operation) {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item instanceof Vector && !item.terminateApply) {
        this.items[i] = /** @type {any} */ (item.recurseApply(operation));
      } else {
        this.items[i] = operation(this.items[i]);
      }
    }
    return this;
  }


  fullNames() {
    let firstElement = this.items[0];

    if (firstElement instanceof Vector && firstElement.names) {
      let subn = firstElement.fullNames();
      let n = [];
      for (let i = 0; i < this.names.length; i++) {
        for (let j = 0; j < subn.length; j++) {
          n.push([this.names[i]].concat(subn[j]));
        }
      }

      return n;
    } else {
      return this.names.map(name => [name]);
    }
  }


  /**
   * @returns {Vector}
   */
  clone() {
    let newItems = [];
    for (let item of this.items) {
      if (item instanceof Vector) {
        newItems.push(item.clone());
      } else {
        newItems.push(item);
      }
    }
    return new Vector(newItems, this.simulate, this.names ? this.names.slice() : undefined, this.parent);
  }

  /**
   * @returns {Vector}
   */
  fullClone() {
    let newItems = [];
    for (let item of this.items) {
      if (item instanceof Vector || item instanceof Material) {
        newItems.push(item.fullClone());
      } else {
        newItems.push(item);
      }
    }
    return new Vector(newItems, this.simulate, this.names ? this.names.slice() : undefined, this.parent);
  }

  /**
   * @param {Vector} vec
   *
   * @returns {boolean}
   */
  equals(vec) {
    if (this.length() !== vec.length()) {
      return false;
    }

    for (let i = 0; i < this.items.length; i++) {
      if (!strictEquals(this.items[i], vec.items[i])) {
        return false;
      }
    }
    return true;
  }
}

