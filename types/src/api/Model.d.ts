/**
 * @typedef {{ name: string, target: string, scale: number}[]} CustomUnitsType
 */
/**
 * @typedef {"Euler"|"RK4"} AlgorithmType
 */
/**
 * @typedef {object} ModelConfig
 * @property {function} primitiveFn
 * @property {number} timeStart
 * @property {number} timeLength
 * @property {number} timeStep
 * @property {number=} timePause
 * @property {AlgorithmType} algorithm
 * @property {"Seconds"|"Minutes"|"Hours"|"Days"|"Weeks"|"Months"|"Years"} timeUnits
 */
/**
 * @typedef {Partial<ModelConfig>} ModelConfigOptions
 */
/**
 * @param {Model} model
 */
export function removeModelGhosts(model: Model): void;
export class Model {
    /**
     * @param {ModelConfigOptions=} config
     */
    constructor(config?: ModelConfigOptions | undefined);
    /** @type {string} */
    name: string;
    /** @type {string} */
    description: string;
    visualizations: any[];
    scenarios: any[];
    _graph: ModelNode;
    settings: ModelNode;
    p: Function;
    /**
     * @param {string} type
     */
    _createNode(type: string): ModelNode;
    /**
     * @param {string} type
     * @param {Primitive} alpha
     * @param {Primitive} omega
     */
    _createConnector(type: string, alpha: Primitive, omega: Primitive): ModelNode;
    /**
     * Checks the model for some static errors (e.g syntax errors). The model is not run and runtime errors are not checked.
     *
     * The function returns an array of errors found.
     *
     * @returns {ModelError[]}
     */
    check(): ModelError[];
    /**
     * Async simulation mode. Allows for pausing the simulation and adjusting
     * values. Returns a promise that resolves with the results or rejects
     * with an error.
     *
     * @param {object} options
     * @param {function({ results: Results, time: number, setValue: function(Primitive, any) })=} options.onStep - async function that will be awaited each time step prior to simulation resuming, use setValue() to adjust values.
     *
     * @returns {Promise<Results, { error: string, errorCode: number, errorPrimitive: Primitive, errorPrimitiveName: string, errorPrimitiveId: string}|Error>}
     */
    simulateAsync(options?: {
        onStep?: ((arg0: {
            results: Results;
            time: number;
            setValue: (arg0: Primitive, arg1: any) => any;
        }) => any) | undefined;
    }): Promise<Results, {
        error: string;
        errorCode: number;
        errorPrimitive: Primitive;
        errorPrimitiveName: string;
        errorPrimitiveId: string;
    } | Error>;
    simulate(): Results;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").StockConfig} config
     *
     * @return {Stock}
     */
    Stock(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").StockConfig): Stock;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").VariableConfig} config
     *
     * @return {Variable}
     */
    Variable(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").VariableConfig): Variable;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").ConverterConfig} config
     *
     * @return {Converter}
     */
    Converter(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").ConverterConfig): Converter;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").StateConfig} config
     *
     * @return {State}
     */
    State(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").StateConfig): State;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ActionConfig} config
     *
     * @return {Action}
     */
    Action(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ActionConfig): Action;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").PopulationConfig} config
     *
     * @return {Population}
     */
    Population(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").PopulationConfig): Population;
    /**
     * @param {Stock|null} start
     * @param {Stock|null} end
     * @param {(import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").FlowConfig)=} config
     *
     * @return {Flow}
     */
    Flow(start: Stock | null, end: Stock | null, config?: (import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").FlowConfig) | undefined): Flow;
    /**
     * @param {State|null} start
     * @param {State|null} end
     * @param {(import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").TransitionConfig)=} config
     *
     * @return {Transition}
     */
    Transition(start: State | null, end: State | null, config?: (import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").TransitionConfig) | undefined): Transition;
    /**
     * @param {Primitive|null} start
     * @param {Primitive|null} end
     * @param {(import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").LinkConfig)=} config
     *
     * @return {Link}
     */
    Link(start: Primitive | null, end: Primitive | null, config?: (import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").LinkConfig) | undefined): Link;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ContainerConfig & import("./Blocks.js").AgentConfig} config
     *
     * @return {Agent}
     */
    Agent(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ContainerConfig & import("./Blocks.js").AgentConfig): Agent;
    /**
     * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ContainerConfig & import("./Blocks.js").FolderConfig} config
     *
     * @return {Folder}
     */
    Folder(config?: import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ContainerConfig & import("./Blocks.js").FolderConfig): Folder;
    /**
     * @param {string} id
     *
     * @return {Primitive}
     */
    getId(id: string): Primitive;
    /**
     * @param {function(Primitive):boolean} selector
     * @param {string} fn
     *
     * @return {Primitive}
     */
    get(selector: (arg0: Primitive) => boolean, fn?: string): Primitive;
    /**
     * @param {function(Link):boolean} selector
     *
     * @return {Link}
     */
    getLink(selector: (arg0: Link) => boolean): Link;
    /**
     * @param {function(Flow):boolean} selector
     *
     * @return {Flow}
     */
    getFlow(selector: (arg0: Flow) => boolean): Flow;
    /**
     * @param {function(Transition):boolean} selector
     *
     * @return {Transition}
     */
    getTransition(selector: (arg0: Transition) => boolean): Transition;
    /**
     * @param {function(Stock):boolean} selector
     *
     * @return {Stock}
     */
    getStock(selector: (arg0: Stock) => boolean): Stock;
    /**
     * @param {function(Variable):boolean} selector
     *
     * @return {Variable}
     */
    getVariable(selector: (arg0: Variable) => boolean): Variable;
    /**
     * @param {function(Converter):boolean} selector
     *
     * @return {Converter}
     */
    getConverter(selector: (arg0: Converter) => boolean): Converter;
    /**
     * @param {function(State):boolean} selector
     *
     * @return {State}
     */
    getState(selector: (arg0: State) => boolean): State;
    /**
     * @param {function(Action):boolean} selector
     *
     * @return {Action}
     */
    getAction(selector: (arg0: Action) => boolean): Action;
    /**
     * @param {function(Population):boolean} selector
     *
     * @return {Population}
     */
    getPopulation(selector: (arg0: Population) => boolean): Population;
    /**
     * @param {function(Folder):boolean} selector
     *
     * @return {Folder}
     */
    getFolder(selector: (arg0: Folder) => boolean): Folder;
    /**
     * @param {function(Agent):boolean} selector
     *
     * @return {Agent}
     */
    getAgent(selector: (arg0: Agent) => boolean): Agent;
    /**
     * @param {function(Primitive):boolean=} selector
     *
     * @return {Primitive[]}
     */
    find(selector?: ((arg0: Primitive) => boolean) | undefined): Primitive[];
    /**
     * @param {function(Link):boolean=} selector
     *
     * @return {Link[]}
     */
    findLinks(selector?: ((arg0: Link) => boolean) | undefined): Link[];
    /**
     * @param {function(Flow):boolean=} selector
     *
     * @return {Flow[]}
     */
    findFlows(selector?: ((arg0: Flow) => boolean) | undefined): Flow[];
    /**
     * @param {function(Transition):boolean=} selector
     *
     * @return {Transition[]}
     */
    findTransitions(selector?: ((arg0: Transition) => boolean) | undefined): Transition[];
    /**
     * @param {function(Stock):boolean=} selector
     *
     * @return {Stock[]}
     */
    findStocks(selector?: ((arg0: Stock) => boolean) | undefined): Stock[];
    /**
     * @param {function(Variable):boolean=} selector
     *
     * @return {Variable[]}
     */
    findVariables(selector?: ((arg0: Variable) => boolean) | undefined): Variable[];
    /**
     * @param {function(Converter):boolean=} selector
     *
     * @return {Converter[]}
     */
    findConverters(selector?: ((arg0: Converter) => boolean) | undefined): Converter[];
    /**
     * @param {function(State):boolean=} selector
     *
     * @return {State[]}
     */
    findStates(selector?: ((arg0: State) => boolean) | undefined): State[];
    /**
     * @param {function(Action):boolean=} selector
     *
     * @return {Action[]}
     */
    findActions(selector?: ((arg0: Action) => boolean) | undefined): Action[];
    /**
     * @param {function(Population):boolean=} selector
     *
     * @return {Population[]}
     */
    findPopulations(selector?: ((arg0: Population) => boolean) | undefined): Population[];
    /**
     * @param {function(Folder):boolean=} selector
     *
     * @return {Folder[]}
     */
    findFolders(selector?: ((arg0: Folder) => boolean) | undefined): Folder[];
    /**
     * @param {function(Agent):boolean=} selector
     *
     * @return {Agent[]}
     */
    findAgents(selector?: ((arg0: Agent) => boolean) | undefined): Agent[];
    /**
     * @param {ModelConfig["timeStart"]} value
     */
    set timeStart(value: ModelConfig["timeStart"]);
    /**
     * @return {ModelConfig["timeStart"]}
     */
    get timeStart(): ModelConfig["timeStart"];
    /**
     * @param {ModelConfig["timeLength"]} value
     */
    set timeLength(value: ModelConfig["timeLength"]);
    /**
     * @return {ModelConfig["timeLength"]}
     */
    get timeLength(): ModelConfig["timeLength"];
    /**
     * @param {ModelConfig["timePause"]} value
     */
    set timePause(value: ModelConfig["timePause"]);
    /**
     * @return {ModelConfig["timePause"]}
     */
    get timePause(): ModelConfig["timePause"];
    /**
     * @param {ModelConfig["timeStep"]} value
     */
    set timeStep(value: ModelConfig["timeStep"]);
    /**
     * @return {ModelConfig["timeStep"]}
     */
    get timeStep(): ModelConfig["timeStep"];
    /**
     * @param {ModelConfig["timeUnits"]} value
     */
    set timeUnits(value: ModelConfig["timeUnits"]);
    /**
     * @return {ModelConfig["timeUnits"]}
     */
    get timeUnits(): ModelConfig["timeUnits"];
    /**
     * @param {ModelConfig["algorithm"]} value
     */
    set algorithm(value: ModelConfig["algorithm"]);
    /**
     * @return {ModelConfig["algorithm"]}
     */
    get algorithm(): ModelConfig["algorithm"];
    /**
     * @param {string} value
     */
    set globals(value: string);
    /**
     * @return {string}
     */
    get globals(): string;
    /**
     * @param {CustomUnitsType} value
     */
    set customUnits(value: CustomUnitsType);
    /**
     * @return {CustomUnitsType}
     */
    get customUnits(): CustomUnitsType;
}
export type CustomUnitsType = {
    name: string;
    target: string;
    scale: number;
}[];
export type AlgorithmType = "Euler" | "RK4";
export type ModelConfig = {
    primitiveFn: Function;
    timeStart: number;
    timeLength: number;
    timeStep: number;
    timePause?: number | undefined;
    algorithm: AlgorithmType;
    timeUnits: "Seconds" | "Minutes" | "Hours" | "Days" | "Weeks" | "Months" | "Years";
};
export type ModelConfigOptions = Partial<ModelConfig>;
import { Primitive } from "./Blocks.js";
import { Stock } from "./Blocks.js";
import { Variable } from "./Blocks.js";
import { Converter } from "./Blocks.js";
import { State } from "./Blocks.js";
import { Action } from "./Blocks.js";
import { Population } from "./Blocks.js";
import { Flow } from "./Blocks.js";
import { Transition } from "./Blocks.js";
import { Link } from "./Blocks.js";
import { Agent } from "./Blocks.js";
import { Folder } from "./Blocks.js";
import { createModelJSON } from "./import_export/ModelJSON/ModelJSON.js";
import { loadModelJSON } from "./import_export/ModelJSON/ModelJSON.js";
import { loadInsightMaker } from "./import_export/InsightMaker/InsightMaker.js";
import { ModelNode } from "../ModelNode.js";
import { ModelError } from "../formula/ModelError.js";
import { Results } from "./Results.js";
export { Primitive, Stock, Variable, Converter, State, Action, Population, Flow, Transition, Link, Agent, Folder, createModelJSON as toModelJSON, loadModelJSON, loadInsightMaker };
