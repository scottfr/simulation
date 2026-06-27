/**
 * @this {STransition|SAction}
 *
 * @param {boolean=} clear
 */
export function updateTrigger(this: STransition | SAction, clear?: boolean | undefined): void;
export class updateTrigger {
    /**
     * @this {STransition|SAction}
     *
     * @param {boolean=} clear
     */
    constructor(this: STransition | SAction, clear?: boolean | undefined);
    initialized: boolean;
    scheduledTrigger: Task | null | undefined;
}
/** @typedef {import("./SharedTypes.js").ValueType} ValueType */
/** @typedef {import("./SharedTypes.js").PlacementType} PlacementType */
/** @typedef {import("./SharedTypes.js").NetworkType} NetworkType */
export class SPrimitive {
    /**
     * @param {import("./Simulator").Simulator} simulate
     */
    constructor(simulate: import("./Simulator").Simulator);
    /** @type {string} */
    id: string;
    /** @type {string} */
    agentId: string;
    /** @type {number} */
    index: number;
    /** @type {number} */
    instanceId: number;
    /** @type {SAgent} */
    container: SAgent;
    constructorFunction: any;
    /** @type {import("./DNA").DNA} */
    dna: import("./DNA").DNA;
    /** @type {import("./DNA").DNA[]} */
    DNAs: import("./DNA").DNA[];
    /** @type {any} */
    equation: any;
    /** @type {ValueType} */
    cachedValue: ValueType;
    /** @type {ValueType[]} */
    pastValues: ValueType[];
    /** @type {boolean} */
    frozen: boolean;
    simulate: import("./Simulator").Simulator;
    /** @type {Map<import("./formula/Units").UnitStore, number>} */
    unitToVariableUnits: Map<import("./formula/Units").UnitStore, number>;
    /** @type {SPrimitive} */
    neighborProxyPrimitive: SPrimitive;
    parent: any;
    orig(): SPrimitive;
    /**
     * @param {import("./formula/Units").UnitStore} u
     *
     * @returns
     */
    matchPrimitiveUnits(u: import("./formula/Units").UnitStore): number | undefined;
    clone(): SPrimitive;
    innerClone(_p: any): void;
    clearCached(): void;
    storeValue(): void;
    toNum(): String | import("./SharedTypes.js").ValueType;
    /**
     * @return {ValueType}
     */
    calculateValue(): ValueType;
    createIds(): void;
    /**
     * @param {Material=} length
     *
     * @return {ValueType[]}
     */
    getPastValues(length?: Material | undefined): ValueType[];
    /**
     * @param {Material} delay
     * @param {ValueType=} defaultValue
     *
     * @returns {ValueType}
     */
    pastValue(delay: Material, defaultValue?: ValueType | undefined): ValueType;
    /**
     * @param {ValueType} m
     * @param {boolean=} ignoreFlow
     */
    testUnits(m: ValueType, ignoreFlow?: boolean | undefined): void;
    setValue(_v: any): void;
    /**
     * @returns {ValueType}
     */
    value(): ValueType;
    testConstraints(x: any): void;
    /**
     * @param {any} tree
     * @param {Map} neighborhood
     */
    setEquation(tree: any, neighborhood: Map<any, any>): void;
}
export class Placeholder extends SPrimitive {
    /**
     * @param {import("./DNA").DNA} dna
     * @param {SPrimitive | SPopulation} primitive
     * @param {import("./Simulator").Simulator} simulate
     */
    constructor(dna: import("./DNA").DNA, primitive: SPrimitive | SPopulation, simulate: import("./Simulator").Simulator);
    /** @type {SPrimitive | SPopulation} */
    primitive: SPrimitive | SPopulation;
    calculateValue(): void;
}
export class SState extends SPrimitive {
    constructor(simulate: any);
    /** @type {boolean} */
    active: boolean;
    /** @type {STransition[]} */
    downStreamTransitions: STransition[];
    constructorFunction: typeof SState;
    /**
     * @param {Material|Vector} value
     */
    setValue(value: Material | Vector<any>): void;
    calculateValue(): Material;
    /**
     * @param {boolean=} suppress
     */
    setInitialActive(suppress?: boolean | undefined): void;
    setActive(active: any, suppress: any): void;
    /**
     * @returns {boolean}
     */
    getActive(): boolean;
}
export class STransition extends SPrimitive {
    constructor(simulate: any);
    /** @type {SState} */
    alpha: SState;
    /** @type {SState} */
    omega: SState;
    /** @type {Task} */
    scheduledTrigger: Task;
    initialized: boolean;
    constructorFunction: typeof STransition;
    innerClone(): void;
    /**
     * @param {SState} alpha
     * @param {SState} omega
     */
    setEnds(alpha: SState, omega: SState): void;
    /**
     * @returns {boolean}
     */
    canTrigger(): boolean;
    trigger(): void;
}
export class SAction extends SPrimitive {
    constructor(simulate: any);
    /** @type {any} */
    action: any;
    /** @type {Task} */
    scheduledTrigger: Task;
    /** @type {boolean} */
    block: boolean;
    initialized: boolean;
    constructorFunction: typeof SAction;
    innerClone(): void;
    /**
     * @returns {boolean}
     */
    canTrigger(): boolean;
    resetTimer(): void;
    trigger(): void;
}
export class SPopulation extends SPrimitive {
    constructor(simulate: any);
    /** @type {number} */
    size: number;
    /** @type {SAgent[]} */
    agents: SAgent[];
    /** @type {Material} */
    geoWidth: Material;
    /** @type {Material} */
    geoHeight: Material;
    /** @type {Material} */
    halfWidth: Material;
    /** @type {Material} */
    halfHeight: Material;
    /** @type {string} */
    geoDimUnits: string;
    /** @type {import('./formula/Units').UnitStore} */
    geoDimUnitsObject: import("./formula/Units").UnitStore;
    /** @type {boolean} */
    geoWrap: boolean;
    /** @type {Set<string>} */
    stateIds: Set<string>;
    /** @type {PlacementType} */
    placement: PlacementType;
    /** @type {string} */
    placementFunction: string;
    /** @type {NetworkType} */
    network: NetworkType;
    /** @type {string} */
    networkFunction: string;
    /** @type {any} */
    agentBase: any;
    constructorFunction: typeof SPopulation;
    vector: Vector<never>;
    collectData(): {
        instanceId: string;
        connected: string[];
        location: Vector<any>;
        state: SState[] | null;
    }[];
    /**
     * @returns {Set<string>}
     */
    states(): Set<string>;
    /**
     * @returns {Material}
     */
    toNum(): Material;
    /**
     * @param {SAgent=} base
     * @returns
     */
    add(base?: SAgent | undefined): SAgent;
}
export class SAgent {
    constructor(simulate: any);
    /** @type {string} */
    agentId: string;
    /** @type {string} */
    instanceId: string;
    /** @type {number} */
    index: number;
    /** @type {SPrimitive[]} */
    children: SPrimitive[];
    /** @type {Vector<Material>} */
    location: Vector<Material>;
    /** @type {SAgent[]} */
    connected: SAgent[];
    /** @type {Material[]} */
    connectedWeights: Material[];
    /** @type {boolean} */
    dead: boolean;
    constructorFunction: typeof SAgent;
    /** @type {Set<string>} */
    stateIDs: Set<string>;
    /** @type {SState[]} */
    states: SState[];
    /** @type {Partial<SPopulation>} */
    container: Partial<SPopulation>;
    /** @type {import("./DNA").DNA} */
    dna: import("./DNA").DNA;
    /** @type {Object<string, SPrimitive>} */
    childrenId: {
        [x: string]: SPrimitive;
    };
    simulate: any;
    vector: Vector<never>;
    createIds(): void;
    /**
     * @returns {string}
     */
    toString(): string;
    toNum(): this;
    updateStates(): void;
    /**
     * @returns {SAgent}
     */
    agentClone(): SAgent;
    /**
     * @param {number} index
     */
    setIndex(index: number): void;
    createAgentIds(): void;
    die(): void;
    /**
     * @param {SAgent} x
     * @param {Material=} weight
     */
    connect(x: SAgent, weight?: Material | undefined): void;
    /**
     * @param {SAgent} x
     */
    unconnect(x: SAgent): void;
    /**
     * @param {SAgent} x
     * @returns {Material}
     */
    connectionWeight(x: SAgent): Material;
    /**
     * @param {SAgent} x
     * @param {Material} w
     */
    setConnectionWeight(x: SAgent, w: Material): void;
}
export class SStock extends SPrimitive {
    constructor(simulate: any);
    /** @type {ValueType} */
    level: ValueType;
    constructorFunction: typeof SStock;
    /** @type {Material} */
    delay: Material;
    /** @type {Task[]} */
    tasks: Task[];
    /** @type {ValueType} */
    initRate: ValueType;
    /** @type {ValueType} */
    oldLevel: ValueType;
    /**
     * @param {Material|Vector} value
     */
    setValue(value: Material | Vector<any>): void;
    preserveLevel(): void;
    restoreLevel(): void;
    /**
     * @param {Material=} delay
     */
    setDelay(delay?: Material | undefined): void;
    setInitialValue(): void;
    /**
     * @param {ValueType} amnt
     */
    subtract(amnt: ValueType): void;
    /**
     * @param {ValueType} amnt
     * @param {Material} oldTime
     */
    add(amnt: ValueType, oldTime: Material): void;
    /**
     * @param {ValueType} amnt
     * @param {Material} targetTime
     */
    scheduleAdd(amnt: ValueType, targetTime: Material): void;
    /**
     * @returns {ValueType}
     */
    totalContents(): ValueType;
}
export class SConverter extends SPrimitive {
    constructor(simulate: any);
    /** @type {SPrimitive|string} */
    source: SPrimitive | string;
    constructorFunction: typeof SConverter;
    innerClone(): void;
    /**
     * @param {SPrimitive|string} source
     */
    setSource(source: SPrimitive | string): void;
    /**
     * @returns {Material|Vector}
     */
    getInputValue(): Material | Vector<any>;
    /**
     * @returns {Material|Vector}
     */
    getOutputValue(): Material | Vector<any>;
}
export class SVariable extends SPrimitive {
    constructor(simulate: any);
    constructorFunction: typeof SVariable;
    innerClone(): void;
    calculateValue(): any;
}
export class SFlow extends SPrimitive {
    constructor(simulate: any);
    /** @type {SStock} */
    alpha: SStock;
    /** @type {SStock} */
    omega: SStock;
    /** @type {ValueType} */
    rate: ValueType;
    /** @type {ValueType} */
    blendedRate: ValueType;
    /** @type {ValueType[]} */
    RKPrimary: ValueType[];
    constructorFunction: typeof SFlow;
    innerClone(): void;
    /**
     * @param {SStock} alpha
     * @param {SStock} omega
     */
    setEnds(alpha: SStock, omega: SStock): void;
    clean(): void;
    doRK4Aggregation(): void;
    checkRate(rate: any): Material | Vector<any>;
    /**
     * @param {boolean=} override
     */
    predict(override?: boolean | undefined): void;
    /**
     * @param {Material} timeChange
     * @param {Material} oldTime
     *
     * @returns
     */
    apply(timeChange: Material, oldTime: Material): void;
}
export type ValueType = import("./SharedTypes.js").ValueType;
export type PlacementType = import("./SharedTypes.js").PlacementType;
export type NetworkType = import("./SharedTypes.js").NetworkType;
import { Task } from "./TaskScheduler.js";
import { Material } from "./formula/Material.js";
import { Vector } from "./formula/Vector.js";
