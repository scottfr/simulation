import { ModelError } from "../formula/ModelError.js";
import { isTrue } from "../Utilities.js";


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
  constructor(node, config) {
    this._node = node;

    /** @type {import("./Model").Model} */
    this.model = null;

    for (let key in config) {
      if (key in this) {
        this[key] = config[key];
      } else {
        throw new Error("Unknown property: " + key);
      }
    }
  }


  delete() {
    let connectors = this.model.find(node => node instanceof Flow || node instanceof Transition || node instanceof Link);

    let x = this._node;
    if (x.parent.children.includes(x)) {
      x.parent.children.splice(x.parent.children.indexOf(x), 1);
    }

    connectors.forEach((c) => {
      if (c._node.source === x) {
        c._node.source = null;
        if (c._node.target && c._node.target.parent !== c._node.parent) {
          c.parent = /** @type {Container} */ (c._node.target.parent.primitive(this.model));
        }
      }
      if (c._node.target === x) {
        c._node.target = null;
        if (c._node.source && c._node.source.parent !== c._node.parent) {
          c.parent =  /** @type {Container} */ (c._node.source.parent.primitive(this.model));
        }
      }
    });
  }


  /**
   * @return {Container}
   */
  get parent() {
    let p = this._node.parent;
    if ((p.value && p.value.nodeName === "root") || p.id === "1") {
      return null;
    } else {
      return /** @type {Container} */ (p.primitive(this.model));
    }
  }

  /**
   * @param {Container} parent
   */
  set parent(parent) {
    let p;
    if (parent === null) {
      p = this.model._graph.children[0].children[0];
    } else {
      p = parent._node;
    }

    if (this._node.parent.children.includes(this._node)) {
      this._node.parent.children.splice(this._node.parent.children.indexOf(this._node), 1);
    }

    p.addChild(this._node);
  }

  /**
   * @param {function(Container):boolean} selector
   *
   * @returns {Container}
   */
  getParent(selector) {
    let parent = this.parent;
    if (!parent) {
      return null;
    }

    if (selector(parent)) {
      return parent;
    }

    return parent.getParent(selector);
  }

  isInAgent() {
    return !!this.getParent(x => x instanceof Agent);
  }

  neighbors() {
    /** @type {NeighborhoodEntry[]} */
    let neighbors = [];

    let flows = this.model.findFlows();
    let links = this.model.findLinks();
    if (this instanceof Flow || this instanceof Link || this instanceof Transition) {
      if (this.start) {
        neighbors.push({
          item: this.start,
          type: "direct"
        });
      }
      if (this.end) {
        neighbors.push({
          item: this.end,
          type: "direct"
        });
      }
    }
    if (this instanceof Population) {
      if (this.agentBase) {
        neighbors = neighbors.concat(getAgentItems(this));
      }
    }


    if (this instanceof Stock) {
      for (let i = 0; i < flows.length; i++) {
        if (flows[i].start === this) {
          neighbors.push({
            item: flows[i],
            type: "direct",
            linkHidden: true
          });
        }
        if (flows[i].end === this) {
          neighbors.push({
            item: flows[i],
            type: "direct",
            linkHidden: true
          });
        }
      }
    }

    for (let i = 0; i < links.length; i++) {
      if (links[i].start === this && links[i].end) {
        let linkHidden = !links[i].biDirectional;
        neighbors.push({
          item: links[i].end,
          type: "direct",
          linkHidden: linkHidden
        });

        neighbors = neighbors.concat(getAgentItems(links[i].end, linkHidden));
      }
      if (links[i].end === this && links[i].start && !(links[i].start.isInAgent() && !this.isInAgent())) {
        neighbors.push({
          item: links[i].start,
          type: "direct"
        });
        neighbors = neighbors.concat(getAgentItems(links[i].start));
      }
    }


    neighbors = neighbors.filter(x => !!x);

    let res = [];

    // Remove duplicated elements
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].linkHidden) {
        continue;
      }
      let found = false;
      for (let j = 0; j < res.length; j++) {
        if (res[j].type === neighbors[i].type && res[j].item.id === neighbors[i].item.id) {
          found = true;
          if (res[j].linkHidden && !neighbors[i].linkHidden) {
            res[j].linkHidden = false;
          }
          break;
        }
      }
      if (!found) {
        if ((neighbors[i].item instanceof ValuedPrimitive) || (neighbors[i].item instanceof Population)) {
          res.push(neighbors[i]);
        }
      }
    }
    return res;

    /**
     * @param {Primitive} agent
     * @param {boolean=} linkHidden
     * @returns {NeighborhoodEntry[]}
     */
    function getAgentItems(agent, linkHidden) {
      /** @type {NeighborhoodEntry[]} */
      let res = [];
      if ((agent instanceof Population) && agent.agentBase) {
        let items = agent.agentBase.children();
        items.forEach((x) => {
          if (x instanceof ValuedPrimitive) {
            res.push({
              item: x,
              type: "agent",
              linkHidden: linkHidden,
              name: x.name
            });
          }
        });
      }

      res.sort((a, b) => {
        if (a.name === b.name) {
          return 0;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });

      return res;
    }
  }



  /**
   * @return {string}
   */
  get id() {
    return this._node.id;
  }


  /**
   * @return {PrimitiveConfig["name"]}
   */
  get name() {
    return this._node.getAttribute("name");
  }

  /**
   * @param {PrimitiveConfig["name"]} value
   */
  set name(value) {
    this._node.setAttribute("name", value);
  }

  /**
   * @return {PrimitiveConfig["note"]}
   */
  get note() {
    return this._node.getAttribute("Note");
  }

  /**
   * @param {PrimitiveConfig["note"]} value
   */
  set note(value) {
    this._node.setAttribute("Note", value);
  }
}



/**
 * @typedef {object} ValuedConfig
 * @property {{max?: number, min?: number}=} constraints
 * @property {string=} units
 * @property {boolean=} external
 */



export class ValuedPrimitive extends Primitive {
  /**
   * @return {ValuedConfig["units"]}
   */
  get units() {
    return this._node.getAttribute("Units");
  }

  /**
   * @param {ValuedConfig["units"]} value
   */
  set units(value) {
    this._node.setAttribute("Units", value);
  }

  /**
   * @return {ValuedConfig["constraints"]}
   */
  get constraints() {
    let res = {};
    if (isTrue(this._node.getAttribute("MinConstraintUsed"))) {
      res.min = +this._node.getAttribute("MinConstraint");
    }
    if (isTrue(this._node.getAttribute("MaxConstraintUsed"))) {
      res.max = +this._node.getAttribute("MaxConstraint");
    }
    return res;
  }

  /**
   * @param {ValuedConfig["constraints"]} constraints
   */
  set constraints(constraints) {
    this._node.setAttribute("MinConstraint", constraints.min);
    this._node.setAttribute("MinConstraintUsed", "min" in constraints);
    this._node.setAttribute("MaxConstraint", constraints.max);
    this._node.setAttribute("MaxConstraintUsed", "max" in constraints);
  }


  /**
   * @return {ValuedConfig["external"]}
   */
  get external() {
    return isTrue(this._node.getAttribute("ShowSlider"));
  }

  /**
   * @param {ValuedConfig["external"]} value
   */
  set external(value) {
    this._node.setAttribute("ShowSlider", value);
  }
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
   * @return {string}
   */
  get initial() {
    return this._node.getAttribute("InitialValue") || "";
  }

  /**
   * @param {StockConfig["initial"]} value
   */
  set initial(value) {
    this._node.setAttribute("InitialValue", "" + value);
  }

  /**
   * @return {StockConfig["type"]}
   */
  get type() {
    return /** @type {any} */ (this._node.getAttribute("StockMode"));
  }

  /**
   * @param {StockConfig["type"]} value
   */
  set type(value) {
    this._node.setAttribute("StockMode", "" + value);
  }

  /**
   * @return {string}
   */
  get delay() {
    return this._node.getAttribute("Delay");
  }

  /**
   * @param {StockConfig["delay"]} value
   */
  set delay(value) {
    this._node.setAttribute("Delay", "" + value);
  }

  /**
   * @return {StockConfig["nonNegative"]}
   */
  get nonNegative() {
    return isTrue(this._node.getAttribute("NonNegative"));
  }

  /**
   * @param {StockConfig["nonNegative"]} value
   */
  set nonNegative(value) {
    this._node.setAttribute("NonNegative", value);
  }
}


/**
 * @typedef {object} VariableConfig
 * @property {Value=} value
 */

export class Variable extends ValuedPrimitive {
  /**
   * @return {string}
   */
  get value() {
    return this._node.getAttribute("Equation") || "";
  }

  /**
   * @param {VariableConfig["value"]} value
   */
  set value(value) {
    this._node.setAttribute("Equation", "" + value);
  }
}


/**
 * @typedef {object} ConverterConfig
 * @property {"Discrete"|"Linear"=} interpolation
 * @property {"Time"|ValuedPrimitive=} input
 * @property {{x: number, y: number}[]=} values
 */

export class Converter extends ValuedPrimitive {
  /**
   * @return {ConverterConfig["interpolation"]}
   */
  get interpolation() {
    return /** @type {any} */ (this._node.getAttribute("Interpolation"));
  }

  /**
   * @param {ConverterConfig["interpolation"]} value
   */
  set interpolation(value) {
    this._node.setAttribute("Interpolation", value);
  }


  /**
   * @return {ConverterConfig["values"]}
   */
  get values() {
    return this._node.getAttribute("Data").split(";").map(row => {
      let parts = row.split(",");
      if (parts.length !== 2) {
        throw new ModelError(`Converter data point should have the form "x, y", got "${row}"`, {
          primitive: this,
          code: 2100
        });
      }


      let res = {
        x: +parts[0],
        y: +parts[1]
      };

      if (isNaN(res.x) || isNaN(res.y)) {
        throw new ModelError(`Converter has invalid data "${row}"`, {
          primitive: this,
          showEditor: true,
          code: 2101
        });
      }

      return res;
    });
  }

  /**
   * @param {ConverterConfig["values"]} value
   */
  set values(value) {
    this._node.setAttribute("Data", value.map(x => x.x + "," + x.y).join(";"));
  }


  /**
   * @return {ConverterConfig["input"]}
   */
  get input() {
    let v = this._node.getAttribute("Source");

    if (v === "Time") {
      return v;
    }

    let p = null;
    try {
      p = this.model.getId(v);
    } catch (_err) {
      // the source does not exist, return null;
    }
    

    return /** @type {ValuedPrimitive} */ (p);
  }

  /**
   * @param {ConverterConfig["input"]} value
   */
  set input(value) {
    this._node.setAttribute("Source", value === "Time" ? value : value.id);
  }

}


/**
 * @typedef {object} FlowConfig
 * @property {Value=} rate
 * @property {Stock=} start
 * @property {Stock=} end
 * @property {boolean=} nonNegative
 */

export class Flow extends ValuedPrimitive {
  /**
   * @return {string}
   */
  get rate() {
    return this._node.getAttribute("FlowRate") || "";
  }

  /**
   * @param {FlowConfig["rate"]} value
   */
  set rate(value) {
    this._node.setAttribute("FlowRate", "" + value);
  }

  /**
   * @return {FlowConfig["start"]}
   */
  get start() {
    return /** @type {Stock} */ (this._node.source ? this._node.source.primitive(this.model) : null);
  }

  /**
   * @param {FlowConfig["start"]} node
   */
  set start(node) {
    this._node.source = node._node;
  }

  /**
   * @return {FlowConfig["end"]}
   */
  get end() {
    return /** @type {Stock} */ (this._node.target ? this._node.target.primitive(this.model) : null);
  }

  /**
   * @param {FlowConfig["end"]} node
   */
  set end(node) {
    this._node.target = node._node;
  }

  /**
   * @return {FlowConfig["nonNegative"]}
   */
  get nonNegative() {
    return isTrue(this._node.getAttribute("OnlyPositive"));
  }

  /**
   * @param {FlowConfig["nonNegative"]} value
   */
  set nonNegative(value) {
    this._node.setAttribute("OnlyPositive", value);
  }
}


/**
 * @typedef {object} LinkConfig
 * @property {boolean=} biDirectional
 * @property {Primitive=} start
 * @property {Primitive=} end
 */

export class Link extends Primitive {
  /**
   * @return {LinkConfig["biDirectional"]}
   */
  get biDirectional() {
    return isTrue(this._node.getAttribute("BiDirectional"));
  }

  /**
   * @param {LinkConfig["biDirectional"]} value
   */
  set biDirectional(value) {
    this._node.setAttribute("BiDirectional", value);
  }

  /**
   * @return {LinkConfig["start"]}
   */
  get start() {
    return this._node.source ? this._node.source.primitive(this.model) : null;
  }

  /**
   * @param {LinkConfig["start"]} node
   */
  set start(node) {
    this._node.source = node._node;
  }

  /**
   * @return {LinkConfig["end"]}
   */
  get end() {
    return this._node.target ? this._node.target.primitive(this.model) : null;
  }

  /**
   * @param {LinkConfig["end"]} node
   */
  set end(node) {
    this._node.target = node._node;
  }
}


/**
 * @typedef {object} StateConfig
 * @property {string|boolean=} startActive
 * @property {Value=} residency
 */

export class State extends ValuedPrimitive {
  /**
   * @return {StateConfig["startActive"]}
   */
  get startActive() {
    return this._node.getAttribute("Active");
  }

  /**
   * @param {StateConfig["startActive"]} value
   */
  set startActive(value) {
    this._node.setAttribute("Active", value);
  }

  /**
   * @return {string}
   */
  get residency() {
    return this._node.getAttribute("Residency");
  }

  /**
   * @param {StateConfig["residency"]} value
   */
  set residency(value) {
    this._node.setAttribute("Residency", value);
  }
}



/**
 * @typedef {object} TransitionConfig
 * @property {Value=} value
 * @property {State=} start
 * @property {State=} end
 * @property {boolean=} recalculate
 * @property {boolean=} repeat
 * @property {TriggerType=} trigger
 */

export class Transition extends ValuedPrimitive {
  /**
   * @return {TransitionConfig["value"]}
   */
  get value() {
    return this._node.getAttribute("Value") || "";
  }

  /**
   * @param {TransitionConfig["value"]} value
   */
  set value(value) {
    this._node.setAttribute("Value", "" + value);
  }


  /**
   * @return {TransitionConfig["start"]}
   */
  get start() {
    return /** @type {State} */ (this._node.source ? this._node.source.primitive(this.model) : null);
  }

  /**
   * @param {TransitionConfig["start"]} node
   */
  set start(node) {
    this._node.source = node._node;
  }


  /**
   * @return {TransitionConfig["end"]}
   */
  get end() {
    return /** @type {State} */ (this._node.target ? this._node.target.primitive(this.model) : null);
  }

  /**
   * @param {TransitionConfig["end"]} node
   */
  set end(node) {
    this._node.target = node._node;
  }


  /**
   * @return {TransitionConfig["recalculate"]}
   */
  get recalculate() {
    return isTrue(this._node.getAttribute("Recalculate"));
  }

  /**
   * @param {TransitionConfig["recalculate"]} value
   */
  set recalculate(value) {
    this._node.setAttribute("Recalculate", value);
  }


  /**
   * @return {TransitionConfig["repeat"]}
   */
  get repeat() {
    return isTrue(this._node.getAttribute("Repeat"));
  }

  /**
   * @param {TransitionConfig["repeat"]} value
   */
  set repeat(value) {
    this._node.setAttribute("Repeat", value);
  }


  /**
   * @return {TransitionConfig["trigger"]}
   */
  get trigger() {
    return /** @type {any} */ (this._node.getAttribute("Trigger"));
  }

  /**
   * @param {TransitionConfig["trigger"]} value
   */
  set trigger(value) {
    this._node.setAttribute("Trigger", value);
  }
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
   * @return {string}
   */
  get value() {
    return this._node.getAttribute("Value") || "";
  }

  /**
   * @param {ActionConfig["value"]} value
   */
  set value(value) {
    this._node.setAttribute("Value", "" + value);
  }


  /**
   * @return {ActionConfig["action"]}
   */
  get action() {
    return this._node.getAttribute("Action");
  }

  /**
     * @param {ActionConfig["action"]} value
     */
  set action(value) {
    this._node.setAttribute("Action", "" + value);
  }


  /**
   * @return {ActionConfig["recalculate"]}
   */
  get recalculate() {
    return isTrue(this._node.getAttribute("Recalculate"));
  }

  /**
   * @param {ActionConfig["recalculate"]} value
   */
  set recalculate(value) {
    this._node.setAttribute("Recalculate", value);
  }


  /**
   * @return {ActionConfig["repeat"]}
   */
  get repeat() {
    return isTrue(this._node.getAttribute("Repeat"));
  }

  /**
   * @param {ActionConfig["repeat"]} value
   */
  set repeat(value) {
    this._node.setAttribute("Repeat", value);
  }


  /**
   * @return {ActionConfig["trigger"]}
   */
  get trigger() {
    return /** @type {any} */ (this._node.getAttribute("Trigger"));
  }

  /**
   * @param {ActionConfig["trigger"]} value
   */
  set trigger(value) {
    this._node.setAttribute("Trigger", value);
  }
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
   * @return {PopulationConfig["agentBase"]}
   */
  get agentBase() {
    let targetId = this._node.getAttribute("Agent");

    if (!targetId) {
      return null;
    }

    let base = null;
    try {
      base = this.model.getId(targetId);
    } catch (_err) {
      // the source does not exist, return null;
    }

    return /** @type {Agent} */ (base);
  }

  /**
   * @param {PopulationConfig["agentBase"]} value
   */
  set agentBase(value) {
    this._node.setAttribute("Agent", value.id);
  }


  /**
   * @return {PopulationConfig["populationSize"]}
   */
  get populationSize() {
    return +this._node.getAttribute("Size");
  }

  /**
   * @param {PopulationConfig["populationSize"]} value
   */
  set populationSize(value) {
    this._node.setAttribute("Size", value);
  }


  /**
   * @return {PopulationConfig["geoUnits"]}
   */
  get geoUnits() {
    return this._node.getAttribute("GeoDimUnits");
  }

  /**
   * @param {PopulationConfig["geoUnits"]} value
   */
  set geoUnits(value) {
    this._node.setAttribute("GeoDimUnits", value);
  }


  /**
   * @return {string}
   */
  get geoWidth() {
    return this._node.getAttribute("GeoWidth");
  }

  /**
   * @param {PopulationConfig["geoWidth"]} value
   */
  set geoWidth(value) {
    this._node.setAttribute("GeoWidth", value);
  }


  /**
   * @return {string}
   */
  get geoHeight() {
    return this._node.getAttribute("GeoHeight");
  }

  /**
   * @param {PopulationConfig["geoHeight"]} value
   */
  set geoHeight(value) {
    this._node.setAttribute("GeoHeight", value);
  }


  /**
   * @return {PopulationConfig["geoWrapAround"]}
   */
  get geoWrapAround() {
    return isTrue(this._node.getAttribute("GeoWrap"));
  }

  /**
   * @param {PopulationConfig["geoWrapAround"]} value
   */
  set geoWrapAround(value) {
    this._node.setAttribute("GeoWrap", value);
  }


  /**
   * @return {PopulationConfig["geoPlacementType"]}
   */
  get geoPlacementType() {
    return /** @type {any} */ (this._node.getAttribute("Placement"));
  }

  /**
   * @param {PopulationConfig["geoPlacementType"]} value
   */
  set geoPlacementType(value) {
    this._node.setAttribute("Placement", value);
  }


  /**
   * @return {PopulationConfig["geoPlacementFunction"]}
   */
  get geoPlacementFunction() {
    return this._node.getAttribute("PlacementFunction");
  }

  /**
   * @param {PopulationConfig["geoPlacementFunction"]} value
   */
  set geoPlacementFunction(value) {
    this._node.setAttribute("PlacementFunction", value);
  }


  /**
   * @return {PopulationConfig["networkType"]}
   */
  get networkType() {
    return /** @type {any} */ (this._node.getAttribute("Network"));
  }

  /**
   * @param {PopulationConfig["networkType"]} value
   */
  set networkType(value) {
    this._node.setAttribute("Network", value);
  }


  /**
   * @return {PopulationConfig["networkFunction"]}
   */
  get networkFunction() {
    return this._node.getAttribute("NetworkFunction");
  }

  /**
   * @param {PopulationConfig["networkFunction"]} value
   */
  set networkFunction(value) {
    this._node.setAttribute("NetworkFunction", value);
  }
}


/**
 * @typedef {object} ContainerConfig
 * @property {boolean=} frozen
 * @property {{ enabled: boolean, algorithm: import("./Model").AlgorithmType, timeStep: number}=} customTimeSettings
 */

export class Container extends Primitive {
  children(recursive = true) {
    let children = this._node.children ? this._node.children.map(x => x.primitive(this.model)) : [];

    if (recursive) {
      let childrenLength = children.length;
      for (let i = 0; i < childrenLength; i++) {
        let child = children[i];
        if (child instanceof Container) {
          children = children.concat(child.children(recursive));
        }
      }
    }

    return children;
  }

  /**
   * @param {PrimitiveConfig & ValuedConfig & StockConfig} config
   */
  Stock(config = {}) {
    let stock = this.model.Stock(config);
    stock.parent = this;
    return stock;
  }

  /**
   * @param {PrimitiveConfig & ValuedConfig & VariableConfig} config
   */
  Variable(config = {}) {
    let variable = this.model.Variable(config);
    variable.parent = this;
    return variable;
  }

  /**
   * @param {PrimitiveConfig & ValuedConfig & ConverterConfig} config
   */
  Converter(config = {}) {
    let converter = this.model.Converter(config);
    converter.parent = this;
    return converter;
  }

  /**
   * @param {PrimitiveConfig & StateConfig} config
   */
  State(config = {}) {
    let state = this.model.State(config);
    state.parent = this;
    return state;
  }

  /**
   * @param {PrimitiveConfig & ActionConfig} config
   */
  Action(config = {}) {
    let action = this.model.Action(config);
    action.parent = this;
    return action;
  }

  /**
   * @param {PrimitiveConfig & PopulationConfig} config
   */
  Population(config = {}) {
    let population = this.model.Population(config);
    population.parent = this;
    return population;
  }

  /**
   * @param {Stock | null} start
   * @param {Stock | null} end
   * @param {(PrimitiveConfig & ValuedConfig & FlowConfig)=} config
   */
  Flow(start, end, config = {}) {
    let flow = this.model.Flow(start, end, config);
    flow.parent = this;
    return flow;
  }

  /**
   * @param {State | null} start
   * @param {State | null} end
   * @param {(PrimitiveConfig & TransitionConfig)=} config
   */
  Transition(start, end, config = {}) {
    let transition = this.model.Transition(start, end, config);
    transition.parent = this;
    return transition;
  }

  /**
   * @param {Primitive} start
   * @param {Primitive} end
   * @param {(PrimitiveConfig & LinkConfig)=} config
   */
  Link(start, end, config = {}) {
    let link = this.model.Link(start, end, config);
    link.parent = this;
    return link;
  }


  /**
   * @return {ContainerConfig["frozen"]}
   */
  get frozen() {
    return isTrue(this._node.getAttribute("Frozen"));
  }

  /**
   * @param {ContainerConfig["frozen"]} value
   */
  set frozen(value) {
    this._node.setAttribute("Frozen", value);
  }

  /**
   * @return {ContainerConfig["customTimeSettings"]}
   */
  get customTimeSettings() {
    let value = JSON.parse(this._node.getAttribute("Solver") || "{}");
    if (value.algorithm === "RK1") {
      value.algorithm = "Euler";
    }
    return value;
  }

  /**
   * @param {ContainerConfig["customTimeSettings"]} value
   */
  set customTimeSettings(value) {
    /** @type {any} */
    let newValue = Object.assign({}, value);
    if (newValue.algorithm === "Euler") {
      newValue.algorithm = "RK1";
    }
    this._node.setAttribute("Solver", JSON.stringify(newValue));
  }
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
   * @return {AgentConfig["agentParent"]}
   */
  get agentParent() {
    return this._node.getAttribute("AgentBase");
  }

  /**
   * @param {AgentConfig["agentParent"]} value
   */
  set agentParent(value) {
    this._node.setAttribute("AgentBase", value);
  }
}
