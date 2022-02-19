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
  }
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