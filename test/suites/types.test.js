import { Model } from "../../src/api/Model.js";
import { check, failure } from "../TestUtilities.js";


test("Number", () => {
  let m = new Model();

  let x = m.Variable({
    name: "tester"
  });
  x.value = "1 > 2";

  let res = m.simulate();

  expect(res.series(x)[0]).toBe(0);
});


test("Booleans", () => {
  let m = new Model();

  let x = m.Variable({
    name: "tester"
  });
  // can do strict equality with booleans
  x.value = "true = true";

  let res = m.simulate();
  expect(res.series(x)[0]).toBe(1);

  // can't do inequality with booleans
  x.value = "true > true";

  expect(() => m.simulate()).toThrow(/Cannot /);
});


test("Strings", () => {
  let m = new Model();

  let x = m.Variable({
    name: "tester"
  });
  // can do strict equality with string
  x.value = "\"a\" = \"a\"";

  let res = m.simulate();
  expect(res.series(x)[0]).toBe(1);

  // can't do inequality with strings
  x.value = "\"a\" > \"a\"";

  expect(() => m.simulate()).toThrow(/Cannot /);
});


test("Functions", () => {
  let m = new Model();

  let x = m.Variable({
    name: "tester"
  });

  // functions are evaluated
  x.value = "z <- Function()\n 10\n end function\n\n z > 1";
  let res = m.simulate();
  expect(res.value(x)).toBe(1);


  // functions are evaluated
  x.value = "z <- Function()\n 1\n end function\n\n z > 1";
  res = m.simulate();
  expect(res.value(x)).toBe(0);
});


test("Stock values must be vector/material", () => {
  let m = new Model();

  let s = m.Stock({
    name: "tester"
  });
  s.initial = "\"abc\"";

  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);

  s.initial = "{\"abc\"}";
  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);

  s.initial = "{true, false}";
  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);

  // note a single boolean is allowed and is converted to 1/0
});



test("Flow values must be vector/material", () => {
  let m = new Model();

  let s = m.Flow(null, null, {
    name: "tester"
  });
  s.rate = "\"abc\"";

  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);

  s.rate = "{\"abc\"}";
  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);

  s.rate = "{true, false}";
  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);

  s.rate = "true";
  expect(() => m.simulate()).toThrow(/only be numbers or vectors/);
});



test("Variable values must be vector/material when it has units", () => {
  let m = new Model();

  let s = m.Variable({
    name: "tester"
  });
  s.units = "foo";

  s.value = "\"abc\"";
  expect(() => m.simulate()).toThrow(/Cannot add units/);

  s.value = "{\"abc\"}";
  expect(() => m.simulate()).toThrow(/Cannot add units/);

  s.value = "{true, false}";
  expect(() => m.simulate()).toThrow(/Cannot add units/);

  // note a single boolean is allowed and is converted to 1/0

  // when we don't have units, any type is allowed
  s.units = "";

  s.value = "\"abc\"";
  m.simulate(); // no error

  s.value = "{\"abc\"}";
  m.simulate(); // no error

  s.value = "{true, false}";
  m.simulate(); // no error
});


test("Failed type conversions", () => {
  check("3 * 2", 6);
  failure("2 * 'abc'", "Cannot convert");
  failure("2 * true", "Cannot convert");
  failure("'abc' * 2", "Cannot convert");
  failure("true * 2", "Cannot convert");


  check("6 / 2", 3);
  failure("6 / 'abc'", "Cannot convert");
  failure("6 / true", "Cannot convert");


  check("6 ^ 2", 36);
  failure("6 ^ 'abc'", "Cannot convert");
  failure("6 ^ true", "Cannot convert");


  check("6 + 2", 8);
  check("6 + 'abc'", "6abc");
  failure("6 + true", "Cannot convert");
  check("'abc' + 6", "abc6");
  failure("false + 6", "Cannot convert");


  check("6 - 2", 4);
  failure("6 - 'abc'", "Cannot convert");
  failure("6 - true", "Cannot convert");


  check("6 % 2", 0);
  failure("6 % 'abc'", "Cannot convert");
  failure("6 % true", "Cannot convert");
});