

export function isTrue(item) {
  return item === 1 || item === "true" || item === true;
}


/**
 * @param {string} str
 * @returns {string}
 */
export function toHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      "\"": "&quot;",
      "`": "&#96;"
    }[tag]));
}


/**
 * @param {any} nStr
 * @returns {string}
 */
export function commaStr(nStr) {
  if (typeof nStr === "string") {
    return escape(nStr);
  }

  if (typeof nStr === "boolean") {
    return nStr.toString();
  }

  if (nStr === undefined || nStr === null) {
    return "";
  }

  if (nStr >= 1e9 || (nStr <= 1e-9 && nStr !== 0)) {
    return nStr.toPrecision(3);
  } else {
    nStr = round(nStr, 9) + "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    let reg = /(\d+)(\d{3})/;
    while (reg.test(x1)) {
      x1 = x1.replace(reg, "$1,$2");
    }
    return x1 + x2;
  }
}


/**
 * @param {number} value
 * @param {number=} precision
 */
export function round(value, precision = 15) {
  return +value.toPrecision(precision);
}

