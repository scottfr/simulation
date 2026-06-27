/** @typedef {import("../SharedTypes.js").GraphNode} GraphNode */
export class ModelError extends Error {
    /**
     * @param {string} message
     * @param {{ source?: string, primitive?: import('../api/Blocks.js').Primitive|import('../Primitives').SPrimitive|GraphNode, showEditor?: boolean, line?: number, details?: string, code: number }} config
     */
    constructor(message: string, config: {
        source?: string;
        primitive?: import("../api/Blocks.js").Primitive | import("../Primitives").SPrimitive | GraphNode;
        showEditor?: boolean;
        line?: number;
        details?: string;
        code: number;
    });
    primitive: any;
    showEditor: boolean | undefined;
    source: string | undefined;
    line: number | undefined;
    details: string | undefined;
    code: number;
}
export type GraphNode = import("../SharedTypes.js").GraphNode;
