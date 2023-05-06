import { Model } from "../../src/api/Model.js";


test("Macros", () => {
  let m = new Model();

  let mString = `a <- 52
  f(x)<-x^2`;

  m.globals = mString;
  expect(m.globals).toBe(mString);


  let p1 = m.Variable({
    name: "p1"
  });
  let p2 = m.Variable({
    name: "p2"
  });
  p1.value = "a";
  p2.value = "f(2)";
  let res = m.simulate();
  expect(res.series(p1)[3]).toBe(52);
  expect(res.series(p2)[3]).toBe(4);
});


test("Macros time settings", () => {
  let m = new Model();

  let mString = "x <- removeUnits(timeStep, \"years\")";

  m.globals = mString;
  expect(m.globals).toBe(mString);


  let p1 = m.Variable({
    name: "p1"
  });
  p1.value = "x";
  let res = m.simulate();
  expect(res.series(p1)[3]).toBe(1);
});


test("Macros error", () => {
  let m = new Model();

  m.globals = "x <- 1/";

  expect(() => m.simulate()).toThrow("error with the macros");
});
