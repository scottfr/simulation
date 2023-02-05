export class DNA {
  /**
   * @param {import("./api/Blocks").Primitive} primitive
   * @param {string=} id
   */
  constructor(primitive, id) {
    this.primitive = primitive;

    /** @type {string} */
    this.id = id || primitive.id;

    /** @type {string} */
    this.name = primitive.name;

    /** @type {import('./formula/Units').UnitStore} */
    this.units = null;

    /** @type {import('./Simulator').SolverType} */
    this.solver = undefined;

    /** @type {boolean} */
    this.frozen = undefined;

    /** @type {boolean} */
    this.slider = undefined;

    /** @type {string} */
    this.targetId = undefined;

    /** @type {string} */
    this.sourceId = undefined;

    /** @type {any} */
    this.value = undefined;

    /** @type {TriggerType} */
    this.trigger = undefined;

    /** @type {boolean} */
    this.repeat = undefined;

    /** @type {import("./formula/Material").Material} */
    this.delay = undefined;

    /** @type {StockTypeType} */
    this.stockType = undefined;

    /** @type {boolean} */
    this.recalculate = undefined;

    /** @type {boolean} */
    this.nonNegative = undefined;

    /** @type {import("./formula/Material").Material} */
    this.residency = undefined;

    /** @type {string} */
    this.source = undefined;

    /** @type {string} */
    this.interpolation = undefined;

    /** @type {any} */
    this.triggerValue = undefined;

    /** @type {import("./formula/Material").Material[]} */
    this.inputs = undefined;

    /** @type {import("./formula/Material").Material[]} */
    this.outputs = undefined;

    /** @type {boolean} */
    this.flowUnitless = undefined;

    /** @type {boolean} */
    this.useMaxConstraint = undefined;

    /** @type {boolean} */
    this.useMinConstraint = undefined;

    /** @type {any} */
    this.minConstraint = undefined;

    /** @type {number} */
    this.maxConstraint = undefined;

    /** @type {number} */
    this.toBase = undefined;

    /** @type {boolean} */
    this.unitless = undefined;

    /** @type {any} */
    this.equation = undefined;

    /** @type {import('./Primitives').SPopulation} */
    this.agents = undefined;

    // Don't display in any outputs
    /** @type {boolean} */
    this.noOutput = false;

    /** @type {DNA} */
    this.neighborProxyDNA = null;

    /** @type {import("./api/Blocks").Primitive[]} */
    this.extraLinksPrimitives = [];

    // Adopt material units on first calculation
    /** @type {boolean} */
    this.adoptUnits = false;
  }
}