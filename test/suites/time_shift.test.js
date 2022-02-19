import { Model } from "../../src/api/Model.js";


test("Time Shift", () => {
  let m = new Model();

  let A = m.Stock({
    name: "A"
  });
  let B = m.Stock({
    name: "B"
  });
  let flowA = m.Flow(null, A, {
    name: "Flow A"
  });
  let flowB = m.Flow(null, B, {
    name: "Flow B"
  });

  A.initial = 10;
  B.initial = 10;
  flowA.rate = "0.1*[A]";
  flowB.rate = "0.1*[B]";


  let fA = m.Folder({
    name: "f A"
  });
  let fB = m.Folder({
    name: "f B"
  });

  A.parent = fA;
  flowA.parent = fA;

  B.parent = fB;
  flowB.parent = fB;

  m.timeLength = 10;
  m.timeStep = 1;
  m.algorithm = "Euler";

  let res = m.simulate();
  expect(res.series(A)[1]).toBe(11);
  expect(res.series(B)[1]).toBe(11);

  fA.customTimeSettings = { enabled: true, algorithm: "RK4", timeStep: 1 };
  res = m.simulate();
  expect(Math.round(res.series(A)[1] * 1000)).toBe(Math.round(11.051708 * 1000));
  expect(res.series(B)[1]).toBe(11);

  fB.customTimeSettings = { enabled: true, algorithm: "Euler", timeStep: 2.5 };
  res = m.simulate();
  expect(Math.round(res.series(A)[1] * 1000)).toBe(Math.round(11.051708 * 1000));
  expect(res.series(B)[1] === undefined).toBe(true);
  expect(res.series(B)[3]).toBe(12.5);
  expect(res.series(A)[3] === undefined).toBe(true);

  fA.customTimeSettings = { enabled: true, algorithm: "RK4", timeStep: 2.5 };
  fB.customTimeSettings = { enabled: true, algorithm: "Euler", timeStep: 1 };
  res = m.simulate();
  expect(res.series(A)[1] === undefined).toBe(true);
  expect(res.series(B)[1]).toBe(11);
  expect(Math.round(res.series(A)[3] * 1000)).toBe(Math.round(12.8401699 * 1000));
  expect(res.series(B)[3] === undefined).toBe(true);
});