import { Agent, Folder } from "../../src/api/Blocks.js";
import { Model } from "../../src/api/Model.js";


test("Folders", () => {
  let m = new Model();

  let s = m.Stock();
  let f = m.Folder();

  expect(s.parent).toBeNull();
  s.parent = f;
  expect(s.parent.id).toBe(f.id);

  s.parent = null;
  expect(s.parent).toBeNull();

  expect(f instanceof Folder).toBe(true);


  let a = m.Agent();
  expect(a instanceof Agent).toBe(true);

  a.agentParent = "abc";
  expect(a.agentParent).toBe("abc");
});