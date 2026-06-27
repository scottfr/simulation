export class SimulationError extends Error {
    /**
     * @param {string} message
     * @param {{ source?: string, primitive?: any, line?: number, code: number }} config
     */
    constructor(message: string, config: {
        source?: string;
        primitive?: any;
        line?: number;
        code: number;
    });
    source: string | undefined;
    primitive: any;
    line: number | undefined;
    code: number;
}
