import { Model } from "../../src/api/Model.js";
import { UnitManager } from "../../src/formula/Units.js";


test("unit functions", () => {
  let m = new Model();
  let p1 = m.Variable({
    name: "p1"
  });
  let p2 = m.Variable({
    name: "p2"
  });
  let p3 = m.Variable({
    name: "p3"
  });
  let p4 = m.Variable({
    name: "p4"
  });
  let p5 = m.Variable({
    name: "p5"
  });
  let p6 = m.Variable({
    name: "p6"
  });
  let p7 = m.Variable({
    name: "p7"
  });
  p1.value = "Years";
  p2.value = "Months";
  p3.value = "Weeks";
  p4.value = "Days";
  p5.value = "Hours";
  p6.value = "Minutes";
  p7.value = "Seconds";

  let res = m.simulate();
  expect(res.series(p1)[3]).toBe(3);
  expect(res.series(p2)[3]).toBe(3 * 12);
  expect(Math.floor(res.series(p3)[3])).toBe(3 * 52);
  expect(res.series(p4)[3]).toBe(3 * 365);
  expect(res.series(p5)[3]).toBe(3 * 365 * 24);
  expect(res.series(p6)[3]).toBe(3 * 365 * 24 * 60);
  expect(res.series(p7)[3]).toBe(3 * 365 * 24 * 60 * 60);

  p1.value = "Years(time*2)";
  p2.value = "Months(time*2)";
  p3.value = "Weeks(time*2)";
  p4.value = "Days(time*2)";
  p5.value = "Hours(time*2)";
  p6.value = "Minutes(time*2)";
  p7.value = "Seconds(time*2)";
  res = m.simulate();
  expect(res.series(p1)[3]).toBe(2 * 3);
  expect(res.series(p2)[3]).toBe(2 * 3 * 12);
  expect(Math.floor(res.series(p3)[3])).toBe(2 * 3 * 52);
  expect(res.series(p4)[3]).toBe(2 * 3 * 365);
  expect(res.series(p5)[3]).toBe(2 * 3 * 365 * 24);
  expect(res.series(p6)[3]).toBe(2 * 3 * 365 * 24 * 60);
  expect(res.series(p7)[3]).toBe(2 * 3 * 365 * 24 * 60 * 60);

  p1.value = "unitless(TimeStart)";
  p2.value = "unitless(TimeLength)";
  p3.value = "unitless(TimeStep)";
  p4.value = "unitless(TimeEnd)";

  res = m.simulate();
  expect(res.series(p1)[3]).toBe(m.timeStart);
  expect(res.series(p2)[3]).toBe(m.timeLength);
  expect(res.series(p3)[3]).toBe(m.timeStep);
  expect(res.series(p4)[3]).toBe(m.timeStart + m.timeLength);
});


test("Unit manager", () => {
  let manager = new UnitManager();

  let mol = manager.unitsFromString("Molecules");
  mol.addBase();
  expect(mol.toBase).toBe(1/6.02214076e23);

  manager = new UnitManager();
  mol = manager.unitsFromString("Molecule");
  mol.addBase();
  expect(mol.toBase).toBe(1/6.02214076e23);


  manager = new UnitManager();
  let yr = manager.unitsFromString("Years");
  yr.addBase();
  expect(yr.toBase).toBe(31536000);
  mol = manager.unitsFromString("Molecules");
  mol.addBase();
  expect(mol.toBase).toBe(1/6.02214076e23);
});