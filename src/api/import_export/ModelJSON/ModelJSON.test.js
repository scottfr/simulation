import { loadModelJSON, createModelJSON } from "./ModelJSON.js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Model, toModelJSON } from "../../Model.js";
// simulation package imports
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("ModelJSON samples", () => {
  let samplesDir = join(__dirname, "samples");
  let jsonFiles = readdirSync(samplesDir).filter(file => file.endsWith(".json"));

  jsonFiles.forEach(file => {
    test(`should correctly process ${file}`, () => {
      let filePath = join(samplesDir, file);
      let originalJson = JSON.parse(readFileSync(filePath, "utf8"));
            
      let loadedModel = loadModelJSON(originalJson);
      expect(loadedModel).toBeTruthy();


      loadedModel.simulate(); // no error
            
      let exportedJson = createModelJSON(loadedModel);

      // sort the elements array in each
      originalJson.elements.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      exportedJson.elements.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      // CLD example does not have engine and simulation properties
      if (!originalJson.engine) {
        delete exportedJson.engine;
      }
      if (!originalJson.simulation) {
        delete exportedJson.simulation;
      }
      
      expect(exportedJson).toEqual(originalJson);
    });
  });
});


test("Links are case insensitive", () => {
  let model = loadModelJSON({
    elements: [
      {
        type: "VARIABLE",
        name: "x",
        behavior: {
          value: 2
        }
      },
      {
        type: "VARIABLE",
        name: "y",
        behavior: {
          value: "[x] * 3"
        }
      },
      {
        type: "LINK",
        from: "x",
        to: "y"
      }
    ]
  });
    
  let res = model.simulate();
  expect(res.value(model.get(z => z.name === "y"))).toBe(6);


  model = loadModelJSON({
    elements: [
      {
        type: "VARIABLE",
        name: "X",
        behavior: {
          value: 2
        }
      },
      {
        type: "VARIABLE",
        name: "y",
        behavior: {
          value: "[x] * 3"
        }
      },
      {
        type: "LINK",
        from: "x",
        to: "y"
      }
    ]
  });
    
  res = model.simulate();
  expect(res.value(model.get(z => z.name === "y"))).toBe(6);




  model = loadModelJSON({
    elements: [
      {
        type: "VARIABLE",
        name: "x",
        behavior: {
          value: 2
        }
      },
      {
        type: "VARIABLE",
        name: "y",
        behavior: {
          value: "[x] * 3"
        }
      },
      {
        type: "LINK",
        from: "X",
        to: "Y"
      }
    ]
  });
    
  res = model.simulate();
  expect(res.value(model.get(z => z.name === "y"))).toBe(6);

});


test("Invalid ModelJSON", () => {
  expect(() => loadModelJSON({
    elements: [
      "abc"
    ]
  })).toThrow("Element had no type: \"abc\". At index 0.");


  expect(() => loadModelJSON({
    elements: [
      {type: "CAT"}
    ]
  })).toThrow("Unknown element type: CAT");


  expect(() => loadModelJSON({
    engine: "INVALID",
    elements: [ ]
  })).toThrow("Invalid value \"INVALID\" given for \"engine\"");


  try {
    loadModelJSON({
      engine: "INVALID",
      elements: [ ]
    });
    expect(1).toBe(2); // should never reach here
  } catch (e) {
    expect(e.errors).toHaveLength(1);
  }


  try {
    loadModelJSON({
      engine: "INVALID",
      elements: [ 1, 2, 3 ]
    });
    expect(1).toBe(2); // should never reach here
  } catch (e) {
    expect(e.errors).toHaveLength(4);
  }


  expect(() => loadModelJSON("hi")).toThrow("not an object");


  // Converter data is well structured
  expect(() => loadModelJSON({
    elements: [
      {type: "CONVERTER", behavior: { data: "foo" }}
    ]
  })).toThrow("Converter data should be an array");

  expect(() => loadModelJSON({
    elements: [
      {type: "CONVERTER", behavior: { data: [[1,2,3]] }}
    ]
  })).toThrow("Converter data should be an array");


  // unknown polarity
  expect(() => loadModelJSON({
    elements: [
      {type: "LINK", behavior: { polarity: "foo" }}
    ]
  })).toThrow("Invalid value \"foo\" given for \"polarity\"");


  // error on unknown key

  expect(() => loadModelJSON({
    foo: "abc",
    elements: []
  })).toThrow("Invalid property \"foo\" found in the model.");


  // but "_" key's are ignored

  expect(() => loadModelJSON({
    "_foo": "abc",
    elements: []
  })).not.toThrow();


  // error on non-object keys that should be objects

  expect(() => loadModelJSON({
    simulation: true,
    elements: []
  })).toThrow(/Property "simulation" requires an object value. Got: true/);


  expect(() => loadModelJSON({
    simulation: [1],
    elements: []
  })).toThrow(/Property "simulation" requires an object value. Got: \[1\]/);


});


test("ModelJSON linkage errors", () => {
  // converter input does not exist
  expect(() => loadModelJSON({
    elements: [
      {
        type: "CONVERTER",
        name: "A",
        behavior: {
          input: "ELEMENT",
          input_element: "foo"
        }
      }
    ]
  })).toThrow("Converter input element \"foo\" not found.");

  // flow to/from does not exist
  expect(() => loadModelJSON({
    elements: [
      {
        type: "FLOW",
        name: "A",
        from: "x",
        to: "y"
      }
    ]
  })).toThrow("Flow \"from\" element \"x\" not found.");

});


test("Time units imported/exported correctly", () => {
  // simulation uses units like "Months"
  // ModelJSON uses "MONTHS"

  let inputJson = {
    simulation: {
      time_units: "MONTHS"
    },
    elements: [
      {
        type: "VARIABLE",
        name: "a",
        behavior: {
          value: 10
        }
      }
    ]
  };

  let model = loadModelJSON(inputJson);
  expect(model.timeUnits).toBe("Months");

  const exported = createModelJSON(model);
  expect(exported.simulation.time_units).toBe("MONTHS");


  // missing units default to year

  delete inputJson.simulation.time_units;

  model = loadModelJSON(inputJson);
  expect(model.timeUnits).toBe("Years");


  // invalid units throw error

  inputJson.simulation.time_units = "foo";

  expect(() => loadModelJSON(inputJson)).toThrow(/foo/);
});


it("Duplicate names", () => {
  // importing ModelJSON

  let inputJson = {
    simulation: {
      time_units: "MONTHS"
    },
    elements: [
      {
        type: "VARIABLE",
        name: "a",
        behavior: {
          value: 10
        }
      },
      {
        type: "VARIABLE",
        name: "a",
        behavior: {
          value: 10
        }
      }
    ]
  };


  expect(() => loadModelJSON(inputJson)).toThrow(/unique/);


  // exporting ModelJSON

  let m = new Model();

  m.Stock({
    name: "stock 1"
  });

  m.Stock({
    name: "stock 1"
  });

  expect(() => toModelJSON(m)).toThrow(/unique/);
});

it("Converters referencing each other are imported correctly", () => {
  let inputJson = {
    elements: [
      {
        type: "CONVERTER",
        name: "A",
        behavior: {
          input: "ELEMENT",
          input_element: "B",
          data: [
            [1, 2]
          ]
        }
      },
      {
        type: "CONVERTER",
        name: "B",
        behavior: {
          input: "ELEMENT",
          input_element: "A",
          data: [
            [2, 3]
          ]
        }
      },
      {
        type: "LINK",
        from: "A",
        to: "B",
      },
      {
        type: "LINK",
        from: "B",
        to: "A",
      }
    ]
  };

  let model = loadModelJSON(inputJson);

  expect(() => model.simulate()).toThrow("Circular equation loop identified including the primitives: A, B");
});