import { Model } from "../../src/api/Model.js";
import { ModelError } from "../../src/formula/ModelError.js";



describe.each([
  ["Euler"], ["RK4"]
])("Simulation async %s",
  
  /**
   * @param {"Euler"|"RK4"} algorithm
   */
  (algorithm) => {
  
    test("General", async () => {
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
  
      let res = await m.simulateAsync();
      let times = res.times();
      expect(times.length).toBe(11);
      expect(times[0]).toBe(0);
      expect(times[10]).toBe(10);
      expect(res.series(s)[0]).toBe(100);
        
      expect(res.timeUnits).toBe("years");

    });


    test("Error", () => {
      let m = new Model({ algorithm });
    
      m.timeUnits = "Years";
      m.timeStep = 1;
      m.timeStart = 0;
      m.timeLength = 10;
    
      let s = m.Stock({
        name: "My Stock",
        initial: "1 + true"
      });
    
      expect(m.simulateAsync()).rejects.toEqual({
        error: "Cannot convert Booleans to Numbers.",
        errorCode: 1089,
        errorPrimitiveName: s.name,
        errorPrimitiveId: s.id
      });
        
    });

    test("Pause with setValue", async () => {
      let m = new Model({ algorithm });
  
      m.timeUnits = "Years";
      m.timeStep = 1;
      m.timeStart = 0;
      m.timeLength = 10;
    
      let v = m.Variable({
        name: "My var",
        value: "100"
      });
    
      let val = 100;
      let steps = 0;

      let res = await m.simulateAsync({
        onStep: (items) => {
          val = val + 1;
          items.setValue(v, val);
          steps++;
        }
      });

      let times = res.times();
      expect(times.length).toBe(11);
      expect(steps).toBe(11);
      expect(times[0]).toBe(0);
      expect(times[10]).toBe(10);
      expect(res.series(v)[0]).toBe(100);
      expect(res.series(v).at(-1)).toBe(110);
      
      expect(res.timeUnits).toBe("years");
    });


    test("Pause with setValue 2", async () => {
      let m = new Model({ algorithm });
    
      m.timeUnits = "Years";
      m.timeStep = 1;
      m.timeStart = 0;
      m.timeLength = 10;

      let v = m.Variable({
        name: "Val",
        value: "0"
      });
      
      let a = m.Action({
        name: "Increaser",
        trigger: "Condition",
        action: "[Stock] <- [Stock] + [Val]",
        value: "[Val]"
      });

      m.Link(v, a);

      let s = m.Stock({
        name: "Stock",
        initial: "0"
      });

      m.Link(s, a);
      
  
      let res = await m.simulateAsync({
        onStep: (items) => {
          if (items.time === 3) {
            items.setValue(v, 1);
          } else if (items.time === 6) {
            items.setValue(v, 0);
          }
        }
      });

      expect(res.series(s)[0]).toBe(0);
      expect(res.series(s)[1]).toBe(0);

      expect(res.series(s).at(-2)).toBe(3);
      expect(res.series(s).at(-1)).toBe(3);

    });

    test("Pause with invalid setValue rejects", async () => {
      let m = new Model({ algorithm });
  
      m.timeUnits = "Years";
      m.timeStep = 1;
      m.timeStart = 0;
      m.timeLength = 10;
    
      let v = m.Variable({
        name: "My var",
        value: "100"
      });

      // Delete the variable so it's not in the model
      v.delete();
    
      let val = 100;

      await expect(m.simulateAsync({
        onStep: (items) => {
          val = val + 1;
          items.setValue(v, val);
        }
      })).rejects.toEqual(new ModelError("Could not find the primitive to update with setValue().", { code: 8002 }));
    });

  });