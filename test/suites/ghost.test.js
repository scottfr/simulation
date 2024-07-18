import { Model, loadInsightMaker } from "../../src/api/Model.js";


describe("ghost %s",

  /**
   * @param {"Euler"|"RK4"} algorithm
   */
  (algorithm) => {

    test("Ghost", () => {
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

      let c = m.Converter()

      let gs = m.Ghost({source: s})
      let gf = m.Ghost({source: f})
      let gc = m.Ghost({source: c})
      expect(gs.source == s).toBe(true)
      expect(gf.source == f).toBe(true)
      expect(gc.source == c).toBe(true)
    });

    test("From file", () => {
      let m = loadInsightMaker(`<InsightMakerModel>
        <root>
          <mxCell id="0"/>
          <mxCell id="1" parent="0"/>
          <Ghost Color="black" Source="44" id="45" name="Stock1" RotateName="0" DefinitionError="{}">
            <mxCell parent="1" vertex="1" style="stock;opacity=30;">
              <mxGeometry x="305" y="64" width="80" height="60" as="geometry"/>
            </mxCell>
          </Ghost>
          <Stock name="Stock1" Note="" InitialValue="" StockMode="Store" Delay="10" Volume="100" NonNegative="false" Units="Unitless" MaxConstraintUsed="false" MinConstraintUsed="false" MaxConstraint="100" MinConstraint="0" ShowSlider="false" SliderMax="100" SliderMin="0" SliderStep="" Image="None" FlipHorizontal="false" FlipVertical="false" LabelPosition="Middle" Color="black" id="44" DefinitionError="{&quot;id&quot;:1}" RotateName="0">
            <mxCell parent="1" vertex="1" style="stock">
              <mxGeometry x="153" y="64" width="80" height="60" as="geometry"/>
            </mxCell>
          </Stock>
          <Setting Note="" Version="36" TimeLength="100" TimeStart="0" TimeStep="1" TimeUnits="Years" StrictUnits="true" Units="" HiddenUIGroups="Validation,User Interface" SolutionAlgorithm="RK1" BackgroundColor="white" Throttle="-1" Macros="" SensitivityPrimitives="" SensitivityRuns="50" SensitivityBounds="50, 80, 95, 100" SensitivityShowRuns="false" StyleSheet="{}" id="2" StrictLinks="true" StrictAgentResolution="true">
          <mxCell parent="1" vertex="1" visible="0" style="setting">
          <mxGeometry x="20" y="20" width="80" height="40" as="geometry"/>
          </mxCell>
          </Setting>
        </root>
      </InsightMakerModel>`);
      let stock = m.findStocks(s => s.id == "44")[0];
      let ghost = m.findGhosts(g => g.id == "45")[0];
      console.log("model", m, "stock", stock, "ghost", ghost);
      expect(stock == ghost.source).toBe(true);
    })
  });

