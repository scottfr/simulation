import { Model } from "../../src/api/Model.js";


describe.each([
  ["Euler"], ["RK4"]
])("Subscripting %s",
/**
 * @param {"Euler"|"RK4"} algorithm
 */
  (algorithm) => {
    test("Countries", () => {
      let m = new Model({ algorithm });


      m.timeUnits = "Years";
      m.timeLength = 20;


      expect(() => m.simulate()).not.toThrow();


      let p = m.Stock({
        name: "Population"
      });
      let r = m.Variable({
        name: "Rate"
      });
      let f = m.Flow(null, p, {
        name: "Growth"
      });
      m.Link(r, f, {
        name: "Link"
      });

      let a = m.Variable({
        name: "Aggregate"
      });
      let b = m.Variable({
        name: "Aggregate 2"
      });
      m.Link(p, a, {
        name: "Link"
      });
      m.Link(p, b, {
        name: "Link"
      });

      p.initial = "{'a': 10, 'b': 5}";
      f.rate = "[Rate]";
      r.value = "{a: 2, b: 1}";
      a.value = "[Population]{\"a\"}";
      b.value = "[Population]{\"b\"}";

      let res = m.simulate();
      expect(res.series(a)[10]).toBe(30);
      expect(res.series(b)[10]).toBe(15);


      a.value = "[Population]{mean}";
      b.value = "[Population]{max}";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(45 / 2);
      expect(res.series(b)[10]).toBe(30);

      r.value = "2";
      expect(() => m.simulate()).toThrow();

      r.value = "repeat(2, {'a', 'b'})";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(55 / 2);
      expect(res.series(b)[10]).toBe(30);

      p.initial = "{'males': {canada:1, usa:2,'mexico':3}, 'females': {'usa':20, 'canada':10, 'mexico': 30} }";

      a.value = "([Population]{\"males\", *}).usa";
      b.value = "[Population]{\"females\", \"mexico\"}";
      expect(() => m.simulate()).toThrow();

      r.value = "repeat(repeat(2, {'canada', 'usa', 'mexico'}), {'males', 'females'})";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 20);
      expect(res.series(b)[10]).toBe(30 + 20);

      a.value = "[Population]{\"males\", max}";
      b.value = "[Population]{min, \"canada\"}";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(3 + 20);
      expect(res.series(b)[10]).toBe(1 + 20);

      a.value = "([Population]{\"males\", *}){\"USA\"}";
      b.value = "([Population]{* , \"mexico\"}){\"Females\"}";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 20);
      expect(res.series(b)[10]).toBe(30 + 20);

      a.value = "([Population]{\"males\", *}){\"USA\"}";
      b.value = "([Population]{* , \"mexico\"}).Females";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 20);
      expect(res.series(b)[10]).toBe(30 + 20);


      r.value = "{males: repeat(3, {'canada', 'usa', 'mexico'}), females: repeat(1, {'canada', 'usa', 'mexico'})}";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 30);
      expect(res.series(b)[10]).toBe(30 + 10);

      p.nonNegative = false;
      f.nonNegative = true;
      r.value = "{'males': repeat(3, {'canada', 'usa', 'mexico'}), 'females': repeat(-4, {'canada', 'usa', 'mexico'})}";
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 30);
      expect(res.series(b)[10]).toBe(30 + 0);

      f.nonNegative = false;
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 30);
      expect(res.series(b)[10]).toBe(30 - 40);

      p.nonNegative = true;
      res = m.simulate();
      expect(res.series(a)[10]).toBe(2 + 30);
      expect(res.series(b)[10]).toBe(0);

      p.nonNegative = false;
      p.constraints = {
        min: -100,
        max: 100
      };
      expect(() => m.simulate()).not.toThrow();

      p.constraints = {
        min: -5,
        max: 100
      };
      expect(() => m.simulate()).toThrow();

      p.constraints = {
        min: -100,
        max: 31
      };
      expect(() => m.simulate()).toThrow();


      p.constraints = {};
      expect(() => m.simulate()).not.toThrow();

      p.units = "Widgets";
      a.units = "Widgets";
      b.units = "Widgets";

      f.units = "Widgets/Year";
      r.units = "Widgets/Year";

      expect(() => m.simulate()).not.toThrow();


      p.initial = "{'males': {'canada':1,'usa':{2 cats},'mexico':3}, 'females': {'usa':20, 'canada':10, 'mexico': 30} }";
      expect(() => m.simulate()).toThrow();

      p.initial = "{'males': {'canada':1,'usa':{2 widgets},'mexico':3}, 'females': {'usa':20, 'canada':10, 'mexico': 30} }";

      expect(() => m.simulate()).not.toThrow();


      p.type = "Conveyor";
      p.delay = 5;
      res = m.simulate();
      expect(res.series(a)[14]).toBe(2 + 30);
      expect(Math.round(res.series(b)[14] * 100000)).toBe((30 - 40) * 100000);


      a.value = "([Population]{\"males\", *}){\"India\"}";
      expect(() => m.simulate()).toThrow();

      a.value = "([Population]{\"foobar\", *}){\"USA\"}";
      expect(() => m.simulate()).toThrow();
    });


    test("Animals", () => {
      let m = new Model({ algorithm });


      let p = m.Stock({
        name: "Population"
      });
      let p2 = m.Stock({
        name: "Population 2"
      });
      let r = m.Variable({
        name: "Rate"
      });
      let f = m.Flow(p, p2, {
        name: "Growth"
      });
      m.Link(r, f, {
        name: "Link"
      });

      let a = m.Variable({
        name: "Aggregate"
      });
      m.Link(p2, a, {
        name: "Link"
      });
      let b = m.Variable({
        name: "Aggregate 2"
      });
      m.Link(p, b, {
        name: "Link"
      });

      p.initial = 100;
      p2.initial = 0;
      f.rate = "[Rate]";
      r.value = "{'dogs':1, 'cats':2}";
      let res = m.simulate();
      expect(res.series(p)[10]).toBe(100 - 10 * 3);
      expect(res.series(p2)[10]).toBe(0 + 10 * 3);

      p2.initial = "{'dogs':5, 'cats':4}";
      a.value = "[population 2]{'dogs'}";
      res = m.simulate();
      expect(res.series(p)[10]).toBe(100 - 10 * 3);
      expect(res.series(a)[10]).toBe(5 + 10 * 1);

      r.value = "{'dogs': {'x': 1, 'y':2}, 'cats': {'x':3, 'y':4} }";
      res = m.simulate();
      expect(res.series(p)[10]).toBe(100 - 10 * 10);
      expect(res.series(a)[10]).toBe(5 + 10 * 3);

      p.initial = "{x:40, y:60}";
      b.value = "[Population]{'x'}";
      res = m.simulate();
      expect(res.series(b)[10]).toBe(40 - 4 * 10);
      expect(res.series(a)[10]).toBe(5 + 10 * 3);

      p2.initial = "{'dogs':5, 'cats':4, rats:6}";
      r.value = "{'dogs': {'x': 1, 'y':2}, 'cats': {'x':3, 'y':4}, 'rats': {'x':9, 'y':10} }";
      res = m.simulate();
      expect(res.series(b)[10]).toBe(40 - 13 * 10);
      expect(res.series(a)[10]).toBe(5 + 10 * 3);

      f.start = p2;
      f.end = p;
      res = m.simulate();
      expect(res.series(b)[10]).toBe(40 + 13 * 10);
      expect(res.series(a)[10]).toBe(5 - 10 * 3);
    });


    test("Converted to object in results", () => {
      let m = new Model({ algorithm });

      let v = m.Variable({
        value: "{x: 1, y: 2*3}"
      });

      expect(m.simulate().value(v)).toEqual({ x: 1, y: 6 });
    });
  });
