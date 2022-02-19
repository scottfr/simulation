import { loadXML, modelNodeClone, ModelNode, primitives } from "../ModelNode.js";
import { runSimulation } from "../Modeler.js";
import { nodeBase } from "../Constants.js";
import { Primitive, Stock, Variable, Converter, State, Action, Population, Flow, Transition, Link, Agent, Folder } from "./Blocks.js";
import { Results } from "./Results.js";
import { SimulationError } from "./SimulationError.js";



/**
 * @typedef {{ name: string, target: string, scale: number}[]} CustomUnitsType
 */


/**
 * @typedef {"Euler"|"RK4"} AlgorithmType
 */


/**
 * @typedef {object} ModelConfig
 * @property {function=} primitiveFn
 * @property {number=} timeStart
 * @property {number=} timeLength
 * @property {number=} timeStep
 * @property {number=} timePause
 * @property {AlgorithmType=} algorithm
 * @property {"Seconds"|"Minutes"|"Hours"|"Days"|"Weeks"|"Months"|"Years"=} timeUnits
 */



/**
 * @param {string} xml
 */
export function loadInsightMaker(xml) {
  let root = loadXML(xml);

  let m = new Model();

  m._graph = /** @type {any} */ (root);

  primitives(m._graph).map(x => x.primitive(m));

  m.settings = /** @type {any} */ (primitives(m._graph, "Setting")[0]);

  removeModelGhosts(m);

  return m;
}


/**
 * @param {Model} model
 */
export function removeModelGhosts(model) {
  /** @type {(Flow|Transition|Link)[]} */
  let connectors = model.findLinks();
  connectors = connectors.concat(model.findFlows()).concat(model.findTransitions());

  let items = model.find();
  /**  @type {Object<string, Primitive>} */
  let idMapping = {};
  for (let item of items) {
    idMapping[item.id] = item;
  }

  for (let connector of connectors) {
    if (connector._node.source && connector._node.source.value.nodeName === "Ghost") {
      let item = idMapping[connector._node.source.getAttribute("Source")];
      if (item) {
        connector._node.source = item._node;
      } else {
        // may not exist for instance in the case of connecting to a <Picture/>
        connector.delete();
      }
    }
    if (connector._node.target && connector._node.target.value.nodeName === "Ghost") {
      let item = idMapping[connector._node.target.getAttribute("Source")];
      if (item) {
        connector._node.target = item._node;
      } else {
        connector.delete();
      }
    }
  }
}


export class Model {
  /**
   * @param {ModelConfig=} config
   */
  constructor(config={}) {
    this._graph = new ModelNode();
    this._graph.id = "1";
    this._graph.addChild(new ModelNode());
    this._graph.children[0].addChild(new ModelNode());

    this.settings = this._createNode("setting");

    this.p = config.primitiveFn || primitives;


    for (let key in excludeKeys(config, ["primitiveFn"])) {
      if (key in this) {
        this[key] = config[key];
      } else {
        throw new Error("Unknown model property: " + key);
      }
    }
  }

  /**
   * @param {string} type
   */
  _createNode(type) {
    let parent = this._graph.children[0].children[0];
    let node = modelNodeClone(nodeBase[type], parent);
    parent.addChild(node);

    return node;
  }

  /**
   * @param {string} type
   * @param {Primitive} alpha
   * @param {Primitive} omega
   */
  _createConnector(type, alpha, omega) {
    let parent = this._graph.children[0].children[0];

    if (alpha) {
      parent = alpha._node.parent;
    }
    if (omega) {
      parent = omega._node.parent;
    }
    let edge = modelNodeClone(nodeBase[type], parent);
    parent.addChild(edge);

    if (alpha) {
      edge.source = alpha._node;
    } else {
      edge.source = null;
    }
    if (omega) {
      edge.target = omega._node;
    } else {
      edge.target = null;
    }

    return edge;
  }

  simulate() {
    let config = {
      silent: true,
      model: this
    };

    let results = runSimulation(config);
    if (results.error) {
      let config = {
        code: results.errorCode
      };
      if (results.errorPrimitive) {
        config.primitive = this.get(p => p.id === results.errorPrimitive.id);
      }

      throw new SimulationError(results.error, config);
    }

    let items = this.find();
    /** @type {Object<string, string>} */
    let nameIdMapping = {};
    for (let item of items) {
      nameIdMapping[item.id] = item.name;
    }

    return new Results(results, nameIdMapping);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").StockConfig} config
   *
   * @return {Stock}
   */
  Stock(config={}) {
    let stock = /** @type {Stock} */ (this._createNode("stock").primitive(this, excludeKeys(config, ["name"])));
    stock.name = config.name || "New Stock";
    stock.model = this;
    return stock;
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").VariableConfig} config
   *
   * @return {Variable}
   */
  Variable(config={}) {
    let variable = this._createNode("variable").primitive(this, excludeKeys(config, ["name"]));
    variable.name = config.name || "New Variable";
    variable.model = this;
    return /** @type {Variable} */ (variable);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").ConverterConfig} config
   *
   * @return {Converter}
   */
  Converter(config={}) {
    let converter = this._createNode("converter").primitive(this, excludeKeys(config, ["name"]));
    converter.name = config.name || "New Converter";
    converter.model = this;
    return /** @type {Converter} */ (converter);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").StateConfig} config
   *
   * @return {State}
   */
  State(config={}) {
    let state = this._createNode("state").primitive(this, excludeKeys(config, ["name"]));
    state.name = config.name || "New State";
    state.model = this;
    return /** @type {State} */ (state);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ActionConfig} config
   *
   * @return {Action}
   */
  Action(config={}) {
    let action = this._createNode("action").primitive(this, excludeKeys(config, ["name"]));
    action.name = config.name || "New Action";
    action.model = this;
    return /** @type {Action} */ (action);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").PopulationConfig} config
   *
   * @return {Population}
   */
  Population(config={}) {
    let population = this._createNode("agents").primitive(this, excludeKeys(config, ["name"]));
    population.name = config.name || "New Population";
    population.model = this;
    return /** @type {Population} */ (population);
  }

  /**
   * @param {Stock} start
   * @param {Stock} end
   * @param {(import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ValuedConfig & import("./Blocks.js").FlowConfig)=} config
   *
   * @return {Flow}
   */
  Flow(start, end, config={}) {
    let flow = this._createConnector("flow", start || config.start || null, end || config.end || null).primitive(this, excludeKeys(config, ["name", "start", "end"]));
    flow.name = config.name || "New Flow";
    flow.model = this;
    return /** @type {Flow} */ (flow);
  }

  /**
   * @param {State} start
   * @param {State} end
   * @param {(import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").TransitionConfig)=} config
   *
   * @return {Transition}
   */
  Transition(start, end, config={}) {
    let transition = this._createConnector("transition", start || config.start || null, end ||config.end || null).primitive(this, excludeKeys(config, ["name", "start", "end"]));
    transition.name = config.name || "New Transition";
    transition.model = this;
    return /** @type {Transition} */ (transition);
  }

  /**
   * @param {Primitive} start
   * @param {Primitive} end
   * @param {(import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").LinkConfig)=} config
   *
   * @return {Link}
   */
  Link(start, end, config={}) {
    let link = this._createConnector("link", start || config.start || null, end || config.end || null).primitive(this, excludeKeys(config, ["name", "start", "end"]));
    link.name = config.name || "Link";
    link.model = this;
    return /** @type {Link} */ (link);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ContainerConfig & import("./Blocks.js").AgentConfig} config
   *
   * @return {Agent}
   */
  Agent(config={}) {
    let agentCell = this._createNode("folder");
    // must be set before primitive() is called
    agentCell.setAttribute("Type", "Agent");
    let agent = agentCell.primitive(this, excludeKeys(config, ["name"]));
    agent.name = config.name || "New Agent";
    agent.model = this;
    return /** @type {Agent} */ (agent);
  }

  /**
   * @param {import("./Blocks.js").PrimitiveConfig & import("./Blocks.js").ContainerConfig & import("./Blocks.js").FolderConfig} config
   *
   * @return {Folder}
   */
  Folder(config={}) {
    let folder = this._createNode("folder").primitive(this, excludeKeys(config, ["name"]));
    folder.name = config.name || "New Folder";
    folder.model = this;
    folder._node.setAttribute("Type", "None");
    return /** @type {Folder} */ (folder);
  }

  /**
   * @param {string} id
   *
   * @return {Primitive}
   */
  getId(id) {
    return this.get((item) => item.id === id);
  }


  /**
   * @param {function(Primitive):boolean} selector
   *
   * @return {Primitive}
   */
  get(selector) {
    let items = this.p(this._graph);
    let found = items.find(x => x.primitive() && selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Link):boolean} selector
   *
   * @return {Link}
   */
  getLink(selector) {
    let items = this.p(this._graph, "Link");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Flow):boolean} selector
   *
   * @return {Flow}
   */
  getFlow(selector) {
    let items = this.p(this._graph, "Flow");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Transition):boolean} selector
   *
   * @return {Transition}
   */
  getTransition(selector) {
    let items = this.p(this._graph, "Transition");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Stock):boolean} selector
   *
   * @return {Stock}
   */
  getStock(selector) {
    let items = this.p(this._graph, "Stock");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Variable):boolean} selector
   *
   * @return {Variable}
   */
  getVariable(selector) {
    let items = this.p(this._graph, "Variable");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Converter):boolean} selector
   *
   * @return {Converter}
   */
  getConverter(selector) {
    let items = this.p(this._graph, "Converter");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(State):boolean} selector
   *
   * @return {State}
   */
  getState(selector) {
    let items = this.p(this._graph, "State");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Action):boolean} selector
   *
   * @return {Action}
   */
  getAction(selector) {
    let items = this.p(this._graph, "Action");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Population):boolean} selector
   *
   * @return {Population}
   */
  getPopulation(selector) {
    let items = this.p(this._graph, "Agents");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Folder):boolean} selector
   *
   * @return {Folder}
   */
  getFolder(selector) {
    let items = this.p(this._graph, "Folder").filter(x => x.getAttribute("Type") !== "Agent");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }

  /**
   * @param {function(Agent):boolean} selector
   *
   * @return {Agent}
   */
  getAgent(selector) {
    let items = this.p(this._graph, "Folder").filter(x => x.getAttribute("Type") === "Agent");

    let found = items.find(x => selector(x.primitive()));
    return found ? found.primitive() : null;
  }



  /**
   * @param {function(Primitive):boolean=} selector
   *
   * @return {Primitive[]}
   */
  find(selector=(()=>true)) {
    let items = this.p(this._graph);
    return items.filter(x => x.primitive() && selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Link):boolean=} selector
   *
   * @return {Link[]}
   */
  findLinks(selector=(()=>true)) {
    let items = this.p(this._graph, "Link");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Flow):boolean=} selector
   *
   * @return {Flow[]}
   */
  findFlows(selector=(()=>true)) {
    let items = this.p(this._graph, "Flow");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Transition):boolean=} selector
   *
   * @return {Transition[]}
   */
  findTransitions(selector=(()=>true)) {
    let items = this.p(this._graph, "Transition");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Stock):boolean=} selector
   *
   * @return {Stock[]}
   */
  findStocks(selector=(()=>true)) {
    let items = this.p(this._graph, "Stock");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Variable):boolean=} selector
   *
   * @return {Variable[]}
   */
  findVariables(selector=(()=>true)) {
    let items = this.p(this._graph, "Variable");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Converter):boolean=} selector
   *
   * @return {Converter[]}
   */
  findConverters(selector=(()=>true)) {
    let items = this.p(this._graph, "Converter");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(State):boolean=} selector
   *
   * @return {State[]}
   */
  findStates(selector=(()=>true)) {
    let items = this.p(this._graph, "State");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Action):boolean=} selector
   *
   * @return {Action[]}
   */
  findActions(selector=(()=>true)) {
    let items = this.p(this._graph, "Action");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Population):boolean=} selector
   *
   * @return {Population[]}
   */
  findPopulations(selector=(()=>true)) {
    let items = this.p(this._graph, "Agents");

    return items.filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Folder):boolean=} selector
   *
   * @return {Folder[]}
   */
  findFolders(selector=(()=>true)) {
    let items = this.p(this._graph, "Folder");

    return items.filter(x => x.getAttribute("Type") !== "Agent").filter(x => selector(x.primitive())).map(x => x.primitive());
  }

  /**
   * @param {function(Agent):boolean=} selector
   *
   * @return {Agent[]}
   */
  findAgents(selector=(()=>true)) {
    let items = this.p(this._graph, "Folder");

    return items.filter(x => x.getAttribute("Type") === "Agent").filter(x => selector(x.primitive())).map(x => x.primitive());
  }



  /**
   * @return {ModelConfig["timeStart"]}
   */
  get timeStart() {
    return +this.settings.getAttribute("TimeStart");
  }

  /**
   * @param {ModelConfig["timeStart"]} value
   */
  set timeStart(value) {
    this.settings.setAttribute("TimeStart", value);
  }


  /**
   * @return {ModelConfig["timeLength"]}
   */
  get timeLength() {
    return +this.settings.getAttribute("TimeLength");
  }

  /**
   * @param {ModelConfig["timeLength"]} value
   */
  set timeLength(value) {
    this.settings.setAttribute("TimeLength", value);
  }


  /**
   * @return {ModelConfig["timePause"]}
   */
  get timePause() {
    return +this.settings.getAttribute("TimePause");
  }

  /**
   * @param {ModelConfig["timePause"]} value
   */
  set timePause(value) {
    this.settings.setAttribute("TimePause", value);
  }


  /**
   * @return {ModelConfig["timeStep"]}
   */
  get timeStep() {
    return +this.settings.getAttribute("TimeStep");
  }

  /**
   * @param {ModelConfig["timeStep"]} value
   */
  set timeStep(value) {
    this.settings.setAttribute("TimeStep", value);
  }


  /**
   * @return {ModelConfig["timeUnits"]}
   */
  get timeUnits() {
    return /** @type {any} */ (this.settings.getAttribute("TimeUnits"));
  }

  /**
   * @param {ModelConfig["timeUnits"]} value
   */
  set timeUnits(value) {
    this.settings.setAttribute("TimeUnits", value);
  }


  /**
   * @return {ModelConfig["algorithm"]}
   */
  get algorithm() {
    let value = /** @type {any} */ (this.settings.getAttribute("SolutionAlgorithm"));
    if (value === "RK1") {
      return "Euler";
    }
    return value;
  }

  /**
   * @param {ModelConfig["algorithm"]} value
   */
  set algorithm(value) {
    let usedValue;
    if (value === "Euler") {
      usedValue = "RK1";
    } else {
      usedValue = value;
    }
    this.settings.setAttribute("SolutionAlgorithm", usedValue);
  }


  /**
   * @return {string}
   */
  get globals() {
    return this.settings.getAttribute("Macros") || "";
  }

  /**
   * @param {string} value
   */
  set globals(value) {
    this.settings.setAttribute("Macros", value);
  }


  /**
   * @return {CustomUnitsType}
   */
  get customUnits() {
    return (this.settings.getAttribute("Units") || "").split("\n").filter(x => !!x).map(unit => {
      let parts = unit.split("<>");
      return {
        name: parts[0],
        scale: +parts[1],
        target: parts[2]
      };
    });
  }

  /**
   * @param {CustomUnitsType} value
   */
  set customUnits(value) {
    this.settings.setAttribute("Units", value.map(unit =>  unit.name + "<>" + unit.scale + "<>" + unit.target).join("\n"));
  }
}


/**
 * @param {object} obj
 * @param {string[]} keys
 */
function excludeKeys(obj, keys) {
  let newObj= {};
  for (let key in obj) {
    if (!keys.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

