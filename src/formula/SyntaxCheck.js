import { org } from "../../vendor/antlr3-all.js";
import { FormulaLexer } from "./grammar/FormulaLexer.js";
import { FormulaParser } from "./grammar/FormulaParser.js";


export function isValidSyntax(input) {
  let cstream = new org.antlr.runtime.ANTLRStringStream(input);
  let lexer = new FormulaLexer(cstream);
  let tstream = new org.antlr.runtime.CommonTokenStream(lexer);
  let parser = new FormulaParser(tstream);
  
  try {
    // @ts-ignore
    parser.lines();

    // @ts-ignore
    let errorIndex = parser.state.lastErrorIndex;
    if (errorIndex > -1) {
    // @ts-ignore
      let token = parser.input.tokens[errorIndex];
      return {
        error: true,
        token: token ? {
          start: token.start,
          stop: token.stop + 1
        } : null
      };
    }
  } catch (_err) {
    // Can throw an exception with: "Invalid equation syntax"
    console.warn(_err);
    return {
      error: true,
      token: null
    };
  }

  return {
    error: false
  };
}