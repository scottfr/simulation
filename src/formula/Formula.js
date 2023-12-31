import { Material, unitAlert } from "./Material.js";
import { convertUnits } from "./Units.js";
import { SAgent, SPopulation, SPrimitive } from "../Primitives.js";
import { fn } from "../CalcMap.js";
import { stringify, selectFromMatrix, selectFromVector } from "./Utilities.js";
import { Vector } from "./Vector.js";
import { createFunctions as generalCreateFunctions } from "./CalcFunctions.js";
import { createFunctions as modelerCreateFunctions } from "../Functions.js";
import { ModelError } from "./ModelError.js";
import antlr from "../../vendor/antlr4-all.js";
import FormulaLexer from "./grammar/FormulaLexer.js";
import FormulaParser from "./grammar/FormulaParser.js";
import { toHTML } from "../Utilities.js";


/**
 * @param {import("../Simulator").Simulator} simulate
 */
export function bootCalc(simulate) {
  simulate.varBank = new Map();

  simulate.varBank.set("-parent", null);
  simulate.varBank.set("e", new Material(2.71828182845904523536));
  simulate.varBank.set("pi", new Material(3.14159265358979323846264338));
  simulate.varBank.set("phi", new Material(1.61803399));
  generalCreateFunctions(simulate);
  modelerCreateFunctions(simulate);
}

function getInnerBlock(node, parser, source) {
  let innerBlock = node.children.find(x => x instanceof FormulaParser.InnerBlockContext);
  if (!innerBlock || !innerBlock.children) {
    return new TreeNode("", "LINES", {
      line: node.start.line,
      source
    });
  }

  return convertToObject(innerBlock, parser, source);
}



class PrimitiveStore {
  /**
   * @param {any} primitive
   * @param {string} type
   */
  constructor(primitive, type) {
    this.primitive = primitive;
    this.type = type; // "value", "totalValue", "object"
  }
}

/**
 * @template {any} T
 * @param {T} x
 * @returns {T extends Vector ? Vector : (T extends Material ? Material : (T extends SPrimitive ? Material : any))}
 */
export function toNum(x) {
  if (x instanceof Material || x instanceof SPrimitive || x instanceof Vector || x instanceof UserFunction || x instanceof SPopulation) {
    return /** @type {any} */ (x.toNum());
  }

  if (x instanceof Function) {
    return x([]);
  }

  return /** @type {any} */ (x.valueOf());
}


export class UserFunction {
  constructor() {
    this.localScope = undefined;
    this.defaults = undefined;
    this.fn = undefined;
  }

  toNum() {
    return this.fn([]);
  }
}


export let StringObject = {};
export let VectorObject = {};





/**
 * @param {string} input 
 * @param {string} source 
 * @param {import("../Simulator").Simulator} simulate
 * @returns 
 */
export function createTree(input, source, simulate) {
  simulate.evaluatingPosition = {
    line: 1,
    source
  };

  const chars = new antlr.InputStream(input.replace(/\\n/g, "\n"));
  const lexer = new FormulaLexer(chars);
  lexer.removeErrorListeners();
  lexer.addErrorListener({
    syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
      simulate.evaluatingPosition.line = line;
      throw new ModelError("Invalid equation syntax", {
        code: 9000
      });
    }
  });
  const tokens = new antlr.CommonTokenStream(lexer);

  const parser = new FormulaParser(tokens);
  parser._interp.predictionMode = antlr.atn.PredictionMode.SLL; 
  parser.errorHandler = new antlr.error.BailErrorStrategy();

  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
      simulate.evaluatingPosition.line = line;
      throw new ModelError("Invalid equation syntax", {
        code: 9000
      });
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
  const parsedTree = parser.lines();
  removeWhitespaceTokens(parsedTree);
  let root = convertToObject(parsedTree, parser, source);

  return root;
}

function removeWhitespaceTokens(node) {
  if (node.children) {
    node.children = node.children.filter(x => {
      if (x.symbol?.type === FormulaLexer.R_ || x.symbol?.type === FormulaLexer.R__) {
        return false;
      }
      removeWhitespaceTokens(x);
      return true;
    });
  }
}


/**
 * @param {Object} root
 * @param {Map} nodeBase
 * @param {import("../Simulator").Simulator} simulate
 */
export function trimTree(root, nodeBase, simulate) {
  return trimNode(root, nodeBase, simulate);
}


/**
 * @param {Object} root
 * @param {Map} varBank
 * @param {import("../Simulator").Simulator} simulate
 */
export function evaluateTree(root, varBank, simulate) {
  simulate.evaluatingPosition = {
    line: null,
    source: null
  };
  try {
    return evaluateNode(root, varBank, simulate);
  } catch (err) {
    if (err.returnVal) {
      return err.data;
    } else {
      throw err;
    }
  }
}



export class TreeNode {
  /**
   * @param {string} text
   * @param {string} typeName
   * @param {{ line: number, source: string }} position
   * @param {any[]=} children
   */
  constructor(text, typeName, position, children = []) {
    this.origText = text;

    this.text = text.toLowerCase();

    this.typeName = typeName;

    this.position = position;

    this.children = children;

    /** @type {string} */
    this.functionFingerprint = null;

    /** @type {boolean} */
    this.delayEvalParams = null;
  }

  cloneStructure() {
    let res = new TreeNode(this.origText, this.typeName, this.position);
    res.children = this.children.map(child => {
      if (child instanceof TreeNode) {
        return child.cloneStructure();
      }
      console.error(this, child);
      throw new TypeError("Unknown structure clone type");
    });
    return res;
  }
}

/**
 * @param {Partial<import("antlr4").ParserRuleContext>} node 
 * @param {function(Partial<import("antlr4").ParserRuleContext>):TreeNode} fn 
 * @param {*} parser 
 * @param {string} source 
 * @returns 
 */
function flatChildrenToTreeRight(node, fn, parser, source) {
  let children = node.children.slice();
  let isFirst = true;
  while (children.length > 1) {
    let right = children.pop();
    let operator = children.pop();
    let left = children.pop();
    let current = fn(operator);
    current.children = [convertToObject(left, parser, source), isFirst ? convertToObject(right, parser, source) : right];
    // @ts-ignore
    children.push(current);
    isFirst = false;
  }
  return children[0];
}


/**
 * @param {Partial<import("antlr4").ParserRuleContext>} node 
 * @param {function(Partial<import("antlr4").ParserRuleContext>):TreeNode} fn 
 * @param {*} parser 
 * @param {string} source 
 * @returns 
 */
function flatChildrenToTreeLeft(node, fn, parser, source) {
  let children = node.children.slice();
  let isFirst = true;
  while (children.length > 1) {
    let left = children.shift();
    let operator = children.shift();
    let right = children.shift();
    let current = fn(operator);
    current.children = [isFirst ? convertToObject(left, parser, source) : left, convertToObject(right, parser, source) ];
    // @ts-ignore
    children.unshift(current);
    isFirst = false;
  }
  return children[0];
}


/* @type {WeakMap<Partial<import("antlr4").ParserRuleContext>, string>} */
let nodeTexts = new WeakMap();

/**
 * @param {Partial<import("antlr4").ParserRuleContext>} node 
 */
function getNodeText(node) {
  let t = nodeTexts.get(node);
  if (t !== undefined) {
    return t;
  
  }
  let text = node.getText();
  nodeTexts.set(node, text);
  return text;
}


/**
 * @param {Partial<import("antlr4").ParserRuleContext>} node 
 * @param {object} parser 
 * @param {string} source
 * @returns 
 */
function convertToObject(node, parser, source) {
  // @ts-ignore
  let ruleIndex = node.ruleIndex;
  if (ruleIndex === FormulaParser.RULE_lines) {
    let current = new TreeNode("", "LINES", {
      line: node.start.line,
      source
    });
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      // skip EOF symbol
      if (getNodeText(children[i]) === "<EOF>") {
        continue;
      }
      if (getNodeText(children[i]) === "\n" || getNodeText(children[i]) === "\r\n") {
        continue;
      }
      current.children.push(convertToObject(children[i], parser, source));

      if (!current.position?.line && current.children[current.children.length - 1].position?.line) {
        current.position = current.children[current.children.length - 1].position;
      }
    }
    
    return current;
  } else if (ruleIndex === FormulaParser.RULE_multiplicativeExpression) {
    if (node.children.length > 1) {
      // [left, '*'|'/'|'%'|'mod', right]
      return flatChildrenToTreeLeft(node, (op) => {
        let operator = getNodeText(op);
        return new TreeNode("", operator === "*" ? "MULT" : ( operator === "/" ? "DIV": "MOD"), {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }

  } else if (ruleIndex === FormulaParser.RULE_number) {
    let current = new TreeNode(getNodeText(node), "FLOAT", {
      line: node.start.line,
      source
    });
    return current;
  } else if (ruleIndex === FormulaParser.RULE_value) {
    let token = node.children[0];
    // convert token 

    // @ts-ignore
    let symbol = token.symbol;

    if (symbol) {
      if (symbol.type === FormulaLexer.BOOL) {
        return new TreeNode(getNodeText(token), getNodeText(token).toLowerCase() === "true" ? "TRUE" : "FALSE", {
          line: symbol.line,
          source
        });
      } else if (symbol.type === FormulaLexer.STRING) {
        return new TreeNode(getNodeText(token), "STRING", {
          line: symbol.line,
          source
        });
      } else if (symbol.type === FormulaLexer.IDENT) {
        return new TreeNode(getNodeText(token), "IDENT", {
          line: symbol.line,
          source
        });
      } else if (symbol.type === FormulaLexer.PRIMITIVE) {
        return new TreeNode(getNodeText(token), "PRIMITIVE", {
          line: node.start.line,
          source
        });
      }
    }
  //boolean lexer
  // @ts-ignore
  } else if (node.symbol?.type ===FormulaLexer.BOOL) {
    return new TreeNode("", getNodeText(node).toLowerCase() === "true" ? "TRUE" : "FALSE", {
      // @ts-ignore
      line: node.symbol.line,
      source
    });
  } else if (ruleIndex === FormulaParser.RULE_returnExp) {
    /**
     * returnExp
	   * :
	   * RETURNSTATEMENT^ logicalExpression
	   * ;
     */

    let current = new TreeNode("return", "RETURN", {
      line: node.start.line,
      source
    }, [convertToObject(node.children[1], parser, source)]);
    return current;
  } else if (ruleIndex === FormulaParser.RULE_throwExp) {
    /**
     * throwExp
	   * : THROWSTATEMENT primaryExpression -> ^(THROW primaryExpression)
	   * ;
     */
    let current = new TreeNode("", "THROW", {
      line: node.start.line,
      source
    }, [convertToObject(node.children[1], parser, source)]);
    return current;
  } else if (ruleIndex === FormulaParser.RULE_additiveExpression) {
    if (node.children.length > 1) {
      // [left, '+'|'-', right]
      return flatChildrenToTreeLeft(node, (op) => {
        let operator = getNodeText(op);
        return new TreeNode(getNodeText(op), operator === "+" ? "PLUS" : "MINUS", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_powerExpression) {
    if (node.children.length > 1) {
      // [left, '^', right]
      return flatChildrenToTreeRight(node, (op) => {
        return new TreeNode("", "POWER", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_unaryOrNegate) {
    if (node.children.length > 1) {
      let current = new TreeNode("", "NEGATE", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[1], parser, source)];
      return current;
    }
  } else if (ruleIndex === FormulaParser.RULE_arrayExpression) {
    if (node.children.length > 1) {
      // [left, ':', (step : ':',)? right]
      let current = new TreeNode("", "RANGE", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[0], parser, source), convertToObject(node.children[2], parser, source)];
      if (node.children.length > 3) {
        current.children.push(convertToObject(node.children[4], parser, source));
      }
      return current;
    }
  } else if (ruleIndex === FormulaParser.RULE_unaryExpression) {
    if (node.children.length > 1) {
      // ['!', right]
      let current = new TreeNode("", "NOT", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[1], parser, source)];
      return current;
    }
  } else if (ruleIndex === FormulaParser.RULE_booleanXORExpression) {
    if (node.children.length > 1) {
      // [left, 'XOR', right]
      return flatChildrenToTreeLeft(node, (op) => {
        return new TreeNode("", "XOR", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_equalityExpression) {
    if (node.children.length > 1) {
      // [left, '='|'=='|'<>'|'!=', right]
      return flatChildrenToTreeLeft(node, (op) => {
        let operator = getNodeText(op);
        return new TreeNode("", operator === "=" || operator === "==" ? "EQUALS" : "NOTEQUALS", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_relationalExpression) {
    if (node.children.length > 1) {
      // [left, '<'|'>'|'<='|'>=', right]
      return flatChildrenToTreeLeft(node, (op) => {
        let operator = getNodeText(op);
        return new TreeNode("", operator === "<" ? "LT" : (operator === ">" ? "GT" : (operator === "<=" ? "LTEQ" : "GTEQ")), {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_logicalExpression) {
    if (node.children.length > 1) {
      // [left, '||'|'OR', right]
      return flatChildrenToTreeLeft(node, (op) => {
        return new TreeNode("", "OR", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_booleanAndExpression) {
    if (node.children.length > 1) {
      // [left, '&&'|'AND', right]
      return flatChildrenToTreeLeft(node, (op) => {
        return new TreeNode("", "AND", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }
      , parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_negnumber) {
    /**
     * negnumber	: '-' number -> ^(NEGATE number);
     */

    return new TreeNode(getNodeText(node), "FLOAT", {
      line: node.start.line,
      source
    });
  } else if (ruleIndex === FormulaParser.RULE_negationExpression) {
    if (node.children.length > 1) {
      // ['-', right]
      let current = new TreeNode("", "NEGATE", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[1], parser, source)];
      return current;
    }
  // boolean lexer
  } else if (ruleIndex === FormulaParser.RULE_anonFunctionDef) {
    /**
     * anonFunctionDef
     * : FUNCTIONSTATEMENT  '(' (IDENT  (EQUALS  defaultValue | (',' IDENT )*) (',' IDENT EQUALS defaultValue )*)? ')' ( (NEWLINE+ innerBlock  ENDBLOCK FUNCTIONSTATEMENT) | expression) -> ^(ANONFUNCTION ^(PARAMS IDENT*) ^(DEFAULTS defaultValue*) innerBlock? expression?)
     * ;
     */
    let current = new TreeNode("", "ANONFUNCTION", {
      line: node.start.line,
      source
    });
    let params = new TreeNode("", "PARAMS", {
      line: node.start.line,
      source
    });
    let defaults = new TreeNode("", "DEFAULTS", {
      line: node.start.line,
      source
    });
    params.children = [];
    defaults.children = [];
    // set params and defaults
    for (let i = 2; i < node.children.length; i++) {
      if (getNodeText(node.children[i]) === ")") {
        break;
      }
      if (getNodeText(node.children[i]) === ",") {
        continue;
      }
      params.children.push(new TreeNode(getNodeText(node.children[i]), "IDENT", {
        line: node.start.line,
        source
      }));
      if (getNodeText(node.children[i + 1]) === "=") {
        defaults.children.push(convertToObject(node.children[i + 2], parser, source));
        i += 2;
      }
    }
    current.children = [params, defaults];
    if (node.children[node.children.length - 1] instanceof FormulaParser.ExpressionContext) {
      current.children.push(convertToObject(node.children[node.children.length - 1], parser, source));
    } else {
      current.children.push(getInnerBlock(node, parser, source));
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_functionDef) {
    /**
     functionDef
	: FUNCTIONSTATEMENT IDENT '(' (IDENT  (EQUALS  defaultValue | (',' IDENT )*) (',' IDENT EQUALS defaultValue )*)? ')' NEWLINE+ innerBlock  ENDBLOCK FUNCTIONSTATEMENT -> ^(FUNCTION ^(PARAMS IDENT*) ^(DEFAULTS defaultValue*) innerBlock)
	;

     */

    let current = new TreeNode("", "FUNCTION", {
      line: node.start.line,
      source
    });
    let params = new TreeNode("", "PARAMS", {
      line: node.start.line,
      source
    });
    let defaults = new TreeNode("", "DEFAULTS", {
      line: node.start.line,
      source
    });
    params.children.push(new TreeNode(getNodeText(node.children[1]), "IDENT", {
      line: node.start.line,
      source
    }));

    // set params and defaults
    for (let i = 3; i < node.children.length; i++) {
      if (getNodeText(node.children[i]) === ")") {
        break;
      }
      if (getNodeText(node.children[i]) === ",") {
        continue;
      }
      params.children.push(new TreeNode(getNodeText(node.children[i]), "IDENT", {
        line: node.start.line,
        source
      }));
      if (getNodeText(node.children[i + 1]) === "=") {
        defaults.children.push(convertToObject(node.children[i + 2], parser, source));
        i += 2;
      }
    }
    current.children = [params, defaults, getInnerBlock(node, parser, source)];
    return current;

  } else if (ruleIndex === FormulaParser.RULE_innerBlock) {
    /**
     * innerBlock
	   * :	(expression  (NEWLINE+))* -> ^(LINES expression+)
	   *;
     */
    let current = new TreeNode("", "LINES", {
      line: node.start.line,
      source
    });
    for (let i = 0; i < node.children.length; i++) {
      if (getNodeText(node.children[i]) === "\n" || getNodeText(node.children[i]) === "\r\n") {
        continue;
      }
      current.children.push(convertToObject(node.children[i], parser, source));
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_newObject) {
    /**
     newObject
: NEWSTATEMENT IDENT funCall? -> ^(NEW IDENT funCall?);
     */
    let current = new TreeNode("", "NEW", {
      line: node.start.line,
      source
    });
    current.children = [new TreeNode(getNodeText(node.children[1]), "IDENT", {
      line: node.start.line,
      source
    })];
    if (node.children.length > 2) {
      current.children.push(convertToObject(node.children[2], parser, source));
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_whileLoop) {
    /**
     * 
whileLoop
	: WHILESTATEMENT logicalExpression NEWLINE+ innerBlock  ENDBLOCK LOOPSTATEMENT -> ^(WHILE logicalExpression innerBlock)
	;
     */

    let current = new TreeNode("", "WHILE", {
      line: node.start.line,
      source
    });
    current.children = [
      convertToObject(node.children[1], parser, source),
      getInnerBlock(node, parser, source)
    ];
    return current;
  } else if (ruleIndex === FormulaParser.RULE_forLoop) {
    /**
     
forLoop
	: FORSTATEMENT IDENT FROMSTATEMENT logicalExpression TOSTATEMENT logicalExpression (BYSTATEMENT logicalExpression)? NEWLINE+ innerBlock  ENDBLOCK LOOPSTATEMENT -> ^(FOR IDENT ^(PARAMS logicalExpression*) innerBlock)
	;
     */
    let current = new TreeNode("", "FOR", {
      line: node.start.line,
      source
    });
    current.children = [new TreeNode(getNodeText(node.children[1]), "IDENT", {
      line: node.start.line,
      source
    }), new TreeNode("", "PARAMS", {
      line: node.start.line,
      source
    },
    node.children.filter(x => x instanceof FormulaParser.LogicalExpressionContext).map(x => convertToObject(x, parser, source))),
    getInnerBlock(node, parser, source)
    ];

    return current;

  } else if (ruleIndex === FormulaParser.RULE_forInLoop) {
    /**
     
forInLoop
	: FORSTATEMENT IDENT INSTATEMENT logicalExpression NEWLINE+ innerBlock  ENDBLOCK LOOPSTATEMENT  -> ^(FORIN IDENT logicalExpression innerBlock)
	;
     */

    let current = new TreeNode("", "FORIN", {
      line: node.start.line,
      source
    });
    current.children = [new TreeNode(getNodeText(node.children[1]), "IDENT", {
      line: node.start.line,
      source
    }),
    convertToObject(node.children[3], parser, source),
    getInnerBlock(node, parser, source)
    ];

    return current;

  } else if (ruleIndex === FormulaParser.RULE_ifThenElse) {
    /**
     
ifThenElse
	: IFSTATEMENT logicalExpression THENSTATEMENT  NEWLINE+ innerBlock  (ELSESTATEMENT IFSTATEMENT logicalExpression THENSTATEMENT NEWLINE+ innerBlock)* (ELSESTATEMENT NEWLINE+ innerBlock)? ENDBLOCK IFSTATEMENT -> ^(IFTHENELSE ^(PARAMS logicalExpression+) ^(PARAMS innerBlock+))
	;
     */
    let current = new TreeNode("", "IFTHENELSE", {
      line: node.start.line,
      source
    });

    // find innerblocks, if there isn't an innerblock between two else statements, create an empty one
    let innerBlocks = [];
    // @ts-ignore
    let potentialInnerBlocks = node.children.filter(x => x instanceof FormulaParser.InnerBlockContext || x.symbol?.type === FormulaLexer.ELSESTATEMENT || x.symbol?.type === FormulaLexer.ENDBLOCK);
    let hadBlock = false;
    for (let i = 0; i < potentialInnerBlocks.length; i++) {
      if (potentialInnerBlocks[i] instanceof FormulaParser.InnerBlockContext) {
        hadBlock = true;
        innerBlocks.push(convertToObject(potentialInnerBlocks[i], parser, source));
      } else {
        if (!hadBlock) {
          innerBlocks.push(new TreeNode("", "LINES", {
            line: node.start.line,
            source
          }));
        }
        hadBlock = false;
      }
    }

    current.children = [
      new TreeNode("", "PARAMS", {
        line: node.start.line,
        source
      },
      node.children.filter(x => x instanceof FormulaParser.LogicalExpressionContext).map(x => convertToObject(x, parser, source))),
      new TreeNode("", "PARAMS", {
        line: node.start.line,
        source
      },
      innerBlocks)
    ];

    return current;

  
  } else if (ruleIndex === FormulaParser.RULE_tryCatch) {
    /**
     
tryCatch
	: TRYSTATEMENT NEWLINE+ innerBlock CATCHSTATEMENT IDENT NEWLINE+  innerBlock ENDBLOCK TRYSTATEMENT -> ^(TRYCATCH innerBlock* IDENT)
	;
     */
    let current = new TreeNode("", "TRYCATCH", {
      line: node.start.line,
      source
    });
    // find innerBlocks, replacing with lines if missing
    let innerBlocks = [];
    // @ts-ignore
    let potentialInnerBlocks = node.children.filter(x => x instanceof FormulaParser.InnerBlockContext || x.symbol?.type === FormulaLexer.CATCHSTATEMENT || x.symbol?.type === FormulaLexer.ENDBLOCK);
    let hadBlock = false;
    for (let i = 0; i < potentialInnerBlocks.length; i++) {
      if (potentialInnerBlocks[i] instanceof FormulaParser.InnerBlockContext) {
        hadBlock = true;
        innerBlocks.push(convertToObject(potentialInnerBlocks[i], parser, source));
      } else {
        if (!hadBlock) {
          innerBlocks.push(new TreeNode("", "LINES", {
            line: node.start.line,
            source
          }));
        }
        hadBlock = false;
      }
    }
    
    current.children = innerBlocks;


    // @ts-ignore
    current.children.push(new TreeNode(getNodeText(node.children.find(x => x?.symbol?.type === FormulaLexer.IDENT)), "IDENT", {
      line: node.start.line,  
      source
    }));
    return current;
  } else if (ruleIndex === FormulaParser.RULE_assignment) {
    /**
     * assignment
	   * :
	   * IDENT '(' (IDENT  (EQUALS defaultValue | (',' IDENT )*) (',' IDENT EQUALS defaultValue )*)? ')' '<-' logicalExpression -> ^(FUNCTION ^(PARAMS IDENT*) ^(DEFAULTS defaultValue*) logicalExpression) |
	   * (PRIMITIVE | assigned) (',' (PRIMITIVE | assigned))*  '<-' logicalExpression -> ^(ASSIGN PRIMITIVE* assigned* logicalExpression)
	   * ;
     */
    if (getNodeText(node.children[1]) === "(") {
      let current = new TreeNode("", "FUNCTION", {
        line: node.start.line,
        source
      });
      let params = new TreeNode("", "PARAMS", {
        line: node.start.line,
        source
      });
      let defaults = new TreeNode("", "DEFAULTS", {
        line: node.start.line,
        source
      });
      params.children.push(new TreeNode(getNodeText(node.children[0]), "IDENT", {
        line: node.start.line,
        source
      }));
      // set params and defaults
      for (let i = 2; i < node.children.length; i++) {
        if (getNodeText(node.children[i]) === "<-") {
          break;
        }
        if (getNodeText(node.children[i]) === "," || getNodeText(node.children[i]) === ")") {
          continue;
        }
        params.children.push(new TreeNode(getNodeText(node.children[i]), "IDENT", {
          line: node.start.line,
          source
        }));
        if (getNodeText(node.children[i + 1]) === "=") {
          defaults.children.push(convertToObject(node.children[i + 2], parser, source));
          i += 2;
        }
      }
      current.children = [params, defaults, convertToObject(node.children[node.children.length - 1], parser, source)];
      return current;
    } else {
      let current = new TreeNode("", "ASSIGN", {
        line: node.start.line,
        source
      });
      for (let i = 0; i < node.children.length; i++) {
        if (getNodeText(node.children[i]) === ",") {
          continue;
        }
        if (getNodeText(node.children[i]) === "<-") {
          continue;
        }
        // @ts-ignore
        if (node.children[i].symbol?.type === FormulaLexer.PRIMITIVE) {
          current.children.push(new TreeNode(getNodeText(node.children[i]), "PRIMITIVE", {
            // @ts-ignore
            line: node.children[i].symbol.line,
            source
          }));
        } else {
          current.children.push(convertToObject(node.children[i], parser, source));
        }
      }
      return current;
    }
  } else if (ruleIndex === FormulaParser.RULE_assigned) {
    /**
     * assigned 
	   * : IDENT selector? -> ^(ASSIGNED IDENT selector?)
	   * ;
     */
    let current = new TreeNode("", "ASSIGNED", {
      line: node.start.line,
      source
    });
    current.children = [
      new TreeNode(getNodeText(node.children[0]), "IDENT", {
        line: node.start.line,
        source
      })
    ];
    for (let i = 1; i < node.children.length; i++) {
      current.children.push(convertToObject(node.children[i], parser, source));
    }
    return current;
    
  } else if (ruleIndex === FormulaParser.RULE_string) {
    let current = new TreeNode(getNodeText(node), "STRING", {
      line: node.start.line,
      source
    });
    return current;
  } else if (ruleIndex === FormulaParser.RULE_innerPrimaryExpression) {
    let current = new TreeNode("", "INNER", {
      line: node.start.line,
      source
    });
    if (node.children[0] instanceof FormulaParser.SelectionExpressionContext) {
      let selectionExpression = /** @type {any} */ (node.children[0]);
      current.children.push(convertToObject(selectionExpression.children[0], parser, source));
      for (let i = 1; i < selectionExpression.children.length; i++) {
        current.children.push(convertToObject(selectionExpression.children[i], parser, source));
      }
    } else {
      for (let i = 0; i < node.children.length; i++) {
        current.children.push(convertToObject(node.children[i], parser, source));
      }
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_primaryExpression) {
    if (getNodeText(node.children[0]) === "(") {
      return convertToObject(node.children[1], parser, source);
    }
    return convertToObject(node.children[0], parser, source);
  } else if (ruleIndex === FormulaParser.RULE_selector) {
    /**
     * 
     * selector
	   * : (minarray | dotselector) -> ^(SELECTOR minarray? dotselector?)
	   *;
     */
    let current = new TreeNode("", "SELECTOR", {
      line: node.start.line,
      source
    });
    if (node.children[0] instanceof FormulaParser.MinarrayContext) {
      let minArray = /** @type {any} */ (node.children[0]);
      for (let i = 1; i < minArray.children.length - 1; i++) {
        if (getNodeText(minArray.children[i]) === ",") {
          continue;
        }
        // support MULT
        if (getNodeText(minArray.children[i]) === "*") {
          current.children.push(new TreeNode(getNodeText(minArray.children[i]), "MULT", {
            line: minArray.children[i].symbol.line,
            source
          }));
          continue;
        }

        current.children.push(convertToObject(minArray.children[i], parser, source));
      }
    } else {
      current.children = [convertToObject(node.children[0], parser, source)];
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_dotselector) {
    /**
     * dotselector
	   * ('.' arrayName)+ -> ^(DOTSELECTOR arrayName+)
	   * ;
     */
    let current = new TreeNode("", "DOTSELECTOR", {
      line: node.start.line,
      source
    });
    for (let i = 0; i < node.children.length; i++) {
      if (getNodeText(node.children[i]) === ".") {
        continue;
      }
      current.children.push(convertToObject(node.children[i], parser, source));
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_arrayName) {
    // Handle: IDENT STRING or MULT
    // @ts-ignore
    let token = node.children[0];
    // @ts-ignore
    let symbol = token.symbol;

    let newNode = null;
    if (symbol.type === FormulaLexer.STRING) {
      newNode = new TreeNode(token.getText(), "STRING", {
        line: symbol.line,
        source
      });
    } else if (symbol.type === FormulaLexer.IDENT) {
      newNode = new TreeNode(token.getText(), "IDENT", {
        line: symbol.line,
        source
      });
    } else if (symbol.type === FormulaLexer.MULT) {
      newNode = new TreeNode(token.getText(), "MULT", {
        line: symbol.line,
        source
      });
    } else {
      console.error(symbol);
      throw new Error("Invalid type - dotselector");
    }

    return newNode;
  } else if (ruleIndex === FormulaParser.RULE_funCall) {
    // ['(', a, ',', b, ',', c, ..., ')']
    let current = new TreeNode("", "FUNCALL", {
      line: node.start.line,
      source
    });
    for (let i = 1; i < node.children.length - 1; i++) {
      if (getNodeText(node.children[i]) === ",") {
        continue;
      }
      current.children.push(convertToObject(node.children[i], parser, source));
    }
    return current;
  } else if (ruleIndex === FormulaParser.RULE_material) {
    // ['{', additive, unitMultiplicativeExpression, '}']
    let current = new TreeNode(getNodeText(node), "MATERIAL", {
      line: node.start.line,
      source
    });
    current.children = [convertToObject(node.children[2], parser, source), convertToObject(node.children[1], parser, source)];
    return current;
  } else if (ruleIndex === FormulaParser.RULE_unitMultiplicativeExpression) {
    /**
     * unitMultiplicativeExpression 
	   * :	unitInnerMultiplicativeExpression ( PER^ unitInnerMultiplicativeExpression ) *
	   * ;
     */
    if (node.children.length > 1) {
      // [left, ('per', right)*]
      return flatChildrenToTreeLeft(node, (op) => {
        return new TreeNode("", "PER", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }

  } else if (ruleIndex === FormulaParser.RULE_unitInnerMultiplicativeExpression) {
    /**
     * unitInnerMultiplicativeExpression 
	   * :	unitClump ( (MULT|DIV)^ unitClump ) *
     *	;
     */
    if (node.children.length > 1) {
      // [left, '*'|'/', right]
      return flatChildrenToTreeLeft(node, (op) => {
        let operator = getNodeText(op);
        return new TreeNode("", operator === "*" ? "MULT" : "DIV", {
          // @ts-ignore
          line: (op.start || op.symbol).line,
          source
        });
      }, parser, source);
    }
  } else if (ruleIndex === FormulaParser.RULE_unitPowerExpression) {
    /**
     * unitPowerExpression 
	   * :	 unit ( POW^ MINUS? (INTEGER|FLOAT) )* 
	   * ;
     */
    if (node.children.length > 1) {
      // [left, '^', '-' right]

     
      
      let children = /** @type {any} */ (node.children.slice());
      let isFirst = true;
      while (children.length > 1) {
        let left = children.shift();
        let operator = children.shift();
        let minus;
        let right;
        let minusOrRight = children.shift();
        if (getNodeText(minusOrRight) === "-") {
          minus = minusOrRight;
          right = children.pop();
        } else {
          right = minusOrRight;
        }
        let current =  new TreeNode("", "POW", {
          // @ts-ignore
          line: (operator.start || operator.symbol).line,
          source
        });
        current.children = [isFirst ? convertToObject(left, parser, source) : left, new TreeNode(getNodeText(right), "FLOAT", {
          line: right.symbol.line,
          source
        })];
        if (minus) {
          current.children.splice(1, 0, new TreeNode("", "MINUS", {
            // @ts-ignore
            line: (minus.start || minus.symbol).line,
            source
          }));
        }
        children.push(current);
        isFirst = false;
      }
      return children[0];
  
    }

  } else if (ruleIndex === FormulaParser.RULE_unitClump) {
    /**
     * unitClump
	   * :	(INTEGER DIV) unitPowerExpression CUBED? SQUARED? -> ^(UNITCLUMP unitPowerExpression NEGATE CUBED* SQUARED*)
		| unitPowerExpression CUBED? SQUARED? -> ^(UNITCLUMP unitPowerExpression CUBED* SQUARED*)
	   * ;
     */
    if (Number.isInteger(+getNodeText(node.children[0]))) {
      let current = new TreeNode("", "UNITCLUMP", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[2], parser, source), new TreeNode("", "NEGATE", {
        line: node.start.line,
        source
      })];
      for (let i = 3; i < node.children.length; i++) {
        if (getNodeText(node.children[i]).toLowerCase() === "cubed") {
          current.children.push(new TreeNode("", "CUBED", {
            line: node.start.line,
            source
          }));
        } else if (getNodeText(node.children[i]).toLowerCase() === "squared") {
          current.children.push(new TreeNode("", "SQUARED", {
            line: node.start.line,
            source
          }));
        }
      }
      return current;
    } else {
      let current = new TreeNode("", "UNITCLUMP", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[0], parser, source)];

      for (let i = 1; i < node.children.length; i++) {
        if (getNodeText(node.children[i]).toLowerCase() === "cubed") {
          current.children.push(new TreeNode("", "CUBED", {
            line: node.start.line,
            source
          }));
        } else if (getNodeText(node.children[i]).toLowerCase() === "squared") {
          current.children.push(new TreeNode("", "SQUARED", {
            line: node.start.line,
            source
          }));
        }

      }
      return current;
    }

  } else if (ruleIndex === FormulaParser.RULE_unit) {
    /**
     * unit	:	IDENT (IDENT)* -> ^(UNIT IDENT+)
		 * | '(' unitMultiplicativeExpression ')'	-> ^(UNITCLUMP unitMultiplicativeExpression)
     * ;
     */
    if (getNodeText(node.children[0]) === "(") {
      let current = new TreeNode("", "UNITCLUMP", {
        line: node.start.line,
        source
      });
      current.children = [convertToObject(node.children[1], parser, source)];
      return current;
    } else {
      let current = new TreeNode("", "UNIT", {
        line: node.start.line,
        source
      });
      for (let i = 0; i < node.children.length; i++) {
        let token = node.children[i];
        // @ts-ignore
        let symbol = token.symbol;
        current.children.push( new TreeNode(token.getText(), "IDENT", {
          line: symbol.line,
          source
        }));
      }
      return current;
    }
    
    

  } else if (ruleIndex === FormulaParser.RULE_array) {
    /**
     * array
	   * : 
	   * LCURL NEWLINE* (label NEWLINE*(',' NEWLINE* label NEWLINE*)*)? NEWLINE* RCURL -> ^(ARRAY label*)
	   * ;
     */
    // ['{' label (',', label)*, '}']
    let current = new TreeNode("", "ARRAY", {
      line: node.start.line,
      source
    });
    for (let i = 1; i < node.children.length - 1; i++) {
      if (getNodeText(node.children[i]) === "{" || getNodeText(node.children[i]) === "," || getNodeText(node.children[i]) === "\n" || getNodeText(node.children[i]) === "\r\n" || getNodeText(node.children[i]) === "}") {
        continue;
      }
      if (node.children[i] instanceof FormulaParser.LabelContext) {
        current.children.push(convertToObject(node.children[i], parser, source));
      } else {
        current.children.push(new TreeNode(getNodeText(node), "LABEL", {
          line: node.start.line,
          source
        }, [convertToObject(node.children[i], parser, source)]));
      }
    }

    return current;
  }  else if (ruleIndex === FormulaParser.RULE_label) {
    /**
     * label	:	
	   * (arrayName NEWLINE* COLON)? NEWLINE* logicalExpression -> ^(LABEL logicalExpression arrayName?)
	   *;
    */

    let current = new TreeNode(getNodeText(node), "LABEL", {
      line: node.start.line,
      source
    });
    let children = node.children.slice();
    // filter newlines
    children = children.filter(child => getNodeText(child) !== "\n" && getNodeText(child) !== "\r\n");
    if (children.length === 1) {
      current.children = [convertToObject(children[0], parser, source)];
    } else {
      current.children = [convertToObject(children[2], parser, source), convertToObject(children[0], parser, source)];
    }
    return current;
  }

  if (node.children.length === 1) {
    return convertToObject(node.children[0], parser, source);
  }

  // shouldn't reach here
  throw new ModelError("Unknown invalid equation syntax", {
    code: 9002
  });
}


let funcEvalMap = Object.create(null);

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["LINES"] = function (node, scope, simulate) {
  if (!node.children.length) {
    return new Material(0);
  }

  let response;
  for (let child of node.children) {
    if (child.text === "return") {
      // eslint-disable-next-line
      throw { returnVal: true, data: evaluateNode(child.children[0], scope, simulate) };
    } else {
      response = evaluateNode(child, scope, simulate);
    }
  }
  return response;
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["NEGATE"] = function (node, scope, simulate) {
  return negate(toNum(evaluateNode(node.children[0], scope, simulate)));
};

/**
 * @template {Material|Vector} T
 *
 * @param {T} x
 *
 * @returns {T extends Vector ? Vector : Material}
 */
export function negate(x) {
  if (x instanceof Vector) {
    return /** @type {any} */ (x.cloneApply(negate));
  } else if (x instanceof Material) {
    return /** @type {any} */ (new Material(fn["-"](x.value), x.units));
  }


  if (typeof x === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7001
    });
  }
  if (x instanceof String || typeof x === "string") {
    throw new ModelError("Cannot convert Strings to Numbers.", {
      code: 7002
    });
  }
  if (x instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7003
    });
  }

  throw new ModelError("Invalid type - negate", {
    code: 7004
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["AND"] = function (node, scope, simulate) {
  return funAnd(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

function funAnd(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, funAnd, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, funAnd, true);
  }

  return trueValue(lhs) && trueValue(rhs);
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["OR"] = function (node, scope, simulate) {
  return funOr(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

function funOr(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, funOr, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, funOr, true);
  }

  return trueValue(lhs) || trueValue(rhs);
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["XOR"] = function (node, scope, simulate) {
  return funXor(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

function funXor(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, funXor, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, funXor, true);
  }

  return (trueValue(lhs) || trueValue(rhs)) && !(trueValue(lhs) && trueValue(rhs));
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["NOT"] = function (node, scope, simulate) {
  return fNot(toNum(evaluateNode(node.children[0], scope, simulate)));
};

export function fNot(x) {
  if (x instanceof Vector) {
    return x.cloneApply(fNot);
  }

  return !trueValue(x);
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["NOTEQUALS"] = function (node, scope, simulate) {
  return neq(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @param {ValueType|string|number} lhs
 * @param {ValueType|string|number} rhs
 *
 * @returns {boolean}
 */
export function neq(lhs, rhs) {
  if ((typeof lhs === "boolean" && !(rhs instanceof Vector)) || (typeof rhs === "boolean" && !(lhs instanceof Vector))) {
    return trueValue(lhs) !== trueValue(rhs);
  }
  if (((lhs instanceof String || typeof lhs === "string") && !(rhs instanceof Vector)) || ((rhs instanceof String || typeof rhs === "string") && !(lhs instanceof Vector))) {
    return ("" + lhs).toLowerCase() !== ("" + rhs).toLowerCase();
  }


  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, neq, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, neq, true);
  }

  if (!(lhs instanceof Material) || !(rhs instanceof Material)) {
    return lhs !== rhs;
  }

  let scale = 1;
  if (lhs.units !== rhs.units) {
    scale = convertUnits(rhs.units, lhs.units);
    if (scale === 0) {
      return true;
    }
  }

  return !fn["="](lhs.value, scale === 1 ? rhs.value : fn["*"](rhs.value, scale));
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["EQUALS"] = function (node, scope, simulate) {
  return eq(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)), true);
};


/**
 * @param {ValueType|string|number} lhs
 * @param {ValueType|string|number} rhs
 * @param {boolean=} allowVectorReturn 
 * @returns {boolean}
 */
export function eq(lhs, rhs, allowVectorReturn=false) {
  if ((typeof lhs === "boolean" && !(rhs instanceof Vector)) || (typeof rhs === "boolean" && !(lhs instanceof Vector))) {
    return trueValue(lhs) === trueValue(rhs);
  }
  if (((typeof lhs === "string" || lhs instanceof String) && !(rhs instanceof Vector)) || ((typeof rhs === "string" || rhs instanceof String) && !(lhs instanceof Vector))) {
    return ("" + lhs).toLowerCase() === ("" + rhs).toLowerCase();
  }


  if (allowVectorReturn) {
    if (lhs instanceof Vector) {
      return lhs.cloneCombine(rhs, (a, b) => eq(a, b, true), false);
    } else if (rhs instanceof Vector) {
      return rhs.cloneCombine(lhs, (a, b) => eq(a, b, true), true);
    }
  } else {
    if (lhs instanceof Vector || rhs instanceof Vector) {
      if (lhs instanceof Vector && rhs instanceof Vector) {
        return lhs.equals(rhs);
      }
      return false;
    }
  }

  if (!(lhs instanceof Material) || !(rhs instanceof Material)) {
    return lhs === rhs;
  }

  let scale = 1;
  if (lhs.units !== rhs.units) {
    scale = convertUnits(rhs.units, lhs.units);
    if (scale === 0) {
      return false;
    }
  }


  return fn["="](lhs.value, scale === 1 ? rhs.value : fn["*"](rhs.value, scale));
}

function comparisonValid(lhs, rhs) {
  if (lhs instanceof String || typeof lhs === "string" || rhs instanceof String || typeof rhs === "string") {
    throw new ModelError("Cannot use Strings in logical inequality comparisons.", {
      code: 7005
    });
  }
  if (lhs instanceof Boolean || typeof lhs === "boolean" || rhs instanceof Boolean || typeof rhs === "boolean") {
    throw new ModelError("Cannot use Booleans in logical inequality comparisons.", {
      code: 7006
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot use Agents in logical inequality comparisons.", {
      code: 7007
    });
  }
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["LT"] = function (node, scope, simulate) {
  return lessThan(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 *
 * @returns {boolean}
 */
export function lessThan(lhs, rhs) {
  comparisonValid(lhs, rhs);

  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, lessThan, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, lessThan, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {

    let scale = 1;
    if (lhs.units !== rhs.units) {
      scale = convertUnits(rhs.units, lhs.units);
      if (scale === 0) {
        unitAlert(lhs.units, rhs.units, "comparison");
      }
    }

    return fn["<"](lhs.value, scale === 1 ? rhs.value : fn["*"](scale, rhs.value));
  }

  throw new ModelError("Invalid type - lessThan", {
    code: 7008
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["LTEQ"] = function (node, scope, simulate) {
  return lessThanEq(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 *
 * @returns {boolean}
 */
export function lessThanEq(lhs, rhs) {
  comparisonValid(lhs, rhs);

  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, lessThanEq, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, lessThanEq, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {

  
    let scale = 1;
    if (lhs.units !== rhs.units) {
      scale = convertUnits(rhs.units, lhs.units);
      if (scale === 0) {
        unitAlert(lhs.units, rhs.units, "comparison");
      }
    }

    return fn["<="](lhs.value, scale === 1 ? rhs.value : fn["*"](scale, rhs.value));
  }

  throw new ModelError("Invalid type - lessThanEq", {
    code: 7009
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["GT"] = function (node, scope, simulate) {
  return greaterThan(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 * @returns {boolean}
 */
export function greaterThan(lhs, rhs) {
  comparisonValid(lhs, rhs);

  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, greaterThan, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, greaterThan, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {

    let scale = 1;
    if (lhs.units !== rhs.units) {
      scale = convertUnits(rhs.units, lhs.units);
      if (scale === 0) {
        unitAlert(lhs.units, rhs.units, "comparison");
      }
    }

    return fn[">"](lhs.value, scale === 1 ? rhs.value : fn["*"](scale, rhs.value));
  }

  throw new ModelError("Invalid type - greaterThan", {
    code: 7010
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["GTEQ"] = function (node, scope, simulate) {
  return greaterThanEq(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @param {ValueType} lhs
 * @param {ValueType} rhs
 * @returns {boolean}
 */
export function greaterThanEq(lhs, rhs) {
  comparisonValid(lhs, rhs);

  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, greaterThanEq, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, greaterThanEq, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {

    let scale = 1;
    if (lhs.units !== rhs.units) {
      scale = convertUnits(rhs.units, lhs.units);
      if (scale === 0) {
        unitAlert(lhs.units, rhs.units, "comparison");
      }
    }

    return fn[">="](lhs.value, scale === 1 ? rhs.value : fn["*"](scale, rhs.value));
  }

  throw new ModelError("Invalid type - greaterThanEq", {
    code: 7011
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["PLUS"] = function (node, scope, simulate) {
  return plus(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};


/**
 * @template {Material|Vector|String} L
 * @template {Material|Vector|String} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : (L extends string ? string: (R extends string ? string : Material)))}
 */
export function plus(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, plus, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, plus, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {

    let explicitUnits = true;
    let scale = 1;
    if (lhs.units !== rhs.units) {
      scale = convertUnits(rhs.units, lhs.units);
      if (scale === 0) {
        unitAlert(lhs.units, rhs.units, "addition");
      } else if (scale !== 1) {
        explicitUnits = false;
      }
    }

    return /** @type {any} */ (new Material(
      fn["+"](lhs.value, scale === 1 ? rhs.value : fn["*"](rhs.value, scale)),
      lhs.units,
      explicitUnits && lhs.explicitUnits && rhs.explicitUnits 
    ));
  }


  if (typeof lhs === "boolean" || typeof rhs === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7012
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7013
    });
  }
  if (typeof lhs === "string" || lhs instanceof String || typeof rhs === "string" || rhs instanceof String) {
    let s = lhs.toString() + rhs.toString();
    return /** @type {any} */ (s);
  }

  throw new ModelError("Invalid type - plus", {
    code: 7014
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["MINUS"] = function (node, scope, simulate) {
  return minus(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};


/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function minus(lhs, rhs) {

  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, minus, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, minus, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {

    let explicitUnits = true;
    let scale = 1;
    if (lhs.units !== rhs.units) {
      scale = convertUnits(rhs.units, lhs.units);
      if (scale === 0) {
        unitAlert(lhs.units, rhs.units, "subtraction");
      } else if (scale !== 1) {
        explicitUnits = false;
      }
    }


    return /** @type {any} */ (new Material(
      fn["-"](lhs.value, scale === 1 ? rhs.value : fn["*"](rhs.value, scale)),
      lhs.units,
      explicitUnits && lhs.explicitUnits && rhs.explicitUnits 
    ));
  }


  if (typeof lhs === "boolean" || typeof rhs === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7015
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7016
    });
  }
  if (typeof lhs === "string" || lhs instanceof String || typeof rhs === "string" || rhs instanceof String) {
    throw new ModelError("Cannot convert Strings to Numbers.", {
      code: 7017
    });
  }


  throw new ModelError("Invalid type - minus", {
    code: 7018
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["MULT"] = function (node, scope, simulate) {
  return mult(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function mult(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, mult, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, mult, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {
    let x = fn["*"](lhs.value, rhs.value);

    if (lhs.units && rhs.units) {
      let [scale, newUnits, explicit] = lhs.units.multiply(rhs.units, true);
      if (scale === 1) {
        return /** @type {any} */ (new Material(
          x,
          newUnits,
          explicit && lhs.explicitUnits && rhs.explicitUnits 
        ));
      } else {
        return /** @type {any} */ (new Material(
          fn["*"](x, scale),
          newUnits,
          explicit && lhs.explicitUnits && rhs.explicitUnits 
        ));
      }
    } else if (lhs.units) {
      return /** @type {any} */ (new Material(x, lhs.units));
    } else if (rhs.units) {
      return /** @type {any} */ (new Material(x, rhs.units));
    }

    return /** @type {any} */ (new Material(x));
  }

  if (typeof lhs === "boolean" || typeof rhs === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7019
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7020
    });
  }
  if (typeof lhs === "string" || lhs instanceof String || typeof rhs === "string" || rhs instanceof String) {
    throw new ModelError("Cannot convert Strings to Numbers.", {
      code: 7021
    });
  }


  throw new ModelError("Invalid type - mult", {
    code: 7022
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["DIV"] = function (node, scope, simulate) {
  return div(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function div(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, div, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, div, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {
    let x = fn["/"](lhs.value, rhs.value);

    if (lhs.units && rhs.units) {
      let [scale, newUnits, explicit] = lhs.units.multiply(rhs.units, false);
      if (scale === 1) {
        return /** @type {any} */ (new Material(
          x,
          newUnits,
          explicit && lhs.explicitUnits && rhs.explicitUnits 
        ));
      } else {
        return /** @type {any} */ (new Material(
          fn["*"](x, scale),
          newUnits,
          explicit && lhs.explicitUnits && rhs.explicitUnits 
        ));
      }
    } else if (lhs.units) {
      return /** @type {any} */ (new Material(x, lhs.units));
    } else if (rhs.units) {
      return /** @type {any} */ (new Material(x, rhs.units.power(-1)));
    }

    return /** @type {any} */ (new Material(x));
  }

  if (typeof lhs === "boolean" || typeof rhs === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7023
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7024
    });
  }
  if (typeof lhs === "string" || lhs instanceof String || typeof rhs === "string" || rhs instanceof String) {
    throw new ModelError("Cannot convert Strings to Numbers.", {
      code: 7025
    });
  }

  throw new ModelError("Invalid type - div", {
    code: 7026
  });
}


/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["POWER"] = function (node, scope, simulate) {
  if (node.children.length === 1) {
    return evaluateNode(node.children[0], scope, simulate);
  }

  let rhs = toNum(evaluateNode(node.children[node.children.length - 1], scope, simulate));

  for (let j = node.children.length - 1; j > 0; j--) {
    let lhs = toNum(evaluateNode(node.children[j - 1], scope, simulate));
    if (rhs instanceof Vector || !rhs.units) {
      rhs = power(lhs, rhs);
    } else {
      throw new ModelError("Exponents may not have units.", {
        code: 7027
      });
    }
  }

  return rhs;
};


/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function power(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, power, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, power, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {
    let x = lhs.value;
    let y = rhs.value;
    if (x < 0 && y !== Math.round(y)) {
      throw new ModelError(`Cannot take a negative number (${x}) to a fractional power (${y}).`, {
        code: 7028
      });
    }
    return /** @type {any} */ (new Material(fn.expt(x, y), lhs.units ? lhs.units.power(y) : undefined));
  }

  if (typeof lhs === "boolean" || typeof rhs === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7029
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7030
    });
  }
  if (typeof lhs === "string" || lhs instanceof String || typeof rhs === "string" || rhs instanceof String) {
    throw new ModelError("Cannot convert Strings to Numbers.", {
      code: 7031
    });
  }


  throw new ModelError("Invalid type - power", {
    code: 7032
  });
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["MOD"] = function (node, scope, simulate) {
  return doMod(toNum(evaluateNode(node.children[0], scope, simulate)), toNum(evaluateNode(node.children[1], scope, simulate)));
};

/**
 * @template {Material|Vector} L
 * @template {Material|Vector} R
 *
 * @param {L} lhs
 * @param {R} rhs
 *
 * @returns {L extends Vector ? Vector : (R extends Vector ? Vector : Material)}
 */
export function doMod(lhs, rhs) {
  if (lhs instanceof Vector) {
    return lhs.cloneCombine(rhs, doMod, false);
  } else if (rhs instanceof Vector) {
    return rhs.cloneCombine(lhs, doMod, true);
  } else if (lhs instanceof Material && rhs instanceof Material) {
    if (!rhs.units) {
      return /** @type {any} */ (new Material(fn.mod(lhs.value, rhs.value), lhs.units));
    } else {
      throw new ModelError("The right hand side of \"mod\" may not have units.", {
        code: 7033
      });
    }
  }

  if (typeof lhs === "boolean" || typeof rhs === "boolean") {
    throw new ModelError("Cannot convert Booleans to Numbers.", {
      code: 7034
    });
  }
  if (lhs instanceof SAgent || rhs instanceof SAgent) {
    throw new ModelError("Cannot convert Agents to Numbers.", {
      code: 7035
    });
  }
  if (typeof lhs === "string" || lhs instanceof String || typeof rhs === "string" || rhs instanceof String) {
    throw new ModelError("Cannot convert Strings to Numbers.", {
      code: 7036
    });
  }


  throw new ModelError("Invalid type - mod", {
    code: 7037
  });
}


/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["IDENT"] = function (node, scope, simulate) {
  let varName = node.text;

  while (!scope.has(varName)) {
    if (scope.get("-parent")) {
      scope = scope.get("-parent");
    } else {
      throw new ModelError(`The variable or function "${node.origText}" does not exist.`, {
        code: 7038
      });
    }
  }

  let v = scope.get(varName);

  if (v instanceof TreeNode && v.typeName === "ARRAY") {
    v = evaluateNode(v, scope, simulate);
  }
  if (v.fullClone && !(v instanceof Vector)) {
    return v.fullClone();
  } else {
    return v;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["NEW"] = function (node, scope, simulate) {
  let base = evaluateNode(node.children[0], scope, simulate);
  if (base instanceof Vector) {
    let n = new Vector([], simulate, undefined, base);
    let constructor;
    let r;
    try {
      r = selectFromVector(base, simulate, "constructor");
      constructor = r.data;
    } catch (err) {
      // pass
    }

    if (!constructor) {
      if (node.children.length === 2 && node.children[1].children.length > 0) {
        throw new ModelError(`No constructor available for '${node.children[0].text}'.`, {
          code: 7039
        });
      }
    } else {
      if (node.children.length === 2) {
        callFunction(constructor, node.children[1], simulate, scope, n, r.parent);
      } else {
        callFunction(constructor, { children: [] }, simulate, scope, n, r.parent);
      }
    }
    return n;
  } else {
    throw new ModelError("'New' can only be use to create instances of Vectors.", {
      code: 7040
    });
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["INNER"] = function (node, scope, simulate) {
  let base = evaluateNode(node.children[0], scope, simulate);

  if (node.children.length === 2 && node.children[1].typeName === "FUNCALL") {
    return callFunction(base, node.children[1], simulate, scope);
  }

  let lastSelf; // for "self" binding
  let lastBase; // for "self" binding

  if (scope.get("self") && node.children[0].text === "parent") {
    lastSelf = scope.get("self");
  } else if (!(base instanceof Function || base instanceof UserFunction)) {
    lastSelf = base;
  }

  for (let i = 1; i < node.children.length; i++) {
    if (node.children[i].typeName === "SELECTOR") {
      if (node.children[i].children[0].typeName === "DOTSELECTOR") {

        for (let j = 0; j < node.children[i].children[0].children.length; j++) {
          let res = [];
          if (node.children[i].children[0].children[j].text) {
            res.push(node.children[i].children[0].children[j].text);
          } else {
            res.push(node.children[i].children[0].children[j].valueOf());
          }
          try {
            base = selectFromMatrix(base, simulate, res);
          } catch (err) {
            if (base instanceof SPrimitive && !(base instanceof SAgent)) {
              base = toNum(base);
              j--;
            } else {
              throw err;
            }
          }

          if (!(base instanceof Function || base instanceof UserFunction)) {
            lastSelf = base;
            lastBase = base;
          }
        }

      } else {

        if (base instanceof SPrimitive) {
          base = toNum(base);

          if (!(base instanceof Function || base instanceof UserFunction)) {
            lastSelf = base;
            lastBase = base;
          }
        }


        try {
          base = selectFromMatrix(base, simulate, createMatrixSelector(node.children[i], scope, 0, simulate));
        } catch (err) {
          if (base instanceof SPrimitive) {
            base = toNum(base);
            i--;
          } else {
            throw err;
          }
        }

        if (!(base instanceof Function || base instanceof UserFunction)) {
          lastSelf = base;
          lastBase = base;
        }
      }


    } else { // "FUNCALL"
      base = callFunction(base, node.children[i], simulate, scope, lastSelf, lastBase);

      if (!(base instanceof Function || base instanceof UserFunction)) {
        lastSelf = base;
        lastBase = base;
      }
    }
  }
  return base;
};

let fingerprintCounter = 0;

/**
 *
 * @param {*} base
 * @param {any} node
 * @param {import("../Simulator").Simulator} simulate
 * @param {Map} scope
 * @param {*} lastSelf
 * @param {*} lastBase
 * @returns
 */
function callFunction(base, node, simulate, scope, lastSelf, lastBase) {
  if (typeof base !== "function" && !(base instanceof UserFunction)) {
    throw new ModelError("Trying to call a non-function.", {
      code: 7041
    });
  }

  let vals = [];
  let fingerprint = "";
  if (node instanceof Array) {
    vals = node;
  } else {
    if (!node.functionFingerprint) {
      node.functionFingerprint = "FINGERPRINT-" + (fingerprintCounter++);
    }
    fingerprint = node.functionFingerprint;

    if (base.delayEvalParams) {
      // don't evaluate params right away. needed for IfThenElse and short circuiting
      for (let j = 0; j < node.children.length; j++) {
        vals.push({ node: node.children[j], scope: scope });
      }
    } else {
      for (let j = 0; j < node.children.length; j++) {
        let item = evaluateNode(node.children[j], scope, simulate);
        if (item.fullClone && !(item instanceof Vector)) {
          item = item.fullClone();
        }
        vals.push(item);
      }
    }
  }

  let fn;
  if (base.fn) {
    fn = base.fn; // user defined function
  } else {
    node.delayEvalParams = base.delayEvalParams;
    fn = base; // built-in
  }

  let oldPosition = simulate.evaluatingPosition;

  let x = fn(vals, fingerprint, lastSelf, lastBase);

  simulate.evaluatingPosition = oldPosition;

  return x;
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {*} offset
 * @param {import("../Simulator").Simulator} simulate
 */
function createMatrixSelector(node, scope, offset, simulate) {
  let selector = [];
  offset = offset || 0;
  for (let i = offset; i < node.children.length; i++) {
    let child = node.children[i];
    if (child.typeName === "MULT") {
      selector.push("*");
    } else {
      let x = evaluateNode(node.children[i], scope, simulate);
      if (typeof x === "function" || x instanceof UserFunction) {
        let fn;
        if (typeof x === "function") {
          fn = x;
        } else {
          fn = x.fn;
        }
        (function (f) {
          selector.push((x) => {
            if (!x[0].stackApply) {
              throw new ModelError("Can't apply function across elements of non-vector.", {
                code: 7042
              });
            }

            return x[0].stackApply((x) => {
              return f([x]);
            });
          });
        })(fn);
      } else {
        selector.push(toNum(x));
      }
    }
  }
  return selector;
}


/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["ARRAY"] = function (node, scope, simulate) {

  if (node.children.length === 1 && node.children[0] instanceof Vector) {
    return node.children[0].fullClone(); // pre calculated vector
  }

  let vals = [];
  let names = [];
  let hasName = false;
  for (let i = 0; i < node.children.length; i++) {
    vals.push(evaluateNode(node.children[i].children[0], scope, simulate));
    if (node.children[i].children.length > 1) {
      if (node.children[i].children[1].text) {
        names.push(node.children[i].children[1].origText);
      } else {
        names.push(node.children[i].children[1].valueOf());
      }
      hasName = true;
    } else {
      names.push(undefined);
    }
  }
  return new Vector(vals, simulate, hasName ? names : undefined);
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["RANGE"] = function (node, scope, simulate) {
  if (node.children.length === 1) {
    return evaluateNode(node.children[0], scope, simulate);
  }
  let vals = [];
  let start = toNum(evaluateNode(node.children[0], scope, simulate));
  let end = toNum(evaluateNode(node.children[node.children.length - 1], scope, simulate));

  if (!(start instanceof Material) || !(end instanceof Material)) {
    throw new ModelError("Range elements must be numbers.", {
      code: 7043
    });
  }

  vals.push(start.fullClone());
  if (start.units !== end.units) {
    let scale = convertUnits(start.units, end.units);
    if (scale !== 1) {
      throw new ModelError("Units on both sides of ':' must be equal.", {
        code: 7044
      });
    }
  }

  /** @type {Material} */
  let step = node.children.length === 2 ? new Material(1, start.units) : toNum(evaluateNode(node.children[1], scope, simulate));

  if (!(step instanceof Material)) {
    throw new ModelError("Range elements must be numbers.", {
      code: 7045
    });
  }

  if (eq(start, end)) {
    // pass
  } else if (lessThan(start, end)) {
    let it = plus(start, step);
    while (lessThanEq(it, end)) {
      vals.push(it);
      it = plus(it, step);
    }
  } else if (greaterThan(start, end)) {
    if (node.children.length === 2) {
      step = negate(step);
    }
    let it = plus(start, step);
    while (greaterThanEq(it, end)) {
      vals.push(it);
      it = plus(it, step);
    }
  }

  return new Vector(vals, simulate);
};

/**
 * @param {*} varName
 * @param {*} varNames
 * @param {*} varDefaults
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
function makeFunctionCall(varName, varNames, varDefaults, node, scope, simulate) {

  let fn = new UserFunction();

  fn.localScope = Object.create(null);
  fn.localScope["nVars"] = varNames.length;
  for (let i = 0; i < varNames.length; i++) {
    fn.localScope[i + ""] = varNames[i];
  }
  fn.defaults = varDefaults;

  fn.fn = function (x, fingerPrint, lastSelf, lastBase) {
    let minLength = x.length;
    for (let i = 0; i < x.length; i++) {
      if (x[i].optional) {
        minLength--;
      }
    }
    if (fn.localScope["nVars"] - fn.defaults.length > x.length || minLength > fn.localScope["nVars"]) {
      let names = [];
      for (let i = 0; i < fn.localScope["nVars"]; i++) {
        if (fn.defaults.length - (fn.localScope["nVars"] - i) > -1) {
          names.push(fn.localScope[i + ""] + "=" + fn.defaults[fn.defaults.length - (fn.localScope["nVars"] - i)]);
        } else {
          names.push(fn.localScope[i + ""]);
        }
      }

      throw new ModelError("Wrong number of parameters for " + varName + "(" + names.join(", ") + ").", {
        code: 7049
      });
    }
    let localScope = new Map([
      ["-parent", scope]
    ]);

    for (let i = 0; i < x.length; i++) {
      localScope.set(fn.localScope[i + ""], x[i]);
    }
    for (let i = x.length; i < fn.localScope["nVars"]; i++) {
      localScope.set(fn.localScope[i + ""], fn.defaults[fn.defaults.length - (fn.localScope["nVars"] - i)]);
    }


    if (lastSelf) {
      if (!localScope.has("self")) {
        localScope.set("self", lastSelf);
      }
    }
    if (lastBase) {
      if (lastBase.parent) {
        localScope.set("parent", lastBase.parent);
      }
    }

    try {
      return evaluateNode(node, localScope, simulate);
    } catch (err) {
      if (err.returnVal) {
        return err.data;
      } else {
        throw err;
      }
    }
  };

  return fn;
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["THROW"] = function (node, scope, simulate) {
  throw new ModelError(evaluateNode(node.children[0], scope, simulate), {
    code: 10000
  });
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["TRYCATCH"] = function (node, scope, simulate) {
  try {
    return evaluateNode(node.children[0], scope, simulate);
  } catch (err) {
    
    /** @type {Map} */
    let localScope = new Map([[ "-parent", scope ]]);
    if (err instanceof ModelError) {
      localScope.set(node.children[2].text, stringify(err.message, simulate));
    } else {
      localScope.set(node.children[2].text, stringify("An error has occurred.", simulate));
    }
    return evaluateNode(node.children[1], localScope, simulate);
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["WHILE"] = function (node, scope, simulate) {
  let lastResult = new Material(0);
  
  let innerScope = new Map([[ "-parent", scope ]]);
  while (trueValue(toNum(evaluateNode(node.children[0], scope, simulate)))) {
    lastResult = evaluateNode(node.children[1], innerScope, simulate);
  }
  return lastResult;
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["IFTHENELSE"] = function (node, scope, simulate) {
  
  let innerScope = new Map([[ "-parent", scope ]]);
  let i;
  for (i = 0; i < node.children[0].children.length; i++) {
    if (trueValue(toNum(evaluateNode(node.children[0].children[i], scope, simulate)))) {
      return evaluateNode(node.children[1].children[i], innerScope, simulate);
    }
  }
  if (node.children[0].children.length !== node.children[1].children.length) {
    return evaluateNode(node.children[1].children[i], innerScope, simulate);
  }

  return new Material(0);
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["FORIN"] = function (node, scope, simulate) {
  let lastResult = new Material(0);
  let id = node.children[0].text;

  
  let innerScope = new Map([[ "-parent", scope ]]);
  let vec = evaluateNode(node.children[1], scope, simulate);
  if (!(vec instanceof Vector)) {
    throw new ModelError("The in argument of a For-In loop must be a vector.", {
      code: 7050
    });
  }
  for (let i = 0; i < vec.items.length; i++) {
    innerScope.set(id, vec.items[i]);
    lastResult = evaluateNode(node.children[2], innerScope, simulate);
  }
  return lastResult;
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["FOR"] = function (node, scope, simulate) {
  let lastResult = new Material(0);
  let id = node.children[0].text;
  let start = toNum(evaluateNode(node.children[1].children[0], scope, simulate));
  let by = new Material(1);

  if (node.children[1].children.length === 3) {
    by = toNum(evaluateNode(node.children[1].children[2], scope, simulate));
  }
  /** @type {Map} */
  let innerScope = new Map([[ "-parent", scope ]]);

  innerScope.set(id, start);
  while (fn[by.value >= 0 ? "<=" : ">="](innerScope.get(id).value, toNum(evaluateNode(node.children[1].children[1], scope, simulate)))) {
    lastResult = evaluateNode(node.children[2], innerScope, simulate);
    innerScope.set(id, plus(innerScope.get(id), by));
  }
  return lastResult;
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["FUNCTION"] = function (node, scope, simulate) {
  let id = node.children[0].children[0].text;

  functionGenerator(id, node.children[0], node.children[1], node.children[2], scope, simulate);

  return `"${id}" defined`;
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["ANONFUNCTION"] = function (node, scope, simulate) {
  return functionGenerator(null, node.children[0], node.children[1], node.children[2], scope, simulate);
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["ASSIGN"] = function (node, scope, simulate) {
  let items = node.children.length - 1;
  let x = evaluateNode(node.children[node.children.length - 1], scope, simulate);
  if (items > 1 && (!(x instanceof Vector) || x.items.length < items)) {
    throw new ModelError("Too few elements returned for assignment.", {
      code: 7051
    });
  }
  for (let i = 0; i < items; i++) {
    if (node.children[i] instanceof PrimitiveStore) {
      if (items === 1) {
        node.children[i].primitive.setValue(x);
      } else {
        node.children[i].primitive.setValue(x.items[i]);
      }
    } else {
      let varName = node.children[i].children[0].text;
      let selector;
      if (node.children[i].children.length > 1) {
        selector = createSelector(node.children[i].children[1], scope, simulate);
      }

      let origScope = scope;
      while (scope.get("-parent") !== null) {
        if (scope.get(varName) !== undefined) {
          break;
        }
        scope = scope.get("-parent");
      }
      if (scope.get("-parent") === null && scope.get(varName) === undefined) {
        scope = origScope;
      }

      let v;
      if (items === 1) {
        v = x;
      } else {
        v = x.items[i];
      }
      if (node.children[i].children.length === 1) {
        scope.set(varName,  v);
      } else {
        if (scope.has(varName)) {
          selectFromMatrix(scope.get(varName), simulate, selector, v);
        } else {
          throw new ModelError(`The variable '${node.children[i].children[0].origText}' does not exist.`, {
            code: 7052
          });
        }
      }
    }
  }
  if (items > 1) {
    return new Vector(x.items.slice(0, items), simulate);
  } else {
    return x;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
function createSelector(node, scope, simulate) {
  if (node.children[0].typeName === "DOTSELECTOR") {
    let res = [];
    for (let i = 0; i < node.children[0].children.length; i++) {
      if (node.children[0].children[i].text) {
        res.push(node.children[0].children[i].text);
      } else {
        res.push(node.children[0].children[i].valueOf());
      }
    }
    return res;
  } else {
    return createMatrixSelector(node, scope, 0, simulate);
  }
}

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
funcEvalMap["MATERIAL"] = function (node, scope, simulate) {
  let v = toNum(evaluateNode(node.children[0], scope, simulate));
  if (v.units) {
    throw new ModelError("Cannot create material where numeric part itself has units.", {
      code: 7053
    });
  }
  return new Material(v.value, node.children[1]);
};

/**
 * @param {string} varName
 * @param {TreeNode} paramNames
 * @param {*} paramDefaults
 * @param {*} code
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
function functionGenerator(varName, paramNames, paramDefaults, code, scope, simulate) {
  let varNames = [];
  let varDefaults = [];
  for (let i = varName === null ? 0 : 1; i < paramNames.children.length; i++) {
    varNames.push(paramNames.children[i].text);
  }

  for (let i = 0; i < paramDefaults.children.length; i++) {
    varDefaults.push(paramDefaults.children[i]);
  }
  if (varName === null) {
    return makeFunctionCall("Function", varNames, varDefaults, code, scope, simulate);
  } else {
    scope.set(varName, makeFunctionCall(varName, varNames, varDefaults, code, scope, simulate));
  }
}

let unitEvalMap = Object.create(null);

unitEvalMap["MULT"] = function (node) {
  return evaluateUnits(node.children[0]).concat(evaluateUnits(node.children[1]));
};

unitEvalMap["POW"] = function (node) {
  let rhsMult = 1;
  let rhsLoc = 1;
  let lhsLoc = 0;

  if (node.children.length === 3 + lhsLoc) {
    rhsMult = rhsMult * -1;
    rhsLoc++;
  }
  let lhs = evaluateUnits(node.children[lhsLoc]);
  let rhs = evaluateUnits(node.children[rhsLoc]) * rhsMult;

  if (lhs instanceof Array) {
    for (let i = 0; i < lhs.length; i++) {
      lhs[i].exponent = lhs[i].exponent * rhs;
    }
    return lhs;
  } else {
    return Math.pow(lhs, rhs);
  }
};

unitEvalMap["DIV"] = function (node) {
  let lhs = evaluateUnits(node.children[0]);
  let rhs = evaluateUnits(node.children[1]);
  for (let i = 0; i < rhs.length; i++) {
    rhs[i].exponent = rhs[i].exponent * -1;
  }
  return lhs.concat(rhs);
};

unitEvalMap["PER"] = unitEvalMap["DIV"];

unitEvalMap["UNIT"] = function (node) {
  let unitName = "";
  for (let i = 0; i < node.children.length; i++) {
    unitName = unitName + node.children[i].text;
    if (i < node.children.length - 1) {
      unitName = unitName + " ";
    }
  }
  return [{
    id: unitName,
    exponent: 1
  }];
};

unitEvalMap["UNITCLUMP"] = function (node) {
  let x = evaluateUnits(node.children[0]);
  if (node.children.length > 1) {
    for (let i = 1; i < node.children.length; i++) {
      if (node.children[i].typeName === "NEGATE") {
        for (let j = 0; j < x.length; j++) {
          x[j].exponent = x[j].exponent * -1;
        }
      } else if (node.children[i].typeName === "SQUARED") {
        for (let j = 0; j < x.length; j++) {
          x[j].exponent = x[j].exponent * 2;
        }
      } else if (node.children[i].typeName === "CUBED") {
        for (let j = 0; j < x.length; j++) {
          x[j].exponent = x[j].exponent * 3;
        }
      }
    }
  }
  return x;
};

unitEvalMap["INTEGER"] = function (node) {
  return parseInt(node.text, 10);
};

unitEvalMap["FLOAT"] = function (node) {
  return parseFloat(node.text);
};

function evaluateUnits(node) {
  if (node instanceof Material) {
    return node.value;
  }

  return unitEvalMap[node.typeName](node);
}

/**
 * @param {*} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
export function evaluateNode(node, scope, simulate) {
  if (node instanceof TreeNode) {
    simulate.evaluatingPosition = node.position || simulate.evaluatingPosition;

    return funcEvalMap[node.typeName](node, scope, simulate);
  } else if (node instanceof PrimitiveStore) {
    if (node.type === "totalValue") {
      if (!node.primitive.totalContents) {
        throw new ModelError("You can only use the double-bracket notation for total conveyor contents on Stock primitives.", {
          code: 7054
        });
      }
      return node.primitive.totalContents();
    } else if (node.type === "object") {
      return node.primitive;
    }
  } else {
    return node;
  }
}

let trimEvalMap = Object.create(null);

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["POWER"] = function (node, scope, simulate) {
  if (node.children.length === 1) {
    return trimNode(node.children[0], scope, simulate);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    for (let i = 0; i < node.children.length; i++) {
      n.children.push(trimNode(node.children[i], scope, simulate));
    }
    return n;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["INNER"] = function (node, scope, simulate) {
  if (node.children.length === 1) {
    return trimNode(node.children[0], scope, simulate);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    for (let i = 0; i < node.children.length; i++) {
      n.children.push(trimNode(node.children[i], scope, simulate));
    }
    return n;
  }
};

trimEvalMap["RANGE"] = trimEvalMap["POWER"];
trimEvalMap["TRUE"] = function () {
  return true;
};
trimEvalMap["FALSE"] = function () {
  return false;
};
/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["STRING"] = function (node, scope, simulate) {
  let sub = node.origText.substr(1, node.origText.length - 2);
  let s;
  if (node.origText[0] === "\"") {
    s = sub.replace(/\\\\/g, "\\\\TEMPTXT\\\\").replace(/\\"/g, "\"").replace(/\\'/g, "'").replace(/\\t/g, "\t").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\\\TEMPTXT\\\\/g, "\\");
  } else {
    s = sub.replace(/\n/, "\\n");
  }
  // eslint-disable-next-line
  s = new String(s);
  // @ts-ignore
  s.vector = new Vector([], simulate, [], simulate.varBank.get("stringbase"));
  return s;
};
trimEvalMap["INTEGER"] = function (node) {
  return new Material(+node.text);
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["MATERIAL"] = function (node, scope, simulate) {
  let x = trimNode(node.children[1], scope, simulate);
  let units = evaluateUnits(node.children[0]);
  let exponents = [], names = [];
  for (let i = 0; i < units.length; i++) {
    let j = names.indexOf(units[i].id);
    if (j === -1) {
      exponents.push(units[i].exponent);
      names.push(units[i].id);
    } else {
      exponents[j] = exponents[j] + units[i].exponent;
    }
  }
  if (x instanceof Material) {
    if (x.units) {
      throw new ModelError("Cannot create material where numeric part itself has units.", {
        code: 7055
      });
    }
    return new Material(x.value, simulate.unitManager.getUnitStore(names, exponents, true));
  } else {
    let m = new TreeNode(node.origText, "MATERIAL", node.position);
    m.children = [x, simulate.unitManager.getUnitStore(names, exponents, true)];
    return m;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["MULT"] = function (node, scope, simulate) {

  if (!node.children.length) {
    return "*";
  }

  let lhs = trimNode(node.children[0], scope, simulate);
  let rhs = trimNode(node.children[1], scope, simulate);
  if (isConst(lhs) && isConst(rhs)) {
    return mult(lhs, rhs);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    n.children = [lhs, rhs];
    return n;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["DIV"] = function (node, scope, simulate) {
  let lhs = trimNode(node.children[0], scope, simulate);
  let rhs = trimNode(node.children[1], scope, simulate);
  if (isConst(lhs) && isConst(rhs)) {
    return div(lhs, rhs);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    n.children = [lhs, rhs];
    return n;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["PLUS"] = function (node, scope, simulate) {
  let lhs = trimNode(node.children[0], scope, simulate);
  let rhs = trimNode(node.children[1], scope, simulate);
  if (isConst(lhs) && isConst(rhs)) {
    return plus(lhs, rhs);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    n.children = [lhs, rhs];
    return n;
  }
};


/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["MINUS"] = function (node, scope, simulate) {
  let lhs = trimNode(node.children[0], scope, simulate);
  let rhs = trimNode(node.children[1], scope, simulate);
  if (isConst(lhs) && isConst(rhs)) {
    return minus(lhs, rhs);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    n.children = [lhs, rhs];
    return n;
  }
};

trimEvalMap["FLOAT"] = trimEvalMap["INTEGER"];

/**
 * @param {TreeNode} node
 * @param {Map} scope
 */
trimEvalMap["PRIMITIVE"] = function (node, scope) {
  let res;
  if (node.text.substr(0, 2) === "[[") {
    res = new PrimitiveStore(scope.get(node.text.substr(2, node.text.length - 4)), "totalValue");
  } else {
    res = new PrimitiveStore(scope.get(node.text.substr(1, node.text.length - 2)), "object");
  }
  if (res.primitive === undefined) {
    throw new ModelError(`The primitive <i>${toHTML(node.origText)}</i> could not be found.`, {
      code: 7056
    });
  }
  return res;
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["NEGATE"] = function (node, scope, simulate) {
  if (!node.children.length) {
    return new TreeNode(node.origText, node.typeName, node.position);
  }
  let x = trimNode(node.children[0], scope, simulate);
  if (isConst(x)) {
    return negate(x);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    n.children = [x];
    return n;
  }
};

/**
 * @param {TreeNode} node
 * @param {Map} scope
 * @param {import("../Simulator").Simulator} simulate
 */
trimEvalMap["ARRAY"] = function (node, scope, simulate) {
  let n = new TreeNode(node.origText, node.typeName, node.position);
  let vals = [];
  let names = [];
  let hasName = false;
  for (let i = 0; i < node.children.length; i++) {
    n.children.push(trimNode(node.children[i], scope, simulate));
    vals.push(n.children[i].children[0]);
    if (n.children[i].children.length > 1) {
      if (n.children[i].children[1].text) {
        names.push(n.children[i].children[1].origText);
      } else {
        names.push(n.children[i].children[1].valueOf());
      }
      hasName = true;
    } else {
      names.push(undefined);
    }
  }

  let allConst = true;
  for (let i = 0; i < vals.length; i++) {
    if (!isConst(vals[i])) {
      allConst = false;
      break;
    }
  }

  if (allConst) {
    n.children = [new Vector(vals, simulate, hasName ? names : undefined)];
  }
  return n;
};

function isConst(x) {
  if (x instanceof Material || typeof x === "string" || x instanceof String || typeof x === "boolean" || x instanceof Vector) {
    return true;
  }
  return false;
}

/**
 * @param {TreeNode} node
 * @param {Map} primitives
 * @param {import("../Simulator").Simulator} simulate
 */
function trimNode(node, primitives, simulate) {
  if (node.typeName in trimEvalMap) {
    simulate.evaluatingPosition = node.position || simulate.evaluatingPosition;
    return trimEvalMap[node.typeName](node, primitives, simulate);
  } else {
    let n = new TreeNode(node.origText, node.typeName, node.position);
    for (let i = 0; i < node.children.length; i++) {
      n.children.push(trimNode(node.children[i], primitives, simulate));
    }
    return n;
  }
}


export function trueValue(q) {
  if (typeof q === "boolean") {
    return q;
  } else if (q instanceof Material) {
    return neq(q.value, 0);
  } else if (q instanceof Vector) {
    throw new ModelError("Cannot convert a Vector to a boolean.", {
      code: 7057
    });
  } else if (typeof q === "string" || q instanceof String) {
    throw new ModelError("Cannot convert a String to a boolean.", {
      code: 7058
    });
  } else {
    throw new ModelError("Only numbers can be used in place of booleans.", {
      code: 7059
    });
  }
}
