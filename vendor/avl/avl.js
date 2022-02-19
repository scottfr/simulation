// @ts-nocheck

import { print, isBalanced, loadRecursive, markBalance, sort } from "./utils.js";

// function createNode (parent, left, right, height, key, data) {
//   return { parent, left, right, balanceFactor: height, key, data };
// }

/**
 * @typedef {{
 *   parent:        ?Node,
 *   left:          ?Node,
 *   right:         ?Node,
 *   balanceFactor: number,
 *   key:           Key,
 *   data:          Value
 * }} Node
 */

/**
 * @typedef {import("../../src/TaskScheduler").Task} Key
 */

/**
 * @typedef {*} Value
 */

/**
 * Default comparison function
 * @param {Key} a
 * @param {Key} b
 * @returns {number}
 */
function DEFAULT_COMPARE (a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

/**
 * Single left rotation
 * @param  {Node} node
 * @return {Node}
 */
function rotateLeft (node) {
  let rightNode = node.right;
  node.right    = rightNode.left;

  if (rightNode.left) rightNode.left.parent = node;

  rightNode.parent = node.parent;
  if (rightNode.parent) {
    if (rightNode.parent.left === node) {
      rightNode.parent.left = rightNode;
    } else {
      rightNode.parent.right = rightNode;
    }
  }

  node.parent    = rightNode;
  rightNode.left = node;

  node.balanceFactor += 1;
  if (rightNode.balanceFactor < 0) {
    node.balanceFactor -= rightNode.balanceFactor;
  }

  rightNode.balanceFactor += 1;
  if (node.balanceFactor > 0) {
    rightNode.balanceFactor += node.balanceFactor;
  }
  return rightNode;
}

function rotateRight (node) {
  let leftNode = node.left;
  node.left = leftNode.right;
  if (node.left) node.left.parent = node;

  leftNode.parent = node.parent;
  if (leftNode.parent) {
    if (leftNode.parent.left === node) {
      leftNode.parent.left = leftNode;
    } else {
      leftNode.parent.right = leftNode;
    }
  }

  node.parent    = leftNode;
  leftNode.right = node;

  node.balanceFactor -= 1;
  if (leftNode.balanceFactor > 0) {
    node.balanceFactor -= leftNode.balanceFactor;
  }

  leftNode.balanceFactor -= 1;
  if (node.balanceFactor < 0) {
    leftNode.balanceFactor += node.balanceFactor;
  }

  return leftNode;
}

// function leftBalance (node) {
//   if (node.left.balanceFactor === -1) rotateLeft(node.left);
//   return rotateRight(node);
// }

// function rightBalance (node) {
//   if (node.right.balanceFactor === 1) rotateRight(node.right);
//   return rotateLeft(node);
// }

export default class AVLTree {
  /**
   * Callback for comparator
   * @callback comparatorCallback
   * @param {Key} a
   * @param {Key} b
   * @returns {number}
   */

  /**
   * @class AVLTree
   * @constructor
   * @param  {comparatorCallback} [comparator]
   * @param  {boolean}            [noDuplicates=false] Disallow duplicates
   */
  constructor (comparator, noDuplicates = false) {
    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }

  /**
   * Clear the tree
   * @return {AVLTree}
   */
  destroy() {
    return this.clear();
  }

  /**
   * Clear the tree
   * @return {AVLTree}
   */
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }

  /**
   * Number of nodes
   * @return {number}
   */
  get size () {
    return this._size;
  }

  /**
   * Whether the tree contains a node with the given key
   * @param  {Key} key
   * @return {boolean} true/false
   */
  contains (key) {
    if (this._root)  {
      let node       = this._root;
      let comparator = this._comparator;
      while (node)  {
        let cmp = comparator(key, node.key);
        if      (cmp === 0) return true;
        else if (cmp < 0)   node = node.left;
        else                node = node.right;
      }
    }
    return false;
  }

  /* eslint-disable class-methods-use-this */

  /**
   * Successor node
   * @param  {Node} node
   * @return {?Node}
   */
  next (node) {
    let successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor.left) successor = successor.left;
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor; successor = successor.parent;
        }
      }
    }
    return successor;
  }

  /**
   * Predecessor node
   * @param  {Node} node
   * @return {?Node}
   */
  prev (node) {
    let predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor.right) predecessor = predecessor.right;
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Callback for forEach
   * @callback forEachCallback
   * @param {Node} node
   * @param {number} index
   */

  /**
   * @param  {forEachCallback} callback
   * @return {AVLTree}
   */
  forEach(callback) {
    let current = this._root;
    let s = [], done = false, i = 0;

    while (!done) {
      // Reach the left most Node of the current Node
      if (current) {
        // Place pointer to a tree node on the stack
        // before traversing the node's left subtree
        s.push(current);
        current = current.left;
      } else {
        // BackTrack from the empty subtree and visit the Node
        // at the top of the stack; however, if the stack is
        // empty you are done
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);

          // We have visited the node and its left
          // subtree. Now, it's right subtree's turn
          current = current.right;
        } else done = true;
      }
    }
    return this;
  }

  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param  {Key}      low
   * @param  {Key}      high
   * @param  {Function} fn
   * @param  {*?}       ctx
   * @return {SplayTree}
   */
  range(low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root, cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) return this; // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this;
  }

  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
  keys () {
    let current = this._root;
    let s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else done = true;
      }
    }
    return r;
  }

  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
  values () {
    let current = this._root;
    let s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else done = true;
      }
    }
    return r;
  }

  /**
   * Returns node at given index
   * @param  {number} index
   * @return {?Node}
   */
  at (index) {
    // removed after a consideration, more misleading than useful
    // index = index % this.size;
    // if (index < 0) index = this.size - index;

    let current = this._root;
    let s = [], done = false, i = 0;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index) return current;
          i++;
          current = current.right;
        } else done = true;
      }
    }
    return null;
  }

  /**
   * Returns node with the minimum key
   * @return {?Node}
   */
  minNode () {
    let node = this._root;
    if (!node) return null;
    while (node.left) node = node.left;
    return node;
  }

  /**
   * Returns node with the max key
   * @return {?Node}
   */
  maxNode () {
    let node = this._root;
    if (!node) return null;
    while (node.right) node = node.right;
    return node;
  }

  /**
   * Min key
   * @return {?Key}
   */
  min () {
    let node = this._root;
    if (!node) return null;
    while (node.left) node = node.left;
    return node.key;
  }

  /**
   * Max key
   * @return {?Key}
   */
  max () {
    let node = this._root;
    if (!node) return null;
    while (node.right) node = node.right;
    return node.key;
  }

  /**
   * @return {boolean} true/false
   */
  isEmpty() {
    return !this._root;
  }

  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  pop () {
    let node = this._root, returnValue = null;
    if (node) {
      while (node.left) node = node.left;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }

  /**
   * Removes and returns the node with highest key
   * @return {?Node}
   */
  popMax () {
    let node = this._root, returnValue = null;
    if (node) {
      while (node.right) node = node.right;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }

  /**
   * Find node by key
   * @param  {Key} key
   * @return {?Node}
   */
  find (key) {
    let root = this._root;
    // if (root === null)    return null;
    // if (key === root.key) return root;

    let subtree = root, cmp;
    let compare = this._comparator;
    while (subtree) {
      cmp = compare(key, subtree.key);
      if      (cmp === 0) return subtree;
      else if (cmp < 0)   subtree = subtree.left;
      else                subtree = subtree.right;
    }

    return null;
  }

  /**
   * Insert a node into the tree
   * @param  {Key} key
   * @param  {Value} [data]
   * @return {?Node}
   */
  insert (key, data) {
    if (!this._root) {
      this._root = {
        parent: null, left: null, right: null, balanceFactor: 0,
        key, data
      };
      this._size++;
      return this._root;
    }

    let compare = this._comparator;
    let node    = this._root;
    let parent  = null;
    let cmp     = 0;

    if (this._noDuplicates) {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if      (cmp === 0) return null;
        else if (cmp < 0)   node = node.left;
        else                node = node.right;
      }
    } else {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if      (cmp <= 0)  node = node.left; // return null;
        else                node = node.right;
      }
    }

    let newNode = {
      left: null,
      right: null,
      balanceFactor: 0,
      parent, key, data
    };
    let newRoot;
    if (cmp <= 0) parent.left  = newNode;
    else         parent.right = newNode;

    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0) parent.balanceFactor -= 1;
      else         parent.balanceFactor += 1;

      if        (parent.balanceFactor === 0) break;
      else if   (parent.balanceFactor < -1) {
        // inlined
        // var newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) rotateRight(parent.right);
        newRoot = rotateLeft(parent);

        if (parent === this._root) this._root = newRoot;
        break;
      } else if (parent.balanceFactor > 1) {
        // inlined
        // var newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) rotateLeft(parent.left);
        newRoot = rotateRight(parent);

        if (parent === this._root) this._root = newRoot;
        break;
      }
      parent = parent.parent;
    }

    this._size++;
    return newNode;
  }

  /**
   * Removes the node from the tree. If not found, returns null.
   * @param  {Key} key
   * @return {?Node}
   */
  remove (key) {
    if (!this._root) return null;

    let node = this._root;
    let compare = this._comparator;
    let cmp = 0;

    while (node) {
      cmp = compare(key, node.key);
      if      (cmp === 0) break;
      else if (cmp < 0)   node = node.left;
      else                node = node.right;
    }
    if (!node) return null;

    let returnValue = node.key;
    let max, min;

    if (node.left) {
      max = node.left;

      while (max.left || max.right) {
        while (max.right) max = max.right;

        node.key = max.key;
        node.data = max.data;
        if (max.left) {
          node = max;
          max = max.left;
        }
      }

      node.key  = max.key;
      node.data = max.data;
      node = max;
    }

    if (node.right) {
      min = node.right;

      while (min.left || min.right) {
        while (min.left) min = min.left;

        node.key  = min.key;
        node.data = min.data;
        if (min.right) {
          node = min;
          min = min.right;
        }
      }

      node.key  = min.key;
      node.data = min.data;
      node = min;
    }

    let parent = node.parent;
    let pp     = node;
    let newRoot;

    while (parent) {
      if (parent.left === pp) parent.balanceFactor -= 1;
      else                    parent.balanceFactor += 1;

      if        (parent.balanceFactor < -1) {
        // inlined
        // var newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) rotateRight(parent.right);
        newRoot = rotateLeft(parent);

        if (parent === this._root) this._root = newRoot;
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        // inlined
        // var newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) rotateLeft(parent.left);
        newRoot = rotateRight(parent);

        if (parent === this._root) this._root = newRoot;
        parent = newRoot;
      }

      if (parent.balanceFactor === -1 || parent.balanceFactor === 1) break;

      pp     = parent;
      parent = parent.parent;
    }

    if (node.parent) {
      if (node.parent.left === node) node.parent.left  = null;
      else                           node.parent.right = null;
    }

    if (node === this._root) this._root = null;

    this._size--;
    return returnValue;
  }

  /**
   * Bulk-load items
   * @param  {Array<Key>}  keys
   * @param  {Array<Value>}  [values]
   * @param {boolean=} presort
   * @return {AVLTree}
   */
  load(keys = [], values = [], presort = false) {
    if (this._size !== 0) throw new Error("bulk-load: tree is not empty");
    const size = keys.length;
    if (presort) sort(keys, values, 0, size - 1, this._comparator);
    this._root = loadRecursive(null, keys, values, 0, size);
    markBalance(this._root);
    this._size = size;
    return this;
  }

  /**
   * Returns true if the tree is balanced
   * @return {boolean}
   */
  isBalanced() {
    return isBalanced(this._root);
  }

  /**
   * String representation of the tree - primitive horizontal print-out
   * @param  {function(Node):string} [printNode]
   * @return {string}
   */
  toString (printNode) {
    return print(this._root, printNode);
  }
}

AVLTree.default = AVLTree;