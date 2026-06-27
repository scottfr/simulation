// eslint-disable
// @ts-nocheck

import * as antlr from "../../../vendor/antlr4ng-all.js";
export class FormulaParser extends antlr.Parser {
    static COMMENT = 1;
    static LINE_COMMENT = 2;
    static R__ = 3;
    static R_ = 4;
    static NEWLINES = 5;
    static WHILESTATEMENT = 6;
    static FORSTATEMENT = 7;
    static FROMSTATEMENT = 8;
    static INSTATEMENT = 9;
    static TOSTATEMENT = 10;
    static BYSTATEMENT = 11;
    static LOOPSTATEMENT = 12;
    static IFSTATEMENT = 13;
    static THENSTATEMENT = 14;
    static ELSESTATEMENT = 15;
    static FUNCTIONSTATEMENT = 16;
    static ENDPREFIX = 17;
    static ENDBLOCK = 18;
    static RETURNSTATEMENT = 19;
    static NEWSTATEMENT = 20;
    static TRYSTATEMENT = 21;
    static CATCHSTATEMENT = 22;
    static THROWSTATEMENT = 23;
    static LPAREN = 24;
    static COMMA = 25;
    static RPAREN = 26;
    static ASSIGN = 27;
    static DOT = 28;
    static COLON = 29;
    static OR = 30;
    static XOR = 31;
    static AND = 32;
    static EQUALS = 33;
    static NOTEQUALS = 34;
    static LT = 35;
    static LTEQ = 36;
    static GT = 37;
    static GTEQ = 38;
    static PLUS = 39;
    static MINUS = 40;
    static MULT = 41;
    static DIV = 42;
    static MOD = 43;
    static POW = 44;
    static NOT = 45;
    static LARR = 46;
    static RARR = 47;
    static LCURL = 48;
    static RCURL = 49;
    static BOOL = 50;
    static PER = 51;
    static SQUARED = 52;
    static CUBED = 53;
    static LBRACKET = 54;
    static RBRACKET = 55;
    static IDENT = 56;
    static PRIMITIVE = 57;
    static INTEGER = 58;
    static FLOAT = 59;
    static STRING = 60;
    static RULE_lines = 0;
    static RULE_expression = 1;
    static RULE_returnExp = 2;
    static RULE_innerBlock = 3;
    static RULE_whileLoop = 4;
    static RULE_forLoop = 5;
    static RULE_forInLoop = 6;
    static RULE_ifThenElse = 7;
    static RULE_functionDef = 8;
    static RULE_tryCatch = 9;
    static RULE_throwExp = 10;
    static RULE_anonFunctionDef = 11;
    static RULE_assignment = 12;
    static RULE_assigned = 13;
    static RULE_logicalExpression = 14;
    static RULE_booleanXORExpression = 15;
    static RULE_booleanAndExpression = 16;
    static RULE_equalityExpression = 17;
    static RULE_relationalExpression = 18;
    static RULE_additiveExpression = 19;
    static RULE_multiplicativeExpression = 20;
    static RULE_arrayExpression = 21;
    static RULE_negationExpression = 22;
    static RULE_powerExpression = 23;
    static RULE_unaryOrNegate = 24;
    static RULE_unaryExpression = 25;
    static RULE_innerPrimaryExpression = 26;
    static RULE_selectionExpression = 27;
    static RULE_funCall = 28;
    static RULE_primaryExpression = 29;
    static RULE_value = 30;
    static RULE_symbolRef = 31;
    static RULE_memberSymbolRef = 32;
    static RULE_primitiveRef = 33;
    static RULE_typeRef = 34;
    static RULE_material = 35;
    static RULE_array = 36;
    static RULE_newObject = 37;
    static RULE_defaultValue = 38;
    static RULE_selector = 39;
    static RULE_minarray = 40;
    static RULE_dotselector = 41;
    static RULE_arrayName = 42;
    static RULE_label = 43;
    static RULE_number = 44;
    static RULE_negnumber = 45;
    static RULE_string = 46;
    static RULE_unitMultiplicativeExpression = 47;
    static RULE_unitInnerMultiplicativeExpression = 48;
    static RULE_unitClump = 49;
    static RULE_unitPowerExpression = 50;
    static RULE_unit = 51;
    static RULE_unitRef = 52;
    static literalNames = [
        null, null, null, null, null, null, "'while'", "'for'", "'from'",
        "'in'", "'to'", "'by'", "'loop'", "'if'", "'then'", "'else'", "'function'",
        null, "'end'", "'return'", "'new'", "'try'", "'catch'", "'throw'",
        "'('", "','", "')'", "'<-'", "'.'", "':'", null, "'xor'", null,
        null, null, "'<'", "'<='", "'>'", "'>='", "'+'", "'-'", "'*'", "'/'",
        null, "'^'", null, null, null, "'{'", "'}'", null, "'per'", "'squared'",
        "'cubed'", "'['", "']'"
    ];
    static symbolicNames = [
        null, "COMMENT", "LINE_COMMENT", "R__", "R_", "NEWLINES", "WHILESTATEMENT",
        "FORSTATEMENT", "FROMSTATEMENT", "INSTATEMENT", "TOSTATEMENT", "BYSTATEMENT",
        "LOOPSTATEMENT", "IFSTATEMENT", "THENSTATEMENT", "ELSESTATEMENT",
        "FUNCTIONSTATEMENT", "ENDPREFIX", "ENDBLOCK", "RETURNSTATEMENT",
        "NEWSTATEMENT", "TRYSTATEMENT", "CATCHSTATEMENT", "THROWSTATEMENT",
        "LPAREN", "COMMA", "RPAREN", "ASSIGN", "DOT", "COLON", "OR", "XOR",
        "AND", "EQUALS", "NOTEQUALS", "LT", "LTEQ", "GT", "GTEQ", "PLUS",
        "MINUS", "MULT", "DIV", "MOD", "POW", "NOT", "LARR", "RARR", "LCURL",
        "RCURL", "BOOL", "PER", "SQUARED", "CUBED", "LBRACKET", "RBRACKET",
        "IDENT", "PRIMITIVE", "INTEGER", "FLOAT", "STRING"
    ];
    static ruleNames = [
        "lines", "expression", "returnExp", "innerBlock", "whileLoop", "forLoop",
        "forInLoop", "ifThenElse", "functionDef", "tryCatch", "throwExp",
        "anonFunctionDef", "assignment", "assigned", "logicalExpression",
        "booleanXORExpression", "booleanAndExpression", "equalityExpression",
        "relationalExpression", "additiveExpression", "multiplicativeExpression",
        "arrayExpression", "negationExpression", "powerExpression", "unaryOrNegate",
        "unaryExpression", "innerPrimaryExpression", "selectionExpression",
        "funCall", "primaryExpression", "value", "symbolRef", "memberSymbolRef",
        "primitiveRef", "typeRef", "material", "array", "newObject", "defaultValue",
        "selector", "minarray", "dotselector", "arrayName", "label", "number",
        "negnumber", "string", "unitMultiplicativeExpression", "unitInnerMultiplicativeExpression",
        "unitClump", "unitPowerExpression", "unit", "unitRef",
    ];
    get grammarFileName() { return "Formula.g"; }
    get literalNames() { return FormulaParser.literalNames; }
    get symbolicNames() { return FormulaParser.symbolicNames; }
    get ruleNames() { return FormulaParser.ruleNames; }
    get serializedATN() { return FormulaParser._serializedATN; }
    createFailedPredicateException(predicate, message) {
        return new antlr.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, FormulaParser._ATN, FormulaParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    lines() {
        let localContext = new LinesContext(this.context, this.state);
        this.enterRule(localContext, 0, FormulaParser.RULE_lines);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                {
                    this.state = 109;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 3 || _la === 4) {
                        {
                            {
                                this.state = 106;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 3 || _la === 4)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                        this.state = 111;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 130;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 28909760) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2032993) !== 0)) {
                    {
                        this.state = 112;
                        this.expression();
                        this.state = 121;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                    {
                                        this.state = 114;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        do {
                                            {
                                                {
                                                    this.state = 113;
                                                    this.match(FormulaParser.R__);
                                                }
                                            }
                                            this.state = 116;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        } while (_la === 3);
                                        this.state = 118;
                                        this.expression();
                                    }
                                }
                            }
                            this.state = 123;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                        }
                        {
                            this.state = 127;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 124;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 129;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                    }
                }
                this.state = 132;
                this.match(FormulaParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    expression() {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 2, FormulaParser.RULE_expression);
        try {
            this.state = 144;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context)) {
                case 1:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 134;
                        this.assignment();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 135;
                        this.logicalExpression();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localContext, 3);
                    {
                        this.state = 136;
                        this.whileLoop();
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localContext, 4);
                    {
                        this.state = 137;
                        this.forLoop();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(localContext, 5);
                    {
                        this.state = 138;
                        this.forInLoop();
                    }
                    break;
                case 6:
                    this.enterOuterAlt(localContext, 6);
                    {
                        this.state = 139;
                        this.ifThenElse();
                    }
                    break;
                case 7:
                    this.enterOuterAlt(localContext, 7);
                    {
                        this.state = 140;
                        this.functionDef();
                    }
                    break;
                case 8:
                    this.enterOuterAlt(localContext, 8);
                    {
                        this.state = 141;
                        this.returnExp();
                    }
                    break;
                case 9:
                    this.enterOuterAlt(localContext, 9);
                    {
                        this.state = 142;
                        this.tryCatch();
                    }
                    break;
                case 10:
                    this.enterOuterAlt(localContext, 10);
                    {
                        this.state = 143;
                        this.throwExp();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    returnExp() {
        let localContext = new ReturnExpContext(this.context, this.state);
        this.enterRule(localContext, 4, FormulaParser.RULE_returnExp);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 146;
                this.match(FormulaParser.RETURNSTATEMENT);
                {
                    this.state = 150;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 147;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 152;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 153;
                this.logicalExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    innerBlock() {
        let localContext = new InnerBlockContext(this.context, this.state);
        this.enterRule(localContext, 6, FormulaParser.RULE_innerBlock);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                {
                    this.state = 158;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                                {
                                    this.state = 155;
                                    _la = this.tokenStream.LA(1);
                                    if (!(_la === 3 || _la === 4)) {
                                        this.errorHandler.recoverInline(this);
                                    }
                                    else {
                                        this.errorHandler.reportMatch(this);
                                        this.consume();
                                    }
                                }
                            }
                        }
                        this.state = 160;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                    }
                }
                this.state = 179;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 28909760) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 2032993) !== 0)) {
                    {
                        this.state = 161;
                        this.expression();
                        this.state = 170;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                    {
                                        this.state = 163;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        do {
                                            {
                                                {
                                                    this.state = 162;
                                                    this.match(FormulaParser.R__);
                                                }
                                            }
                                            this.state = 165;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        } while (_la === 3);
                                        this.state = 167;
                                        this.expression();
                                    }
                                }
                            }
                            this.state = 172;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
                        }
                        {
                            this.state = 176;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
                            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                if (alternative === 1) {
                                    {
                                        {
                                            this.state = 173;
                                            _la = this.tokenStream.LA(1);
                                            if (!(_la === 3 || _la === 4)) {
                                                this.errorHandler.recoverInline(this);
                                            }
                                            else {
                                                this.errorHandler.reportMatch(this);
                                                this.consume();
                                            }
                                        }
                                    }
                                }
                                this.state = 178;
                                this.errorHandler.sync(this);
                                alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
                            }
                        }
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    whileLoop() {
        let localContext = new WhileLoopContext(this.context, this.state);
        this.enterRule(localContext, 8, FormulaParser.RULE_whileLoop);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 181;
                this.match(FormulaParser.WHILESTATEMENT);
                {
                    this.state = 185;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 182;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 187;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 188;
                this.logicalExpression();
                {
                    this.state = 189;
                    this.match(FormulaParser.R__);
                    this.state = 190;
                    this.innerBlock();
                }
                this.state = 192;
                this.match(FormulaParser.R__);
                this.state = 193;
                this.match(FormulaParser.ENDPREFIX);
                this.state = 194;
                this.match(FormulaParser.LOOPSTATEMENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    forLoop() {
        let localContext = new ForLoopContext(this.context, this.state);
        this.enterRule(localContext, 10, FormulaParser.RULE_forLoop);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 196;
                this.match(FormulaParser.FORSTATEMENT);
                this.state = 197;
                this.match(FormulaParser.R_);
                this.state = 198;
                this.match(FormulaParser.IDENT);
                this.state = 199;
                this.match(FormulaParser.R_);
                this.state = 200;
                this.match(FormulaParser.FROMSTATEMENT);
                {
                    this.state = 204;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 201;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 206;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 207;
                this.logicalExpression();
                {
                    this.state = 211;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 208;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 213;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 214;
                this.match(FormulaParser.TOSTATEMENT);
                {
                    this.state = 218;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 215;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 220;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 221;
                this.logicalExpression();
                this.state = 236;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4 || _la === 11) {
                    {
                        {
                            this.state = 225;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 222;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 227;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 228;
                        this.match(FormulaParser.BYSTATEMENT);
                        {
                            this.state = 232;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 229;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 234;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 235;
                        this.logicalExpression();
                    }
                }
                this.state = 240;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
                    case 1:
                        {
                            this.state = 238;
                            this.match(FormulaParser.R__);
                            this.state = 239;
                            this.innerBlock();
                        }
                        break;
                }
                this.state = 242;
                this.match(FormulaParser.R__);
                this.state = 243;
                this.match(FormulaParser.ENDPREFIX);
                this.state = 244;
                this.match(FormulaParser.LOOPSTATEMENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    forInLoop() {
        let localContext = new ForInLoopContext(this.context, this.state);
        this.enterRule(localContext, 12, FormulaParser.RULE_forInLoop);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 246;
                this.match(FormulaParser.FORSTATEMENT);
                this.state = 247;
                this.match(FormulaParser.R_);
                this.state = 248;
                this.match(FormulaParser.IDENT);
                this.state = 249;
                this.match(FormulaParser.R_);
                this.state = 250;
                this.match(FormulaParser.INSTATEMENT);
                {
                    this.state = 254;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 251;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 256;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 257;
                this.logicalExpression();
                this.state = 260;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context)) {
                    case 1:
                        {
                            this.state = 258;
                            this.match(FormulaParser.R__);
                            this.state = 259;
                            this.innerBlock();
                        }
                        break;
                }
                this.state = 262;
                this.match(FormulaParser.R__);
                this.state = 263;
                this.match(FormulaParser.ENDPREFIX);
                this.state = 264;
                this.match(FormulaParser.LOOPSTATEMENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    ifThenElse() {
        let localContext = new IfThenElseContext(this.context, this.state);
        this.enterRule(localContext, 14, FormulaParser.RULE_ifThenElse);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 266;
                this.match(FormulaParser.IFSTATEMENT);
                {
                    this.state = 270;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 267;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 272;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 273;
                this.logicalExpression();
                {
                    this.state = 277;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                                {
                                    this.state = 274;
                                    _la = this.tokenStream.LA(1);
                                    if (!(_la === 3 || _la === 4)) {
                                        this.errorHandler.recoverInline(this);
                                    }
                                    else {
                                        this.errorHandler.reportMatch(this);
                                        this.consume();
                                    }
                                }
                            }
                        }
                        this.state = 279;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                    }
                }
                this.state = 281;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 14) {
                    {
                        this.state = 280;
                        this.match(FormulaParser.THENSTATEMENT);
                    }
                }
                this.state = 285;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
                    case 1:
                        {
                            this.state = 283;
                            this.match(FormulaParser.R__);
                            this.state = 284;
                            this.innerBlock();
                        }
                        break;
                }
                this.state = 313;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                this.state = 287;
                                this.match(FormulaParser.R__);
                                this.state = 288;
                                this.match(FormulaParser.ELSESTATEMENT);
                                this.state = 289;
                                this.match(FormulaParser.R_);
                                this.state = 290;
                                this.match(FormulaParser.IFSTATEMENT);
                                {
                                    this.state = 294;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 291;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 296;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 297;
                                this.logicalExpression();
                                {
                                    this.state = 301;
                                    this.errorHandler.sync(this);
                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
                                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                        if (alternative === 1) {
                                            {
                                                {
                                                    this.state = 298;
                                                    _la = this.tokenStream.LA(1);
                                                    if (!(_la === 3 || _la === 4)) {
                                                        this.errorHandler.recoverInline(this);
                                                    }
                                                    else {
                                                        this.errorHandler.reportMatch(this);
                                                        this.consume();
                                                    }
                                                }
                                            }
                                        }
                                        this.state = 303;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
                                    }
                                }
                                this.state = 305;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                                if (_la === 14) {
                                    {
                                        this.state = 304;
                                        this.match(FormulaParser.THENSTATEMENT);
                                    }
                                }
                                this.state = 309;
                                this.errorHandler.sync(this);
                                switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context)) {
                                    case 1:
                                        {
                                            this.state = 307;
                                            this.match(FormulaParser.R__);
                                            this.state = 308;
                                            this.innerBlock();
                                        }
                                        break;
                                }
                            }
                        }
                    }
                    this.state = 315;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
                }
                this.state = 322;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context)) {
                    case 1:
                        {
                            this.state = 316;
                            this.match(FormulaParser.R__);
                            this.state = 317;
                            this.match(FormulaParser.ELSESTATEMENT);
                            this.state = 320;
                            this.errorHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context)) {
                                case 1:
                                    {
                                        this.state = 318;
                                        this.match(FormulaParser.R__);
                                        this.state = 319;
                                        this.innerBlock();
                                    }
                                    break;
                            }
                        }
                        break;
                }
                this.state = 324;
                this.match(FormulaParser.R__);
                this.state = 325;
                this.match(FormulaParser.ENDPREFIX);
                this.state = 326;
                this.match(FormulaParser.IFSTATEMENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    functionDef() {
        let localContext = new FunctionDefContext(this.context, this.state);
        this.enterRule(localContext, 16, FormulaParser.RULE_functionDef);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 328;
                this.match(FormulaParser.FUNCTIONSTATEMENT);
                this.state = 329;
                this.match(FormulaParser.R_);
                this.state = 330;
                this.match(FormulaParser.IDENT);
                {
                    this.state = 334;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 331;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 336;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 337;
                this.match(FormulaParser.LPAREN);
                this.state = 413;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context)) {
                    case 1:
                        {
                            {
                                this.state = 341;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                                while (_la === 4) {
                                    {
                                        {
                                            this.state = 338;
                                            this.match(FormulaParser.R_);
                                        }
                                    }
                                    this.state = 343;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                }
                            }
                            this.state = 344;
                            this.match(FormulaParser.IDENT);
                            this.state = 378;
                            this.errorHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
                                case 1:
                                    {
                                        {
                                            this.state = 348;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 345;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 350;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 351;
                                        this.match(FormulaParser.EQUALS);
                                        {
                                            this.state = 355;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 352;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 357;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 358;
                                        this.defaultValue();
                                    }
                                    break;
                                case 2:
                                    {
                                        this.state = 375;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
                                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                            if (alternative === 1) {
                                                {
                                                    {
                                                        {
                                                            this.state = 362;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                            while (_la === 4) {
                                                                {
                                                                    {
                                                                        this.state = 359;
                                                                        this.match(FormulaParser.R_);
                                                                    }
                                                                }
                                                                this.state = 364;
                                                                this.errorHandler.sync(this);
                                                                _la = this.tokenStream.LA(1);
                                                            }
                                                        }
                                                        this.state = 365;
                                                        this.match(FormulaParser.COMMA);
                                                        {
                                                            this.state = 369;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                            while (_la === 4) {
                                                                {
                                                                    {
                                                                        this.state = 366;
                                                                        this.match(FormulaParser.R_);
                                                                    }
                                                                }
                                                                this.state = 371;
                                                                this.errorHandler.sync(this);
                                                                _la = this.tokenStream.LA(1);
                                                            }
                                                        }
                                                        this.state = 372;
                                                        this.match(FormulaParser.IDENT);
                                                    }
                                                }
                                            }
                                            this.state = 377;
                                            this.errorHandler.sync(this);
                                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
                                        }
                                    }
                                    break;
                            }
                            this.state = 410;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
                            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                if (alternative === 1) {
                                    {
                                        {
                                            {
                                                this.state = 383;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 380;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 385;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 386;
                                            this.match(FormulaParser.COMMA);
                                            {
                                                this.state = 390;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 387;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 392;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 393;
                                            this.match(FormulaParser.IDENT);
                                            {
                                                this.state = 397;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 394;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 399;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 400;
                                            this.match(FormulaParser.EQUALS);
                                            {
                                                this.state = 404;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 401;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 406;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 407;
                                            this.defaultValue();
                                        }
                                    }
                                }
                                this.state = 412;
                                this.errorHandler.sync(this);
                                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
                            }
                        }
                        break;
                }
                {
                    this.state = 418;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 415;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 420;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 421;
                this.match(FormulaParser.RPAREN);
                this.state = 424;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context)) {
                    case 1:
                        {
                            this.state = 422;
                            this.match(FormulaParser.R__);
                            this.state = 423;
                            this.innerBlock();
                        }
                        break;
                }
                this.state = 426;
                this.match(FormulaParser.R__);
                this.state = 427;
                this.match(FormulaParser.ENDPREFIX);
                this.state = 428;
                this.match(FormulaParser.FUNCTIONSTATEMENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    tryCatch() {
        let localContext = new TryCatchContext(this.context, this.state);
        this.enterRule(localContext, 18, FormulaParser.RULE_tryCatch);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 430;
                this.match(FormulaParser.TRYSTATEMENT);
                this.state = 433;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context)) {
                    case 1:
                        {
                            this.state = 431;
                            this.match(FormulaParser.R__);
                            this.state = 432;
                            this.innerBlock();
                        }
                        break;
                }
                this.state = 435;
                this.match(FormulaParser.R__);
                this.state = 436;
                this.match(FormulaParser.CATCHSTATEMENT);
                this.state = 437;
                this.match(FormulaParser.R_);
                this.state = 438;
                this.match(FormulaParser.IDENT);
                this.state = 441;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context)) {
                    case 1:
                        {
                            this.state = 439;
                            this.match(FormulaParser.R__);
                            this.state = 440;
                            this.innerBlock();
                        }
                        break;
                }
                this.state = 443;
                this.match(FormulaParser.R__);
                this.state = 444;
                this.match(FormulaParser.ENDPREFIX);
                this.state = 445;
                this.match(FormulaParser.TRYSTATEMENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    throwExp() {
        let localContext = new ThrowExpContext(this.context, this.state);
        this.enterRule(localContext, 20, FormulaParser.RULE_throwExp);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 447;
                this.match(FormulaParser.THROWSTATEMENT);
                this.state = 448;
                this.match(FormulaParser.R_);
                this.state = 449;
                this.primaryExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    anonFunctionDef() {
        let localContext = new AnonFunctionDefContext(this.context, this.state);
        this.enterRule(localContext, 22, FormulaParser.RULE_anonFunctionDef);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 451;
                this.match(FormulaParser.FUNCTIONSTATEMENT);
                {
                    this.state = 455;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 452;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 457;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 458;
                this.match(FormulaParser.LPAREN);
                this.state = 534;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context)) {
                    case 1:
                        {
                            {
                                this.state = 462;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                                while (_la === 4) {
                                    {
                                        {
                                            this.state = 459;
                                            this.match(FormulaParser.R_);
                                        }
                                    }
                                    this.state = 464;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                }
                            }
                            this.state = 465;
                            this.match(FormulaParser.IDENT);
                            this.state = 499;
                            this.errorHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context)) {
                                case 1:
                                    {
                                        {
                                            this.state = 469;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 466;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 471;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 472;
                                        this.match(FormulaParser.EQUALS);
                                        {
                                            this.state = 476;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 473;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 478;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 479;
                                        this.defaultValue();
                                    }
                                    break;
                                case 2:
                                    {
                                        this.state = 496;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
                                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                            if (alternative === 1) {
                                                {
                                                    {
                                                        {
                                                            this.state = 483;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                            while (_la === 4) {
                                                                {
                                                                    {
                                                                        this.state = 480;
                                                                        this.match(FormulaParser.R_);
                                                                    }
                                                                }
                                                                this.state = 485;
                                                                this.errorHandler.sync(this);
                                                                _la = this.tokenStream.LA(1);
                                                            }
                                                        }
                                                        this.state = 486;
                                                        this.match(FormulaParser.COMMA);
                                                        {
                                                            this.state = 490;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                            while (_la === 4) {
                                                                {
                                                                    {
                                                                        this.state = 487;
                                                                        this.match(FormulaParser.R_);
                                                                    }
                                                                }
                                                                this.state = 492;
                                                                this.errorHandler.sync(this);
                                                                _la = this.tokenStream.LA(1);
                                                            }
                                                        }
                                                        this.state = 493;
                                                        this.match(FormulaParser.IDENT);
                                                    }
                                                }
                                            }
                                            this.state = 498;
                                            this.errorHandler.sync(this);
                                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
                                        }
                                    }
                                    break;
                            }
                            this.state = 531;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
                            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                if (alternative === 1) {
                                    {
                                        {
                                            {
                                                this.state = 504;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 501;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 506;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 507;
                                            this.match(FormulaParser.COMMA);
                                            {
                                                this.state = 511;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 508;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 513;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 514;
                                            this.match(FormulaParser.IDENT);
                                            {
                                                this.state = 518;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 515;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 520;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 521;
                                            this.match(FormulaParser.EQUALS);
                                            {
                                                this.state = 525;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 522;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 527;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 528;
                                            this.defaultValue();
                                        }
                                    }
                                }
                                this.state = 533;
                                this.errorHandler.sync(this);
                                alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
                            }
                        }
                        break;
                }
                {
                    this.state = 539;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 536;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 541;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 542;
                this.match(FormulaParser.RPAREN);
                this.state = 557;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                    case FormulaParser.R__:
                        {
                            {
                                this.state = 545;
                                this.errorHandler.sync(this);
                                switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context)) {
                                    case 1:
                                        {
                                            this.state = 543;
                                            this.match(FormulaParser.R__);
                                            this.state = 544;
                                            this.innerBlock();
                                        }
                                        break;
                                }
                                this.state = 547;
                                this.match(FormulaParser.R__);
                                this.state = 548;
                                this.match(FormulaParser.ENDPREFIX);
                                this.state = 549;
                                this.match(FormulaParser.FUNCTIONSTATEMENT);
                            }
                        }
                        break;
                    case FormulaParser.R_:
                    case FormulaParser.WHILESTATEMENT:
                    case FormulaParser.FORSTATEMENT:
                    case FormulaParser.IFSTATEMENT:
                    case FormulaParser.FUNCTIONSTATEMENT:
                    case FormulaParser.RETURNSTATEMENT:
                    case FormulaParser.NEWSTATEMENT:
                    case FormulaParser.TRYSTATEMENT:
                    case FormulaParser.THROWSTATEMENT:
                    case FormulaParser.LPAREN:
                    case FormulaParser.MINUS:
                    case FormulaParser.NOT:
                    case FormulaParser.LARR:
                    case FormulaParser.LCURL:
                    case FormulaParser.BOOL:
                    case FormulaParser.IDENT:
                    case FormulaParser.PRIMITIVE:
                    case FormulaParser.INTEGER:
                    case FormulaParser.FLOAT:
                    case FormulaParser.STRING:
                        {
                            {
                                this.state = 553;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                                while (_la === 4) {
                                    {
                                        {
                                            this.state = 550;
                                            this.match(FormulaParser.R_);
                                        }
                                    }
                                    this.state = 555;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                }
                            }
                            this.state = 556;
                            this.expression();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    assignment() {
        let localContext = new AssignmentContext(this.context, this.state);
        this.enterRule(localContext, 24, FormulaParser.RULE_assignment);
        let _la;
        try {
            let alternative;
            this.state = 706;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context)) {
                case 1:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 559;
                        this.match(FormulaParser.IDENT);
                        {
                            this.state = 563;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 560;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 565;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 566;
                        this.match(FormulaParser.LPAREN);
                        this.state = 642;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context)) {
                            case 1:
                                {
                                    {
                                        this.state = 570;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        while (_la === 4) {
                                            {
                                                {
                                                    this.state = 567;
                                                    this.match(FormulaParser.R_);
                                                }
                                            }
                                            this.state = 572;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        }
                                    }
                                    this.state = 573;
                                    this.match(FormulaParser.IDENT);
                                    this.state = 607;
                                    this.errorHandler.sync(this);
                                    switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context)) {
                                        case 1:
                                            {
                                                {
                                                    this.state = 577;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                    while (_la === 4) {
                                                        {
                                                            {
                                                                this.state = 574;
                                                                this.match(FormulaParser.R_);
                                                            }
                                                        }
                                                        this.state = 579;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                    }
                                                }
                                                this.state = 580;
                                                this.match(FormulaParser.EQUALS);
                                                {
                                                    this.state = 584;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                    while (_la === 4) {
                                                        {
                                                            {
                                                                this.state = 581;
                                                                this.match(FormulaParser.R_);
                                                            }
                                                        }
                                                        this.state = 586;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                    }
                                                }
                                                this.state = 587;
                                                this.defaultValue();
                                            }
                                            break;
                                        case 2:
                                            {
                                                this.state = 604;
                                                this.errorHandler.sync(this);
                                                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                                                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                                    if (alternative === 1) {
                                                        {
                                                            {
                                                                {
                                                                    this.state = 591;
                                                                    this.errorHandler.sync(this);
                                                                    _la = this.tokenStream.LA(1);
                                                                    while (_la === 4) {
                                                                        {
                                                                            {
                                                                                this.state = 588;
                                                                                this.match(FormulaParser.R_);
                                                                            }
                                                                        }
                                                                        this.state = 593;
                                                                        this.errorHandler.sync(this);
                                                                        _la = this.tokenStream.LA(1);
                                                                    }
                                                                }
                                                                this.state = 594;
                                                                this.match(FormulaParser.COMMA);
                                                                {
                                                                    this.state = 598;
                                                                    this.errorHandler.sync(this);
                                                                    _la = this.tokenStream.LA(1);
                                                                    while (_la === 4) {
                                                                        {
                                                                            {
                                                                                this.state = 595;
                                                                                this.match(FormulaParser.R_);
                                                                            }
                                                                        }
                                                                        this.state = 600;
                                                                        this.errorHandler.sync(this);
                                                                        _la = this.tokenStream.LA(1);
                                                                    }
                                                                }
                                                                this.state = 601;
                                                                this.match(FormulaParser.IDENT);
                                                            }
                                                        }
                                                    }
                                                    this.state = 606;
                                                    this.errorHandler.sync(this);
                                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                                                }
                                            }
                                            break;
                                    }
                                    this.state = 639;
                                    this.errorHandler.sync(this);
                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
                                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                        if (alternative === 1) {
                                            {
                                                {
                                                    {
                                                        this.state = 612;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 4) {
                                                            {
                                                                {
                                                                    this.state = 609;
                                                                    this.match(FormulaParser.R_);
                                                                }
                                                            }
                                                            this.state = 614;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 615;
                                                    this.match(FormulaParser.COMMA);
                                                    {
                                                        this.state = 619;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 4) {
                                                            {
                                                                {
                                                                    this.state = 616;
                                                                    this.match(FormulaParser.R_);
                                                                }
                                                            }
                                                            this.state = 621;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 622;
                                                    this.match(FormulaParser.IDENT);
                                                    {
                                                        this.state = 626;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 4) {
                                                            {
                                                                {
                                                                    this.state = 623;
                                                                    this.match(FormulaParser.R_);
                                                                }
                                                            }
                                                            this.state = 628;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 629;
                                                    this.match(FormulaParser.EQUALS);
                                                    {
                                                        this.state = 633;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 4) {
                                                            {
                                                                {
                                                                    this.state = 630;
                                                                    this.match(FormulaParser.R_);
                                                                }
                                                            }
                                                            this.state = 635;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 636;
                                                    this.defaultValue();
                                                }
                                            }
                                        }
                                        this.state = 641;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
                                    }
                                }
                                break;
                        }
                        {
                            this.state = 647;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 644;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 649;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 650;
                        this.match(FormulaParser.RPAREN);
                        {
                            this.state = 654;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 651;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 656;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 657;
                        this.match(FormulaParser.ASSIGN);
                        {
                            this.state = 661;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 658;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 663;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 664;
                        this.logicalExpression();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 667;
                        this.errorHandler.sync(this);
                        switch (this.tokenStream.LA(1)) {
                            case FormulaParser.PRIMITIVE:
                                {
                                    this.state = 665;
                                    this.primitiveRef();
                                }
                                break;
                            case FormulaParser.IDENT:
                                {
                                    this.state = 666;
                                    this.assigned();
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                        }
                        this.state = 688;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                    {
                                        {
                                            this.state = 672;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 669;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 674;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 675;
                                        this.match(FormulaParser.COMMA);
                                        {
                                            this.state = 679;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 676;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 681;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 684;
                                        this.errorHandler.sync(this);
                                        switch (this.tokenStream.LA(1)) {
                                            case FormulaParser.PRIMITIVE:
                                                {
                                                    this.state = 682;
                                                    this.primitiveRef();
                                                }
                                                break;
                                            case FormulaParser.IDENT:
                                                {
                                                    this.state = 683;
                                                    this.assigned();
                                                }
                                                break;
                                            default:
                                                throw new antlr.NoViableAltException(this);
                                        }
                                    }
                                }
                            }
                            this.state = 690;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                        }
                        {
                            this.state = 694;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 691;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 696;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 697;
                        this.match(FormulaParser.ASSIGN);
                        {
                            this.state = 701;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 698;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 703;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 704;
                        this.logicalExpression();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    assigned() {
        let localContext = new AssignedContext(this.context, this.state);
        this.enterRule(localContext, 26, FormulaParser.RULE_assigned);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 708;
                this.match(FormulaParser.IDENT);
                this.state = 710;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 1310721) !== 0)) {
                    {
                        this.state = 709;
                        this.selector();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    logicalExpression() {
        let localContext = new LogicalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 28, FormulaParser.RULE_logicalExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 712;
                this.booleanXORExpression();
                this.state = 729;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 97, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 716;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 713;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 718;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 719;
                                this.match(FormulaParser.OR);
                                {
                                    this.state = 723;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 720;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 725;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 726;
                                this.booleanXORExpression();
                            }
                        }
                    }
                    this.state = 731;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 97, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    booleanXORExpression() {
        let localContext = new BooleanXORExpressionContext(this.context, this.state);
        this.enterRule(localContext, 30, FormulaParser.RULE_booleanXORExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 732;
                this.booleanAndExpression();
                this.state = 749;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 100, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 736;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 733;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 738;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 739;
                                this.match(FormulaParser.XOR);
                                {
                                    this.state = 743;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 740;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 745;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 746;
                                this.booleanAndExpression();
                            }
                        }
                    }
                    this.state = 751;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 100, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    booleanAndExpression() {
        let localContext = new BooleanAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 32, FormulaParser.RULE_booleanAndExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 752;
                this.equalityExpression();
                this.state = 769;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 103, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 756;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 753;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 758;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 759;
                                this.match(FormulaParser.AND);
                                {
                                    this.state = 763;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 760;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 765;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 766;
                                this.equalityExpression();
                            }
                        }
                    }
                    this.state = 771;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 103, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    equalityExpression() {
        let localContext = new EqualityExpressionContext(this.context, this.state);
        this.enterRule(localContext, 34, FormulaParser.RULE_equalityExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 772;
                this.relationalExpression();
                this.state = 789;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 106, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 776;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 773;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 778;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 779;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 33 || _la === 34)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                {
                                    this.state = 783;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 780;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 785;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 786;
                                this.relationalExpression();
                            }
                        }
                    }
                    this.state = 791;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 106, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    relationalExpression() {
        let localContext = new RelationalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 36, FormulaParser.RULE_relationalExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 792;
                this.additiveExpression();
                this.state = 809;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 109, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 796;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 793;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 798;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 799;
                                _la = this.tokenStream.LA(1);
                                if (!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 15) !== 0))) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                {
                                    this.state = 803;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 800;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 805;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 806;
                                this.additiveExpression();
                            }
                        }
                    }
                    this.state = 811;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 109, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    additiveExpression() {
        let localContext = new AdditiveExpressionContext(this.context, this.state);
        this.enterRule(localContext, 38, FormulaParser.RULE_additiveExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 812;
                this.multiplicativeExpression();
                this.state = 829;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 112, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 816;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 813;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 818;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 819;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 39 || _la === 40)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                {
                                    this.state = 823;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 820;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 825;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 826;
                                this.multiplicativeExpression();
                            }
                        }
                    }
                    this.state = 831;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 112, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    multiplicativeExpression() {
        let localContext = new MultiplicativeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 40, FormulaParser.RULE_multiplicativeExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 832;
                this.arrayExpression();
                this.state = 849;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 115, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 836;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 833;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 838;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 839;
                                _la = this.tokenStream.LA(1);
                                if (!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 7) !== 0))) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                {
                                    this.state = 843;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 840;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 845;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 846;
                                this.arrayExpression();
                            }
                        }
                    }
                    this.state = 851;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 115, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    arrayExpression() {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 42, FormulaParser.RULE_arrayExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 852;
                this.negationExpression();
                this.state = 855;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context)) {
                    case 1:
                        {
                            this.state = 853;
                            this.match(FormulaParser.COLON);
                            this.state = 854;
                            this.negationExpression();
                        }
                        break;
                }
                this.state = 859;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context)) {
                    case 1:
                        {
                            this.state = 857;
                            this.match(FormulaParser.COLON);
                            this.state = 858;
                            this.negationExpression();
                        }
                        break;
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    negationExpression() {
        let localContext = new NegationExpressionContext(this.context, this.state);
        this.enterRule(localContext, 44, FormulaParser.RULE_negationExpression);
        let _la;
        try {
            this.state = 870;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.MINUS:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 861;
                        this.match(FormulaParser.MINUS);
                        {
                            this.state = 865;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 862;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 867;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 868;
                        this.powerExpression();
                    }
                    break;
                case FormulaParser.FUNCTIONSTATEMENT:
                case FormulaParser.NEWSTATEMENT:
                case FormulaParser.LPAREN:
                case FormulaParser.NOT:
                case FormulaParser.LARR:
                case FormulaParser.LCURL:
                case FormulaParser.BOOL:
                case FormulaParser.IDENT:
                case FormulaParser.PRIMITIVE:
                case FormulaParser.INTEGER:
                case FormulaParser.FLOAT:
                case FormulaParser.STRING:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 869;
                        this.powerExpression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    powerExpression() {
        let localContext = new PowerExpressionContext(this.context, this.state);
        this.enterRule(localContext, 46, FormulaParser.RULE_powerExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 872;
                this.unaryExpression();
                this.state = 889;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 122, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 876;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 873;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 878;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 879;
                                this.match(FormulaParser.POW);
                                {
                                    this.state = 883;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 880;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 885;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 886;
                                this.unaryOrNegate();
                            }
                        }
                    }
                    this.state = 891;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 122, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unaryOrNegate() {
        let localContext = new UnaryOrNegateContext(this.context, this.state);
        this.enterRule(localContext, 48, FormulaParser.RULE_unaryOrNegate);
        let _la;
        try {
            this.state = 901;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.MINUS:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 892;
                        this.match(FormulaParser.MINUS);
                        {
                            this.state = 896;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 893;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 898;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 899;
                        this.unaryExpression();
                    }
                    break;
                case FormulaParser.FUNCTIONSTATEMENT:
                case FormulaParser.NEWSTATEMENT:
                case FormulaParser.LPAREN:
                case FormulaParser.NOT:
                case FormulaParser.LARR:
                case FormulaParser.LCURL:
                case FormulaParser.BOOL:
                case FormulaParser.IDENT:
                case FormulaParser.PRIMITIVE:
                case FormulaParser.INTEGER:
                case FormulaParser.FLOAT:
                case FormulaParser.STRING:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 900;
                        this.unaryExpression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unaryExpression() {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 50, FormulaParser.RULE_unaryExpression);
        let _la;
        try {
            this.state = 912;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.NOT:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 903;
                        this.match(FormulaParser.NOT);
                        {
                            this.state = 907;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 904;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 909;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 910;
                        this.innerPrimaryExpression();
                    }
                    break;
                case FormulaParser.FUNCTIONSTATEMENT:
                case FormulaParser.NEWSTATEMENT:
                case FormulaParser.LPAREN:
                case FormulaParser.LARR:
                case FormulaParser.LCURL:
                case FormulaParser.BOOL:
                case FormulaParser.IDENT:
                case FormulaParser.PRIMITIVE:
                case FormulaParser.INTEGER:
                case FormulaParser.FLOAT:
                case FormulaParser.STRING:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 911;
                        this.innerPrimaryExpression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    innerPrimaryExpression() {
        let localContext = new InnerPrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 52, FormulaParser.RULE_innerPrimaryExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 914;
                this.selectionExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    selectionExpression() {
        let localContext = new SelectionExpressionContext(this.context, this.state);
        this.enterRule(localContext, 54, FormulaParser.RULE_selectionExpression);
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 916;
                this.primaryExpression();
                this.state = 921;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 128, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            this.state = 919;
                            this.errorHandler.sync(this);
                            switch (this.tokenStream.LA(1)) {
                                case FormulaParser.DOT:
                                case FormulaParser.LARR:
                                case FormulaParser.LCURL:
                                    {
                                        this.state = 917;
                                        this.selector();
                                    }
                                    break;
                                case FormulaParser.LPAREN:
                                    {
                                        this.state = 918;
                                        this.funCall();
                                    }
                                    break;
                                default:
                                    throw new antlr.NoViableAltException(this);
                            }
                        }
                    }
                    this.state = 923;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 128, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    funCall() {
        let localContext = new FunCallContext(this.context, this.state);
        this.enterRule(localContext, 56, FormulaParser.RULE_funCall);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 924;
                this.match(FormulaParser.LPAREN);
                this.state = 951;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 133, this.context)) {
                    case 1:
                        {
                            {
                                this.state = 928;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                                while (_la === 4) {
                                    {
                                        {
                                            this.state = 925;
                                            this.match(FormulaParser.R_);
                                        }
                                    }
                                    this.state = 930;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                }
                            }
                            this.state = 931;
                            this.logicalExpression();
                            this.state = 948;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 132, this.context);
                            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                if (alternative === 1) {
                                    {
                                        {
                                            {
                                                this.state = 935;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 932;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 937;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 938;
                                            this.match(FormulaParser.COMMA);
                                            {
                                                this.state = 942;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 939;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 944;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 945;
                                            this.logicalExpression();
                                        }
                                    }
                                }
                                this.state = 950;
                                this.errorHandler.sync(this);
                                alternative = this.interpreter.adaptivePredict(this.tokenStream, 132, this.context);
                            }
                        }
                        break;
                }
                {
                    this.state = 956;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 953;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 958;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 959;
                this.match(FormulaParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    primaryExpression() {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 58, FormulaParser.RULE_primaryExpression);
        let _la;
        try {
            this.state = 978;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.LPAREN:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 961;
                        this.match(FormulaParser.LPAREN);
                        {
                            this.state = 965;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 962;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 967;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 968;
                        this.logicalExpression();
                        {
                            this.state = 972;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 969;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 974;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 975;
                        this.match(FormulaParser.RPAREN);
                    }
                    break;
                case FormulaParser.FUNCTIONSTATEMENT:
                case FormulaParser.NEWSTATEMENT:
                case FormulaParser.LARR:
                case FormulaParser.LCURL:
                case FormulaParser.BOOL:
                case FormulaParser.IDENT:
                case FormulaParser.PRIMITIVE:
                case FormulaParser.INTEGER:
                case FormulaParser.FLOAT:
                case FormulaParser.STRING:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 977;
                        this.value();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    value() {
        let localContext = new ValueContext(this.context, this.state);
        this.enterRule(localContext, 60, FormulaParser.RULE_value);
        try {
            this.state = 989;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context)) {
                case 1:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 980;
                        this.number_();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 981;
                        this.match(FormulaParser.BOOL);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localContext, 3);
                    {
                        this.state = 982;
                        this.string_();
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localContext, 4);
                    {
                        this.state = 983;
                        this.material();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(localContext, 5);
                    {
                        this.state = 984;
                        this.symbolRef();
                    }
                    break;
                case 6:
                    this.enterOuterAlt(localContext, 6);
                    {
                        this.state = 985;
                        this.primitiveRef();
                    }
                    break;
                case 7:
                    this.enterOuterAlt(localContext, 7);
                    {
                        this.state = 986;
                        this.array();
                    }
                    break;
                case 8:
                    this.enterOuterAlt(localContext, 8);
                    {
                        this.state = 987;
                        this.anonFunctionDef();
                    }
                    break;
                case 9:
                    this.enterOuterAlt(localContext, 9);
                    {
                        this.state = 988;
                        this.newObject();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    symbolRef() {
        let localContext = new SymbolRefContext(this.context, this.state);
        this.enterRule(localContext, 62, FormulaParser.RULE_symbolRef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 991;
                this.match(FormulaParser.IDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    memberSymbolRef() {
        let localContext = new MemberSymbolRefContext(this.context, this.state);
        this.enterRule(localContext, 64, FormulaParser.RULE_memberSymbolRef);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 993;
                _la = this.tokenStream.LA(1);
                if (!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 557057) !== 0))) {
                    this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    primitiveRef() {
        let localContext = new PrimitiveRefContext(this.context, this.state);
        this.enterRule(localContext, 66, FormulaParser.RULE_primitiveRef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 995;
                this.match(FormulaParser.PRIMITIVE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    typeRef() {
        let localContext = new TypeRefContext(this.context, this.state);
        this.enterRule(localContext, 68, FormulaParser.RULE_typeRef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 997;
                this.match(FormulaParser.IDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    material() {
        let localContext = new MaterialContext(this.context, this.state);
        this.enterRule(localContext, 70, FormulaParser.RULE_material);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 999;
                this.match(FormulaParser.LCURL);
                {
                    this.state = 1003;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 1000;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 1005;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 1006;
                this.additiveExpression();
                this.state = 1007;
                this.match(FormulaParser.R_);
                this.state = 1008;
                this.unitMultiplicativeExpression();
                {
                    this.state = 1012;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 4) {
                        {
                            {
                                this.state = 1009;
                                this.match(FormulaParser.R_);
                            }
                        }
                        this.state = 1014;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 1015;
                this.match(FormulaParser.RCURL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    array() {
        let localContext = new ArrayContext(this.context, this.state);
        this.enterRule(localContext, 72, FormulaParser.RULE_array);
        let _la;
        try {
            let alternative;
            this.state = 1161;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 165, this.context)) {
                case 1:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 1017;
                        this.match(FormulaParser.LARR);
                        this.state = 1044;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context)) {
                            case 1:
                                {
                                    {
                                        this.state = 1021;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        while (_la === 3 || _la === 4) {
                                            {
                                                {
                                                    this.state = 1018;
                                                    _la = this.tokenStream.LA(1);
                                                    if (!(_la === 3 || _la === 4)) {
                                                        this.errorHandler.recoverInline(this);
                                                    }
                                                    else {
                                                        this.errorHandler.reportMatch(this);
                                                        this.consume();
                                                    }
                                                }
                                            }
                                            this.state = 1023;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        }
                                    }
                                    this.state = 1024;
                                    this.label();
                                    this.state = 1041;
                                    this.errorHandler.sync(this);
                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 144, this.context);
                                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                        if (alternative === 1) {
                                            {
                                                {
                                                    {
                                                        this.state = 1028;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1025;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1030;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1031;
                                                    this.match(FormulaParser.COMMA);
                                                    {
                                                        this.state = 1035;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1032;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1037;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1038;
                                                    this.label();
                                                }
                                            }
                                        }
                                        this.state = 1043;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 144, this.context);
                                    }
                                }
                                break;
                        }
                        {
                            this.state = 1049;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 1046;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 1051;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1052;
                        this.match(FormulaParser.RARR);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 1053;
                        this.match(FormulaParser.LCURL);
                        this.state = 1080;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 151, this.context)) {
                            case 1:
                                {
                                    {
                                        this.state = 1057;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        while (_la === 3 || _la === 4) {
                                            {
                                                {
                                                    this.state = 1054;
                                                    _la = this.tokenStream.LA(1);
                                                    if (!(_la === 3 || _la === 4)) {
                                                        this.errorHandler.recoverInline(this);
                                                    }
                                                    else {
                                                        this.errorHandler.reportMatch(this);
                                                        this.consume();
                                                    }
                                                }
                                            }
                                            this.state = 1059;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        }
                                    }
                                    this.state = 1060;
                                    this.label();
                                    this.state = 1077;
                                    this.errorHandler.sync(this);
                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 150, this.context);
                                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                        if (alternative === 1) {
                                            {
                                                {
                                                    {
                                                        this.state = 1064;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1061;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1066;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1067;
                                                    this.match(FormulaParser.COMMA);
                                                    {
                                                        this.state = 1071;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1068;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1073;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1074;
                                                    this.label();
                                                }
                                            }
                                        }
                                        this.state = 1079;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 150, this.context);
                                    }
                                }
                                break;
                        }
                        {
                            this.state = 1085;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 1082;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 1087;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1088;
                        this.match(FormulaParser.RCURL);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localContext, 3);
                    {
                        this.state = 1089;
                        this.match(FormulaParser.LARR);
                        this.state = 1116;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 157, this.context)) {
                            case 1:
                                {
                                    {
                                        this.state = 1093;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        while (_la === 3 || _la === 4) {
                                            {
                                                {
                                                    this.state = 1090;
                                                    _la = this.tokenStream.LA(1);
                                                    if (!(_la === 3 || _la === 4)) {
                                                        this.errorHandler.recoverInline(this);
                                                    }
                                                    else {
                                                        this.errorHandler.reportMatch(this);
                                                        this.consume();
                                                    }
                                                }
                                            }
                                            this.state = 1095;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        }
                                    }
                                    this.state = 1096;
                                    this.logicalExpression();
                                    this.state = 1113;
                                    this.errorHandler.sync(this);
                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 156, this.context);
                                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                        if (alternative === 1) {
                                            {
                                                {
                                                    {
                                                        this.state = 1100;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1097;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1102;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1103;
                                                    this.match(FormulaParser.COMMA);
                                                    {
                                                        this.state = 1107;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1104;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1109;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1110;
                                                    this.logicalExpression();
                                                }
                                            }
                                        }
                                        this.state = 1115;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 156, this.context);
                                    }
                                }
                                break;
                        }
                        {
                            this.state = 1121;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 1118;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 1123;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1124;
                        this.match(FormulaParser.RARR);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localContext, 4);
                    {
                        this.state = 1125;
                        this.match(FormulaParser.LCURL);
                        this.state = 1152;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 163, this.context)) {
                            case 1:
                                {
                                    {
                                        this.state = 1129;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                        while (_la === 3 || _la === 4) {
                                            {
                                                {
                                                    this.state = 1126;
                                                    _la = this.tokenStream.LA(1);
                                                    if (!(_la === 3 || _la === 4)) {
                                                        this.errorHandler.recoverInline(this);
                                                    }
                                                    else {
                                                        this.errorHandler.reportMatch(this);
                                                        this.consume();
                                                    }
                                                }
                                            }
                                            this.state = 1131;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                        }
                                    }
                                    this.state = 1132;
                                    this.logicalExpression();
                                    this.state = 1149;
                                    this.errorHandler.sync(this);
                                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 162, this.context);
                                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                                        if (alternative === 1) {
                                            {
                                                {
                                                    {
                                                        this.state = 1136;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1133;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1138;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1139;
                                                    this.match(FormulaParser.COMMA);
                                                    {
                                                        this.state = 1143;
                                                        this.errorHandler.sync(this);
                                                        _la = this.tokenStream.LA(1);
                                                        while (_la === 3 || _la === 4) {
                                                            {
                                                                {
                                                                    this.state = 1140;
                                                                    _la = this.tokenStream.LA(1);
                                                                    if (!(_la === 3 || _la === 4)) {
                                                                        this.errorHandler.recoverInline(this);
                                                                    }
                                                                    else {
                                                                        this.errorHandler.reportMatch(this);
                                                                        this.consume();
                                                                    }
                                                                }
                                                            }
                                                            this.state = 1145;
                                                            this.errorHandler.sync(this);
                                                            _la = this.tokenStream.LA(1);
                                                        }
                                                    }
                                                    this.state = 1146;
                                                    this.logicalExpression();
                                                }
                                            }
                                        }
                                        this.state = 1151;
                                        this.errorHandler.sync(this);
                                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 162, this.context);
                                    }
                                }
                                break;
                        }
                        {
                            this.state = 1157;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 3 || _la === 4) {
                                {
                                    {
                                        this.state = 1154;
                                        _la = this.tokenStream.LA(1);
                                        if (!(_la === 3 || _la === 4)) {
                                            this.errorHandler.recoverInline(this);
                                        }
                                        else {
                                            this.errorHandler.reportMatch(this);
                                            this.consume();
                                        }
                                    }
                                }
                                this.state = 1159;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1160;
                        this.match(FormulaParser.RCURL);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    newObject() {
        let localContext = new NewObjectContext(this.context, this.state);
        this.enterRule(localContext, 74, FormulaParser.RULE_newObject);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1163;
                this.match(FormulaParser.NEWSTATEMENT);
                this.state = 1164;
                this.match(FormulaParser.R_);
                this.state = 1165;
                this.typeRef();
                this.state = 1167;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 166, this.context)) {
                    case 1:
                        {
                            this.state = 1166;
                            this.funCall();
                        }
                        break;
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    defaultValue() {
        let localContext = new DefaultValueContext(this.context, this.state);
        this.enterRule(localContext, 76, FormulaParser.RULE_defaultValue);
        try {
            this.state = 1174;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.MINUS:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 1169;
                        this.negnumber();
                    }
                    break;
                case FormulaParser.INTEGER:
                case FormulaParser.FLOAT:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 1170;
                        this.number_();
                    }
                    break;
                case FormulaParser.BOOL:
                    this.enterOuterAlt(localContext, 3);
                    {
                        this.state = 1171;
                        this.match(FormulaParser.BOOL);
                    }
                    break;
                case FormulaParser.STRING:
                    this.enterOuterAlt(localContext, 4);
                    {
                        this.state = 1172;
                        this.string_();
                    }
                    break;
                case FormulaParser.LARR:
                case FormulaParser.LCURL:
                    this.enterOuterAlt(localContext, 5);
                    {
                        this.state = 1173;
                        this.array();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    selector() {
        let localContext = new SelectorContext(this.context, this.state);
        this.enterRule(localContext, 78, FormulaParser.RULE_selector);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1178;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                    case FormulaParser.LARR:
                    case FormulaParser.LCURL:
                        {
                            this.state = 1176;
                            this.minarray();
                        }
                        break;
                    case FormulaParser.DOT:
                        {
                            this.state = 1177;
                            this.dotselector();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    minarray() {
        let localContext = new MinarrayContext(this.context, this.state);
        this.enterRule(localContext, 80, FormulaParser.RULE_minarray);
        let _la;
        try {
            let alternative;
            this.state = 1260;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.LARR:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 1180;
                        this.match(FormulaParser.LARR);
                        {
                            this.state = 1184;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1181;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1186;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1189;
                        this.errorHandler.sync(this);
                        switch (this.tokenStream.LA(1)) {
                            case FormulaParser.FUNCTIONSTATEMENT:
                            case FormulaParser.NEWSTATEMENT:
                            case FormulaParser.LPAREN:
                            case FormulaParser.MINUS:
                            case FormulaParser.NOT:
                            case FormulaParser.LARR:
                            case FormulaParser.LCURL:
                            case FormulaParser.BOOL:
                            case FormulaParser.IDENT:
                            case FormulaParser.PRIMITIVE:
                            case FormulaParser.INTEGER:
                            case FormulaParser.FLOAT:
                            case FormulaParser.STRING:
                                {
                                    this.state = 1187;
                                    this.logicalExpression();
                                }
                                break;
                            case FormulaParser.MULT:
                                {
                                    this.state = 1188;
                                    this.match(FormulaParser.MULT);
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                        }
                        this.state = 1210;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 174, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                    {
                                        {
                                            this.state = 1194;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 1191;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 1196;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 1197;
                                        this.match(FormulaParser.COMMA);
                                        {
                                            this.state = 1201;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 1198;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 1203;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 1206;
                                        this.errorHandler.sync(this);
                                        switch (this.tokenStream.LA(1)) {
                                            case FormulaParser.FUNCTIONSTATEMENT:
                                            case FormulaParser.NEWSTATEMENT:
                                            case FormulaParser.LPAREN:
                                            case FormulaParser.MINUS:
                                            case FormulaParser.NOT:
                                            case FormulaParser.LARR:
                                            case FormulaParser.LCURL:
                                            case FormulaParser.BOOL:
                                            case FormulaParser.IDENT:
                                            case FormulaParser.PRIMITIVE:
                                            case FormulaParser.INTEGER:
                                            case FormulaParser.FLOAT:
                                            case FormulaParser.STRING:
                                                {
                                                    this.state = 1204;
                                                    this.logicalExpression();
                                                }
                                                break;
                                            case FormulaParser.MULT:
                                                {
                                                    this.state = 1205;
                                                    this.match(FormulaParser.MULT);
                                                }
                                                break;
                                            default:
                                                throw new antlr.NoViableAltException(this);
                                        }
                                    }
                                }
                            }
                            this.state = 1212;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 174, this.context);
                        }
                        {
                            this.state = 1216;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1213;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1218;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1219;
                        this.match(FormulaParser.RARR);
                    }
                    break;
                case FormulaParser.LCURL:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 1220;
                        this.match(FormulaParser.LCURL);
                        {
                            this.state = 1224;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1221;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1226;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1229;
                        this.errorHandler.sync(this);
                        switch (this.tokenStream.LA(1)) {
                            case FormulaParser.FUNCTIONSTATEMENT:
                            case FormulaParser.NEWSTATEMENT:
                            case FormulaParser.LPAREN:
                            case FormulaParser.MINUS:
                            case FormulaParser.NOT:
                            case FormulaParser.LARR:
                            case FormulaParser.LCURL:
                            case FormulaParser.BOOL:
                            case FormulaParser.IDENT:
                            case FormulaParser.PRIMITIVE:
                            case FormulaParser.INTEGER:
                            case FormulaParser.FLOAT:
                            case FormulaParser.STRING:
                                {
                                    this.state = 1227;
                                    this.logicalExpression();
                                }
                                break;
                            case FormulaParser.MULT:
                                {
                                    this.state = 1228;
                                    this.match(FormulaParser.MULT);
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                        }
                        this.state = 1250;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 181, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                    {
                                        {
                                            this.state = 1234;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 1231;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 1236;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 1237;
                                        this.match(FormulaParser.COMMA);
                                        {
                                            this.state = 1241;
                                            this.errorHandler.sync(this);
                                            _la = this.tokenStream.LA(1);
                                            while (_la === 4) {
                                                {
                                                    {
                                                        this.state = 1238;
                                                        this.match(FormulaParser.R_);
                                                    }
                                                }
                                                this.state = 1243;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                            }
                                        }
                                        this.state = 1246;
                                        this.errorHandler.sync(this);
                                        switch (this.tokenStream.LA(1)) {
                                            case FormulaParser.FUNCTIONSTATEMENT:
                                            case FormulaParser.NEWSTATEMENT:
                                            case FormulaParser.LPAREN:
                                            case FormulaParser.MINUS:
                                            case FormulaParser.NOT:
                                            case FormulaParser.LARR:
                                            case FormulaParser.LCURL:
                                            case FormulaParser.BOOL:
                                            case FormulaParser.IDENT:
                                            case FormulaParser.PRIMITIVE:
                                            case FormulaParser.INTEGER:
                                            case FormulaParser.FLOAT:
                                            case FormulaParser.STRING:
                                                {
                                                    this.state = 1244;
                                                    this.logicalExpression();
                                                }
                                                break;
                                            case FormulaParser.MULT:
                                                {
                                                    this.state = 1245;
                                                    this.match(FormulaParser.MULT);
                                                }
                                                break;
                                            default:
                                                throw new antlr.NoViableAltException(this);
                                        }
                                    }
                                }
                            }
                            this.state = 1252;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 181, this.context);
                        }
                        {
                            this.state = 1256;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1253;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1258;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1259;
                        this.match(FormulaParser.RCURL);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    dotselector() {
        let localContext = new DotselectorContext(this.context, this.state);
        this.enterRule(localContext, 82, FormulaParser.RULE_dotselector);
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1264;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                        case 1:
                            {
                                {
                                    this.state = 1262;
                                    this.match(FormulaParser.DOT);
                                    this.state = 1263;
                                    this.memberSymbolRef();
                                }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                    }
                    this.state = 1266;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 184, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    arrayName() {
        let localContext = new ArrayNameContext(this.context, this.state);
        this.enterRule(localContext, 84, FormulaParser.RULE_arrayName);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1268;
                _la = this.tokenStream.LA(1);
                if (!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 557057) !== 0))) {
                    this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    label() {
        let localContext = new LabelContext(this.context, this.state);
        this.enterRule(localContext, 86, FormulaParser.RULE_label);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1270;
                this.arrayName();
                {
                    this.state = 1274;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 3 || _la === 4) {
                        {
                            {
                                this.state = 1271;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 3 || _la === 4)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                        this.state = 1276;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 1277;
                this.match(FormulaParser.COLON);
                {
                    this.state = 1281;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 3 || _la === 4) {
                        {
                            {
                                this.state = 1278;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 3 || _la === 4)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                        this.state = 1283;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                }
                this.state = 1284;
                this.logicalExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    number_() {
        let localContext = new NumberContext(this.context, this.state);
        this.enterRule(localContext, 88, FormulaParser.RULE_number);
        let _la;
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1286;
                _la = this.tokenStream.LA(1);
                if (!(_la === 58 || _la === 59)) {
                    this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    negnumber() {
        let localContext = new NegnumberContext(this.context, this.state);
        this.enterRule(localContext, 90, FormulaParser.RULE_negnumber);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1288;
                this.match(FormulaParser.MINUS);
                this.state = 1289;
                this.number_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    string_() {
        let localContext = new StringContext(this.context, this.state);
        this.enterRule(localContext, 92, FormulaParser.RULE_string);
        try {
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1291;
                this.match(FormulaParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unitMultiplicativeExpression() {
        let localContext = new UnitMultiplicativeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 94, FormulaParser.RULE_unitMultiplicativeExpression);
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1293;
                this.unitInnerMultiplicativeExpression();
                this.state = 1300;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 187, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                this.state = 1294;
                                this.match(FormulaParser.R_);
                                this.state = 1295;
                                this.match(FormulaParser.PER);
                                this.state = 1296;
                                this.match(FormulaParser.R_);
                                this.state = 1297;
                                this.unitInnerMultiplicativeExpression();
                            }
                        }
                    }
                    this.state = 1302;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 187, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unitInnerMultiplicativeExpression() {
        let localContext = new UnitInnerMultiplicativeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 96, FormulaParser.RULE_unitInnerMultiplicativeExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1303;
                this.unitClump();
                this.state = 1320;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 190, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 1307;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 1304;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 1309;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 1310;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 41 || _la === 42)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                {
                                    this.state = 1314;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 1311;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 1316;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 1317;
                                this.unitClump();
                            }
                        }
                    }
                    this.state = 1322;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 190, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unitClump() {
        let localContext = new UnitClumpContext(this.context, this.state);
        this.enterRule(localContext, 98, FormulaParser.RULE_unitClump);
        let _la;
        try {
            this.state = 1356;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.INTEGER:
                    this.enterOuterAlt(localContext, 1);
                    {
                        {
                            this.state = 1323;
                            this.match(FormulaParser.INTEGER);
                            {
                                this.state = 1327;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                                while (_la === 4) {
                                    {
                                        {
                                            this.state = 1324;
                                            this.match(FormulaParser.R_);
                                        }
                                    }
                                    this.state = 1329;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                }
                            }
                            this.state = 1330;
                            this.match(FormulaParser.DIV);
                        }
                        {
                            this.state = 1335;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1332;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1337;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1338;
                        this.unitPowerExpression();
                        this.state = 1341;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 193, this.context)) {
                            case 1:
                                {
                                    this.state = 1339;
                                    this.match(FormulaParser.R_);
                                    this.state = 1340;
                                    this.match(FormulaParser.CUBED);
                                }
                                break;
                        }
                        this.state = 1345;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 194, this.context)) {
                            case 1:
                                {
                                    this.state = 1343;
                                    this.match(FormulaParser.R_);
                                    this.state = 1344;
                                    this.match(FormulaParser.SQUARED);
                                }
                                break;
                        }
                    }
                    break;
                case FormulaParser.LPAREN:
                case FormulaParser.IDENT:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 1347;
                        this.unitPowerExpression();
                        this.state = 1350;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 195, this.context)) {
                            case 1:
                                {
                                    this.state = 1348;
                                    this.match(FormulaParser.R_);
                                    this.state = 1349;
                                    this.match(FormulaParser.CUBED);
                                }
                                break;
                        }
                        this.state = 1354;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 196, this.context)) {
                            case 1:
                                {
                                    this.state = 1352;
                                    this.match(FormulaParser.R_);
                                    this.state = 1353;
                                    this.match(FormulaParser.SQUARED);
                                }
                                break;
                        }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unitPowerExpression() {
        let localContext = new UnitPowerExpressionContext(this.context, this.state);
        this.enterRule(localContext, 100, FormulaParser.RULE_unitPowerExpression);
        let _la;
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1358;
                this.unit();
                this.state = 1384;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 202, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                {
                                    this.state = 1362;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 1359;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 1364;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 1365;
                                this.match(FormulaParser.POW);
                                this.state = 1373;
                                this.errorHandler.sync(this);
                                switch (this.interpreter.adaptivePredict(this.tokenStream, 200, this.context)) {
                                    case 1:
                                        {
                                            {
                                                this.state = 1369;
                                                this.errorHandler.sync(this);
                                                _la = this.tokenStream.LA(1);
                                                while (_la === 4) {
                                                    {
                                                        {
                                                            this.state = 1366;
                                                            this.match(FormulaParser.R_);
                                                        }
                                                    }
                                                    this.state = 1371;
                                                    this.errorHandler.sync(this);
                                                    _la = this.tokenStream.LA(1);
                                                }
                                            }
                                            this.state = 1372;
                                            this.match(FormulaParser.MINUS);
                                        }
                                        break;
                                }
                                {
                                    this.state = 1378;
                                    this.errorHandler.sync(this);
                                    _la = this.tokenStream.LA(1);
                                    while (_la === 4) {
                                        {
                                            {
                                                this.state = 1375;
                                                this.match(FormulaParser.R_);
                                            }
                                        }
                                        this.state = 1380;
                                        this.errorHandler.sync(this);
                                        _la = this.tokenStream.LA(1);
                                    }
                                }
                                this.state = 1381;
                                _la = this.tokenStream.LA(1);
                                if (!(_la === 58 || _la === 59)) {
                                    this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                    }
                    this.state = 1386;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 202, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unit() {
        let localContext = new UnitContext(this.context, this.state);
        this.enterRule(localContext, 102, FormulaParser.RULE_unit);
        let _la;
        try {
            this.state = 1404;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
                case FormulaParser.IDENT:
                    this.enterOuterAlt(localContext, 1);
                    {
                        this.state = 1387;
                        this.unitRef();
                    }
                    break;
                case FormulaParser.LPAREN:
                    this.enterOuterAlt(localContext, 2);
                    {
                        this.state = 1388;
                        this.match(FormulaParser.LPAREN);
                        {
                            this.state = 1392;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1389;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1394;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1395;
                        this.unitMultiplicativeExpression();
                        {
                            this.state = 1399;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            while (_la === 4) {
                                {
                                    {
                                        this.state = 1396;
                                        this.match(FormulaParser.R_);
                                    }
                                }
                                this.state = 1401;
                                this.errorHandler.sync(this);
                                _la = this.tokenStream.LA(1);
                            }
                        }
                        this.state = 1402;
                        this.match(FormulaParser.RPAREN);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    unitRef() {
        let localContext = new UnitRefContext(this.context, this.state);
        this.enterRule(localContext, 104, FormulaParser.RULE_unitRef);
        try {
            let alternative;
            this.enterOuterAlt(localContext, 1);
            {
                this.state = 1406;
                this.match(FormulaParser.IDENT);
                this.state = 1411;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 206, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                            {
                                this.state = 1407;
                                this.match(FormulaParser.R_);
                                this.state = 1408;
                                this.match(FormulaParser.IDENT);
                            }
                        }
                    }
                    this.state = 1413;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 206, this.context);
                }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    static _serializedATN = [
        4, 1, 60, 1415, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
        7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7,
        13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2,
        20, 7, 20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7,
        26, 2, 27, 7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2,
        33, 7, 33, 2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7, 38, 2, 39, 7,
        39, 2, 40, 7, 40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 2, 45, 7, 45, 2,
        46, 7, 46, 2, 47, 7, 47, 2, 48, 7, 48, 2, 49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7,
        52, 1, 0, 5, 0, 108, 8, 0, 10, 0, 12, 0, 111, 9, 0, 1, 0, 1, 0, 4, 0, 115, 8, 0, 11, 0, 12,
        0, 116, 1, 0, 5, 0, 120, 8, 0, 10, 0, 12, 0, 123, 9, 0, 1, 0, 5, 0, 126, 8, 0, 10, 0, 12,
        0, 129, 9, 0, 3, 0, 131, 8, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 3, 1, 145, 8, 1, 1, 2, 1, 2, 5, 2, 149, 8, 2, 10, 2, 12, 2, 152, 9, 2, 1, 2, 1, 2,
        1, 3, 5, 3, 157, 8, 3, 10, 3, 12, 3, 160, 9, 3, 1, 3, 1, 3, 4, 3, 164, 8, 3, 11, 3, 12, 3,
        165, 1, 3, 5, 3, 169, 8, 3, 10, 3, 12, 3, 172, 9, 3, 1, 3, 5, 3, 175, 8, 3, 10, 3, 12, 3,
        178, 9, 3, 3, 3, 180, 8, 3, 1, 4, 1, 4, 5, 4, 184, 8, 4, 10, 4, 12, 4, 187, 9, 4, 1, 4, 1,
        4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 203, 8, 5, 10,
        5, 12, 5, 206, 9, 5, 1, 5, 1, 5, 5, 5, 210, 8, 5, 10, 5, 12, 5, 213, 9, 5, 1, 5, 1, 5, 5, 5,
        217, 8, 5, 10, 5, 12, 5, 220, 9, 5, 1, 5, 1, 5, 5, 5, 224, 8, 5, 10, 5, 12, 5, 227, 9, 5,
        1, 5, 1, 5, 5, 5, 231, 8, 5, 10, 5, 12, 5, 234, 9, 5, 1, 5, 3, 5, 237, 8, 5, 1, 5, 1, 5, 3,
        5, 241, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 5, 6, 253, 8, 6, 10,
        6, 12, 6, 256, 9, 6, 1, 6, 1, 6, 1, 6, 3, 6, 261, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 1, 7, 5,
        7, 269, 8, 7, 10, 7, 12, 7, 272, 9, 7, 1, 7, 1, 7, 5, 7, 276, 8, 7, 10, 7, 12, 7, 279, 9,
        7, 1, 7, 3, 7, 282, 8, 7, 1, 7, 1, 7, 3, 7, 286, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 5, 7, 293,
        8, 7, 10, 7, 12, 7, 296, 9, 7, 1, 7, 1, 7, 5, 7, 300, 8, 7, 10, 7, 12, 7, 303, 9, 7, 1, 7,
        3, 7, 306, 8, 7, 1, 7, 1, 7, 3, 7, 310, 8, 7, 5, 7, 312, 8, 7, 10, 7, 12, 7, 315, 9, 7, 1,
        7, 1, 7, 1, 7, 1, 7, 3, 7, 321, 8, 7, 3, 7, 323, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1,
        8, 1, 8, 5, 8, 333, 8, 8, 10, 8, 12, 8, 336, 9, 8, 1, 8, 1, 8, 5, 8, 340, 8, 8, 10, 8, 12,
        8, 343, 9, 8, 1, 8, 1, 8, 5, 8, 347, 8, 8, 10, 8, 12, 8, 350, 9, 8, 1, 8, 1, 8, 5, 8, 354,
        8, 8, 10, 8, 12, 8, 357, 9, 8, 1, 8, 1, 8, 5, 8, 361, 8, 8, 10, 8, 12, 8, 364, 9, 8, 1, 8,
        1, 8, 5, 8, 368, 8, 8, 10, 8, 12, 8, 371, 9, 8, 1, 8, 5, 8, 374, 8, 8, 10, 8, 12, 8, 377,
        9, 8, 3, 8, 379, 8, 8, 1, 8, 5, 8, 382, 8, 8, 10, 8, 12, 8, 385, 9, 8, 1, 8, 1, 8, 5, 8, 389,
        8, 8, 10, 8, 12, 8, 392, 9, 8, 1, 8, 1, 8, 5, 8, 396, 8, 8, 10, 8, 12, 8, 399, 9, 8, 1, 8,
        1, 8, 5, 8, 403, 8, 8, 10, 8, 12, 8, 406, 9, 8, 1, 8, 5, 8, 409, 8, 8, 10, 8, 12, 8, 412,
        9, 8, 3, 8, 414, 8, 8, 1, 8, 5, 8, 417, 8, 8, 10, 8, 12, 8, 420, 9, 8, 1, 8, 1, 8, 1, 8, 3,
        8, 425, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 3, 9, 434, 8, 9, 1, 9, 1, 9, 1, 9, 1,
        9, 1, 9, 1, 9, 3, 9, 442, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10, 1, 11, 1,
        11, 5, 11, 454, 8, 11, 10, 11, 12, 11, 457, 9, 11, 1, 11, 1, 11, 5, 11, 461, 8, 11, 10,
        11, 12, 11, 464, 9, 11, 1, 11, 1, 11, 5, 11, 468, 8, 11, 10, 11, 12, 11, 471, 9, 11, 1,
        11, 1, 11, 5, 11, 475, 8, 11, 10, 11, 12, 11, 478, 9, 11, 1, 11, 1, 11, 5, 11, 482, 8,
        11, 10, 11, 12, 11, 485, 9, 11, 1, 11, 1, 11, 5, 11, 489, 8, 11, 10, 11, 12, 11, 492,
        9, 11, 1, 11, 5, 11, 495, 8, 11, 10, 11, 12, 11, 498, 9, 11, 3, 11, 500, 8, 11, 1, 11,
        5, 11, 503, 8, 11, 10, 11, 12, 11, 506, 9, 11, 1, 11, 1, 11, 5, 11, 510, 8, 11, 10, 11,
        12, 11, 513, 9, 11, 1, 11, 1, 11, 5, 11, 517, 8, 11, 10, 11, 12, 11, 520, 9, 11, 1, 11,
        1, 11, 5, 11, 524, 8, 11, 10, 11, 12, 11, 527, 9, 11, 1, 11, 5, 11, 530, 8, 11, 10, 11,
        12, 11, 533, 9, 11, 3, 11, 535, 8, 11, 1, 11, 5, 11, 538, 8, 11, 10, 11, 12, 11, 541,
        9, 11, 1, 11, 1, 11, 1, 11, 3, 11, 546, 8, 11, 1, 11, 1, 11, 1, 11, 1, 11, 5, 11, 552, 8,
        11, 10, 11, 12, 11, 555, 9, 11, 1, 11, 3, 11, 558, 8, 11, 1, 12, 1, 12, 5, 12, 562, 8,
        12, 10, 12, 12, 12, 565, 9, 12, 1, 12, 1, 12, 5, 12, 569, 8, 12, 10, 12, 12, 12, 572,
        9, 12, 1, 12, 1, 12, 5, 12, 576, 8, 12, 10, 12, 12, 12, 579, 9, 12, 1, 12, 1, 12, 5, 12,
        583, 8, 12, 10, 12, 12, 12, 586, 9, 12, 1, 12, 1, 12, 5, 12, 590, 8, 12, 10, 12, 12, 12,
        593, 9, 12, 1, 12, 1, 12, 5, 12, 597, 8, 12, 10, 12, 12, 12, 600, 9, 12, 1, 12, 5, 12,
        603, 8, 12, 10, 12, 12, 12, 606, 9, 12, 3, 12, 608, 8, 12, 1, 12, 5, 12, 611, 8, 12, 10,
        12, 12, 12, 614, 9, 12, 1, 12, 1, 12, 5, 12, 618, 8, 12, 10, 12, 12, 12, 621, 9, 12, 1,
        12, 1, 12, 5, 12, 625, 8, 12, 10, 12, 12, 12, 628, 9, 12, 1, 12, 1, 12, 5, 12, 632, 8,
        12, 10, 12, 12, 12, 635, 9, 12, 1, 12, 5, 12, 638, 8, 12, 10, 12, 12, 12, 641, 9, 12,
        3, 12, 643, 8, 12, 1, 12, 5, 12, 646, 8, 12, 10, 12, 12, 12, 649, 9, 12, 1, 12, 1, 12,
        5, 12, 653, 8, 12, 10, 12, 12, 12, 656, 9, 12, 1, 12, 1, 12, 5, 12, 660, 8, 12, 10, 12,
        12, 12, 663, 9, 12, 1, 12, 1, 12, 1, 12, 3, 12, 668, 8, 12, 1, 12, 5, 12, 671, 8, 12, 10,
        12, 12, 12, 674, 9, 12, 1, 12, 1, 12, 5, 12, 678, 8, 12, 10, 12, 12, 12, 681, 9, 12, 1,
        12, 1, 12, 3, 12, 685, 8, 12, 5, 12, 687, 8, 12, 10, 12, 12, 12, 690, 9, 12, 1, 12, 5,
        12, 693, 8, 12, 10, 12, 12, 12, 696, 9, 12, 1, 12, 1, 12, 5, 12, 700, 8, 12, 10, 12, 12,
        12, 703, 9, 12, 1, 12, 1, 12, 3, 12, 707, 8, 12, 1, 13, 1, 13, 3, 13, 711, 8, 13, 1, 14,
        1, 14, 5, 14, 715, 8, 14, 10, 14, 12, 14, 718, 9, 14, 1, 14, 1, 14, 5, 14, 722, 8, 14,
        10, 14, 12, 14, 725, 9, 14, 1, 14, 5, 14, 728, 8, 14, 10, 14, 12, 14, 731, 9, 14, 1, 15,
        1, 15, 5, 15, 735, 8, 15, 10, 15, 12, 15, 738, 9, 15, 1, 15, 1, 15, 5, 15, 742, 8, 15,
        10, 15, 12, 15, 745, 9, 15, 1, 15, 5, 15, 748, 8, 15, 10, 15, 12, 15, 751, 9, 15, 1, 16,
        1, 16, 5, 16, 755, 8, 16, 10, 16, 12, 16, 758, 9, 16, 1, 16, 1, 16, 5, 16, 762, 8, 16,
        10, 16, 12, 16, 765, 9, 16, 1, 16, 5, 16, 768, 8, 16, 10, 16, 12, 16, 771, 9, 16, 1, 17,
        1, 17, 5, 17, 775, 8, 17, 10, 17, 12, 17, 778, 9, 17, 1, 17, 1, 17, 5, 17, 782, 8, 17,
        10, 17, 12, 17, 785, 9, 17, 1, 17, 5, 17, 788, 8, 17, 10, 17, 12, 17, 791, 9, 17, 1, 18,
        1, 18, 5, 18, 795, 8, 18, 10, 18, 12, 18, 798, 9, 18, 1, 18, 1, 18, 5, 18, 802, 8, 18,
        10, 18, 12, 18, 805, 9, 18, 1, 18, 5, 18, 808, 8, 18, 10, 18, 12, 18, 811, 9, 18, 1, 19,
        1, 19, 5, 19, 815, 8, 19, 10, 19, 12, 19, 818, 9, 19, 1, 19, 1, 19, 5, 19, 822, 8, 19,
        10, 19, 12, 19, 825, 9, 19, 1, 19, 5, 19, 828, 8, 19, 10, 19, 12, 19, 831, 9, 19, 1, 20,
        1, 20, 5, 20, 835, 8, 20, 10, 20, 12, 20, 838, 9, 20, 1, 20, 1, 20, 5, 20, 842, 8, 20,
        10, 20, 12, 20, 845, 9, 20, 1, 20, 5, 20, 848, 8, 20, 10, 20, 12, 20, 851, 9, 20, 1, 21,
        1, 21, 1, 21, 3, 21, 856, 8, 21, 1, 21, 1, 21, 3, 21, 860, 8, 21, 1, 22, 1, 22, 5, 22, 864,
        8, 22, 10, 22, 12, 22, 867, 9, 22, 1, 22, 1, 22, 3, 22, 871, 8, 22, 1, 23, 1, 23, 5, 23,
        875, 8, 23, 10, 23, 12, 23, 878, 9, 23, 1, 23, 1, 23, 5, 23, 882, 8, 23, 10, 23, 12, 23,
        885, 9, 23, 1, 23, 5, 23, 888, 8, 23, 10, 23, 12, 23, 891, 9, 23, 1, 24, 1, 24, 5, 24,
        895, 8, 24, 10, 24, 12, 24, 898, 9, 24, 1, 24, 1, 24, 3, 24, 902, 8, 24, 1, 25, 1, 25,
        5, 25, 906, 8, 25, 10, 25, 12, 25, 909, 9, 25, 1, 25, 1, 25, 3, 25, 913, 8, 25, 1, 26,
        1, 26, 1, 27, 1, 27, 1, 27, 5, 27, 920, 8, 27, 10, 27, 12, 27, 923, 9, 27, 1, 28, 1, 28,
        5, 28, 927, 8, 28, 10, 28, 12, 28, 930, 9, 28, 1, 28, 1, 28, 5, 28, 934, 8, 28, 10, 28,
        12, 28, 937, 9, 28, 1, 28, 1, 28, 5, 28, 941, 8, 28, 10, 28, 12, 28, 944, 9, 28, 1, 28,
        5, 28, 947, 8, 28, 10, 28, 12, 28, 950, 9, 28, 3, 28, 952, 8, 28, 1, 28, 5, 28, 955, 8,
        28, 10, 28, 12, 28, 958, 9, 28, 1, 28, 1, 28, 1, 29, 1, 29, 5, 29, 964, 8, 29, 10, 29,
        12, 29, 967, 9, 29, 1, 29, 1, 29, 5, 29, 971, 8, 29, 10, 29, 12, 29, 974, 9, 29, 1, 29,
        1, 29, 1, 29, 3, 29, 979, 8, 29, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30,
        1, 30, 3, 30, 990, 8, 30, 1, 31, 1, 31, 1, 32, 1, 32, 1, 33, 1, 33, 1, 34, 1, 34, 1, 35,
        1, 35, 5, 35, 1002, 8, 35, 10, 35, 12, 35, 1005, 9, 35, 1, 35, 1, 35, 1, 35, 1, 35, 5,
        35, 1011, 8, 35, 10, 35, 12, 35, 1014, 9, 35, 1, 35, 1, 35, 1, 36, 1, 36, 5, 36, 1020,
        8, 36, 10, 36, 12, 36, 1023, 9, 36, 1, 36, 1, 36, 5, 36, 1027, 8, 36, 10, 36, 12, 36,
        1030, 9, 36, 1, 36, 1, 36, 5, 36, 1034, 8, 36, 10, 36, 12, 36, 1037, 9, 36, 1, 36, 5,
        36, 1040, 8, 36, 10, 36, 12, 36, 1043, 9, 36, 3, 36, 1045, 8, 36, 1, 36, 5, 36, 1048,
        8, 36, 10, 36, 12, 36, 1051, 9, 36, 1, 36, 1, 36, 1, 36, 5, 36, 1056, 8, 36, 10, 36, 12,
        36, 1059, 9, 36, 1, 36, 1, 36, 5, 36, 1063, 8, 36, 10, 36, 12, 36, 1066, 9, 36, 1, 36,
        1, 36, 5, 36, 1070, 8, 36, 10, 36, 12, 36, 1073, 9, 36, 1, 36, 5, 36, 1076, 8, 36, 10,
        36, 12, 36, 1079, 9, 36, 3, 36, 1081, 8, 36, 1, 36, 5, 36, 1084, 8, 36, 10, 36, 12, 36,
        1087, 9, 36, 1, 36, 1, 36, 1, 36, 5, 36, 1092, 8, 36, 10, 36, 12, 36, 1095, 9, 36, 1,
        36, 1, 36, 5, 36, 1099, 8, 36, 10, 36, 12, 36, 1102, 9, 36, 1, 36, 1, 36, 5, 36, 1106,
        8, 36, 10, 36, 12, 36, 1109, 9, 36, 1, 36, 5, 36, 1112, 8, 36, 10, 36, 12, 36, 1115,
        9, 36, 3, 36, 1117, 8, 36, 1, 36, 5, 36, 1120, 8, 36, 10, 36, 12, 36, 1123, 9, 36, 1,
        36, 1, 36, 1, 36, 5, 36, 1128, 8, 36, 10, 36, 12, 36, 1131, 9, 36, 1, 36, 1, 36, 5, 36,
        1135, 8, 36, 10, 36, 12, 36, 1138, 9, 36, 1, 36, 1, 36, 5, 36, 1142, 8, 36, 10, 36, 12,
        36, 1145, 9, 36, 1, 36, 5, 36, 1148, 8, 36, 10, 36, 12, 36, 1151, 9, 36, 3, 36, 1153,
        8, 36, 1, 36, 5, 36, 1156, 8, 36, 10, 36, 12, 36, 1159, 9, 36, 1, 36, 3, 36, 1162, 8,
        36, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 1168, 8, 37, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3,
        38, 1175, 8, 38, 1, 39, 1, 39, 3, 39, 1179, 8, 39, 1, 40, 1, 40, 5, 40, 1183, 8, 40, 10,
        40, 12, 40, 1186, 9, 40, 1, 40, 1, 40, 3, 40, 1190, 8, 40, 1, 40, 5, 40, 1193, 8, 40,
        10, 40, 12, 40, 1196, 9, 40, 1, 40, 1, 40, 5, 40, 1200, 8, 40, 10, 40, 12, 40, 1203,
        9, 40, 1, 40, 1, 40, 3, 40, 1207, 8, 40, 5, 40, 1209, 8, 40, 10, 40, 12, 40, 1212, 9,
        40, 1, 40, 5, 40, 1215, 8, 40, 10, 40, 12, 40, 1218, 9, 40, 1, 40, 1, 40, 1, 40, 5, 40,
        1223, 8, 40, 10, 40, 12, 40, 1226, 9, 40, 1, 40, 1, 40, 3, 40, 1230, 8, 40, 1, 40, 5,
        40, 1233, 8, 40, 10, 40, 12, 40, 1236, 9, 40, 1, 40, 1, 40, 5, 40, 1240, 8, 40, 10, 40,
        12, 40, 1243, 9, 40, 1, 40, 1, 40, 3, 40, 1247, 8, 40, 5, 40, 1249, 8, 40, 10, 40, 12,
        40, 1252, 9, 40, 1, 40, 5, 40, 1255, 8, 40, 10, 40, 12, 40, 1258, 9, 40, 1, 40, 3, 40,
        1261, 8, 40, 1, 41, 1, 41, 4, 41, 1265, 8, 41, 11, 41, 12, 41, 1266, 1, 42, 1, 42, 1,
        43, 1, 43, 5, 43, 1273, 8, 43, 10, 43, 12, 43, 1276, 9, 43, 1, 43, 1, 43, 5, 43, 1280,
        8, 43, 10, 43, 12, 43, 1283, 9, 43, 1, 43, 1, 43, 1, 44, 1, 44, 1, 45, 1, 45, 1, 45, 1,
        46, 1, 46, 1, 47, 1, 47, 1, 47, 1, 47, 1, 47, 5, 47, 1299, 8, 47, 10, 47, 12, 47, 1302,
        9, 47, 1, 48, 1, 48, 5, 48, 1306, 8, 48, 10, 48, 12, 48, 1309, 9, 48, 1, 48, 1, 48, 5,
        48, 1313, 8, 48, 10, 48, 12, 48, 1316, 9, 48, 1, 48, 5, 48, 1319, 8, 48, 10, 48, 12,
        48, 1322, 9, 48, 1, 49, 1, 49, 5, 49, 1326, 8, 49, 10, 49, 12, 49, 1329, 9, 49, 1, 49,
        1, 49, 1, 49, 5, 49, 1334, 8, 49, 10, 49, 12, 49, 1337, 9, 49, 1, 49, 1, 49, 1, 49, 3,
        49, 1342, 8, 49, 1, 49, 1, 49, 3, 49, 1346, 8, 49, 1, 49, 1, 49, 1, 49, 3, 49, 1351, 8,
        49, 1, 49, 1, 49, 3, 49, 1355, 8, 49, 3, 49, 1357, 8, 49, 1, 50, 1, 50, 5, 50, 1361, 8,
        50, 10, 50, 12, 50, 1364, 9, 50, 1, 50, 1, 50, 5, 50, 1368, 8, 50, 10, 50, 12, 50, 1371,
        9, 50, 1, 50, 3, 50, 1374, 8, 50, 1, 50, 5, 50, 1377, 8, 50, 10, 50, 12, 50, 1380, 9,
        50, 1, 50, 5, 50, 1383, 8, 50, 10, 50, 12, 50, 1386, 9, 50, 1, 51, 1, 51, 1, 51, 5, 51,
        1391, 8, 51, 10, 51, 12, 51, 1394, 9, 51, 1, 51, 1, 51, 5, 51, 1398, 8, 51, 10, 51, 12,
        51, 1401, 9, 51, 1, 51, 1, 51, 3, 51, 1405, 8, 51, 1, 52, 1, 52, 1, 52, 5, 52, 1410, 8,
        52, 10, 52, 12, 52, 1413, 9, 52, 1, 52, 0, 0, 53, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
        22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
        66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 0,
        8, 1, 0, 3, 4, 1, 0, 33, 34, 1, 0, 35, 38, 1, 0, 39, 40, 1, 0, 41, 43, 3, 0, 41, 41, 56, 56,
        60, 60, 1, 0, 58, 59, 1, 0, 41, 42, 1588, 0, 109, 1, 0, 0, 0, 2, 144, 1, 0, 0, 0, 4, 146,
        1, 0, 0, 0, 6, 158, 1, 0, 0, 0, 8, 181, 1, 0, 0, 0, 10, 196, 1, 0, 0, 0, 12, 246, 1, 0, 0,
        0, 14, 266, 1, 0, 0, 0, 16, 328, 1, 0, 0, 0, 18, 430, 1, 0, 0, 0, 20, 447, 1, 0, 0, 0, 22,
        451, 1, 0, 0, 0, 24, 706, 1, 0, 0, 0, 26, 708, 1, 0, 0, 0, 28, 712, 1, 0, 0, 0, 30, 732,
        1, 0, 0, 0, 32, 752, 1, 0, 0, 0, 34, 772, 1, 0, 0, 0, 36, 792, 1, 0, 0, 0, 38, 812, 1, 0,
        0, 0, 40, 832, 1, 0, 0, 0, 42, 852, 1, 0, 0, 0, 44, 870, 1, 0, 0, 0, 46, 872, 1, 0, 0, 0,
        48, 901, 1, 0, 0, 0, 50, 912, 1, 0, 0, 0, 52, 914, 1, 0, 0, 0, 54, 916, 1, 0, 0, 0, 56, 924,
        1, 0, 0, 0, 58, 978, 1, 0, 0, 0, 60, 989, 1, 0, 0, 0, 62, 991, 1, 0, 0, 0, 64, 993, 1, 0,
        0, 0, 66, 995, 1, 0, 0, 0, 68, 997, 1, 0, 0, 0, 70, 999, 1, 0, 0, 0, 72, 1161, 1, 0, 0, 0,
        74, 1163, 1, 0, 0, 0, 76, 1174, 1, 0, 0, 0, 78, 1178, 1, 0, 0, 0, 80, 1260, 1, 0, 0, 0,
        82, 1264, 1, 0, 0, 0, 84, 1268, 1, 0, 0, 0, 86, 1270, 1, 0, 0, 0, 88, 1286, 1, 0, 0, 0,
        90, 1288, 1, 0, 0, 0, 92, 1291, 1, 0, 0, 0, 94, 1293, 1, 0, 0, 0, 96, 1303, 1, 0, 0, 0,
        98, 1356, 1, 0, 0, 0, 100, 1358, 1, 0, 0, 0, 102, 1404, 1, 0, 0, 0, 104, 1406, 1, 0, 0,
        0, 106, 108, 7, 0, 0, 0, 107, 106, 1, 0, 0, 0, 108, 111, 1, 0, 0, 0, 109, 107, 1, 0, 0,
        0, 109, 110, 1, 0, 0, 0, 110, 130, 1, 0, 0, 0, 111, 109, 1, 0, 0, 0, 112, 121, 3, 2, 1,
        0, 113, 115, 5, 3, 0, 0, 114, 113, 1, 0, 0, 0, 115, 116, 1, 0, 0, 0, 116, 114, 1, 0, 0,
        0, 116, 117, 1, 0, 0, 0, 117, 118, 1, 0, 0, 0, 118, 120, 3, 2, 1, 0, 119, 114, 1, 0, 0,
        0, 120, 123, 1, 0, 0, 0, 121, 119, 1, 0, 0, 0, 121, 122, 1, 0, 0, 0, 122, 127, 1, 0, 0,
        0, 123, 121, 1, 0, 0, 0, 124, 126, 7, 0, 0, 0, 125, 124, 1, 0, 0, 0, 126, 129, 1, 0, 0,
        0, 127, 125, 1, 0, 0, 0, 127, 128, 1, 0, 0, 0, 128, 131, 1, 0, 0, 0, 129, 127, 1, 0, 0,
        0, 130, 112, 1, 0, 0, 0, 130, 131, 1, 0, 0, 0, 131, 132, 1, 0, 0, 0, 132, 133, 5, 0, 0,
        1, 133, 1, 1, 0, 0, 0, 134, 145, 3, 24, 12, 0, 135, 145, 3, 28, 14, 0, 136, 145, 3, 8,
        4, 0, 137, 145, 3, 10, 5, 0, 138, 145, 3, 12, 6, 0, 139, 145, 3, 14, 7, 0, 140, 145, 3,
        16, 8, 0, 141, 145, 3, 4, 2, 0, 142, 145, 3, 18, 9, 0, 143, 145, 3, 20, 10, 0, 144, 134,
        1, 0, 0, 0, 144, 135, 1, 0, 0, 0, 144, 136, 1, 0, 0, 0, 144, 137, 1, 0, 0, 0, 144, 138,
        1, 0, 0, 0, 144, 139, 1, 0, 0, 0, 144, 140, 1, 0, 0, 0, 144, 141, 1, 0, 0, 0, 144, 142,
        1, 0, 0, 0, 144, 143, 1, 0, 0, 0, 145, 3, 1, 0, 0, 0, 146, 150, 5, 19, 0, 0, 147, 149, 5,
        4, 0, 0, 148, 147, 1, 0, 0, 0, 149, 152, 1, 0, 0, 0, 150, 148, 1, 0, 0, 0, 150, 151, 1,
        0, 0, 0, 151, 153, 1, 0, 0, 0, 152, 150, 1, 0, 0, 0, 153, 154, 3, 28, 14, 0, 154, 5, 1,
        0, 0, 0, 155, 157, 7, 0, 0, 0, 156, 155, 1, 0, 0, 0, 157, 160, 1, 0, 0, 0, 158, 156, 1,
        0, 0, 0, 158, 159, 1, 0, 0, 0, 159, 179, 1, 0, 0, 0, 160, 158, 1, 0, 0, 0, 161, 170, 3,
        2, 1, 0, 162, 164, 5, 3, 0, 0, 163, 162, 1, 0, 0, 0, 164, 165, 1, 0, 0, 0, 165, 163, 1,
        0, 0, 0, 165, 166, 1, 0, 0, 0, 166, 167, 1, 0, 0, 0, 167, 169, 3, 2, 1, 0, 168, 163, 1,
        0, 0, 0, 169, 172, 1, 0, 0, 0, 170, 168, 1, 0, 0, 0, 170, 171, 1, 0, 0, 0, 171, 176, 1,
        0, 0, 0, 172, 170, 1, 0, 0, 0, 173, 175, 7, 0, 0, 0, 174, 173, 1, 0, 0, 0, 175, 178, 1,
        0, 0, 0, 176, 174, 1, 0, 0, 0, 176, 177, 1, 0, 0, 0, 177, 180, 1, 0, 0, 0, 178, 176, 1,
        0, 0, 0, 179, 161, 1, 0, 0, 0, 179, 180, 1, 0, 0, 0, 180, 7, 1, 0, 0, 0, 181, 185, 5, 6,
        0, 0, 182, 184, 5, 4, 0, 0, 183, 182, 1, 0, 0, 0, 184, 187, 1, 0, 0, 0, 185, 183, 1, 0,
        0, 0, 185, 186, 1, 0, 0, 0, 186, 188, 1, 0, 0, 0, 187, 185, 1, 0, 0, 0, 188, 189, 3, 28,
        14, 0, 189, 190, 5, 3, 0, 0, 190, 191, 3, 6, 3, 0, 191, 192, 1, 0, 0, 0, 192, 193, 5, 3,
        0, 0, 193, 194, 5, 17, 0, 0, 194, 195, 5, 12, 0, 0, 195, 9, 1, 0, 0, 0, 196, 197, 5, 7,
        0, 0, 197, 198, 5, 4, 0, 0, 198, 199, 5, 56, 0, 0, 199, 200, 5, 4, 0, 0, 200, 204, 5, 8,
        0, 0, 201, 203, 5, 4, 0, 0, 202, 201, 1, 0, 0, 0, 203, 206, 1, 0, 0, 0, 204, 202, 1, 0,
        0, 0, 204, 205, 1, 0, 0, 0, 205, 207, 1, 0, 0, 0, 206, 204, 1, 0, 0, 0, 207, 211, 3, 28,
        14, 0, 208, 210, 5, 4, 0, 0, 209, 208, 1, 0, 0, 0, 210, 213, 1, 0, 0, 0, 211, 209, 1, 0,
        0, 0, 211, 212, 1, 0, 0, 0, 212, 214, 1, 0, 0, 0, 213, 211, 1, 0, 0, 0, 214, 218, 5, 10,
        0, 0, 215, 217, 5, 4, 0, 0, 216, 215, 1, 0, 0, 0, 217, 220, 1, 0, 0, 0, 218, 216, 1, 0,
        0, 0, 218, 219, 1, 0, 0, 0, 219, 221, 1, 0, 0, 0, 220, 218, 1, 0, 0, 0, 221, 236, 3, 28,
        14, 0, 222, 224, 5, 4, 0, 0, 223, 222, 1, 0, 0, 0, 224, 227, 1, 0, 0, 0, 225, 223, 1, 0,
        0, 0, 225, 226, 1, 0, 0, 0, 226, 228, 1, 0, 0, 0, 227, 225, 1, 0, 0, 0, 228, 232, 5, 11,
        0, 0, 229, 231, 5, 4, 0, 0, 230, 229, 1, 0, 0, 0, 231, 234, 1, 0, 0, 0, 232, 230, 1, 0,
        0, 0, 232, 233, 1, 0, 0, 0, 233, 235, 1, 0, 0, 0, 234, 232, 1, 0, 0, 0, 235, 237, 3, 28,
        14, 0, 236, 225, 1, 0, 0, 0, 236, 237, 1, 0, 0, 0, 237, 240, 1, 0, 0, 0, 238, 239, 5, 3,
        0, 0, 239, 241, 3, 6, 3, 0, 240, 238, 1, 0, 0, 0, 240, 241, 1, 0, 0, 0, 241, 242, 1, 0,
        0, 0, 242, 243, 5, 3, 0, 0, 243, 244, 5, 17, 0, 0, 244, 245, 5, 12, 0, 0, 245, 11, 1, 0,
        0, 0, 246, 247, 5, 7, 0, 0, 247, 248, 5, 4, 0, 0, 248, 249, 5, 56, 0, 0, 249, 250, 5, 4,
        0, 0, 250, 254, 5, 9, 0, 0, 251, 253, 5, 4, 0, 0, 252, 251, 1, 0, 0, 0, 253, 256, 1, 0,
        0, 0, 254, 252, 1, 0, 0, 0, 254, 255, 1, 0, 0, 0, 255, 257, 1, 0, 0, 0, 256, 254, 1, 0,
        0, 0, 257, 260, 3, 28, 14, 0, 258, 259, 5, 3, 0, 0, 259, 261, 3, 6, 3, 0, 260, 258, 1,
        0, 0, 0, 260, 261, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 5, 3, 0, 0, 263, 264, 5,
        17, 0, 0, 264, 265, 5, 12, 0, 0, 265, 13, 1, 0, 0, 0, 266, 270, 5, 13, 0, 0, 267, 269,
        5, 4, 0, 0, 268, 267, 1, 0, 0, 0, 269, 272, 1, 0, 0, 0, 270, 268, 1, 0, 0, 0, 270, 271,
        1, 0, 0, 0, 271, 273, 1, 0, 0, 0, 272, 270, 1, 0, 0, 0, 273, 277, 3, 28, 14, 0, 274, 276,
        7, 0, 0, 0, 275, 274, 1, 0, 0, 0, 276, 279, 1, 0, 0, 0, 277, 275, 1, 0, 0, 0, 277, 278,
        1, 0, 0, 0, 278, 281, 1, 0, 0, 0, 279, 277, 1, 0, 0, 0, 280, 282, 5, 14, 0, 0, 281, 280,
        1, 0, 0, 0, 281, 282, 1, 0, 0, 0, 282, 285, 1, 0, 0, 0, 283, 284, 5, 3, 0, 0, 284, 286,
        3, 6, 3, 0, 285, 283, 1, 0, 0, 0, 285, 286, 1, 0, 0, 0, 286, 313, 1, 0, 0, 0, 287, 288,
        5, 3, 0, 0, 288, 289, 5, 15, 0, 0, 289, 290, 5, 4, 0, 0, 290, 294, 5, 13, 0, 0, 291, 293,
        5, 4, 0, 0, 292, 291, 1, 0, 0, 0, 293, 296, 1, 0, 0, 0, 294, 292, 1, 0, 0, 0, 294, 295,
        1, 0, 0, 0, 295, 297, 1, 0, 0, 0, 296, 294, 1, 0, 0, 0, 297, 301, 3, 28, 14, 0, 298, 300,
        7, 0, 0, 0, 299, 298, 1, 0, 0, 0, 300, 303, 1, 0, 0, 0, 301, 299, 1, 0, 0, 0, 301, 302,
        1, 0, 0, 0, 302, 305, 1, 0, 0, 0, 303, 301, 1, 0, 0, 0, 304, 306, 5, 14, 0, 0, 305, 304,
        1, 0, 0, 0, 305, 306, 1, 0, 0, 0, 306, 309, 1, 0, 0, 0, 307, 308, 5, 3, 0, 0, 308, 310,
        3, 6, 3, 0, 309, 307, 1, 0, 0, 0, 309, 310, 1, 0, 0, 0, 310, 312, 1, 0, 0, 0, 311, 287,
        1, 0, 0, 0, 312, 315, 1, 0, 0, 0, 313, 311, 1, 0, 0, 0, 313, 314, 1, 0, 0, 0, 314, 322,
        1, 0, 0, 0, 315, 313, 1, 0, 0, 0, 316, 317, 5, 3, 0, 0, 317, 320, 5, 15, 0, 0, 318, 319,
        5, 3, 0, 0, 319, 321, 3, 6, 3, 0, 320, 318, 1, 0, 0, 0, 320, 321, 1, 0, 0, 0, 321, 323,
        1, 0, 0, 0, 322, 316, 1, 0, 0, 0, 322, 323, 1, 0, 0, 0, 323, 324, 1, 0, 0, 0, 324, 325,
        5, 3, 0, 0, 325, 326, 5, 17, 0, 0, 326, 327, 5, 13, 0, 0, 327, 15, 1, 0, 0, 0, 328, 329,
        5, 16, 0, 0, 329, 330, 5, 4, 0, 0, 330, 334, 5, 56, 0, 0, 331, 333, 5, 4, 0, 0, 332, 331,
        1, 0, 0, 0, 333, 336, 1, 0, 0, 0, 334, 332, 1, 0, 0, 0, 334, 335, 1, 0, 0, 0, 335, 337,
        1, 0, 0, 0, 336, 334, 1, 0, 0, 0, 337, 413, 5, 24, 0, 0, 338, 340, 5, 4, 0, 0, 339, 338,
        1, 0, 0, 0, 340, 343, 1, 0, 0, 0, 341, 339, 1, 0, 0, 0, 341, 342, 1, 0, 0, 0, 342, 344,
        1, 0, 0, 0, 343, 341, 1, 0, 0, 0, 344, 378, 5, 56, 0, 0, 345, 347, 5, 4, 0, 0, 346, 345,
        1, 0, 0, 0, 347, 350, 1, 0, 0, 0, 348, 346, 1, 0, 0, 0, 348, 349, 1, 0, 0, 0, 349, 351,
        1, 0, 0, 0, 350, 348, 1, 0, 0, 0, 351, 355, 5, 33, 0, 0, 352, 354, 5, 4, 0, 0, 353, 352,
        1, 0, 0, 0, 354, 357, 1, 0, 0, 0, 355, 353, 1, 0, 0, 0, 355, 356, 1, 0, 0, 0, 356, 358,
        1, 0, 0, 0, 357, 355, 1, 0, 0, 0, 358, 379, 3, 76, 38, 0, 359, 361, 5, 4, 0, 0, 360, 359,
        1, 0, 0, 0, 361, 364, 1, 0, 0, 0, 362, 360, 1, 0, 0, 0, 362, 363, 1, 0, 0, 0, 363, 365,
        1, 0, 0, 0, 364, 362, 1, 0, 0, 0, 365, 369, 5, 25, 0, 0, 366, 368, 5, 4, 0, 0, 367, 366,
        1, 0, 0, 0, 368, 371, 1, 0, 0, 0, 369, 367, 1, 0, 0, 0, 369, 370, 1, 0, 0, 0, 370, 372,
        1, 0, 0, 0, 371, 369, 1, 0, 0, 0, 372, 374, 5, 56, 0, 0, 373, 362, 1, 0, 0, 0, 374, 377,
        1, 0, 0, 0, 375, 373, 1, 0, 0, 0, 375, 376, 1, 0, 0, 0, 376, 379, 1, 0, 0, 0, 377, 375,
        1, 0, 0, 0, 378, 348, 1, 0, 0, 0, 378, 375, 1, 0, 0, 0, 379, 410, 1, 0, 0, 0, 380, 382,
        5, 4, 0, 0, 381, 380, 1, 0, 0, 0, 382, 385, 1, 0, 0, 0, 383, 381, 1, 0, 0, 0, 383, 384,
        1, 0, 0, 0, 384, 386, 1, 0, 0, 0, 385, 383, 1, 0, 0, 0, 386, 390, 5, 25, 0, 0, 387, 389,
        5, 4, 0, 0, 388, 387, 1, 0, 0, 0, 389, 392, 1, 0, 0, 0, 390, 388, 1, 0, 0, 0, 390, 391,
        1, 0, 0, 0, 391, 393, 1, 0, 0, 0, 392, 390, 1, 0, 0, 0, 393, 397, 5, 56, 0, 0, 394, 396,
        5, 4, 0, 0, 395, 394, 1, 0, 0, 0, 396, 399, 1, 0, 0, 0, 397, 395, 1, 0, 0, 0, 397, 398,
        1, 0, 0, 0, 398, 400, 1, 0, 0, 0, 399, 397, 1, 0, 0, 0, 400, 404, 5, 33, 0, 0, 401, 403,
        5, 4, 0, 0, 402, 401, 1, 0, 0, 0, 403, 406, 1, 0, 0, 0, 404, 402, 1, 0, 0, 0, 404, 405,
        1, 0, 0, 0, 405, 407, 1, 0, 0, 0, 406, 404, 1, 0, 0, 0, 407, 409, 3, 76, 38, 0, 408, 383,
        1, 0, 0, 0, 409, 412, 1, 0, 0, 0, 410, 408, 1, 0, 0, 0, 410, 411, 1, 0, 0, 0, 411, 414,
        1, 0, 0, 0, 412, 410, 1, 0, 0, 0, 413, 341, 1, 0, 0, 0, 413, 414, 1, 0, 0, 0, 414, 418,
        1, 0, 0, 0, 415, 417, 5, 4, 0, 0, 416, 415, 1, 0, 0, 0, 417, 420, 1, 0, 0, 0, 418, 416,
        1, 0, 0, 0, 418, 419, 1, 0, 0, 0, 419, 421, 1, 0, 0, 0, 420, 418, 1, 0, 0, 0, 421, 424,
        5, 26, 0, 0, 422, 423, 5, 3, 0, 0, 423, 425, 3, 6, 3, 0, 424, 422, 1, 0, 0, 0, 424, 425,
        1, 0, 0, 0, 425, 426, 1, 0, 0, 0, 426, 427, 5, 3, 0, 0, 427, 428, 5, 17, 0, 0, 428, 429,
        5, 16, 0, 0, 429, 17, 1, 0, 0, 0, 430, 433, 5, 21, 0, 0, 431, 432, 5, 3, 0, 0, 432, 434,
        3, 6, 3, 0, 433, 431, 1, 0, 0, 0, 433, 434, 1, 0, 0, 0, 434, 435, 1, 0, 0, 0, 435, 436,
        5, 3, 0, 0, 436, 437, 5, 22, 0, 0, 437, 438, 5, 4, 0, 0, 438, 441, 5, 56, 0, 0, 439, 440,
        5, 3, 0, 0, 440, 442, 3, 6, 3, 0, 441, 439, 1, 0, 0, 0, 441, 442, 1, 0, 0, 0, 442, 443,
        1, 0, 0, 0, 443, 444, 5, 3, 0, 0, 444, 445, 5, 17, 0, 0, 445, 446, 5, 21, 0, 0, 446, 19,
        1, 0, 0, 0, 447, 448, 5, 23, 0, 0, 448, 449, 5, 4, 0, 0, 449, 450, 3, 58, 29, 0, 450, 21,
        1, 0, 0, 0, 451, 455, 5, 16, 0, 0, 452, 454, 5, 4, 0, 0, 453, 452, 1, 0, 0, 0, 454, 457,
        1, 0, 0, 0, 455, 453, 1, 0, 0, 0, 455, 456, 1, 0, 0, 0, 456, 458, 1, 0, 0, 0, 457, 455,
        1, 0, 0, 0, 458, 534, 5, 24, 0, 0, 459, 461, 5, 4, 0, 0, 460, 459, 1, 0, 0, 0, 461, 464,
        1, 0, 0, 0, 462, 460, 1, 0, 0, 0, 462, 463, 1, 0, 0, 0, 463, 465, 1, 0, 0, 0, 464, 462,
        1, 0, 0, 0, 465, 499, 5, 56, 0, 0, 466, 468, 5, 4, 0, 0, 467, 466, 1, 0, 0, 0, 468, 471,
        1, 0, 0, 0, 469, 467, 1, 0, 0, 0, 469, 470, 1, 0, 0, 0, 470, 472, 1, 0, 0, 0, 471, 469,
        1, 0, 0, 0, 472, 476, 5, 33, 0, 0, 473, 475, 5, 4, 0, 0, 474, 473, 1, 0, 0, 0, 475, 478,
        1, 0, 0, 0, 476, 474, 1, 0, 0, 0, 476, 477, 1, 0, 0, 0, 477, 479, 1, 0, 0, 0, 478, 476,
        1, 0, 0, 0, 479, 500, 3, 76, 38, 0, 480, 482, 5, 4, 0, 0, 481, 480, 1, 0, 0, 0, 482, 485,
        1, 0, 0, 0, 483, 481, 1, 0, 0, 0, 483, 484, 1, 0, 0, 0, 484, 486, 1, 0, 0, 0, 485, 483,
        1, 0, 0, 0, 486, 490, 5, 25, 0, 0, 487, 489, 5, 4, 0, 0, 488, 487, 1, 0, 0, 0, 489, 492,
        1, 0, 0, 0, 490, 488, 1, 0, 0, 0, 490, 491, 1, 0, 0, 0, 491, 493, 1, 0, 0, 0, 492, 490,
        1, 0, 0, 0, 493, 495, 5, 56, 0, 0, 494, 483, 1, 0, 0, 0, 495, 498, 1, 0, 0, 0, 496, 494,
        1, 0, 0, 0, 496, 497, 1, 0, 0, 0, 497, 500, 1, 0, 0, 0, 498, 496, 1, 0, 0, 0, 499, 469,
        1, 0, 0, 0, 499, 496, 1, 0, 0, 0, 500, 531, 1, 0, 0, 0, 501, 503, 5, 4, 0, 0, 502, 501,
        1, 0, 0, 0, 503, 506, 1, 0, 0, 0, 504, 502, 1, 0, 0, 0, 504, 505, 1, 0, 0, 0, 505, 507,
        1, 0, 0, 0, 506, 504, 1, 0, 0, 0, 507, 511, 5, 25, 0, 0, 508, 510, 5, 4, 0, 0, 509, 508,
        1, 0, 0, 0, 510, 513, 1, 0, 0, 0, 511, 509, 1, 0, 0, 0, 511, 512, 1, 0, 0, 0, 512, 514,
        1, 0, 0, 0, 513, 511, 1, 0, 0, 0, 514, 518, 5, 56, 0, 0, 515, 517, 5, 4, 0, 0, 516, 515,
        1, 0, 0, 0, 517, 520, 1, 0, 0, 0, 518, 516, 1, 0, 0, 0, 518, 519, 1, 0, 0, 0, 519, 521,
        1, 0, 0, 0, 520, 518, 1, 0, 0, 0, 521, 525, 5, 33, 0, 0, 522, 524, 5, 4, 0, 0, 523, 522,
        1, 0, 0, 0, 524, 527, 1, 0, 0, 0, 525, 523, 1, 0, 0, 0, 525, 526, 1, 0, 0, 0, 526, 528,
        1, 0, 0, 0, 527, 525, 1, 0, 0, 0, 528, 530, 3, 76, 38, 0, 529, 504, 1, 0, 0, 0, 530, 533,
        1, 0, 0, 0, 531, 529, 1, 0, 0, 0, 531, 532, 1, 0, 0, 0, 532, 535, 1, 0, 0, 0, 533, 531,
        1, 0, 0, 0, 534, 462, 1, 0, 0, 0, 534, 535, 1, 0, 0, 0, 535, 539, 1, 0, 0, 0, 536, 538,
        5, 4, 0, 0, 537, 536, 1, 0, 0, 0, 538, 541, 1, 0, 0, 0, 539, 537, 1, 0, 0, 0, 539, 540,
        1, 0, 0, 0, 540, 542, 1, 0, 0, 0, 541, 539, 1, 0, 0, 0, 542, 557, 5, 26, 0, 0, 543, 544,
        5, 3, 0, 0, 544, 546, 3, 6, 3, 0, 545, 543, 1, 0, 0, 0, 545, 546, 1, 0, 0, 0, 546, 547,
        1, 0, 0, 0, 547, 548, 5, 3, 0, 0, 548, 549, 5, 17, 0, 0, 549, 558, 5, 16, 0, 0, 550, 552,
        5, 4, 0, 0, 551, 550, 1, 0, 0, 0, 552, 555, 1, 0, 0, 0, 553, 551, 1, 0, 0, 0, 553, 554,
        1, 0, 0, 0, 554, 556, 1, 0, 0, 0, 555, 553, 1, 0, 0, 0, 556, 558, 3, 2, 1, 0, 557, 545,
        1, 0, 0, 0, 557, 553, 1, 0, 0, 0, 558, 23, 1, 0, 0, 0, 559, 563, 5, 56, 0, 0, 560, 562,
        5, 4, 0, 0, 561, 560, 1, 0, 0, 0, 562, 565, 1, 0, 0, 0, 563, 561, 1, 0, 0, 0, 563, 564,
        1, 0, 0, 0, 564, 566, 1, 0, 0, 0, 565, 563, 1, 0, 0, 0, 566, 642, 5, 24, 0, 0, 567, 569,
        5, 4, 0, 0, 568, 567, 1, 0, 0, 0, 569, 572, 1, 0, 0, 0, 570, 568, 1, 0, 0, 0, 570, 571,
        1, 0, 0, 0, 571, 573, 1, 0, 0, 0, 572, 570, 1, 0, 0, 0, 573, 607, 5, 56, 0, 0, 574, 576,
        5, 4, 0, 0, 575, 574, 1, 0, 0, 0, 576, 579, 1, 0, 0, 0, 577, 575, 1, 0, 0, 0, 577, 578,
        1, 0, 0, 0, 578, 580, 1, 0, 0, 0, 579, 577, 1, 0, 0, 0, 580, 584, 5, 33, 0, 0, 581, 583,
        5, 4, 0, 0, 582, 581, 1, 0, 0, 0, 583, 586, 1, 0, 0, 0, 584, 582, 1, 0, 0, 0, 584, 585,
        1, 0, 0, 0, 585, 587, 1, 0, 0, 0, 586, 584, 1, 0, 0, 0, 587, 608, 3, 76, 38, 0, 588, 590,
        5, 4, 0, 0, 589, 588, 1, 0, 0, 0, 590, 593, 1, 0, 0, 0, 591, 589, 1, 0, 0, 0, 591, 592,
        1, 0, 0, 0, 592, 594, 1, 0, 0, 0, 593, 591, 1, 0, 0, 0, 594, 598, 5, 25, 0, 0, 595, 597,
        5, 4, 0, 0, 596, 595, 1, 0, 0, 0, 597, 600, 1, 0, 0, 0, 598, 596, 1, 0, 0, 0, 598, 599,
        1, 0, 0, 0, 599, 601, 1, 0, 0, 0, 600, 598, 1, 0, 0, 0, 601, 603, 5, 56, 0, 0, 602, 591,
        1, 0, 0, 0, 603, 606, 1, 0, 0, 0, 604, 602, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0, 605, 608,
        1, 0, 0, 0, 606, 604, 1, 0, 0, 0, 607, 577, 1, 0, 0, 0, 607, 604, 1, 0, 0, 0, 608, 639,
        1, 0, 0, 0, 609, 611, 5, 4, 0, 0, 610, 609, 1, 0, 0, 0, 611, 614, 1, 0, 0, 0, 612, 610,
        1, 0, 0, 0, 612, 613, 1, 0, 0, 0, 613, 615, 1, 0, 0, 0, 614, 612, 1, 0, 0, 0, 615, 619,
        5, 25, 0, 0, 616, 618, 5, 4, 0, 0, 617, 616, 1, 0, 0, 0, 618, 621, 1, 0, 0, 0, 619, 617,
        1, 0, 0, 0, 619, 620, 1, 0, 0, 0, 620, 622, 1, 0, 0, 0, 621, 619, 1, 0, 0, 0, 622, 626,
        5, 56, 0, 0, 623, 625, 5, 4, 0, 0, 624, 623, 1, 0, 0, 0, 625, 628, 1, 0, 0, 0, 626, 624,
        1, 0, 0, 0, 626, 627, 1, 0, 0, 0, 627, 629, 1, 0, 0, 0, 628, 626, 1, 0, 0, 0, 629, 633,
        5, 33, 0, 0, 630, 632, 5, 4, 0, 0, 631, 630, 1, 0, 0, 0, 632, 635, 1, 0, 0, 0, 633, 631,
        1, 0, 0, 0, 633, 634, 1, 0, 0, 0, 634, 636, 1, 0, 0, 0, 635, 633, 1, 0, 0, 0, 636, 638,
        3, 76, 38, 0, 637, 612, 1, 0, 0, 0, 638, 641, 1, 0, 0, 0, 639, 637, 1, 0, 0, 0, 639, 640,
        1, 0, 0, 0, 640, 643, 1, 0, 0, 0, 641, 639, 1, 0, 0, 0, 642, 570, 1, 0, 0, 0, 642, 643,
        1, 0, 0, 0, 643, 647, 1, 0, 0, 0, 644, 646, 5, 4, 0, 0, 645, 644, 1, 0, 0, 0, 646, 649,
        1, 0, 0, 0, 647, 645, 1, 0, 0, 0, 647, 648, 1, 0, 0, 0, 648, 650, 1, 0, 0, 0, 649, 647,
        1, 0, 0, 0, 650, 654, 5, 26, 0, 0, 651, 653, 5, 4, 0, 0, 652, 651, 1, 0, 0, 0, 653, 656,
        1, 0, 0, 0, 654, 652, 1, 0, 0, 0, 654, 655, 1, 0, 0, 0, 655, 657, 1, 0, 0, 0, 656, 654,
        1, 0, 0, 0, 657, 661, 5, 27, 0, 0, 658, 660, 5, 4, 0, 0, 659, 658, 1, 0, 0, 0, 660, 663,
        1, 0, 0, 0, 661, 659, 1, 0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 664, 1, 0, 0, 0, 663, 661,
        1, 0, 0, 0, 664, 707, 3, 28, 14, 0, 665, 668, 3, 66, 33, 0, 666, 668, 3, 26, 13, 0, 667,
        665, 1, 0, 0, 0, 667, 666, 1, 0, 0, 0, 668, 688, 1, 0, 0, 0, 669, 671, 5, 4, 0, 0, 670,
        669, 1, 0, 0, 0, 671, 674, 1, 0, 0, 0, 672, 670, 1, 0, 0, 0, 672, 673, 1, 0, 0, 0, 673,
        675, 1, 0, 0, 0, 674, 672, 1, 0, 0, 0, 675, 679, 5, 25, 0, 0, 676, 678, 5, 4, 0, 0, 677,
        676, 1, 0, 0, 0, 678, 681, 1, 0, 0, 0, 679, 677, 1, 0, 0, 0, 679, 680, 1, 0, 0, 0, 680,
        684, 1, 0, 0, 0, 681, 679, 1, 0, 0, 0, 682, 685, 3, 66, 33, 0, 683, 685, 3, 26, 13, 0,
        684, 682, 1, 0, 0, 0, 684, 683, 1, 0, 0, 0, 685, 687, 1, 0, 0, 0, 686, 672, 1, 0, 0, 0,
        687, 690, 1, 0, 0, 0, 688, 686, 1, 0, 0, 0, 688, 689, 1, 0, 0, 0, 689, 694, 1, 0, 0, 0,
        690, 688, 1, 0, 0, 0, 691, 693, 5, 4, 0, 0, 692, 691, 1, 0, 0, 0, 693, 696, 1, 0, 0, 0,
        694, 692, 1, 0, 0, 0, 694, 695, 1, 0, 0, 0, 695, 697, 1, 0, 0, 0, 696, 694, 1, 0, 0, 0,
        697, 701, 5, 27, 0, 0, 698, 700, 5, 4, 0, 0, 699, 698, 1, 0, 0, 0, 700, 703, 1, 0, 0, 0,
        701, 699, 1, 0, 0, 0, 701, 702, 1, 0, 0, 0, 702, 704, 1, 0, 0, 0, 703, 701, 1, 0, 0, 0,
        704, 705, 3, 28, 14, 0, 705, 707, 1, 0, 0, 0, 706, 559, 1, 0, 0, 0, 706, 667, 1, 0, 0,
        0, 707, 25, 1, 0, 0, 0, 708, 710, 5, 56, 0, 0, 709, 711, 3, 78, 39, 0, 710, 709, 1, 0,
        0, 0, 710, 711, 1, 0, 0, 0, 711, 27, 1, 0, 0, 0, 712, 729, 3, 30, 15, 0, 713, 715, 5, 4,
        0, 0, 714, 713, 1, 0, 0, 0, 715, 718, 1, 0, 0, 0, 716, 714, 1, 0, 0, 0, 716, 717, 1, 0,
        0, 0, 717, 719, 1, 0, 0, 0, 718, 716, 1, 0, 0, 0, 719, 723, 5, 30, 0, 0, 720, 722, 5, 4,
        0, 0, 721, 720, 1, 0, 0, 0, 722, 725, 1, 0, 0, 0, 723, 721, 1, 0, 0, 0, 723, 724, 1, 0,
        0, 0, 724, 726, 1, 0, 0, 0, 725, 723, 1, 0, 0, 0, 726, 728, 3, 30, 15, 0, 727, 716, 1,
        0, 0, 0, 728, 731, 1, 0, 0, 0, 729, 727, 1, 0, 0, 0, 729, 730, 1, 0, 0, 0, 730, 29, 1, 0,
        0, 0, 731, 729, 1, 0, 0, 0, 732, 749, 3, 32, 16, 0, 733, 735, 5, 4, 0, 0, 734, 733, 1,
        0, 0, 0, 735, 738, 1, 0, 0, 0, 736, 734, 1, 0, 0, 0, 736, 737, 1, 0, 0, 0, 737, 739, 1,
        0, 0, 0, 738, 736, 1, 0, 0, 0, 739, 743, 5, 31, 0, 0, 740, 742, 5, 4, 0, 0, 741, 740, 1,
        0, 0, 0, 742, 745, 1, 0, 0, 0, 743, 741, 1, 0, 0, 0, 743, 744, 1, 0, 0, 0, 744, 746, 1,
        0, 0, 0, 745, 743, 1, 0, 0, 0, 746, 748, 3, 32, 16, 0, 747, 736, 1, 0, 0, 0, 748, 751,
        1, 0, 0, 0, 749, 747, 1, 0, 0, 0, 749, 750, 1, 0, 0, 0, 750, 31, 1, 0, 0, 0, 751, 749, 1,
        0, 0, 0, 752, 769, 3, 34, 17, 0, 753, 755, 5, 4, 0, 0, 754, 753, 1, 0, 0, 0, 755, 758,
        1, 0, 0, 0, 756, 754, 1, 0, 0, 0, 756, 757, 1, 0, 0, 0, 757, 759, 1, 0, 0, 0, 758, 756,
        1, 0, 0, 0, 759, 763, 5, 32, 0, 0, 760, 762, 5, 4, 0, 0, 761, 760, 1, 0, 0, 0, 762, 765,
        1, 0, 0, 0, 763, 761, 1, 0, 0, 0, 763, 764, 1, 0, 0, 0, 764, 766, 1, 0, 0, 0, 765, 763,
        1, 0, 0, 0, 766, 768, 3, 34, 17, 0, 767, 756, 1, 0, 0, 0, 768, 771, 1, 0, 0, 0, 769, 767,
        1, 0, 0, 0, 769, 770, 1, 0, 0, 0, 770, 33, 1, 0, 0, 0, 771, 769, 1, 0, 0, 0, 772, 789, 3,
        36, 18, 0, 773, 775, 5, 4, 0, 0, 774, 773, 1, 0, 0, 0, 775, 778, 1, 0, 0, 0, 776, 774,
        1, 0, 0, 0, 776, 777, 1, 0, 0, 0, 777, 779, 1, 0, 0, 0, 778, 776, 1, 0, 0, 0, 779, 783,
        7, 1, 0, 0, 780, 782, 5, 4, 0, 0, 781, 780, 1, 0, 0, 0, 782, 785, 1, 0, 0, 0, 783, 781,
        1, 0, 0, 0, 783, 784, 1, 0, 0, 0, 784, 786, 1, 0, 0, 0, 785, 783, 1, 0, 0, 0, 786, 788,
        3, 36, 18, 0, 787, 776, 1, 0, 0, 0, 788, 791, 1, 0, 0, 0, 789, 787, 1, 0, 0, 0, 789, 790,
        1, 0, 0, 0, 790, 35, 1, 0, 0, 0, 791, 789, 1, 0, 0, 0, 792, 809, 3, 38, 19, 0, 793, 795,
        5, 4, 0, 0, 794, 793, 1, 0, 0, 0, 795, 798, 1, 0, 0, 0, 796, 794, 1, 0, 0, 0, 796, 797,
        1, 0, 0, 0, 797, 799, 1, 0, 0, 0, 798, 796, 1, 0, 0, 0, 799, 803, 7, 2, 0, 0, 800, 802,
        5, 4, 0, 0, 801, 800, 1, 0, 0, 0, 802, 805, 1, 0, 0, 0, 803, 801, 1, 0, 0, 0, 803, 804,
        1, 0, 0, 0, 804, 806, 1, 0, 0, 0, 805, 803, 1, 0, 0, 0, 806, 808, 3, 38, 19, 0, 807, 796,
        1, 0, 0, 0, 808, 811, 1, 0, 0, 0, 809, 807, 1, 0, 0, 0, 809, 810, 1, 0, 0, 0, 810, 37, 1,
        0, 0, 0, 811, 809, 1, 0, 0, 0, 812, 829, 3, 40, 20, 0, 813, 815, 5, 4, 0, 0, 814, 813,
        1, 0, 0, 0, 815, 818, 1, 0, 0, 0, 816, 814, 1, 0, 0, 0, 816, 817, 1, 0, 0, 0, 817, 819,
        1, 0, 0, 0, 818, 816, 1, 0, 0, 0, 819, 823, 7, 3, 0, 0, 820, 822, 5, 4, 0, 0, 821, 820,
        1, 0, 0, 0, 822, 825, 1, 0, 0, 0, 823, 821, 1, 0, 0, 0, 823, 824, 1, 0, 0, 0, 824, 826,
        1, 0, 0, 0, 825, 823, 1, 0, 0, 0, 826, 828, 3, 40, 20, 0, 827, 816, 1, 0, 0, 0, 828, 831,
        1, 0, 0, 0, 829, 827, 1, 0, 0, 0, 829, 830, 1, 0, 0, 0, 830, 39, 1, 0, 0, 0, 831, 829, 1,
        0, 0, 0, 832, 849, 3, 42, 21, 0, 833, 835, 5, 4, 0, 0, 834, 833, 1, 0, 0, 0, 835, 838,
        1, 0, 0, 0, 836, 834, 1, 0, 0, 0, 836, 837, 1, 0, 0, 0, 837, 839, 1, 0, 0, 0, 838, 836,
        1, 0, 0, 0, 839, 843, 7, 4, 0, 0, 840, 842, 5, 4, 0, 0, 841, 840, 1, 0, 0, 0, 842, 845,
        1, 0, 0, 0, 843, 841, 1, 0, 0, 0, 843, 844, 1, 0, 0, 0, 844, 846, 1, 0, 0, 0, 845, 843,
        1, 0, 0, 0, 846, 848, 3, 42, 21, 0, 847, 836, 1, 0, 0, 0, 848, 851, 1, 0, 0, 0, 849, 847,
        1, 0, 0, 0, 849, 850, 1, 0, 0, 0, 850, 41, 1, 0, 0, 0, 851, 849, 1, 0, 0, 0, 852, 855, 3,
        44, 22, 0, 853, 854, 5, 29, 0, 0, 854, 856, 3, 44, 22, 0, 855, 853, 1, 0, 0, 0, 855, 856,
        1, 0, 0, 0, 856, 859, 1, 0, 0, 0, 857, 858, 5, 29, 0, 0, 858, 860, 3, 44, 22, 0, 859, 857,
        1, 0, 0, 0, 859, 860, 1, 0, 0, 0, 860, 43, 1, 0, 0, 0, 861, 865, 5, 40, 0, 0, 862, 864,
        5, 4, 0, 0, 863, 862, 1, 0, 0, 0, 864, 867, 1, 0, 0, 0, 865, 863, 1, 0, 0, 0, 865, 866,
        1, 0, 0, 0, 866, 868, 1, 0, 0, 0, 867, 865, 1, 0, 0, 0, 868, 871, 3, 46, 23, 0, 869, 871,
        3, 46, 23, 0, 870, 861, 1, 0, 0, 0, 870, 869, 1, 0, 0, 0, 871, 45, 1, 0, 0, 0, 872, 889,
        3, 50, 25, 0, 873, 875, 5, 4, 0, 0, 874, 873, 1, 0, 0, 0, 875, 878, 1, 0, 0, 0, 876, 874,
        1, 0, 0, 0, 876, 877, 1, 0, 0, 0, 877, 879, 1, 0, 0, 0, 878, 876, 1, 0, 0, 0, 879, 883,
        5, 44, 0, 0, 880, 882, 5, 4, 0, 0, 881, 880, 1, 0, 0, 0, 882, 885, 1, 0, 0, 0, 883, 881,
        1, 0, 0, 0, 883, 884, 1, 0, 0, 0, 884, 886, 1, 0, 0, 0, 885, 883, 1, 0, 0, 0, 886, 888,
        3, 48, 24, 0, 887, 876, 1, 0, 0, 0, 888, 891, 1, 0, 0, 0, 889, 887, 1, 0, 0, 0, 889, 890,
        1, 0, 0, 0, 890, 47, 1, 0, 0, 0, 891, 889, 1, 0, 0, 0, 892, 896, 5, 40, 0, 0, 893, 895,
        5, 4, 0, 0, 894, 893, 1, 0, 0, 0, 895, 898, 1, 0, 0, 0, 896, 894, 1, 0, 0, 0, 896, 897,
        1, 0, 0, 0, 897, 899, 1, 0, 0, 0, 898, 896, 1, 0, 0, 0, 899, 902, 3, 50, 25, 0, 900, 902,
        3, 50, 25, 0, 901, 892, 1, 0, 0, 0, 901, 900, 1, 0, 0, 0, 902, 49, 1, 0, 0, 0, 903, 907,
        5, 45, 0, 0, 904, 906, 5, 4, 0, 0, 905, 904, 1, 0, 0, 0, 906, 909, 1, 0, 0, 0, 907, 905,
        1, 0, 0, 0, 907, 908, 1, 0, 0, 0, 908, 910, 1, 0, 0, 0, 909, 907, 1, 0, 0, 0, 910, 913,
        3, 52, 26, 0, 911, 913, 3, 52, 26, 0, 912, 903, 1, 0, 0, 0, 912, 911, 1, 0, 0, 0, 913,
        51, 1, 0, 0, 0, 914, 915, 3, 54, 27, 0, 915, 53, 1, 0, 0, 0, 916, 921, 3, 58, 29, 0, 917,
        920, 3, 78, 39, 0, 918, 920, 3, 56, 28, 0, 919, 917, 1, 0, 0, 0, 919, 918, 1, 0, 0, 0,
        920, 923, 1, 0, 0, 0, 921, 919, 1, 0, 0, 0, 921, 922, 1, 0, 0, 0, 922, 55, 1, 0, 0, 0, 923,
        921, 1, 0, 0, 0, 924, 951, 5, 24, 0, 0, 925, 927, 5, 4, 0, 0, 926, 925, 1, 0, 0, 0, 927,
        930, 1, 0, 0, 0, 928, 926, 1, 0, 0, 0, 928, 929, 1, 0, 0, 0, 929, 931, 1, 0, 0, 0, 930,
        928, 1, 0, 0, 0, 931, 948, 3, 28, 14, 0, 932, 934, 5, 4, 0, 0, 933, 932, 1, 0, 0, 0, 934,
        937, 1, 0, 0, 0, 935, 933, 1, 0, 0, 0, 935, 936, 1, 0, 0, 0, 936, 938, 1, 0, 0, 0, 937,
        935, 1, 0, 0, 0, 938, 942, 5, 25, 0, 0, 939, 941, 5, 4, 0, 0, 940, 939, 1, 0, 0, 0, 941,
        944, 1, 0, 0, 0, 942, 940, 1, 0, 0, 0, 942, 943, 1, 0, 0, 0, 943, 945, 1, 0, 0, 0, 944,
        942, 1, 0, 0, 0, 945, 947, 3, 28, 14, 0, 946, 935, 1, 0, 0, 0, 947, 950, 1, 0, 0, 0, 948,
        946, 1, 0, 0, 0, 948, 949, 1, 0, 0, 0, 949, 952, 1, 0, 0, 0, 950, 948, 1, 0, 0, 0, 951,
        928, 1, 0, 0, 0, 951, 952, 1, 0, 0, 0, 952, 956, 1, 0, 0, 0, 953, 955, 5, 4, 0, 0, 954,
        953, 1, 0, 0, 0, 955, 958, 1, 0, 0, 0, 956, 954, 1, 0, 0, 0, 956, 957, 1, 0, 0, 0, 957,
        959, 1, 0, 0, 0, 958, 956, 1, 0, 0, 0, 959, 960, 5, 26, 0, 0, 960, 57, 1, 0, 0, 0, 961,
        965, 5, 24, 0, 0, 962, 964, 7, 0, 0, 0, 963, 962, 1, 0, 0, 0, 964, 967, 1, 0, 0, 0, 965,
        963, 1, 0, 0, 0, 965, 966, 1, 0, 0, 0, 966, 968, 1, 0, 0, 0, 967, 965, 1, 0, 0, 0, 968,
        972, 3, 28, 14, 0, 969, 971, 7, 0, 0, 0, 970, 969, 1, 0, 0, 0, 971, 974, 1, 0, 0, 0, 972,
        970, 1, 0, 0, 0, 972, 973, 1, 0, 0, 0, 973, 975, 1, 0, 0, 0, 974, 972, 1, 0, 0, 0, 975,
        976, 5, 26, 0, 0, 976, 979, 1, 0, 0, 0, 977, 979, 3, 60, 30, 0, 978, 961, 1, 0, 0, 0, 978,
        977, 1, 0, 0, 0, 979, 59, 1, 0, 0, 0, 980, 990, 3, 88, 44, 0, 981, 990, 5, 50, 0, 0, 982,
        990, 3, 92, 46, 0, 983, 990, 3, 70, 35, 0, 984, 990, 3, 62, 31, 0, 985, 990, 3, 66, 33,
        0, 986, 990, 3, 72, 36, 0, 987, 990, 3, 22, 11, 0, 988, 990, 3, 74, 37, 0, 989, 980,
        1, 0, 0, 0, 989, 981, 1, 0, 0, 0, 989, 982, 1, 0, 0, 0, 989, 983, 1, 0, 0, 0, 989, 984,
        1, 0, 0, 0, 989, 985, 1, 0, 0, 0, 989, 986, 1, 0, 0, 0, 989, 987, 1, 0, 0, 0, 989, 988,
        1, 0, 0, 0, 990, 61, 1, 0, 0, 0, 991, 992, 5, 56, 0, 0, 992, 63, 1, 0, 0, 0, 993, 994, 7,
        5, 0, 0, 994, 65, 1, 0, 0, 0, 995, 996, 5, 57, 0, 0, 996, 67, 1, 0, 0, 0, 997, 998, 5, 56,
        0, 0, 998, 69, 1, 0, 0, 0, 999, 1003, 5, 48, 0, 0, 1000, 1002, 5, 4, 0, 0, 1001, 1000,
        1, 0, 0, 0, 1002, 1005, 1, 0, 0, 0, 1003, 1001, 1, 0, 0, 0, 1003, 1004, 1, 0, 0, 0, 1004,
        1006, 1, 0, 0, 0, 1005, 1003, 1, 0, 0, 0, 1006, 1007, 3, 38, 19, 0, 1007, 1008, 5, 4,
        0, 0, 1008, 1012, 3, 94, 47, 0, 1009, 1011, 5, 4, 0, 0, 1010, 1009, 1, 0, 0, 0, 1011,
        1014, 1, 0, 0, 0, 1012, 1010, 1, 0, 0, 0, 1012, 1013, 1, 0, 0, 0, 1013, 1015, 1, 0, 0,
        0, 1014, 1012, 1, 0, 0, 0, 1015, 1016, 5, 49, 0, 0, 1016, 71, 1, 0, 0, 0, 1017, 1044,
        5, 46, 0, 0, 1018, 1020, 7, 0, 0, 0, 1019, 1018, 1, 0, 0, 0, 1020, 1023, 1, 0, 0, 0, 1021,
        1019, 1, 0, 0, 0, 1021, 1022, 1, 0, 0, 0, 1022, 1024, 1, 0, 0, 0, 1023, 1021, 1, 0, 0,
        0, 1024, 1041, 3, 86, 43, 0, 1025, 1027, 7, 0, 0, 0, 1026, 1025, 1, 0, 0, 0, 1027, 1030,
        1, 0, 0, 0, 1028, 1026, 1, 0, 0, 0, 1028, 1029, 1, 0, 0, 0, 1029, 1031, 1, 0, 0, 0, 1030,
        1028, 1, 0, 0, 0, 1031, 1035, 5, 25, 0, 0, 1032, 1034, 7, 0, 0, 0, 1033, 1032, 1, 0,
        0, 0, 1034, 1037, 1, 0, 0, 0, 1035, 1033, 1, 0, 0, 0, 1035, 1036, 1, 0, 0, 0, 1036, 1038,
        1, 0, 0, 0, 1037, 1035, 1, 0, 0, 0, 1038, 1040, 3, 86, 43, 0, 1039, 1028, 1, 0, 0, 0,
        1040, 1043, 1, 0, 0, 0, 1041, 1039, 1, 0, 0, 0, 1041, 1042, 1, 0, 0, 0, 1042, 1045,
        1, 0, 0, 0, 1043, 1041, 1, 0, 0, 0, 1044, 1021, 1, 0, 0, 0, 1044, 1045, 1, 0, 0, 0, 1045,
        1049, 1, 0, 0, 0, 1046, 1048, 7, 0, 0, 0, 1047, 1046, 1, 0, 0, 0, 1048, 1051, 1, 0, 0,
        0, 1049, 1047, 1, 0, 0, 0, 1049, 1050, 1, 0, 0, 0, 1050, 1052, 1, 0, 0, 0, 1051, 1049,
        1, 0, 0, 0, 1052, 1162, 5, 47, 0, 0, 1053, 1080, 5, 48, 0, 0, 1054, 1056, 7, 0, 0, 0,
        1055, 1054, 1, 0, 0, 0, 1056, 1059, 1, 0, 0, 0, 1057, 1055, 1, 0, 0, 0, 1057, 1058,
        1, 0, 0, 0, 1058, 1060, 1, 0, 0, 0, 1059, 1057, 1, 0, 0, 0, 1060, 1077, 3, 86, 43, 0,
        1061, 1063, 7, 0, 0, 0, 1062, 1061, 1, 0, 0, 0, 1063, 1066, 1, 0, 0, 0, 1064, 1062,
        1, 0, 0, 0, 1064, 1065, 1, 0, 0, 0, 1065, 1067, 1, 0, 0, 0, 1066, 1064, 1, 0, 0, 0, 1067,
        1071, 5, 25, 0, 0, 1068, 1070, 7, 0, 0, 0, 1069, 1068, 1, 0, 0, 0, 1070, 1073, 1, 0,
        0, 0, 1071, 1069, 1, 0, 0, 0, 1071, 1072, 1, 0, 0, 0, 1072, 1074, 1, 0, 0, 0, 1073, 1071,
        1, 0, 0, 0, 1074, 1076, 3, 86, 43, 0, 1075, 1064, 1, 0, 0, 0, 1076, 1079, 1, 0, 0, 0,
        1077, 1075, 1, 0, 0, 0, 1077, 1078, 1, 0, 0, 0, 1078, 1081, 1, 0, 0, 0, 1079, 1077,
        1, 0, 0, 0, 1080, 1057, 1, 0, 0, 0, 1080, 1081, 1, 0, 0, 0, 1081, 1085, 1, 0, 0, 0, 1082,
        1084, 7, 0, 0, 0, 1083, 1082, 1, 0, 0, 0, 1084, 1087, 1, 0, 0, 0, 1085, 1083, 1, 0, 0,
        0, 1085, 1086, 1, 0, 0, 0, 1086, 1088, 1, 0, 0, 0, 1087, 1085, 1, 0, 0, 0, 1088, 1162,
        5, 49, 0, 0, 1089, 1116, 5, 46, 0, 0, 1090, 1092, 7, 0, 0, 0, 1091, 1090, 1, 0, 0, 0,
        1092, 1095, 1, 0, 0, 0, 1093, 1091, 1, 0, 0, 0, 1093, 1094, 1, 0, 0, 0, 1094, 1096,
        1, 0, 0, 0, 1095, 1093, 1, 0, 0, 0, 1096, 1113, 3, 28, 14, 0, 1097, 1099, 7, 0, 0, 0,
        1098, 1097, 1, 0, 0, 0, 1099, 1102, 1, 0, 0, 0, 1100, 1098, 1, 0, 0, 0, 1100, 1101,
        1, 0, 0, 0, 1101, 1103, 1, 0, 0, 0, 1102, 1100, 1, 0, 0, 0, 1103, 1107, 5, 25, 0, 0, 1104,
        1106, 7, 0, 0, 0, 1105, 1104, 1, 0, 0, 0, 1106, 1109, 1, 0, 0, 0, 1107, 1105, 1, 0, 0,
        0, 1107, 1108, 1, 0, 0, 0, 1108, 1110, 1, 0, 0, 0, 1109, 1107, 1, 0, 0, 0, 1110, 1112,
        3, 28, 14, 0, 1111, 1100, 1, 0, 0, 0, 1112, 1115, 1, 0, 0, 0, 1113, 1111, 1, 0, 0, 0,
        1113, 1114, 1, 0, 0, 0, 1114, 1117, 1, 0, 0, 0, 1115, 1113, 1, 0, 0, 0, 1116, 1093,
        1, 0, 0, 0, 1116, 1117, 1, 0, 0, 0, 1117, 1121, 1, 0, 0, 0, 1118, 1120, 7, 0, 0, 0, 1119,
        1118, 1, 0, 0, 0, 1120, 1123, 1, 0, 0, 0, 1121, 1119, 1, 0, 0, 0, 1121, 1122, 1, 0, 0,
        0, 1122, 1124, 1, 0, 0, 0, 1123, 1121, 1, 0, 0, 0, 1124, 1162, 5, 47, 0, 0, 1125, 1152,
        5, 48, 0, 0, 1126, 1128, 7, 0, 0, 0, 1127, 1126, 1, 0, 0, 0, 1128, 1131, 1, 0, 0, 0, 1129,
        1127, 1, 0, 0, 0, 1129, 1130, 1, 0, 0, 0, 1130, 1132, 1, 0, 0, 0, 1131, 1129, 1, 0, 0,
        0, 1132, 1149, 3, 28, 14, 0, 1133, 1135, 7, 0, 0, 0, 1134, 1133, 1, 0, 0, 0, 1135, 1138,
        1, 0, 0, 0, 1136, 1134, 1, 0, 0, 0, 1136, 1137, 1, 0, 0, 0, 1137, 1139, 1, 0, 0, 0, 1138,
        1136, 1, 0, 0, 0, 1139, 1143, 5, 25, 0, 0, 1140, 1142, 7, 0, 0, 0, 1141, 1140, 1, 0,
        0, 0, 1142, 1145, 1, 0, 0, 0, 1143, 1141, 1, 0, 0, 0, 1143, 1144, 1, 0, 0, 0, 1144, 1146,
        1, 0, 0, 0, 1145, 1143, 1, 0, 0, 0, 1146, 1148, 3, 28, 14, 0, 1147, 1136, 1, 0, 0, 0,
        1148, 1151, 1, 0, 0, 0, 1149, 1147, 1, 0, 0, 0, 1149, 1150, 1, 0, 0, 0, 1150, 1153,
        1, 0, 0, 0, 1151, 1149, 1, 0, 0, 0, 1152, 1129, 1, 0, 0, 0, 1152, 1153, 1, 0, 0, 0, 1153,
        1157, 1, 0, 0, 0, 1154, 1156, 7, 0, 0, 0, 1155, 1154, 1, 0, 0, 0, 1156, 1159, 1, 0, 0,
        0, 1157, 1155, 1, 0, 0, 0, 1157, 1158, 1, 0, 0, 0, 1158, 1160, 1, 0, 0, 0, 1159, 1157,
        1, 0, 0, 0, 1160, 1162, 5, 49, 0, 0, 1161, 1017, 1, 0, 0, 0, 1161, 1053, 1, 0, 0, 0, 1161,
        1089, 1, 0, 0, 0, 1161, 1125, 1, 0, 0, 0, 1162, 73, 1, 0, 0, 0, 1163, 1164, 5, 20, 0,
        0, 1164, 1165, 5, 4, 0, 0, 1165, 1167, 3, 68, 34, 0, 1166, 1168, 3, 56, 28, 0, 1167,
        1166, 1, 0, 0, 0, 1167, 1168, 1, 0, 0, 0, 1168, 75, 1, 0, 0, 0, 1169, 1175, 3, 90, 45,
        0, 1170, 1175, 3, 88, 44, 0, 1171, 1175, 5, 50, 0, 0, 1172, 1175, 3, 92, 46, 0, 1173,
        1175, 3, 72, 36, 0, 1174, 1169, 1, 0, 0, 0, 1174, 1170, 1, 0, 0, 0, 1174, 1171, 1, 0,
        0, 0, 1174, 1172, 1, 0, 0, 0, 1174, 1173, 1, 0, 0, 0, 1175, 77, 1, 0, 0, 0, 1176, 1179,
        3, 80, 40, 0, 1177, 1179, 3, 82, 41, 0, 1178, 1176, 1, 0, 0, 0, 1178, 1177, 1, 0, 0,
        0, 1179, 79, 1, 0, 0, 0, 1180, 1184, 5, 46, 0, 0, 1181, 1183, 5, 4, 0, 0, 1182, 1181,
        1, 0, 0, 0, 1183, 1186, 1, 0, 0, 0, 1184, 1182, 1, 0, 0, 0, 1184, 1185, 1, 0, 0, 0, 1185,
        1189, 1, 0, 0, 0, 1186, 1184, 1, 0, 0, 0, 1187, 1190, 3, 28, 14, 0, 1188, 1190, 5, 41,
        0, 0, 1189, 1187, 1, 0, 0, 0, 1189, 1188, 1, 0, 0, 0, 1190, 1210, 1, 0, 0, 0, 1191, 1193,
        5, 4, 0, 0, 1192, 1191, 1, 0, 0, 0, 1193, 1196, 1, 0, 0, 0, 1194, 1192, 1, 0, 0, 0, 1194,
        1195, 1, 0, 0, 0, 1195, 1197, 1, 0, 0, 0, 1196, 1194, 1, 0, 0, 0, 1197, 1201, 5, 25,
        0, 0, 1198, 1200, 5, 4, 0, 0, 1199, 1198, 1, 0, 0, 0, 1200, 1203, 1, 0, 0, 0, 1201, 1199,
        1, 0, 0, 0, 1201, 1202, 1, 0, 0, 0, 1202, 1206, 1, 0, 0, 0, 1203, 1201, 1, 0, 0, 0, 1204,
        1207, 3, 28, 14, 0, 1205, 1207, 5, 41, 0, 0, 1206, 1204, 1, 0, 0, 0, 1206, 1205, 1,
        0, 0, 0, 1207, 1209, 1, 0, 0, 0, 1208, 1194, 1, 0, 0, 0, 1209, 1212, 1, 0, 0, 0, 1210,
        1208, 1, 0, 0, 0, 1210, 1211, 1, 0, 0, 0, 1211, 1216, 1, 0, 0, 0, 1212, 1210, 1, 0, 0,
        0, 1213, 1215, 5, 4, 0, 0, 1214, 1213, 1, 0, 0, 0, 1215, 1218, 1, 0, 0, 0, 1216, 1214,
        1, 0, 0, 0, 1216, 1217, 1, 0, 0, 0, 1217, 1219, 1, 0, 0, 0, 1218, 1216, 1, 0, 0, 0, 1219,
        1261, 5, 47, 0, 0, 1220, 1224, 5, 48, 0, 0, 1221, 1223, 5, 4, 0, 0, 1222, 1221, 1, 0,
        0, 0, 1223, 1226, 1, 0, 0, 0, 1224, 1222, 1, 0, 0, 0, 1224, 1225, 1, 0, 0, 0, 1225, 1229,
        1, 0, 0, 0, 1226, 1224, 1, 0, 0, 0, 1227, 1230, 3, 28, 14, 0, 1228, 1230, 5, 41, 0, 0,
        1229, 1227, 1, 0, 0, 0, 1229, 1228, 1, 0, 0, 0, 1230, 1250, 1, 0, 0, 0, 1231, 1233,
        5, 4, 0, 0, 1232, 1231, 1, 0, 0, 0, 1233, 1236, 1, 0, 0, 0, 1234, 1232, 1, 0, 0, 0, 1234,
        1235, 1, 0, 0, 0, 1235, 1237, 1, 0, 0, 0, 1236, 1234, 1, 0, 0, 0, 1237, 1241, 5, 25,
        0, 0, 1238, 1240, 5, 4, 0, 0, 1239, 1238, 1, 0, 0, 0, 1240, 1243, 1, 0, 0, 0, 1241, 1239,
        1, 0, 0, 0, 1241, 1242, 1, 0, 0, 0, 1242, 1246, 1, 0, 0, 0, 1243, 1241, 1, 0, 0, 0, 1244,
        1247, 3, 28, 14, 0, 1245, 1247, 5, 41, 0, 0, 1246, 1244, 1, 0, 0, 0, 1246, 1245, 1,
        0, 0, 0, 1247, 1249, 1, 0, 0, 0, 1248, 1234, 1, 0, 0, 0, 1249, 1252, 1, 0, 0, 0, 1250,
        1248, 1, 0, 0, 0, 1250, 1251, 1, 0, 0, 0, 1251, 1256, 1, 0, 0, 0, 1252, 1250, 1, 0, 0,
        0, 1253, 1255, 5, 4, 0, 0, 1254, 1253, 1, 0, 0, 0, 1255, 1258, 1, 0, 0, 0, 1256, 1254,
        1, 0, 0, 0, 1256, 1257, 1, 0, 0, 0, 1257, 1259, 1, 0, 0, 0, 1258, 1256, 1, 0, 0, 0, 1259,
        1261, 5, 49, 0, 0, 1260, 1180, 1, 0, 0, 0, 1260, 1220, 1, 0, 0, 0, 1261, 81, 1, 0, 0,
        0, 1262, 1263, 5, 28, 0, 0, 1263, 1265, 3, 64, 32, 0, 1264, 1262, 1, 0, 0, 0, 1265,
        1266, 1, 0, 0, 0, 1266, 1264, 1, 0, 0, 0, 1266, 1267, 1, 0, 0, 0, 1267, 83, 1, 0, 0, 0,
        1268, 1269, 7, 5, 0, 0, 1269, 85, 1, 0, 0, 0, 1270, 1274, 3, 84, 42, 0, 1271, 1273,
        7, 0, 0, 0, 1272, 1271, 1, 0, 0, 0, 1273, 1276, 1, 0, 0, 0, 1274, 1272, 1, 0, 0, 0, 1274,
        1275, 1, 0, 0, 0, 1275, 1277, 1, 0, 0, 0, 1276, 1274, 1, 0, 0, 0, 1277, 1281, 5, 29,
        0, 0, 1278, 1280, 7, 0, 0, 0, 1279, 1278, 1, 0, 0, 0, 1280, 1283, 1, 0, 0, 0, 1281, 1279,
        1, 0, 0, 0, 1281, 1282, 1, 0, 0, 0, 1282, 1284, 1, 0, 0, 0, 1283, 1281, 1, 0, 0, 0, 1284,
        1285, 3, 28, 14, 0, 1285, 87, 1, 0, 0, 0, 1286, 1287, 7, 6, 0, 0, 1287, 89, 1, 0, 0, 0,
        1288, 1289, 5, 40, 0, 0, 1289, 1290, 3, 88, 44, 0, 1290, 91, 1, 0, 0, 0, 1291, 1292,
        5, 60, 0, 0, 1292, 93, 1, 0, 0, 0, 1293, 1300, 3, 96, 48, 0, 1294, 1295, 5, 4, 0, 0, 1295,
        1296, 5, 51, 0, 0, 1296, 1297, 5, 4, 0, 0, 1297, 1299, 3, 96, 48, 0, 1298, 1294, 1,
        0, 0, 0, 1299, 1302, 1, 0, 0, 0, 1300, 1298, 1, 0, 0, 0, 1300, 1301, 1, 0, 0, 0, 1301,
        95, 1, 0, 0, 0, 1302, 1300, 1, 0, 0, 0, 1303, 1320, 3, 98, 49, 0, 1304, 1306, 5, 4, 0,
        0, 1305, 1304, 1, 0, 0, 0, 1306, 1309, 1, 0, 0, 0, 1307, 1305, 1, 0, 0, 0, 1307, 1308,
        1, 0, 0, 0, 1308, 1310, 1, 0, 0, 0, 1309, 1307, 1, 0, 0, 0, 1310, 1314, 7, 7, 0, 0, 1311,
        1313, 5, 4, 0, 0, 1312, 1311, 1, 0, 0, 0, 1313, 1316, 1, 0, 0, 0, 1314, 1312, 1, 0, 0,
        0, 1314, 1315, 1, 0, 0, 0, 1315, 1317, 1, 0, 0, 0, 1316, 1314, 1, 0, 0, 0, 1317, 1319,
        3, 98, 49, 0, 1318, 1307, 1, 0, 0, 0, 1319, 1322, 1, 0, 0, 0, 1320, 1318, 1, 0, 0, 0,
        1320, 1321, 1, 0, 0, 0, 1321, 97, 1, 0, 0, 0, 1322, 1320, 1, 0, 0, 0, 1323, 1327, 5,
        58, 0, 0, 1324, 1326, 5, 4, 0, 0, 1325, 1324, 1, 0, 0, 0, 1326, 1329, 1, 0, 0, 0, 1327,
        1325, 1, 0, 0, 0, 1327, 1328, 1, 0, 0, 0, 1328, 1330, 1, 0, 0, 0, 1329, 1327, 1, 0, 0,
        0, 1330, 1331, 5, 42, 0, 0, 1331, 1335, 1, 0, 0, 0, 1332, 1334, 5, 4, 0, 0, 1333, 1332,
        1, 0, 0, 0, 1334, 1337, 1, 0, 0, 0, 1335, 1333, 1, 0, 0, 0, 1335, 1336, 1, 0, 0, 0, 1336,
        1338, 1, 0, 0, 0, 1337, 1335, 1, 0, 0, 0, 1338, 1341, 3, 100, 50, 0, 1339, 1340, 5,
        4, 0, 0, 1340, 1342, 5, 53, 0, 0, 1341, 1339, 1, 0, 0, 0, 1341, 1342, 1, 0, 0, 0, 1342,
        1345, 1, 0, 0, 0, 1343, 1344, 5, 4, 0, 0, 1344, 1346, 5, 52, 0, 0, 1345, 1343, 1, 0,
        0, 0, 1345, 1346, 1, 0, 0, 0, 1346, 1357, 1, 0, 0, 0, 1347, 1350, 3, 100, 50, 0, 1348,
        1349, 5, 4, 0, 0, 1349, 1351, 5, 53, 0, 0, 1350, 1348, 1, 0, 0, 0, 1350, 1351, 1, 0,
        0, 0, 1351, 1354, 1, 0, 0, 0, 1352, 1353, 5, 4, 0, 0, 1353, 1355, 5, 52, 0, 0, 1354,
        1352, 1, 0, 0, 0, 1354, 1355, 1, 0, 0, 0, 1355, 1357, 1, 0, 0, 0, 1356, 1323, 1, 0, 0,
        0, 1356, 1347, 1, 0, 0, 0, 1357, 99, 1, 0, 0, 0, 1358, 1384, 3, 102, 51, 0, 1359, 1361,
        5, 4, 0, 0, 1360, 1359, 1, 0, 0, 0, 1361, 1364, 1, 0, 0, 0, 1362, 1360, 1, 0, 0, 0, 1362,
        1363, 1, 0, 0, 0, 1363, 1365, 1, 0, 0, 0, 1364, 1362, 1, 0, 0, 0, 1365, 1373, 5, 44,
        0, 0, 1366, 1368, 5, 4, 0, 0, 1367, 1366, 1, 0, 0, 0, 1368, 1371, 1, 0, 0, 0, 1369, 1367,
        1, 0, 0, 0, 1369, 1370, 1, 0, 0, 0, 1370, 1372, 1, 0, 0, 0, 1371, 1369, 1, 0, 0, 0, 1372,
        1374, 5, 40, 0, 0, 1373, 1369, 1, 0, 0, 0, 1373, 1374, 1, 0, 0, 0, 1374, 1378, 1, 0,
        0, 0, 1375, 1377, 5, 4, 0, 0, 1376, 1375, 1, 0, 0, 0, 1377, 1380, 1, 0, 0, 0, 1378, 1376,
        1, 0, 0, 0, 1378, 1379, 1, 0, 0, 0, 1379, 1381, 1, 0, 0, 0, 1380, 1378, 1, 0, 0, 0, 1381,
        1383, 7, 6, 0, 0, 1382, 1362, 1, 0, 0, 0, 1383, 1386, 1, 0, 0, 0, 1384, 1382, 1, 0, 0,
        0, 1384, 1385, 1, 0, 0, 0, 1385, 101, 1, 0, 0, 0, 1386, 1384, 1, 0, 0, 0, 1387, 1405,
        3, 104, 52, 0, 1388, 1392, 5, 24, 0, 0, 1389, 1391, 5, 4, 0, 0, 1390, 1389, 1, 0, 0,
        0, 1391, 1394, 1, 0, 0, 0, 1392, 1390, 1, 0, 0, 0, 1392, 1393, 1, 0, 0, 0, 1393, 1395,
        1, 0, 0, 0, 1394, 1392, 1, 0, 0, 0, 1395, 1399, 3, 94, 47, 0, 1396, 1398, 5, 4, 0, 0,
        1397, 1396, 1, 0, 0, 0, 1398, 1401, 1, 0, 0, 0, 1399, 1397, 1, 0, 0, 0, 1399, 1400,
        1, 0, 0, 0, 1400, 1402, 1, 0, 0, 0, 1401, 1399, 1, 0, 0, 0, 1402, 1403, 5, 26, 0, 0, 1403,
        1405, 1, 0, 0, 0, 1404, 1387, 1, 0, 0, 0, 1404, 1388, 1, 0, 0, 0, 1405, 103, 1, 0, 0,
        0, 1406, 1411, 5, 56, 0, 0, 1407, 1408, 5, 4, 0, 0, 1408, 1410, 5, 56, 0, 0, 1409, 1407,
        1, 0, 0, 0, 1410, 1413, 1, 0, 0, 0, 1411, 1409, 1, 0, 0, 0, 1411, 1412, 1, 0, 0, 0, 1412,
        105, 1, 0, 0, 0, 1413, 1411, 1, 0, 0, 0, 207, 109, 116, 121, 127, 130, 144, 150, 158,
        165, 170, 176, 179, 185, 204, 211, 218, 225, 232, 236, 240, 254, 260, 270, 277,
        281, 285, 294, 301, 305, 309, 313, 320, 322, 334, 341, 348, 355, 362, 369, 375,
        378, 383, 390, 397, 404, 410, 413, 418, 424, 433, 441, 455, 462, 469, 476, 483,
        490, 496, 499, 504, 511, 518, 525, 531, 534, 539, 545, 553, 557, 563, 570, 577,
        584, 591, 598, 604, 607, 612, 619, 626, 633, 639, 642, 647, 654, 661, 667, 672,
        679, 684, 688, 694, 701, 706, 710, 716, 723, 729, 736, 743, 749, 756, 763, 769,
        776, 783, 789, 796, 803, 809, 816, 823, 829, 836, 843, 849, 855, 859, 865, 870,
        876, 883, 889, 896, 901, 907, 912, 919, 921, 928, 935, 942, 948, 951, 956, 965,
        972, 978, 989, 1003, 1012, 1021, 1028, 1035, 1041, 1044, 1049, 1057, 1064, 1071,
        1077, 1080, 1085, 1093, 1100, 1107, 1113, 1116, 1121, 1129, 1136, 1143, 1149,
        1152, 1157, 1161, 1167, 1174, 1178, 1184, 1189, 1194, 1201, 1206, 1210, 1216,
        1224, 1229, 1234, 1241, 1246, 1250, 1256, 1260, 1266, 1274, 1281, 1300, 1307,
        1314, 1320, 1327, 1335, 1341, 1345, 1350, 1354, 1356, 1362, 1369, 1373, 1378,
        1384, 1392, 1399, 1404, 1411
    ];
    static __ATN;
    static get _ATN() {
        if (!FormulaParser.__ATN) {
            FormulaParser.__ATN = new antlr.ATNDeserializer().deserialize(FormulaParser._serializedATN);
        }
        return FormulaParser.__ATN;
    }
    static vocabulary = new antlr.Vocabulary(FormulaParser.literalNames, FormulaParser.symbolicNames, []);
    get vocabulary() {
        return FormulaParser.vocabulary;
    }
    static decisionsToDFA = FormulaParser._ATN.decisionToState.map((ds, index) => new antlr.DFA(ds, index));
}
export class LinesContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    EOF() {
        return this.getToken(FormulaParser.EOF, 0);
    }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        return this.getRuleContext(i, ExpressionContext);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_lines;
    }
}
export class ExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    assignment() {
        return this.getRuleContext(0, AssignmentContext);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    whileLoop() {
        return this.getRuleContext(0, WhileLoopContext);
    }
    forLoop() {
        return this.getRuleContext(0, ForLoopContext);
    }
    forInLoop() {
        return this.getRuleContext(0, ForInLoopContext);
    }
    ifThenElse() {
        return this.getRuleContext(0, IfThenElseContext);
    }
    functionDef() {
        return this.getRuleContext(0, FunctionDefContext);
    }
    returnExp() {
        return this.getRuleContext(0, ReturnExpContext);
    }
    tryCatch() {
        return this.getRuleContext(0, TryCatchContext);
    }
    throwExp() {
        return this.getRuleContext(0, ThrowExpContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_expression;
    }
}
export class ReturnExpContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    RETURNSTATEMENT() {
        return this.getToken(FormulaParser.RETURNSTATEMENT, 0);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_returnExp;
    }
}
export class InnerBlockContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        return this.getRuleContext(i, ExpressionContext);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_innerBlock;
    }
}
export class WhileLoopContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    WHILESTATEMENT() {
        return this.getToken(FormulaParser.WHILESTATEMENT, 0);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    LOOPSTATEMENT() {
        return this.getToken(FormulaParser.LOOPSTATEMENT, 0);
    }
    innerBlock() {
        return this.getRuleContext(0, InnerBlockContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_whileLoop;
    }
}
export class ForLoopContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    FORSTATEMENT() {
        return this.getToken(FormulaParser.FORSTATEMENT, 0);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    FROMSTATEMENT() {
        return this.getToken(FormulaParser.FROMSTATEMENT, 0);
    }
    logicalExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(LogicalExpressionContext);
        }
        return this.getRuleContext(i, LogicalExpressionContext);
    }
    TOSTATEMENT() {
        return this.getToken(FormulaParser.TOSTATEMENT, 0);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    LOOPSTATEMENT() {
        return this.getToken(FormulaParser.LOOPSTATEMENT, 0);
    }
    BYSTATEMENT() {
        return this.getToken(FormulaParser.BYSTATEMENT, 0);
    }
    innerBlock() {
        return this.getRuleContext(0, InnerBlockContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_forLoop;
    }
}
export class ForInLoopContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    FORSTATEMENT() {
        return this.getToken(FormulaParser.FORSTATEMENT, 0);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    INSTATEMENT() {
        return this.getToken(FormulaParser.INSTATEMENT, 0);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    LOOPSTATEMENT() {
        return this.getToken(FormulaParser.LOOPSTATEMENT, 0);
    }
    innerBlock() {
        return this.getRuleContext(0, InnerBlockContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_forInLoop;
    }
}
export class IfThenElseContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IFSTATEMENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.IFSTATEMENT);
        }
        else {
            return this.getToken(FormulaParser.IFSTATEMENT, i);
        }
    }
    logicalExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(LogicalExpressionContext);
        }
        return this.getRuleContext(i, LogicalExpressionContext);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    THENSTATEMENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.THENSTATEMENT);
        }
        else {
            return this.getToken(FormulaParser.THENSTATEMENT, i);
        }
    }
    innerBlock(i) {
        if (i === undefined) {
            return this.getRuleContexts(InnerBlockContext);
        }
        return this.getRuleContext(i, InnerBlockContext);
    }
    ELSESTATEMENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.ELSESTATEMENT);
        }
        else {
            return this.getToken(FormulaParser.ELSESTATEMENT, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_ifThenElse;
    }
}
export class FunctionDefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    FUNCTIONSTATEMENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.FUNCTIONSTATEMENT);
        }
        else {
            return this.getToken(FormulaParser.FUNCTIONSTATEMENT, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    IDENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.IDENT);
        }
        else {
            return this.getToken(FormulaParser.IDENT, i);
        }
    }
    LPAREN() {
        return this.getToken(FormulaParser.LPAREN, 0);
    }
    RPAREN() {
        return this.getToken(FormulaParser.RPAREN, 0);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    innerBlock() {
        return this.getRuleContext(0, InnerBlockContext);
    }
    EQUALS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.EQUALS);
        }
        else {
            return this.getToken(FormulaParser.EQUALS, i);
        }
    }
    defaultValue(i) {
        if (i === undefined) {
            return this.getRuleContexts(DefaultValueContext);
        }
        return this.getRuleContext(i, DefaultValueContext);
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COMMA);
        }
        else {
            return this.getToken(FormulaParser.COMMA, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_functionDef;
    }
}
export class TryCatchContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    TRYSTATEMENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.TRYSTATEMENT);
        }
        else {
            return this.getToken(FormulaParser.TRYSTATEMENT, i);
        }
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    CATCHSTATEMENT() {
        return this.getToken(FormulaParser.CATCHSTATEMENT, 0);
    }
    R_() {
        return this.getToken(FormulaParser.R_, 0);
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    innerBlock(i) {
        if (i === undefined) {
            return this.getRuleContexts(InnerBlockContext);
        }
        return this.getRuleContext(i, InnerBlockContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_tryCatch;
    }
}
export class ThrowExpContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    THROWSTATEMENT() {
        return this.getToken(FormulaParser.THROWSTATEMENT, 0);
    }
    R_() {
        return this.getToken(FormulaParser.R_, 0);
    }
    primaryExpression() {
        return this.getRuleContext(0, PrimaryExpressionContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_throwExp;
    }
}
export class AnonFunctionDefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    FUNCTIONSTATEMENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.FUNCTIONSTATEMENT);
        }
        else {
            return this.getToken(FormulaParser.FUNCTIONSTATEMENT, i);
        }
    }
    LPAREN() {
        return this.getToken(FormulaParser.LPAREN, 0);
    }
    RPAREN() {
        return this.getToken(FormulaParser.RPAREN, 0);
    }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    IDENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.IDENT);
        }
        else {
            return this.getToken(FormulaParser.IDENT, i);
        }
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    ENDPREFIX() {
        return this.getToken(FormulaParser.ENDPREFIX, 0);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    EQUALS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.EQUALS);
        }
        else {
            return this.getToken(FormulaParser.EQUALS, i);
        }
    }
    defaultValue(i) {
        if (i === undefined) {
            return this.getRuleContexts(DefaultValueContext);
        }
        return this.getRuleContext(i, DefaultValueContext);
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COMMA);
        }
        else {
            return this.getToken(FormulaParser.COMMA, i);
        }
    }
    innerBlock() {
        return this.getRuleContext(0, InnerBlockContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_anonFunctionDef;
    }
}
export class AssignmentContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.IDENT);
        }
        else {
            return this.getToken(FormulaParser.IDENT, i);
        }
    }
    LPAREN() {
        return this.getToken(FormulaParser.LPAREN, 0);
    }
    RPAREN() {
        return this.getToken(FormulaParser.RPAREN, 0);
    }
    ASSIGN() {
        return this.getToken(FormulaParser.ASSIGN, 0);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    EQUALS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.EQUALS);
        }
        else {
            return this.getToken(FormulaParser.EQUALS, i);
        }
    }
    defaultValue(i) {
        if (i === undefined) {
            return this.getRuleContexts(DefaultValueContext);
        }
        return this.getRuleContext(i, DefaultValueContext);
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COMMA);
        }
        else {
            return this.getToken(FormulaParser.COMMA, i);
        }
    }
    primitiveRef(i) {
        if (i === undefined) {
            return this.getRuleContexts(PrimitiveRefContext);
        }
        return this.getRuleContext(i, PrimitiveRefContext);
    }
    assigned(i) {
        if (i === undefined) {
            return this.getRuleContexts(AssignedContext);
        }
        return this.getRuleContext(i, AssignedContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_assignment;
    }
}
export class AssignedContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    selector() {
        return this.getRuleContext(0, SelectorContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_assigned;
    }
}
export class LogicalExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    booleanXORExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(BooleanXORExpressionContext);
        }
        return this.getRuleContext(i, BooleanXORExpressionContext);
    }
    OR(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.OR);
        }
        else {
            return this.getToken(FormulaParser.OR, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_logicalExpression;
    }
}
export class BooleanXORExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    booleanAndExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(BooleanAndExpressionContext);
        }
        return this.getRuleContext(i, BooleanAndExpressionContext);
    }
    XOR(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.XOR);
        }
        else {
            return this.getToken(FormulaParser.XOR, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_booleanXORExpression;
    }
}
export class BooleanAndExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    equalityExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(EqualityExpressionContext);
        }
        return this.getRuleContext(i, EqualityExpressionContext);
    }
    AND(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.AND);
        }
        else {
            return this.getToken(FormulaParser.AND, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_booleanAndExpression;
    }
}
export class EqualityExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    relationalExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(RelationalExpressionContext);
        }
        return this.getRuleContext(i, RelationalExpressionContext);
    }
    EQUALS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.EQUALS);
        }
        else {
            return this.getToken(FormulaParser.EQUALS, i);
        }
    }
    NOTEQUALS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.NOTEQUALS);
        }
        else {
            return this.getToken(FormulaParser.NOTEQUALS, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_equalityExpression;
    }
}
export class RelationalExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    additiveExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(AdditiveExpressionContext);
        }
        return this.getRuleContext(i, AdditiveExpressionContext);
    }
    LT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.LT);
        }
        else {
            return this.getToken(FormulaParser.LT, i);
        }
    }
    LTEQ(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.LTEQ);
        }
        else {
            return this.getToken(FormulaParser.LTEQ, i);
        }
    }
    GT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.GT);
        }
        else {
            return this.getToken(FormulaParser.GT, i);
        }
    }
    GTEQ(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.GTEQ);
        }
        else {
            return this.getToken(FormulaParser.GTEQ, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_relationalExpression;
    }
}
export class AdditiveExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    multiplicativeExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExpressionContext);
        }
        return this.getRuleContext(i, MultiplicativeExpressionContext);
    }
    PLUS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.PLUS);
        }
        else {
            return this.getToken(FormulaParser.PLUS, i);
        }
    }
    MINUS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.MINUS);
        }
        else {
            return this.getToken(FormulaParser.MINUS, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_additiveExpression;
    }
}
export class MultiplicativeExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    arrayExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ArrayExpressionContext);
        }
        return this.getRuleContext(i, ArrayExpressionContext);
    }
    MULT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.MULT);
        }
        else {
            return this.getToken(FormulaParser.MULT, i);
        }
    }
    DIV(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.DIV);
        }
        else {
            return this.getToken(FormulaParser.DIV, i);
        }
    }
    MOD(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.MOD);
        }
        else {
            return this.getToken(FormulaParser.MOD, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_multiplicativeExpression;
    }
}
export class ArrayExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    negationExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(NegationExpressionContext);
        }
        return this.getRuleContext(i, NegationExpressionContext);
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COLON);
        }
        else {
            return this.getToken(FormulaParser.COLON, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_arrayExpression;
    }
}
export class NegationExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    MINUS() {
        return this.getToken(FormulaParser.MINUS, 0);
    }
    powerExpression() {
        return this.getRuleContext(0, PowerExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_negationExpression;
    }
}
export class PowerExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unaryExpression() {
        return this.getRuleContext(0, UnaryExpressionContext);
    }
    POW(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.POW);
        }
        else {
            return this.getToken(FormulaParser.POW, i);
        }
    }
    unaryOrNegate(i) {
        if (i === undefined) {
            return this.getRuleContexts(UnaryOrNegateContext);
        }
        return this.getRuleContext(i, UnaryOrNegateContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_powerExpression;
    }
}
export class UnaryOrNegateContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    MINUS() {
        return this.getToken(FormulaParser.MINUS, 0);
    }
    unaryExpression() {
        return this.getRuleContext(0, UnaryExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unaryOrNegate;
    }
}
export class UnaryExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    NOT() {
        return this.getToken(FormulaParser.NOT, 0);
    }
    innerPrimaryExpression() {
        return this.getRuleContext(0, InnerPrimaryExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unaryExpression;
    }
}
export class InnerPrimaryExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    selectionExpression() {
        return this.getRuleContext(0, SelectionExpressionContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_innerPrimaryExpression;
    }
}
export class SelectionExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    primaryExpression() {
        return this.getRuleContext(0, PrimaryExpressionContext);
    }
    selector(i) {
        if (i === undefined) {
            return this.getRuleContexts(SelectorContext);
        }
        return this.getRuleContext(i, SelectorContext);
    }
    funCall(i) {
        if (i === undefined) {
            return this.getRuleContexts(FunCallContext);
        }
        return this.getRuleContext(i, FunCallContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_selectionExpression;
    }
}
export class FunCallContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LPAREN() {
        return this.getToken(FormulaParser.LPAREN, 0);
    }
    RPAREN() {
        return this.getToken(FormulaParser.RPAREN, 0);
    }
    logicalExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(LogicalExpressionContext);
        }
        return this.getRuleContext(i, LogicalExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COMMA);
        }
        else {
            return this.getToken(FormulaParser.COMMA, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_funCall;
    }
}
export class PrimaryExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LPAREN() {
        return this.getToken(FormulaParser.LPAREN, 0);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    RPAREN() {
        return this.getToken(FormulaParser.RPAREN, 0);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    value() {
        return this.getRuleContext(0, ValueContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_primaryExpression;
    }
}
export class ValueContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    number() {
        return this.getRuleContext(0, NumberContext);
    }
    BOOL() {
        return this.getToken(FormulaParser.BOOL, 0);
    }
    string() {
        return this.getRuleContext(0, StringContext);
    }
    material() {
        return this.getRuleContext(0, MaterialContext);
    }
    symbolRef() {
        return this.getRuleContext(0, SymbolRefContext);
    }
    primitiveRef() {
        return this.getRuleContext(0, PrimitiveRefContext);
    }
    array() {
        return this.getRuleContext(0, ArrayContext);
    }
    anonFunctionDef() {
        return this.getRuleContext(0, AnonFunctionDefContext);
    }
    newObject() {
        return this.getRuleContext(0, NewObjectContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_value;
    }
}
export class SymbolRefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_symbolRef;
    }
}
export class MemberSymbolRefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    STRING() {
        return this.getToken(FormulaParser.STRING, 0);
    }
    MULT() {
        return this.getToken(FormulaParser.MULT, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_memberSymbolRef;
    }
}
export class PrimitiveRefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    PRIMITIVE() {
        return this.getToken(FormulaParser.PRIMITIVE, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_primitiveRef;
    }
}
export class TypeRefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_typeRef;
    }
}
export class MaterialContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LCURL() {
        return this.getToken(FormulaParser.LCURL, 0);
    }
    additiveExpression() {
        return this.getRuleContext(0, AdditiveExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    unitMultiplicativeExpression() {
        return this.getRuleContext(0, UnitMultiplicativeExpressionContext);
    }
    RCURL() {
        return this.getToken(FormulaParser.RCURL, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_material;
    }
}
export class ArrayContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LARR() {
        return this.getToken(FormulaParser.LARR, 0);
    }
    RARR() {
        return this.getToken(FormulaParser.RARR, 0);
    }
    label(i) {
        if (i === undefined) {
            return this.getRuleContexts(LabelContext);
        }
        return this.getRuleContext(i, LabelContext);
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COMMA);
        }
        else {
            return this.getToken(FormulaParser.COMMA, i);
        }
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    LCURL() {
        return this.getToken(FormulaParser.LCURL, 0);
    }
    RCURL() {
        return this.getToken(FormulaParser.RCURL, 0);
    }
    logicalExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(LogicalExpressionContext);
        }
        return this.getRuleContext(i, LogicalExpressionContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_array;
    }
}
export class NewObjectContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    NEWSTATEMENT() {
        return this.getToken(FormulaParser.NEWSTATEMENT, 0);
    }
    R_() {
        return this.getToken(FormulaParser.R_, 0);
    }
    typeRef() {
        return this.getRuleContext(0, TypeRefContext);
    }
    funCall() {
        return this.getRuleContext(0, FunCallContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_newObject;
    }
}
export class DefaultValueContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    negnumber() {
        return this.getRuleContext(0, NegnumberContext);
    }
    number() {
        return this.getRuleContext(0, NumberContext);
    }
    BOOL() {
        return this.getToken(FormulaParser.BOOL, 0);
    }
    string() {
        return this.getRuleContext(0, StringContext);
    }
    array() {
        return this.getRuleContext(0, ArrayContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_defaultValue;
    }
}
export class SelectorContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    minarray() {
        return this.getRuleContext(0, MinarrayContext);
    }
    dotselector() {
        return this.getRuleContext(0, DotselectorContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_selector;
    }
}
export class MinarrayContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LARR() {
        return this.getToken(FormulaParser.LARR, 0);
    }
    RARR() {
        return this.getToken(FormulaParser.RARR, 0);
    }
    logicalExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(LogicalExpressionContext);
        }
        return this.getRuleContext(i, LogicalExpressionContext);
    }
    MULT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.MULT);
        }
        else {
            return this.getToken(FormulaParser.MULT, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.COMMA);
        }
        else {
            return this.getToken(FormulaParser.COMMA, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    LCURL() {
        return this.getToken(FormulaParser.LCURL, 0);
    }
    RCURL() {
        return this.getToken(FormulaParser.RCURL, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_minarray;
    }
}
export class DotselectorContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.DOT);
        }
        else {
            return this.getToken(FormulaParser.DOT, i);
        }
    }
    memberSymbolRef(i) {
        if (i === undefined) {
            return this.getRuleContexts(MemberSymbolRefContext);
        }
        return this.getRuleContext(i, MemberSymbolRefContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_dotselector;
    }
}
export class ArrayNameContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT() {
        return this.getToken(FormulaParser.IDENT, 0);
    }
    STRING() {
        return this.getToken(FormulaParser.STRING, 0);
    }
    MULT() {
        return this.getToken(FormulaParser.MULT, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_arrayName;
    }
}
export class LabelContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    arrayName() {
        return this.getRuleContext(0, ArrayNameContext);
    }
    COLON() {
        return this.getToken(FormulaParser.COLON, 0);
    }
    logicalExpression() {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    R__(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R__);
        }
        else {
            return this.getToken(FormulaParser.R__, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_label;
    }
}
export class NumberContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    INTEGER() {
        return this.getToken(FormulaParser.INTEGER, 0);
    }
    FLOAT() {
        return this.getToken(FormulaParser.FLOAT, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_number;
    }
}
export class NegnumberContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    MINUS() {
        return this.getToken(FormulaParser.MINUS, 0);
    }
    number() {
        return this.getRuleContext(0, NumberContext);
    }
    get ruleIndex() {
        return FormulaParser.RULE_negnumber;
    }
}
export class StringContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    STRING() {
        return this.getToken(FormulaParser.STRING, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_string;
    }
}
export class UnitMultiplicativeExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unitInnerMultiplicativeExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(UnitInnerMultiplicativeExpressionContext);
        }
        return this.getRuleContext(i, UnitInnerMultiplicativeExpressionContext);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    PER(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.PER);
        }
        else {
            return this.getToken(FormulaParser.PER, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unitMultiplicativeExpression;
    }
}
export class UnitInnerMultiplicativeExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unitClump(i) {
        if (i === undefined) {
            return this.getRuleContexts(UnitClumpContext);
        }
        return this.getRuleContext(i, UnitClumpContext);
    }
    MULT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.MULT);
        }
        else {
            return this.getToken(FormulaParser.MULT, i);
        }
    }
    DIV(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.DIV);
        }
        else {
            return this.getToken(FormulaParser.DIV, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unitInnerMultiplicativeExpression;
    }
}
export class UnitClumpContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unitPowerExpression() {
        return this.getRuleContext(0, UnitPowerExpressionContext);
    }
    INTEGER() {
        return this.getToken(FormulaParser.INTEGER, 0);
    }
    DIV() {
        return this.getToken(FormulaParser.DIV, 0);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    CUBED() {
        return this.getToken(FormulaParser.CUBED, 0);
    }
    SQUARED() {
        return this.getToken(FormulaParser.SQUARED, 0);
    }
    get ruleIndex() {
        return FormulaParser.RULE_unitClump;
    }
}
export class UnitPowerExpressionContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unit() {
        return this.getRuleContext(0, UnitContext);
    }
    POW(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.POW);
        }
        else {
            return this.getToken(FormulaParser.POW, i);
        }
    }
    INTEGER(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.INTEGER);
        }
        else {
            return this.getToken(FormulaParser.INTEGER, i);
        }
    }
    FLOAT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.FLOAT);
        }
        else {
            return this.getToken(FormulaParser.FLOAT, i);
        }
    }
    MINUS(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.MINUS);
        }
        else {
            return this.getToken(FormulaParser.MINUS, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unitPowerExpression;
    }
}
export class UnitContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unitRef() {
        return this.getRuleContext(0, UnitRefContext);
    }
    LPAREN() {
        return this.getToken(FormulaParser.LPAREN, 0);
    }
    unitMultiplicativeExpression() {
        return this.getRuleContext(0, UnitMultiplicativeExpressionContext);
    }
    RPAREN() {
        return this.getToken(FormulaParser.RPAREN, 0);
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unit;
    }
}
export class UnitRefContext extends antlr.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IDENT(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.IDENT);
        }
        else {
            return this.getToken(FormulaParser.IDENT, i);
        }
    }
    R_(i) {
        if (i === undefined) {
            return this.getTokens(FormulaParser.R_);
        }
        else {
            return this.getToken(FormulaParser.R_, i);
        }
    }
    get ruleIndex() {
        return FormulaParser.RULE_unitRef;
    }
}
