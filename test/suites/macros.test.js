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
