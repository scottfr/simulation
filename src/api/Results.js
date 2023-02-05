import { Vector } from "../formula/Vector.js";


export class Results {
  /**
   * @param {import("../Simulator").ResultsType} data
   * @param {Object<string, string>} nameIdMapping
   */
  constructor(data, nameIdMapping) {
    this._data = data;
    this._nameIdMapping = nameIdMapping;
    this.timeUnits = data.timeUnits;

    for (let i = 0; i < this._data.data.length; i++) {
      let current = this._data.data[i];
      for (let key in current) {
        current[key] = simplifyResults(current[key]);
      }
    }
  }

  times() {
    return this._data.times.slice();
  }

  /**
   * @param {import("./Blocks").Primitive[]=} primitives
   */
  table(primitives) {
    if (primitives) {
      let series = primitives.map(x => ({ primitive: x, series: this.series(x) }));
      let times = this.times();

      let res = [];
      for (let i = 0; i < times.length; i++) {
        let data = {
          _time: times[i],
        };
        for (let item of series) {
          data[item.primitive.name] = item.series[i];
        }
        res.push(data);
      }

      return res;
    } else {
      let res = [];
      for (let i = 0; i < this._data.data.length; i++) {
        let data = {};
        data._time = this._data.times[i];

        let current = this._data.data[i];
        for (let id in current) {
          data[this._nameIdMapping[id]] = current[id];
        }
        res.push(data);
      }
      return res;
    }
  }

  /**
   * @param {import("./Blocks").Primitive} primitive
   */
  series(primitive) {
    return this._data.value(primitive._node).slice();
  }

  /**
   * @param {import("./Blocks").Primitive} primitive
   * @param {number=} time - if omitted, the last available value
   */
  value(primitive, time = null) {
    let series = this.series(primitive);
    if (time === null) {
      return series[series.length - 1];
    }

    let times = this.times();

    let index = times.indexOf(time);
    if (index === -1) {
      throw new Error("Could not find time: " + time + ". Available options are: " + JSON.stringify(times));
    }

    return series[index];
  }
}


function simplifyResults(x) {
  if (x instanceof Vector) {
    if (x.names) {
      let res = {};
      for (let i = 0; i < x.names.length; i++) {
        res[x.names[i]] = simplifyResults(x.items[i]);
      }
      return res;
    } else {
      return x.items.map(simplifyResults);
    }
  }

  return x;
}