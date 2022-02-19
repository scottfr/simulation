export class SimulationError extends Error {
  /**
   * @param {string} message
   * @param {{ primitive?: any, code: number }} config
   */
  constructor(message, config) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SimulationError);
    }

    this.name = "SimulationError";

    this.primitive = config.primitive;
    this.code = config.code;

    // Don't print these on the console
    Object.defineProperty(this, "code", { enumerable: false });
    Object.defineProperty(this, "primitive", { enumerable: false });
  }

}
