import { DOMImplementation } from "../vendor/xmldom/dom.js";

/** @type {Object<string, any>} */
export const nodeBase = Object.create(null);
export const defaultSolver = JSON.stringify({
  enabled: false,
  algorithm: "RK1",
  timeStep: 1
});

// If we're in a window use the standard doc implementation, otherwise (e.g. node), use xmldom
let DI = typeof window === "undefined" ? new DOMImplementation() : document.implementation;

let doc = DI.createDocument("", "", null);

nodeBase.text = doc.createElement("Text");
nodeBase.text.setAttribute("name", "Text Area");
nodeBase.text.setAttribute("LabelPosition", "Middle");

nodeBase.folder = doc.createElement("Folder");
nodeBase.folder.setAttribute("name", "New Folder");
nodeBase.folder.setAttribute("Note", "");
nodeBase.folder.setAttribute("Type", "None");
nodeBase.folder.setAttribute("Solver", defaultSolver);
nodeBase.folder.setAttribute("Image", "None");
nodeBase.folder.setAttribute("FlipHorizontal", "false");
nodeBase.folder.setAttribute("FlipVertical", "false");
nodeBase.folder.setAttribute("LabelPosition", "Middle");
nodeBase.folder.setAttribute("AgentBase", "");

nodeBase.ghost = doc.createElement("Ghost");
nodeBase.ghost.setAttribute("Source", "");

nodeBase.picture = doc.createElement("Picture");
nodeBase.picture.setAttribute("name", "");
nodeBase.picture.setAttribute("Note", "");
nodeBase.picture.setAttribute("Image", "Growth");
nodeBase.picture.setAttribute("FlipHorizontal", "false");
nodeBase.picture.setAttribute("FlipVertical", "false");
nodeBase.picture.setAttribute("LabelPosition", "Bottom");

nodeBase.display = doc.createElement("Display");
nodeBase.display.setAttribute("name", "Default Display");
nodeBase.display.setAttribute("Note", "");
nodeBase.display.setAttribute("Type", "Time Series");
nodeBase.display.setAttribute("xAxis", "Time (%u)");
nodeBase.display.setAttribute("yAxis", "");
nodeBase.display.setAttribute("yAxis2", "");
nodeBase.display.setAttribute("showMarkers", "false");
nodeBase.display.setAttribute("showLines", "true");
nodeBase.display.setAttribute("showArea", "false");
nodeBase.display.setAttribute("Primitives", "");
nodeBase.display.setAttribute("Primitives2", "");
nodeBase.display.setAttribute("AutoAddPrimitives", "false");
nodeBase.display.setAttribute("ScatterplotOrder", "X Primitive, Y Primitive");
nodeBase.display.setAttribute("Image", "Display");
nodeBase.display.setAttribute("FlipHorizontal", "false");
nodeBase.display.setAttribute("FlipVertical", "false");
nodeBase.display.setAttribute("LabelPosition", "Bottom");
nodeBase.display.setAttribute("legendPosition", "Automatic");

function setValuedProperties(cell) {
  cell.setAttribute("Units", "Unitless");
  cell.setAttribute("MaxConstraintUsed", "false");
  cell.setAttribute("MinConstraintUsed", "false");
  cell.setAttribute("MaxConstraint", "100");
  cell.setAttribute("MinConstraint", "0");
  cell.setAttribute("ShowSlider", "false");
  cell.setAttribute("SliderMax", 100);
  cell.setAttribute("SliderMin", 0);
  cell.setAttribute("SliderStep", "");
}

nodeBase.stock = doc.createElement("Stock");
nodeBase.stock.setAttribute("name", "New Stock");
nodeBase.stock.setAttribute("Note", "");
nodeBase.stock.setAttribute("InitialValue", "0");
nodeBase.stock.setAttribute("StockMode", "Store");
nodeBase.stock.setAttribute("Delay", "10");
nodeBase.stock.setAttribute("Volume", "100");
nodeBase.stock.setAttribute("NonNegative", "false");
setValuedProperties(nodeBase.stock);
nodeBase.stock.setAttribute("Image", "None");
nodeBase.stock.setAttribute("FlipHorizontal", "false");
nodeBase.stock.setAttribute("FlipVertical", "false");
nodeBase.stock.setAttribute("LabelPosition", "Middle");

nodeBase.state = doc.createElement("State");
nodeBase.state.setAttribute("name", "New State");
nodeBase.state.setAttribute("Note", "");
nodeBase.state.setAttribute("Active", "false");
nodeBase.state.setAttribute("Residency", "0");
nodeBase.state.setAttribute("Image", "None");
nodeBase.state.setAttribute("FlipHorizontal", "false");
nodeBase.state.setAttribute("FlipVertical", "false");
nodeBase.state.setAttribute("LabelPosition", "Middle");

nodeBase.transition = doc.createElement("Transition");
nodeBase.transition.setAttribute("name", "Transition");
nodeBase.transition.setAttribute("Note", "");
nodeBase.transition.setAttribute("Trigger", "Timeout");
nodeBase.transition.setAttribute("Value", "1");
nodeBase.transition.setAttribute("Repeat", "false");
nodeBase.transition.setAttribute("Recalculate", "false");
setValuedProperties(nodeBase.transition);

nodeBase.action = doc.createElement("Action");
nodeBase.action.setAttribute("name", "New Action");
nodeBase.action.setAttribute("Note", "");
nodeBase.action.setAttribute("Trigger", "Probability");
nodeBase.action.setAttribute("Value", "0.5");
nodeBase.action.setAttribute("Repeat", "true");
nodeBase.action.setAttribute("Recalculate", "false");
nodeBase.action.setAttribute("Action", "Self.Move({Rand(), Rand()})");

nodeBase.agents = doc.createElement("Agents");
nodeBase.agents.setAttribute("name", "New Agent Population");
nodeBase.agents.setAttribute("Note", "");
nodeBase.agents.setAttribute("Size", "100");
nodeBase.agents.setAttribute("GeoWrap", "false");
nodeBase.agents.setAttribute("GeoDimUnits", "Unitless");
nodeBase.agents.setAttribute("GeoWidth", "200");
nodeBase.agents.setAttribute("GeoHeight", "100");
nodeBase.agents.setAttribute("Placement", "Random");
nodeBase.agents.setAttribute("PlacementFunction", "{Rand()*Width(Self), Rand()*Height(Self)}");
nodeBase.agents.setAttribute("Network", "None");
nodeBase.agents.setAttribute("NetworkFunction", "RandBoolean(0.02)");
nodeBase.agents.setAttribute("Agent", "");
nodeBase.agents.setAttribute("Image", "None");
nodeBase.agents.setAttribute("FlipHorizontal", "false");
nodeBase.agents.setAttribute("FlipVertical", "false");
nodeBase.agents.setAttribute("LabelPosition", "Middle");
nodeBase.agents.setAttribute("ShowSlider", "false");
nodeBase.agents.setAttribute("SliderMax", "100");
nodeBase.agents.setAttribute("SliderMin", "0");
nodeBase.agents.setAttribute("SliderStep", "1");

nodeBase.variable = doc.createElement("Variable");
nodeBase.variable.setAttribute("name", "New Variable");
nodeBase.variable.setAttribute("Note", "");
nodeBase.variable.setAttribute("Equation", "0");
setValuedProperties(nodeBase.variable);
nodeBase.variable.setAttribute("Image", "None");
nodeBase.variable.setAttribute("FlipHorizontal", "false");
nodeBase.variable.setAttribute("FlipVertical", "false");
nodeBase.variable.setAttribute("LabelPosition", "Middle");

nodeBase.button = doc.createElement("Button");
nodeBase.button.setAttribute("name", "New Button");
nodeBase.button.setAttribute("Note", "");
nodeBase.button.setAttribute("Function", "showMessage(\"Button action triggered!\\n\\nIf you want to edit this Action, click on the button while holding down the Shift key on your keyboard.\")");
nodeBase.button.setAttribute("Image", "None");
nodeBase.button.setAttribute("FlipHorizontal", "false");
nodeBase.button.setAttribute("FlipVertical", "false");
nodeBase.button.setAttribute("LabelPosition", "Middle");

nodeBase.converter = doc.createElement("Converter");
nodeBase.converter.setAttribute("name", "New Converter");
nodeBase.converter.setAttribute("Note", "");
nodeBase.converter.setAttribute("Source", "Time");
nodeBase.converter.setAttribute("Data", "0,0; 1,1; 2,4; 3,9");
nodeBase.converter.setAttribute("Interpolation", "Linear");
setValuedProperties(nodeBase.converter);
nodeBase.converter.setAttribute("Image", "None");
nodeBase.converter.setAttribute("FlipHorizontal", "false");
nodeBase.converter.setAttribute("FlipVertical", "false");
nodeBase.converter.setAttribute("LabelPosition", "Middle");

nodeBase.flow = doc.createElement("Flow");
nodeBase.flow.setAttribute("name", "Flow");
nodeBase.flow.setAttribute("Note", "");
nodeBase.flow.setAttribute("FlowRate", "0");
nodeBase.flow.setAttribute("OnlyPositive", "true");
nodeBase.flow.setAttribute("TimeIndependent", "false");
setValuedProperties(nodeBase.flow);

nodeBase.link = doc.createElement("Link");
nodeBase.link.setAttribute("name", "Link");
nodeBase.link.setAttribute("Note", "");
nodeBase.link.setAttribute("BiDirectional", "false");

nodeBase.setting = doc.createElement("Setting");
nodeBase.setting.setAttribute("Note", "");
nodeBase.setting.setAttribute("Version", "37");
nodeBase.setting.setAttribute("Throttle", "1");
nodeBase.setting.setAttribute("TimeLength", "100");
nodeBase.setting.setAttribute("TimeStart", "0");
nodeBase.setting.setAttribute("TimeStep", "1");
nodeBase.setting.setAttribute("TimeUnits", "Years");
nodeBase.setting.setAttribute("Units", "");
nodeBase.setting.setAttribute("SolutionAlgorithm", "RK1");
nodeBase.setting.setAttribute("BackgroundColor", "white");
nodeBase.setting.setAttribute("Macros", "");
nodeBase.setting.setAttribute("SensitivityPrimitives", "");
nodeBase.setting.setAttribute("SensitivityRuns", "50");
nodeBase.setting.setAttribute("SensitivityBounds", "50, 80, 95, 100");
nodeBase.setting.setAttribute("SensitivityShowRuns", "false");
nodeBase.setting.setAttribute("StyleSheet", "{}");
