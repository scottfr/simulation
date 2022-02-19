import { Model } from "../../src/api/Model.js";


test("units and constraints", () => {
  let m = new Model();

  let x = m.Variable({
    name: "tester"
  });
  x.value = "time";
  x.units = "Seconds";

  m.simulate(); // no error;

  x.units = "Qubits";
  expect(() => m.simulate()).toThrow();

  x.units = "Minutes";
  m.simulate(); // no error;

  x.constraints = {
    max: 10
  };
  expect(() => m.simulate()).toThrow();

  x.constraints = {};
  m.simulate(); // no error

  x.constraints = {
    min: 5
  };
  expect(() => m.simulate()).toThrow();

  x.constraints = {};
  m.simulate(); // no error
});


test("square root and units", () => {
  let m = new Model();

  let x = m.Variable({
    name: "tester"
  });
  x.value = "sqrt({4 square meters}) * {3 square meters}";
  x.units = "meters^3";


  let res = m.simulate();
  expect(res.series(x)[10]).toBe(6);
});