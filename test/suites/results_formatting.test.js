import { Model } from "../../src/api/Model.js";


test("Results formatting", () => {
  let m = new Model();
  let x = m.Variable({
    name: "Test Variable"
  });

  // string value
  x.value = "'abc'";
  let res = m.simulate();
  expect(res.series(x)[0]).toBe("abc");

  // boolean value
  x.value = "true";
  res = m.simulate();
  expect(res.series(x)[0]).toBe(1);

  x.value = "false";
  res = m.simulate();
  expect(res.series(x)[0]).toBe(0);

  // vector boolean
  x.value = "{true, false}";
  res = m.simulate();
  expect(JSON.stringify(res.series(x)[0])).toBe("[true,false]");

  // vector num
  x.value = "{1, 2}";
  res = m.simulate();
  expect(JSON.stringify(res.series(x)[0])).toBe("[1,2]");

  // named vector boolean
  x.value = "{a: true, b: false}";
  res = m.simulate();
  expect(JSON.stringify(res.series(x)[0])).toBe("{\"a\":true,\"b\":false}");

  // named vector num
  x.value = "{a: 1, b: 0}";
  res = m.simulate();
  expect(JSON.stringify(res.series(x)[0])).toBe("{\"a\":1,\"b\":0}");

  // named vector string
  x.value = "{a: 'a', b: 'b'}";
  res = m.simulate();
  expect(JSON.stringify(res.series(x)[0])).toBe("{\"a\":\"a\",\"b\":\"b\"}");
});