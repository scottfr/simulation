import { setupComplexExample } from "../TestUtilities.js";


test("Primitive Get and Set", () => {
  let m = setupComplexExample();

  let x = m.getStock(x => x.name === "x");
  x.name = "xyz";
  expect(x.name).toBe("xyz");

  x.note = "abc";
  expect(x.note).toBe("abc");

  x.initial = "123";
  expect(x.initial).toBe("123");

  let fl = m.getFlow(x => x.name === "My Flow");
  fl.rate = "098";
  expect(fl.rate).toBe("098");

  fl.units = "Qubits";
  expect(fl.units).toBe("Qubits");

  fl.constraints = { max: 10, min: -10 };
  expect(fl.constraints).toEqual({ max: 10, min: -10 });

  fl.nonNegative = true;
  expect(fl.nonNegative).toBe(true);
  fl.nonNegative = false;
  expect(fl.nonNegative).toBe(false);

  let s = m.getStock(x => x.name === "My Stock");

  s.nonNegative = true;
  expect(s.nonNegative).toBe(true);
  s.nonNegative = false;
  expect(s.nonNegative).toBe(false);

  s.delay = 5;
  expect(s.delay).toBe("5");

  s.type = "Conveyor";
  expect(s.type).toBe("Conveyor");
  s.type = "Store";
  expect(s.type).toBe("Store");


  let c = m.getConverter(x => x.name === "My Converter");
  c.values = [{x: 1, y: 2}];
  expect(c.values).toEqual([{x: 1, y: 2}]);
  c.input = s;
  expect(c.input).toBe(s);
  c.input = "Time";
  expect(c.input).toBe("Time");
  c.interpolation = "Linear";
  expect(c.interpolation).toBe("Linear");

  let state = m.State({
    name: "My State"
  });
  state.startActive = "abc";
  expect(state.startActive).toBe("abc");

  expect(state.residency).toBe("0");
  state.residency = "xyz";
  expect(state.residency).toBe("xyz");

  let transition = m.Transition(state, null, {
    name: "My Transition"
  });
  transition.value = "abc1";
  expect(transition.value).toBe("abc1");

  expect(transition.trigger).toBe("Timeout");
  transition.trigger = "Condition";
  expect(transition.trigger).toBe("Condition");
  expect(transition.repeat).toBe(false);
  transition.repeat = true;
  expect(transition.repeat).toBe(true);
  expect(transition.recalculate).toBe(false);
  transition.recalculate = true;
  expect(transition.recalculate).toBe(true);

  let action = m.Action({
    name: "My Action"
  });

  action.action = "abc1";
  expect(action.action).toBe("abc1");

  action.value = "abc123";
  expect(action.value).toBe("abc123");

  expect(action.trigger).toBe("Probability");
  action.trigger = "Timeout";
  expect(action.trigger).toBe("Timeout");

  expect(action.repeat).toBe(true);
  action.repeat = false;
  expect(action.repeat).toBe(false);

  expect(action.recalculate).toBe(false);
  action.recalculate = true;
  expect(action.recalculate).toBe(true);


  let agents = m.Population({
    name: "My Agents"
  });
  agents.populationSize = 123;
  expect(agents.populationSize).toBe(123);

  agents.geoUnits = "foo bar";
  expect(agents.geoUnits).toBe("foo bar");

  agents.geoHeight = "foo bar 1";
  expect(agents.geoHeight).toBe("foo bar 1");

  agents.geoWidth = "foo bar 2";
  expect(agents.geoWidth).toBe("foo bar 2");

  // @ts-ignore
  agents.geoPlacementType = "foo bar 3";
  expect(agents.geoPlacementType).toBe("foo bar 3");

  agents.geoPlacementFunction = "foo bar 4";
  expect(agents.geoPlacementFunction).toBe("foo bar 4");

  // @ts-ignore
  agents.networkType = "foo bar 5";
  expect(agents.networkType).toBe("foo bar 5");

  agents.networkFunction = "foo bar 6";
  expect(agents.networkFunction).toBe("foo bar 6");

  agents.geoWrapAround = true;
  expect(agents.geoWrapAround).toBe(true);
  agents.geoWrapAround = false;
  expect(agents.geoWrapAround).toBe(false);

  let f = m.Agent({
    name: "f"
  });
  m.Link(f, agents, {
    name: "Link"
  });
  agents.agentBase = f;
  expect(agents.agentBase).toBe(f);
});

