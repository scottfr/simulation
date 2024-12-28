import { Model } from "../../src/api/Model.js";


test("Connector ends are correct", () => {
  let m = new Model();

  // Transition must connect to a state

  let s = m.Stock({
    name: "Stock"
  });
  // @ts-ignore
  m.Transition(null, s, {
    name: "Transition"
  });

  expect(() => m.simulate()).toThrow(/must be a state/);

  m = new Model();

  let v = m.Variable({
    name: "Variable"
  });
  // @ts-ignore
  m.Transition(v, null, {
    name: "Transition"
  });

  expect(() => m.simulate()).toThrow(/must be a state/);

  m = new Model();

  // Flow must connect to a stock

  let st = m.State({
    name: "State"
  });
  // @ts-ignore
  m.Flow(null, st, {
    name: "Flow"
  });

  expect(() => m.simulate()).toThrow(/must be a stock/);

  m = new Model();

  v = m.Variable({
    name: "Variable"
  });
  // @ts-ignore
  m.Flow(v, null, {
    name: "Flow"
  });

  expect(() => m.simulate()).toThrow(/must be a stock/);
});


test("Transition timeout cannot be negative", () => {
  let m = new Model();

  let s = m.State({
    name: "State"
  });
  let t = m.Transition(null, s, {
    name: "Transition"
  });

  t.trigger = "Timeout";


  t.value = "1";
  m.simulate(); // no error


  t.value = "-1";
  expect(() => m.simulate()).toThrow(/cannot be less/);
});


test("Invalid simulation time step", () => {
  let m = new Model();

  m.State({
    name: "State"
  });

  m.simulate(); // no error


  // @ts-ignore
  m.timeStep = "-1";
  expect(() => m.simulate()).toThrow(/time step must/);


  // @ts-ignore
  m.timeStep = "abc";
  expect(() => m.simulate()).toThrow(/time step must/);
});


test("Invalid simulation time length", () => {
  let m = new Model();

  m.State({
    name: "State"
  });

  m.simulate(); // mo error

  // @ts-ignore
  m.timeLength = "-1";
  expect(() => m.simulate()).toThrow(/time length must/);

  // @ts-ignore
  m.timeLength = "abc";
  expect(() => m.simulate()).toThrow(/time length must/);
});


test("Time pause can't be smaller than time step", () => {
  let m = new Model({
    timeStep: 10,
    timePause: 1
  });

  m.Stock();

  expect(() => m.simulate()).toThrow(/Time pause cannot be smaller/);
});


test("Agent population cannot be within an agent folder", () => {
  let m = new Model();

  let pop = m.Population({
    name: "Population",
    populationSize: 10
  });

  let f = m.Agent({
    name: "My Agent"
  });
  pop.parent = f;

  pop.agentBase = f;

  expect(() => m.simulate()).toThrow(/placed within/);
});


test("Agent location initialization", () => {
  let m = new Model();

  let pop = m.Population({
    name: "Population",
    populationSize: 10
  });

  let f = m.Agent({
    name: "My Agent"
  });
  let s = m.State({
    name: "State"
  });
  s.parent = f;

  m.Link(pop, s, {
    name: "Link"
  });

  s.startActive = "[Population].findNearest(self)";

  pop.agentBase = f;

  expect(() => m.simulate()).toThrow(/Location not initialized/);
});


test("Flow units must include time", () => {
  let m = new Model();

  let s = m.Stock({
    name: "Stock"
  });
  let f = m.Flow(s, null, {
    name: "Flow"
  });

  f.units = "widgets";
  expect(() => m.simulate()).toThrow(/Incompatible units for flow/);

  s.units = "widgets";
  expect(() => m.simulate()).toThrow(/Incompatible units for flow/);
});


test("Blank values are evaluated as 0", () => {
  let m = new Model();

  let v = m.Variable({
    name: "Variable"
  });
  v.value = "";

  let res = m.simulate();
  expect(res.value(v)).toBe(0);


  let s = m.Stock({
    name: "Stock"
  });
  s.initial = "";

  res = m.simulate();
  expect(res.value(s)).toBe(0);
});


test("Function calling method and errors", () => {
  let m = new Model();
  let v = m.Variable({
    name: "x",
    value: "years()"
  });

  let vO = m.Variable({
    name: "object",
    value: "[x].pastMean()"
  });


  let vP = m.Variable({
    name: "parameter",
    value: "pastMean([x])"
  });

  m.Link(v, vO);
  m.Link(v, vP);

  m.simulate(); // no error

  // error with object version
  vO.value = "[x].pastMean(1, 2)";
  expect(() => m.simulate()).toThrow(/PastMean\(Past/);


  // error with parameterized version
  vO.value = "[x].pastMean()";
  vP.value = "pastMean([x], 1, 2)";
  expect(() => m.simulate()).toThrow(/PastMean\(\[Primitive/);
});



test("Vector type matching", () => {
  let m = new Model();
  let x = m.Variable({
    name: "x",
    value: "{1, 2}"
  });

  let y = m.Variable({
    name: "y",
    value: "Delay([x], {a: 2, b: 3})"
  });

  m.Link(x, y);

  expect(() => m.simulate()).toThrow(/Vector keys do not match between/);

  y.value = "Delay([x], {a:1, b:2}, {1, 1})";
  expect(() => m.simulate()).toThrow(/Vector keys do not match between/);
});


test("Function calling evaluated paramters and checks types", () => {
  let m = new Model();
  let v = m.Variable({
    name: "x",
    value: "years()"
  });

  let vD = m.Variable({
    name: "delay",
    value: "10"
  });


  let vP = m.Variable({
    name: "parameter",
    value: "pastMean([x], [delay])"
  });

  m.Link(vD, vP);
  m.Link(v, vP);

  m.simulate(); // no error

  // error with string
  vD.value = "\"foo\"";
  expect(() => m.simulate()).toThrow(/does not accept string values/);


  // success with function
  vP.value = `
function df()
  return 10
end function
pastMean([x], df)
`;
  m.simulate(); // no error


  // error with function
  vP.value = `
function df()
  return "foo"
end function
pastMean([x], df)
`;
  expect(() => m.simulate()).toThrow(/does not accept string values/);
});


test("Cannot use state functions outside primitive", () => {
  let m  = new Model();
  m.Variable({
    value: "x()"
  });


  m.globals = `
  Function x()
    smooth(1, 10)
  End Function
  `;
  expect(() => m.simulate()).toThrow(/Smooth\(\) may only/);


  m.globals = `
  Function x()
    delay1(1, 10)
  End Function
  `;
  expect(() => m.simulate()).toThrow(/Delay1\(\) may only/);


  m.globals = `
  Function x()
    delay3(1, 10)
  End Function
  `;
  expect(() => m.simulate()).toThrow(/Delay3\(\) may only/);
});


test("Smooth errors attributed correctly", () => {
  let m = new Model();
  let v = m.Variable({
    value: `a<-1
    b<-2
    smooth(max("abc"), 10)
    c<-3`
  });

  try {
    m.simulate();
  } catch (err) {
    expect(err.primitive).toBe(v);
    expect(err.line).toBe(3);
  }

  v.value = `a<-1
    b<-2

    smooth(max("abc"), 10)
    c<-3`;
  try {
    m.simulate();
    // should never happen
    expect(false).toBe(true);
  } catch (err) {
    expect(err.primitive).toBe(v);
    expect(err.source).toBe("PRIMITIVE:VALUE");
    expect(err.line).toBe(4);


    expect(err.message).toContain("This value may only be numbers or vectors, found a string");
  }
});


test("Macro errors attributed correctly", () => {
  let m = new Model();
  m.globals = `function foo()
    xxx()
  end function
  `;
  m.Variable({
    value: "foo()"
  });

  try {
    m.simulate();
    // should never happen
    expect(false).toBe(true);
  } catch (err) {
    expect(err.primitive).toBe(undefined);

    expect(err.source).toBe("GLOBALS");

    // undefined as the error is in the macro
    expect(err.line).toBe(2);

    expect(err.message).toContain("The variable or function \"xxx\" does not exist");
  }
});


it("Invalid flow vectors", () => {
  let m = new Model();
  m.Variable({
    name: "v1",
    value: "1"
  });

  let s = m.Stock({
    name: "Stock",
    initial: "{1,2}"
  });
  let f = m.Flow(s, null, {
    name: "Flow",
    rate: "{1, 2, 3}"
  });

  m.Variable({
    name: "v2",
    value: "2"
  });

  
  try {
    m.simulate();
    // should never happen
    expect(false).toBe(true);
  } catch (err) {
    expect(err.primitive).toBe(f);

    expect(err.source).toBe("PRIMITIVE");

    expect(err.line).toBe(undefined);

    expect(err.message).toContain("Incompatible vector keys");
  }
});


it("Invalid converter source", () => {
  let m = new Model();
  let v = m.Variable({
    name: "v1",
    value: "\"abc\""
  });

  let c = m.Converter({
    name: "Converter",
    values: [{ x: 1, y: 1 }],
    input: v
  });

  m.Link(v, c);



  m.Variable({
    name: "v2",
    value: "2"
  });

  try {
    m.simulate();
    // should never happen
    expect(false).toBe(true);
  } catch (err) {
    expect(err.primitive).toBe(c);

    expect(err.source).toBe("PRIMITIVE");

    expect(err.line).toBe(undefined);

    expect(err.message).toBe("Converter inputs must be numbers or vectors.");
  }
});


test("Invalid name", () => {
  let m = new Model();
  let x = m.Variable({
    name: "[[f] [z]]",
    value: "1"
  });

  let y = m.Variable({
    name: "y",
    value: "[[f] [z]]"
  });

  m.Link(x, y);

  expect(() => m.simulate()).toThrow(/Invalid equation syntax/);

  y.value = "[]";
  expect(() => m.simulate()).toThrow(/Invalid equation syntax/);
});


test("Smooth errors due to wrong number of parameters", () => {
  let m = new Model();
  let v = m.Variable({
    value: "smooth(10)"
  });
  expect(() => m.simulate()).toThrow(/Wrong number/);


  v.value = "delay1(10, 11, 12, 14, 15)";
  expect(() => m.simulate()).toThrow(/Wrong number/);
  expect(() => m.simulate()).toThrow(/delay1/);
});


test("Smooth errors due to non-positive period", () => {
  let m = new Model();
  let v = m.Variable({
    value: "smooth(10, -1)"
  });
  expect(() => m.simulate()).toThrow(/must be greater than/);


  v.value = "delay1(10, 0)";
  expect(() => m.simulate()).toThrow(/must be greater than/);


  v.value = "delay3(10, -9)";
  expect(() => m.simulate()).toThrow(/must be greater than/);
});


test("Invalid simulation units", () => {
  let m = new Model();

  m.State({
    name: "State"
  });

  m.simulate(); // mo error

  // @ts-ignore
  m.timeUnits = "";
  expect(() => m.simulate()).toThrow(/must set the time units/);
});


test("Invalid ifThenElse", () => {
  let m = new Model();
  m.Variable({
    value: `IfThenElse({
      x: 4
    }, {
      x: {1}
    }, {
      x: {2}
    })`
  });

  expect(() => m.simulate()).toThrow(/Keys do not match/);
});


test("Ambiguous primitive names", () => {
  let m = new Model();

  let x1 = m.Variable({
    name: "x",
    value: "1"
  });
  let x2= m.Variable({
    name: "x",
    value: "2"
  });
  let y = m.Variable({
    name: "y",
    value: "[x]"
  });

  m.Link(x1, y);

  let res = m.simulate();
  expect(res.value(y)).toBe(1);

  m.Link(x2, y);
  expect(() => m.simulate()).toThrow(/\[x\] is ambiguous/);
});


test("Units mismatch", () => {
  let m = new Model();
  let x = m.Variable({
    name: "x",
    value: "1"
  });
  let y = m.Variable({
    name: "y",
    value: "1"
  });

  m.Link(x, y);

  // sugestion is shown when it's a matieral

  y.value = "1 + {1 meter}";
  expect(() => m.simulate()).toThrow("Consider replacing 1 with {1 meter}");

  y.value = "{1 meter} + 2";
  expect(() => m.simulate()).toThrow("Consider replacing 2 with {2 meter}");


  // suggestion is shown when it's a primitive

  y.value = "[x] + {1 meter}";
  expect(() => m.simulate()).toThrow("Consider setting the units of [x] to meter.");

  y.value = "{1 meter} + [x]";
  expect(() => m.simulate()).toThrow("Consider setting the units of [x] to meter.");

  
  // suggestion is not shown when it is a function

  y.value = "seconds() + {1 meter}";
  try {
    m.simulate();
    // should never reach this point
    expect(true).toBe(false);
  } catch (err) {
    expect(err.message).not.toContain("Consider");
  }
});