import { Model } from "../../src/api/Model.js";


test("Simulation get and set", () => {
  let m = new Model();

  m.algorithm = "RK4";
  expect(m.algorithm).toBe("RK4");

  m.timeStep = 72;
  expect(m.timeStep).toBe(72);

  m.timeLength = 43;
  expect(m.timeLength).toBe(43);

  m.timeStart = 32;
  expect(m.timeStart).toBe(32);

  m.timePause = 2;
  expect(m.timePause).toBe(2);

  m.timeUnits = "Weeks";
  expect(m.timeUnits).toBe("Weeks");
});