
export let fn = {
  /**
   * @param {number} a
   * @param {number} b
   * @returns 
   */
  "+": function (a, b) {
    return a + b;
  },
  
  /**
   * @param {number} a 
   * @param {number=} b 
   * @returns 
   */
  "-": function (a, b) {
    if (b !== undefined) {
      return a - b;
    } else {
      return -a;
    }
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  "*": function (a, b) {
    return a * b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  "/": function (a, b) {
    return a / b;
  },
  
  "=": function (a, b) {
    return a === b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  "<": function (a, b) {
    return a < b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  "<=": function (a, b) {
    return a <= b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  ">": function (a, b) {
    return a > b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  ">=": function (a, b) {
    return a >= b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  "mod": function (a, b) {
    return a % b;
  },

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  "expt": function (a, b) {
    return Math.pow(a, b);
  },
  "abs": Math.abs,
  "sin": Math.sin,
  "asin": Math.asin,
  "cos": Math.cos,
  "acos": Math.acos,
  "tan": Math.tan,
  "atan": Math.atan,
  "sqrt": Math.sqrt,

  /**
   * @param {number} a 
   * @param {number=} b 
   * @returns 
   */
  "log": function (a, b) {
    if (b !== undefined) {
      return Math.log(a) / Math.log(b);
    } else {
      return Math.log(a);
    }
  },
  "exp": Math.exp,
  "round": Math.round,
  "floor": Math.floor,
  "ceiling": Math.ceil
};
