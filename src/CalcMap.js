
export let fn = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    if (b !== undefined) {
      return a - b;
    } else {
      return -a;
    }
  },
  "*": function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    return a / b;
  },
  "=": function (a, b) {
    return a === b;
  },
  "<": function (a, b) {
    return a < b;
  },
  "<=": function (a, b) {
    return a <= b;
  },
  ">": function (a, b) {
    return a > b;
  },
  ">=": function (a, b) {
    return a >= b;
  },
  "mod": function (a, b) {
    return a % b;
  },
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
