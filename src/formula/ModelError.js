export class ModelError extends Error {
  /**
   * @param {string} message
   * @param {{ primitive?: import('../api/Blocks.js').Primitive|import('../Primitives').SPrimitive|GraphNode, showEditor?: boolean, line?: number, details?: string, code: number}} config
   */
  constructor(message, config) {
    super(message);
    this.name = "ModelError";
    this.primitive = config.primitive;
    this.showEditor = config.showEditor;
    this.line = config.line;
    this.details = config.details;
    this.code = config.code;
  }
}