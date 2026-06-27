/** @typedef {import("./SharedTypes.js").GraphNode} GraphNode */
/**
 * @typedef {SPopulation & { node?: import("./api/Blocks").Primitive }} SubModelType
 */
/**
 * @typedef {object} ModelType
 * @property {Object<string, import("./Simulator").SolverType>=} solvers
 * @property {Object<string, SubModelType>=} submodels
 * @property {Material=} timeLength
 * @property {Material=} timeStart
 * @property {Material=} timeStep
 * @property {Material=} timePause
 * @property {import("./formula/Units.js").UnitStore} timeUnits
 */
/**
 * @typedef {object} SimulationConfigType
 * @property {boolean=} silent
 * @property {function(import("./Simulator").SolverType)=} onStep
 * @property {function(import("./Simulator").ResultsType)=} onPause
 * @property {function(import("./Simulator").ResultsType)=} onSuccess
 * @property {function(import("./Simulator").ResultsType)=} onError
 * @property {function(string, "error"|"warning"|"notice"|"success"=)=} showNotification
 * @property {function=} processError
 * @property {function=} showMacros
 * @property {function=} handleErrorObject
 * @property {function=} onCompletedFirstPass
 * @property {function(Primitive)=} getColor
 * @property {function(Primitive)=} getIcon
 * @property {any=} resultsWindow
 * @property {GraphNode=} selectedDisplay
 * @property {number=} rate
 * @property {function=} createResultsWindow
 * @property {import("./api/Model.js").Model=} model
 * @property {boolean=} pauseEachTimeStep - if true, will pause each step (including the start)
 */
/**
 * @param {SimulationConfigType} config
 *
 * @returns
 */
export function runSimulation(config: SimulationConfigType): import("./Simulator.js").ResultsType | undefined;
/**
 * @param {*} err
 * @param {*} config
 * @param {import("./Simulator").Simulator} simulate
 * @returns
 */
export function checkErr(err: any, config: any, simulate: import("./Simulator").Simulator): import("./Simulator.js").ResultsType | undefined;
/**
 * @param {any} x
 * @param {boolean=} removeVectors - if true, Vectors will be converted to basic types
 *
 * @returns
 */
export function cleanData(x: any, removeVectors?: boolean | undefined): any;
/**
 * @param {import("./Simulator").ResultsType} res
 *
 * @returns {import("./Simulator").ResultsType}
 */
export function formatSimResults(res: import("./Simulator").ResultsType): import("./Simulator").ResultsType;
/**
 * @param {string} u
 * @param {import("./Simulator").Simulator} simulate
 * @param {import("./api/Blocks.js").Primitive=} primitive
 *
 * @returns {import('./formula/Units').UnitStore}
 */
export function createUnitStore(u: string, simulate: import("./Simulator").Simulator, primitive?: import("./api/Blocks.js").Primitive | undefined): import("./formula/Units").UnitStore;
/**
 * @param {string} eq
 * @param {import("./Simulator").Simulator} simulate
 * @param {Map=} scope
 * @param {Map=} nodeBase
 * @param {object=} tree
 */
export function simpleEquation(eq: string, simulate: import("./Simulator").Simulator, scope?: Map<any, any> | undefined, nodeBase?: Map<any, any> | undefined, tree?: object | undefined): any;
/**
 * @template {Material|Vector} T
 * @param {T} mat
 * @param {import('./formula/Units').UnitStore} units
 * @param {import('./Simulator').Simulator} simulate
 *
 * @returns {T extends Vector ? Vector : number}
 */
export function simpleNum<T extends Material | Vector<any>>(mat: T, units: import("./formula/Units").UnitStore, simulate: import("./Simulator").Simulator): T extends Vector<any> ? Vector<any> : number;
/**
 * @template {Material|Vector} T
 * @param {T} mat
 * @param {import('./formula/Units').UnitStore} units
 * @param {import("./Simulator").Simulator} simulate
 * @param {(SPrimitive|import("./api/Blocks").Primitive)=} primitive
 * @param {boolean=} showEditor
 * @param {string=} fallbackError
 *
 * @returns {T extends Vector ? Vector : Material}
 */
export function simpleUnitsTest<T extends Material | Vector<any>>(mat: T, units: import("./formula/Units").UnitStore, simulate: import("./Simulator").Simulator, primitive?: (SPrimitive | import("./api/Blocks").Primitive) | undefined, showEditor?: boolean | undefined, fallbackError?: string | undefined): T extends Vector<any> ? Vector<any> : Material;
/**
 * @param {DNA} dna
 * @param {SAgent} agent
 * @param {import("./Simulator").Simulator} simulate
 * @param {boolean} inContainer
 */
export function decodeDNA(dna: DNA, agent: SAgent, simulate: import("./Simulator").Simulator, inContainer: boolean): void;
/**
 * @param {import("./Primitives").SPrimitive} primitive
 * @param {DNA} dna
 * @param {import("./Simulator").Simulator} simulate
 */
export function linkPrimitive(primitive: import("./Primitives").SPrimitive, dna: DNA, simulate: import("./Simulator").Simulator): void;
/**
 * @param {SAgent} agent
 */
export function setAgentInitialValues(agent: SAgent): void;
/**
 * @param {import("./Primitives").SPrimitive} primitive
 * @param {DNA} dna
 * @param {import("./Simulator").Simulator} simulate
 * @param {Primitive[]} extraLinksPrimitives
 * @param {boolean=} useIdKeys - use id's as the keys in the returned Map instead of names
 *
 * @returns {Map<string, import('./Primitives').SPrimitive>}
 */
export function getPrimitiveNeighborhood(primitive: import("./Primitives").SPrimitive, dna: DNA, simulate: import("./Simulator").Simulator, extraLinksPrimitives: Primitive[], useIdKeys?: boolean | undefined): Map<string, import("./Primitives").SPrimitive>;
/**
 * @param {import("./Simulator").SolverType} solver
 * @param {import("./Simulator").Simulator} simulate
 */
export function updateDisplayed(solver: import("./Simulator").SolverType, simulate: import("./Simulator").Simulator): void;
export function validateAgentLocation(location: any, primitive: any): void;
export const DUPLICATE_PRIMITIVE_NAMES: unique symbol;
export type GraphNode = import("./SharedTypes.js").GraphNode;
export type SubModelType = SPopulation & {
    node?: import("./api/Blocks").Primitive;
};
export type ModelType = {
    solvers?: {
        [x: string]: import("./Simulator").SolverType;
    } | undefined;
    submodels?: {
        [x: string]: SubModelType;
    } | undefined;
    timeLength?: Material | undefined;
    timeStart?: Material | undefined;
    timeStep?: Material | undefined;
    timePause?: Material | undefined;
    timeUnits: import("./formula/Units.js").UnitStore;
};
export type SimulationConfigType = {
    silent?: boolean | undefined;
    onStep?: ((arg0: import("./Simulator").SolverType) => any) | undefined;
    onPause?: ((arg0: import("./Simulator").ResultsType) => any) | undefined;
    onSuccess?: ((arg0: import("./Simulator").ResultsType) => any) | undefined;
    onError?: ((arg0: import("./Simulator").ResultsType) => any) | undefined;
    showNotification?: ((arg0: string, arg1: ("error" | "warning" | "notice" | "success") | undefined) => any) | undefined;
    processError?: Function | undefined;
    showMacros?: Function | undefined;
    handleErrorObject?: Function | undefined;
    onCompletedFirstPass?: Function | undefined;
    getColor?: ((arg0: Primitive) => any) | undefined;
    getIcon?: ((arg0: Primitive) => any) | undefined;
    resultsWindow?: any | undefined;
    selectedDisplay?: GraphNode | undefined;
    rate?: number | undefined;
    createResultsWindow?: Function | undefined;
    model?: import("./api/Model.js").Model | undefined;
    /**
     * - if true, will pause each step (including the start)
     */
    pauseEachTimeStep?: boolean | undefined;
};
import { Material } from "./formula/Material.js";
import { Vector } from "./formula/Vector.js";
import { SPrimitive } from "./Primitives.js";
import { DNA } from "./DNA.js";
import { SAgent } from "./Primitives.js";
import { Primitive } from "./api/Blocks.js";
import { SPopulation } from "./Primitives.js";
