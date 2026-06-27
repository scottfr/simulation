/**
 * @param {import("../Simulator").Simulator} simulate
 */
export function createFunctions(simulate: import("../Simulator").Simulator): void;
/**
 * @param {*} x
 * @param {import("../Simulator").Simulator} simulate
 *
 * @returns
 */
export function makeObjectBase(x: any, simulate: import("../Simulator").Simulator): Vector<{
    (x: any, fingerprint: any, lastSelf: any): any;
    delayEvalParams: any;
}>;
/**
 * @param {string} name
 * @param {DefineFunctionDefinition} definition
 */
export function setFunctionDef(name: string, definition: DefineFunctionDefinition): {
    name: string;
    standardFnName: string;
    objectFnName: string;
    definition: DefineFunctionDefinition;
};
/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {string} name
 * @param {DefineFunctionDefinition} definition
 * @param {function} fn
 */
export function defineFunction(simulate: import("../Simulator").Simulator, name: string, definition: DefineFunctionDefinition, fn: Function): void;
export function testArgumentsSize(x: any, name: any, min: any, max: any): void;
export namespace functionDefs {
    let topLevel: FunctionDefItem;
    let string: FunctionDefItem;
    let vector: FunctionDefItem;
    let primitive: FunctionDefItem;
    let agent: FunctionDefItem;
}
export type DefineFunctionParam = {
    name: string;
    defaultVal?: any | undefined;
    noUnits?: boolean | undefined;
    noVector?: boolean | undefined;
    needVector?: boolean | undefined;
    needNum?: boolean | undefined;
    leafNeedNum?: boolean | undefined;
    vectorize?: boolean | undefined;
    allowBoolean?: boolean | undefined;
    allowString?: boolean | undefined;
    needString?: boolean | undefined;
    needPrimitive?: boolean | undefined;
    allowOptionalPrimitive?: boolean | undefined;
    needAgent?: boolean | undefined;
    needAgents?: boolean | undefined;
    needPopulation?: boolean | undefined;
    implicitFunction?: boolean | undefined;
    injectedVariables?: {
        name: string;
    }[] | undefined;
    /**
     * - don't show defaultVal in function signature, don't show the parameter at all unless the user specifies it
     */
    silentDefault?: boolean | undefined;
};
export type DefineFunctionPrep = (args: any[]) => any;
export type DefineFunctionDefinition = {
    param: DefineFunctionParam;
    allowEmpty?: boolean;
    prep?: DefineFunctionPrep;
    object?: any;
    complete?: boolean;
} | {
    params: DefineFunctionParam[];
    recurse?: boolean;
    prep?: DefineFunctionPrep;
    object?: any;
    complete?: boolean;
};
export type FunctionDefItem = Map<string, {
    name: string;
    standardFnName: string;
    objectFnName: string;
    definition: DefineFunctionDefinition;
}>;
import { Vector } from "./Vector.js";
