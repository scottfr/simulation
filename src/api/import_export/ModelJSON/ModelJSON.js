import { isTrue } from "../../../Utilities.js";
import { Model } from "../../Model.js";


const TIME_UNITS = ["SECONDS", "MINUTES", "HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"];


/**
 * Validates that an object only has the allowedKeys. Keys that aren't
 * on the list but start with "_" are ignored.
 * 
 * @param {string} label
 * @param {object} object 
 * @param {object} allowed 
 * @param {string[]} errors
 * 
 * @return {boolean} - true if there were no errors
 */
function validateKeys(label, object, allowed, errors) {
  let startErrorsLength = errors.length;

  let keys = Object.keys(object);

  for (let key of keys) {
    if (key[0] === "_") {
      continue;
    }

    if (!(key in allowed)) {
      errors.push(`Invalid property "${key}" found in ${label}. Allowed properties are: ${Object.keys(allowed).map(k => `"${k}"`).join(", ")}.`);
      continue;
    } else {
      let type = allowed[key];
      if (type === "string") {
        if (object[key] === null && (key === "from" || key === "to")) {
          // allow from/to to be null for connectors
          continue;
        }
        if (typeof object[key] !== "string") {
          errors.push(`Property "${key}" requires a string value. Got: ${object[key]}`);
        }
      } else if (type === "number") {
        if (typeof object[key] !== "number") {
          errors.push(`Property "${key}" requires a number value. Got: ${object[key]}`);
        }
      } else if (type === "boolean") {
        if (typeof object[key] !== "boolean") {
          errors.push(`Property "${key}" requires a boolean value. Got: ${object[key]}`);
        }
      } else if (type === "equation") {
        if (typeof object[key] !== "number" && typeof object[key] !== "boolean" && typeof object[key] !== "string") {
          errors.push(`Invalid value given for "${key}". Got: ${object[key]}`);
        }
      } else if (type === "array") {
        if (!Array.isArray(object[key])) {
          errors.push(`Property "${key}" requires an array value. Got: ${object[key]}`);
        }
      } else if (type === "point") {
        if (!Array.isArray(object[key])) {
          errors.push(`Property "${key}" requires an [x, y] value. Got: ${JSON.stringify(object[key])}`);
        } else {
          if (object[key].length !== 2 || typeof object[key][0] !== "number" || typeof object[key][1] !== "number") {
            errors.push(`Property "${key}" requires an [x, y] value. Got: ${JSON.stringify(object[key])}`);
          }
        }
      } else if (type === "object") {
        if ((typeof object[key] !== "object") || object[key] === null || Array.isArray(object[key])) {
          errors.push(`Property "${key}" requires an object value. Got: ${JSON.stringify(object[key])}`);
        }
      } else if (Array.isArray(type)) {
        validateEnum(key, object[key], type, errors);
      }
    }
  }

  if (startErrorsLength === errors.length) {
    // no errors were added
    return true;
  }

  return false;
}


/**
 * @param {string} label 
 * @param {string} value 
 * @param {string[]} allowedValues 
 * @param {string[]} errors 
 */
function validateEnum(label, value, allowedValues, errors) {
  if (value === undefined || value === null) {
    return;
  }

  if (typeof value !== "string") {
    errors.push(`Invalid value "${value}" given for "${label}". Allowed values are ${allowedValues.map(k => `"${k}"`).join(", ")}`);
    return;
  }

  if (value[0] === "_") {
    return;
  }

  if (!allowedValues.includes(value)) {
    errors.push(`Invalid value "${value}" given for "${label}". Allowed values are ${allowedValues.map(k => `"${k}"`).join(", ")}`);
  }
}


/**
 * 
 * @param {object} object 
 * @param {string[]} errors 
 */
function validateModel(object, errors) {
  let noErrors = validateKeys(
    "the model",
    object,
    {
      "name": "string",
      "description": "string",
      "file_notes": "string",
      "engine": ["SIMULATION_PACKAGE"],
      "simulation": "object",
      "elements": "array",
      "visualizations": "array",
      "units": "array"
    },
    errors
  );

  if (!noErrors) {
    return;
  }

  if (object.simulation) {
    validateKeys(
      "the simulation",
      object.simulation,
      {
        "algorithm": ["RK1", "RK4"],
        "time_start": "number",
        "time_length": "number",
        "time_step": "number",
        "time_units": TIME_UNITS
      }, errors);

  }

  if (object.visualizations) {
    for (let visualization of object.visualizations) {
      validateKeys(
        "a visualization",
        visualization,
        {
          "type": ["TIME_SERIES", "TABLE"],
          "name": "string",
          "elements": "array"
        }, errors);

      if (!visualization.elements) {
        errors.push("Visualizations require an arrays of element names");
      } else {
        if (Array.isArray(visualization.elements)) {
          for (let el of visualization.elements) {
            if (typeof el !== "string") {
              errors.push("Visualizations' element names must be strings. Got " + el);
            }
          }
        }
      }
    }
  }


  if (object.units) {
    for (let unit of object.units) {
      validateKeys(
        "a unit",
        unit,
        {
          "name": "string",
          "base": "string",
          "to_base": "number"
        }, errors);
    }
  }


  if (!object.elements) {
    errors.push("You must have an array of elements");
  } else {
    for (let element of object.elements) {
      let allowedBase = {
        "type": ["STOCK", "VARIABLE", "CONVERTER", "STATE", "FLOW", "LINK", "TRANSITION"],
        "name": "string",
        "description": "string",
        "behavior": "object",
        "display": "object"
      };
      let allowedBehavior = {

      };
      let allowedDisplay = {

      };

      function assignProperties(base, behavior, display) {
        Object.assign(allowedBase, base);
        Object.assign(allowedBehavior, behavior);
        Object.assign(allowedDisplay, display);
      }

      if (element.type === "STOCK") {
        assignProperties(
          {},
          {
            initial_value: "equation",
            non_negative: "boolean",
            units: "string"
          }, {
            coordinates: "point",
            size: "point",
            interactive: "boolean",
            interactive_min: "number",
            interactive_max: "number"
          });
      } else if (element.type === "VARIABLE") {
        assignProperties(
          {},
          {
            value: "equation",
            units: "string"
          }, {
            coordinates: "point",
            size: "point",
            interactive: "boolean",
            interactive_min: "number",
            interactive_max: "number"
          });
      } else if (element.type === "STATE") {
        assignProperties(
          {},
          {
            initial_value: "equation"
          }, {
            coordinates: "point",
            size: "point",
            interactive: "boolean"
          });
      } else if (element.type === "CONVERTER") {
        assignProperties(
          {},
          {
            input: ["TIME", "ELEMENT"],
            input_element: "string",
            interpolation: ["NONE", "LINEAR"],
            data: "array",
            units: "string"
          }, {
            coordinates: "point",
            size: "point"
          });
      } else if (element.type === "FLOW") {
        assignProperties(
          {
            to: "string",
            from: "string"
          },
          {
            value: "equation",
            non_negative: "boolean",
            units: "string",
          }, {
            to_coordinates: "point",
            from_coordinates: "point",
            interactive: "boolean",
            interactive_min: "number",
            interactive_max: "number"
          });
      } else if (element.type === "TRANSITION") {
        assignProperties(
          {
            to: "string",
            from: "string"
          },{
            value: "equation",
            trigger: ["PROBABILITY", "TIMEOUT", "CONDITION"]
          }, {
            to_coordinates: "point",
            from_coordinates: "point",
            interactive: "boolean",
            interactive_min: "number",
            interactive_max: "number"
          });
      } else if (element.type === "LINK") {
        assignProperties(
          {
            to: "string",
            from: "string"
          },{
            polarity: ["NEUTRAL", "POSITIVE", "NEGATIVE"]
          }, {
            to_coordinates: "point",
            from_coordinates: "point"
          });
      }

      if (validateKeys("an element", element, allowedBase, errors)) {
        if (element.behavior) {
          validateKeys("an element's \"behavior\"", element.behavior, allowedBehavior, errors);
        }
        if (element.display) {
          validateKeys("an element's \"display\"", element.display, allowedDisplay, errors);
        }
      }
    }
  }
}




/**
 * @param {string} units
 */
function mapTimeUnits(units) {
  const uc = (units || "").toUpperCase();

  if (TIME_UNITS.includes(uc)) {
    return uc;
  }

  return "DAYS";
}


/**
 * @param {string} val 
 * @returns 
 */
function toNumberOrString(val) {
  if (val == null) return "";

  const trimmed = val.trim();
  const parsed = parseFloat(trimmed);
  
  if (!isNaN(parsed) && /^[+-]?\d+(\.\d+)?$/.test(trimmed)) {
    return parsed;
  }

  return trimmed.replaceAll(/\\n/g, "\n");
}


/**
 * @param {GraphNode} node 
 * @param {{x: number, y: number}} coordinates 
 */
function shiftGeometry(node, coordinates) {
  let newCoords = { x: coordinates.x, y: coordinates.y };
  let p = node.parent;
  
  while (p && p.geometry) {
    newCoords.x += p.geometry.x;
    newCoords.y += p.geometry.y;
    p = p.parent;
  }

  newCoords.x = Math.round(newCoords.x);
  newCoords.y = Math.round(newCoords.y);

  return newCoords;
}



/**
 * @type {Object<string, function(GraphNode, Model):object>}
 */
let processors = {
  base: (element) => {
    let el = {
      name: element.getAttribute("name"),
    };

    if (element.value.nodeName === "Link" && el.name === "Link") {
      // "Link" isn't shown in the UI on Links, so we remove it from the JSON
      delete el.name;
    }

    if (element.getAttribute("Note")) {
      el.description = element.getAttribute("Note");
    }

    let interactive = isTrue(element.getAttribute("ShowSlider"));

    if (interactive) {
      el.display = {
        interactive: true
      };
    }

    return el;
  },
  // mixins
  node: (element) => {
    let c = shiftGeometry(element, element.geometry);
    return {
      display: {
        coordinates: [c.x, c.y],
        size: [element.geometry.width, element.geometry.height]
      }
    };
  },
  connector: (element) => {
    let base = {
      from: element.source ? element.source.getAttribute("name") : null,
      to: element.target ? element.target.getAttribute("name") : null,
    };


    if (!element.source || !element.target) {
      let display = {};

      if (!element.source && element.geometry.sourcePoint) {
        let c = shiftGeometry(element, element.geometry.sourcePoint);
        display.from_coordinates = [c.x, c.y];
        base.display = display;
      }

      if (!element.target && element.geometry.targetPoint) {
        let c = shiftGeometry(element, element.geometry.targetPoint);
        display.to_coordinates = [c.x, c.y];
        base.display = display;
      }
    }

    return base;
  },
  scalarInteractive: (element) => {
    let shouldShowSlider = isTrue(element.getAttribute("ShowSlider"));

    if (!shouldShowSlider) {
      return null;
    }

    return {
      display: {
        interactive_min: +element.getAttribute("SliderMin"),
        interactive_max: +element.getAttribute("SliderMax")
      }
    };
  },
  units: (element) => {
    let units = element.getAttribute("Units");
    if (units && units.toLowerCase() !== "unitless" && units !== "1") {
      return {
        behavior: {
          units
        }
      };
    }
  },
  // types
  Stock: (element) => {
    let el = {
      type: "STOCK",
      behavior: {
        initial_value: toNumberOrString(element.getAttribute("InitialValue"))
      },
    };
    if (isTrue(element.getAttribute("NonNegative"))) {
      el.behavior.non_negative = true;
    }
    return el;
  },
  Flow: (element) => {
    let el = {
      type: "FLOW",
      behavior: {
        value: toNumberOrString(element.getAttribute("FlowRate")),
      },
    };

    if (isTrue(element.getAttribute("OnlyPositive"))) {
      el.behavior.non_negative = true;
    }
    return el;
  },
  Variable: (element) => {
    let res = {
      type: "VARIABLE"
    };

    let eq = element.getAttribute("Equation");

    if (eq !== undefined && eq !== "") {
      res.behavior = {
        value: toNumberOrString(eq),
      };
    }
    return res;
  },
  Converter: (element, model) => {
    let rawData = element.getAttribute("Data") || "";
    let pairs = [];
    rawData.split(";").forEach(token => {
      let t = token.trim();
      if (!t) return;
      let match = t.split(",").map(x => x.trim());
      if (match.length === 2) {
        let inVal = parseFloat(match[0]);
        let outVal = parseFloat(match[1]);
        if (!isNaN(inVal) && !isNaN(outVal)) {
          pairs.push([inVal, outVal]);
        } else {
          console.warn(`Invalid data pair in Converter: "${t}". Expected format "input,output".`);
        }
      } else if (match.length) {
        console.warn(`Invalid data pair in Converter: "${t}". Expected format "input,output".`);
      }
    });

    /** @type {string} */
    let sourceAttr = element.getAttribute("Source") || "";
    let source = "ELEMENT";
    let sourceElement = "";
    if (sourceAttr === "Time") {
      source = "TIME";
    } else {
      let el = model.getId(sourceAttr);
      sourceElement = el ? el._node.getAttribute("name") : "";
    }

    let interpolation = element.getAttribute("Interpolation");

    let el = {
      type: "CONVERTER",
      behavior: {
        input: source,
        interpolation: interpolation === "Linear" ? "LINEAR" : "NONE",
        data: pairs,
      },
    };

    if (source === "ELEMENT") {
      el.behavior.input_element = sourceElement;
    }

    return el;
  },
  State: (element) => {
    return {
      type: "STATE",
      behavior: {
        initial_value: isTrue(element.getAttribute("Active")),
      },
    };
  },
  Transition: (element) => {
    let trigger = element.getAttribute("Trigger");
    if (trigger === "Probability") {
      trigger = "PROBABILITY";
    } else if (trigger === "Condition") {
      trigger = "CONDITION";
    } else if (trigger === "Timeout") {
      trigger = "TIMEOUT";
    } else {
      console.warn(`Unknown trigger type in Transition: "${trigger}". Expected "Probability", "Condition", or "Timeout".`);
    }

    return {
      type: "TRANSITION",
      behavior: {
        trigger,
        value: toNumberOrString(element.getAttribute("Value"))
      },
    };
  },
  Link: (element) => {
    let el = {
      type: "LINK"
    };

    let style = element.style;

    if (style?.includes?.("END_ANNOTATION=+")) {
      el.behavior = {
        polarity: "POSITIVE"
      };
    } else if (style?.includes?.("END_ANNOTATION=-")) {
      el.behavior = {
        polarity: "NEGATIVE"
      };
    }
    

    return el;
  },
};





/**
   * @param {Model} model
   * @param {string} id 
   */
function idToName(model, id) {
  try {
    let primitive = model.getId(id);
    return primitive.name;
  } catch (e) {
    // if the primitive with the given id doesn't exist, return null
    return null;
  }
}


/**
 * Converts a Model object into a JSON string following the ModelJSON specification.
 * 
 * @param {Model} model
 * @returns {object} The ModleJSON object representing the model.
 */
export function createModelJSON(model) {
  const fileNotes = [];

  const mySetting = model.settings;
  const sim = {
    algorithm: mySetting.getAttribute("SolutionAlgorithm") === "RK1" ? "RK1" : "RK4",
    time_start: parseFloat(mySetting.getAttribute("TimeStart") || "0"),
    time_length: parseFloat(mySetting.getAttribute("TimeLength") || "10"),
    time_step: parseFloat(mySetting.getAttribute("TimeStep") || "1"),
    time_units: mapTimeUnits(mySetting.getAttribute("TimeUnits"))
  };


  if (mySetting.getAttribute("Macros")?.trim()) {
    fileNotes.push("Macros were defined but are not part of ModelJSON.");
  }

  /** @type {Object<string, object>} */
  let nameMap = Object.create(null);
  const elements = [];

  function doProcessors(types, node) {
    /** @type {any} */
    let element = {};
    for (let type of types) {
      if (processors[type]) {
        let data = processors[type](node._node, node.model);
        if (data) {
          // merge data into element, objects with the same key will also be merged
          for (let key in data) {
            if (key in element) {
              if (key === "behavior" && type[0].toUpperCase() === type[0]) {
                // the type specific behavior properties should be first
                element[key] = { ...data[key], ...element[key] };
              } else {
                element[key] = { ...element[key], ...data[key] };
              }

            } else {
              element[key] = data[key];
            }
          }
        }
      }
    }

    // for cleanup
    let finalElement = {
      type: element.type
    };

    if (element.name) {
      finalElement.name = element.name;
    }

    if (element.description) {
      finalElement.description = element.description;
    }

    Object.assign(finalElement, element);

    elements.push(finalElement);

    if ("name" in element) {
      if (element.type !== "LINK" && nameMap[element.name.toLowerCase()]) {
        throw new Error(`Duplicate primitive name: ${element.name}. Primitives other than links must have unique names in ModelJSON.`);
      }

      nameMap[element.name.toLowerCase()] = finalElement;
    }
  }

  let items = model.find();
  items.forEach(item => {
    switch (item._node.value.nodeName) {
    case "Stock":
      return doProcessors(["base", "scalarInteractive", "node", "units", "Stock"], item);
    case "Flow":
      return doProcessors(["base", "scalarInteractive", "connector", "units", "Flow"], item);
    case "Variable":
      return doProcessors(["base", "scalarInteractive", "node", "units", "Variable"], item);
    case "Converter":
      return doProcessors(["base", "node", "units", "Converter"], item);
    case "State":
      return doProcessors(["base", "node", "State"], item);
    case "Transition":
      return doProcessors(["base", "connector", "Transition"], item);
    case "Link":
      return doProcessors(["base", "connector", "Link"], item);
    case "Text":
      return;
    case "Picture":
      return;
    case "Display":
      return;
    case "Setting":
      return;
    case "Ghost":
      return;
    case "Folder":
      return;
    default:
      fileNotes.push(`Skipped primitive: ${item._node.getAttribute("name") || "Unnamed"}`);
    }
  });



  // Construct JSON
  const modelJSON = {
    engine: "SIMULATION_PACKAGE",
  };

  if (fileNotes.length) {
    modelJSON.file_notes = fileNotes.join("\n") || undefined;
  }

  if (model.name) {
    modelJSON.name = model.name;
  }
  if (model.description) {
    modelJSON.description = model.description;
  }

  modelJSON.simulation = sim;
  modelJSON.elements = elements;

  let customUnits = model.customUnits;
  if (customUnits.length) {
    modelJSON.units = customUnits.map(u => {
      let o = {
        name: u.name,
      };

      if (u.target?.trim()) {
        o.base = u.target;
        o.to_base = u.scale;
      }

      return o;
    });
  }

  let visualizations = [];
  model.visualizations.forEach(display => {
    if (display.type === "Time Series" || display.type === "Tabular" || display.type === "Scatterplot") {
      let viz = {
        name: display.name,
      };
      if (display.type === "Scatterplot" || display.type === "Time Series") {
        viz.type = "TIME_SERIES";
      } else if (display.type === "Tabular") {
        viz.type = "TABLE";
      }
      viz.elements = display.primitives.map(id => idToName(model, id)).filter(n => !!n);
      
      if (viz.elements.length) {
        visualizations.push(viz);
      }
    }
  });

  if (visualizations.length) {
    modelJSON.visualizations = visualizations;
  }


  return modelJSON;
}



/**
 * Loads a ModelJSON string into a new Model instance.
 * 
 * @param {object} data
 * @returns {Model} A new Model object reflecting the parsed ModelJSON.
 */
export function loadModelJSON(data) {
  if (!data || !(data instanceof Object)) {
    throwModelJSONError(["ModelJSON data is not an object."]);
  }


  /** @type {string[]} */
  let errors = [];


  validateModel(data, errors);
  

  const model = new Model();


  if (data.name) {
    model.name = data.name;
  }
  if (data.description) {
    model.description = data.description;
  }
  const sim = data.simulation || {};

  model.algorithm = sim.algorithm === "RK1" ? "Euler" : "RK4";
  model.timeStart = sim.time_start ?? 0;
  model.timeLength = sim.time_length ?? 10;
  model.timeStep = sim.time_step ?? 1;
  let units = sim.time_units;
  if (!units) {
    // default units to years
    model.timeUnits = "Years";
  } else if (TIME_UNITS.includes(units)) {
    model.timeUnits = units.charAt(0) + units.slice(1).toLowerCase();
  }


  const elements = Array.isArray(data.elements) ? data.elements.slice() : [];

  const TYPE_ORDER = {
    "STOCK": 1,
    "VARIABLE": 1,
    "STATE": 1,
    "FLOW": 3,
    "TRANSITION": 3,
    "CONVERTER": 4,
    "LINK": 5
  };

  elements.sort((a, b) => (TYPE_ORDER[a.type] || 99) - (TYPE_ORDER[b.type] || 99));

  const nameMap = Object.create(null);

  // We need to run this after everything is created
  // converters by depend on other converters.
  let converterFns = [];

  /** @type {number} */
  let elementIndex = -1;
  for (const el of elements) {
    elementIndex++;

    const { type, name, description, behavior = {}, display = {} } = el;
    
    let newPrimitive = null;

    /**
     * @param {import("../../Blocks").Primitive} prim
     */
    function setGeometry(prim) {
      const [x, y] = display.coordinates || [0, 0];
      const [w, h] = display.size || [100, 60];


      prim._node.geometry.x = x;
      prim._node.geometry.y = y;
      prim._node.geometry.width = w;
      prim._node.geometry.height = h;
    }


    switch (type) {
    case "STOCK": {
      newPrimitive = model.Stock({
        name,
        initial: behavior.initial_value ?? "0",
        nonNegative: !!behavior.non_negative
      });

      if (behavior.units) {
        newPrimitive._node.setAttribute("Units", behavior.units);
      }
      setGeometry(newPrimitive);
      break;
    }

    case "VARIABLE": {
      newPrimitive = model.Variable({
        name,
        value: behavior.value ?? ""
      });
      if (behavior.units) {
        newPrimitive._node.setAttribute("Units", behavior.units);
      }
      setGeometry(newPrimitive);
      break;
    }

    case "STATE": {
      newPrimitive = model.State({
        name,
        startActive: behavior.initial_value ?? false
      });
      setGeometry(newPrimitive);
      break;
    }

    case "CONVERTER": {

      let values = [];
      if (behavior.data) {
        for (let row of behavior.data) {
          if (!Array.isArray(row) || row.length!== 2) {
            errors.push("Converter data should be an array of [x, y] pairs, got a row of : " + row);
            continue;
          }
          values.push({ x: row[0], y: row[1] });
        }
      }
      const interp = (behavior.interpolation === "LINEAR") ? "Linear" : "None";

      newPrimitive = model.Converter({
        name,
        values
      });

      setGeometry(newPrimitive);

      newPrimitive._node.setAttribute("Source", "Time");
      newPrimitive._node.setAttribute("Interpolation", interp);
      if (behavior.units) {
        newPrimitive._node.setAttribute("Units", behavior.units);
      }

      if (behavior.input === "ELEMENT") {
        if (!behavior.input_element) {
          errors.push(`Converter input element is missing for "${name}".`);
        } else{
          converterFns.push(() => {
            if (behavior.input_element.toLowerCase() in nameMap) {
              let el = nameMap[behavior.input_element.toLowerCase()];
              // check that there is a link between the converter and the input element
              let connected = !!model.findLinks((l) => l.start === el && l.end === newPrimitive).length;

              if (!connected) {
                errors.push(`Converter input element "${behavior.input_element}" is not connected to the converter "${name}".`);
              } else {
                newPrimitive._node.setAttribute("Source", el.id);
              }
            } else {
              errors.push(`Converter input element "${behavior.input_element}" not found.`);
            }
          });
        }
      }

      break;
    }

    case "FLOW": {
      const fromName = el.from || null;
      const toName = el.to || null;
      if (fromName && !(fromName.toLowerCase() in nameMap)) {
        errors.push(`Flow "from" element "${fromName}" not found.`);
      }
      if (toName && !(toName.toLowerCase() in nameMap)) {
        errors.push(`Flow "to" element "${toName}" not found.`);
      }
      const fromPrim = fromName ? nameMap[fromName.toLowerCase()] : null;
      const toPrim = toName ? nameMap[toName.toLowerCase()] : null;

      newPrimitive = model.Flow(fromPrim, toPrim, {
        name,
        rate: behavior.value ?? "0",
        nonNegative: !!behavior.non_negative
      });

      if (!fromPrim && display.from_coordinates) {
        newPrimitive._node.geometry.sourcePoint = {
          x: display.from_coordinates[0],
          y: display.from_coordinates[1]
        };
      }
      if (!toPrim && display.to_coordinates) {
        newPrimitive._node.geometry.targetPoint = {
          x: display.to_coordinates[0],
          y: display.to_coordinates[1]
        };
      }
      if (behavior.units) {
        newPrimitive._node.setAttribute("Units", behavior.units);
      }
      break;
    }

    case "TRANSITION": {
      const fromName = el.from || null;
      const toName = el.to || null;
      if (fromName && !(fromName.toLowerCase() in nameMap)) {
        errors.push(`Transition "from" element "${fromName}" not found.`);
      }
      if (toName && !(toName.toLowerCase() in nameMap)) {
        errors.push(`Transition "to" element "${toName}" not found.`);
      }
      const fromPrim = fromName ? nameMap[fromName.toLowerCase()] : null;
      const toPrim = toName ? nameMap[toName.toLowerCase()] : null;

      newPrimitive = model.Transition(fromPrim, toPrim, {
        name,
        value: behavior.value ?? ""
      });

      if (!fromPrim && display.from_coordinates) {
        newPrimitive._node.geometry.sourcePoint = {
          x: display.from_coordinates[0],
          y: display.from_coordinates[1]
        };
      }
      if (!toPrim && display.to_coordinates) {
        newPrimitive._node.geometry.targetPoint = {
          x: display.to_coordinates[0],
          y: display.to_coordinates[1]
        };
      }

      let trigVal = null;
      if ((!behavior.trigger) || behavior.trigger === "TIMEOUT") {
        // default to TIMEOUT
        trigVal = "Timeout";
      } else if (behavior.trigger === "CONDITION") {
        trigVal = "Condition";
      } else if (behavior.trigger === "PROBABILITY") {
        trigVal = "Probability";
      }

      newPrimitive._node.setAttribute("Trigger", trigVal);
      break;
    }

    case "LINK": {
      const fromName = el.from || null;
      const toName = el.to || null;
      if (fromName && !(fromName.toLowerCase() in nameMap)) {
        errors.push(`Link "from" element "${fromName}" not found.`);
      }
      if (toName && !(toName.toLowerCase() in nameMap)) {
        errors.push(`Link "to" element "${toName}" not found.`);
      }
      const fromPrim = fromName ? nameMap[fromName.toLowerCase()] : null;
      const toPrim = toName ? nameMap[toName.toLowerCase()] : null;

      newPrimitive = model.Link(fromPrim, toPrim, {
        name
      });

      if (!fromPrim && display.from_coordinates) {
        newPrimitive._node.geometry.sourcePoint = {
          x: display.from_coordinates[0],
          y: display.from_coordinates[1]
        };
      }
      if (!toPrim && display.to_coordinates) {
        newPrimitive._node.geometry.targetPoint = {
          x: display.to_coordinates[0],
          y: display.to_coordinates[1]
        };
      }

      if (behavior.polarity === "POSITIVE") {
        newPrimitive._node.style = "END_ANNOTATION=+";
      } else if (behavior.polarity === "NEGATIVE") {
        newPrimitive._node.style = "END_ANNOTATION=-";
      }

      break;
    }

    default:
      let errorMessage = "";
      if (type) {
        errorMessage = `Unknown element type: ${type}. Expected "STOCK", "VARIABLE", "STATE", "CONVERTER", "FLOW", "TRANSITION", or "LINK".`;
      } else {
        errorMessage = `Element had no type: ${JSON.stringify(el)}.`;
      }

      errorMessage += ` At index ${elementIndex}.`;
      errors.push(errorMessage);

      break;
    }

    if (newPrimitive) {
      if (description) {
        newPrimitive._node.setAttribute("Note", description);
      }
      if (display.interactive) {
        newPrimitive._node.setAttribute("ShowSlider", "true");
        if ("interactive_min" in display) {
          newPrimitive._node.setAttribute("SliderMin", display.interactive_min);
        }
        if ("interactive_max" in display) {
          newPrimitive._node.setAttribute("SliderMax", display.interactive_max);
        }
      }

      if (name && type !== "LINK") {
        if (nameMap[name.toLowerCase()]) {
          errors.push(`Duplicate element name: ${name}. Elements other than LINKS's must have unique names in ModelJSON. Names are case-insensitive.`);
        }

        nameMap[name.toLowerCase()] = newPrimitive;
      }
    }
  }


  for (const fn of converterFns) {
    fn();
  }


  if (Array.isArray(data.units)) {
    model.customUnits = data.units.map(u => ({
      name: u.name,
      target: ("base" in u) ? u.base : "",
      scale: ("to_base" in u) ? u.to_base : 1
    }));
  }


  if (Array.isArray(data.visualizations)) {
    data.visualizations.forEach((viz) => {
      const { type, name, elements = [] } = viz;
      let dType = "Time Series";
      if (type === "TABLE") {
        dType = "Tabular";
      }

      const ids = elements
        .map(nm => nameMap[nm.toLowerCase()] ? nameMap[nm.toLowerCase()].id : null)
        .filter(id => !!id);

      model.visualizations.push({
        name,
        type: dType,
        primitives: ids
      });
    });
  }

  if (errors.length) {
    throwModelJSONError(errors);
  }

  return model;
}


class ModelJSONError extends Error {
  constructor(message, errorList = []) {
    super(message);
    this.name = "ModelJSONError";
    this.errors = errorList;
  }
}

/**
 * 
 * @param {string[]} errorList 
 */
function throwModelJSONError(errorList) {
  const message = `Errors occurred while loading the ModelJSON:\n\n${errorList.map(e => "- " + e).join("\n")}`;
  throw new ModelJSONError(message, errorList);
}
