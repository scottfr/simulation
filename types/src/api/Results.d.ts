export class Results {
    /**
     * @param {import("../Simulator").ResultsType} data
     * @param {Object<string, string>} nameIdMapping
     */
    constructor(data: import("../Simulator").ResultsType, nameIdMapping: {
        [x: string]: string;
    });
    _data: import("../Simulator").ResultsType;
    _nameIdMapping: {
        [x: string]: string;
    };
    timeUnits: string | undefined;
    times(): number[];
    /**
     * @param {import("./Blocks").Primitive[]=} primitives
     */
    table(primitives?: import("./Blocks").Primitive[] | undefined): {
        _time: number;
    }[];
    /**
     * @param {import("./Blocks").Primitive} primitive
     */
    series(primitive: import("./Blocks").Primitive): any;
    /**
     * @param {import("./Blocks").Primitive} primitive
     * @param {number=} time - if omitted, the last available value
     */
    value(primitive: import("./Blocks").Primitive, time?: number | undefined): any;
}
