/** @typedef {import("./SharedTypes.js").GraphNode} GraphNode */
/** @typedef {import("./SharedTypes.js").PrimitiveNameType} PrimitiveNameType */
export function modelNodeClone(node: any, parent: any): ModelNode;
/**
 * @param {ModelNode} root
 * @param {PrimitiveNameType|PrimitiveNameType[]=} type
 *
 * @returns {GraphNode[]}
 */
export function primitives(root: ModelNode, type?: (PrimitiveNameType | PrimitiveNameType[]) | undefined): GraphNode[];
export class ModelNode {
    attributes: Map<any, any>;
    /** @type {ModelNode} */
    parent: ModelNode;
    /** @type {ModelNode[]} */
    children: ModelNode[];
    /** @type {string} */
    id: string;
    /** @type {{ nodeName: string }} */
    value: {
        nodeName: string;
    };
    /** @type {Primitive} */
    _primitive: Primitive;
    /** @type {ModelNode} */
    source: ModelNode;
    /** @type {ModelNode} */
    target: ModelNode;
    geometry: {
        x: number;
        y: number;
        width: number;
        height: number;
        sourcePoint: null;
        targetPoint: null;
    };
    /** @type {string} */
    style: string;
    /**
     * @param {import("./api/Model").Model} model
     * @param {*} config
     * @returns {Primitive}
     */
    primitive(model: import("./api/Model").Model, config?: any): Primitive;
    /**
     * @param {ModelNode} newChild
     */
    addChild(newChild: ModelNode): void;
    /**
     * @param {string} x
     * @returns {string}
     */
    getAttribute(x: string): string;
    setAttribute(x: any, value: any): void;
    getValue(): {
        removeAttribute: (name: any) => boolean;
    };
    toString(indent?: number): any;
}
export type GraphNode = import("./SharedTypes.js").GraphNode;
export type PrimitiveNameType = import("./SharedTypes.js").PrimitiveNameType;
import { Primitive } from "./api/Blocks.js";
