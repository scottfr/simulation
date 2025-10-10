// eslint-disable-next-line
import { Stock, Variable, State, Action, Population, Transition, Flow, Link, Folder, Agent, Converter, Ghost, Primitive } from "./api/Blocks.js";


export function modelNodeClone(node, parent) {
  let obj = new ModelNode();
  obj.value = node.cloneNode(true);
  obj.parent = parent;
  
  let currIds = ["1"].concat(primitives(findRootParent(parent)).map(x => x.id).filter(x => !!x));
  
  if (node.attributes.length > 0) {
    for (let j = 0; j < node.attributes.length; j++) {
      let attribute = node.attributes.item(j);
      obj.setAttribute(attribute.nodeName, attribute.nodeValue);
    }
  }
  
  obj.setAttribute("id", "" + (Math.max.apply(null, currIds) + 1));
  
  return obj;
}



  
function findRootParent(node) {
  if (node.parent) {
    return findRootParent(node.parent);
  }
  return node;
}


export class ModelNode {
  constructor() {
    this.attributes = new Map();

    /** @type {ModelNode} */
    this.parent = null;

    /** @type {ModelNode[]} */
    this.children = [];

    /** @type {string} */
    this.id = null;

    /** @type {{ nodeName: string }} */
    this.value = { nodeName: null };

    /** @type {Primitive} */
    this._primitive = undefined;

    /** @type {ModelNode} */
    this.source = null;

    /** @type {ModelNode} */
    this.target = null;

    // Used for importing and exporting
    this.geometry = {
      x: 0,
      y: 0,
      width: 40,
      height: 100,
      sourcePoint: null,
      targetPoint: null,
    };
    /** @type {string} */
    this.style = null;
  }

  /**
   * @param {import("./api/Model").Model} model
   * @param {*} config
   * @returns {Primitive}
   */
  primitive(model, config = {}) {
    if (this._primitive === undefined) {
      if (this.value.nodeName === "Stock") {
        this._primitive = new Stock(this, config);
      } else if (this.value.nodeName === "Variable") {
        this._primitive = new Variable(this, config);
      } else if (this.value.nodeName === "Converter") {
        this._primitive = new Converter(this, config);
      } else if (this.value.nodeName === "Ghost") {
        this._primitive = new Ghost(this, config);
      } else if (this.value.nodeName === "State") {
        this._primitive = new State(this, config);
      } else if (this.value.nodeName === "Action") {
        this._primitive = new Action(this, config);
      } else if (this.value.nodeName === "Agents") {
        this._primitive = new Population(this, config);
      } else if (this.value.nodeName === "Flow") {
        this._primitive = new Flow(this, config);
      } else if (this.value.nodeName === "Transition") {
        this._primitive = new Transition(this, config);
      } else if (this.value.nodeName === "Link") {
        this._primitive = new Link(this, config);
      } else if (this.value.nodeName === "Folder") {
        if (this.getAttribute("Type") === "Agent") {
          this._primitive = new Agent(this, config);
        } else {
          this._primitive = new Folder(this, config);
        }
      } else {
        this._primitive = null;
      }
      if (this._primitive && !this._primitive.model) {
        this._primitive.model = model;
      }
    }

    return this._primitive;
  }


  /**
   * @param {ModelNode} newChild
   */
  addChild(newChild) {
    if (newChild.parent) {
      // remove from prior parent if there is one
      let index = newChild.parent.children.indexOf(newChild);
      if (index > -1) {
        newChild.parent.children.splice(index, 1);
      }
    }

    this.children.push(newChild);
    newChild.parent = this;
  }

  /**
   * @param {string} x
   * @returns {string}
   */
  getAttribute(x) {
    if (x === "id") {
      return this.id;
    }
    return this.attributes.get(x);
  }

  setAttribute(x, value) {
    if (x === "id") {
      this.id = "" + value;
      return;
    }
    this.attributes.set(x, "" + value);
  }

  getValue() {
    return {
      removeAttribute: (name) => this.attributes.delete(name)
    };
  }

  toString(indent = 0) {
    let start = " ".repeat(indent) + `<${this.value.nodeName}${this.getAttribute("name") ? " [" + this.getAttribute("name") + "]" : ""}>`;
    let end = `</${this.value.nodeName}>`;

    return start + (this.children.length ? "\n" : "") + this.children.map(child => " ".repeat(indent) + child.toString(indent + 2)).join("\n") + (this.children.length ? ("\n" + " ".repeat(indent)) : "") + end;
  }
}



/**
 * @param {ModelNode} root
 * @param {PrimitiveNameType|PrimitiveNameType[]=} type
 *
 * @returns {GraphNode[]}
 */
export function primitives(root, type) {
  let myNodes = nodeChildren(root.children[0]);

  if (!type) {
    return myNodes;
  } else {
    let targetNodes = [];

    for (let node of myNodes) {
      if (Array.isArray(type) ? type.includes(node.value.nodeName) : node.value.nodeName === type) {
        targetNodes.push(node);
      }
    }

    return targetNodes;
  }
}


function nodeChildren(node) {
  let children = node.children.slice();

  let childrenLength = children.length;
  for (let i = 0; i < childrenLength; i++) {
    let child = children[i];
    children = children.concat(nodeChildren(child));
  }

  return children;
}
