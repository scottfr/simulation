/** @template {any} T */
export class Vector<T extends unknown> {
    /**
     * @param {T[]} items
     * @param {import("../Simulator").Simulator} simulate
     * @param {string[]=} names
     * @param {Vector=} parent
     */
    constructor(items: T[], simulate: import("../Simulator").Simulator, names?: string[] | undefined, parent?: Vector<any> | undefined);
    simulate: import("../Simulator").Simulator;
    parent: any;
    items: T[];
    /** @type {string[]} */
    names: string[];
    /** @type {string[]} */
    namesLC: string[];
    /** @type {boolean} */
    isNum: boolean;
    /** @type {boolean} */
    terminateApply: boolean;
    toNum(): Vector<any>;
    /**
     * @returns {string}
     */
    toString(): string;
    /**
     * @returns {number}
     */
    length(): number;
    cloneCombine(other: any, operation: any, rhs: any, noSwitch: any): any;
    combine(other: any, operation: any, rhs: any, noSwitch: any): any;
    collapseDimensions(target: any): any;
    /**
     * @returns {number}
     */
    depth(): number;
    /**
     * @param {string[]} keys
     */
    keysMatch(keys: string[]): boolean;
    /**
     * @param {function} operation
     * @returns
     */
    cloneApply(operation: Function): Vector<any>;
    /**
     * @param {function} operation
     * @returns
     */
    apply(operation: Function): this;
    /**
     * @param {function(Vector): any} operation
     *
     * @returns {Vector}
     */
    stackApply(operation: (arg0: Vector<any>) => any): Vector<any>;
    /**
     * @param {any[]=} selector
     *
     * @returns
     */
    stack(selector?: any[] | undefined): any;
    select(selector: any): import("../SharedTypes.js").VectorElementType;
    /**
     * @param {function} operation
     *
     * @returns {Vector}
     */
    recurseApply(operation: Function): Vector<any>;
    /**
     * @param {function} operation
     */
    recurseEach(operation: Function): void;
    /**
     * @returns {any[]}
     */
    fullNames(): any[];
    /**
     * @returns {Vector}
     */
    clone(): Vector<any>;
    /**
     * @returns {Vector}
     */
    fullClone(): Vector<any>;
    /**
     * @param {Vector} vec
     *
     * @returns {boolean}
     */
    equals(vec: Vector<any>): boolean;
}
export type VectorElementType = import("../SharedTypes.js").VectorElementType;
