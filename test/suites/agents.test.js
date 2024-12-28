import { Model } from "../../src/api/Model.js";
import { areResultsDifferent } from "../TestUtilities.js";


describe.each([
  ["Euler"], ["RK4"]
])("Agents %s",
  /**
   * @param {"Euler"|"RK4"} algorithm
   */
  (algorithm) => {

    test("Population without an agent base", () => {
      let m = new Model({ algorithm });
      m.Population();

      expect(() => m.simulate()).toThrow(/must select a base/);
    });


    test("General agents", () => {
      let m = new Model({ algorithm });

      let s = m.State({
        name: "My state",
        startActive: "false || true"
      });
      let s2 = m.State({
        name: "My state 2",
        startActive: "false || 0"
      });
      let res = m.simulate();
      expect(res.value(s, 0)).toBe(1);
      expect(res.value(s2, 0)).toBe(0);
      expect(res.value(s, 10)).toBe(1);
      expect(res.value(s2, 10)).toBe(0);

      s.startActive = true;
      s2.startActive = false;

      let act = m.Action({
        trigger: "Timeout",
        value: 5,
        action: "[My State] <- false"
      });

      let act2 = m.Action({
        trigger: "Timeout",
        value: 100,
        action: "[My State 2] <- true"
      });

      let l = m.Link(s, act);

      let l2 = m.Link(s2, act2);

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[10]).toBe(0);
      expect(res.series(s2)[10]).toBe(0);

      act.delete();
      act2.delete();

      l.delete();
      l2.delete();

      s.startActive = "false || true";
      s2.startActive = "false || 0";

      let t = m.Transition(null, s2, {
        trigger: "Timeout",
        value: "{2 years}"
      });
      let t2 = m.Transition(s2, null, {
        trigger: "Timeout",
        value: "{3 years}"
      });

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(1);
      expect(res.series(s2)[3]).toBe(1);
      expect(res.series(s2)[8]).toBe(0);


      // must have units of time
      t2.value = "{3 meter}";
      expect(() => m.simulate()).toThrow(/must have units of time/);

      t2.value = "{3 seconds^-1}";
      expect(() => m.simulate()).toThrow(/must have units of time/);


      t.delete();
      t2.delete();

      t = m.Transition(s, s2, {
        trigger: "Timeout",
        value: "{10 Years} - Time()"
      });
      t2 = m.Transition(s2, s, {
        trigger: "Timeout",
        value: "{100 years}"
      });

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(1);
      expect(res.series(s2)[3]).toBe(0);
      expect(res.series(s)[6]).toBe(1);
      expect(res.series(s2)[6]).toBe(0);

      t.recalculate = true;

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(1);
      expect(res.series(s2)[3]).toBe(0);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);

      t.recalculate = false;

      t.trigger = "Probability";
      t.value = "IfThenElse(years < 2, 0, 1)";


      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(1);
      expect(res.series(s2)[3]).toBe(0);
      expect(res.series(s)[6]).toBe(1);
      expect(res.series(s2)[6]).toBe(0);

      t.recalculate = true;
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(0);
      expect(res.series(s2)[3]).toBe(1);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);

      t.recalculate = false;


      t.trigger = "Timeout";
      t.value = "{2 years}";
      t2.trigger = "Timeout";
      t2.value = "{3 years}";

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(0);
      expect(res.series(s2)[3]).toBe(1);
      expect(res.series(s)[6]).toBe(1);
      expect(res.series(s2)[6]).toBe(0);


      t.value = "{0 years}";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(0);
      expect(res.series(s2)[3]).toBe(1);


      t.value = "2";
      t2.value = "3";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(0);
      expect(res.series(s2)[3]).toBe(1);
      expect(res.series(s)[6]).toBe(1);
      expect(res.series(s2)[6]).toBe(0);

      s.residency = 2;
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(1);
      expect(res.series(s2)[3]).toBe(0);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);

      s.residency = "{2 years}";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[3]).toBe(1);
      expect(res.series(s2)[3]).toBe(0);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);

      s.residency = "0";

      t.trigger = "Probability";
      t.value = "1";
      t2.trigger = "Timeout";
      t2.value = "{100 years}";

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[2]).toBe(0);
      expect(res.series(s2)[2]).toBe(1);
      expect(res.series(s)[10]).toBe(0);
      expect(res.series(s2)[10]).toBe(1);


      t.value = 2;
      expect(() => m.simulate()).toThrow();



      t.value = "-1";
      expect(() => m.simulate()).toThrow();

      t.value = 0;

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[2]).toBe(1);
      expect(res.series(s2)[2]).toBe(0);

      t.trigger = "Condition";
      t.value = "years = 5";

      t2.trigger = "Condition";
      t2.value = "years = 7";

      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);
      expect(res.series(s)[7]).toBe(0);
      expect(res.series(s2)[7]).toBe(1);
      expect(res.series(s)[8]).toBe(1);
      expect(res.series(s2)[8]).toBe(0);


      t.value = "true";
      t.recalculate = false;
      t2.value = "false";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);


      t.value = "years = 5";
      t.recalculate = true;
      t.repeat = true;
      t2.repeat = true;
      t2.value = "years = 7";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(s2)[0]).toBe(0);
      expect(res.series(s)[6]).toBe(0);
      expect(res.series(s2)[6]).toBe(1);
      expect(res.series(s)[7]).toBe(0);
      expect(res.series(s2)[7]).toBe(1);
      expect(res.series(s)[8]).toBe(1);
      expect(res.series(s2)[8]).toBe(0);


      t.value = "true";
      expect(() => m.simulate()).toThrow(/fully active transition loop/);
    });


    test("IFThenElse and States", () => {
      let m = new Model({ algorithm });

      let s = m.State({
        name: "State",
        startActive: true
      });
      let v = m.Variable({
        name: "Variable",
        value: "ifThenElse([State], 1, 0)"
      });
      m.Link(s, v);

      let res = m.simulate();
      expect(res.series(s)[0]).toBe(1);
      expect(res.series(v)[0]).toBe(1);

      s.startActive = "false";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(v)[0]).toBe(0);

      v.value = "if [State] then\n 1\nelse\n 0\nend if";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(v)[0]).toBe(0);

      v.value = "if[State]then\n 1\nelse\n 0\nend if";
      res = m.simulate();
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(v)[0]).toBe(0);

      s.startActive = "true";
      res = m.simulate();
      expect(res.series(s)[5]).toBe(1);
      expect(res.series(v)[5]).toBe(1);
    });


    test("Manual transition", () => {
      let m = new Model({ algorithm });

      let s = m.State({
        name: "State"
      });
      let t = m.Transition(null, s, {
        name: "Transition",
        trigger: "Timeout",
        value: "{1000 years}" // Won't trigger
      });
      let a = m.Action({
        trigger: "Timeout",
        value: "{5 years}",
        action: "transition([Transition])"
      });
      m.Link(t, a);


      let res = m.simulate();
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(s)[5]).toBe(0);
      expect(res.series(s)[6]).toBe(1);
      expect(res.series(s)[8]).toBe(1);
    });


    test("Cannot use placeholder as direct value", () => {
      let m = new Model({ algorithm });

      let f = m.Agent({
        name: "My Agent"
      });
      let s = f.Stock({
        name: "X"
      });

      let pop = m.Population({
        name: "Population",
        populationSize: 10,
        agentBase: f
      });
      m.Link(pop, f);

      let v = m.Variable({
        value: "[X]"
      });
      let l = m.Link(s, v);

      // if no link to population, cannot reference
      expect(() => m.simulate()).toThrow(/could not be found/);


      // if link to population get placeholder error when using directly
      m.Link(pop, v);
      expect(() => m.simulate()).toThrow(/is a placeholder/);

      // the stock to variable link isn't needed
      l.delete();
      m.Link(pop, v);
      expect(() => m.simulate()).toThrow(/is a placeholder/);
    });


    test("Misc agent tests", () => {
      let m = new Model({ algorithm });

      let f = m.Agent();

      let s = f.State({
        name: "State 1",
        startActive: "1",
      });
      let s2 = f.State({
        name: "State 2",
        startActive: "! [State 1]"
      });
      let l = f.Link(s, s2);
      let t = f.Transition(s, s2, {
        name: "My Transition",
        trigger: "Timeout",
        value: "{2 years}"
      });
      let t2 = f.Transition(s2, s, {
        name: "My Transition",
        trigger: "Condition",
        value: "false"
      });


      let pop = m.Population({
        name: "Population",
        agentBase: f,
        populationSize: 10
      });

      let v = m.Variable({
        name: "My Variable",
        value: "Count(FindAll([Population]))"
      });
      let v2 = m.Variable({
        name: "My Variable 2",
        value: "PopulationSize([Population]) + 1"
      });
      let l2 = m.Link(pop, v);
      m.Link(pop, v2);

      let res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[8]).toBe(10);
      expect(res.series(v2)[0]).toBe(11);
      expect(res.series(v2)[8]).toBe(11);

      v.value = "[Population].FindAll().length()";
      v2.value = "[Population].PopulationSize()+1";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[8]).toBe(10);
      expect(res.series(v2)[0]).toBe(11);
      expect(res.series(v2)[8]).toBe(11);

      v.value = "Count(FindState([Population], [State 1]))";
      v2.value = "Count(FindState([Population], [State 2]))";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);
      expect(res.series(v2)[8]).toBe(10);

      v.value = "[Population].findState([State 1]).length()";
      v2.value = "[Population].findState([State 2]).length()";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);
      expect(res.series(v2)[8]).toBe(10);


      let v3 = m.Variable({
        name: "My Variable 3"
      });
      m.Link(pop, v3);
      m.Link(v3, v2);

      v3.value = "FindState([Population], [State 2])";
      v2.value = "Count([My Variable 3])";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);
      expect(res.series(v2)[8]).toBe(10);

      v3.value = "[Population].findState([State 2])";
      v2.value = "[My Variable 3].length()";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);
      expect(res.series(v2)[8]).toBe(10);



      v.value = "Count(FindNotState([Population], [State 1]))";
      v2.value = "Count(FindNotState([Population], [State 2]))";

      res = m.simulate(); // confirm no error

      v.value = "Count([Population].FindNotState([State 1]))";
      v2.value = "Count([Population].FindNotState([State 2]))";
      res = m.simulate(); // confirm no error


      v3.value = "FindState([Population], [State 2])+1";
      expect(() => m.simulate()).toThrow();

      v3.value = "[Population].FindState([State 2])+1";
      expect(() => m.simulate()).toThrow();

      v3.value = "[Population]+1";
      expect(() => m.simulate()).toThrow();

      v3.delete();

      t2.trigger = "Condition";
      t2.value = "index(self)=1 and years=7";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[0]).toBe(10);
      expect(res.series(v)[8]).toBe(9);
      expect(res.series(v2)[8]).toBe(1);

      t2.value = "self.index()=1 and years=7";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[0]).toBe(10);
      expect(res.series(v)[8]).toBe(9);
      expect(res.series(v2)[8]).toBe(1);


      v3 = f.Variable({
        name: "Var",
        value: "[Outside Var]*2"
      });

      let v4 = f.Variable({
        name: "Outside Var",
        value: "IfThenElse(years<5, 1, 0)"
      });

      m.Link(v4, v3);


      v.value = "Min(Value([Population], [Var]))";
      v2.value = "Max(Value([Population], [Var]))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(2);
      expect(res.series(v)[8]).toBe(0);

      v.value = "[Population].value([Var]).min()";
      v2.value = "Max([Population].Value([Var]))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(2);
      expect(res.series(v)[8]).toBe(0);

      m.globals = "counter <- 0";

      let act = m.Action({
        trigger: "Condition",
        value: "true",
        action: "Counter <- counter + 1"
      });

      v3.value = "counter * 3";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(24);

      act.repeat = false;
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(3);

      act.repeat = true;

      act.value = "false";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);

      act.trigger = "Condition";
      act.value = "true";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(24);

      act.value = "false";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);

      act.trigger = "Timeout";
      act.value = "100";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);
      act.value = "{100 years}";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(0);
      act.trigger = "Condition";
      act.value = "true";

      let st = f.Stock({
        name: "Count",
        initial: 10
      });
      act.parent = f;
      act.value = "[Count] <- [Count] + 2";
      l = m.Link(st, v3);
      l2 = m.Link(st, act);
      v3.value = "[Count]";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[8]).toBe(10 + 2 * 8);

      act.delete();
      st.delete();
      l.delete();
      l2.delete();

      v3.value = "index(self)";


      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v2)[8]).toBe(10);

      v.value = "PopulationSize([Population])";
      v2.value = "Count(Value([Population], [Var]))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(res.series(v2)[0]);
      expect(res.series(v)[8]).toBe(res.series(v2)[8]);

      v.value = "[Population].PopulationSize()";
      v2.value = "Count([Population].Value([Var]))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(res.series(v2)[0]);
      expect(res.series(v)[8]).toBe(res.series(v2)[8]);

      v.value = "Count(Join(FindState([Population], [State 1]), FindState([Population], [State 2])))";
      v2.value = "Min(Value(Join(FindState([Population], [State 1]), FindState([Population], [State 2])), [Var]))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(1);

      v.value = "Join([Population].FindState([State 1]), [Population].FindState([State 2])).Length()";
      v2.value = "Join([Population].FindState([State 1]), [Population].FindState([State 2])).Value([Var]).Min()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(1);

      v.value = "Count(Join(Filter(FindAll([Population]), value(x, [Var])>8), Filter(FindAll([Population]), value(x, [Var]) <=3)))";
      v2.value = "Count(Union(Filter(FindAll([Population]), value(x, [Var])>8), Filter(FindAll([Population]), value(x, [Var]) <=3)))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(5);
      expect(res.series(v2)[8]).toBe(5);

      v.value = "Join(Filter([Population].FindAll(), value(x, [Var])>8), Filter(FindAll([Population]), value(x, [Var]) <=3)).Length()";
      v2.value = "Union([Population].FindAll().Filter(x.value([Var])>8), [Population].FindAll().Filter(x.value([Var]) <=3)).Length()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(5);
      expect(res.series(v2)[8]).toBe(5);

      v.value = "Count(Intersection(Filter(FindAll([Population]), value(x, [Var])>8), Filter(FindAll([Population]), value(x, [Var])<=3)))";
      v2.value = "Count(Difference(Filter(FindAll([Population]), value(x, [Var])>8), Filter(FindAll([Population]), value(x, [Var])<=3)))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(5);

      v.value = "Distance(FindNearest([Population], FindIndex([population], 1)), FindIndex([population], 1)) = Min(map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, FindIndex([population],1))))";
      v2.value = "Distance(FindFurthest([Population], FindIndex([population], 1)), FindIndex([population], 1)) = Max(map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, FindIndex([population],1))))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v2)[8]).toBe(1);


      v.value = "Map(FindNearest([Population], FindIndex([population], 1), 9), Distance(x, FindIndex([population], 1))) = Sort(Map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, FindIndex([population],1))))";
      v2.value = "Map(FindFurthest([Population], FindIndex([population], 1), 9), Distance(x, FindIndex([population], 1))) = Reverse(Sort(Map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, FindIndex([population],1)))))";
      res = m.simulate();
      expect(res.series(v)[0]).toEqual([true, true, true, true, true, true, true, true, true]);
      expect(res.series(v2)[8]).toEqual([true, true, true, true, true, true, true, true, true]);

      v.value = "Distance([Population].FindNearest([population].FindIndex(1)), [population].FindIndex(1)) = Min(map(Select([Population].FindAll(),join(false, repeat(true,9))), distance(x, [population].FindIndex(1))))";
      v2.value = "Distance([Population].FindFurthest([population].FindIndex(1)), [population].FindIndex(1)) = Max(map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, [population].FindIndex(1))))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v2)[8]).toBe(1);

      v.value = "Distance(select(FindNearest([Population], FindIndex([population], 1),2),2), FindIndex([population], 1)) = Min(map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, FindIndex([population],1))))";
      v2.value = "Distance(select(FindFurthest([Population], FindIndex([population], 1),3),2), FindIndex([population], 1)) = Max(map(Select(FindAll([Population]),join(false, repeat(true,9))), distance(x, FindIndex([population],1))))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(0);

      v.value = "Count(FindNearby([Population], FindIndex([Population], 1), 400))";
      v2.value = "Count(FindNearby([Population], FindIndex([Population], 1), 0))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[8]).toBe(0);

      v.value = "[Population].FindNearby([Population].FindIndex(1), 400).length()";
      v2.value = "[Population].FindNearby([Population].FindIndex(1), 0).length()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[8]).toBe(0);

      v.value = "[Population].FindNearby( {0,0}, 400).length()";
      v2.value = "[Population].FindNearby({0,0}, 0).length()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(0);

      v.value = "[Population].FindNearby( {0}, 400).length()";
      expect(() => m.simulate()).toThrow();


      v.value = "[Population].FindNearby( {0,0}, 400).length()";
      v2.value = "[Population].FindNearby({0}, 0).length()";
      expect(() => m.simulate()).toThrow();

      v2.value = "[Population].FindNearby({0,0}, 0).length()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(0);


      v.value = "[Population].FindNearby( 'abc', 400).length()";
      expect(() => m.simulate()).toThrow();


      v.value = "width([Population])";
      v2.value = "height([Population])";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(200);
      expect(res.series(v2)[8]).toBe(100);

      v.value = "[Population].FindIndex(2) == [Population].FindIndex(2)";
      v2.value = "[Population].FindIndex(2) == [Population].FindIndex(3)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v2)[8]).toBe(0);

      v.value = "[Population].FindIndex(2) != [Population].FindIndex(2)";
      v2.value = "[Population].FindIndex(2) != [Population].FindIndex(3)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(1);

      v.value = "[Population].FindIndex(2) > [Population].FindIndex(2)";
      expect(() => m.simulate()).toThrow();
      v.value = "[Population].FindIndex(2) >= [Population].FindIndex(2)";
      expect(() => m.simulate()).toThrow();
      v.value = "[Population].FindIndex(2) < [Population].FindIndex(2)";
      expect(() => m.simulate()).toThrow();
      v.value = "[Population].FindIndex(2) <= [Population].FindIndex(2)";
      expect(() => m.simulate()).toThrow();


      pop.geoPlacementType = "Grid";
      v.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),1) == Select(Location(FindIndex([Population], 2)),1), 1, 0)";
      v2.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),2) == Select(Location(FindIndex([Population], 2)),2), 1, 0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(1);

      pop.geoPlacementType = "Ellipse";
      v.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),1) == Select(Location(FindIndex([Population], 2)),1), 1, 0)";
      v2.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),2)==Select(Location(FindIndex([Population], 2)),2), 1, 0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(0);


      m.globals = "setRandSeed(100)";
      pop.geoPlacementType = "Network";
      v.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),1)==Select(Location(FindIndex([Population], 2)),1), 1, 0)";
      v2.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),2)==Select(Location(FindIndex([Population], 2)),2), 1, 0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(0);


      // network placement function should be constant with random seed
      let res2 = m.simulate();
      m.globals = "setRandSeed(102)";
      let res3 = m.simulate();
      expect(areResultsDifferent(res._data, res2._data)).toBeFalsy();
      expect(areResultsDifferent(res2._data, res3._data)).toBeTruthy();

      pop.geoPlacementType = "Custom Function";
      v.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),1)==Select(Location(FindIndex([Population], 2)),1), 1, 0)";
      v2.value = "IfThenElse(Select(Location(FindIndex([Population], 1)),2)==Select(Location(FindIndex([Population], 2)),2), 1, 0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[8]).toBe(0);

      pop.geoPlacementFunction = "{index(Self)*10,index(Self)*20}";
      v.value = "Location(FindIndex([Population], 1)).x";
      v2.value = "Location(FindIndex([Population], 2)).y";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(40);

      pop.geoPlacementFunction = "{index(Self)*10, Self.index()*20}";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(40);

      pop.geoPlacementFunction = "{Self.index()*10,Self.index()*20}";
      v.value = "[Population].FindIndex(1).Location().x";
      v2.value = "[Population].FindIndex(2).Location().y";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v2)[8]).toBe(40);


      let mover = f.Action({
        name: "Mover",
        trigger: "Condition",
        value: "true",
        action: "move(Self, {10, 20})"
      });
      res = m.simulate();
      expect(res.series(v)[2]).toBe(10 + 2 * 10);
      expect(res.series(v2)[9]).toBe(40 + 9 * 20);

      mover.action = "Self.move({10, 20})";
      res = m.simulate();
      expect(res.series(v)[2]).toBe(10 + 2 * 10);
      expect(res.series(v2)[9]).toBe(40 + 9 * 20);


      mover.action = "Self.setLocation({11, 21})";
      res = m.simulate();
      expect(res.series(v)[2]).toBe(11);
      expect(res.series(v2)[9]).toBe(21);

      f.agentParent = "x <- new AgentBase\n x.doMove <- function() self.bar({10, 20})\n x";
      mover.action = "Self.doMove()";

      expect(() => m.simulate()).toThrow();


      f.agentParent = "x <- new AgentBase\n x.doMove <- function() self.move({10, 20})\n x";

      res = m.simulate();
      expect(res.series(v)[2]).toBe(10 + 2 * 10);
      expect(res.series(v2)[9]).toBe(40 + 9 * 20);

      m.globals = "mover <- new AgentBase\n mover.doMove <- function(dist) self.move(dist*{1, 2})";
      f.agentParent = "mover";
      mover.action = "Self.doMove(10)";
      res = m.simulate();
      expect(res.series(v)[2]).toBe(10 + 2 * 10);
      expect(res.series(v2)[9]).toBe(40 + 9 * 20);


      pop.geoWrapAround = true;
      res = m.simulate();
      expect(res.series(v)[2]).toBe((10 + 2 * 10) % 200);
      expect(res.series(v2)[9]).toBe((40 + 9 * 20) % 100);

      m.Link(pop, mover);
      pop.geoPlacementFunction = "{index(Self)*10, 1}";

      mover.action = "moveTowards(Self, findIndex([Population], 1), 1)";
      v2.value = "Location(FindIndex([Population], 2)).x";
      res = m.simulate();
      expect(res.series(v)[2]).toBe(10);
      expect(res.series(v)[9]).toBe(10);
      expect(res.series(v2)[2]).toBe(20 - 2 * 1);
      expect(res.series(v2)[9]).toBe(20 - 9 * 1);


      let one = m.Variable({
        name: "one"
      });
      one.value = "1";
      m.Link(one, mover);
      mover.action = "moveTowards(Self, findIndex([Population], 1), [one])";
      v2.value = "Location(FindIndex([Population], 2)).x";
      res = m.simulate();
      expect(res.series(v)[2]).toBe(10);
      expect(res.series(v)[9]).toBe(10);
      expect(res.series(v2)[2]).toBe(20 - 2 * 1);
      expect(res.series(v2)[9]).toBe(20 - 9 * 1);


      mover.action = "Self.moveTowards([Population].findIndex(1), 1)";
      v2.value = "[Population].FindIndex(2).Location().x";
      res = m.simulate();
      expect(res.series(v)[2]).toBe(10);
      expect(res.series(v)[9]).toBe(10);
      expect(res.series(v2)[2]).toBe(20 - 2 * 1);
      expect(res.series(v2)[9]).toBe(20 - 9 * 1);



      mover.action = "1";


      pop.networkType = "Custom Function";
      pop.networkFunction = "ifThenElse(index(a)=1 || index(b)=1, true, false)";
      v.value = "count(connected(findIndex([Population], 1)))";
      v2.value = "count(connected(findIndex([Population], 3)))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[8]).toBe(1);

      pop.networkFunction = "value(a, [Var]) > value(b, [Var])";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v2)[0]).toBe(0);


      pop.networkFunction = "ifThenElse(index(a)=1 || index(b)=1, true, false)";

      let exogAdder = m.Action({
        name: "Adder"
      });
      exogAdder.trigger = "Condition";
      exogAdder.value = "true";
      exogAdder.action = "[Population].add()";
      m.Link(pop, exogAdder);
      res = m.simulate();
      expect(res.series(v)[10]).toBe(19);
      expect(res.series(v2)[10]).toBe(1);
      exogAdder.delete();


      v.value = "count(connectionWeight(findIndex([Population], 1), connected(findIndex([Population], 1))))";
      v2.value = "connectionWeight(findIndex([Population], 3), connected(findIndex([Population], 3))){1}";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[8]).toBe(1);


      v.value = "setConnectionWeight(findIndex([Population], 1), connected(findIndex([Population], 1)), 5)";
      v2.value = "connectionWeight(findIndex([Population], 1), connected(findIndex([Population], 1))){1}";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v2)[8]).toBe(5);

      v.value = "[Population].findIndex(1).connected().length()";
      v2.value = "[Population].findIndex(3).connected().length()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[8]).toBe(1);


      mover.action = "ifthenelse( index(self)==3, unconnect(self, findIndex([population], 1)), 0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[0]).toBe(1);
      expect(res.series(v)[8]).toBe(8);
      expect(res.series(v2)[8]).toBe(0);

      mover.action = "ifthenelse( index(self)==3, self.unconnect([population].findIndex(1)), 0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[0]).toBe(1);
      expect(res.series(v)[8]).toBe(8);
      expect(res.series(v2)[8]).toBe(0);


      mover.action = "ifthenelse(index(self)==3, connect(self, findIndex([population], 2)),0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[0]).toBe(1);
      expect(res.series(v)[8]).toBe(9);
      expect(res.series(v2)[8]).toBe(2);

      mover.action = "IfThenElse(self.index()==3, self.connect([population].findIndex(2)),0)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(9);
      expect(res.series(v2)[0]).toBe(1);
      expect(res.series(v)[8]).toBe(9);
      expect(res.series(v2)[8]).toBe(2);

      mover.action = "ifthenelse(index(self)==3, connect(self, true),0)";
      expect(() => m.simulate()).toThrow();


      mover.action = "ifthenelse(index(self)==3, self.connect(true),0)";
      expect(() => m.simulate()).toThrow();

      mover.action = "ifthenelse(index(self)==3, connect(self, 1),0)";
      expect(() => m.simulate()).toThrow();

      mover.trigger = "Condition";
      mover.value = "((index(self)==3 && years>=2) || (index(self)==5 && years>=5))";
      mover.action = "remove(self)";
      v.value = "populationSize([Population])";
      v2.value = "count(connected(findIndex([Population], 1)))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(9);
      expect(res.series(v)[8]).toBe(8);

      mover.value = "((self.index()==3 && years==2) || (self.index()==5 && years==5))";
      mover.action = "self.remove()";
      v.value = "[Population].populationSize()";
      v2.value = "[Population].findIndex(1).connected().length()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(9);
      expect(res.series(v)[8]).toBe(8);

      mover.value = "((index(self)==3 && years==2) || (index(self)==5 && years==5))";
      mover.action = "add([Population])";
      v.value = "populationSize([Population])";
      v2.value = "count(connected(findIndex([Population], 3)))";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(11);
      expect(res.series(v)[8]).toBe(12);

      mover.action = "[Population].add()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(11);
      expect(res.series(v)[8]).toBe(12);


      let inPrim = f.Variable({
        name: "inprim"
      });
      one.value = "1";
      m.Link(inPrim, mover);

      mover.action = "[inPrim].add()";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(11);
      expect(res.series(v)[8]).toBe(12);


      // outside the folder should error
      mover.action = "[one].add()";
      expect(() => m.simulate()).toThrow(/You must pass an agent population as the first argument to Add/);

      mover.value = "((index(self)==3 && years==2) || (index(self)==5 && years==5))";
      mover.action = "add([Population], Self)";
      v.value = "populationSize([Population])";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(11);
      expect(res.series(v)[8]).toBe(12);

      mover.action = "[Population].add(Self)";
      expect(res.series(v)[0]).toBe(10);
      expect(res.series(v)[4]).toBe(11);
      expect(res.series(v)[8]).toBe(12);

      pop.geoPlacementType = "Random";

      pop.populationSize = 1;
      mover.value = "years == 5 ";
      mover.action = "[Population].add()";
      v.value = "populationSize([Population])";
      v2.value = "IfThenElse(populationsize([Population])==2, Select(Location(FindIndex([Population], 1)),2)==Select(Location(FindIndex([Population], 2)),2), -1)";

      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v)[8]).toBe(2);
      expect(res.series(v2)[0]).toBe(-1);
      expect(res.series(v2)[7]).toBe(0); // not clone

      pop.populationSize = 1;
      mover.action = "add([Population], Self)";
      v.value = "populationSize([Population])";
      v2.value = "ifthenElse(populationsize([Population])==2, Select(Location(FindIndex([Population], 1)),2)==Select(Location(FindIndex([Population], 2)),2), -1)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(1);
      expect(res.series(v)[8]).toBe(2);
      expect(res.series(v2)[0]).toBe(-1);
      expect(res.series(v2)[7]).toBe(1); // clone

      pop.populationSize = 0;
      mover.parent = null;
      mover.value = "years == 5 or years == 3";
      mover.action = "add([Population])";
      v.value = "populationSize([Population])";
      v2.value = "IfThenElse(populationsize([Population])==2, Select(Location(FindIndex([Population], 1)),2)==Select(Location(FindIndex([Population], 2)),2), -1)";
      res = m.simulate();
      expect(res.series(v)[0]).toBe(0);
      expect(res.series(v)[8]).toBe(2);
      expect(res.series(v2)[0]).toBe(-1);
      expect(res.series(v2)[7]).toBe(0); // not clone

      pop.populationSize = 3;
      m.Link(pop, t);
      mover.value = 1;
      t.trigger = "Condition";
      t.value = "Distance(self, [Population].findIndex(1)) > 1";
      t.repeat = false;
      t2.repeat = false;
      m.simulate(); // should not error


      pop.populationSize = 2;
      t.delete();
      t2.delete();
      mover.parent = null;
      s.startActive = "false";
      mover.value = "years == 5 ";
      mover.action = "SetValue([Population], [State 1], true)";
      v.value = "select(value([Population], [State 1]), 1)";
      v2.value = "select(value([Population],[State 1]), 2)";
      res = m.simulate();
      expect(res.series(v)[3]).toBe(0);
      expect(res.series(v)[8]).toBe(1);
      expect(res.series(v2)[3]).toBe(0);
      expect(res.series(v2)[8]).toBe(1);

      mover.action = "[Population].SetValue([State 1], true)";
      v.value = "[Population].value([State 1]){1}";
      v2.value = "[Population].value([State 1]){2}";
      res = m.simulate();
      expect(res.series(v)[3]).toBe(0);
      expect(res.series(v)[8]).toBe(1);
      expect(res.series(v2)[3]).toBe(0);
      expect(res.series(v2)[8]).toBe(1);


      pop.geoWidth = "{1 Meter}";
      expect(() => m.simulate()).toThrow();

      pop.geoWidth = "2";
      pop.geoHeight = "{2 Kilometers}";
      expect(() => m.simulate()).toThrow();


      pop.geoUnits = "Meters";
      res = m.simulate(); // no error

      pop.geoWidth = "{1 Meter}";
      res = m.simulate(); // no error

      pop.geoWidth = "{1 Dog}";
      expect(() => m.simulate()).toThrow();
    });


    test("Location validation", () => {
      let m = new Model({ algorithm });

      let f = m.Agent();

      let p = m.Population({
        name: "Population"
      });
      m.Link(f, p);
      p.agentBase = f;

      expect(() => m.simulate()).not.toThrow(); // no error

      p.geoPlacementType = "Custom Function";
      p.geoPlacementFunction = "{Rand(), Rand()}";

      expect(() => m.simulate()).not.toThrow(); // no error


      p.geoPlacementFunction = "rand()";

      expect(() => m.simulate()).toThrow(/two element/);


      p.geoPlacementFunction = "{true, false}";
      expect(() => m.simulate()).toThrow(/two element/);
    });


    test("Exp Delay in Agents", () => {
      let m = new Model({ algorithm });

      let f = m.Agent();

      let p = m.Population({
        name: "Population",
        populationSize: 3
      });
      m.Link(f, p);
      p.agentBase = f;

      let x = f.Variable({
        name: "x",
        value: "years"
      });

      let y = f.Variable({
        name: "y",
        value: "smooth([x], self.index() + 5)"
      });

      f.Link(x, y);

      let out1 = m.Variable({
        name: "out1",
        value: "Value([Population].FindIndex(1), [y])"
      });
      let out3 = m.Variable({
        name: "out3",
        value: "Value([Population].FindIndex(3), [y])"
      });

      m.Link(p, out1);
      m.Link(p, out3);


      let res =  m.simulate();
      // longer delay means lower value so:
      expect(res.value(out3)).toBeLessThan(res.value(out1));


      y.value = "delay1([x], self.index() + 5)";
      res = m.simulate();
      expect(res.value(out3)).toBeLessThan(res.value(out1));


      y.value = "delay3([x], self.index() + 5)";
      res = m.simulate();
      expect(res.value(out3)).toBeLessThan(res.value(out1));
    });


    test("PastValues to Aggregate Agent Placeholders", () => {
      let m = new Model({ algorithm });

      let f = m.Agent();

      let p = m.Population({
        name: "Population",
        populationSize: 3
      });
      m.Link(f, p);
      p.agentBase = f;

      f.Variable({
        name: "x",
        value: "20"
      });


      let out = m.Variable({
        name: "out1",
        value: "PastValues([x], 10)"
      });

      m.Link(p, out);


      expect(() => m.simulate()).toThrow(/is a placeholder/);
    });


    test("Population aggregations", () => {
      let m = new Model({ algorithm });

      let f = m.Agent();

      let v = f.Variable({
        name: "Var"
      });
      let v2 = m.Variable({
        name: "Var2"
      });

      let p = m.Population({
        name: "Population"
      });
      let a = m.Action();
      m.Link(f, p);
      m.Link(p, v);
      m.Link(p, v2);
      m.Link(p, a);
      p.agentBase = f;
      p.populationSize = 5;

      v.value = "PopulationSize([Population])";
      a.trigger = "Condition";
      a.value = "years=5";
      a.action = "repeat(add([Population]),10)";
      v2.value = "Count(unique(Value([Population],[Var])))";

      let res = m.simulate();
      expect(res.series(v2)[0]).toBe(1);
      expect(res.series(v2)[5]).toBe(1);
      expect(res.series(v2)[6]).toBe(1);
      expect(res.series(v2)[7]).toBe(1);


      a.action = "repeat([Population].add(),10)";
      v2.value = "[Population].Value([Var]).unique().length()";
      res = m.simulate();
      expect(res.series(v2)[0]).toBe(1);
      expect(res.series(v2)[5]).toBe(1);
      expect(res.series(v2)[6]).toBe(1);
      expect(res.series(v2)[7]).toBe(1);

      v2.value = "max(Value([Population],[Var]))";
      res = m.simulate();
      expect(res.series(v2)[0]).toBe(5);
      expect(res.series(v2)[5]).toBe(5);
      expect(res.series(v2)[6]).toBe(15);
      expect(res.series(v2)[7]).toBe(15);

      v2.value = "[Population].value([Var]).max()";
      res = m.simulate();
      expect(res.series(v2)[0]).toBe(5);
      expect(res.series(v2)[5]).toBe(5);
      expect(res.series(v2)[6]).toBe(15);
      expect(res.series(v2)[7]).toBe(15);
    });


    test("Cross boundary flows", () => {
      let m = new Model({ algorithm });

      let f = m.Agent();


      let v = f.Stock({
        name: "Stock1"
      });
      let v2 = m.Stock({
        name: "Stock2"
      });

      m.Population({
        agentBase: f,
        populationSize: 5
      });
      let flow = m.Flow(v, v2);

      // can't have flows that cross agent boundaries
      expect(() => m.simulate()).toThrow();

      // now everything is in the agent
      v2.parent = f;
      flow.parent = f;

      m.simulate(); // no error

      v2.delete();
      m.simulate(); // no error

      v2 = m.Stock({
        name: "Stock2"
      });
      flow.start = v;
      flow.end = v2;
      v2.delete();
      flow.parent = null;
      expect(() => m.simulate()).toThrow();
    });


    test("Random seed with disease simulation", () => {
      let m = new Model({ algorithm });

      m.globals = "setRandSeed(123)";

      let f = m.Agent();


      let s = f.State({
        name: "Susceptible"
      });
      let i = f.State({
        name: "Infected"
      });
      let t = f.Transition(s, i);
      let r = f.Transition(i, s);

      let mover = f.Action({
        repeat: true,
        trigger: "Condition",
        value: "[Susceptible] and [Population].FindState([Infected]).Count() > 0",
        action: "Self.moveTowards([Population].FindState([Infected]).FindNearest(Self), -0.1)"
      });

      t.trigger = "Probability";
      t.value = ".5";


      r.trigger = "Probability";
      r.value = ".8";

      s.startActive = "1";
      i.startActive = "0";


      let pop = m.Population({
        name: "Population",
        agentBase: f,
        populationSize: 20
      });

      m.Link(f, pop);


      m.Link(s, mover);
      m.Link(pop, mover);


      let res = m.simulate(); // no error;


      let res2 = m.simulate(); // no error
      expect(areResultsDifferent(res._data, res2._data)).toBe(false);


      m.globals = "setRandSeed(1234)";
      let res3 = m.simulate(); // no error
      expect(areResultsDifferent(res._data, res3._data)).toBeTruthy();


      m.globals = "setRandSeed(123)";
      let res4 = m.simulate(); // no error
      expect(areResultsDifferent(res._data, res4._data)).toBe(false);
    });


    test("Changing transition probability of 1", () => {
      let m = new Model({
        algorithm,
        timeLength: 4
      });
      m.globals = "x <- 0";

      let f = m.Agent();

      let pop = m.Population({
        name: "Population",
        agentBase: f,
        populationSize: 3
      });

      m.Link(f, pop);

      let s = f.State({
        name: "Susceptible",
        startActive: true
      });
      let i = f.State({
        name: "Infected",
        startActive: false
      });
      f.Transition(s, i, {
        trigger: "Probability",
        recalculate: true,
        value: `
        if x == 0 then
          x <- x + 1
          1
        else
          .5
        end if
        `
      });

      expect(() => m.simulate()).not.toThrow();
    });
  });
