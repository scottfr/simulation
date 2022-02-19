import { SAgent } from "../Primitives.js";
import { eq, toNum } from "./Formula.js";
import { Material } from "./Material.js";
import { ModelError } from "./ModelError.js";
import { Vector } from "./Vector.js";


/**
 * @param {*} x
 * @param {import("../Simulator").Simulator} simulate
 */
export function stringify(x, simulate) {
  if (x instanceof Vector) {
    return x.recurseApply((x) => stringify(x, simulate));
  }
  let res = new String(x);
  // @ts-ignore
  res.parent = simulate.varBank["stringbase"];
  return res;
}



/**
 * @param {*} mat
 * @param {import("../Simulator").Simulator} simulate
 * @param {*} items
 * @param {*} fill
 */
export function selectFromMatrix(mat, simulate, items, fill) {

  let selectorCount = items.length;

  function vectorize(m) {
    if (!(m instanceof Vector)) {
      if (items[0] === "*") {
        if (m instanceof Material) {
          throw new ModelError("Can't use * selector on a number.", {
            code: 3000
          });
        } else if (m instanceof Boolean || typeof m === "boolean") {
          throw new ModelError("Can't use * selector on an boolean.", {
            code: 3001
          });
        } else if (m instanceof String || typeof m === "string") {
          throw new ModelError("Can't use * selector on an string.", {
            code: 3002
          });
        } else {
          throw new ModelError("Can't use * selector on an object.", {
            code: 3003
          });
        }
      }
      if (m.vector) {
        m = m.vector;
      } else if (m.parent) {
        m = new Vector([], simulate, [], m.parent);
      }
    }
    if (fill === undefined && m.fullClone) {
      m = m.fullClone();
    }
    return m;
  }


  let m = vectorize(mat);

  let root = selectFromVector(m, simulate, items.shift(), !items.length ? fill : undefined, fill !== undefined);
  let children = [];
  if (root.collapsed) {
    children = [root.data];
  } else {
    if (!root.data.items) {
      throw new ModelError(`No element available for selector ${selectorCount - items.length + 1}`, {
        code: 3004
      });
    }
    children = root.data.items;
  }

  while (items.length) {
    let newChildren = [];
    let selector = items.shift();
    for (let i = 0; i < children.length; i++) {
      if (!(children[i] instanceof Vector)) {
        throw new ModelError(`No element available for selector ${selectorCount - items.length}`, {
          code: 3005
        });
      }

      let vec = selectFromVector(children[i], simulate, selector, !items.length ? fill : undefined);

      if (vec.collapsed) {

        if (!fill) {
          children[i].items = [vec.data];
          children[i].names = ["!!BREAKOUT DATA"];
        }

        newChildren = newChildren.concat(vec.data);
      } else {
        newChildren = newChildren.concat(vec.data.items);

        if (!fill) {
          children[i].items = vec.data.items;
          children[i].names = vec.data.names;
        }
      }
    }
    children = newChildren;
  }

  return doBreakouts(root.data);
}


function doBreakouts(vec) {
  if (!(vec instanceof Vector)) {
    return vec;
  }
  if (vec.items.length === 1 && vec.names && vec.names[0] === "!!BREAKOUT DATA") {
    return doBreakouts(vec.items[0]);
  }
  for (let i = 0; i < vec.items.length; i++) {
    vec.items[i] = doBreakouts(vec.items[i]);
  }
  return vec;
}


/**
 * @param {*} vec
 * @param {import("../Simulator").Simulator} simulate
 * @param {*} items
 * @param {*} fill
 * @param {*=} doNotClone
 */
export function selectFromVector(vec, simulate, items, fill, doNotClone) {
  if (items === "*") {
    return { data: vec };
  } else if (typeof items === "function") {
    return { data: items([vec]), collapsed: true };
  } else if (items === "parent") {
    if (vec.parent) {
      return { data: doNotClone ? vec.parent : vec.parent.fullClone(), collapsed: true };
    } else {
      throw new ModelError("Vector does not have a parent.", {
        code: 3006
      });
    }
  }

  if (items instanceof Vector) {
    let res = [];
    let names = vec.names ? [] : undefined;
    for (let i = 0; i < items.items.length; i++) {
      let v = items.items[i];
      let shouldSelect = true;
      if (typeof v === "boolean") {
        if (v) {
          v = new Material(i + 1);
        } else {
          shouldSelect = false;
        }
      }
      if (shouldSelect) {
        let r = selectElementFromVector(vec, v, fill);
        res.push(r.value);
        if (names) {
          names.push(r.name);
        }
      }
    }
    return { collapsed: false, parent: vec, data: new Vector(res, simulate, names, vec.parent) };
  } else {
    return { collapsed: true, parent: vec, data: selectElementFromVector(vec, items, fill).value };
  }
}


/**
 * @param {Vector} vec
 * @param {any} item
 * @param {any} fill
 *
 * @returns {any}
 */
function selectElementFromVector(vec, item, fill) {
  let name = undefined;
  let value = undefined;

  let index;


  if (typeof item === "string" || item instanceof String) {
    try {
      if (fill === undefined) {
        if (!vec.names) {
          if (vec.parent) {
            return selectElementFromVector(vec.parent, item, fill);
          } else {
            throw new ModelError(`Key '${item}' not in vector.`, {
              code: 3007
            });
          }
        }
      }
      if (vec.names) {
        index = -1;
        let lc = item.toLowerCase();
        for (let i = 0; i < vec.names.length; i++) {
          if (vec.names[i] && vec.names[i].toLowerCase() === lc) {
            index = i;
            break;
          }
        }
        if (index < 0) {
          index = vec.names.indexOf("*");
        }
      }
      if (index < 0 || index === undefined) {
        if (fill === undefined) {
          if (vec.parent) {
            return selectElementFromVector(vec.parent, item, fill);
          } else {
            throw new ModelError(`Key '${item}' not in vector.`, {
              code: 3008
            });
          }
        } else {
          index = item;
        }

      }
    } catch (err) {
      if (vec.parent) {
        return selectElementFromVector(vec.parent, item, fill);
      } else {
        throw err;
      }
    }

  } else {
    index = parseFloat(toNum(item)) - 1;
  }

  if (index instanceof String || typeof index === "string") {
    if (!vec.names) {
      vec.names = [];
      for (let i = 0; i < vec.items.length; i++) {
        vec.names.push(undefined);
      }
    }
    vec.items.push(fill);
    vec.names.push(index.valueOf());
    value = fill;
    name = index;

  } else {
    if (index < 0 || !vec.items || index >= vec.items.length || index % 1 !== 0) {
      throw new ModelError("Index " + (1 + index) + " is not in the vector.", {
        code: 3009
      });
    }
    if (fill !== undefined) {
      vec.items[index] = fill;
    }
    value = vec.items[index];
    if (vec.names) {
      name = vec.names[index];
    }
  }

  return { name: name, value: value };
}


export function strictEquals(a, b) {
  if (a instanceof SAgent || b instanceof SAgent) {
    if (a instanceof SAgent && b instanceof SAgent) {
      if (a.instanceId === b.instanceId) {
        return true;
      }
    }
  } else if (a instanceof Vector || b instanceof Vector) {
    if (a instanceof Vector && b instanceof Vector) {
      if (a.equals(b)) {
        return true;
      }
    }
  } else if (eq(a, b)) {
    return true;
  }
  return false;
}

