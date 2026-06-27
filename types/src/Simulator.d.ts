/**
 * @typedef {object} SolverType
 * @property {string=} SolverType.id
 * @property {string=} SolverType.algorithm
 * @property {number=} SolverType.maxLoaded
 * @property {number=} SolverType.RKOrder
 * @property {number=} SolverType.RKPosition
 * @property {boolean=} SolverType.completedFirstPass
 * @property {Material=} SolverType.timeStep
 * @property {Material=} SolverType.userTimeStep
 * @property {import('./Primitives').SStock[]=} SolverType.stocks
 * @property {import('./Primitives').SFlow[]=} SolverType.flows
 * @property {import('./Primitives').SAction[]=} SolverType.actions
 * @property {import('./Primitives').STransition[]=} SolverType.transitions
 * @property {import('./Primitives').SState[]=} SolverType.states
 * @property {import('./Primitives').SPrimitive[]=} SolverType.valued
 * @property {import('./Primitives').SPrimitive[]=} SolverType.displayed
 */
/**
 * @typedef {object} ResultsType
 * @property {number[]=} times
 * @property {string=} timeUnits
 * @property {any=} window
 * @property {ResultsDataType[]=} data
 * @property {boolean=} stochastic
 * @property {string=} error
 * @property {string=} errorSource
 * @property {import("./api/Blocks").Primitive=} errorPrimitive
 * @property {number=} errorLine
 * @property {number=} errorCode
 * @property {function=} value
 * @property {function=} lastValue
 * @property {number=} periods
 * @property {function=} resume
 * @property {function=} setValue
 * @property {Object<string, { indexedNames?: string[], indexedFullNames?: any[], results?: ResultsResultsType[], states?: Set<string>, dataMode?: "auto"|"agents"|"float", data?: ResultsDataType}>=} children
 */
/**
 * @typedef {object} AgentResultsType
 * @property {string} id
 * @property {import("./api/Blocks").Population} item
 * @property {ResultsDataType} data
 * @property {ResultsResultsType} results
 */
/**
 * @typedef {object} ResultsDataType
 */
/**
 * @typedef {object} ResultsResultsType
 */
/**
 * @typedef {object} DisplayInformationType
 * @property {boolean=} populated
 * @property {string[]=} ids
 * @property {string[]=} colors
 * @property {string[]=} icons
 * @property {string[]=} headers
 * @property {AgentResultsType[]=} agents
 * @property {{header: string, id: string, type: string, icon: string}[]=} displayedItems
 * @property {function[]=} renderers
 * @property {string[]=} elementIds
 * @property {ResultsType=} res
 * @property {number[]=} times
 * @property {SPrimitive[]=} objects
 * @property {string[]=} origIds
 * @property {any=} store
 * @property {any=} scripter
 * @property {any[]=} maps
 * @property {any[]=} histograms
 */
export class Simulator {
    resultsWindow: any;
    /** @type {function} */
    setResultsCallback: Function;
    /** @type {function} */
    setStatusCallback: Function;
    /** @type {function} */
    finished: Function;
    /** @type {"RUNNING"|"PAUSED"|"TERMINATED"} */
    status: "RUNNING" | "PAUSED" | "TERMINATED";
    /** @type {boolean} */
    valueChange: boolean;
    /** @type {import("./Primitives").SState[]} */
    transitionPrimitives: import("./Primitives").SState[];
    /** @type {number} */
    timer: number;
    /** @type {DisplayInformationType} */
    displayInformation: DisplayInformationType;
    randLoc: number;
    /** @type {import("./api/Model.js").Model} */
    model: import("./api/Model.js").Model;
    lastRandPos: number;
    /** @type {import("./formula/Rand").RandList[]} */
    previousRandLists: import("./formula/Rand").RandList[];
    /** @type {Set<SPrimitive>} */
    valuedPrimitives: Set<SPrimitive>;
    /** @type {Set<SPrimitive>} */
    evaluatedPrimitives: Set<SPrimitive>;
    /** @type {Object<string, Material>} */
    distanceCache: {
        [x: string]: Material;
    };
    /** @type {number} */
    distanceCacheCount: number;
    /** @type {Object<string, any[]>} */
    sliders: {
        [x: string]: any[];
    };
    /** @type {Object<string, number>} */
    ids: {
        [x: string]: number;
    };
    timeToStateMapping: Map<any, any>;
    idCount: number;
    stochastic: boolean;
    /** @type {number} */
    RKOrder: number;
    /** @type {import("./Modeler").SimulationConfigType=} */
    config: import("./Modeler").SimulationConfigType | undefined;
    /** @type {ResultsType} */
    results: ResultsType;
    /** @type {{ line: number, source: string }} */
    evaluatingPosition: {
        line: number;
        source: string;
    };
    /** @type {Map<import("./formula/Formula.js").PARENT_SYMBOL|string, any>} */
    coreBank: Map<typeof PARENT_SYMBOL | string, any>;
    /** @type {Map<import("./formula/Formula.js").PARENT_SYMBOL|string, any>} */
    varBank: Map<typeof PARENT_SYMBOL | string, any>;
    unitManager: UnitManager;
    /** @type {function} */
    random: Function;
    /** @type {Object<string, { cluster: number, flow: number }>} */
    clusters: {
        [x: string]: {
            cluster: number;
            flow: number;
        };
    };
    /** @type {string} */
    timeUnitsString: string;
    /**
     * @param {import('./Modeler').ModelType} model
     */
    setup(model: import("./Modeler").ModelType): void;
    simulationModel: import("./Modeler.js").ModelType | undefined;
    solversCompletedFirstPass: number | undefined;
    timeStart: Material | undefined;
    timeLength: Material | undefined;
    timePause: Material | undefined;
    timeEnd: Material | undefined;
    timeStep: Material | undefined;
    userTimeStep: Material | undefined;
    timeStepCount: number | undefined;
    timeUnits: import("./formula/Units.js").UnitStore | undefined;
    /** @type {Map<string, import("./AggregateSeries").AggregateSeries>} */
    aggregateSeries: Map<string, import("./AggregateSeries").AggregateSeries> | undefined;
    tasks: TaskQueue | undefined;
    /**
     * @param {string} x
     * @returns {number}
     */
    getID(x: string): number;
    time(): Material;
    timeProgressed(): Material | Vector<any>;
    /**
     * @param {SPrimitive[]} valued
     * @param {SPrimitive[]} displayed
     */
    frame(valued: SPrimitive[], displayed: SPrimitive[]): void;
    /**
     * @param {SolverType} solver
     */
    step(solver: SolverType): void;
    sleep(shouldUpdateValues: any): void;
    shouldSleep: boolean | undefined;
    shouldUpdateValues: any;
    resume(): ResultsType | undefined;
    completed(): boolean;
    terminate(): void;
    terminated: boolean | undefined;
    setStatus(s: any): void;
    /**
     * @param {import("./Modeler").SimulationConfigType=} config
     * @returns
     */
    run(config?: import("./Modeler").SimulationConfigType | undefined): ResultsType | undefined;
    wakeUpTime: number | undefined;
    progress(): any;
    /**
     * @param {SPrimitive[]} displayed
     */
    printStates(displayed: SPrimitive[]): void;
    /**
     * @param {SPrimitive} v
     * @param {Material} x
     *
     * @return {number}
     */
    adjustNum(v: SPrimitive, x: Material): number;
    /**
     * @param {SolverType} solver
     */
    createSolver(solver: SolverType): void;
}
export type SolverType = {
    id?: string | undefined;
    algorithm?: string | undefined;
    maxLoaded?: number | undefined;
    RKOrder?: number | undefined;
    RKPosition?: number | undefined;
    completedFirstPass?: boolean | undefined;
    timeStep?: Material | undefined;
    userTimeStep?: Material | undefined;
    stocks?: import("./Primitives").SStock[] | undefined;
    flows?: import("./Primitives").SFlow[] | undefined;
    actions?: import("./Primitives").SAction[] | undefined;
    transitions?: import("./Primitives").STransition[] | undefined;
    states?: import("./Primitives").SState[] | undefined;
    valued?: import("./Primitives").SPrimitive[] | undefined;
    displayed?: import("./Primitives").SPrimitive[] | undefined;
};
export type ResultsType = {
    times?: number[] | undefined;
    timeUnits?: string | undefined;
    window?: any | undefined;
    data?: ResultsDataType[] | undefined;
    stochastic?: boolean | undefined;
    error?: string | undefined;
    errorSource?: string | undefined;
    errorPrimitive?: import("./api/Blocks").Primitive | undefined;
    errorLine?: number | undefined;
    errorCode?: number | undefined;
    value?: Function | undefined;
    lastValue?: Function | undefined;
    periods?: number | undefined;
    resume?: Function | undefined;
    setValue?: Function | undefined;
    children?: {
        [x: string]: {
            indexedNames?: string[];
            indexedFullNames?: any[];
            results?: ResultsResultsType[];
            states?: Set<string>;
            dataMode?: "auto" | "agents" | "float";
            data?: ResultsDataType;
        };
    } | undefined;
};
export type AgentResultsType = {
    id: string;
    item: import("./api/Blocks").Population;
    data: ResultsDataType;
    results: ResultsResultsType;
};
export type ResultsDataType = object;
export type ResultsResultsType = object;
export type DisplayInformationType = {
    populated?: boolean | undefined;
    ids?: string[] | undefined;
    colors?: string[] | undefined;
    icons?: string[] | undefined;
    headers?: string[] | undefined;
    agents?: AgentResultsType[] | undefined;
    displayedItems?: {
        header: string;
        id: string;
        type: string;
        icon: string;
    }[] | undefined;
    renderers?: Function[] | undefined;
    elementIds?: string[] | undefined;
    res?: ResultsType | undefined;
    times?: number[] | undefined;
    objects?: SPrimitive[] | undefined;
    origIds?: string[] | undefined;
    store?: any | undefined;
    scripter?: any | undefined;
    maps?: any[] | undefined;
    histograms?: any[] | undefined;
};
import { SPrimitive } from "./Primitives.js";
import { Material } from "./formula/Material.js";
import { PARENT_SYMBOL } from "./formula/Formula.js";
import { UnitManager } from "./formula/Units.js";
import { TaskQueue } from "./TaskScheduler.js";
import { Vector } from "./formula/Vector.js";
