import { Stock, Variable } from "../../src/api/Blocks.js";
import { Model } from "../../src/api/Model.js";
import { areResultsDifferent, setupComplexExample } from "../TestUtilities.js";


test("find()", () => {
  let m = setupComplexExample();

  expect(m.findStocks()).toHaveLength(4);
  expect(m.find(item => item.note === "foo")).toHaveLength(0);
  m.findStocks().forEach(s => s.note = "foo");
  expect(m.find(item => item.note === "foo")).toHaveLength(4);

  expect(m.find(item => item instanceof Stock || item instanceof Variable)).toHaveLength(6);

  expect(m.find()).toHaveLength(10);

  expect(m.find(s => s.name === "fdfsdgfg")).toHaveLength(0);
  expect(m.find(s => s.name === "y")).toHaveLength(2);
  expect(m.find(s => ["x", "y", "fvdf"].includes(s.name))).toHaveLength(3);

  let id = m.get(x => x.name === "x").id;
  expect(m.getId(id)).not.toBeNull();
  expect(() => m.getId("gfdgdfg")).toThrow(/No matching/);
});


test("Simulation equality", () => {
  let m = new Model();

  let s = m.Stock({
    name: "x"
  });
  let f = m.Flow(null, s, {
    name: "f"
  });
  f.rate = "[x]*.01";
  s.initial = 100;

  let res1 = m.simulate();
  let res2 = m.simulate();

  s.initial = 120;
  let res3 = m.simulate();

  expect(areResultsDifferent(res1._data, res2._data)).toBe(false);
  expect(areResultsDifferent(res1._data, res3._data)).toBeTruthy();
});


test("Simulation equality - vectors", () => {
  let m = new Model();

  let s = m.Stock({
    name: "x"
  });
  let f = m.Flow(null, s, {
    name: "f"
  });
  f.rate = "{1, 1}";
  s.initial = "{1, 2}";

  let res1 = m.simulate();
  let res2 = m.simulate();

  s.initial = "{2,2}";
  let res3 = m.simulate();

  expect(areResultsDifferent(res1._data, res2._data)).toBe(false);
  expect(areResultsDifferent(res1._data, res3._data)).toBeTruthy();
});


it("ConverterTable", () => {
  let m = new Model();

  let c = m.Converter({
    name: "Conv",
    values: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 9}]
  });

  let v = m.Variable({
    name: "v",
    value: "ConverterTable([Conv])"
  });

  m.Link(c, v);

  let res = m.simulate();

  expect(res.value(v)).toEqual([{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 9}]);


  v.value = "ConverterTable(1)";

  expect(() => m.simulate()).toThrow("requires a primitive for the parameter");

  let v2 = m.Variable({
    name: "v2",
    value: "1"
  });

  m.Link(v2, v);

  v.value = "ConverterTable([v2])";

  expect(() => m.simulate()).toThrow("requires a Converter primitive as its parameter");
});


it("Unicode in primitive names, units and identifier names", () => {
  let m = new Model();

  m.globals = `
  function 四舍五入(数字)
    return round(数字 * 100) / 100
  end function
  `;

  let s = m.Stock({
    name: "钱",
    units: "美元",
    initial: "100"
  });
  let f = m.Flow(null, s, {
    name: "利息",
    units: "美元/years",
    rate: "[ταχύτητα]*[钱]"
  });
  let r = m.Variable({
    name: "ταχύτητα",
    value: "0.01",
    units: "1/years"
  });
  m.Link(r, f);

  let rounded = m.Variable({
    name: "rounded",
    value: "四舍五入([钱])",
    units: "美元"
  });

  m.Link(s, rounded);

  let res = m.simulate();

  expect(res.value(s, 0)).toBe(100);
  expect(res.value(s, 1)).toBe(101);

  expect(Math.round(res.value(s, 20) * 100) / 100).toBe(res.value(rounded, 20));
});