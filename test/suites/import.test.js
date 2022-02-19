import { loadInsightMaker } from "../../src/api/Model.js";


test("Extra node with id", () => {
  let m = loadInsightMaker(`<InsightMakerModel>
    <root>
      <info id="0">
        <mxCell />
      </info>
      <mxCell id="1" parent="0" />
      <Setting Note="" Version="36" TimeLength="40" TimeStart="1" TimeStep="1" TimeUnits="Quarters" Units="" SolutionAlgorithm="RK1" BackgroundColor="white" Throttle="-1" Macros="" SensitivityPrimitives="" SensitivityRuns="50" SensitivityBounds="50, 80, 95, 100" SensitivityShowRuns="false" StyleSheet="{}" id="2">
      <mxCell parent="1" vertex="1" visible="0">
        <mxGeometry x="20" y="20" width="80" height="40" as="geometry" />
      </mxCell>
    </Setting>
    </root>
  </InsightMakerModel>
  `);

  m.simulate(); // no error
});