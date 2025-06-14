import { DOMParser } from "../../../../vendor/xmldom/dom-parser.js";
import { ModelNode, primitives } from "../../../ModelNode.js";
import { Model, removeModelGhosts } from "../../Model.js";



/**
 * @param {string} modelString
 *
 * @returns
 */
export function loadXML(modelString) {
  let oParser = new DOMParser();
  let data = oParser.parseFromString(modelString, "text/xml");
  let graph = graphXMLToNodes(data);


  graph.children[0].value = { nodeName: "root" };
  graph.children[0].id = "1";

  let connectors = primitives(/** @type {any} */(graph), ["Flow", "Link", "Transition"]);


  let items = primitives(graph);
  connectors.forEach((x) => {
    x.source = null;
    x.target = null;
    items.forEach((i) => {
      if (x.children[0].getAttribute("source") && x.children[0].getAttribute("source") === i.id) {
        x.source = i;
      }
      if (x.children[0].getAttribute("target") && x.children[0].getAttribute("target") === i.id) {
        x.target = i;
      }
    });
  });

  function cleanNode(x) {
    if (x.children) {
      let nodes = x.children.filter((c) => c.value.nodeName === "mxCell");

      if (nodes.length > 0) {
        if (nodes[0].getAttribute("parent")) {
          let parent = items.find(item => item.id === nodes[0].getAttribute("parent"));
          if (parent && parent.value.nodeName === "Folder") {
            parent.addChild(x);
          }
        }
      }

      x.children = x.children.filter((c) => c.value.nodeName !== "mxCell");

      for (let i = x.children.length - 1; i >= 0; i--) {
        cleanNode(x.children[i]);
      }
    }
  }

  cleanNode(graph);


  return graph;
}



function graphXMLToNodes(xml, parent) {
  // Create the return object
  let obj = new ModelNode();
  obj.value = xml;
  obj.parent = parent;

  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      for (let j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j);
        obj.attributes.set(attribute.nodeName, attribute.nodeValue);
      }

      obj.id = obj.attributes.get("id");
    }
  } else if (xml.nodeType === 3) { // text
    return null;
  }

  if (xml.hasChildNodes()) {
    obj.children = [];
    for (let i = 0; i < xml.childNodes.length; i++) {
      let item = xml.childNodes.item(i);
      let x = graphXMLToNodes(item, obj);
      if (x) {
        obj.addChild(x);
      }
    }
  }

  return obj;
}



/**
 * @param {string} xml - Insight Maker model XML string
 */
export function loadInsightMaker(xml) {
  if (!xml) {
    throw new Error("No Insight Maker model provided");
  }

  if (!xml.includes("InsightMakerModel")) {
    throw new Error("Invalid Insight Maker model contents");
  }

  let root = loadXML(xml);

  let m = new Model();

  m._graph = /** @type {any} */ (root);

  primitives(m._graph).map(x => x.primitive(m));

  m.settings = /** @type {any} */ (primitives(m._graph, "Setting")[0]);

  removeModelGhosts(m);

  return m;
}