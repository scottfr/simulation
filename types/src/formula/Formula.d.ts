/**
 * @param {import("../Simulator").Simulator} simulate
 */
export function bootCalc(simulate: import("../Simulator").Simulator): void;
/**
 * @template {any} T
 * @param {T} x
 * @returns {T extends Vector ? Vector : (T extends Material ? Material : (T extends SPrimitive ? Material : any))}
 */
export function toNum<T extends unknown>(x: T): T extends Vector<any> ? Vector<any> : (T extends Material ? Material : (T extends SPrimitive ? Material : any));
/**
 * @param {string} input
 * @param {string} source
 * @param {import("../Simulator").Simulator} simulate
 * @returns
 */
export function createTree(input: string, source: string, simulate: import("../Simulator").Simulator): any;
/**
 * @param {Object} root
 * @param {Map} nodeBase
 * @param {import("../Simulator").Simulator} simulate
 */
export function trimTree(root: Object, nodeBase: Map<any, any>, simulate: import("../Simulator").Simulator): any;
/**
 * @param {Object} root
 * @param {Map} varBank
 * @param {import("../Simulator").Simulator} simulate
 */
export function evaluateTree(root: Object, varBank: Map<any, any>, simulate: import("../Simulator").Simulator): any;
/**
 * @template {Material|Vector} T
 *
 * @param {T} x
 *
 * @returns {T extends Vector ? Vector : Material}
 */
export function negate<T extends Material | Vector<any>>(x: T): T extends Vector<any> ? Vector<any> : Material;
export function fNot(x: any): boolean | Vector<any>;
/**
 * @param {ValueType|string|number} lhs
 * @param {ValueType|string|number} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 *
 * @returns {boolean}
 */
export function neq(lhs: ValueType | string | number, rhs: ValueType | string | number, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined): boolean;
/**
 * @param {ValueType|string|number} lhs
 * @param {ValueType|string|number} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 * @param {boolean=} allowVectorReturn
 * @returns {boolean}
 */
export function eq(lhs: ValueType | string | number, rhs: ValueType | string | number, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined, allowVectorReturn?: boolean | undefined): boolean;
/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 *
 * @returns {boolean}
 */
export function lessThan(lhs: ValueType, rhs: ValueType, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined): boolean;
/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 *
 * @returns {boolean}
 */
export function lessThanEq(lhs: ValueType, rhs: ValueType, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined): boolean;
/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 * @returns {boolean}
 */
export function greaterThan(lhs: ValueType, rhs: ValueType, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined): boolean;
/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 * @returns {boolean}
 */
export function greaterThanEq(lhs: ValueType, rhs: ValueType, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined): boolean;
/**
 * @template {Material|Vector|String} L
 * @template {Material|Vector|String} R
 *
 * @param {L} lhs
 * @param {R} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 * @param {import("../Simulator").Simulator=} simulate
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : (L extends string ? string: (R extends string ? string : Material)))}
 */
export function plus<L extends Material | Vector<any> | string, R extends Material | Vector<any> | string>(lhs: L, rhs: R, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined, simulate?: import("../Simulator").Simulator | undefined): L extends Vector<any> ? Vector<any> : (R extends Vector<any> ? Vector<any> : (L extends string ? string : (R extends string ? string : Material)));
/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 * @param {TreeNode=} lhsNode
 * @param {TreeNode=} rhsNode
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function minus<L extends Material | Vector<any>, R extends Material | Vector<any>>(lhs: L, rhs: R, lhsNode?: TreeNode | undefined, rhsNode?: TreeNode | undefined): L extends Vector<any> ? Vector<any> : (R extends Vector<any> ? Vector<any> : Material);
/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function mult<L extends Material | Vector<any>, R extends Material | Vector<any>>(lhs: L, rhs: R): L extends Vector<any> ? Vector<any> : (R extends Vector<any> ? Vector<any> : Material);
/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function div<L extends Material | Vector<any>, R extends Material | Vector<any>>(lhs: L, rhs: R): L extends Vector<any> ? Vector<any> : (R extends Vector<any> ? Vector<any> : Material);
/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function power<L extends Material | Vector<any>, R extends Material | Vector<any>>(lhs: L, rhs: R): L extends Vector<any> ? Vector<any> : (R extends Vector<any> ? Vector<any> : Material);
/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function doMod<L extends Material | Vector<any>, R extends Material | Vector<any>>(lhs: L, rhs: R): L extends Vector<any> ? Vector<any> : (R extends Vector<any> ? Vector<any> : Material);
/**
 * @param {*} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
export function evaluateNode(node: any, scope: Map<any, any>, simulate: import("../Simulator").Simulator): any;
export function trueValue(q: any): boolean;
/** @typedef {import("../SharedTypes.js").ValueType} ValueType */
export const PARENT_SYMBOL: unique symbol;
export class PrimitiveStore {
    /**
     * @param {any} primitive
     * @param {string} type
     */
    constructor(primitive: any, type: string);
    primitive: any;
    type: string;
}
export class UserFunction {
    localScope: any;
    defaults: any;
    fn: any;
    toNum(): any;
}
export let StringObject: any;
export let VectorObject: any;
export class TreeNode {
    /**
     * @param {string} text
     * @param {string} typeName
     * @param {{ line: number, source: string }} position
     * @param {any[]=} children
     */
    constructor(text: string, typeName: string, position: {
        line: number;
        source: string;
    }, children?: any[] | undefined);
    origText: string;
    text: string;
    typeName: string;
    position: {
        line: number;
        source: string;
    };
    children: any[];
    /** @type {string} */
    functionFingerprint: string;
    /** @type {boolean} */
    delayEvalParams: boolean;
    cloneStructure(): TreeNode;
}
export type ValueType = import("../SharedTypes.js").ValueType;
import { Vector } from "./Vector.js";
import { Material } from "./Material.js";
import { SPrimitive } from "../Primitives.js";
