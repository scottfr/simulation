import { Model } from "../../src/api/Model.js";


describe.each([
  ["Euler"], ["RK4"]
])("Simulation %s",

  /**
   * @param {"Euler"|"RK4"} algorithm
   */
  (algorithm) => {

    test("General", () => {
      let m = new Model({ algorithm });

      m.timeUnits = "Years";
      m.timeStep = 1;
      m.timeStart = 0;
      m.timeLength = 10;

      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(s, null, {
        name: "My Flow"
      });
      s.initial = "100";
      f.rate = "0.1*[My Stock]";

      let res = m.simulate();
      let times = res.times();
      expect(times.length).toBe(11);
      expect(times[0]).toBe(0);
      expect(times[10]).toBe(10);
      expect(res.series(s)[0]).toBe(100);

      expect(res.timeUnits).toBe("years");
    });


    test("Small step sizes", () => {
      let m = new Model({ algorithm });
      // @ts-ignore - use exact string value
      m.timeLength = "0.0005";
      // @ts-ignore - use exact string value
      m.timeStep = "5e-7";

      let res = m.simulate();
      let times = res.times();

      expect(times).toHaveLength(1001);

      expect(times[994]).toBe(0.000497);
      expect(times[995]).toBe(0.0004975);
      expect(times[996]).toBe(0.000498);
      expect(times[997]).toBe(0.0004985);
      expect(times[998]).toBe(0.000499);
      expect(times[999]).toBe(0.0004995);
      expect(times[1000]).toBe(.0005);



      // @ts-ignore - use exact string value
      m.timeStart = "5.88";
      // @ts-ignore - use exact string value
      m.timeLength = "6";
      // @ts-ignore - use exact string value
      m.timeStep   = "0.01";

      res = m.simulate();
      times = res.times();

      expect(times).toHaveLength(601);

      expect(times[597]).toBe(11.85);
      expect(times[598]).toBe(11.86);
      expect(times[599]).toBe(11.87);
      expect(times[600]).toBe(11.88);
    });


    test("Mathematica parity", () => {
      let m = new Model({ algorithm });


      let mathematicaScale = 100000;

      m.timeStep = .1;
      m.timeLength = 2;


      let y = m.Stock({
        name: "Y"
      });
      let by = m.Flow(null, y, {
        name: "My Flow"
      });
      y.initial = "100";
      by.rate = "0.04*[Y]";

      let res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(y)[20] * mathematicaScale)).toBe(Math.round(108.31142163 * mathematicaScale));
      } else if (algorithm === "RK4") {
        expect(Math.round(res.series(y)[20] * mathematicaScale)).toBe(Math.round(108.328706767 * mathematicaScale));
      }

      m.timeStart = .12;
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(y)[20] * mathematicaScale)).toBe(Math.round(108.31142163 * mathematicaScale));
      } else if (algorithm === "RK4") {
        expect(Math.round(res.series(y)[20] * mathematicaScale)).toBe(Math.round(108.328706767 * mathematicaScale));
      }
      expect(res.times()[0]).toBe(.12);
      expect(res.times()[1]).toBe(.22);


      m.timeStart = 0;
      m.timeLength = 100;
      m.timeStep = 1;

      res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(5050.49481843 * mathematicaScale));
      } else if (algorithm === "RK4") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(5459.81455268 * mathematicaScale));
      }




      by.rate = "0.02*[Y]*(1-[Y]/100)*Sin(Years/3)^2";
      y.initial = 2;
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(5.2233233649 * mathematicaScale));
      } else if (algorithm === "RK4") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(5.30387612074 * mathematicaScale));
      }

      by.rate = "0.02*[Y]*(1-[Y]/100)*Sin({Years/3 Radians})^2";
      y.initial = 2;
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(5.2233233649 * mathematicaScale));
      } else if (algorithm === "RK4") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(5.30387612074 * mathematicaScale));
      }

      let x = m.Stock({
        name: "X"
      });
      let bx = m.Flow(null, x, {
        name: "My Flow"
      });
      let dx = m.Flow(x, null, {
        name: "My Flow"
      });
      let dy = m.Flow(y, null, {
        name: "My Flow"
      });
      m.Link(x, by);
      m.Link(y, dx);

      by.rate = "[Y]*0.001*[X]";
      dy.rate = "[Y]*0.1";
      bx.rate = "[X]*0.1";
      dx.rate = "[X]*0.0001*[Y]";
      x.initial = 200;
      y.initial = 100;

      res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(15.2517207902 * mathematicaScale));
      } else if (algorithm === "RK4") {
        expect(Math.round(res.series(y)[100] * mathematicaScale)).toBe(Math.round(4118.37647504 * mathematicaScale));
      }


      m = new Model({
        algorithm,
        timeLength: 10
      });

      x = m.Stock({
        name: "X"
      });
      let v = m.Variable({
        name: "V"
      });
      bx = m.Flow(null, x, {
        name: "Flow"
      });
      m.Link(bx, v);

      bx.rate = "[X]*0.1";
      x.initial = 200;
      v.value = "[Flow]";

      res = m.simulate();
      if (algorithm === "Euler") {
        expect(Math.round(res.series(bx)[0] * mathematicaScale)).toBe(Math.round(20 * mathematicaScale));
        expect(Math.round(res.series(v)[0] * mathematicaScale)).toBe(Math.round(20 * mathematicaScale));
      } else if (algorithm === "RK4") {
        // flows always report the initial rate, not the RK4 average
        expect(Math.round(res.series(bx)[0] * mathematicaScale)).toBe(Math.round(20 * mathematicaScale));
        expect(Math.round(res.series(v)[0] * mathematicaScale)).toBe(Math.round(20 * mathematicaScale));
      }
    });


    test("Time conversion", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "p"
      });
      p.value = "years";
      let res = m.simulate();
      expect(res.series(p)[4]).toBe(4);
      p.value = "months";
      res = m.simulate();
      expect(res.series(p)[4]).toBe(4 * 12);
    });


    test("Money units and variable", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable"
      });
      let f = m.Flow(null, null, {
        name: "My Flow"
      });
      m.Link(f, p);

      f.units = "euros/seconds";
      p.units = "euros/seconds";

      f.rate = "10-years";
      p.value = "[My Flow]";
      let res = m.simulate();
      expect(res.series(p)[20]).toBe(0);
    });


    test("Money units and stock", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });

      f.units = "euros/year";
      s.units = "euros";

      f.rate = "10";
      s.initial = "1";
      let res = m.simulate();
      expect(res.series(s)[10]).toBe(10 * 10 + 1);

      f.rate = "{10 Euros/years}";
      s.initial = "{1 Euros}";
      res = m.simulate();
      expect(res.series(s)[10]).toBe(10 * 10 + 1);
    });


    test("Fixing values", () => {
      let m = new Model({ algorithm });


      // Fixing expressions
      let p = m.Variable({
        name: "My Variable"
      });


      p.value = "Fix(years, -1)";
      let res = m.simulate();
      expect(res.series(p)[2]).toBe(0);
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[15]).toBe(0);

      p.value = "Fix(years, true)";
      expect(() => m.simulate()).toThrow(/requires a number/);


      p.value = "Fix(years, \"abc\")";
      expect(() => m.simulate()).toThrow(/requires a number/);


      p.value = "Fix(years, -10)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(0);
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[15]).toBe(0);

      p.value = "Fix(years)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(0);
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[15]).toBe(0);


      p.value = "Fix(years+12)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(12);
      expect(res.series(p)[5]).toBe(12);
      expect(res.series(p)[15]).toBe(12);


      p.value = "Fix(years, 0)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(2);
      expect(res.series(p)[5]).toBe(5);
      expect(res.series(p)[15]).toBe(15);


      p.value = "fix(years + 1, 0)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(3);
      expect(res.series(p)[5]).toBe(6);
      expect(res.series(p)[15]).toBe(16);

      p.value = "Fix(years+12, 5)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(12);
      expect(res.series(p)[4]).toBe(12);
      expect(res.series(p)[5]).toBe(17);
      expect(res.series(p)[9]).toBe(17);
      expect(res.series(p)[11]).toBe(22);
      expect(res.series(p)[14]).toBe(22);

      p.value = "Fix(years+13, {5 years})";
      res = m.simulate();
      expect(res.series(p)[14]).toBe(23);



      // Fixing primitives

      let p2 = m.Variable({
        name: "Source"
      });
      p2.value = "years()";

      m.Link(p2, p);
      p.value = "Fix([Source] + 12)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(12);
      expect(res.series(p)[5]).toBe(12);
      expect(res.series(p)[15]).toBe(12);


      p2.value = "years() + 12";
      p.value = "Fix([Source])";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(12);
      expect(res.series(p)[5]).toBe(12);
      expect(res.series(p)[15]).toBe(12);


      p.value = "Fix([source], 5)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(12);
      expect(res.series(p)[4]).toBe(12);
      expect(res.series(p)[5]).toBe(17);
      expect(res.series(p)[9]).toBe(17);
      expect(res.series(p)[11]).toBe(22);
      expect(res.series(p)[14]).toBe(22);



      let s = m.Stock({
        name: "Source2"
      });
      m.Link(s, p);
      let f = m.Flow(null, s, {
        name: "Flow"
      });
      f.rate = 1;
      s.initial = "12";
      p.value = "Fix([[Source2]], 5)";
      res = m.simulate();
      expect(res.series(p)[2]).toBe(12);
      expect(res.series(p)[4]).toBe(12);
      expect(res.series(p)[5]).toBe(17);
      expect(res.series(p)[9]).toBe(17);
      expect(res.series(p)[11]).toBe(22);
      expect(res.series(p)[14]).toBe(22);
    });


    test("Conveyor stock", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });
      let f2 = m.Flow(s, null, {
        name: "My Flow"
      });
      let p = m.Variable({
        name: "My Variable"
      });
      m.Link(s, p, {
        name: "My Link"
      });
      f.rate = "10";
      s.initial = "50";
      f2.rate = "[My Stock]";

      s.type = "Conveyor";
      s.delay = 5;
      p.value = "[[My Stock]]";


      let res = m.simulate();

      expect(res.series(p)[0]).toBe(50);
      expect(res.series(p)[1]).toBe(50);
      expect(res.series(p)[2]).toBe(50);
      expect(res.series(p)[12]).toBe(50);
      expect(res.series(s)[0]).toBe(10);
      expect(res.series(s)[1]).toBe(10);
      expect(res.series(s)[2]).toBe(10);
      expect(res.series(s)[5]).toBe(10);
      expect(res.series(s)[12]).toBe(10);
    });


    test("Simple conveyor stock", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock",
        type: "Conveyor",
        delay: 0,
        initial: 0
      });
      m.Flow(null, s, {
        name: "My Flow",
        rate: 1
      });

      let res = m.simulate();
      // no delay
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(s)[1]).toBe(1);
      expect(res.series(s)[2]).toBe(2);
      expect(res.series(s)[3]).toBe(3);
      expect(res.series(s)[4]).toBe(4);


      s.delay = 1;
      res = m.simulate();
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(s)[1]).toBe(1);
      expect(res.series(s)[2]).toBe(2);
      expect(res.series(s)[3]).toBe(3);
      expect(res.series(s)[4]).toBe(4);

        
      s.delay = 2;
      res = m.simulate();
      expect(res.series(s)[0]).toBe(0);
      expect(res.series(s)[1]).toBe(0);
      expect(res.series(s)[2]).toBe(1);
      expect(res.series(s)[3]).toBe(2);
      expect(res.series(s)[4]).toBe(3);

    });


    test("Two conveyor stocks", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });
      let s2 = m.Stock({
        name: "My Stock 2"
      });
      let f2 = m.Flow(s, s2, {
        name: "My Flow"
      });

      f.rate = "0";
      f.units = "Unitless";
      f2.rate = "0";
      f2.units = "Unitless";


      s.initial = "1";
      s.units = "Unitless";
      s.type = "Conveyor";
      s.delay = "2";


      s2.initial = "1";
      s2.units = "Unitless";
      s2.type = "Conveyor";
      s2.delay = "2";


      let res = m.simulate();

      expect(res.series(s)[0]).toBe(.5);
      expect(res.series(s)[1]).toBe(1);
      expect(res.series(s)[5]).toBe(1);

      expect(res.series(s2)[0]).toBe(.5);
      expect(res.series(s2)[1]).toBe(1);
      expect(res.series(s2)[5]).toBe(1);
    });


    test("Conveyor stock with units", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });
      let p = m.Variable({
        name: "My Variable"
      });
      m.Link(s, p, {
        name: "My Link"
      });
      f.rate = "1";
      s.initial = "0";

      s.type = "Conveyor";
      s.delay = 5;
      p.value = "[[My Stock]]";

      let res = m.simulate();

      expect(res.series(s)[2]).toBe(0);
      expect(res.series(s)[4]).toBe(0);
      expect(res.series(s)[12]).toBe(8);
      expect(res.series(p)[2]).toBe(2);
      expect(res.series(p)[12]).toBe(12);

      s.delay = "{5 years}";

      res = m.simulate();

      expect(res.series(s)[2]).toBe(0);
      expect(res.series(s)[4]).toBe(0);
      expect(res.series(s)[12]).toBe(8);
      expect(res.series(p)[2]).toBe(2);
      expect(res.series(p)[12]).toBe(12);

      s.delay = "{365 days}*5";

      res = m.simulate();

      expect(res.series(s)[2]).toBe(0);
      expect(res.series(s)[4]).toBe(0);
      expect(res.series(s)[12]).toBe(8);
      expect(res.series(p)[2]).toBe(2);
      expect(res.series(p)[12]).toBe(12);


      p.value = "[[My Stock]]-[My Stock]";
      let outF = m.Flow(s, null, {
        name: "Outflow"
      });
      outF.rate = "[My Stock]";

      f.rate = "2";
      res = m.simulate();
      expect(Math.round(res.value(s) * 1000)).toBe(2 * 1000);
      expect(res.value(p)).toBe(8);
      expect(res.series(p)[3]).toBe(6);
      expect(Math.round(res.value(outF) * 1000)).toBe(2 * 1000);
      expect(res.series(outF)[3]).toBe(0);
      expect(res.value(f)).toBe(2);
    });


    test("Conveyor with short delay", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });
      let s2 = m.Stock({
        name: "My Stock 2"
      });
      let f2 = m.Flow(s, s2, {
        name: "My Flow 2"
      });

      f.rate = 1;
      f2.rate = "[My Stock]";


      s.initial = 0;
      s.type = "Conveyor";
      // delay = time step
      s.delay = 1;

      s2.initial = 0;


      let res = m.simulate();

      if (algorithm === "Euler") {
        expect(res.series(s)[0]).toBe(0);
        expect(res.series(s)[1]).toBe(1);
        expect(res.series(s)[2]).toBe(1);
        expect(res.series(s)[5]).toBe(1);

        expect(res.series(s2)[0]).toBe(0);
        expect(res.series(s2)[1]).toBe(0);
        expect(res.series(s2)[2]).toBe(1);
        expect(res.series(s2)[3]).toBe(2);
        expect(res.series(s2)[4]).toBe(3);
        expect(res.series(s2)[5]).toBe(4);
      } else {
        expect(res.series(s)[0]).toBe(0);
        expect(Math.round(res.series(s)[20] * 1000)).toBe(1 * 1000);

        expect(res.series(s2)[0]).toBe(0);
        expect(Math.round(res.series(s2)[20] * 1000)).toBe(19 * 1000);
      }


      // delay < time step
      s.delay = 0.2;

      res = m.simulate();

      if (algorithm === "Euler") {
        expect(res.series(s)[0]).toBe(0);
        expect(res.series(s)[1]).toBe(1);
        expect(res.series(s)[2]).toBe(1);
        expect(res.series(s)[5]).toBe(1);
  
        expect(res.series(s2)[0]).toBe(0);
        expect(res.series(s2)[1]).toBe(0);
        expect(res.series(s2)[2]).toBe(1);
        expect(res.series(s2)[3]).toBe(2);
        expect(res.series(s2)[4]).toBe(3);
        expect(res.series(s2)[5]).toBe(4);
      } else {
        expect(res.series(s)[0]).toBe(0);
        expect(Math.round(res.series(s)[20] * 1000)).toBe(1 * 1000);
  
        expect(res.series(s2)[0]).toBe(0);
        expect(Math.round(res.series(s2)[20] * 1000)).toBe(19 * 1000);
      }

      // delay = 0
      s.delay = 0;

      res = m.simulate();
 
      if (algorithm === "Euler") {
        expect(res.series(s)[0]).toBe(0);
        expect(res.series(s)[1]).toBe(1);
        expect(res.series(s)[2]).toBe(1);
        expect(res.series(s)[5]).toBe(1);
   
        expect(res.series(s2)[0]).toBe(0);
        expect(res.series(s2)[1]).toBe(0);
        expect(res.series(s2)[2]).toBe(1);
        expect(res.series(s2)[3]).toBe(2);
        expect(res.series(s2)[4]).toBe(3);
        expect(res.series(s2)[5]).toBe(4);
      } else {
        expect(res.series(s)[0]).toBe(0);
        expect(Math.round(res.series(s)[20] * 1000)).toBe(1 * 1000);
   
        expect(res.series(s2)[0]).toBe(0);
        expect(Math.round(res.series(s2)[20] * 1000)).toBe(19 * 1000);
      }

      // negative delay, should fail
      s.delay = -1;
      expect(() => m.simulate()).toThrow(/cannot be less than 0/);
    });


    test("Conveyor material conservation", () => {
      let m = new Model({
        algorithm,
        timeLength: 20
      });


      let sA = m.Stock({
        name: "A"
      });
      let sB = m.Stock({
        name: "B"
      });
      let f = m.Flow(sA, sB, {
        name: "My Flow"
      });
      let f2 = m.Flow(sB, sA, {
        name: "My Flow 2"
      });

      let total = m.Variable({
        name: "Total",
        value: "[[A]] + [[B]]"
      });

      m.Link(sA, total);
      m.Link(sB, total);

      f.rate = ".2 * [A]";
      f2.rate = ".3 * [B]";


      sA.initial = 100;
      sB.initial = 40;
      

      let res = m.simulate();
      expect(res.series(total)[0]).toBe(140);
      expect(res.series(total)[5]).toBe(140);
      expect(res.series(total)[10]).toBe(140);

      sA.type = "Conveyor";
      sA.delay = 10;
      res = m.simulate();
      expect(res.series(total)[0]).toBe(140);
      expect(res.series(total)[5]).toBe(140);
      expect(res.series(total)[10]).toBe(140);


      sA.delay = .2;
      res = m.simulate();
      expect(res.series(total)[0]).toBe(140);
      expect(res.series(total)[5]).toBe(140);
      expect(res.series(total)[10]).toBe(140);


      // now let's make [B] also a converter
      sB.type = "Conveyor";
      sB.delay = 1;
      res = m.simulate();
      expect(res.series(total)[0]).toBe(140);
      expect(res.series(total)[5]).toBe(140);
      expect(res.series(total)[10]).toBe(140);

      sB.delay = 1.3;
      res = m.simulate();
      expect(res.series(total)[0]).toBe(140);
      expect(res.series(total)[5]).toBe(140);
      expect(res.series(total)[10]).toBe(140);

      sB.delay = 0;
      res = m.simulate();
      expect(res.series(total)[0]).toBe(140);
      expect(res.series(total)[5]).toBe(140);
      expect(res.series(total)[10]).toBe(140);
    });


    test("Conveyor smoothness", () => {
      let m = new Model({
        algorithm,
        timeLength: 20,
        timeStep: 0.1
      });


      let s = m.Stock({
        name: "S",
        type: "Conveyor",
        delay: 2.2,
        nonNegative: true
      });
      m.Flow(null, s, {
        name: "in",
        rate: "Pulse(5, 4, 4)"
      });
      m.Flow(s, null, {
        name: "out",
        rate: "5"
      });

      let res = m.simulate();
      let x = 0.4;
      expect(+res.series(s)[0].toFixed(5)).toBe(0);
      expect(+res.series(s)[1].toFixed(5)).toBe(0);
      expect(+res.series(s)[2].toFixed(5)).toBe(0);
      expect(+res.series(s)[3].toFixed(5)).toBe(0);
      expect(+res.series(s)[80].toFixed(5)).toBe(x);
      expect(+res.series(s)[81].toFixed(5)).toBe(x);
      expect(+res.series(s)[82].toFixed(5)).toBe(x);
      expect(+res.series(s)[83].toFixed(5)).toBe(x);
      expect(+res.series(s)[84].toFixed(5)).toBe(x);
      expect(+res.series(s)[85].toFixed(5)).toBe(x);
      expect(+res.series(s)[86].toFixed(5)).toBe(x);
      expect(+res.series(s)[87].toFixed(5)).toBe(x);
      expect(+res.series(s)[88].toFixed(5)).toBe(x);
      expect(+res.series(s)[89].toFixed(5)).toBe(x);
      expect(+res.series(s)[res.series(s).length - 5].toFixed(5)).toBe(0);
      expect(+res.series(s)[res.series(s).length - 4].toFixed(5)).toBe(0);
      expect(+res.series(s)[res.series(s).length - 3].toFixed(5)).toBe(0);
      expect(+res.series(s)[res.series(s).length - 2].toFixed(5)).toBe(0);
    });


    test("Circular equation", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let p = m.Variable({
        name: "My Variable"
      });
      m.Link(s, p, {
        name: "My Link"
      });
      m.Link(p, s, {
        name: "My Link"
      });
      s.initial = "[My Variable]";

      s.type = "Conveyor";
      s.delay = 5;
      p.value = "[[My Stock]]";


      expect(() => m.simulate()).toThrow(/Circular equation/);
    });


    test("Circular flows", () => {
      let m = new Model({ algorithm });


      let A = m.Stock({
        name: "A",
        initial: 10
      });
      let B = m.Stock({
        name: "B",
        initial: 10
      });

      m.Flow(A, B, {
        name: "Flow 1",
        rate: 1,
        nonNegative: true
      });
      m.Flow(B, A, {
        name: "Flow 2",
        rate: 1,
        nonNegative: true
      });

      let res = m.simulate();
      expect(res.value(A)).toBe(10);
      expect(res.value(B)).toBe(10);


      res = m.simulate();
      expect(res.value(A)).toBe(10);
      expect(res.value(B)).toBe(10);

    });


    test("Constant flow", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let s2 = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(s, s2, {
        name: "My Flow"
      });
      f.rate = "1";
      s.initial = "0";
      s2.initial = "0";

      let res = m.simulate();
      expect(res.series(s)[5]).toBe(-5);
      expect(res.series(s2)[5]).toBe(5);
      expect(res.series(s)[10]).toBe(-10);
      expect(res.series(s2)[10]).toBe(10);
    });


    test("Flow values", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable"
      });
      let  f = m.Flow(null, null, {
        name: "My Flow"
      });
      m.Link(f, p);

      f.rate = 10;
      p.value = "[My Flow]";
      let res = m.simulate();
      expect(res.series(p)[20]).toBe(10);
    });


    test("Flow units", () => {
      let m = new Model({ algorithm });

      let s1 = m.Stock({
        name: "Stock 1"
      });
      let s2 = m.Stock({
        name: "Stock 2"
      });
      let s3 = m.Stock({
        name: "Stock 3"
      });
      let s4 = m.Stock({
        name: "Stock 4"
      });
      let s5 = m.Stock({
        name: "Stock 5"
      });

      let f1 = m.Flow(null, s1, {
        name: "Flow 1"
      });
      let f2 = m.Flow(null, s2, {
        name: "Flow 2"
      });
      let f3 = m.Flow(null, s3, {
        name: "Flow 3"
      });
      let f4 = m.Flow(null, s4, {
        name: "Flow 4"
      });
      let f5 = m.Flow(null, s5, {
        name: "Flow 5"
      });

      f1.rate = 1;
      f2.units = "unitless";
      f2.rate = 7;
      f2.units = "1/years";
      f3.rate = 3;
      f3.units = "dollars/years";
      s3.units = "dollars";
      f4.rate = "{200 centimeters/year}";
      f4.units = "meters/years";
      s4.units = "centimeters";
      f5.rate = 5;
      f5.units = "1/days";
      let res = m.simulate();
      expect(Math.round(res.series(f1)[20] * 1000)).toBe(1 * 1000);
      expect(Math.round(res.series(f2)[20] * 1000)).toBe(7 * 1000);
      expect(Math.round(res.series(f3)[20] * 1000)).toBe(3 * 1000);
      expect(Math.round(res.series(f4)[20] * 1000)).toBe(2 * 1000);
      expect(Math.round(res.series(f5)[20] * 1000)).toBe(5 * 1000);

      expect(res.series(s1)[2]).toBe(1 * 2);
      expect(Math.round(res.series(s2)[2])).toBe(7 * 2);
      expect(res.series(s3)[2]).toBe(3 * 2);
      expect(res.series(s4)[2]).toBe(200 * 2);
      expect(Math.round(res.series(s5)[2])).toBe(5 * 365 * 2);
    });


    test("Non-negative stocks", () => {
      let m = new Model({ algorithm });


      // alpha is non-negative

      let s = m.Stock({
        name: "My Stock"
      });
      let s2 = m.Stock({
        name: "My Stock 2"
      });
      let f = m.Flow(s, s2, {
        name: "My Flow",
        nonNegative: false
      });

      s.initial = 10;
      s2.initial = 1;
      f.rate = 1;
      let res = m.simulate();
      expect(res.series(s)[20]).toBe(-10);
      expect(res.series(s2)[20]).toBe(21);
      s.nonNegative = true;
      res = m.simulate();
      expect(res.series(s)[20]).toBe(0);
      expect(res.series(s2)[20]).toBe(11);

      // omega is non-negative

      s.nonNegative = false;
      s2.nonNegative = true;
      f.rate = -1;

      res = m.simulate();
      expect(res.series(s)[20]).toBe(11);
      expect(res.series(s2)[20]).toBe(0);

      // both are non-negative

      s.nonNegative = true;
      
      res = m.simulate();
      expect(res.series(s)[20]).toBe(11);
      expect(res.series(s2)[20]).toBe(0);


      // Vectors


      s.initial = "{5, 6}";
      s2.initial = "{1, 1}";
      f.rate = "{1, 1}";
      s.nonNegative = false;
      s2.nonNegative = false;


      res = m.simulate();
      expect(res.series(s)[20][0]).toBe(-15);
      expect(res.series(s)[20][1]).toBe(-14);
      expect(res.series(s2)[20][0]).toBe(21);
      expect(res.series(s2)[20][1]).toBe(21);

      // alpha is non-negative

      s.nonNegative = true;

      res = m.simulate();
      expect(res.series(s)[20][0]).toBe(0);
      expect(res.series(s)[20][1]).toBe(0);
      expect(res.series(s2)[20][0]).toBe(6);
      expect(res.series(s2)[20][1]).toBe(7);

      // omega is non-negative

      s.nonNegative = false;
      s2.nonNegative = true;

      f.rate = "{-1, -1}";
      res = m.simulate();
      expect(res.series(s)[20][0]).toBe(6);
      expect(res.series(s)[20][1]).toBe(7);
      expect(res.series(s2)[20][0]).toBe(0);
      expect(res.series(s2)[20][1]).toBe(0);

      // both are non-negative

      s.nonNegative = true;
      res = m.simulate();
      expect(res.series(s)[20][0]).toBe(6);
      expect(res.series(s)[20][1]).toBe(7);
      expect(res.series(s2)[20][0]).toBe(0);
      expect(res.series(s2)[20][1]).toBe(0);

      // clamp some elements, not others

      f.rate = "{1, -1}";
      res = m.simulate();
      expect(res.series(s)[20][0]).toBe(0);
      expect(res.series(s)[20][1]).toBe(7);
      expect(res.series(s2)[20][0]).toBe(6);
      expect(res.series(s2)[20][1]).toBe(0);

    });


    test("Local scopes", () => {
      let m = new Model({ algorithm });


      let a = m.Variable({
        name: "a",
        value: "x <- 9\n[b]+5\nx"
      });
      let b = m.Variable({
        name: "b",
        value: "x <- 2"
      });

      m.Link(b, a);

      let res = m.simulate();
      expect(res.series(a)[1]).toBe(9);
      expect(res.series(b)[1]).toBe(2);

      // reverse variable evaluation order
      m = new Model({ algorithm });
      b = m.Variable({
        name: "b",
        value: "x <- 2"
      });
      a = m.Variable({
        name: "a",
        value: "x <- 9\n[b]+5\nx"
      });

      m.Link(b, a);

      res = m.simulate();
      expect(res.series(a)[1]).toBe(9);
      expect(res.series(b)[1]).toBe(2);
    });


    test("Multiple non-negative stocks", () => {
      let m = new Model({ algorithm });


      let sA = m.Stock({
        name: "sA",
        nonNegative: true
      });
      let sB = m.Stock({
        name: "sB",
        nonNegative: true
      });
      let sC = m.Stock({
        name: "sC",
        nonNegative: true
      });
      let sD = m.Stock({
        name: "sD",
        nonNegative: true
      });

      let sZ = m.Stock({
        name: "sZ",
        nonNegative: true
      });
      let sY = m.Stock({
        name: "sY",
        nonNegative: true
      });
      let sX = m.Stock({
        name: "sX",
        nonNegative: true
      });
      let sW = m.Stock({
        name: "sW",
        nonNegative: true
      });

      m.Flow(null, sA, {
        name: "My Flow",
        rate: "pulse(5, 1, .99)"
      });
      m.Flow(sA, sB, {
        name: "My Flow",
        rate: "50"
      });
      m.Flow(sB, sC, {
        name: "My Flow",
        rate: "50"
      });
      m.Flow(sC, sD, {
        name: "My Flow",
        rate: "50"
      });

      m.Flow(sY, sZ, {
        name: "My Flow",
        rate: "50"
      });
      m.Flow(sX, sY, {
        name: "My Flow",
        rate: "50"
      });
      m.Flow(sW, sX, {
        name: "My Flow",
        rate: "50"
      });
      m.Flow(null, sW, {
        name: "My Flow",
        rate: "pulse(5, 1, .99)",
      });



      let res = m.simulate();
      expect(res.series(sA)).toStrictEqual(res.series(sW));
      expect(res.series(sB)).toStrictEqual(res.series(sX));
      expect(res.series(sC)).toStrictEqual(res.series(sY));
      expect(res.series(sD)).toStrictEqual(res.series(sZ));

      expect(res.series(sA)[5]).toEqual(0);
      expect(res.series(sA)[6]).toEqual(0);
      expect(res.series(sA)[7]).toEqual(0);

      expect(res.series(sB)[5]).toEqual(0);
      expect(res.series(sB)[6]).toEqual(0);
      expect(res.series(sB)[7]).toEqual(0);

      expect(res.series(sC)[5]).toEqual(0);
      expect(res.series(sC)[6]).toEqual(0);
      expect(res.series(sC)[7]).toEqual(0);


      expect(res.series(sD)[4]).toEqual(0);
      if (algorithm === "Euler") {
        // in RK4 this gets blurred
        expect(res.series(sD)[5]).toEqual(0);
      }
      expect(res.series(sD)[6]).toEqual(1);
      expect(res.series(sD)[7]).toEqual(1);
    });



    test("Ordering of non-negative flow's in and out", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let outflow = m.Flow(s, null, {
        name: "Outflow"
      });
      let inflow = m.Flow(null, s, {
        name: "Inflow"
      });
      s.nonNegative = true;


      s.initial = 50;
      outflow.rate = 110;
      inflow.rate = 100;
      let res = m.simulate();
      expect(res.series(s)[2]).toBe(30);
      expect(res.series(s)[10]).toBe(0);

      s.initial = "{a:50, b:30}";
      outflow.rate = "{a:-10, b:110}";
      inflow.rate = "{a:-10, b:100}";
      res = m.simulate();
      expect(res.series(s)[2].a).toBe(50);
      expect(res.series(s)[10].a).toBe(50);
      expect(res.series(s)[2].b).toBe(10);
      expect(res.series(s)[10].b).toBe(0);



      m = new Model({ algorithm});

      s = m.Stock({
        name: "My Stock"
      });
      inflow = m.Flow(null, s, {
        name: "Inflow"
      }); // Flip order
      outflow = m.Flow(s, null, {
        name: "Outflow"
      });
      s.nonNegative = true;


      s.initial = 50;
      outflow.rate = 110;
      inflow.rate = 100;
      res = m.simulate();
      expect(res.series(s)[2]).toBe(30);
      expect(res.series(s)[10]).toBe(0);

      s.initial = "{a:50, b:30}";
      outflow.rate = "{a:-10, b:110}";
      inflow.rate = "{a:-10, b:100}";
      res = m.simulate();
      expect(res.series(s)[2].a).toBe(50);
      expect(res.series(s)[10].a).toBe(50);
      expect(res.series(s)[2].b).toBe(10);
      expect(res.series(s)[10].b).toBe(0);
    });


    test("Stock with functions in the initial value", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });

      s.initial = "years+10";
      let res = m.simulate();
      expect(res.series(s)[20]).toBe(10);
    });


    test("Non-negative flows", () => {
      let m = new Model({ algorithm });


      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });

      s.initial = 10;
      f.rate = "years - 10";
      f.nonNegative = false;
      let res = m.simulate();
      expect(res.value(s, 0)).toBe(10);
      expect(Math.round(res.value(f, 0) * 1000)).toBe(-10 * 1000);
      if (algorithm === "Euler") {
        expect(res.value(s, 1)).toBe(0);
      }
      f.nonNegative = true;
      res = m.simulate();
      expect(res.series(s)[2]).toBe(10);
      expect(res.series(f)[1]).toBe(0);

      
      // Vectors

      s.initial = "{10, 10}";
      f.rate = "{1, -1}";
      f.nonNegative = false;
      res = m.simulate();
      expect(res.series(s)[2][0]).toBe(12);
      expect(res.series(s)[2][1]).toBe(8);
      expect(res.series(f)[1][0]).toBe(1);
      expect(res.series(f)[1][1]).toBe(-1);

      f.nonNegative = true;
      res = m.simulate();
      expect(res.series(s)[2][0]).toBe(12);
      expect(res.series(s)[2][1]).toBe(10);
      expect(res.series(f)[1][0]).toBe(1);
      expect(res.series(f)[1][1]).toBe(0);
    });


    test("Vector collapsing with no names", () => {
      let m = new Model({ algorithm });

      m.timeLength = 100;

      let s = m.Stock({
        name: "My Stock"
      });
      let f = m.Flow(null, s, {
        name: "My Flow"
      });

      s.initial = "{0, 0}";
      f.rate = "{{10,10}, {20,20}}";

      let res = m.simulate();
      expect(res.value(s)[0]).toBe(20 * 100);
      expect(res.value(s)[1]).toBe(40 * 100);
    });


    test("Converter", () => {
      let m = new Model({ algorithm });

      m.timeLength = 100;


      let c = m.Converter({
        name: "my converter"
      });

      c.values = [{x: 1, y: 1.1}, {x: 1.5, y: 4}, {x: 2, y: 4}, {x: 3, y: 9}, {x: 4, y: 16}, {x: 100, y: 200}];


      let p = m.Variable({
        name: "Param"
      });
      m.Link(p, c);
      p.value = "years+40";
      c.input = p;

      let res = m.simulate();
      expect(200).toBe(res.series(c)[60]);

      // conflicting names aren't an issue
      
      let p2 = m.Variable({
        name: "Param"
      });
      m.Link(p2, c);
      p2.value = "years+80";

      res = m.simulate();
      expect(200).toBe(res.series(c)[60]);

      // time source

      c.input = "Time";

      res = m.simulate();
      expect(1.1).toBe(res.series(c)[1]);

      c.values = [{x: 0, y: 2}, {x: 20, y: 4}];

      res = m.simulate();
      expect(res.series(c)[10]).toBe(3);
      c.interpolation = "Discrete";
      res = m.simulate();
      expect(res.series(c)[10]).toBe(2);
      c.interpolation = "Linear";
      res = m.simulate();
      expect(res.series(c)[10]).toBe(3);



      m.Link(c, p);

      p.value = "[my converter]+[my converter]";

      res = m.simulate();
      expect(res.series(p)[10]).toBe(6);
      expect(res.series(p)[20]).toBe(8);
      expect(res.series(p)[21]).toBe(8);

      p.units = "Years";
      c.units = "Years";
      res = m.simulate();
      expect(res.series(p)[10]).toBe(6);
      expect(res.series(p)[20]).toBe(8);
      expect(res.series(p)[21]).toBe(8);
    });


    test("Converter invalid data", () => {
      let m = new Model({ algorithm });


      let c = m.Converter({
        name: "my converter"
      });

      // missing value
      // @ts-ignore
      c.values = [{x: 1}, {x: 1.5, y: 4}, {x: 2, y: 4}, {x: 3, y: 9}, {x: 4, y: 16}, {x: 100, y: 200}];

      expect(() => m.simulate()).toThrow(/invalid data/);

      // invalid value
      // @ts-ignore
      c.values = [{x: 1, y: "b"}, {x: 1.5, y: 4}, {x: 2, y: 4}, {x: 3, y: 9}, {x: 4, y: 16}, {x: 100, y: 200}];
      expect(() => m.simulate()).toThrow(/invalid data/);
    });


    test("Converter invalid source", () => {
      let m = new Model({ algorithm });

      let c = m.Converter();

      // missing value
      c.values = [{x: 1, y: 1}, {x: 1.5, y: 4}, {x: 2, y: 4}, {x: 3, y: 9}, {x: 4, y: 16}, {x: 100, y: 200}];

      // @ts-ignore
      c.input = {id: null};


      expect(() => m.simulate()).toThrow(/does not have a source/);
    });


    test("Converter with vector inputs", () => {
      let m = new Model({ algorithm });

      let c = m.Converter({
        name: "my converter"
      });


      c.values = [{x: 0, y: 0}, {x: 50, y: 100}, {x: 100, y: 1000}, {x: 150, y: 1100}];


      let p = m.Variable({
        name: "Input"
      });
      m.Link(p, c);
      p.value = "{a: years, b: years+100}";
      c.input = p;

      let res = m.simulate();

      expect(res.series(c)[0].a).toBe(0);
      expect(res.series(c)[0].b).toBe(1000);

      expect(res.series(c)[10].a).toBe(20);
      expect(res.series(c)[10].b).toBe(1020);


      p.value = "{years, years+100}";

      res = m.simulate();
      
      expect(res.series(c)[0][0]).toBe(0);
      expect(res.series(c)[0][1]).toBe(1000);

      expect(res.series(c)[10][0]).toBe(20);
      expect(res.series(c)[10][1]).toBe(1020);


      p.value = "{a: {x: years, y: years+100 }}";

      res = m.simulate();
      
      expect(res.series(c)[0].a.x).toBe(0);
      expect(res.series(c)[0].a.y).toBe(1000);

      expect(res.series(c)[10].a.x).toBe(20);
      expect(res.series(c)[10].a.y).toBe(1020);


      p.value = "{a: {x: years, y: years+100, z: \"foo\" }}";

      expect(() => m.simulate()).toThrow(/Cannot use Strings in/);
    });


    test("Stock initial values", () => {
      let m = new Model({ algorithm });


      let p = m.Stock({
        name: "My Stock 1"
      });
      let p2 = m.Stock({
        name: "My Stock 2"
      });
      m.Link(p, p2);
      p.initial = "10";
      p2.initial = "[My Stock 1]";

      let res = m.simulate();
      expect(res.series(p)[0]).toBe(10);
      expect(res.series(p2)[0]).toBe(10);

      m.Link(p2, p);
      p.initial = "[My Stock 2]";
      p2.initial = "20";
      res = m.simulate();
      expect(res.series(p)[0]).toBe(20);
      expect(res.series(p2)[0]).toBe(20);
    });


    test("Units Being Copied function", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable 1"
      });
      let p2 = m.Variable({
        name: "My Variable 2"
      });
      m.Link(p, p2);
      p.value = "10";
      p2.units = "Rabbits";
      p2.value = "[My Variable 1]";

      let res = m.simulate();
      expect(res.series(p)[3]).toBe(10);
      expect(res.series(p2)[3]).toBe(10);
    });


    test("Vector in variable", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable 1"
      });
      let p2 = m.Variable({
        name: "My Variable 2"
      });
      let p3 = m.Variable({
        name: "My Variable 3"
      });
      m.Link(p, p2);
      m.Link(p2, p3);
      p.value = "{a: 1.2, b:3.2}";
      p2.value = "round([My Variable 1])";
      p3.value = "[My Variable 2].b";

      let res = m.simulate();
      expect(res.series(p3)[3]).toBe(3);
    });


    test("String in variable target string", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable 1"
      });
      let p2 = m.Variable({
        name: "My Variable 2"
      });
      m.Link(p, p2);
      p.value = "\"a\"";
      p2.value = "[my variable 1].uppercase()";

      let res = m.simulate();
      expect(res.series(p)[3]).toBe("a");
      expect(res.series(p2)[3]).toBe("A");
    });


    test("String in variable target number", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable 1"
      });
      let p2 = m.Variable({
        name: "My Variable 2"
      });
      m.Link(p, p2);
      p.value = "\"a\"";
      p2.value = "ceiling([my variable 1])";

      expect(() => m.simulate()).toThrow(/does not accept string values/);
    });


    test("Vector(String) in variable target number", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable 1"
      });
      let p2 = m.Variable({
        name: "My Variable 2"
      });
      m.Link(p, p2);
      p.value = "{\"a\", \"b\"}";
      p2.value = "ceiling([my variable 1])";

      expect(() => m.simulate()).toThrow(/requires a number for the parameter/);
    });


    test("Vector(Number) in variable target number", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Variable 1"
      });
      let p2 = m.Variable({
        name: "My Variable 2"
      });
      m.Link(p, p2);
      p.value = "{1.2, 3.8}";
      p2.value = "ceiling([my variable 1])";

      let res = m.simulate();
      expect(res.series(p2)[3]).toEqual([2, 4]);
    });


    test("Frozen Folders", () => {
      let m = new Model({ algorithm });

      let p = m.Variable({
        name: "My Param"
      });
      let p2 = m.Variable({
        name: "Derived"
      });
      m.Link(p, p2);
      p.value = "Years";
      p2.value = "[My Param] + Years";
      let f = m.Folder({
        name: "Folder"
      });
      p.parent = f;
      f.frozen = false;

      let res = m.simulate();
      expect(res.series(p)[3]).toBe(3);
      expect(res.series(p2)[3]).toBe(6);
      f.frozen = true;
      res = m.simulate();
      expect(res.series(p)[3]).toBe(0);
      expect(res.series(p2)[3]).toBe(3);
    });


    test("Delay function", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "My Param"
      });
      let p2 = m.Variable({
        name: "Delayed"
      });
      m.Link(p, p2);
      p.value = "Years";
      p2.value = "Delay([My Param], 5, -3)";

      let res = m.simulate();
      expect(res.series(p2)[3]).toBe(-3);
      expect(res.series(p)[res.times().length - 6]).toBe(res.value(p2));

      p2.value = "Delay([My Param], 0)";
      res = m.simulate();
      expect(res.series(p2)[3]).toBe(res.series(p)[3]);

      p.value = "Years";
      p2.value = "Delay([My Param], 5, -3)";
      res = m.simulate();
      expect(res.series(p2)[3]).toBe(-3);
      expect(res.series(p)[res.times().length - 6]).toBe(res.value(p2));

      p2.value = "Delay([My Param], 0)";
      res = m.simulate();
      expect(res.series(p2)[3]).toBe(res.series(p)[3]);
    });


    test("Functions", () => {
      let m = new Model({ algorithm });
      m.timeLength = 100;


      let p = m.Variable({
        name: "My Param"
      });
      p.value = "Pulse(10,2,5)";
      let res = m.simulate();
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[12]).toBe(2);
      expect(res.series(p)[16]).toBe(0);
      p.value = "Pulse(20,.5,2,10)";
      res = m.simulate();
      expect(res.series(p)[28]).toBe(0);
      expect(res.series(p)[20]).toBe(0.5);
      expect(res.series(p)[30]).toBe(0.5);

      // Test If Then Else
      p.value = "IfThenElse(Years<20 and Years >= 10, 1, 0)";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[11]).toBe(1);

      let p2 = m.Variable({
        name: "a"
      });
      m.Link(p2, p);
      p2.value = "2";
      let p3 = m.Variable({
        name: "b"
      });
      p3.value = "1";
      m.Link(p3, p);

      p.value = "IfThenElse([a]=2,([b]+1)*[a],[a])";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(4);
      expect(res.series(p)[11]).toBe(4);

      p.value = "IfThenElse([a]=2,[b],[a])";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(1);
      expect(res.series(p)[11]).toBe(1);

      // Test Complex Vectors
      p2.value = "{a: {1,2,3}, b: {4,5,6}}";
      p.value = "[a].b{2}";
      res = m.simulate();
      expect(res.series(p)[12]).toBe(5);

      // Test Ramp function
      p.value = "Ramp(10, 15, 10)";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[12]).toBe(4);
      expect(res.series(p)[16]).toBe(10);


      // Test Staircase function
      p.value = "Step(10,3)";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[12]).toBe(3);
      expect(res.series(p)[16]).toBe(3);

      // Test Staircase function Vectorized
      p.value = "Step({a: 10, b:20, c:7}, {a:1, b:20, c:14}).c";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[12]).toBe(14);
      expect(res.series(p)[16]).toBe(14);

      // Test Staircase function Vectorized
      p.value = "Step(7, {a:1, b:20, c:12}).c";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(0);
      expect(res.series(p)[12]).toBe(12);
      expect(res.series(p)[16]).toBe(12);

      p.value = "Step(7, {1, 20, 14}).c";
      expect(() => m.simulate()).toThrow();

      p.value = "Step({a: 10, b:20, c:5}, {a:1, b:20, d:14}).b";
      expect(() => m.simulate()).toThrow();

      // Units: pulse ramp step
      p.units = "cows";
      p.value = "{1 cows} + Pulse(10, {2 cows}, 5)";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(1);
      expect(res.series(p)[12]).toBe(3);
      expect(res.series(p)[16]).toBe(1);
      p.value = "{1 cows} + Pulse(20,{.5 cows},2,10)";
      res = m.simulate();
      expect(res.series(p)[28]).toBe(1);
      expect(res.series(p)[20]).toBe(1.5);
      expect(res.series(p)[30]).toBe(1.5);


      // Test Ramp function
      p.value = "{1 cows} + Ramp(10, 15, {10 cows})";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(1);
      expect(res.series(p)[12]).toBe(5);
      expect(res.series(p)[16]).toBe(11);

      // Test Staircase function
      p.value = "{1 cows} + Step(10, {3 cows})";
      res = m.simulate();
      expect(res.series(p)[5]).toBe(1);
      expect(res.series(p)[12]).toBe(4);
      expect(res.series(p)[16]).toBe(4);
    });


    test("Mean, Median, Max, Min, StdDev functions", () => {
      let m = new Model({ algorithm });
      m.timeLength = 100;


      let p = m.Variable({
        name: "x"
      });
      let p2 = m.Variable({
        name: "y"
      });
      m.Link(p, p2);
      p.value = "(Years-60)^2";
      p2.value = "PastMean([x])";

      let res = m.simulate();
      expect(res.value(p2)).toBe(950);
      p2.value = "[x].PastMean()";
      res = m.simulate();
      expect(res.value(p2)).toBe(950);

      p2.value = "PastMedian([x])";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(625);
      p2.value = "[x].PastMedian()";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(625);

      p2.value = "Median(PastValues([x]))";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(625);
      p2.value = "[x].PastValues().Median()";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(625);

      p2.value = "PastStdDev([x])";
      res = m.simulate();
      expect(Math.round(res.value(p2) * 10)).toBe(Math.round(962.8 * 10));
      p2.value = "[x].PastStdDev()";
      res = m.simulate();
      expect(Math.round(res.value(p2) * 10)).toBe(Math.round(962.8 * 10));

      p2.value = "PastMax([x])";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(3600);
      p2.value = "[x].PastMax()";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(3600);

      p2.value = "PastMin([x])";
      res = m.simulate();
      expect(res.value(p2)).toBe(0);
      p2.value = "[x].PastMin()";
      res = m.simulate();
      expect(res.value(p2)).toBe(0);

      p.value = "(Years-60)^2";
      p2.value = "Mean(1,2,3)";
      res = m.simulate();
      expect(res.value(p2)).toBe(2);

      p2.value = "Median(1,2,4)";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(2);

      p2.value = "Max(1,5,7,6)";
      res = m.simulate();
      expect(Math.round(res.value(p2))).toBe(7);

      p2.value = "Min(1,0,7,6)";
      res = m.simulate();
      expect(res.value(p2)).toBe(0);
    });


    test("Multiple flows", () => {
      let m = new Model({ algorithm });


      let sA = m.Stock({
        name: "Stock A"
      });
      let sB = m.Stock({
        name: "Stock B"
      });
      let sY = m.Stock({
        name: "Stock Y"
      });
      let sX = m.Stock({
        name: "Stock X"
      });

      let a = m.Flow(null, sA, {
        name: "Flow A"
      });
      let b = m.Flow(null, sB, {
        name: "Flow B"
      });
      m.Link(a, b);
      let y = m.Flow(null, sY, {
        name: "Flow Y"
      });
      let x = m.Flow(null, sX, {
        name: "Flow X"
      });
      m.Link(x, y);


      a.rate = "years";
      x.rate = "years";

      b.rate = "[flow a]";
      y.rate = "[flow x]";


      let res = m.simulate();

      expect(res.series(a)[2]).toBe(res.series(b)[2]);
      expect(res.series(b)[2]).toBe(res.series(x)[2]);
      expect(res.series(x)[2]).toBe(res.series(y)[2]);

      expect(res.series(a)[5]).toBe(res.series(b)[5]);
      expect(res.series(b)[5]).toBe(res.series(x)[5]);
      expect(res.series(x)[5]).toBe(res.series(y)[5]);

      expect(res.series(sA)[5]).toBe(res.series(sB)[5]);
      expect(res.series(sB)[5]).toBe(res.series(sX)[5]);
      expect(res.series(sX)[5]).toBe(res.series(sY)[5]);
    });


    test("Linked flows", () => {
      let m = new Model({ algorithm });
      let x = m.Stock({
        name: "x",
        initial: 10
      });
      let y = m.Stock({
        name: "y",
        initial: 10
      });

      let fx = m.Flow(null, x, {
        name: "fx",
        rate: ".1 * [x]"
      });
      let v = m.Variable({
        name: "v",
        value: "[fx]"
      });
      let fy = m.Flow(null, y, {
        name: "fy",
        rate: "[v]"
      });

      m.Link(fx, v);
      m.Link(v, fy);

      let res = m.simulate();
      expect(res.series(x)).toEqual(res.series(y));
      expect(res.series(fx)).toEqual(res.series(fy));
      expect(res.series(fx)).toEqual(res.series(v));

      if (algorithm === "Euler") {
        expect(res.value(x, 10).toFixed(8)).toBe("25.93742460");
        expect(res.value(x, 20).toFixed(8)).toBe("67.27499949");
      } else {
        expect(res.value(x, 10).toFixed(8)).toBe("27.18279744");
        expect(res.value(x, 20).toFixed(8)).toBe("73.89044767");
      }
    });


    test("Seasonal", () => {
      let m = new Model({ algorithm });
      m.timeLength = 20;
      m.timeUnits = "Months";

      let p = m.Variable({
        name: "x"
      });
      let p2 = m.Variable({
        name: "y"
      });
      m.Link(p, p2);

      p2.value = "Seasonal()";
      let res = m.simulate();
      expect(res.series(p2)[0]).toBe(1);
      expect(Math.abs(Math.round(res.series(p2)[3] * 1000))).toBe(0);
      expect(res.timeUnits).toBe("months");


      p2.value = "Seasonal(0)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(1);
      expect(Math.abs(Math.round(res.series(p2)[3] * 1000))).toBe(0);


      p.value = "{3 Months}";
      p.units = "Months";
      p2.value = "Seasonal([x])";
      res = m.simulate();
      expect(Math.abs(Math.round(res.series(p2)[0] * 1000))).toBe(0);
      expect(res.series(p2)[3]).toBe(1);
    });


    test("Vector summation", () => {
      let m = new Model({ algorithm });

      let x = m.Variable({
        name: "x",
        value: "{{1, 2}, {3, 4}}"
      });
      let y = m.Variable({
        name: "y",
        value: "[x]{*, sum}{sum}"
      });
      m.Link(x, y);

      let res = m.simulate();
      expect(res.value(y)).toBe(10);
    });


    test("Flow value is leading edge of time", () => {
      let m = new Model({ algorithm });
      m.timeLength = 5;

      let f = m.Flow(null, null, {
        name: "f",
        rate: "years"
      });

      let res = m.simulate();
      expect(res.series(f)).toEqual([0, 1, 2, 3, 4, 5]);

      let v= m.Variable({
        value: "[f]",
      });

      m.Link(f, v);

      res = m.simulate();
      expect(res.series(f)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(res.series(v)).toEqual([0, 1, 2, 3, 4, 5]);
    });


    test("Two smooths in a variable", () => {
      let m = new Model({ algorithm });


      let unified = m.Variable({
        name: "unified",
        value: "smooth(years, 18) + smooth(years * 2, 18)"
      });


      let input1 = m.Variable({
        name: "input1",
        value: "smooth(years, 18)"
      });


      let input2 = m.Variable({
        name: "input2",
        value: "smooth(years * 2, 18)"
      });


      let combined = m.Variable({
        name: "combined",
        value: "[input1] + [input2]"
      });

      m.Link(input1, combined);
      m.Link(input2, combined);

      let res = m.simulate();

      expect(res.series(unified)).toEqual(res.series(combined));
    });


    test("Smooth with changing period", () => {
      let m = new Model({ algorithm });

      let inp = m.Variable({
        name: "input",
        value: "years"
      });

      let smoothed = m.Variable({
        name: "smoothed",
        value: "smooth([input], years + 100, 100)"
      });

      m.Link(inp, smoothed);

      let res = m.simulate();


      expect(res.value(smoothed, 0)).toBe(100);
      if (algorithm === "Euler") {
        expect(res.value(smoothed, 1).toFixed(8)).toBe("99.00000000");
        expect(res.value(smoothed, 2).toFixed(8)).toBe("98.02970297");
      } else {
        expect(res.value(smoothed, 1).toFixed(8)).toBe("99.01485149");
        expect(res.value(smoothed, 2).toFixed(8)).toBe("98.05882353");
      }
    });


    test("Smooth with local variable", () => {
      let m = new Model({
        algorithm
      });

      let v = m.Variable({
        value: `
        x <- 1
        y <- 2
        z <- 3

        smooth(x, y, z)
        `
      });

      let res = m.simulate();
      expect(res.value(v, 0)).toBe(3);
      expect(res.value(v)).toBeLessThan(3);
      expect(res.value(v)).toBeGreaterThan(.95);


      v.value = `
      x<-1
      y<-2

      delay1(x, y)
      `;
      res = m.simulate();
      expect(res.value(v, 0)).toBe(1);
      expect(res.value(v)).toBe(1);


      v.value = `
      x<-1
      y<-2
      z<-2

      delay3(x,y,z)
      `;
      res = m.simulate();
      expect(res.value(v, 0)).toBe(2);
      expect(res.value(v)).toBeLessThan(2);
      expect(res.value(v)).toBeGreaterThan(.95);
    });


    test("Smooth in circular dependency", () => {
      let m = new Model({ algorithm });

      let a = m.Variable({
        name: "a"
      });
      let b = m.Variable({
        name: "b"
      });


      m.Link(a, b);
      m.Link(b, a);
      a.value = "[b] + 1";


      // has initial value so not circular
      b.value = "Smooth([a], 99, 99)";
      expect(() => m.simulate()).not.toThrow(); // no error

      // no initial value so circular
      b.value = "Smooth([a], 99)";
      expect(() => m.simulate()).toThrow(/Circular/);
    });


    test("SSD as flow rate", () => {
      let m = new Model({ algorithm });

      let f = m.Flow(null, null, {
        rate: "Smooth(100, 1)"
      });

      expect(m.simulate().value(f, 0)).toBe(100);

      // with initial value
      f.rate = "Smooth(100, 1, 50)";
      expect(m.simulate().value(f, 0)).toBe(50);


      // delay1
      f.rate = "Delay1(100, 1)";
      expect(m.simulate().value(f, 0)).toBe(100);


      // delay3
      f.rate = "Delay3(100, 1)";
      expect(m.simulate().value(f, 0)).toBe(100);
    });


    test("SSDN as flow rate", () => {
      let m = new Model({ algorithm });

      let f = m.Flow(null, null, {
        rate: "SmoothN(100, 1, 1)"
      });

      expect(m.simulate().value(f, 0)).toBe(100);

      // with initial value
      f.rate = "SmoothN(100, 1, 1, 50)";
      expect(m.simulate().value(f, 0)).toBe(50);


      // delay1
      f.rate = "DelayN(100, 1, 1)";
      expect(m.simulate().value(f, 0)).toBe(100);


      // delay3
      f.rate = "DelayN(100, 1, 3)";
      expect(m.simulate().value(f, 0)).toBe(100);
    });


    test("SDD as an initial value", () => {
      let m = new Model({ algorithm });


      // no smooth initial value
      let s = m.Stock({
        initial: "Smooth(100, 1)"
      });
      expect(m.simulate().value(s)).toBe(100);


      // with initial value
      s.initial = "Smooth(100, 1, 50)";
      expect(m.simulate().value(s)).toBe(50);


      // delay1
      s.initial = "Delay1(100, 1)";
      expect(m.simulate().value(s)).toBe(100);


      // delay3
      s.initial = "Delay3(100, 1)";
      expect(m.simulate().value(s)).toBe(100);
    });



    test("Smooth function", () => {
      let m = new Model({ algorithm });
      m.timeLength = 50;


      let p = m.Variable({
        name: "My Param"
      });
      let p2 = m.Variable({
        name: "Smoothed"
      });
      m.Link(p, p2);
      p.value = "Step(25, 7.1)";
      p2.value = "Smooth([My Param], 5.6, 2.3)";

      let res = m.simulate();
      expect(res.series(p2)[0]).toBe(2.3);
      if (algorithm === "Euler") {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.04499082");
        expect(res.series(p2)[40].toFixed(8)).toBe("6.72951127");
      } else {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.06466829");
        expect(res.series(p2)[40].toFixed(8)).toBe("6.62882024");
      }

      p2.value = "SmoothN([My Param], 5.6, 1, 2.3)";

      res = m.simulate();
      expect(res.series(p2)[0]).toBe(2.3);
      if (algorithm === "Euler") {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.04499082");
        expect(res.series(p2)[40].toFixed(8)).toBe("6.72951127");
      } else {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.06466829");
        expect(res.series(p2)[40].toFixed(8)).toBe("6.62882024");
      }


      p2.value = "SmoothN([My Param], 5.6, 3, 2.3)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(2.3);
      if (algorithm === "Euler") {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.00013803");
        expect(res.series(p2)[40].toFixed(8)).toBe("7.08872876");
      } else {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.00354323");
        expect(res.series(p2)[40].toFixed(8)).toBe("7.01157193");
      }

      p2.value = "[My Param].Smooth(8.4, 3.2)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(3.2);
      if (algorithm === "Euler") {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.25362885");
        expect(res.series(p2)[40].toFixed(8)).toBe("6.05951890");
      } else {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.29588123");
        expect(res.series(p2)[40].toFixed(8)).toBe("5.96046691");
      }


      p2.value = "[My Param].SmoothN(8.4, 1, 3.2)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(3.2);
      if (algorithm === "Euler") {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.25362885");
        expect(res.series(p2)[40].toFixed(8)).toBe("6.05951890");
      } else {
        expect(res.series(p2)[20].toFixed(8)).toBe("0.29588123");
        expect(res.series(p2)[40].toFixed(8)).toBe("5.96046691");
      }

      p.value = "years";
      p2.value = "Smooth([My Param], 7, 15)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(15);
      if (algorithm === "Euler") {
        expect(res.series(p2)[10].toFixed(8)).toBe("7.70928294");
        expect(res.series(p2)[20].toFixed(8)).toBe("14.00806117");
        expect(res.series(p2)[30].toFixed(8)).toBe("23.21578388");
      } else {
        expect(res.series(p2)[10].toFixed(8)).toBe("8.27235225");
        expect(res.series(p2)[20].toFixed(8)).toBe("14.26353174");
        expect(res.series(p2)[30].toFixed(8)).toBe("23.30280838");
      }

      p2.value = "Smooth([My Param], 7, 15 * (years()^2 * 5 + 1))"; // only first initial value is used
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(15);
      if (algorithm === "Euler") {
        expect(res.series(p2)[10].toFixed(8)).toBe("7.70928294");
        expect(res.series(p2)[20].toFixed(8)).toBe("14.00806117");
        expect(res.series(p2)[30].toFixed(8)).toBe("23.21578388");
      } else {
        expect(res.series(p2)[10].toFixed(8)).toBe("8.27235225");
        expect(res.series(p2)[20].toFixed(8)).toBe("14.26353174");
        expect(res.series(p2)[30].toFixed(8)).toBe("23.30280838");
      }


      // now let's use an expression

      p.value = "years/2";
      p2.value = "Smooth([My Param] * 2, 12.3)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(0);
      if (algorithm === "Euler") {
        expect(res.series(p2)[1]).toBe(0);
        expect(res.series(p2)[10].toFixed(8)).toBe("2.96791103");
        expect(res.series(p2)[20].toFixed(8)).toBe("9.95616965");
        expect(res.series(p2)[30].toFixed(8)).toBe("18.66628463");
      } else {
        expect(res.series(p2)[10].toFixed(8)).toBe("3.15532093");
        expect(res.series(p2)[20].toFixed(8)).toBe("10.11955499");
        expect(res.series(p2)[30].toFixed(8)).toBe("18.77312593");
      }


      p.value = "10";
      p2.value = "Smooth([My Param] / 2 * 2, 4.5, 0)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(0);
      if (algorithm === "Euler") {
        expect(res.series(p2)[5].toFixed(8)).toBe("7.15371979");
        expect(res.series(p2)[10].toFixed(8)).toBe("9.18986890");
        expect(res.series(p2)[20].toFixed(8)).toBe("9.93436876");
      } else {
        expect(res.series(p2)[5].toFixed(8)).toBe("6.70798062");
        expect(res.series(p2)[10].toFixed(8)).toBe("8.91626084");
        expect(res.series(p2)[20].toFixed(8)).toBe("9.88255094");
      }

      p2.value = "SmoothN([My Param] / 2 * 2, 4.5, 1, 0)";
      res = m.simulate();
      expect(res.series(p2)[0]).toBe(0);
      if (algorithm === "Euler") {
        expect(res.series(p2)[5].toFixed(8)).toBe("7.15371979");
        expect(res.series(p2)[10].toFixed(8)).toBe("9.18986890");
        expect(res.series(p2)[20].toFixed(8)).toBe("9.93436876");
      } else {
        expect(res.series(p2)[5].toFixed(8)).toBe("6.70798062");
        expect(res.series(p2)[10].toFixed(8)).toBe("8.91626084");
        expect(res.series(p2)[20].toFixed(8)).toBe("9.88255094");
      }


      p2.value = "SmoothN([My Param] / 2 * 2, 4.5, 1.5, 0)";
      expect(() => m.simulate()).toThrow(/order must be/);
    });


    test("Delay1 and Delay3 functions", () => {
      let m = new Model({ algorithm });
      m.timeLength = 40;


      let input = m.Variable({
        name: "input"
      });
      let out = m.Variable({
        name: "ExpValue"
      });
      m.Link(input, out);
      input.value = "Step(20)";

      out.value = "Delay3([input], 40, 3)";
      let res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.89821360");
        expect(res.series(out)[20].toFixed(8)).toBe("2.44200406");
        expect(res.series(out)[30].toFixed(8)).toBe("1.85436162");
      } else if (algorithm === "RK4") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.87848472");
        expect(res.series(out)[20].toFixed(8)).toBe("2.42654085");
        expect(res.series(out)[30].toFixed(8)).toBe("1.87018349");
      }


      out.value = "Delay3([input], 40, 3 * (years() + 1))"; // only first initial value is used
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.89821360");
        expect(res.series(out)[20].toFixed(8)).toBe("2.44200406");
        expect(res.series(out)[30].toFixed(8)).toBe("1.85436162");
      } else if (algorithm === "RK4") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.87848472");
        expect(res.series(out)[20].toFixed(8)).toBe("2.42654085");
        expect(res.series(out)[30].toFixed(8)).toBe("1.87018349");
      }


      out.value = "[input].Delay3(40, 3)";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.89821360");
        expect(res.series(out)[20].toFixed(8)).toBe("2.44200406");
        expect(res.series(out)[30].toFixed(8)).toBe("1.85436162");
      } else if (algorithm === "RK4") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.87848472");
        expect(res.series(out)[20].toFixed(8)).toBe("2.42654085");
        expect(res.series(out)[30].toFixed(8)).toBe("1.87018349");
      }

      out.value = "[input].DelayN(40, 3, 3)";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.89821360");
        expect(res.series(out)[20].toFixed(8)).toBe("2.44200406");
        expect(res.series(out)[30].toFixed(8)).toBe("1.85436162");
      } else if (algorithm === "RK4") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.87848472");
        expect(res.series(out)[20].toFixed(8)).toBe("2.42654085");
        expect(res.series(out)[30].toFixed(8)).toBe("1.87018349");
      }


      // 7th order delay
      out.value = "[input].DelayN(40, 7, 3)";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(3);
        expect(res.series(out)[10].toFixed(8)).toBe("2.99889920");
        expect(res.series(out)[20].toFixed(8)).toBe("2.85905304");
        expect(res.series(out)[30].toFixed(8)).toBe("2.21092561");
      } else {
        expect(res.series(out)[10].toFixed(8)).toBe("2.99339520");
        expect(res.series(out)[20].toFixed(8)).toBe("2.80413553");
        expect(res.series(out)[30].toFixed(8)).toBe("2.17677862");
      }


      out.value = "[input].DelayN(40, -3, 3)";
      expect(() => m.simulate()).toThrow(/order must be/);

      out.value = "Delay1([input], 40, 2)";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(2);
        expect(res.series(out)[10].toFixed(8)).toBe("1.55265924");
        expect(res.series(out)[20].toFixed(8)).toBe("1.20537536");
        expect(res.series(out)[30].toFixed(8)).toBe("1.15943898");
      } else if (algorithm === "RK4") {
        expect(res.series(out)[0]).toBe(2);
        expect(res.series(out)[10].toFixed(8)).toBe("1.55760157");
        expect(res.series(out)[20].toFixed(8)).toBe("1.21722799");
        expect(res.series(out)[30].toFixed(8)).toBe("1.16917733");
      }


      out.value = "DelayN([input], 40, 1, 2)";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(out)[0]).toBe(2);
        expect(res.series(out)[10].toFixed(8)).toBe("1.55265924");
        expect(res.series(out)[20].toFixed(8)).toBe("1.20537536");
        expect(res.series(out)[30].toFixed(8)).toBe("1.15943898");
      } else if (algorithm === "RK4") {
        expect(res.series(out)[0]).toBe(2);
        expect(res.series(out)[10].toFixed(8)).toBe("1.55760157");
        expect(res.series(out)[20].toFixed(8)).toBe("1.21722799");
        expect(res.series(out)[30].toFixed(8)).toBe("1.16917733");
      }
    });


    test("Constant SSD", () => {
      let m = new Model({algorithm });

      let input = m.Variable({
        name: "in",
        value: "10"
      });

      let output = m.Variable({
        name: "out"
      });

      m.Link(input, output);


      output.value="smooth([in], 100)";
      let res = m.simulate();
      expect(res.value(output, 0)).toBe(10);
      expect(res.value(output)).toBe(10);


      output.value="delay1([in], 100)";
      res = m.simulate();
      expect(res.value(output, 0)).toBe(10);
      expect(res.value(output)).toBe(10);


      output.value="delay3([in], 100)";
      res = m.simulate();
      expect(res.value(output, 0)).toBe(10);
      expect(res.value(output)).toBe(10);


      // test a different time step

      m.timeStep = 0.5;

      output.value="smooth([in], 100)";
      res = m.simulate();
      expect(res.value(output, 0)).toBe(10);
      expect(res.value(output)).toBe(10);


      output.value="delay1([in], 100)";
      res = m.simulate();
      expect(res.value(output, 0)).toBe(10);
      expect(res.value(output)).toBe(10);


      output.value="delay3([in], 100)";
      res = m.simulate();
      expect(res.value(output, 0)).toBe(10);
      expect(res.value(output)).toBe(10);
    });


    test("Multiple SDDs in model", () => {
      let m = new Model({ algorithm });

      let in1 = m.Variable({
        name: "in",
        value: "Pulse(10, 15)"
      });
      let out1 = m.Variable({
        name: "out"
      });
      m.Link(in1, out1);

      let in2 = m.Variable({
        name: "in",
        value: "Pulse(10, 15)"
      });
      let out2 = m.Variable({
        name: "out"
      });
      m.Link(in2, out2);


      out1.value = "Smooth([in], 100)";
      out2.value = "Smooth([in], 100)";
      let res = m.simulate();
      expect(res.value(out1)).toBe(res.value(out2));


      out1.value = "Delay1([in], 100)";
      out2.value = "Delay1([in], 100)";
      res = m.simulate();
      expect(res.value(out1)).toBe(res.value(out2));


      out1.value = "Delay3([in], 100, 5)";
      out2.value = "Delay3([in], 100, 5)";
      res = m.simulate();
      expect(res.value(out1)).toBe(res.value(out2));
    });


    test("SDD and equivalent stocks", () => {
      let m = new Model({
        algorithm,
        timeLength: 20
      });


      // smooth

      let v = m.Variable({
        name: "v",
        value: "smooth([in], 25, 0)"
      });
      let input = m.Variable({
        name: "in",
        value: "years ^ 2 * ramp(0, 10, 2)"
      });

      let stock = m.Stock({
        name: "s",
        initial: 0
      });
      let flow = m.Flow(null, stock, {
        rate: "([in] - [s]) / 25",
        nonNegative: false
      });

      m.Link(input, flow);
      m.Link(input, v);

      let res = m.simulate();
      expect(res.value(v).toPrecision(8)).toBe(res.value(stock).toPrecision(8));



      // delay1 and delay3

      m = new Model({
        algorithm,
        timeLength: 20
      });

      input = m.Variable({
        name: "in",
        value: "Ramp(4, 8, 25)"
      });
      let d1 = m.Variable({
        name: "d1",
        value: "Delay1([in], [t])"
      });
      let d3 = m.Variable({
        name: "d3",
        value: "Delay3([in], [t])"
      });
      let t = m.Variable({
        name: "t",
        value: 31
      });

      // set up delay 1 stock
      let s = m.Stock({
        name: "s",
        initial: "[t] * [in]"
      });
      let inflow = m.Flow(null, s, {
        name: "i",
        rate: "[in]"
      });
      let outflow1 = m.Flow(s, null, {
        name: "o",
        rate: "[s] / [t]"
      });

      m.Link(input, inflow);
      m.Link(input, s);
      m.Link(input, d1);
      m.Link(input, d3);

      m.Link(t, d1);
      m.Link(t, d3);
      m.Link(t, outflow1);
      m.Link(t, s);


      // set up delay3 stocks
      let s1 = m.Stock({
        name: "s1",
        initial: "[in] * [t] / 3"
      });
      let s2 = m.Stock({
        name: "s2",
        initial: "[in] * [t] / 3"
      });
      let s3 = m.Stock({
        name: "s3",
        initial: "[in] * [t] / 3"
      });
      let inflow3 = m.Flow(null, s1, {
        rate: "[in]"
      });
      let flow1 = m.Flow(s1, s2, {
        rate: "[s1] / ([t] / 3)"
      });
      let flow2 = m.Flow(s2, s3, {
        rate: "[s2] / ([t] / 3)"
      });
      let outflow3 = m.Flow(s3, null, {
        rate: "[s3] / ([t] / 3)"
      });


      m.Link(input, inflow3);
      m.Link(input, s1);
      m.Link(input, s2);
      m.Link(input, s3);
      m.Link(t, s1);
      m.Link(t, s2);
      m.Link(t, s3);
      m.Link(t, flow1);
      m.Link(t, flow2);
      m.Link(t, outflow3);

      res = m.simulate();

      // stock and delay1 match
      expect(res.value(outflow1).toPrecision(8)).toBe(res.value(d1).toPrecision(8));

      // stock and delay3 match
      expect(res.value(outflow3).toPrecision(8)).toBe(res.value(d3).toPrecision(8));



      // extra check for numerical issues

      let f = m.Flow(null, null, {
        name: "Flow"
      });
      f.rate = "[d3] + 1";
      m.Link(d3, f);
      let step = 0.01;
      m.timeStep = step;
      m.timeLength = step * 20;

      expect(() => m.simulate()).not.toThrow(); // no error
    });


    test("Smooth and unitless", () => {
      let m = new Model({ algorithm });
      m.globals = "setRandSeed(100)";

      let f = m.Flow(null, null, {
        name: "flow",
        rate: "1"
      });

      let v = m.Variable({
        value: "randnormal(smooth([flow], 10), 1)" // can't accept units
      });

      m.Link(f, v);

      let res = m.simulate();
      expect(res.value(v)).toBeGreaterThan(-100);
    });


    test("Rand with seed", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "RandParam"
      });
      let p2 = m.Variable({
        name: "HalfRand"
      });
      let s = m.Stock({
        name: "HalfRand"
      });
      m.Link(p, p2);
      m.Link(p, s);
      p.value = "Rand";
      p2.value = "[RandParam]/2";
      s.initial = "[RandParam]/4";

      let res = m.simulate();
      expect(Math.round(res.value(p) * 10000)).toBe(Math.round(res.value(p2) * 2 * 10000));
      if (algorithm === "Euler") {
        expect(Math.round(res.series(p)[0] * 10000)).toBe(Math.round(res.series(s)[0] * 4 * 10000));
      }


      res = m.simulate();
      let r1 = res.value(p);
      res = m.simulate();
      expect(res.value(p)).not.toBe(r1);

      m.globals = "SetRandSeed(1)";
      res = m.simulate();
      r1 = res.value(p);

      res = m.simulate();
      expect(res.value(p)).toBe(r1);

      res = m.simulate();
      expect(res.value(p)).toBe(r1);

      m.globals = "SetRandSeed(3)";
      res = m.simulate();
      expect(res.value(p2)).not.toBe(r1);
    });


    test("Rand with negative simulation start", () => {
      let m = new Model({ algorithm });
      m.timeStart = -10;
      m.timeLength = 20;

      let p = m.Variable({
        name: "RandParam"
      });
      p.value = "Rand";

      expect(() => m.simulate()).not.toThrow(); // no error
    });


    test("Simulation time units", () => {
      let m = new Model({ algorithm });
      m.timeUnits = "Seconds";
      m.timeLength = 5;

      let x = m.Variable({
        name: "x",
        value: 1,
        units: "Minutes"
      });

      let a = m.Action({
        name: "s",
        trigger: "Timeout",
        value: "[x]",
      });

      m.Link(x, a);

      let res = m.simulate();
      let times = res.times();
      expect(times).toEqual([0, 1, 2, 3, 4, 5]);
    });


    test("Misc Function using tagged time units", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "x"
      });
      let p2 = m.Variable({
        name: "y"
      });
      m.Link(p, p2);
      p.value = "Years";
      p2.value = "Delay([x], {3 Years} )";

      let res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round(3 * 10000));

      p2.value = "Delay([x], {x: {3 years}, y: {5 years}} ).x";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round(3 * 10000));

      p2.value = "Delay([x], {x: 2, y: 4} ).y";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round(2 * 10000));


      let p3 = m.Variable({
        name: "z"
      });
      p3.value = "{x: 2, y: 4}";
      m.Link(p3, p2);
      p2.value = "Delay([x], [z]).y";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round(2 * 10000));

      p2.value = "Delay([x], {x: -1, y: 4} ).y"; // Can't have negative delay
      expect(() => m.simulate()).toThrow();


      p2.value = "[x].Delay({3 Years})";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round(3 * 10000));

      p2.value = "Delay([x], {48 Months})";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round(2 * 10000));

      p2.value = "PastMean([x], {48 Months})";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round((6 + 5 + 4 + 3 + 2) / 5 * 10000));

      p2.value = "Mean(PastValues([x], {48 Months}))";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round((6 + 5 + 4 + 3 + 2) / 5 * 10000));

      p2.value = "PastMean([x], {3 Years})";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(Math.round((6 + 5 + 4 + 3) / 4 * 10000));


      // perfectly correlated
      p2.value = "PastCorrelation([x], [x])";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(10000);

      p2.value = "[x].PastCorrelation([x])";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(10000);

      p2.value = "PastCorrelation([x], [x], {3 Years})";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(10000);


      m.Link(p, p3);
      p3.value = "-[x]";

      // negatively correlated
      p2.value = "PastCorrelation([x], [z])";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(-10000);


      p2.value = "PastCorrelation([x], [z], {3 Years})";
      res = m.simulate();
      expect(Math.round(res.series(p2)[6] * 10000)).toBe(-10000);


      // changing correlation over time

      m.Link(p, p3);
      p3.value = "IfThenElse([x] <= 6, [x], -[x]) ";

      p2.value = "PastCorrelation([x], [z])";
      res = m.simulate();
      let corrAll = res.series(p2)[10];


      p2.value = "PastCorrelation([x], [z], {3 Years})";
      res = m.simulate();
      let corr3 = res.series(p2)[10];

      expect(corrAll).toBeGreaterThan(corr3);
    });

    


    test("Delay with unnamed vector", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "x"
      });
      let p2 = m.Variable({
        name: "y"
      });
      m.Link(p, p2);
      p.value = "{1,4,9}";
      p2.value = "Delay([x], {3 Years}, {0, 0, 0})";


      let res = m.simulate();
      expect(res.series(p2)[1]).toEqual([0,0,0]);
      expect(res.series(p2)[5]).toEqual([1,4,9]);
    });


    test("Delays with named and vector", () => {
      let m = new Model({ algorithm });


      let p = m.Variable({
        name: "x"
      });
      let p2 = m.Variable({
        name: "y"
      });
      m.Link(p, p2);
      p.value = "{a: years, b: years}";
      p2.value = "Delay([x], {a: 2, b: 5})";


      let res = m.simulate();
      expect(res.series(p2)[1]).toEqual({a: 0, b: 0});
      expect(res.series(p2)[9]).toEqual({a: 7, b: 4});

      p2.value = "Delay([x], {a: 2, b: 5}, {a: 1.5, b: 3.5})";
      res = m.simulate();
      expect(res.series(p2)[1]).toEqual({a: 1.5, b: 3.5});
      expect(res.series(p2)[9]).toEqual({a: 7, b: 4});

      p2.value = "Delay([x], {a: 2, b: 5}, {c: 1.5, b: 3.5})";
      expect(() => m.simulate()).toThrow(/Vector keys do not match/);

      p2.value = "Delay([x], {a: 2, c: 5})";
      expect(() => m.simulate()).toThrow(/Vector keys do not match/);

      p2.value = "Delay([x], {1, 2})";
      expect(() => m.simulate()).toThrow(/does not accepted non-named vectors/);


      p2.value = "Delay1([x], {a: 3, b: 6})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeGreaterThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);

      p2.value = "Delay1([x], {a: 2, b: 5}, {c: 1.5, b: 3.5})";
      expect(() => m.simulate()).toThrow(/Keys do not match for vector operation/);

      p2.value = "Delay1([x], {a: 2, c: 5})";
      expect(() => m.simulate()).toThrow(/Keys do not match for vector operation/);

      p2.value = "Delay1([x], {1, 2})";
      expect(() => m.simulate()).toThrow(/does not accepted non-named vectors/);

      p2.value = "Delay1([x], {a: -3, b: 6})";
      expect(() => m.simulate()).toThrow(/must be greater than/);
      

      p2.value = "Delay1([x], {a: 3, b: 6}, {a: -1, b: -1})";
      res = m.simulate();
      expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);

      p2.value = "Delay1([x], {a: 3, b: 6}, {a: 2, b: 2})";
      res = m.simulate();
      expect(res.series(p2)[1].a).toBeLessThan(res.series(p2)[1].b);
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);


      p2.value = "Delay3([x], {a: 3, b: 6})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeGreaterThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);
      
      p2.value = "Delay3([x], {a: 3, b: 6}, {a: -1, b: -1})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeGreaterThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);

      p2.value = "Delay3([x], {a: 3, b: 6}, {a: 2, b: 2})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeLessThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeLessThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);


      p2.value = "Smooth([x], {a: 3, b: 6})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeGreaterThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);


      p2.value = "Smooth([x], {a: 2, b: 5}, {c: 1.5, b: 3.5})";
      expect(() => m.simulate()).toThrow(/Keys do not match for vector operation/);

      p2.value = "Smooth([x], {a: 2, c: 5})";
      expect(() => m.simulate()).toThrow(/Keys do not match for vector operation/);

      p2.value = "Smooth([x], {1, 2})";
      expect(() => m.simulate()).toThrow(/does not accepted non-named vectors/);

      p2.value = "Smooth([x], {a: 3, b: -6})";
      expect(() => m.simulate()).toThrow(/must be greater than/);


      p2.value = "Smooth([x], {a: 3, b: 6}, {a: -1, b: -1})";
      res = m.simulate();
      expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);

      p2.value = "Smooth([x], {a: 3, b: 6}, {a: 2, b: 2})";
      res = m.simulate();
      expect(res.series(p2)[1].a).toBeLessThan(res.series(p2)[1].b);
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);


      p2.value = "SmoothN([x], {a: 3, b: 6}, 3, {a: -1, b: -1})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeGreaterThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeGreaterThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);

      p2.value = "SmoothN([x], {a: 3, b: 6}, 3, {a: 2, b: 2})";
      res = m.simulate();
      if (algorithm === "Euler") {
        expect(res.series(p2)[1].a).toBeLessThanOrEqual(res.series(p2)[1].b);
      } else {
        expect(res.series(p2)[1].a).toBeLessThan(res.series(p2)[1].b);
      }
      expect(res.series(p2)[9].a).toBeGreaterThan(res.series(p2)[9].b);
    });


    test("Simulation precision", () => {
      let m = new Model({ algorithm });
      m.timeStep = 0.0625;
      m.timeLength = 1;
      m.timeUnits = "Months";

      let s = m.Stock({
        name: "x",
        initial: 100,
        units: "things"
      });

      let v = m.Variable({
        name: "v",
        value: "[x] = {0 things}",
      });

      let f = m.Flow(s, null, {
        rate: 100,
        units: "things/months"
      });

      m.Link(s, v);

      let res = m.simulate();
      expect(res.series(v)[0]).toEqual(0);
      expect(res.series(v)[1]).toEqual(0);
      expect(res.series(v)[2]).toEqual(0);
      expect(res.series(v)[3]).toEqual(0);
      expect(res.series(v)[4]).toEqual(0);
      expect(res.series(v)[5]).toEqual(0);
      expect(res.series(v)[res.series(v).length - 2]).toEqual(0);
      expect(res.series(v)[res.series(v).length - 1]).toEqual(1);

      f.units = "things/month";

      res = m.simulate();
      expect(res.series(v)[0]).toEqual(0);
      expect(res.series(v)[1]).toEqual(0);
      expect(res.series(v)[2]).toEqual(0);
      expect(res.series(v)[3]).toEqual(0);
      expect(res.series(v)[4]).toEqual(0);
      expect(res.series(v)[5]).toEqual(0);
      expect(res.series(v)[res.series(v).length - 2]).toEqual(0);
      expect(res.series(v)[res.series(v).length - 1]).toEqual(1);
    });


    test("Units and Variables", () => {
      let m = new Model({ algorithm });
      m.timeLength = 100;


      let p1 = m.Variable({
        name: "x1"
      });
      let p2 = m.Variable({
        name: "x2"
      });
      let p3 = m.Variable({
        name: "y"
      });
      m.Link(p1, p3);
      m.Link(p2, p3);

      p1.units = "Centimeters";
      p2.units = "Meters^2";
      p3.units = "Meters^3";
      p1.value = "200";
      p2.value = "3";
      p3.value = "[x1]*[x2]";
      let res = m.simulate();

      expect(res.series(p3)[50]).toBe(6);
      p1.units = "Seconds";
      expect(() => m.simulate()).toThrow();
    });


    test("Assigned units", () => {
      let m = new Model({ algorithm });
      m.timeLength = 100;


      let p1 = m.Variable({
        name: "x1"
      });
      let p2 = m.Variable({
        name: "x2"
      });
      m.Link(p1, p2);

      p1.units = "Days";
      p2.units = "Days";
      p1.value = "Days()";
      p2.value = "round([x1])";
      let res = m.simulate();

      expect(res.series(p2)[50]).toBe(res.series(p1)[50]);
    });


    test("Assigned units and flows/stocks", () => {
      let m = new Model({ algorithm });
      m.timeLength = 100;


      let y = m.Variable({
        name: "y",
        units: "meters",
        value: "round([x])"
      });
      let x = m.Stock({
        name: "x",
        units: "meters"
      });
      m.Link(x, y);
      m.Flow(null, x, {
        rate: "{1 miles/years}",
        units: "miles/years"
      });

      let res = m.simulate();

      expect(Math.round(res.series(x)[50])).toBe(res.series(y)[50]);
    });


    test("Deepunitless to unitless conversion", () => {
      let m = new Model({ algorithm });
      m.timeLength = 100;


      let p1 = m.Variable({
        name: "x1"
      });

      p1.units = "Unitless";
      p1.value = "{3 years/months}";
      let res = m.simulate();

      expect(res.series(p1)[50]).toBe(36);
    });

    
    test("Smoothing and units", () => {
      let m = new Model({ algorithm });

      let y1 = m.Variable({
        name: "y1"
      });
      let y2 = m.Variable({
        name: "y2"
      });
      let x = m.Variable({
        name: "x"
      });
      m.Link(x, y1);
      m.Link(x, y2);

      y2.units = "Centimeters";
      x.value = "years";
      y1.value = "delay([x], 3)";
      y2.value = "delay([x], 5)";
      let res = m.simulate();
      expect(res.series(y1)[10]).toBe(7);
      expect(res.series(y2)[10]).toBe(5);
      expect(res.series(x)[10]).toBe(10);

      y1.value = "delay1([x], 10)";
      y2.value = "delay1([x], 10)";
      expect(() => m.simulate()).not.toThrow(); // no error

      y1.value = "delay3([x], 10)";
      y2.value = "delay3([x], 10)";
      expect(() => m.simulate()).not.toThrow(); // no error

      y1.value = "smooth([x], 10)";
      y2.value = "smooth([x], 10)";
      expect(() => m.simulate()).not.toThrow(); // no error


      m = new Model({ algorithm });

      x = m.Variable({
        name: "x",
        value: "1/(years * 2 + 1)",
        units: "people"
      });

      let y = m.Variable({
        name: "y",
        value: "Delay3([x], 10)",
        units: "people"
      });
      m.Link(x, y);

      expect(() => m.simulate()).not.toThrow(); // no error


      y.value="Delay1([x], {10 years})";
      expect(() => m.simulate()).not.toThrow(); // no error

      y.value="Delay3([x], {10 years})";
      expect(() => m.simulate()).not.toThrow(); // no error

      x.units = "years";
      y.units = "years";
      y.value="Delay1([x], {10 years})";
      expect(() => m.simulate()).not.toThrow(); // no error

      y.value="Delay1([x], {10 years}, {1 year})";
      expect(() => m.simulate()).not.toThrow(); // no error


      y.value="Delay3([x], {10 years})";
      expect(() => m.simulate()).not.toThrow(); // no error


      y.value="Delay3([x], {10 years}, {1 year})";
      expect(() => m.simulate()).not.toThrow(); // no error


      y.value="Smooth([x], {10 years}, {1 year})";
      expect(() => m.simulate()).not.toThrow(); // no error
    });


    test("Unit errors", () => {
      let m = new Model({ algorithm });


      let p1 = m.Variable({
        name: "x"
      });
      let p2 = m.Variable({
        name: "y"
      });

      m.Link(p1, p2);

      p1.value = "{36 Meters}";
      p2.value = "1";

      p2.units = "Qubits";

      expect(() => m.simulate()).toThrow();

      p1.units = "Meters";
      expect(() => m.simulate()).not.toThrow(); // no error

      p2.value = "[x]";
      expect(() => m.simulate()).toThrow();
    });


    test("Stop()", () => {
      let m = new Model({
        timeLength: 10
      });

      let v = m.Variable({
        value: "years()"
      });

      let s = m.Variable({
        value: "1"
      });

      let v0 = m.simulate().series(v);

      s.value = "ifthenelse(years > 5, stop(), 1)";

      let v1 = m.simulate().series(v);

      s.value = "ifthenelse(true, stop(), 1)";

      let v2 = m.simulate().series(v);

      expect(v0).toHaveLength(11);
      expect(v1).toHaveLength(6);
      expect(v2).toHaveLength(0);
    });


    test("Stop() during initialization", () => {
      let m = new Model({
        timeLength: 10
      });

      m.Stock({
        initial: "stop()"
      });

      expect(() => m.simulate()).toThrow(/stop\(\) called/);
    });


    test("Stop() during globals", () => {
      let m = new Model({
        timeLength: 10
      });

      m.globals = "stop()";

      m.Stock({
        initial: "1"
      });

      expect(() => m.simulate()).toThrow(/stop\(\) called/);
    });


    test("Assert()", () => {
      let m = new Model({
        timeLength: 10
      });

      let v = m.Variable({
        value: "assert(2 > 1) \n 1"
      });
      expect(() => m.simulate()).not.toThrow();

      v.value = "assert(2 > 1, 'oops') \n 1";
      expect(() => m.simulate()).not.toThrow();


      v.value = "assert(1 > 2, 'oops') \n 1";
      expect(() => m.simulate()).toThrow(/oops/);


      v.value = "assert(1 > 2) \n 1";
      expect(() => m.simulate()).toThrow(/Assert/);
    });
  });


test("Flow scaling", () => {
  let m = new Model({ algorithm: "Euler" });


  m.timeLength = 100;

  let p = m.Variable({
    name: "My Variable"
  });
  let f = m.Flow(null, null, {
    name: "My Flow"
  });
  m.Link(f, p, {
    name: "link"
  });

  f.units = "euros/seconds";
  p.units = "euros";

  f.rate = "years*{1 euros/seconds}";
  p.value = "[My Flow]*{1 seconds}";
  let res = m.simulate();
  expect(res.series(p)[20]).toBe(20);
  f.units = "euros/years";
  res = m.simulate();
  expect(res.series(p)[20]).toBe(20);

  f.units = "euros per years";
  res = m.simulate();
  expect(res.series(p)[20]).toBe(20);

  f.rate = "years";
  p.units = "euros/years";
  p.value = "[My Flow]";
  res = m.simulate();
  expect(res.series(p)[20]).toBe(20);


  m = new Model({ algorithm: "Euler" });

  p = m.Variable({
    name: "My Variable"
  });
  f = m.Flow(null, null, {
    name: "My Flow"
  });
  m.Link(f, p, {
    name: "link"
  });

  f.units = "";
  p.units = "";


  f.nonNegative = false;

  f.rate = "10-years";
  p.value = "[My Flow]";
  res = m.simulate();
  expect(res.series(p)[20]).toBe(-10);
});
