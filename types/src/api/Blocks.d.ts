/** @typedef {import("../SharedTypes.js").TriggerType} TriggerType */
/** @typedef {import("../SharedTypes.js").StockTypeType} StockTypeType */
/** @typedef {import("../SharedTypes.js").PlacementType} PlacementType */
/** @typedef {import("../SharedTypes.js").NetworkType} NetworkType */
/**
 * @typedef {string|number} Value
 */
/**
 * @typedef {object} NeighborhoodEntry
 * @property {Primitive} item
 * @property {string} type
 * @property {boolean=} linkHidden
 * @property {string=} name
 */
/**
 * @typedef {object} PrimitiveConfig
 * @property {string=} name
 * @property {string=} note
 */
export class Primitive {
    /**
     * @param {import("../ModelNode").ModelNode} node
     * @param {PrimitiveConfig} config
     */
    constructor(node: import("../ModelNode").ModelNode, config: PrimitiveConfig);
    _node: import("../ModelNode").ModelNode;
    /** @type {import("./Model").Model} */
    model: import("./Model").Model;
    delete(): void;
    /**
     * @param {Container} parent
     */
    set parent(parent: Container);
    /**
     * @return {Container}
     */
    get parent(): Container;
    /**
     * @param {function(Container):boolean} selector
     *
     * @returns {Container}
     */
    getParent(selector: (arg0: Container) => boolean): Container;
    isInAgent(): boolean;
    neighbors(): NeighborhoodEntry[];
    /**
     * @return {string}
     */
    get id(): string;
    /**
     * @param {PrimitiveConfig["name"]} value
     */
    set name(value: PrimitiveConfig["name"]);
    /**
     * @return {PrimitiveConfig["name"]}
     */
    get name(): PrimitiveConfig["name"];
    /**
     * @param {PrimitiveConfig["note"]} value
     */
    set note(value: PrimitiveConfig["note"]);
    /**
     * @return {PrimitiveConfig["note"]}
     */
    get note(): PrimitiveConfig["note"];
}
/**
 * @typedef {object} ValuedConfig
 * @property {{max?: number, min?: number}=} constraints
 * @property {string=} units
 * @property {boolean=} external
 */
export class ValuedPrimitive extends Primitive {
    /**
     * @param {ValuedConfig["units"]} value
     */
    set units(value: ValuedConfig["units"]);
    /**
     * @return {ValuedConfig["units"]}
     */
    get units(): ValuedConfig["units"];
    /**
     * @param {ValuedConfig["constraints"]} constraints
     */
    set constraints(constraints: ValuedConfig["constraints"]);
    /**
     * @return {ValuedConfig["constraints"]}
     */
    get constraints(): ValuedConfig["constraints"];
    /**
     * @param {ValuedConfig["external"]} value
     */
    set external(value: ValuedConfig["external"]);
    /**
     * @return {ValuedConfig["external"]}
     */
    get external(): ValuedConfig["external"];
}
/**
 * @typedef {object} StockConfig
 * @property {Value=} initial
 * @property {StockTypeType=} type
 * @property {boolean=} nonNegative
 * @property {Value=} delay
 */
export class Stock extends ValuedPrimitive {
    /**
     * @param {StockConfig["initial"]} value
     */
    set initial(value: StockConfig["initial"]);
    /**
     * @return {string}
     */
    get initial(): string;
    /**
     * @param {StockConfig["type"]} value
     */
    set type(value: StockConfig["type"]);
    /**
     * @return {StockConfig["type"]}
     */
    get type(): StockConfig["type"];
    /**
     * @param {StockConfig["delay"]} value
     */
    set delay(value: StockConfig["delay"]);
    /**
     * @return {string}
     */
    get delay(): string;
    /**
     * @param {StockConfig["nonNegative"]} value
     */
    set nonNegative(value: StockConfig["nonNegative"]);
    /**
     * @return {StockConfig["nonNegative"]}
     */
    get nonNegative(): StockConfig["nonNegative"];
}
/**
 * @typedef {object} VariableConfig
 * @property {Value=} value
 */
export class Variable extends ValuedPrimitive {
    /**
     * @param {VariableConfig["value"]} value
     */
    set value(value: VariableConfig["value"]);
    /**
     * @return {string}
     */
    get value(): string;
}
/**
 * @typedef {object} ConverterConfig
 * @property {"Discrete"|"Linear"=} interpolation
 * @property {"Time"|ValuedPrimitive=} input
 * @property {{x: number, y: number}[]=} values
 */
export class Converter extends ValuedPrimitive {
    /**
     * @param {ConverterConfig["interpolation"]} value
     */
    set interpolation(value: ConverterConfig["interpolation"]);
    /**
     * @return {ConverterConfig["interpolation"]}
     */
    get interpolation(): ConverterConfig["interpolation"];
    /**
     * @param {ConverterConfig["values"]} value
     */
    set values(value: ConverterConfig["values"]);
    /**
     * @return {ConverterConfig["values"]}
     */
    get values(): ConverterConfig["values"];
    /**
     * @param {ConverterConfig["input"]} value
     */
    set input(value: ConverterConfig["input"]);
    /**
     * @return {ConverterConfig["input"]}
     */
    get input(): ConverterConfig["input"];
}
/**
 * @typedef {object} FlowConfig
 * @property {Value=} rate
 * @property {Stock|null=} start
 * @property {Stock|null=} end
 * @property {boolean=} nonNegative
 */
export class Flow extends ValuedPrimitive {
    /**
     * @param {FlowConfig["rate"]} value
     */
    set rate(value: FlowConfig["rate"]);
    /**
     * @return {string}
     */
    get rate(): string;
    /**
     * @param {FlowConfig["start"]} node
     */
    set start(node: FlowConfig["start"]);
    /**
     * @return {FlowConfig["start"]}
     */
    get start(): FlowConfig["start"];
    /**
     * @param {FlowConfig["end"]} node
     */
    set end(node: FlowConfig["end"]);
    /**
     * @return {FlowConfig["end"]}
     */
    get end(): FlowConfig["end"];
    /**
     * @param {FlowConfig["nonNegative"]} value
     */
    set nonNegative(value: FlowConfig["nonNegative"]);
    /**
     * @return {FlowConfig["nonNegative"]}
     */
    get nonNegative(): FlowConfig["nonNegative"];
}
/**
 * @typedef {object} LinkConfig
 * @property {boolean=} biDirectional
 * @property {Primitive|null=} start
 * @property {Primitive|null=} end
 */
export class Link extends Primitive {
    /**
     * @param {LinkConfig["biDirectional"]} value
     */
    set biDirectional(value: LinkConfig["biDirectional"]);
    /**
     * @return {LinkConfig["biDirectional"]}
     */
    get biDirectional(): LinkConfig["biDirectional"];
    /**
     * @param {LinkConfig["start"]} node
     */
    set start(node: LinkConfig["start"]);
    /**
     * @return {LinkConfig["start"]}
     */
    get start(): LinkConfig["start"];
    /**
     * @param {LinkConfig["end"]} node
     */
    set end(node: LinkConfig["end"]);
    /**
     * @return {LinkConfig["end"]}
     */
    get end(): LinkConfig["end"];
}
/**
 * @typedef {object} StateConfig
 * @property {string|boolean=} startActive
 * @property {Value=} residency
 */
export class State extends ValuedPrimitive {
    /**
     * @param {StateConfig["startActive"]} value
     */
    set startActive(value: StateConfig["startActive"]);
    /**
     * @return {StateConfig["startActive"]}
     */
    get startActive(): StateConfig["startActive"];
    /**
     * @param {StateConfig["residency"]} value
     */
    set residency(value: StateConfig["residency"]);
    /**
     * @return {string}
     */
    get residency(): string;
}
/**
 * @typedef {object} TransitionConfig
 * @property {Value=} value
 * @property {State|null=} start
 * @property {State|null=} end
 * @property {boolean=} recalculate
 * @property {boolean=} repeat
 * @property {TriggerType=} trigger
 */
export class Transition extends ValuedPrimitive {
    /**
     * @param {TransitionConfig["value"]} value
     */
    set value(value: TransitionConfig["value"]);
    /**
     * @return {TransitionConfig["value"]}
     */
    get value(): TransitionConfig["value"];
    /**
     * @param {TransitionConfig["start"]} node
     */
    set start(node: TransitionConfig["start"]);
    /**
     * @return {TransitionConfig["start"]}
     */
    get start(): TransitionConfig["start"];
    /**
     * @param {TransitionConfig["end"]} node
     */
    set end(node: TransitionConfig["end"]);
    /**
     * @return {TransitionConfig["end"]}
     */
    get end(): TransitionConfig["end"];
    /**
     * @param {TransitionConfig["recalculate"]} value
     */
    set recalculate(value: TransitionConfig["recalculate"]);
    /**
     * @return {TransitionConfig["recalculate"]}
     */
    get recalculate(): TransitionConfig["recalculate"];
    /**
     * @param {TransitionConfig["repeat"]} value
     */
    set repeat(value: TransitionConfig["repeat"]);
    /**
     * @return {TransitionConfig["repeat"]}
     */
    get repeat(): TransitionConfig["repeat"];
    /**
     * @param {TransitionConfig["trigger"]} value
     */
    set trigger(value: TransitionConfig["trigger"]);
    /**
     * @return {TransitionConfig["trigger"]}
     */
    get trigger(): TransitionConfig["trigger"];
}
/**
 * @typedef {object} ActionConfig
 * @property {Value=} value
 * @property {boolean=} recalculate
 * @property {boolean=} repeat
 * @property {TriggerType=} trigger
 * @property {string=} action
 */
export class Action extends Primitive {
    /**
     * @param {ActionConfig["value"]} value
     */
    set value(value: ActionConfig["value"]);
    /**
     * @return {string}
     */
    get value(): string;
    /**
       * @param {ActionConfig["action"]} value
       */
    set action(value: ActionConfig["action"]);
    /**
     * @return {ActionConfig["action"]}
     */
    get action(): ActionConfig["action"];
    /**
     * @param {ActionConfig["recalculate"]} value
     */
    set recalculate(value: ActionConfig["recalculate"]);
    /**
     * @return {ActionConfig["recalculate"]}
     */
    get recalculate(): ActionConfig["recalculate"];
    /**
     * @param {ActionConfig["repeat"]} value
     */
    set repeat(value: ActionConfig["repeat"]);
    /**
     * @return {ActionConfig["repeat"]}
     */
    get repeat(): ActionConfig["repeat"];
    /**
     * @param {ActionConfig["trigger"]} value
     */
    set trigger(value: ActionConfig["trigger"]);
    /**
     * @return {ActionConfig["trigger"]}
     */
    get trigger(): ActionConfig["trigger"];
}
/**
 * @typedef {object} PopulationConfig
 * @property {Agent=} agentBase
 * @property {number=} populationSize
 * @property {string=} geoUnits
 * @property {Value=} geoWidth
 * @property {Value=} geoHeight
 * @property {boolean=} geoWrapAround
 * @property {PlacementType=} geoPlacementType
 * @property {string=} geoPlacementFunction
 * @property {NetworkType=} networkType
 * @property {string=} networkFunction
 */
export class Population extends Primitive {
    /**
     * @param {PopulationConfig["agentBase"]} value
     */
    set agentBase(value: PopulationConfig["agentBase"]);
    /**
     * @return {PopulationConfig["agentBase"]}
     */
    get agentBase(): PopulationConfig["agentBase"];
    /**
     * @param {PopulationConfig["populationSize"]} value
     */
    set populationSize(value: PopulationConfig["populationSize"]);
    /**
     * @return {PopulationConfig["populationSize"]}
     */
    get populationSize(): PopulationConfig["populationSize"];
    /**
     * @param {PopulationConfig["geoUnits"]} value
     */
    set geoUnits(value: PopulationConfig["geoUnits"]);
    /**
     * @return {PopulationConfig["geoUnits"]}
     */
    get geoUnits(): PopulationConfig["geoUnits"];
    /**
     * @param {PopulationConfig["geoWidth"]} value
     */
    set geoWidth(value: PopulationConfig["geoWidth"]);
    /**
     * @return {string}
     */
    get geoWidth(): string;
    /**
     * @param {PopulationConfig["geoHeight"]} value
     */
    set geoHeight(value: PopulationConfig["geoHeight"]);
    /**
     * @return {string}
     */
    get geoHeight(): string;
    /**
     * @param {PopulationConfig["geoWrapAround"]} value
     */
    set geoWrapAround(value: PopulationConfig["geoWrapAround"]);
    /**
     * @return {PopulationConfig["geoWrapAround"]}
     */
    get geoWrapAround(): PopulationConfig["geoWrapAround"];
    /**
     * @param {PopulationConfig["geoPlacementType"]} value
     */
    set geoPlacementType(value: PopulationConfig["geoPlacementType"]);
    /**
     * @return {PopulationConfig["geoPlacementType"]}
     */
    get geoPlacementType(): PopulationConfig["geoPlacementType"];
    /**
     * @param {PopulationConfig["geoPlacementFunction"]} value
     */
    set geoPlacementFunction(value: PopulationConfig["geoPlacementFunction"]);
    /**
     * @return {PopulationConfig["geoPlacementFunction"]}
     */
    get geoPlacementFunction(): PopulationConfig["geoPlacementFunction"];
    /**
     * @param {PopulationConfig["networkType"]} value
     */
    set networkType(value: PopulationConfig["networkType"]);
    /**
     * @return {PopulationConfig["networkType"]}
     */
    get networkType(): PopulationConfig["networkType"];
    /**
     * @param {PopulationConfig["networkFunction"]} value
     */
    set networkFunction(value: PopulationConfig["networkFunction"]);
    /**
     * @return {PopulationConfig["networkFunction"]}
     */
    get networkFunction(): PopulationConfig["networkFunction"];
}
/**
 * @typedef {object} ContainerConfig
 * @property {boolean=} frozen
 * @property {{ enabled: boolean, algorithm: import("./Model").AlgorithmType, timeStep: number}=} customTimeSettings
 */
export class Container extends Primitive {
    children(recursive?: boolean): Primitive[];
    /**
     * @param {PrimitiveConfig & ValuedConfig & StockConfig} config
     */
    Stock(config?: PrimitiveConfig & ValuedConfig & StockConfig): Stock;
    /**
     * @param {PrimitiveConfig & ValuedConfig & VariableConfig} config
     */
    Variable(config?: PrimitiveConfig & ValuedConfig & VariableConfig): Variable;
    /**
     * @param {PrimitiveConfig & ValuedConfig & ConverterConfig} config
     */
    Converter(config?: PrimitiveConfig & ValuedConfig & ConverterConfig): Converter;
    /**
     * @param {PrimitiveConfig & StateConfig} config
     */
    State(config?: PrimitiveConfig & StateConfig): State;
    /**
     * @param {PrimitiveConfig & ActionConfig} config
     */
    Action(config?: PrimitiveConfig & ActionConfig): Action;
    /**
     * @param {PrimitiveConfig & PopulationConfig} config
     */
    Population(config?: PrimitiveConfig & PopulationConfig): Population;
    /**
     * @param {Stock|null} start
     * @param {Stock|null} end
     * @param {(PrimitiveConfig & ValuedConfig & FlowConfig)=} config
     */
    Flow(start: Stock | null, end: Stock | null, config?: (PrimitiveConfig & ValuedConfig & FlowConfig) | undefined): Flow;
    /**
     * @param {State|null} start
     * @param {State|null} end
     * @param {(PrimitiveConfig & TransitionConfig)=} config
     */
    Transition(start: State | null, end: State | null, config?: (PrimitiveConfig & TransitionConfig) | undefined): Transition;
    /**
     * @param {Primitive|null} start
     * @param {Primitive|null} end
     * @param {(PrimitiveConfig & LinkConfig)=} config
     */
    Link(start: Primitive | null, end: Primitive | null, config?: (PrimitiveConfig & LinkConfig) | undefined): Link;
    /**
     * @param {ContainerConfig["frozen"]} value
     */
    set frozen(value: ContainerConfig["frozen"]);
    /**
     * @return {ContainerConfig["frozen"]}
     */
    get frozen(): ContainerConfig["frozen"];
    /**
     * @param {ContainerConfig["customTimeSettings"]} value
     */
    set customTimeSettings(value: ContainerConfig["customTimeSettings"]);
    /**
     * @return {ContainerConfig["customTimeSettings"]}
     */
    get customTimeSettings(): ContainerConfig["customTimeSettings"];
}
/**
 * @typedef {object} FolderConfig
 */
export class Folder extends Container {
}
/**
 * @typedef {object} AgentConfig
 * @property {string=} agentParent
 */
export class Agent extends Container {
    /**
     * @param {AgentConfig["agentParent"]} value
     */
    set agentParent(value: AgentConfig["agentParent"]);
    /**
     * @return {AgentConfig["agentParent"]}
     */
    get agentParent(): AgentConfig["agentParent"];
}
export type TriggerType = import("../SharedTypes.js").TriggerType;
export type StockTypeType = import("../SharedTypes.js").StockTypeType;
export type PlacementType = import("../SharedTypes.js").PlacementType;
export type NetworkType = import("../SharedTypes.js").NetworkType;
export type Value = string | number;
export type NeighborhoodEntry = {
    item: Primitive;
    type: string;
    linkHidden?: boolean | undefined;
    name?: string | undefined;
};
export type PrimitiveConfig = {
    name?: string | undefined;
    note?: string | undefined;
};
export type ValuedConfig = {
    constraints?: {
        max?: number;
        min?: number;
    } | undefined;
    units?: string | undefined;
    external?: boolean | undefined;
};
export type StockConfig = {
    initial?: Value | undefined;
    type?: StockTypeType | undefined;
    nonNegative?: boolean | undefined;
    delay?: Value | undefined;
};
export type VariableConfig = {
    value?: Value | undefined;
};
export type ConverterConfig = {
    interpolation?: ("Discrete" | "Linear") | undefined;
    input?: ("Time" | ValuedPrimitive) | undefined;
    values?: {
        x: number;
        y: number;
    }[] | undefined;
};
export type FlowConfig = {
    rate?: Value | undefined;
    start?: (Stock | null) | undefined;
    end?: (Stock | null) | undefined;
    nonNegative?: boolean | undefined;
};
export type LinkConfig = {
    biDirectional?: boolean | undefined;
    start?: (Primitive | null) | undefined;
    end?: (Primitive | null) | undefined;
};
export type StateConfig = {
    startActive?: (string | boolean) | undefined;
    residency?: Value | undefined;
};
export type TransitionConfig = {
    value?: Value | undefined;
    start?: (State | null) | undefined;
    end?: (State | null) | undefined;
    recalculate?: boolean | undefined;
    repeat?: boolean | undefined;
    trigger?: TriggerType | undefined;
};
export type ActionConfig = {
    value?: Value | undefined;
    recalculate?: boolean | undefined;
    repeat?: boolean | undefined;
    trigger?: TriggerType | undefined;
    action?: string | undefined;
};
export type PopulationConfig = {
    agentBase?: Agent | undefined;
    populationSize?: number | undefined;
    geoUnits?: string | undefined;
    geoWidth?: Value | undefined;
    geoHeight?: Value | undefined;
    geoWrapAround?: boolean | undefined;
    geoPlacementType?: PlacementType | undefined;
    geoPlacementFunction?: string | undefined;
    networkType?: NetworkType | undefined;
    networkFunction?: string | undefined;
};
export type ContainerConfig = {
    frozen?: boolean | undefined;
    customTimeSettings?: {
        enabled: boolean;
        algorithm: import("./Model").AlgorithmType;
        timeStep: number;
    } | undefined;
};
export type FolderConfig = object;
export type AgentConfig = {
    agentParent?: string | undefined;
};
