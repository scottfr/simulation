import antlr from "../../vendor/antlr4-all.js";
import FormulaLexer from "./grammar/FormulaLexer.js";
import FormulaParser from "./grammar/FormulaParser.js";


export function isValidSyntax(input) {
  let error = /** @type {any} */ (null);

  const chars = new antlr.InputStream(input);
  const lexer = new FormulaLexer(chars);

  lexer.removeErrorListeners();
  lexer.addErrorListener({
    syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
      error = {
        line,
        column
      };
    }
  });
  const tokens = new antlr.CommonTokenStream(lexer);
  const parser = new FormulaParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
      error = {
        line,
        column
      };
    },
    reportAttemptingFullContext: (...args) => {
      // console.log("reportAttemptingFullContext", args);
    },
    reportAmbiguity: (...args) => {
      // console.log("reportAmbiguity", args);
    },
    reportContextSensitivity: (...args) => {
      // console.log("reportContextSensitivity", args);
    }
  });

  try {
    if (!error) {
      parser.lines();
    }
   
    if (error) {
      return {
        error: true,
        line: error.line,
        char: error.column,
        token: error.token
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