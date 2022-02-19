// @ts-nocheck
/* eslint-disable */
// $ANTLR 3.3 Nov 30, 2010 12:45:30 /Library/WebServer/Documents/calc/Formula.g 2013-09-12 12:24:51

import { org } from "../../../vendor/antlr3-all.js";

export function FormulaParser(input, state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){
    }).call(this);

    FormulaParser.superclass.constructor.call(this, input, state);

    this.dfa5 = new FormulaParser.DFA5(this);
    this.dfa57 = new FormulaParser.DFA57(this);
    this.dfa58 = new FormulaParser.DFA58(this);
    this.dfa65 = new FormulaParser.DFA65(this);
    this.dfa72 = new FormulaParser.DFA72(this);
    this.dfa85 = new FormulaParser.DFA85(this);

         

    /* @todo only create adaptor if output=AST */
    this.adaptor = new org.antlr.runtime.tree.CommonTreeAdaptor();

};

org.antlr.lang.augmentObject(FormulaParser, {
    EOF: -1,
    T__113: 113,
    T__114: 114,
    T__115: 115,
    T__116: 116,
    NEGATE: 4,
    ASSIGN: 5,
    FUNCALL: 6,
    MATERIAL: 7,
    UNIT: 8,
    POWER: 9,
    DEFAULTS: 10,
    PARAMS: 11,
    UNITCLUMP: 12,
    ARRAY: 13,
    LINES: 14,
    WHILE: 15,
    IFTHENELSE: 16,
    ELSE: 17,
    FOR: 18,
    FORIN: 19,
    FUNCTION: 20,
    ANONFUNCTION: 21,
    NUMBER: 22,
    LABEL: 23,
    RANGE: 24,
    INNER: 25,
    ASSIGNED: 26,
    SELECTOR: 27,
    DOTSELECTOR: 28,
    NEW: 29,
    TRYCATCH: 30,
    THROW: 31,
    NEWLINE: 32,
    W: 33,
    H: 34,
    I: 35,
    L: 36,
    E: 37,
    WHILESTATEMENT: 38,
    F: 39,
    O: 40,
    R: 41,
    FORSTATEMENT: 42,
    M: 43,
    FROMSTATEMENT: 44,
    N: 45,
    INSTATEMENT: 46,
    T: 47,
    TOSTATEMENT: 48,
    B: 49,
    Y: 50,
    BYSTATEMENT: 51,
    P: 52,
    LOOPSTATEMENT: 53,
    IFSTATEMENT: 54,
    THENSTATEMENT: 55,
    S: 56,
    ELSESTATEMENT: 57,
    U: 58,
    C: 59,
    FUNCTIONSTATEMENT: 60,
    D: 61,
    ENDBLOCK: 62,
    RETURNSTATEMENT: 63,
    NEWSTATEMENT: 64,
    TRYSTATEMENT: 65,
    A: 66,
    CATCHSTATEMENT: 67,
    THROWSTATEMENT: 68,
    IDENT: 69,
    EQUALS: 70,
    PRIMITIVE: 71,
    OR: 72,
    XOR: 73,
    X: 74,
    AND: 75,
    NOTEQUALS: 76,
    LT: 77,
    LTEQ: 78,
    GT: 79,
    GTEQ: 80,
    PLUS: 81,
    MINUS: 82,
    MULT: 83,
    DIV: 84,
    MOD: 85,
    COLON: 86,
    POW: 87,
    NOT: 88,
    LARR: 89,
    RARR: 90,
    LCURL: 91,
    RCURL: 92,
    COMMA: 93,
    STRING: 94,
    INTEGER: 95,
    FLOAT: 96,
    TRUE: 97,
    FALSE: 98,
    PER: 99,
    CUBED: 100,
    SQUARED: 101,
    Q: 102,
    LBRACKET: 103,
    RBRACKET: 104,
    COMMENT: 105,
    LINE_COMMENT: 106,
    WS: 107,
    G: 108,
    J: 109,
    K: 110,
    V: 111,
    Z: 112
});

(function(){
// public class variables
var EOF= -1,
    T__113= 113,
    T__114= 114,
    T__115= 115,
    T__116= 116,
    NEGATE= 4,
    ASSIGN= 5,
    FUNCALL= 6,
    MATERIAL= 7,
    UNIT= 8,
    POWER= 9,
    DEFAULTS= 10,
    PARAMS= 11,
    UNITCLUMP= 12,
    ARRAY= 13,
    LINES= 14,
    WHILE= 15,
    IFTHENELSE= 16,
    ELSE= 17,
    FOR= 18,
    FORIN= 19,
    FUNCTION= 20,
    ANONFUNCTION= 21,
    NUMBER= 22,
    LABEL= 23,
    RANGE= 24,
    INNER= 25,
    ASSIGNED= 26,
    SELECTOR= 27,
    DOTSELECTOR= 28,
    NEW= 29,
    TRYCATCH= 30,
    THROW= 31,
    NEWLINE= 32,
    W= 33,
    H= 34,
    I= 35,
    L= 36,
    E= 37,
    WHILESTATEMENT= 38,
    F= 39,
    O= 40,
    R= 41,
    FORSTATEMENT= 42,
    M= 43,
    FROMSTATEMENT= 44,
    N= 45,
    INSTATEMENT= 46,
    T= 47,
    TOSTATEMENT= 48,
    B= 49,
    Y= 50,
    BYSTATEMENT= 51,
    P= 52,
    LOOPSTATEMENT= 53,
    IFSTATEMENT= 54,
    THENSTATEMENT= 55,
    S= 56,
    ELSESTATEMENT= 57,
    U= 58,
    C= 59,
    FUNCTIONSTATEMENT= 60,
    D= 61,
    ENDBLOCK= 62,
    RETURNSTATEMENT= 63,
    NEWSTATEMENT= 64,
    TRYSTATEMENT= 65,
    A= 66,
    CATCHSTATEMENT= 67,
    THROWSTATEMENT= 68,
    IDENT= 69,
    EQUALS= 70,
    PRIMITIVE= 71,
    OR= 72,
    XOR= 73,
    X= 74,
    AND= 75,
    NOTEQUALS= 76,
    LT= 77,
    LTEQ= 78,
    GT= 79,
    GTEQ= 80,
    PLUS= 81,
    MINUS= 82,
    MULT= 83,
    DIV= 84,
    MOD= 85,
    COLON= 86,
    POW= 87,
    NOT= 88,
    LARR= 89,
    RARR= 90,
    LCURL= 91,
    RCURL= 92,
    COMMA= 93,
    STRING= 94,
    INTEGER= 95,
    FLOAT= 96,
    TRUE= 97,
    FALSE= 98,
    PER= 99,
    CUBED= 100,
    SQUARED= 101,
    Q= 102,
    LBRACKET= 103,
    RBRACKET= 104,
    COMMENT= 105,
    LINE_COMMENT= 106,
    WS= 107,
    G= 108,
    J= 109,
    K= 110,
    V= 111,
    Z= 112;

// public instance methods/vars
org.antlr.lang.extend(FormulaParser, org.antlr.runtime.Parser, {
        
    setTreeAdaptor: function(adaptor) {
        this.adaptor = adaptor;
    },
    getTreeAdaptor: function() {
        return this.adaptor;
    },

    getTokenNames: function() { return FormulaParser.tokenNames; },
    getGrammarFileName: function() { return "/Library/WebServer/Documents/calc/Formula.g"; }
});
org.antlr.lang.augmentObject(FormulaParser.prototype, {

    // inline static return class
    lines_return: (function() {
        FormulaParser.lines_return = function(){};
        org.antlr.lang.extend(FormulaParser.lines_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:43:1: lines : ( NEWLINE )* ( expression ( ( NEWLINE )+ | EOF ) )* EOF -> ^( LINES ( expression )* ) ;
    // $ANTLR start "lines"
    lines: function() {
        var retval = new FormulaParser.lines_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NEWLINE1 = null;
        var NEWLINE3 = null;
        var EOF4 = null;
        var EOF5 = null;
         var expression2 = null;

        var NEWLINE1_tree=null;
        var NEWLINE3_tree=null;
        var EOF4_tree=null;
        var EOF5_tree=null;
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_EOF=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EOF");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:44:2: ( ( NEWLINE )* ( expression ( ( NEWLINE )+ | EOF ) )* EOF -> ^( LINES ( expression )* ) )
            // /Library/WebServer/Documents/calc/Formula.g:44:4: ( NEWLINE )* ( expression ( ( NEWLINE )+ | EOF ) )* EOF
            // /Library/WebServer/Documents/calc/Formula.g:44:4: ( NEWLINE )*
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0==NEWLINE) ) {
                    alt1=1;
                }


                switch (alt1) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE1=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_lines160); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE1);



                    break;

                default :
                    break loop1;
                }
            } while (true);

            // /Library/WebServer/Documents/calc/Formula.g:44:13: ( expression ( ( NEWLINE )+ | EOF ) )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0==WHILESTATEMENT||LA4_0==FORSTATEMENT||LA4_0==IFSTATEMENT||LA4_0==FUNCTIONSTATEMENT||(LA4_0>=RETURNSTATEMENT && LA4_0<=TRYSTATEMENT)||(LA4_0>=THROWSTATEMENT && LA4_0<=IDENT)||LA4_0==PRIMITIVE||LA4_0==MINUS||(LA4_0>=NOT && LA4_0<=LARR)||LA4_0==LCURL||(LA4_0>=STRING && LA4_0<=FALSE)||LA4_0==113) ) {
                    alt4=1;
                }


                switch (alt4) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:44:14: expression ( ( NEWLINE )+ | EOF )
                    this.pushFollow(FormulaParser.FOLLOW_expression_in_lines164);
                    expression2=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expression.add(expression2.getTree());
                    // /Library/WebServer/Documents/calc/Formula.g:44:26: ( ( NEWLINE )+ | EOF )
                    var alt3=2;
                    var LA3_0 = this.input.LA(1);

                    if ( (LA3_0==NEWLINE) ) {
                        alt3=1;
                    }
                    else if ( (LA3_0==EOF) ) {
                        alt3=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 3, 0, this.input);

                        throw nvae;
                    }
                    switch (alt3) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:44:27: ( NEWLINE )+
                            // /Library/WebServer/Documents/calc/Formula.g:44:27: ( NEWLINE )+
                            var cnt2=0;
                            loop2:
                            do {
                                var alt2=2;
                                var LA2_0 = this.input.LA(1);

                                if ( (LA2_0==NEWLINE) ) {
                                    alt2=1;
                                }


                                switch (alt2) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                    NEWLINE3=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_lines168); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE3);



                                    break;

                                default :
                                    if ( cnt2 >= 1 ) {
                                        break loop2;
                                    }
                                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                        var eee = new org.antlr.runtime.EarlyExitException(2, this.input);
                                        throw eee;
                                }
                                cnt2++;
                            } while (true);



                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:44:36: EOF
                            EOF4=this.match(this.input,EOF,FormulaParser.FOLLOW_EOF_in_lines171); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_EOF.add(EOF4);



                            break;

                    }



                    break;

                default :
                    break loop4;
                }
            } while (true);

            EOF5=this.match(this.input,EOF,FormulaParser.FOLLOW_EOF_in_lines176); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_EOF.add(EOF5);



            // AST REWRITE
            // elements: expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 44:47: -> ^( LINES ( expression )* )
            {
                // /Library/WebServer/Documents/calc/Formula.g:44:50: ^( LINES ( expression )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LINES, "LINES"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:44:58: ( expression )*
                while ( stream_expression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_expression.nextTree());

                }
                stream_expression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expression_return: (function() {
        FormulaParser.expression_return = function(){};
        org.antlr.lang.extend(FormulaParser.expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:120:1: expression : ( assignment | logicalExpression | whileLoop | forLoop | forInLoop | ifThenElse | functionDef | returnExp | tryCatch | throwExp );
    // $ANTLR start "expression"
    expression: function() {
        var retval = new FormulaParser.expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var assignment6 = null;
         var logicalExpression7 = null;
         var whileLoop8 = null;
         var forLoop9 = null;
         var forInLoop10 = null;
         var ifThenElse11 = null;
         var functionDef12 = null;
         var returnExp13 = null;
         var tryCatch14 = null;
         var throwExp15 = null;


        try {
            // /Library/WebServer/Documents/calc/Formula.g:121:2: ( assignment | logicalExpression | whileLoop | forLoop | forInLoop | ifThenElse | functionDef | returnExp | tryCatch | throwExp )
            var alt5=10;
            alt5 = this.dfa5.predict(this.input);
            switch (alt5) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:121:5: assignment
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_assignment_in_expression508);
                    assignment6=this.assignment();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, assignment6.getTree());


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:122:5: logicalExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_expression514);
                    logicalExpression7=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression7.getTree());


                    break;
                case 3 :
                    // /Library/WebServer/Documents/calc/Formula.g:123:5: whileLoop
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_whileLoop_in_expression520);
                    whileLoop8=this.whileLoop();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, whileLoop8.getTree());


                    break;
                case 4 :
                    // /Library/WebServer/Documents/calc/Formula.g:124:5: forLoop
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_forLoop_in_expression526);
                    forLoop9=this.forLoop();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, forLoop9.getTree());


                    break;
                case 5 :
                    // /Library/WebServer/Documents/calc/Formula.g:125:5: forInLoop
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_forInLoop_in_expression532);
                    forInLoop10=this.forInLoop();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, forInLoop10.getTree());


                    break;
                case 6 :
                    // /Library/WebServer/Documents/calc/Formula.g:126:5: ifThenElse
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_ifThenElse_in_expression538);
                    ifThenElse11=this.ifThenElse();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, ifThenElse11.getTree());


                    break;
                case 7 :
                    // /Library/WebServer/Documents/calc/Formula.g:127:5: functionDef
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_functionDef_in_expression544);
                    functionDef12=this.functionDef();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, functionDef12.getTree());


                    break;
                case 8 :
                    // /Library/WebServer/Documents/calc/Formula.g:128:5: returnExp
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_returnExp_in_expression550);
                    returnExp13=this.returnExp();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, returnExp13.getTree());


                    break;
                case 9 :
                    // /Library/WebServer/Documents/calc/Formula.g:129:5: tryCatch
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_tryCatch_in_expression556);
                    tryCatch14=this.tryCatch();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, tryCatch14.getTree());


                    break;
                case 10 :
                    // /Library/WebServer/Documents/calc/Formula.g:130:5: throwExp
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_throwExp_in_expression562);
                    throwExp15=this.throwExp();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, throwExp15.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    returnExp_return: (function() {
        FormulaParser.returnExp_return = function(){};
        org.antlr.lang.extend(FormulaParser.returnExp_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:133:1: returnExp : RETURNSTATEMENT logicalExpression ;
    // $ANTLR start "returnExp"
    returnExp: function() {
        var retval = new FormulaParser.returnExp_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var RETURNSTATEMENT16 = null;
         var logicalExpression17 = null;

        var RETURNSTATEMENT16_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:134:2: ( RETURNSTATEMENT logicalExpression )
            // /Library/WebServer/Documents/calc/Formula.g:135:2: RETURNSTATEMENT logicalExpression
            root_0 = this.adaptor.nil();

            RETURNSTATEMENT16=this.match(this.input,RETURNSTATEMENT,FormulaParser.FOLLOW_RETURNSTATEMENT_in_returnExp574); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            RETURNSTATEMENT16_tree = this.adaptor.create(RETURNSTATEMENT16);
            root_0 = this.adaptor.becomeRoot(RETURNSTATEMENT16_tree, root_0);
            }
            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_returnExp577);
            logicalExpression17=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression17.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    innerBlock_return: (function() {
        FormulaParser.innerBlock_return = function(){};
        org.antlr.lang.extend(FormulaParser.innerBlock_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:138:1: innerBlock : ( expression ( ( NEWLINE )+ ) )* -> ^( LINES ( expression )+ ) ;
    // $ANTLR start "innerBlock"
    innerBlock: function() {
        var retval = new FormulaParser.innerBlock_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NEWLINE19 = null;
         var expression18 = null;

        var NEWLINE19_tree=null;
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:139:2: ( ( expression ( ( NEWLINE )+ ) )* -> ^( LINES ( expression )+ ) )
            // /Library/WebServer/Documents/calc/Formula.g:139:4: ( expression ( ( NEWLINE )+ ) )*
            // /Library/WebServer/Documents/calc/Formula.g:139:4: ( expression ( ( NEWLINE )+ ) )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==WHILESTATEMENT||LA7_0==FORSTATEMENT||LA7_0==IFSTATEMENT||LA7_0==FUNCTIONSTATEMENT||(LA7_0>=RETURNSTATEMENT && LA7_0<=TRYSTATEMENT)||(LA7_0>=THROWSTATEMENT && LA7_0<=IDENT)||LA7_0==PRIMITIVE||LA7_0==MINUS||(LA7_0>=NOT && LA7_0<=LARR)||LA7_0==LCURL||(LA7_0>=STRING && LA7_0<=FALSE)||LA7_0==113) ) {
                    alt7=1;
                }


                switch (alt7) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:139:5: expression ( ( NEWLINE )+ )
                    this.pushFollow(FormulaParser.FOLLOW_expression_in_innerBlock590);
                    expression18=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expression.add(expression18.getTree());
                    // /Library/WebServer/Documents/calc/Formula.g:139:17: ( ( NEWLINE )+ )
                    // /Library/WebServer/Documents/calc/Formula.g:139:18: ( NEWLINE )+
                    // /Library/WebServer/Documents/calc/Formula.g:139:18: ( NEWLINE )+
                    var cnt6=0;
                    loop6:
                    do {
                        var alt6=2;
                        var LA6_0 = this.input.LA(1);

                        if ( (LA6_0==NEWLINE) ) {
                            alt6=1;
                        }


                        switch (alt6) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE19=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_innerBlock594); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE19);



                            break;

                        default :
                            if ( cnt6 >= 1 ) {
                                break loop6;
                            }
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var eee = new org.antlr.runtime.EarlyExitException(6, this.input);
                                throw eee;
                        }
                        cnt6++;
                    } while (true);






                    break;

                default :
                    break loop7;
                }
            } while (true);



            // AST REWRITE
            // elements: expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 139:30: -> ^( LINES ( expression )+ )
            {
                // /Library/WebServer/Documents/calc/Formula.g:139:33: ^( LINES ( expression )+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LINES, "LINES"), root_1);

                if ( !(stream_expression.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_expression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_expression.nextTree());

                }
                stream_expression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    whileLoop_return: (function() {
        FormulaParser.whileLoop_return = function(){};
        org.antlr.lang.extend(FormulaParser.whileLoop_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:142:1: whileLoop : WHILESTATEMENT logicalExpression ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT -> ^( WHILE logicalExpression innerBlock ) ;
    // $ANTLR start "whileLoop"
    whileLoop: function() {
        var retval = new FormulaParser.whileLoop_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var WHILESTATEMENT20 = null;
        var NEWLINE22 = null;
        var ENDBLOCK24 = null;
        var LOOPSTATEMENT25 = null;
         var logicalExpression21 = null;
         var innerBlock23 = null;

        var WHILESTATEMENT20_tree=null;
        var NEWLINE22_tree=null;
        var ENDBLOCK24_tree=null;
        var LOOPSTATEMENT25_tree=null;
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_LOOPSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LOOPSTATEMENT");
        var stream_WHILESTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token WHILESTATEMENT");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:143:2: ( WHILESTATEMENT logicalExpression ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT -> ^( WHILE logicalExpression innerBlock ) )
            // /Library/WebServer/Documents/calc/Formula.g:143:4: WHILESTATEMENT logicalExpression ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT
            WHILESTATEMENT20=this.match(this.input,WHILESTATEMENT,FormulaParser.FOLLOW_WHILESTATEMENT_in_whileLoop619); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_WHILESTATEMENT.add(WHILESTATEMENT20);

            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_whileLoop621);
            logicalExpression21=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression21.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:143:37: ( NEWLINE )+
            var cnt8=0;
            loop8:
            do {
                var alt8=2;
                var LA8_0 = this.input.LA(1);

                if ( (LA8_0==NEWLINE) ) {
                    alt8=1;
                }


                switch (alt8) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE22=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_whileLoop623); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE22);



                    break;

                default :
                    if ( cnt8 >= 1 ) {
                        break loop8;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(8, this.input);
                        throw eee;
                }
                cnt8++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_whileLoop626);
            innerBlock23=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock23.getTree());
            ENDBLOCK24=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_whileLoop629); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK24);

            LOOPSTATEMENT25=this.match(this.input,LOOPSTATEMENT,FormulaParser.FOLLOW_LOOPSTATEMENT_in_whileLoop631); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_LOOPSTATEMENT.add(LOOPSTATEMENT25);



            // AST REWRITE
            // elements: innerBlock, logicalExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 143:81: -> ^( WHILE logicalExpression innerBlock )
            {
                // /Library/WebServer/Documents/calc/Formula.g:143:84: ^( WHILE logicalExpression innerBlock )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(WHILE, "WHILE"), root_1);

                this.adaptor.addChild(root_1, stream_logicalExpression.nextTree());
                this.adaptor.addChild(root_1, stream_innerBlock.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forLoop_return: (function() {
        FormulaParser.forLoop_return = function(){};
        org.antlr.lang.extend(FormulaParser.forLoop_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:146:1: forLoop : FORSTATEMENT IDENT FROMSTATEMENT logicalExpression TOSTATEMENT logicalExpression ( BYSTATEMENT logicalExpression )? ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT -> ^( FOR IDENT ^( PARAMS ( logicalExpression )* ) innerBlock ) ;
    // $ANTLR start "forLoop"
    forLoop: function() {
        var retval = new FormulaParser.forLoop_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FORSTATEMENT26 = null;
        var IDENT27 = null;
        var FROMSTATEMENT28 = null;
        var TOSTATEMENT30 = null;
        var BYSTATEMENT32 = null;
        var NEWLINE34 = null;
        var ENDBLOCK36 = null;
        var LOOPSTATEMENT37 = null;
         var logicalExpression29 = null;
         var logicalExpression31 = null;
         var logicalExpression33 = null;
         var innerBlock35 = null;

        var FORSTATEMENT26_tree=null;
        var IDENT27_tree=null;
        var FROMSTATEMENT28_tree=null;
        var TOSTATEMENT30_tree=null;
        var BYSTATEMENT32_tree=null;
        var NEWLINE34_tree=null;
        var ENDBLOCK36_tree=null;
        var LOOPSTATEMENT37_tree=null;
        var stream_FORSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FORSTATEMENT");
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_FROMSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FROMSTATEMENT");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_TOSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token TOSTATEMENT");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_LOOPSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LOOPSTATEMENT");
        var stream_BYSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token BYSTATEMENT");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:147:2: ( FORSTATEMENT IDENT FROMSTATEMENT logicalExpression TOSTATEMENT logicalExpression ( BYSTATEMENT logicalExpression )? ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT -> ^( FOR IDENT ^( PARAMS ( logicalExpression )* ) innerBlock ) )
            // /Library/WebServer/Documents/calc/Formula.g:147:4: FORSTATEMENT IDENT FROMSTATEMENT logicalExpression TOSTATEMENT logicalExpression ( BYSTATEMENT logicalExpression )? ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT
            FORSTATEMENT26=this.match(this.input,FORSTATEMENT,FormulaParser.FOLLOW_FORSTATEMENT_in_forLoop652); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_FORSTATEMENT.add(FORSTATEMENT26);

            IDENT27=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_forLoop654); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT27);

            FROMSTATEMENT28=this.match(this.input,FROMSTATEMENT,FormulaParser.FOLLOW_FROMSTATEMENT_in_forLoop656); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_FROMSTATEMENT.add(FROMSTATEMENT28);

            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_forLoop658);
            logicalExpression29=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression29.getTree());
            TOSTATEMENT30=this.match(this.input,TOSTATEMENT,FormulaParser.FOLLOW_TOSTATEMENT_in_forLoop660); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_TOSTATEMENT.add(TOSTATEMENT30);

            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_forLoop662);
            logicalExpression31=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression31.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:147:85: ( BYSTATEMENT logicalExpression )?
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( (LA9_0==BYSTATEMENT) ) {
                alt9=1;
            }
            switch (alt9) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:147:86: BYSTATEMENT logicalExpression
                    BYSTATEMENT32=this.match(this.input,BYSTATEMENT,FormulaParser.FOLLOW_BYSTATEMENT_in_forLoop665); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_BYSTATEMENT.add(BYSTATEMENT32);

                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_forLoop667);
                    logicalExpression33=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression33.getTree());


                    break;

            }

            // /Library/WebServer/Documents/calc/Formula.g:147:118: ( NEWLINE )+
            var cnt10=0;
            loop10:
            do {
                var alt10=2;
                var LA10_0 = this.input.LA(1);

                if ( (LA10_0==NEWLINE) ) {
                    alt10=1;
                }


                switch (alt10) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE34=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_forLoop671); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE34);



                    break;

                default :
                    if ( cnt10 >= 1 ) {
                        break loop10;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(10, this.input);
                        throw eee;
                }
                cnt10++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_forLoop674);
            innerBlock35=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock35.getTree());
            ENDBLOCK36=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_forLoop677); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK36);

            LOOPSTATEMENT37=this.match(this.input,LOOPSTATEMENT,FormulaParser.FOLLOW_LOOPSTATEMENT_in_forLoop679); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_LOOPSTATEMENT.add(LOOPSTATEMENT37);



            // AST REWRITE
            // elements: logicalExpression, innerBlock, IDENT
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 147:162: -> ^( FOR IDENT ^( PARAMS ( logicalExpression )* ) innerBlock )
            {
                // /Library/WebServer/Documents/calc/Formula.g:147:165: ^( FOR IDENT ^( PARAMS ( logicalExpression )* ) innerBlock )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(FOR, "FOR"), root_1);

                this.adaptor.addChild(root_1, stream_IDENT.nextNode());
                // /Library/WebServer/Documents/calc/Formula.g:147:177: ^( PARAMS ( logicalExpression )* )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(PARAMS, "PARAMS"), root_2);

                // /Library/WebServer/Documents/calc/Formula.g:147:186: ( logicalExpression )*
                while ( stream_logicalExpression.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_logicalExpression.nextTree());

                }
                stream_logicalExpression.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                this.adaptor.addChild(root_1, stream_innerBlock.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forInLoop_return: (function() {
        FormulaParser.forInLoop_return = function(){};
        org.antlr.lang.extend(FormulaParser.forInLoop_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:150:1: forInLoop : FORSTATEMENT IDENT INSTATEMENT logicalExpression ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT -> ^( FORIN IDENT logicalExpression innerBlock ) ;
    // $ANTLR start "forInLoop"
    forInLoop: function() {
        var retval = new FormulaParser.forInLoop_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FORSTATEMENT38 = null;
        var IDENT39 = null;
        var INSTATEMENT40 = null;
        var NEWLINE42 = null;
        var ENDBLOCK44 = null;
        var LOOPSTATEMENT45 = null;
         var logicalExpression41 = null;
         var innerBlock43 = null;

        var FORSTATEMENT38_tree=null;
        var IDENT39_tree=null;
        var INSTATEMENT40_tree=null;
        var NEWLINE42_tree=null;
        var ENDBLOCK44_tree=null;
        var LOOPSTATEMENT45_tree=null;
        var stream_FORSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FORSTATEMENT");
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_LOOPSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LOOPSTATEMENT");
        var stream_INSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token INSTATEMENT");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:151:2: ( FORSTATEMENT IDENT INSTATEMENT logicalExpression ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT -> ^( FORIN IDENT logicalExpression innerBlock ) )
            // /Library/WebServer/Documents/calc/Formula.g:151:4: FORSTATEMENT IDENT INSTATEMENT logicalExpression ( NEWLINE )+ innerBlock ENDBLOCK LOOPSTATEMENT
            FORSTATEMENT38=this.match(this.input,FORSTATEMENT,FormulaParser.FOLLOW_FORSTATEMENT_in_forInLoop707); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_FORSTATEMENT.add(FORSTATEMENT38);

            IDENT39=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_forInLoop709); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT39);

            INSTATEMENT40=this.match(this.input,INSTATEMENT,FormulaParser.FOLLOW_INSTATEMENT_in_forInLoop711); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_INSTATEMENT.add(INSTATEMENT40);

            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_forInLoop713);
            logicalExpression41=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression41.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:151:53: ( NEWLINE )+
            var cnt11=0;
            loop11:
            do {
                var alt11=2;
                var LA11_0 = this.input.LA(1);

                if ( (LA11_0==NEWLINE) ) {
                    alt11=1;
                }


                switch (alt11) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE42=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_forInLoop715); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE42);



                    break;

                default :
                    if ( cnt11 >= 1 ) {
                        break loop11;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(11, this.input);
                        throw eee;
                }
                cnt11++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_forInLoop718);
            innerBlock43=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock43.getTree());
            ENDBLOCK44=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_forInLoop721); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK44);

            LOOPSTATEMENT45=this.match(this.input,LOOPSTATEMENT,FormulaParser.FOLLOW_LOOPSTATEMENT_in_forInLoop723); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_LOOPSTATEMENT.add(LOOPSTATEMENT45);



            // AST REWRITE
            // elements: IDENT, innerBlock, logicalExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 151:98: -> ^( FORIN IDENT logicalExpression innerBlock )
            {
                // /Library/WebServer/Documents/calc/Formula.g:151:101: ^( FORIN IDENT logicalExpression innerBlock )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(FORIN, "FORIN"), root_1);

                this.adaptor.addChild(root_1, stream_IDENT.nextNode());
                this.adaptor.addChild(root_1, stream_logicalExpression.nextTree());
                this.adaptor.addChild(root_1, stream_innerBlock.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    ifThenElse_return: (function() {
        FormulaParser.ifThenElse_return = function(){};
        org.antlr.lang.extend(FormulaParser.ifThenElse_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:154:1: ifThenElse : IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock ( ELSESTATEMENT IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock )* ( ELSESTATEMENT ( NEWLINE )+ innerBlock )? ENDBLOCK IFSTATEMENT -> ^( IFTHENELSE ^( PARAMS ( logicalExpression )+ ) ^( PARAMS ( innerBlock )+ ) ) ;
    // $ANTLR start "ifThenElse"
    ifThenElse: function() {
        var retval = new FormulaParser.ifThenElse_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IFSTATEMENT46 = null;
        var THENSTATEMENT48 = null;
        var NEWLINE49 = null;
        var ELSESTATEMENT51 = null;
        var IFSTATEMENT52 = null;
        var THENSTATEMENT54 = null;
        var NEWLINE55 = null;
        var ELSESTATEMENT57 = null;
        var NEWLINE58 = null;
        var ENDBLOCK60 = null;
        var IFSTATEMENT61 = null;
         var logicalExpression47 = null;
         var innerBlock50 = null;
         var logicalExpression53 = null;
         var innerBlock56 = null;
         var innerBlock59 = null;

        var IFSTATEMENT46_tree=null;
        var THENSTATEMENT48_tree=null;
        var NEWLINE49_tree=null;
        var ELSESTATEMENT51_tree=null;
        var IFSTATEMENT52_tree=null;
        var THENSTATEMENT54_tree=null;
        var NEWLINE55_tree=null;
        var ELSESTATEMENT57_tree=null;
        var NEWLINE58_tree=null;
        var ENDBLOCK60_tree=null;
        var IFSTATEMENT61_tree=null;
        var stream_IFSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IFSTATEMENT");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_ELSESTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ELSESTATEMENT");
        var stream_THENSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token THENSTATEMENT");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:155:2: ( IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock ( ELSESTATEMENT IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock )* ( ELSESTATEMENT ( NEWLINE )+ innerBlock )? ENDBLOCK IFSTATEMENT -> ^( IFTHENELSE ^( PARAMS ( logicalExpression )+ ) ^( PARAMS ( innerBlock )+ ) ) )
            // /Library/WebServer/Documents/calc/Formula.g:155:4: IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock ( ELSESTATEMENT IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock )* ( ELSESTATEMENT ( NEWLINE )+ innerBlock )? ENDBLOCK IFSTATEMENT
            IFSTATEMENT46=this.match(this.input,IFSTATEMENT,FormulaParser.FOLLOW_IFSTATEMENT_in_ifThenElse748); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IFSTATEMENT.add(IFSTATEMENT46);

            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_ifThenElse750);
            logicalExpression47=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression47.getTree());
            THENSTATEMENT48=this.match(this.input,THENSTATEMENT,FormulaParser.FOLLOW_THENSTATEMENT_in_ifThenElse752); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_THENSTATEMENT.add(THENSTATEMENT48);

            // /Library/WebServer/Documents/calc/Formula.g:155:49: ( NEWLINE )+
            var cnt12=0;
            loop12:
            do {
                var alt12=2;
                var LA12_0 = this.input.LA(1);

                if ( (LA12_0==NEWLINE) ) {
                    alt12=1;
                }


                switch (alt12) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE49=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_ifThenElse755); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE49);



                    break;

                default :
                    if ( cnt12 >= 1 ) {
                        break loop12;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(12, this.input);
                        throw eee;
                }
                cnt12++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_ifThenElse758);
            innerBlock50=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock50.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:155:70: ( ELSESTATEMENT IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock )*
            loop14:
            do {
                var alt14=2;
                var LA14_0 = this.input.LA(1);

                if ( (LA14_0==ELSESTATEMENT) ) {
                    var LA14_1 = this.input.LA(2);

                    if ( (LA14_1==IFSTATEMENT) ) {
                        alt14=1;
                    }


                }


                switch (alt14) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:155:71: ELSESTATEMENT IFSTATEMENT logicalExpression THENSTATEMENT ( NEWLINE )+ innerBlock
                    ELSESTATEMENT51=this.match(this.input,ELSESTATEMENT,FormulaParser.FOLLOW_ELSESTATEMENT_in_ifThenElse762); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ELSESTATEMENT.add(ELSESTATEMENT51);

                    IFSTATEMENT52=this.match(this.input,IFSTATEMENT,FormulaParser.FOLLOW_IFSTATEMENT_in_ifThenElse764); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_IFSTATEMENT.add(IFSTATEMENT52);

                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_ifThenElse766);
                    logicalExpression53=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression53.getTree());
                    THENSTATEMENT54=this.match(this.input,THENSTATEMENT,FormulaParser.FOLLOW_THENSTATEMENT_in_ifThenElse768); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_THENSTATEMENT.add(THENSTATEMENT54);

                    // /Library/WebServer/Documents/calc/Formula.g:155:129: ( NEWLINE )+
                    var cnt13=0;
                    loop13:
                    do {
                        var alt13=2;
                        var LA13_0 = this.input.LA(1);

                        if ( (LA13_0==NEWLINE) ) {
                            alt13=1;
                        }


                        switch (alt13) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE55=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_ifThenElse770); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE55);



                            break;

                        default :
                            if ( cnt13 >= 1 ) {
                                break loop13;
                            }
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var eee = new org.antlr.runtime.EarlyExitException(13, this.input);
                                throw eee;
                        }
                        cnt13++;
                    } while (true);

                    this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_ifThenElse773);
                    innerBlock56=this.innerBlock();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock56.getTree());


                    break;

                default :
                    break loop14;
                }
            } while (true);

            // /Library/WebServer/Documents/calc/Formula.g:155:151: ( ELSESTATEMENT ( NEWLINE )+ innerBlock )?
            var alt16=2;
            var LA16_0 = this.input.LA(1);

            if ( (LA16_0==ELSESTATEMENT) ) {
                alt16=1;
            }
            switch (alt16) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:155:152: ELSESTATEMENT ( NEWLINE )+ innerBlock
                    ELSESTATEMENT57=this.match(this.input,ELSESTATEMENT,FormulaParser.FOLLOW_ELSESTATEMENT_in_ifThenElse778); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ELSESTATEMENT.add(ELSESTATEMENT57);

                    // /Library/WebServer/Documents/calc/Formula.g:155:166: ( NEWLINE )+
                    var cnt15=0;
                    loop15:
                    do {
                        var alt15=2;
                        var LA15_0 = this.input.LA(1);

                        if ( (LA15_0==NEWLINE) ) {
                            alt15=1;
                        }


                        switch (alt15) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE58=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_ifThenElse780); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE58);



                            break;

                        default :
                            if ( cnt15 >= 1 ) {
                                break loop15;
                            }
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var eee = new org.antlr.runtime.EarlyExitException(15, this.input);
                                throw eee;
                        }
                        cnt15++;
                    } while (true);

                    this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_ifThenElse783);
                    innerBlock59=this.innerBlock();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock59.getTree());


                    break;

            }

            ENDBLOCK60=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_ifThenElse787); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK60);

            IFSTATEMENT61=this.match(this.input,IFSTATEMENT,FormulaParser.FOLLOW_IFSTATEMENT_in_ifThenElse789); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IFSTATEMENT.add(IFSTATEMENT61);



            // AST REWRITE
            // elements: innerBlock, logicalExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 155:209: -> ^( IFTHENELSE ^( PARAMS ( logicalExpression )+ ) ^( PARAMS ( innerBlock )+ ) )
            {
                // /Library/WebServer/Documents/calc/Formula.g:155:212: ^( IFTHENELSE ^( PARAMS ( logicalExpression )+ ) ^( PARAMS ( innerBlock )+ ) )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(IFTHENELSE, "IFTHENELSE"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:155:225: ^( PARAMS ( logicalExpression )+ )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(PARAMS, "PARAMS"), root_2);

                if ( !(stream_logicalExpression.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_logicalExpression.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_logicalExpression.nextTree());

                }
                stream_logicalExpression.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                // /Library/WebServer/Documents/calc/Formula.g:155:254: ^( PARAMS ( innerBlock )+ )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(PARAMS, "PARAMS"), root_2);

                if ( !(stream_innerBlock.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_innerBlock.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_innerBlock.nextTree());

                }
                stream_innerBlock.reset();

                this.adaptor.addChild(root_1, root_2);
                }

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    functionDef_return: (function() {
        FormulaParser.functionDef_return = function(){};
        org.antlr.lang.extend(FormulaParser.functionDef_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:158:1: functionDef : FUNCTIONSTATEMENT IDENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT -> ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) innerBlock ) ;
    // $ANTLR start "functionDef"
    functionDef: function() {
        var retval = new FormulaParser.functionDef_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FUNCTIONSTATEMENT62 = null;
        var IDENT63 = null;
        var char_literal64 = null;
        var IDENT65 = null;
        var EQUALS66 = null;
        var char_literal68 = null;
        var IDENT69 = null;
        var char_literal70 = null;
        var IDENT71 = null;
        var EQUALS72 = null;
        var char_literal74 = null;
        var NEWLINE75 = null;
        var ENDBLOCK77 = null;
        var FUNCTIONSTATEMENT78 = null;
         var defaultValue67 = null;
         var defaultValue73 = null;
         var innerBlock76 = null;

        var FUNCTIONSTATEMENT62_tree=null;
        var IDENT63_tree=null;
        var char_literal64_tree=null;
        var IDENT65_tree=null;
        var EQUALS66_tree=null;
        var char_literal68_tree=null;
        var IDENT69_tree=null;
        var char_literal70_tree=null;
        var IDENT71_tree=null;
        var EQUALS72_tree=null;
        var char_literal74_tree=null;
        var NEWLINE75_tree=null;
        var ENDBLOCK77_tree=null;
        var FUNCTIONSTATEMENT78_tree=null;
        var stream_FUNCTIONSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FUNCTIONSTATEMENT");
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_EQUALS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EQUALS");
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        var stream_defaultValue=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule defaultValue");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:159:2: ( FUNCTIONSTATEMENT IDENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT -> ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) innerBlock ) )
            // /Library/WebServer/Documents/calc/Formula.g:159:4: FUNCTIONSTATEMENT IDENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT
            FUNCTIONSTATEMENT62=this.match(this.input,FUNCTIONSTATEMENT,FormulaParser.FOLLOW_FUNCTIONSTATEMENT_in_functionDef820); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_FUNCTIONSTATEMENT.add(FUNCTIONSTATEMENT62);

            IDENT63=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_functionDef822); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT63);

            char_literal64=this.match(this.input,113,FormulaParser.FOLLOW_113_in_functionDef824); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_113.add(char_literal64);

            // /Library/WebServer/Documents/calc/Formula.g:159:32: ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )?
            var alt20=2;
            var LA20_0 = this.input.LA(1);

            if ( (LA20_0==IDENT) ) {
                alt20=1;
            }
            switch (alt20) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:159:33: IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )*
                    IDENT65=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_functionDef827); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT65);

                    // /Library/WebServer/Documents/calc/Formula.g:159:40: ( EQUALS defaultValue | ( ',' IDENT )* )
                    var alt18=2;
                    var LA18_0 = this.input.LA(1);

                    if ( (LA18_0==EQUALS) ) {
                        alt18=1;
                    }
                    else if ( (LA18_0==COMMA||LA18_0==114) ) {
                        alt18=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 18, 0, this.input);

                        throw nvae;
                    }
                    switch (alt18) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:159:41: EQUALS defaultValue
                            EQUALS66=this.match(this.input,EQUALS,FormulaParser.FOLLOW_EQUALS_in_functionDef831); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_EQUALS.add(EQUALS66);

                            this.pushFollow(FormulaParser.FOLLOW_defaultValue_in_functionDef834);
                            defaultValue67=this.defaultValue();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_defaultValue.add(defaultValue67.getTree());


                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:159:64: ( ',' IDENT )*
                            // /Library/WebServer/Documents/calc/Formula.g:159:64: ( ',' IDENT )*
                            loop17:
                            do {
                                var alt17=2;
                                var LA17_0 = this.input.LA(1);

                                if ( (LA17_0==COMMA) ) {
                                    var LA17_1 = this.input.LA(2);

                                    if ( (LA17_1==IDENT) ) {
                                        var LA17_3 = this.input.LA(3);

                                        if ( (LA17_3==COMMA||LA17_3==114) ) {
                                            alt17=1;
                                        }


                                    }


                                }


                                switch (alt17) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:159:65: ',' IDENT
                                    char_literal68=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_functionDef839); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal68);

                                    IDENT69=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_functionDef841); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT69);



                                    break;

                                default :
                                    break loop17;
                                }
                            } while (true);



                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:159:79: ( ',' IDENT EQUALS defaultValue )*
                    loop19:
                    do {
                        var alt19=2;
                        var LA19_0 = this.input.LA(1);

                        if ( (LA19_0==COMMA) ) {
                            alt19=1;
                        }


                        switch (alt19) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:159:80: ',' IDENT EQUALS defaultValue
                            char_literal70=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_functionDef848); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal70);

                            IDENT71=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_functionDef850); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT71);

                            EQUALS72=this.match(this.input,EQUALS,FormulaParser.FOLLOW_EQUALS_in_functionDef852); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_EQUALS.add(EQUALS72);

                            this.pushFollow(FormulaParser.FOLLOW_defaultValue_in_functionDef854);
                            defaultValue73=this.defaultValue();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_defaultValue.add(defaultValue73.getTree());


                            break;

                        default :
                            break loop19;
                        }
                    } while (true);



                    break;

            }

            char_literal74=this.match(this.input,114,FormulaParser.FOLLOW_114_in_functionDef861); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal74);

            // /Library/WebServer/Documents/calc/Formula.g:159:119: ( NEWLINE )+
            var cnt21=0;
            loop21:
            do {
                var alt21=2;
                var LA21_0 = this.input.LA(1);

                if ( (LA21_0==NEWLINE) ) {
                    alt21=1;
                }


                switch (alt21) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE75=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_functionDef863); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE75);



                    break;

                default :
                    if ( cnt21 >= 1 ) {
                        break loop21;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(21, this.input);
                        throw eee;
                }
                cnt21++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_functionDef866);
            innerBlock76=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock76.getTree());
            ENDBLOCK77=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_functionDef869); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK77);

            FUNCTIONSTATEMENT78=this.match(this.input,FUNCTIONSTATEMENT,FormulaParser.FOLLOW_FUNCTIONSTATEMENT_in_functionDef871); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_FUNCTIONSTATEMENT.add(FUNCTIONSTATEMENT78);



            // AST REWRITE
            // elements: innerBlock, defaultValue, IDENT
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 159:167: -> ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) innerBlock )
            {
                // /Library/WebServer/Documents/calc/Formula.g:159:170: ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) innerBlock )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(FUNCTION, "FUNCTION"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:159:181: ^( PARAMS ( IDENT )* )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(PARAMS, "PARAMS"), root_2);

                // /Library/WebServer/Documents/calc/Formula.g:159:190: ( IDENT )*
                while ( stream_IDENT.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_IDENT.nextNode());

                }
                stream_IDENT.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                // /Library/WebServer/Documents/calc/Formula.g:159:198: ^( DEFAULTS ( defaultValue )* )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(DEFAULTS, "DEFAULTS"), root_2);

                // /Library/WebServer/Documents/calc/Formula.g:159:209: ( defaultValue )*
                while ( stream_defaultValue.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_defaultValue.nextTree());

                }
                stream_defaultValue.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                this.adaptor.addChild(root_1, stream_innerBlock.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    tryCatch_return: (function() {
        FormulaParser.tryCatch_return = function(){};
        org.antlr.lang.extend(FormulaParser.tryCatch_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:162:1: tryCatch : TRYSTATEMENT ( NEWLINE )+ innerBlock CATCHSTATEMENT IDENT ( NEWLINE )+ innerBlock ENDBLOCK TRYSTATEMENT -> ^( TRYCATCH ( innerBlock )* IDENT ) ;
    // $ANTLR start "tryCatch"
    tryCatch: function() {
        var retval = new FormulaParser.tryCatch_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var TRYSTATEMENT79 = null;
        var NEWLINE80 = null;
        var CATCHSTATEMENT82 = null;
        var IDENT83 = null;
        var NEWLINE84 = null;
        var ENDBLOCK86 = null;
        var TRYSTATEMENT87 = null;
         var innerBlock81 = null;
         var innerBlock85 = null;

        var TRYSTATEMENT79_tree=null;
        var NEWLINE80_tree=null;
        var CATCHSTATEMENT82_tree=null;
        var IDENT83_tree=null;
        var NEWLINE84_tree=null;
        var ENDBLOCK86_tree=null;
        var TRYSTATEMENT87_tree=null;
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_TRYSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token TRYSTATEMENT");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_CATCHSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token CATCHSTATEMENT");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:163:2: ( TRYSTATEMENT ( NEWLINE )+ innerBlock CATCHSTATEMENT IDENT ( NEWLINE )+ innerBlock ENDBLOCK TRYSTATEMENT -> ^( TRYCATCH ( innerBlock )* IDENT ) )
            // /Library/WebServer/Documents/calc/Formula.g:163:4: TRYSTATEMENT ( NEWLINE )+ innerBlock CATCHSTATEMENT IDENT ( NEWLINE )+ innerBlock ENDBLOCK TRYSTATEMENT
            TRYSTATEMENT79=this.match(this.input,TRYSTATEMENT,FormulaParser.FOLLOW_TRYSTATEMENT_in_tryCatch904); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_TRYSTATEMENT.add(TRYSTATEMENT79);

            // /Library/WebServer/Documents/calc/Formula.g:163:17: ( NEWLINE )+
            var cnt22=0;
            loop22:
            do {
                var alt22=2;
                var LA22_0 = this.input.LA(1);

                if ( (LA22_0==NEWLINE) ) {
                    alt22=1;
                }


                switch (alt22) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE80=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_tryCatch906); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE80);



                    break;

                default :
                    if ( cnt22 >= 1 ) {
                        break loop22;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(22, this.input);
                        throw eee;
                }
                cnt22++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_tryCatch909);
            innerBlock81=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock81.getTree());
            CATCHSTATEMENT82=this.match(this.input,CATCHSTATEMENT,FormulaParser.FOLLOW_CATCHSTATEMENT_in_tryCatch911); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_CATCHSTATEMENT.add(CATCHSTATEMENT82);

            IDENT83=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_tryCatch913); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT83);

            // /Library/WebServer/Documents/calc/Formula.g:163:58: ( NEWLINE )+
            var cnt23=0;
            loop23:
            do {
                var alt23=2;
                var LA23_0 = this.input.LA(1);

                if ( (LA23_0==NEWLINE) ) {
                    alt23=1;
                }


                switch (alt23) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE84=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_tryCatch915); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE84);



                    break;

                default :
                    if ( cnt23 >= 1 ) {
                        break loop23;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(23, this.input);
                        throw eee;
                }
                cnt23++;
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_tryCatch919);
            innerBlock85=this.innerBlock();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock85.getTree());
            ENDBLOCK86=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_tryCatch921); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK86);

            TRYSTATEMENT87=this.match(this.input,TRYSTATEMENT,FormulaParser.FOLLOW_TRYSTATEMENT_in_tryCatch923); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_TRYSTATEMENT.add(TRYSTATEMENT87);



            // AST REWRITE
            // elements: IDENT, innerBlock
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 163:101: -> ^( TRYCATCH ( innerBlock )* IDENT )
            {
                // /Library/WebServer/Documents/calc/Formula.g:163:104: ^( TRYCATCH ( innerBlock )* IDENT )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(TRYCATCH, "TRYCATCH"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:163:115: ( innerBlock )*
                while ( stream_innerBlock.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_innerBlock.nextTree());

                }
                stream_innerBlock.reset();
                this.adaptor.addChild(root_1, stream_IDENT.nextNode());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    throwExp_return: (function() {
        FormulaParser.throwExp_return = function(){};
        org.antlr.lang.extend(FormulaParser.throwExp_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:166:1: throwExp : THROWSTATEMENT primaryExpression -> ^( THROW primaryExpression ) ;
    // $ANTLR start "throwExp"
    throwExp: function() {
        var retval = new FormulaParser.throwExp_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var THROWSTATEMENT88 = null;
         var primaryExpression89 = null;

        var THROWSTATEMENT88_tree=null;
        var stream_THROWSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token THROWSTATEMENT");
        var stream_primaryExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule primaryExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:167:2: ( THROWSTATEMENT primaryExpression -> ^( THROW primaryExpression ) )
            // /Library/WebServer/Documents/calc/Formula.g:167:4: THROWSTATEMENT primaryExpression
            THROWSTATEMENT88=this.match(this.input,THROWSTATEMENT,FormulaParser.FOLLOW_THROWSTATEMENT_in_throwExp945); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_THROWSTATEMENT.add(THROWSTATEMENT88);

            this.pushFollow(FormulaParser.FOLLOW_primaryExpression_in_throwExp947);
            primaryExpression89=this.primaryExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_primaryExpression.add(primaryExpression89.getTree());


            // AST REWRITE
            // elements: primaryExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 167:37: -> ^( THROW primaryExpression )
            {
                // /Library/WebServer/Documents/calc/Formula.g:167:40: ^( THROW primaryExpression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(THROW, "THROW"), root_1);

                this.adaptor.addChild(root_1, stream_primaryExpression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    anonFunctionDef_return: (function() {
        FormulaParser.anonFunctionDef_return = function(){};
        org.antlr.lang.extend(FormulaParser.anonFunctionDef_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:170:1: anonFunctionDef : FUNCTIONSTATEMENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' ( ( ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT ) | expression ) -> ^( ANONFUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) ( innerBlock )? ( expression )? ) ;
    // $ANTLR start "anonFunctionDef"
    anonFunctionDef: function() {
        var retval = new FormulaParser.anonFunctionDef_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FUNCTIONSTATEMENT90 = null;
        var char_literal91 = null;
        var IDENT92 = null;
        var EQUALS93 = null;
        var char_literal95 = null;
        var IDENT96 = null;
        var char_literal97 = null;
        var IDENT98 = null;
        var EQUALS99 = null;
        var char_literal101 = null;
        var NEWLINE102 = null;
        var ENDBLOCK104 = null;
        var FUNCTIONSTATEMENT105 = null;
         var defaultValue94 = null;
         var defaultValue100 = null;
         var innerBlock103 = null;
         var expression106 = null;

        var FUNCTIONSTATEMENT90_tree=null;
        var char_literal91_tree=null;
        var IDENT92_tree=null;
        var EQUALS93_tree=null;
        var char_literal95_tree=null;
        var IDENT96_tree=null;
        var char_literal97_tree=null;
        var IDENT98_tree=null;
        var EQUALS99_tree=null;
        var char_literal101_tree=null;
        var NEWLINE102_tree=null;
        var ENDBLOCK104_tree=null;
        var FUNCTIONSTATEMENT105_tree=null;
        var stream_FUNCTIONSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FUNCTIONSTATEMENT");
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_EQUALS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EQUALS");
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_ENDBLOCK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ENDBLOCK");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_innerBlock=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule innerBlock");
        var stream_defaultValue=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule defaultValue");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:171:2: ( FUNCTIONSTATEMENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' ( ( ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT ) | expression ) -> ^( ANONFUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) ( innerBlock )? ( expression )? ) )
            // /Library/WebServer/Documents/calc/Formula.g:171:4: FUNCTIONSTATEMENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' ( ( ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT ) | expression )
            FUNCTIONSTATEMENT90=this.match(this.input,FUNCTIONSTATEMENT,FormulaParser.FOLLOW_FUNCTIONSTATEMENT_in_anonFunctionDef967); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_FUNCTIONSTATEMENT.add(FUNCTIONSTATEMENT90);

            char_literal91=this.match(this.input,113,FormulaParser.FOLLOW_113_in_anonFunctionDef970); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_113.add(char_literal91);

            // /Library/WebServer/Documents/calc/Formula.g:171:27: ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )?
            var alt27=2;
            var LA27_0 = this.input.LA(1);

            if ( (LA27_0==IDENT) ) {
                alt27=1;
            }
            switch (alt27) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:171:28: IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )*
                    IDENT92=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_anonFunctionDef973); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT92);

                    // /Library/WebServer/Documents/calc/Formula.g:171:35: ( EQUALS defaultValue | ( ',' IDENT )* )
                    var alt25=2;
                    var LA25_0 = this.input.LA(1);

                    if ( (LA25_0==EQUALS) ) {
                        alt25=1;
                    }
                    else if ( (LA25_0==COMMA||LA25_0==114) ) {
                        alt25=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 25, 0, this.input);

                        throw nvae;
                    }
                    switch (alt25) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:171:36: EQUALS defaultValue
                            EQUALS93=this.match(this.input,EQUALS,FormulaParser.FOLLOW_EQUALS_in_anonFunctionDef977); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_EQUALS.add(EQUALS93);

                            this.pushFollow(FormulaParser.FOLLOW_defaultValue_in_anonFunctionDef980);
                            defaultValue94=this.defaultValue();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_defaultValue.add(defaultValue94.getTree());


                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:171:59: ( ',' IDENT )*
                            // /Library/WebServer/Documents/calc/Formula.g:171:59: ( ',' IDENT )*
                            loop24:
                            do {
                                var alt24=2;
                                var LA24_0 = this.input.LA(1);

                                if ( (LA24_0==COMMA) ) {
                                    var LA24_1 = this.input.LA(2);

                                    if ( (LA24_1==IDENT) ) {
                                        var LA24_3 = this.input.LA(3);

                                        if ( (LA24_3==COMMA||LA24_3==114) ) {
                                            alt24=1;
                                        }


                                    }


                                }


                                switch (alt24) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:171:60: ',' IDENT
                                    char_literal95=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_anonFunctionDef985); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal95);

                                    IDENT96=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_anonFunctionDef987); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT96);



                                    break;

                                default :
                                    break loop24;
                                }
                            } while (true);



                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:171:74: ( ',' IDENT EQUALS defaultValue )*
                    loop26:
                    do {
                        var alt26=2;
                        var LA26_0 = this.input.LA(1);

                        if ( (LA26_0==COMMA) ) {
                            alt26=1;
                        }


                        switch (alt26) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:171:75: ',' IDENT EQUALS defaultValue
                            char_literal97=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_anonFunctionDef994); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal97);

                            IDENT98=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_anonFunctionDef996); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT98);

                            EQUALS99=this.match(this.input,EQUALS,FormulaParser.FOLLOW_EQUALS_in_anonFunctionDef998); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_EQUALS.add(EQUALS99);

                            this.pushFollow(FormulaParser.FOLLOW_defaultValue_in_anonFunctionDef1000);
                            defaultValue100=this.defaultValue();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_defaultValue.add(defaultValue100.getTree());


                            break;

                        default :
                            break loop26;
                        }
                    } while (true);



                    break;

            }

            char_literal101=this.match(this.input,114,FormulaParser.FOLLOW_114_in_anonFunctionDef1007); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal101);

            // /Library/WebServer/Documents/calc/Formula.g:171:114: ( ( ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT ) | expression )
            var alt29=2;
            var LA29_0 = this.input.LA(1);

            if ( (LA29_0==NEWLINE) ) {
                alt29=1;
            }
            else if ( (LA29_0==WHILESTATEMENT||LA29_0==FORSTATEMENT||LA29_0==IFSTATEMENT||LA29_0==FUNCTIONSTATEMENT||(LA29_0>=RETURNSTATEMENT && LA29_0<=TRYSTATEMENT)||(LA29_0>=THROWSTATEMENT && LA29_0<=IDENT)||LA29_0==PRIMITIVE||LA29_0==MINUS||(LA29_0>=NOT && LA29_0<=LARR)||LA29_0==LCURL||(LA29_0>=STRING && LA29_0<=FALSE)||LA29_0==113) ) {
                alt29=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 29, 0, this.input);

                throw nvae;
            }
            switch (alt29) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:171:116: ( ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT )
                    // /Library/WebServer/Documents/calc/Formula.g:171:116: ( ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT )
                    // /Library/WebServer/Documents/calc/Formula.g:171:117: ( NEWLINE )+ innerBlock ENDBLOCK FUNCTIONSTATEMENT
                    // /Library/WebServer/Documents/calc/Formula.g:171:117: ( NEWLINE )+
                    var cnt28=0;
                    loop28:
                    do {
                        var alt28=2;
                        var LA28_0 = this.input.LA(1);

                        if ( (LA28_0==NEWLINE) ) {
                            alt28=1;
                        }


                        switch (alt28) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE102=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_anonFunctionDef1012); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE102);



                            break;

                        default :
                            if ( cnt28 >= 1 ) {
                                break loop28;
                            }
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var eee = new org.antlr.runtime.EarlyExitException(28, this.input);
                                throw eee;
                        }
                        cnt28++;
                    } while (true);

                    this.pushFollow(FormulaParser.FOLLOW_innerBlock_in_anonFunctionDef1015);
                    innerBlock103=this.innerBlock();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_innerBlock.add(innerBlock103.getTree());
                    ENDBLOCK104=this.match(this.input,ENDBLOCK,FormulaParser.FOLLOW_ENDBLOCK_in_anonFunctionDef1018); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ENDBLOCK.add(ENDBLOCK104);

                    FUNCTIONSTATEMENT105=this.match(this.input,FUNCTIONSTATEMENT,FormulaParser.FOLLOW_FUNCTIONSTATEMENT_in_anonFunctionDef1020); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_FUNCTIONSTATEMENT.add(FUNCTIONSTATEMENT105);






                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:171:168: expression
                    this.pushFollow(FormulaParser.FOLLOW_expression_in_anonFunctionDef1025);
                    expression106=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expression.add(expression106.getTree());


                    break;

            }



            // AST REWRITE
            // elements: defaultValue, innerBlock, IDENT, expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 171:180: -> ^( ANONFUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) ( innerBlock )? ( expression )? )
            {
                // /Library/WebServer/Documents/calc/Formula.g:171:183: ^( ANONFUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) ( innerBlock )? ( expression )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ANONFUNCTION, "ANONFUNCTION"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:171:198: ^( PARAMS ( IDENT )* )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(PARAMS, "PARAMS"), root_2);

                // /Library/WebServer/Documents/calc/Formula.g:171:207: ( IDENT )*
                while ( stream_IDENT.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_IDENT.nextNode());

                }
                stream_IDENT.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                // /Library/WebServer/Documents/calc/Formula.g:171:215: ^( DEFAULTS ( defaultValue )* )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(DEFAULTS, "DEFAULTS"), root_2);

                // /Library/WebServer/Documents/calc/Formula.g:171:226: ( defaultValue )*
                while ( stream_defaultValue.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_defaultValue.nextTree());

                }
                stream_defaultValue.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                // /Library/WebServer/Documents/calc/Formula.g:171:241: ( innerBlock )?
                if ( stream_innerBlock.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_innerBlock.nextTree());

                }
                stream_innerBlock.reset();
                // /Library/WebServer/Documents/calc/Formula.g:171:253: ( expression )?
                if ( stream_expression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_expression.nextTree());

                }
                stream_expression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    assignment_return: (function() {
        FormulaParser.assignment_return = function(){};
        org.antlr.lang.extend(FormulaParser.assignment_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:175:1: assignment : ( IDENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' '<-' logicalExpression -> ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) logicalExpression ) | ( PRIMITIVE | assigned ) ( ',' ( PRIMITIVE | assigned ) )* '<-' logicalExpression -> ^( ASSIGN ( PRIMITIVE )* ( assigned )* logicalExpression ) );
    // $ANTLR start "assignment"
    assignment: function() {
        var retval = new FormulaParser.assignment_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IDENT107 = null;
        var char_literal108 = null;
        var IDENT109 = null;
        var EQUALS110 = null;
        var char_literal112 = null;
        var IDENT113 = null;
        var char_literal114 = null;
        var IDENT115 = null;
        var EQUALS116 = null;
        var char_literal118 = null;
        var string_literal119 = null;
        var PRIMITIVE121 = null;
        var char_literal123 = null;
        var PRIMITIVE124 = null;
        var string_literal126 = null;
         var defaultValue111 = null;
         var defaultValue117 = null;
         var logicalExpression120 = null;
         var assigned122 = null;
         var assigned125 = null;
         var logicalExpression127 = null;

        var IDENT107_tree=null;
        var char_literal108_tree=null;
        var IDENT109_tree=null;
        var EQUALS110_tree=null;
        var char_literal112_tree=null;
        var IDENT113_tree=null;
        var char_literal114_tree=null;
        var IDENT115_tree=null;
        var EQUALS116_tree=null;
        var char_literal118_tree=null;
        var string_literal119_tree=null;
        var PRIMITIVE121_tree=null;
        var char_literal123_tree=null;
        var PRIMITIVE124_tree=null;
        var string_literal126_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_EQUALS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EQUALS");
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_PRIMITIVE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token PRIMITIVE");
        var stream_assigned=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule assigned");
        var stream_defaultValue=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule defaultValue");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:176:2: ( IDENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' '<-' logicalExpression -> ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) logicalExpression ) | ( PRIMITIVE | assigned ) ( ',' ( PRIMITIVE | assigned ) )* '<-' logicalExpression -> ^( ASSIGN ( PRIMITIVE )* ( assigned )* logicalExpression ) )
            var alt37=2;
            var LA37_0 = this.input.LA(1);

            if ( (LA37_0==IDENT) ) {
                var LA37_1 = this.input.LA(2);

                if ( (LA37_1==113) ) {
                    alt37=1;
                }
                else if ( (LA37_1==LARR||LA37_1==LCURL||LA37_1==COMMA||(LA37_1>=115 && LA37_1<=116)) ) {
                    alt37=2;
                }
                else {
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 37, 1, this.input);

                    throw nvae;
                }
            }
            else if ( (LA37_0==PRIMITIVE) ) {
                alt37=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 37, 0, this.input);

                throw nvae;
            }
            switch (alt37) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:177:2: IDENT '(' ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )? ')' '<-' logicalExpression
                    IDENT107=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_assignment1067); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT107);

                    char_literal108=this.match(this.input,113,FormulaParser.FOLLOW_113_in_assignment1069); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_113.add(char_literal108);

                    // /Library/WebServer/Documents/calc/Formula.g:177:12: ( IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )* )?
                    var alt33=2;
                    var LA33_0 = this.input.LA(1);

                    if ( (LA33_0==IDENT) ) {
                        alt33=1;
                    }
                    switch (alt33) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:177:13: IDENT ( EQUALS defaultValue | ( ',' IDENT )* ) ( ',' IDENT EQUALS defaultValue )*
                            IDENT109=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_assignment1072); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT109);

                            // /Library/WebServer/Documents/calc/Formula.g:177:20: ( EQUALS defaultValue | ( ',' IDENT )* )
                            var alt31=2;
                            var LA31_0 = this.input.LA(1);

                            if ( (LA31_0==EQUALS) ) {
                                alt31=1;
                            }
                            else if ( (LA31_0==COMMA||LA31_0==114) ) {
                                alt31=2;
                            }
                            else {
                                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var nvae =
                                    new org.antlr.runtime.NoViableAltException("", 31, 0, this.input);

                                throw nvae;
                            }
                            switch (alt31) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:177:21: EQUALS defaultValue
                                    EQUALS110=this.match(this.input,EQUALS,FormulaParser.FOLLOW_EQUALS_in_assignment1076); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_EQUALS.add(EQUALS110);

                                    this.pushFollow(FormulaParser.FOLLOW_defaultValue_in_assignment1078);
                                    defaultValue111=this.defaultValue();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) stream_defaultValue.add(defaultValue111.getTree());


                                    break;
                                case 2 :
                                    // /Library/WebServer/Documents/calc/Formula.g:177:43: ( ',' IDENT )*
                                    // /Library/WebServer/Documents/calc/Formula.g:177:43: ( ',' IDENT )*
                                    loop30:
                                    do {
                                        var alt30=2;
                                        var LA30_0 = this.input.LA(1);

                                        if ( (LA30_0==COMMA) ) {
                                            var LA30_1 = this.input.LA(2);

                                            if ( (LA30_1==IDENT) ) {
                                                var LA30_3 = this.input.LA(3);

                                                if ( (LA30_3==COMMA||LA30_3==114) ) {
                                                    alt30=1;
                                                }


                                            }


                                        }


                                        switch (alt30) {
                                        case 1 :
                                            // /Library/WebServer/Documents/calc/Formula.g:177:44: ',' IDENT
                                            char_literal112=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_assignment1083); if (this.state.failed) return retval; 
                                            if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal112);

                                            IDENT113=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_assignment1085); if (this.state.failed) return retval; 
                                            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT113);



                                            break;

                                        default :
                                            break loop30;
                                        }
                                    } while (true);



                                    break;

                            }

                            // /Library/WebServer/Documents/calc/Formula.g:177:58: ( ',' IDENT EQUALS defaultValue )*
                            loop32:
                            do {
                                var alt32=2;
                                var LA32_0 = this.input.LA(1);

                                if ( (LA32_0==COMMA) ) {
                                    alt32=1;
                                }


                                switch (alt32) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:177:59: ',' IDENT EQUALS defaultValue
                                    char_literal114=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_assignment1092); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal114);

                                    IDENT115=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_assignment1094); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT115);

                                    EQUALS116=this.match(this.input,EQUALS,FormulaParser.FOLLOW_EQUALS_in_assignment1096); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_EQUALS.add(EQUALS116);

                                    this.pushFollow(FormulaParser.FOLLOW_defaultValue_in_assignment1098);
                                    defaultValue117=this.defaultValue();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) stream_defaultValue.add(defaultValue117.getTree());


                                    break;

                                default :
                                    break loop32;
                                }
                            } while (true);



                            break;

                    }

                    char_literal118=this.match(this.input,114,FormulaParser.FOLLOW_114_in_assignment1105); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_114.add(char_literal118);

                    string_literal119=this.match(this.input,115,FormulaParser.FOLLOW_115_in_assignment1107); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_115.add(string_literal119);

                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_assignment1109);
                    logicalExpression120=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression120.getTree());


                    // AST REWRITE
                    // elements: defaultValue, logicalExpression, IDENT
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 177:121: -> ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) logicalExpression )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:177:124: ^( FUNCTION ^( PARAMS ( IDENT )* ) ^( DEFAULTS ( defaultValue )* ) logicalExpression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(FUNCTION, "FUNCTION"), root_1);

                        // /Library/WebServer/Documents/calc/Formula.g:177:135: ^( PARAMS ( IDENT )* )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(PARAMS, "PARAMS"), root_2);

                        // /Library/WebServer/Documents/calc/Formula.g:177:144: ( IDENT )*
                        while ( stream_IDENT.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_IDENT.nextNode());

                        }
                        stream_IDENT.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // /Library/WebServer/Documents/calc/Formula.g:177:152: ^( DEFAULTS ( defaultValue )* )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(DEFAULTS, "DEFAULTS"), root_2);

                        // /Library/WebServer/Documents/calc/Formula.g:177:163: ( defaultValue )*
                        while ( stream_defaultValue.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_defaultValue.nextTree());

                        }
                        stream_defaultValue.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }
                        this.adaptor.addChild(root_1, stream_logicalExpression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:178:2: ( PRIMITIVE | assigned ) ( ',' ( PRIMITIVE | assigned ) )* '<-' logicalExpression
                    // /Library/WebServer/Documents/calc/Formula.g:178:2: ( PRIMITIVE | assigned )
                    var alt34=2;
                    var LA34_0 = this.input.LA(1);

                    if ( (LA34_0==PRIMITIVE) ) {
                        alt34=1;
                    }
                    else if ( (LA34_0==IDENT) ) {
                        alt34=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 34, 0, this.input);

                        throw nvae;
                    }
                    switch (alt34) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:178:3: PRIMITIVE
                            PRIMITIVE121=this.match(this.input,PRIMITIVE,FormulaParser.FOLLOW_PRIMITIVE_in_assignment1137); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_PRIMITIVE.add(PRIMITIVE121);



                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:178:15: assigned
                            this.pushFollow(FormulaParser.FOLLOW_assigned_in_assignment1141);
                            assigned122=this.assigned();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_assigned.add(assigned122.getTree());


                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:178:25: ( ',' ( PRIMITIVE | assigned ) )*
                    loop36:
                    do {
                        var alt36=2;
                        var LA36_0 = this.input.LA(1);

                        if ( (LA36_0==COMMA) ) {
                            alt36=1;
                        }


                        switch (alt36) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:178:26: ',' ( PRIMITIVE | assigned )
                            char_literal123=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_assignment1145); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal123);

                            // /Library/WebServer/Documents/calc/Formula.g:178:30: ( PRIMITIVE | assigned )
                            var alt35=2;
                            var LA35_0 = this.input.LA(1);

                            if ( (LA35_0==PRIMITIVE) ) {
                                alt35=1;
                            }
                            else if ( (LA35_0==IDENT) ) {
                                alt35=2;
                            }
                            else {
                                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var nvae =
                                    new org.antlr.runtime.NoViableAltException("", 35, 0, this.input);

                                throw nvae;
                            }
                            switch (alt35) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:178:31: PRIMITIVE
                                    PRIMITIVE124=this.match(this.input,PRIMITIVE,FormulaParser.FOLLOW_PRIMITIVE_in_assignment1148); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_PRIMITIVE.add(PRIMITIVE124);



                                    break;
                                case 2 :
                                    // /Library/WebServer/Documents/calc/Formula.g:178:43: assigned
                                    this.pushFollow(FormulaParser.FOLLOW_assigned_in_assignment1152);
                                    assigned125=this.assigned();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) stream_assigned.add(assigned125.getTree());


                                    break;

                            }



                            break;

                        default :
                            break loop36;
                        }
                    } while (true);

                    string_literal126=this.match(this.input,115,FormulaParser.FOLLOW_115_in_assignment1158); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_115.add(string_literal126);

                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_assignment1160);
                    logicalExpression127=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression127.getTree());


                    // AST REWRITE
                    // elements: PRIMITIVE, assigned, logicalExpression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 178:79: -> ^( ASSIGN ( PRIMITIVE )* ( assigned )* logicalExpression )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:178:82: ^( ASSIGN ( PRIMITIVE )* ( assigned )* logicalExpression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(ASSIGN, "ASSIGN"), root_1);

                        // /Library/WebServer/Documents/calc/Formula.g:178:91: ( PRIMITIVE )*
                        while ( stream_PRIMITIVE.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_PRIMITIVE.nextNode());

                        }
                        stream_PRIMITIVE.reset();
                        // /Library/WebServer/Documents/calc/Formula.g:178:102: ( assigned )*
                        while ( stream_assigned.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_assigned.nextTree());

                        }
                        stream_assigned.reset();
                        this.adaptor.addChild(root_1, stream_logicalExpression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    assigned_return: (function() {
        FormulaParser.assigned_return = function(){};
        org.antlr.lang.extend(FormulaParser.assigned_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:181:1: assigned : IDENT ( selector )? -> ^( ASSIGNED IDENT ( selector )? ) ;
    // $ANTLR start "assigned"
    assigned: function() {
        var retval = new FormulaParser.assigned_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IDENT128 = null;
         var selector129 = null;

        var IDENT128_tree=null;
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_selector=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule selector");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:182:2: ( IDENT ( selector )? -> ^( ASSIGNED IDENT ( selector )? ) )
            // /Library/WebServer/Documents/calc/Formula.g:182:4: IDENT ( selector )?
            IDENT128=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_assigned1186); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT128);

            // /Library/WebServer/Documents/calc/Formula.g:182:10: ( selector )?
            var alt38=2;
            var LA38_0 = this.input.LA(1);

            if ( (LA38_0==LARR||LA38_0==LCURL||LA38_0==116) ) {
                alt38=1;
            }
            switch (alt38) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: selector
                    this.pushFollow(FormulaParser.FOLLOW_selector_in_assigned1188);
                    selector129=this.selector();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_selector.add(selector129.getTree());


                    break;

            }



            // AST REWRITE
            // elements: selector, IDENT
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 182:20: -> ^( ASSIGNED IDENT ( selector )? )
            {
                // /Library/WebServer/Documents/calc/Formula.g:182:23: ^( ASSIGNED IDENT ( selector )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ASSIGNED, "ASSIGNED"), root_1);

                this.adaptor.addChild(root_1, stream_IDENT.nextNode());
                // /Library/WebServer/Documents/calc/Formula.g:182:40: ( selector )?
                if ( stream_selector.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_selector.nextTree());

                }
                stream_selector.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    logicalExpression_return: (function() {
        FormulaParser.logicalExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.logicalExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:186:1: logicalExpression : booleanXORExpression ( OR booleanXORExpression )* ;
    // $ANTLR start "logicalExpression"
    logicalExpression: function() {
        var retval = new FormulaParser.logicalExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var OR131 = null;
         var booleanXORExpression130 = null;
         var booleanXORExpression132 = null;

        var OR131_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:187:2: ( booleanXORExpression ( OR booleanXORExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:187:4: booleanXORExpression ( OR booleanXORExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_booleanXORExpression_in_logicalExpression1214);
            booleanXORExpression130=this.booleanXORExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, booleanXORExpression130.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:187:25: ( OR booleanXORExpression )*
            loop39:
            do {
                var alt39=2;
                var LA39_0 = this.input.LA(1);

                if ( (LA39_0==OR) ) {
                    var LA39_2 = this.input.LA(2);

                    if ( (this.synpred47_Formula()) ) {
                        alt39=1;
                    }


                }


                switch (alt39) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:187:26: OR booleanXORExpression
                    OR131=this.match(this.input,OR,FormulaParser.FOLLOW_OR_in_logicalExpression1217); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    OR131_tree = this.adaptor.create(OR131);
                    root_0 = this.adaptor.becomeRoot(OR131_tree, root_0);
                    }
                    this.pushFollow(FormulaParser.FOLLOW_booleanXORExpression_in_logicalExpression1220);
                    booleanXORExpression132=this.booleanXORExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, booleanXORExpression132.getTree());


                    break;

                default :
                    break loop39;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    booleanXORExpression_return: (function() {
        FormulaParser.booleanXORExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.booleanXORExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:192:1: booleanXORExpression : booleanAndExpression ( XOR booleanAndExpression )* ;
    // $ANTLR start "booleanXORExpression"
    booleanXORExpression: function() {
        var retval = new FormulaParser.booleanXORExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var XOR134 = null;
         var booleanAndExpression133 = null;
         var booleanAndExpression135 = null;

        var XOR134_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:193:2: ( booleanAndExpression ( XOR booleanAndExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:193:4: booleanAndExpression ( XOR booleanAndExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_booleanAndExpression_in_booleanXORExpression1250);
            booleanAndExpression133=this.booleanAndExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, booleanAndExpression133.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:193:25: ( XOR booleanAndExpression )*
            loop40:
            do {
                var alt40=2;
                var LA40_0 = this.input.LA(1);

                if ( (LA40_0==XOR) ) {
                    var LA40_2 = this.input.LA(2);

                    if ( (this.synpred48_Formula()) ) {
                        alt40=1;
                    }


                }


                switch (alt40) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:193:26: XOR booleanAndExpression
                    XOR134=this.match(this.input,XOR,FormulaParser.FOLLOW_XOR_in_booleanXORExpression1253); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    XOR134_tree = this.adaptor.create(XOR134);
                    root_0 = this.adaptor.becomeRoot(XOR134_tree, root_0);
                    }
                    this.pushFollow(FormulaParser.FOLLOW_booleanAndExpression_in_booleanXORExpression1256);
                    booleanAndExpression135=this.booleanAndExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, booleanAndExpression135.getTree());


                    break;

                default :
                    break loop40;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    booleanAndExpression_return: (function() {
        FormulaParser.booleanAndExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.booleanAndExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:198:1: booleanAndExpression : equalityExpression ( AND equalityExpression )* ;
    // $ANTLR start "booleanAndExpression"
    booleanAndExpression: function() {
        var retval = new FormulaParser.booleanAndExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var AND137 = null;
         var equalityExpression136 = null;
         var equalityExpression138 = null;

        var AND137_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:199:2: ( equalityExpression ( AND equalityExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:199:4: equalityExpression ( AND equalityExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_equalityExpression_in_booleanAndExpression1285);
            equalityExpression136=this.equalityExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, equalityExpression136.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:199:23: ( AND equalityExpression )*
            loop41:
            do {
                var alt41=2;
                var LA41_0 = this.input.LA(1);

                if ( (LA41_0==AND) ) {
                    var LA41_2 = this.input.LA(2);

                    if ( (this.synpred49_Formula()) ) {
                        alt41=1;
                    }


                }


                switch (alt41) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:199:24: AND equalityExpression
                    AND137=this.match(this.input,AND,FormulaParser.FOLLOW_AND_in_booleanAndExpression1288); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    AND137_tree = this.adaptor.create(AND137);
                    root_0 = this.adaptor.becomeRoot(AND137_tree, root_0);
                    }
                    this.pushFollow(FormulaParser.FOLLOW_equalityExpression_in_booleanAndExpression1291);
                    equalityExpression138=this.equalityExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, equalityExpression138.getTree());


                    break;

                default :
                    break loop41;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    equalityExpression_return: (function() {
        FormulaParser.equalityExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.equalityExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:204:1: equalityExpression : relationalExpression ( ( EQUALS | NOTEQUALS ) relationalExpression )* ;
    // $ANTLR start "equalityExpression"
    equalityExpression: function() {
        var retval = new FormulaParser.equalityExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set140 = null;
         var relationalExpression139 = null;
         var relationalExpression141 = null;

        var set140_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:205:2: ( relationalExpression ( ( EQUALS | NOTEQUALS ) relationalExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:205:4: relationalExpression ( ( EQUALS | NOTEQUALS ) relationalExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_relationalExpression_in_equalityExpression1322);
            relationalExpression139=this.relationalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, relationalExpression139.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:205:25: ( ( EQUALS | NOTEQUALS ) relationalExpression )*
            loop42:
            do {
                var alt42=2;
                var LA42_0 = this.input.LA(1);

                if ( (LA42_0==EQUALS||LA42_0==NOTEQUALS) ) {
                    var LA42_2 = this.input.LA(2);

                    if ( (this.synpred51_Formula()) ) {
                        alt42=1;
                    }


                }


                switch (alt42) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:205:26: ( EQUALS | NOTEQUALS ) relationalExpression
                    
                    set140=this.input.LT(1);
                    if ( this.input.LA(1)==EQUALS||this.input.LA(1)==NOTEQUALS ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set140), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(FormulaParser.FOLLOW_relationalExpression_in_equalityExpression1332);
                    relationalExpression141=this.relationalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, relationalExpression141.getTree());


                    break;

                default :
                    break loop42;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    relationalExpression_return: (function() {
        FormulaParser.relationalExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.relationalExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:215:1: relationalExpression : additiveExpression ( ( LT | LTEQ | GT | GTEQ ) additiveExpression )* ;
    // $ANTLR start "relationalExpression"
    relationalExpression: function() {
        var retval = new FormulaParser.relationalExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set143 = null;
         var additiveExpression142 = null;
         var additiveExpression144 = null;

        var set143_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:216:2: ( additiveExpression ( ( LT | LTEQ | GT | GTEQ ) additiveExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:216:4: additiveExpression ( ( LT | LTEQ | GT | GTEQ ) additiveExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_additiveExpression_in_relationalExpression1374);
            additiveExpression142=this.additiveExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, additiveExpression142.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:216:23: ( ( LT | LTEQ | GT | GTEQ ) additiveExpression )*
            loop43:
            do {
                var alt43=2;
                var LA43_0 = this.input.LA(1);

                if ( ((LA43_0>=LT && LA43_0<=GTEQ)) ) {
                    var LA43_2 = this.input.LA(2);

                    if ( (this.synpred55_Formula()) ) {
                        alt43=1;
                    }


                }


                switch (alt43) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:216:25: ( LT | LTEQ | GT | GTEQ ) additiveExpression
                   
                    set143=this.input.LT(1);
                    if ( (this.input.LA(1)>=LT && this.input.LA(1)<=GTEQ) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set143), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(FormulaParser.FOLLOW_additiveExpression_in_relationalExpression1389);
                    additiveExpression144=this.additiveExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, additiveExpression144.getTree());


                    break;

                default :
                    break loop43;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    additiveExpression_return: (function() {
        FormulaParser.additiveExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.additiveExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:224:1: additiveExpression : multiplicativeExpression ( ( PLUS | MINUS ) multiplicativeExpression )* ;
    // $ANTLR start "additiveExpression"
    additiveExpression: function() {
        var retval = new FormulaParser.additiveExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set146 = null;
         var multiplicativeExpression145 = null;
         var multiplicativeExpression147 = null;

        var set146_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:225:2: ( multiplicativeExpression ( ( PLUS | MINUS ) multiplicativeExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:225:4: multiplicativeExpression ( ( PLUS | MINUS ) multiplicativeExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_multiplicativeExpression_in_additiveExpression1432);
            multiplicativeExpression145=this.multiplicativeExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, multiplicativeExpression145.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:225:29: ( ( PLUS | MINUS ) multiplicativeExpression )*
            loop44:
            do {
                var alt44=2;
                var LA44_0 = this.input.LA(1);

                if ( ((LA44_0>=PLUS && LA44_0<=MINUS)) ) {
                    var LA44_2 = this.input.LA(2);

                    if ( (this.synpred57_Formula()) ) {
                        alt44=1;
                    }


                }


                switch (alt44) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:225:31: ( PLUS | MINUS ) multiplicativeExpression
                    
                    set146=this.input.LT(1);
                    if ( (this.input.LA(1)>=PLUS && this.input.LA(1)<=MINUS) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set146), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(FormulaParser.FOLLOW_multiplicativeExpression_in_additiveExpression1443);
                    multiplicativeExpression147=this.multiplicativeExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, multiplicativeExpression147.getTree());


                    break;

                default :
                    break loop44;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    multiplicativeExpression_return: (function() {
        FormulaParser.multiplicativeExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.multiplicativeExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:231:1: multiplicativeExpression : arrayExpression ( ( MULT | DIV | MOD ) arrayExpression )* ;
    // $ANTLR start "multiplicativeExpression"
    multiplicativeExpression: function() {
        var retval = new FormulaParser.multiplicativeExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set149 = null;
         var arrayExpression148 = null;
         var arrayExpression150 = null;

        var set149_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:232:2: ( arrayExpression ( ( MULT | DIV | MOD ) arrayExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:232:4: arrayExpression ( ( MULT | DIV | MOD ) arrayExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_arrayExpression_in_multiplicativeExpression1473);
            arrayExpression148=this.arrayExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, arrayExpression148.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:232:20: ( ( MULT | DIV | MOD ) arrayExpression )*
            loop45:
            do {
                var alt45=2;
                var LA45_0 = this.input.LA(1);

                if ( ((LA45_0>=MULT && LA45_0<=MOD)) ) {
                    var LA45_2 = this.input.LA(2);

                    if ( (this.synpred60_Formula()) ) {
                        alt45=1;
                    }


                }


                switch (alt45) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:232:22: ( MULT | DIV | MOD ) arrayExpression
                    
                    set149=this.input.LT(1);
                    if ( (this.input.LA(1)>=MULT && this.input.LA(1)<=MOD) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set149), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(FormulaParser.FOLLOW_arrayExpression_in_multiplicativeExpression1486);
                    arrayExpression150=this.arrayExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, arrayExpression150.getTree());


                    break;

                default :
                    break loop45;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    arrayExpression_return: (function() {
        FormulaParser.arrayExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.arrayExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:239:1: arrayExpression : negationExpression ({...}? COLON {...}? negationExpression )? ({...}? COLON {...}? negationExpression )? -> ^( RANGE ( negationExpression )* ) ;
    // $ANTLR start "arrayExpression"
    arrayExpression: function() {
        var retval = new FormulaParser.arrayExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var COLON152 = null;
        var COLON154 = null;
         var negationExpression151 = null;
         var negationExpression153 = null;
         var negationExpression155 = null;

        var COLON152_tree=null;
        var COLON154_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_negationExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule negationExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:240:2: ( negationExpression ({...}? COLON {...}? negationExpression )? ({...}? COLON {...}? negationExpression )? -> ^( RANGE ( negationExpression )* ) )
            // /Library/WebServer/Documents/calc/Formula.g:240:4: negationExpression ({...}? COLON {...}? negationExpression )? ({...}? COLON {...}? negationExpression )?
            this.pushFollow(FormulaParser.FOLLOW_negationExpression_in_arrayExpression1532);
            negationExpression151=this.negationExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_negationExpression.add(negationExpression151.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:240:24: ({...}? COLON {...}? negationExpression )?
            var alt46=2;
            var LA46_0 = this.input.LA(1);

            if ( (LA46_0==COLON) ) {
                var LA46_1 = this.input.LA(2);

                if ( ((this.synpred61_Formula()&&( this.input.get(this.input.index()-1).getText()!=" "))) ) {
                    alt46=1;
                }
            }
            switch (alt46) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:240:25: {...}? COLON {...}? negationExpression
                    if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "arrayExpression", " this.input.get(this.input.index()-1).getText()!=\" \"");
                    }
                    COLON152=this.match(this.input,COLON,FormulaParser.FOLLOW_COLON_in_arrayExpression1538); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COLON.add(COLON152);

                    if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "arrayExpression", " this.input.get(this.input.index()-1).getText()!=\" \"");
                    }
                    this.pushFollow(FormulaParser.FOLLOW_negationExpression_in_arrayExpression1542);
                    negationExpression153=this.negationExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_negationExpression.add(negationExpression153.getTree());


                    break;

            }

            // /Library/WebServer/Documents/calc/Formula.g:240:165: ({...}? COLON {...}? negationExpression )?
            var alt47=2;
            var LA47_0 = this.input.LA(1);

            if ( (LA47_0==COLON) ) {
                var LA47_1 = this.input.LA(2);

                if ( ((this.synpred62_Formula()&&( this.input.get(this.input.index()-1).getText()!=" "))) ) {
                    alt47=1;
                }
            }
            switch (alt47) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:240:167: {...}? COLON {...}? negationExpression
                    if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "arrayExpression", " this.input.get(this.input.index()-1).getText()!=\" \"");
                    }
                    COLON154=this.match(this.input,COLON,FormulaParser.FOLLOW_COLON_in_arrayExpression1551); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COLON.add(COLON154);

                    if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "arrayExpression", " this.input.get(this.input.index()-1).getText()!=\" \"");
                    }
                    this.pushFollow(FormulaParser.FOLLOW_negationExpression_in_arrayExpression1555);
                    negationExpression155=this.negationExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_negationExpression.add(negationExpression155.getTree());


                    break;

            }



            // AST REWRITE
            // elements: negationExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 240:306: -> ^( RANGE ( negationExpression )* )
            {
                // /Library/WebServer/Documents/calc/Formula.g:240:309: ^( RANGE ( negationExpression )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(RANGE, "RANGE"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:240:317: ( negationExpression )*
                while ( stream_negationExpression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_negationExpression.nextTree());

                }
                stream_negationExpression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    negationExpression_return: (function() {
        FormulaParser.negationExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.negationExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:244:1: negationExpression : ( MINUS powerExpression -> ^( NEGATE powerExpression ) | powerExpression );
    // $ANTLR start "negationExpression"
    negationExpression: function() {
        var retval = new FormulaParser.negationExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var MINUS156 = null;
         var powerExpression157 = null;
         var powerExpression158 = null;

        var MINUS156_tree=null;
        var stream_MINUS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token MINUS");
        var stream_powerExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule powerExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:245:2: ( MINUS powerExpression -> ^( NEGATE powerExpression ) | powerExpression )
            var alt48=2;
            var LA48_0 = this.input.LA(1);

            if ( (LA48_0==MINUS) ) {
                alt48=1;
            }
            else if ( (LA48_0==FUNCTIONSTATEMENT||LA48_0==NEWSTATEMENT||LA48_0==IDENT||LA48_0==PRIMITIVE||(LA48_0>=NOT && LA48_0<=LARR)||LA48_0==LCURL||(LA48_0>=STRING && LA48_0<=FALSE)||LA48_0==113) ) {
                alt48=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 48, 0, this.input);

                throw nvae;
            }
            switch (alt48) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:245:4: MINUS powerExpression
                    MINUS156=this.match(this.input,MINUS,FormulaParser.FOLLOW_MINUS_in_negationExpression1580); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_MINUS.add(MINUS156);

                    this.pushFollow(FormulaParser.FOLLOW_powerExpression_in_negationExpression1582);
                    powerExpression157=this.powerExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_powerExpression.add(powerExpression157.getTree());


                    // AST REWRITE
                    // elements: powerExpression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 245:26: -> ^( NEGATE powerExpression )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:245:29: ^( NEGATE powerExpression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(NEGATE, "NEGATE"), root_1);

                        this.adaptor.addChild(root_1, stream_powerExpression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:246:3: powerExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_powerExpression_in_negationExpression1596);
                    powerExpression158=this.powerExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, powerExpression158.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    powerExpression_return: (function() {
        FormulaParser.powerExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.powerExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:248:1: powerExpression : unaryExpression ( POW unaryOrNegate )* -> ^( POWER unaryExpression ( unaryOrNegate )* ) ;
    // $ANTLR start "powerExpression"
    powerExpression: function() {
        var retval = new FormulaParser.powerExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var POW160 = null;
         var unaryExpression159 = null;
         var unaryOrNegate161 = null;

        var POW160_tree=null;
        var stream_POW=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token POW");
        var stream_unaryOrNegate=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule unaryOrNegate");
        var stream_unaryExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule unaryExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:249:2: ( unaryExpression ( POW unaryOrNegate )* -> ^( POWER unaryExpression ( unaryOrNegate )* ) )
            // /Library/WebServer/Documents/calc/Formula.g:249:4: unaryExpression ( POW unaryOrNegate )*
            this.pushFollow(FormulaParser.FOLLOW_unaryExpression_in_powerExpression1607);
            unaryExpression159=this.unaryExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_unaryExpression.add(unaryExpression159.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:249:20: ( POW unaryOrNegate )*
            loop49:
            do {
                var alt49=2;
                var LA49_0 = this.input.LA(1);

                if ( (LA49_0==POW) ) {
                    var LA49_2 = this.input.LA(2);

                    if ( (this.synpred64_Formula()) ) {
                        alt49=1;
                    }


                }


                switch (alt49) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:249:21: POW unaryOrNegate
                    POW160=this.match(this.input,POW,FormulaParser.FOLLOW_POW_in_powerExpression1610); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_POW.add(POW160);

                    this.pushFollow(FormulaParser.FOLLOW_unaryOrNegate_in_powerExpression1612);
                    unaryOrNegate161=this.unaryOrNegate();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_unaryOrNegate.add(unaryOrNegate161.getTree());


                    break;

                default :
                    break loop49;
                }
            } while (true);



            // AST REWRITE
            // elements: unaryOrNegate, unaryExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 249:43: -> ^( POWER unaryExpression ( unaryOrNegate )* )
            {
                // /Library/WebServer/Documents/calc/Formula.g:249:47: ^( POWER unaryExpression ( unaryOrNegate )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(POWER, "POWER"), root_1);

                this.adaptor.addChild(root_1, stream_unaryExpression.nextTree());
                // /Library/WebServer/Documents/calc/Formula.g:249:71: ( unaryOrNegate )*
                while ( stream_unaryOrNegate.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_unaryOrNegate.nextTree());

                }
                stream_unaryOrNegate.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unaryOrNegate_return: (function() {
        FormulaParser.unaryOrNegate_return = function(){};
        org.antlr.lang.extend(FormulaParser.unaryOrNegate_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:252:1: unaryOrNegate : ( unaryExpression | MINUS unaryExpression -> ^( NEGATE unaryExpression ) );
    // $ANTLR start "unaryOrNegate"
    unaryOrNegate: function() {
        var retval = new FormulaParser.unaryOrNegate_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var MINUS163 = null;
         var unaryExpression162 = null;
         var unaryExpression164 = null;

        var MINUS163_tree=null;
        var stream_MINUS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token MINUS");
        var stream_unaryExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule unaryExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:253:2: ( unaryExpression | MINUS unaryExpression -> ^( NEGATE unaryExpression ) )
            var alt50=2;
            var LA50_0 = this.input.LA(1);

            if ( (LA50_0==FUNCTIONSTATEMENT||LA50_0==NEWSTATEMENT||LA50_0==IDENT||LA50_0==PRIMITIVE||(LA50_0>=NOT && LA50_0<=LARR)||LA50_0==LCURL||(LA50_0>=STRING && LA50_0<=FALSE)||LA50_0==113) ) {
                alt50=1;
            }
            else if ( (LA50_0==MINUS) ) {
                alt50=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 50, 0, this.input);

                throw nvae;
            }
            switch (alt50) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:253:4: unaryExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_unaryExpression_in_unaryOrNegate1639);
                    unaryExpression162=this.unaryExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, unaryExpression162.getTree());


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:254:3: MINUS unaryExpression
                    MINUS163=this.match(this.input,MINUS,FormulaParser.FOLLOW_MINUS_in_unaryOrNegate1645); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_MINUS.add(MINUS163);

                    this.pushFollow(FormulaParser.FOLLOW_unaryExpression_in_unaryOrNegate1647);
                    unaryExpression164=this.unaryExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_unaryExpression.add(unaryExpression164.getTree());


                    // AST REWRITE
                    // elements: unaryExpression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 254:25: -> ^( NEGATE unaryExpression )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:254:28: ^( NEGATE unaryExpression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(NEGATE, "NEGATE"), root_1);

                        this.adaptor.addChild(root_1, stream_unaryExpression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unaryExpression_return: (function() {
        FormulaParser.unaryExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.unaryExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:259:1: unaryExpression : ( NOT innerPrimaryExpression | innerPrimaryExpression );
    // $ANTLR start "unaryExpression"
    unaryExpression: function() {
        var retval = new FormulaParser.unaryExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NOT165 = null;
         var innerPrimaryExpression166 = null;
         var innerPrimaryExpression167 = null;

        var NOT165_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:260:2: ( NOT innerPrimaryExpression | innerPrimaryExpression )
            var alt51=2;
            var LA51_0 = this.input.LA(1);

            if ( (LA51_0==NOT) ) {
                alt51=1;
            }
            else if ( (LA51_0==FUNCTIONSTATEMENT||LA51_0==NEWSTATEMENT||LA51_0==IDENT||LA51_0==PRIMITIVE||LA51_0==LARR||LA51_0==LCURL||(LA51_0>=STRING && LA51_0<=FALSE)||LA51_0==113) ) {
                alt51=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 51, 0, this.input);

                throw nvae;
            }
            switch (alt51) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:260:4: NOT innerPrimaryExpression
                    root_0 = this.adaptor.nil();

                    NOT165=this.match(this.input,NOT,FormulaParser.FOLLOW_NOT_in_unaryExpression1675); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    NOT165_tree = this.adaptor.create(NOT165);
                    root_0 = this.adaptor.becomeRoot(NOT165_tree, root_0);
                    }
                    this.pushFollow(FormulaParser.FOLLOW_innerPrimaryExpression_in_unaryExpression1678);
                    innerPrimaryExpression166=this.innerPrimaryExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, innerPrimaryExpression166.getTree());


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:261:8: innerPrimaryExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_innerPrimaryExpression_in_unaryExpression1687);
                    innerPrimaryExpression167=this.innerPrimaryExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, innerPrimaryExpression167.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    innerPrimaryExpression_return: (function() {
        FormulaParser.innerPrimaryExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.innerPrimaryExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:266:1: innerPrimaryExpression : selectionExpression -> ^( INNER selectionExpression ) ;
    // $ANTLR start "innerPrimaryExpression"
    innerPrimaryExpression: function() {
        var retval = new FormulaParser.innerPrimaryExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var selectionExpression168 = null;

        var stream_selectionExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule selectionExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:267:2: ( selectionExpression -> ^( INNER selectionExpression ) )
            // /Library/WebServer/Documents/calc/Formula.g:267:4: selectionExpression
            this.pushFollow(FormulaParser.FOLLOW_selectionExpression_in_innerPrimaryExpression1718);
            selectionExpression168=this.selectionExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_selectionExpression.add(selectionExpression168.getTree());


            // AST REWRITE
            // elements: selectionExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 267:24: -> ^( INNER selectionExpression )
            {
                // /Library/WebServer/Documents/calc/Formula.g:267:27: ^( INNER selectionExpression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(INNER, "INNER"), root_1);

                this.adaptor.addChild(root_1, stream_selectionExpression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    selectionExpression_return: (function() {
        FormulaParser.selectionExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.selectionExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:270:1: selectionExpression : primaryExpression ({...}? ( selector | funCall ) )* ;
    // $ANTLR start "selectionExpression"
    selectionExpression: function() {
        var retval = new FormulaParser.selectionExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var primaryExpression169 = null;
         var selector170 = null;
         var funCall171 = null;


        try {
            // /Library/WebServer/Documents/calc/Formula.g:271:2: ( primaryExpression ({...}? ( selector | funCall ) )* )
            // /Library/WebServer/Documents/calc/Formula.g:271:4: primaryExpression ({...}? ( selector | funCall ) )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_primaryExpression_in_selectionExpression1738);
            primaryExpression169=this.primaryExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, primaryExpression169.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:271:22: ({...}? ( selector | funCall ) )*
            loop53:
            do {
                var alt53=2;
                switch ( this.input.LA(1) ) {
                case LARR:
                    var LA53_2 = this.input.LA(2);

                    if ( ((this.synpred68_Formula()&&( this.input.get(this.input.index()-1).getText()!=" "))) ) {
                        alt53=1;
                    }


                    break;
                case LCURL:
                    var LA53_3 = this.input.LA(2);

                    if ( ((this.synpred68_Formula()&&( this.input.get(this.input.index()-1).getText()!=" "))) ) {
                        alt53=1;
                    }


                    break;
                case 116:
                    var LA53_4 = this.input.LA(2);

                    if ( ((this.synpred68_Formula()&&( this.input.get(this.input.index()-1).getText()!=" "))) ) {
                        alt53=1;
                    }


                    break;
                case 113:
                    var LA53_5 = this.input.LA(2);

                    if ( ((this.synpred68_Formula()&&( this.input.get(this.input.index()-1).getText()!=" "))) ) {
                        alt53=1;
                    }


                    break;

                }

                switch (alt53) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:271:23: {...}? ( selector | funCall )
                    if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "selectionExpression", " this.input.get(this.input.index()-1).getText()!=\" \"");
                    }
                    // /Library/WebServer/Documents/calc/Formula.g:271:79: ( selector | funCall )
                    var alt52=2;
                    var LA52_0 = this.input.LA(1);

                    if ( (LA52_0==LARR||LA52_0==LCURL||LA52_0==116) ) {
                        alt52=1;
                    }
                    else if ( (LA52_0==113) ) {
                        alt52=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 52, 0, this.input);

                        throw nvae;
                    }
                    switch (alt52) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:271:80: selector
                            this.pushFollow(FormulaParser.FOLLOW_selector_in_selectionExpression1744);
                            selector170=this.selector();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, selector170.getTree());


                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:271:89: funCall
                            this.pushFollow(FormulaParser.FOLLOW_funCall_in_selectionExpression1746);
                            funCall171=this.funCall();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, funCall171.getTree());


                            break;

                    }



                    break;

                default :
                    break loop53;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    funCall_return: (function() {
        FormulaParser.funCall_return = function(){};
        org.antlr.lang.extend(FormulaParser.funCall_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:274:1: funCall : '(' ( logicalExpression ( ',' logicalExpression )* )? ')' -> ^( FUNCALL ( logicalExpression )* ) ;
    // $ANTLR start "funCall"
    funCall: function() {
        var retval = new FormulaParser.funCall_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal172 = null;
        var char_literal174 = null;
        var char_literal176 = null;
         var logicalExpression173 = null;
         var logicalExpression175 = null;

        var char_literal172_tree=null;
        var char_literal174_tree=null;
        var char_literal176_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:274:9: ( '(' ( logicalExpression ( ',' logicalExpression )* )? ')' -> ^( FUNCALL ( logicalExpression )* ) )
            // /Library/WebServer/Documents/calc/Formula.g:275:2: '(' ( logicalExpression ( ',' logicalExpression )* )? ')'
            char_literal172=this.match(this.input,113,FormulaParser.FOLLOW_113_in_funCall1761); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_113.add(char_literal172);

            // /Library/WebServer/Documents/calc/Formula.g:275:6: ( logicalExpression ( ',' logicalExpression )* )?
            var alt55=2;
            var LA55_0 = this.input.LA(1);

            if ( (LA55_0==FUNCTIONSTATEMENT||LA55_0==NEWSTATEMENT||LA55_0==IDENT||LA55_0==PRIMITIVE||LA55_0==MINUS||(LA55_0>=NOT && LA55_0<=LARR)||LA55_0==LCURL||(LA55_0>=STRING && LA55_0<=FALSE)||LA55_0==113) ) {
                alt55=1;
            }
            switch (alt55) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:275:8: logicalExpression ( ',' logicalExpression )*
                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_funCall1765);
                    logicalExpression173=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression173.getTree());
                    // /Library/WebServer/Documents/calc/Formula.g:275:26: ( ',' logicalExpression )*
                    loop54:
                    do {
                        var alt54=2;
                        var LA54_0 = this.input.LA(1);

                        if ( (LA54_0==COMMA) ) {
                            alt54=1;
                        }


                        switch (alt54) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:275:27: ',' logicalExpression
                            char_literal174=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_funCall1768); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal174);

                            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_funCall1770);
                            logicalExpression175=this.logicalExpression();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression175.getTree());


                            break;

                        default :
                            break loop54;
                        }
                    } while (true);



                    break;

            }

            char_literal176=this.match(this.input,114,FormulaParser.FOLLOW_114_in_funCall1777); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal176);



            // AST REWRITE
            // elements: logicalExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 275:58: -> ^( FUNCALL ( logicalExpression )* )
            {
                // /Library/WebServer/Documents/calc/Formula.g:275:61: ^( FUNCALL ( logicalExpression )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(FUNCALL, "FUNCALL"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:275:71: ( logicalExpression )*
                while ( stream_logicalExpression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_logicalExpression.nextTree());

                }
                stream_logicalExpression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    primaryExpression_return: (function() {
        FormulaParser.primaryExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.primaryExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:278:1: primaryExpression : ( '(' logicalExpression ')' | value );
    // $ANTLR start "primaryExpression"
    primaryExpression: function() {
        var retval = new FormulaParser.primaryExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal177 = null;
        var char_literal179 = null;
         var logicalExpression178 = null;
         var value180 = null;

        var char_literal177_tree=null;
        var char_literal179_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:279:2: ( '(' logicalExpression ')' | value )
            var alt56=2;
            var LA56_0 = this.input.LA(1);

            if ( (LA56_0==113) ) {
                alt56=1;
            }
            else if ( (LA56_0==FUNCTIONSTATEMENT||LA56_0==NEWSTATEMENT||LA56_0==IDENT||LA56_0==PRIMITIVE||LA56_0==LARR||LA56_0==LCURL||(LA56_0>=STRING && LA56_0<=FALSE)) ) {
                alt56=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 56, 0, this.input);

                throw nvae;
            }
            switch (alt56) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:279:4: '(' logicalExpression ')'
                    root_0 = this.adaptor.nil();

                    char_literal177=this.match(this.input,113,FormulaParser.FOLLOW_113_in_primaryExpression1798); if (this.state.failed) return retval;
                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_primaryExpression1801);
                    logicalExpression178=this.logicalExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression178.getTree());
                    char_literal179=this.match(this.input,114,FormulaParser.FOLLOW_114_in_primaryExpression1803); if (this.state.failed) return retval;


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:280:4: value
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_value_in_primaryExpression1809);
                    value180=this.value();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, value180.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    value_return: (function() {
        FormulaParser.value_return = function(){};
        org.antlr.lang.extend(FormulaParser.value_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:283:1: value : ( number | bool | string | material | IDENT | primitive | array | anonFunctionDef | newObject );
    // $ANTLR start "value"
    value: function() {
        var retval = new FormulaParser.value_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IDENT185 = null;
         var number181 = null;
         var bool182 = null;
         var string183 = null;
         var material184 = null;
         var primitive186 = null;
         var array187 = null;
         var anonFunctionDef188 = null;
         var newObject189 = null;

        var IDENT185_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:284:2: ( number | bool | string | material | IDENT | primitive | array | anonFunctionDef | newObject )
            var alt57=9;
            alt57 = this.dfa57.predict(this.input);
            switch (alt57) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:284:5: number
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_number_in_value1823);
                    number181=this.number();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, number181.getTree());


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:285:5: bool
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_bool_in_value1829);
                    bool182=this.bool();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, bool182.getTree());


                    break;
                case 3 :
                    // /Library/WebServer/Documents/calc/Formula.g:286:5: string
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_string_in_value1835);
                    string183=this.string();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, string183.getTree());


                    break;
                case 4 :
                    // /Library/WebServer/Documents/calc/Formula.g:287:5: material
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_material_in_value1841);
                    material184=this.material();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, material184.getTree());


                    break;
                case 5 :
                    // /Library/WebServer/Documents/calc/Formula.g:288:4: IDENT
                    root_0 = this.adaptor.nil();

                    IDENT185=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_value1846); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    IDENT185_tree = this.adaptor.create(IDENT185);
                    this.adaptor.addChild(root_0, IDENT185_tree);
                    }


                    break;
                case 6 :
                    // /Library/WebServer/Documents/calc/Formula.g:289:4: primitive
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_primitive_in_value1851);
                    primitive186=this.primitive();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, primitive186.getTree());


                    break;
                case 7 :
                    // /Library/WebServer/Documents/calc/Formula.g:290:4: array
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_array_in_value1856);
                    array187=this.array();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, array187.getTree());


                    break;
                case 8 :
                    // /Library/WebServer/Documents/calc/Formula.g:291:4: anonFunctionDef
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_anonFunctionDef_in_value1861);
                    anonFunctionDef188=this.anonFunctionDef();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, anonFunctionDef188.getTree());


                    break;
                case 9 :
                    // /Library/WebServer/Documents/calc/Formula.g:292:4: newObject
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_newObject_in_value1866);
                    newObject189=this.newObject();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, newObject189.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    newObject_return: (function() {
        FormulaParser.newObject_return = function(){};
        org.antlr.lang.extend(FormulaParser.newObject_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:295:1: newObject : NEWSTATEMENT IDENT ( funCall )? -> ^( NEW IDENT ( funCall )? ) ;
    // $ANTLR start "newObject"
    newObject: function() {
        var retval = new FormulaParser.newObject_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NEWSTATEMENT190 = null;
        var IDENT191 = null;
         var funCall192 = null;

        var NEWSTATEMENT190_tree=null;
        var IDENT191_tree=null;
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_NEWSTATEMENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWSTATEMENT");
        var stream_funCall=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule funCall");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:296:1: ( NEWSTATEMENT IDENT ( funCall )? -> ^( NEW IDENT ( funCall )? ) )
            // /Library/WebServer/Documents/calc/Formula.g:296:3: NEWSTATEMENT IDENT ( funCall )?
            NEWSTATEMENT190=this.match(this.input,NEWSTATEMENT,FormulaParser.FOLLOW_NEWSTATEMENT_in_newObject1876); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_NEWSTATEMENT.add(NEWSTATEMENT190);

            IDENT191=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_newObject1878); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT191);

            // /Library/WebServer/Documents/calc/Formula.g:296:22: ( funCall )?
            var alt58=2;
            alt58 = this.dfa58.predict(this.input);
            switch (alt58) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: funCall
                    this.pushFollow(FormulaParser.FOLLOW_funCall_in_newObject1880);
                    funCall192=this.funCall();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_funCall.add(funCall192.getTree());


                    break;

            }



            // AST REWRITE
            // elements: funCall, IDENT
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 296:31: -> ^( NEW IDENT ( funCall )? )
            {
                // /Library/WebServer/Documents/calc/Formula.g:296:34: ^( NEW IDENT ( funCall )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(NEW, "NEW"), root_1);

                this.adaptor.addChild(root_1, stream_IDENT.nextNode());
                // /Library/WebServer/Documents/calc/Formula.g:296:46: ( funCall )?
                if ( stream_funCall.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_funCall.nextTree());

                }
                stream_funCall.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    defaultValue_return: (function() {
        FormulaParser.defaultValue_return = function(){};
        org.antlr.lang.extend(FormulaParser.defaultValue_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:299:1: defaultValue : ( negnumber | number | bool | string | array );
    // $ANTLR start "defaultValue"
    defaultValue: function() {
        var retval = new FormulaParser.defaultValue_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var negnumber193 = null;
         var number194 = null;
         var bool195 = null;
         var string196 = null;
         var array197 = null;


        try {
            // /Library/WebServer/Documents/calc/Formula.g:300:2: ( negnumber | number | bool | string | array )
            var alt59=5;
            switch ( this.input.LA(1) ) {
            case MINUS:
                alt59=1;
                break;
            case INTEGER:
            case FLOAT:
                alt59=2;
                break;
            case TRUE:
            case FALSE:
                alt59=3;
                break;
            case STRING:
                alt59=4;
                break;
            case LARR:
            case LCURL:
                alt59=5;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 59, 0, this.input);

                throw nvae;
            }

            switch (alt59) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:300:5: negnumber
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_negnumber_in_defaultValue1906);
                    negnumber193=this.negnumber();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, negnumber193.getTree());


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:301:5: number
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_number_in_defaultValue1912);
                    number194=this.number();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, number194.getTree());


                    break;
                case 3 :
                    // /Library/WebServer/Documents/calc/Formula.g:302:5: bool
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_bool_in_defaultValue1918);
                    bool195=this.bool();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, bool195.getTree());


                    break;
                case 4 :
                    // /Library/WebServer/Documents/calc/Formula.g:303:5: string
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_string_in_defaultValue1924);
                    string196=this.string();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, string196.getTree());


                    break;
                case 5 :
                    // /Library/WebServer/Documents/calc/Formula.g:304:5: array
                    root_0 = this.adaptor.nil();

                    this.pushFollow(FormulaParser.FOLLOW_array_in_defaultValue1930);
                    array197=this.array();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, array197.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    array_return: (function() {
        FormulaParser.array_return = function(){};
        org.antlr.lang.extend(FormulaParser.array_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:307:1: array : ( LARR ( NEWLINE )* ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )? ( NEWLINE )* RARR -> ^( ARRAY ( label )* ) | LCURL ( NEWLINE )* ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )? ( NEWLINE )* RCURL -> ^( ARRAY ( label )* ) );
    // $ANTLR start "array"
    array: function() {
        var retval = new FormulaParser.array_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LARR198 = null;
        var NEWLINE199 = null;
        var NEWLINE201 = null;
        var char_literal202 = null;
        var NEWLINE203 = null;
        var NEWLINE205 = null;
        var NEWLINE206 = null;
        var RARR207 = null;
        var LCURL208 = null;
        var NEWLINE209 = null;
        var NEWLINE211 = null;
        var char_literal212 = null;
        var NEWLINE213 = null;
        var NEWLINE215 = null;
        var NEWLINE216 = null;
        var RCURL217 = null;
         var label200 = null;
         var label204 = null;
         var label210 = null;
         var label214 = null;

        var LARR198_tree=null;
        var NEWLINE199_tree=null;
        var NEWLINE201_tree=null;
        var char_literal202_tree=null;
        var NEWLINE203_tree=null;
        var NEWLINE205_tree=null;
        var NEWLINE206_tree=null;
        var RARR207_tree=null;
        var LCURL208_tree=null;
        var NEWLINE209_tree=null;
        var NEWLINE211_tree=null;
        var char_literal212_tree=null;
        var NEWLINE213_tree=null;
        var NEWLINE215_tree=null;
        var NEWLINE216_tree=null;
        var RCURL217_tree=null;
        var stream_LCURL=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LCURL");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_RARR=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RARR");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_LARR=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LARR");
        var stream_RCURL=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RCURL");
        var stream_label=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule label");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:308:2: ( LARR ( NEWLINE )* ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )? ( NEWLINE )* RARR -> ^( ARRAY ( label )* ) | LCURL ( NEWLINE )* ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )? ( NEWLINE )* RCURL -> ^( ARRAY ( label )* ) )
            var alt74=2;
            var LA74_0 = this.input.LA(1);

            if ( (LA74_0==LARR) ) {
                alt74=1;
            }
            else if ( (LA74_0==LCURL) ) {
                alt74=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 74, 0, this.input);

                throw nvae;
            }
            switch (alt74) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:309:2: LARR ( NEWLINE )* ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )? ( NEWLINE )* RARR
                    LARR198=this.match(this.input,LARR,FormulaParser.FOLLOW_LARR_in_array1944); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_LARR.add(LARR198);

                    // /Library/WebServer/Documents/calc/Formula.g:309:7: ( NEWLINE )*
                    loop60:
                    do {
                        var alt60=2;
                        var LA60_0 = this.input.LA(1);

                        if ( (LA60_0==NEWLINE) ) {
                            var LA60_2 = this.input.LA(2);

                            if ( (this.synpred85_Formula()) ) {
                                alt60=1;
                            }


                        }


                        switch (alt60) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE199=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1946); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE199);



                            break;

                        default :
                            break loop60;
                        }
                    } while (true);

                    // /Library/WebServer/Documents/calc/Formula.g:309:16: ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )?
                    var alt65=2;
                    alt65 = this.dfa65.predict(this.input);
                    switch (alt65) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:309:17: label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )*
                            this.pushFollow(FormulaParser.FOLLOW_label_in_array1950);
                            label200=this.label();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_label.add(label200.getTree());
                            // /Library/WebServer/Documents/calc/Formula.g:309:23: ( NEWLINE )*
                            loop61:
                            do {
                                var alt61=2;
                                var LA61_0 = this.input.LA(1);

                                if ( (LA61_0==NEWLINE) ) {
                                    var LA61_2 = this.input.LA(2);

                                    if ( (this.synpred86_Formula()) ) {
                                        alt61=1;
                                    }


                                }


                                switch (alt61) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                    NEWLINE201=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1952); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE201);



                                    break;

                                default :
                                    break loop61;
                                }
                            } while (true);

                            // /Library/WebServer/Documents/calc/Formula.g:309:32: ( ',' ( NEWLINE )* label ( NEWLINE )* )*
                            loop64:
                            do {
                                var alt64=2;
                                var LA64_0 = this.input.LA(1);

                                if ( (LA64_0==COMMA) ) {
                                    alt64=1;
                                }


                                switch (alt64) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:309:33: ',' ( NEWLINE )* label ( NEWLINE )*
                                    char_literal202=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_array1956); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal202);

                                    // /Library/WebServer/Documents/calc/Formula.g:309:37: ( NEWLINE )*
                                    loop62:
                                    do {
                                        var alt62=2;
                                        var LA62_0 = this.input.LA(1);

                                        if ( (LA62_0==NEWLINE) ) {
                                            var LA62_2 = this.input.LA(2);

                                            if ( (this.synpred87_Formula()) ) {
                                                alt62=1;
                                            }


                                        }


                                        switch (alt62) {
                                        case 1 :
                                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                            NEWLINE203=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1958); if (this.state.failed) return retval; 
                                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE203);



                                            break;

                                        default :
                                            break loop62;
                                        }
                                    } while (true);

                                    this.pushFollow(FormulaParser.FOLLOW_label_in_array1961);
                                    label204=this.label();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) stream_label.add(label204.getTree());
                                    // /Library/WebServer/Documents/calc/Formula.g:309:52: ( NEWLINE )*
                                    loop63:
                                    do {
                                        var alt63=2;
                                        var LA63_0 = this.input.LA(1);

                                        if ( (LA63_0==NEWLINE) ) {
                                            var LA63_1 = this.input.LA(2);

                                            if ( (this.synpred88_Formula()) ) {
                                                alt63=1;
                                            }


                                        }


                                        switch (alt63) {
                                        case 1 :
                                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                            NEWLINE205=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1963); if (this.state.failed) return retval; 
                                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE205);



                                            break;

                                        default :
                                            break loop63;
                                        }
                                    } while (true);



                                    break;

                                default :
                                    break loop64;
                                }
                            } while (true);



                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:309:65: ( NEWLINE )*
                    loop66:
                    do {
                        var alt66=2;
                        var LA66_0 = this.input.LA(1);

                        if ( (LA66_0==NEWLINE) ) {
                            alt66=1;
                        }


                        switch (alt66) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE206=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1970); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE206);



                            break;

                        default :
                            break loop66;
                        }
                    } while (true);

                    RARR207=this.match(this.input,RARR,FormulaParser.FOLLOW_RARR_in_array1973); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_RARR.add(RARR207);



                    // AST REWRITE
                    // elements: label
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 309:79: -> ^( ARRAY ( label )* )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:309:82: ^( ARRAY ( label )* )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARRAY, "ARRAY"), root_1);

                        // /Library/WebServer/Documents/calc/Formula.g:309:90: ( label )*
                        while ( stream_label.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_label.nextTree());

                        }
                        stream_label.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:310:4: LCURL ( NEWLINE )* ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )? ( NEWLINE )* RCURL
                    LCURL208=this.match(this.input,LCURL,FormulaParser.FOLLOW_LCURL_in_array1987); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_LCURL.add(LCURL208);

                    // /Library/WebServer/Documents/calc/Formula.g:310:10: ( NEWLINE )*
                    loop67:
                    do {
                        var alt67=2;
                        var LA67_0 = this.input.LA(1);

                        if ( (LA67_0==NEWLINE) ) {
                            var LA67_2 = this.input.LA(2);

                            if ( (this.synpred93_Formula()) ) {
                                alt67=1;
                            }


                        }


                        switch (alt67) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE209=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1989); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE209);



                            break;

                        default :
                            break loop67;
                        }
                    } while (true);

                    // /Library/WebServer/Documents/calc/Formula.g:310:19: ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )?
                    var alt72=2;
                    alt72 = this.dfa72.predict(this.input);
                    switch (alt72) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:310:20: label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )*
                            this.pushFollow(FormulaParser.FOLLOW_label_in_array1993);
                            label210=this.label();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_label.add(label210.getTree());
                            // /Library/WebServer/Documents/calc/Formula.g:310:26: ( NEWLINE )*
                            loop68:
                            do {
                                var alt68=2;
                                var LA68_0 = this.input.LA(1);

                                if ( (LA68_0==NEWLINE) ) {
                                    var LA68_2 = this.input.LA(2);

                                    if ( (this.synpred94_Formula()) ) {
                                        alt68=1;
                                    }


                                }


                                switch (alt68) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                    NEWLINE211=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array1995); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE211);



                                    break;

                                default :
                                    break loop68;
                                }
                            } while (true);

                            // /Library/WebServer/Documents/calc/Formula.g:310:34: ( ',' ( NEWLINE )* label ( NEWLINE )* )*
                            loop71:
                            do {
                                var alt71=2;
                                var LA71_0 = this.input.LA(1);

                                if ( (LA71_0==COMMA) ) {
                                    alt71=1;
                                }


                                switch (alt71) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:310:35: ',' ( NEWLINE )* label ( NEWLINE )*
                                    char_literal212=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_array1998); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal212);

                                    // /Library/WebServer/Documents/calc/Formula.g:310:39: ( NEWLINE )*
                                    loop69:
                                    do {
                                        var alt69=2;
                                        var LA69_0 = this.input.LA(1);

                                        if ( (LA69_0==NEWLINE) ) {
                                            var LA69_2 = this.input.LA(2);

                                            if ( (this.synpred95_Formula()) ) {
                                                alt69=1;
                                            }


                                        }


                                        switch (alt69) {
                                        case 1 :
                                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                            NEWLINE213=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array2000); if (this.state.failed) return retval; 
                                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE213);



                                            break;

                                        default :
                                            break loop69;
                                        }
                                    } while (true);

                                    this.pushFollow(FormulaParser.FOLLOW_label_in_array2003);
                                    label214=this.label();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) stream_label.add(label214.getTree());
                                    // /Library/WebServer/Documents/calc/Formula.g:310:54: ( NEWLINE )*
                                    loop70:
                                    do {
                                        var alt70=2;
                                        var LA70_0 = this.input.LA(1);

                                        if ( (LA70_0==NEWLINE) ) {
                                            var LA70_1 = this.input.LA(2);

                                            if ( (this.synpred96_Formula()) ) {
                                                alt70=1;
                                            }


                                        }


                                        switch (alt70) {
                                        case 1 :
                                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                                            NEWLINE215=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array2005); if (this.state.failed) return retval; 
                                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE215);



                                            break;

                                        default :
                                            break loop70;
                                        }
                                    } while (true);



                                    break;

                                default :
                                    break loop71;
                                }
                            } while (true);



                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:310:67: ( NEWLINE )*
                    loop73:
                    do {
                        var alt73=2;
                        var LA73_0 = this.input.LA(1);

                        if ( (LA73_0==NEWLINE) ) {
                            alt73=1;
                        }


                        switch (alt73) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE216=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_array2012); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE216);



                            break;

                        default :
                            break loop73;
                        }
                    } while (true);

                    RCURL217=this.match(this.input,RCURL,FormulaParser.FOLLOW_RCURL_in_array2015); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_RCURL.add(RCURL217);



                    // AST REWRITE
                    // elements: label
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 310:82: -> ^( ARRAY ( label )* )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:310:85: ^( ARRAY ( label )* )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARRAY, "ARRAY"), root_1);

                        // /Library/WebServer/Documents/calc/Formula.g:310:93: ( label )*
                        while ( stream_label.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_label.nextTree());

                        }
                        stream_label.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    selector_return: (function() {
        FormulaParser.selector_return = function(){};
        org.antlr.lang.extend(FormulaParser.selector_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:313:1: selector : ( minarray | dotselector ) -> ^( SELECTOR ( minarray )? ( dotselector )? ) ;
    // $ANTLR start "selector"
    selector: function() {
        var retval = new FormulaParser.selector_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var minarray218 = null;
         var dotselector219 = null;

        var stream_dotselector=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule dotselector");
        var stream_minarray=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule minarray");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:314:2: ( ( minarray | dotselector ) -> ^( SELECTOR ( minarray )? ( dotselector )? ) )
            // /Library/WebServer/Documents/calc/Formula.g:314:4: ( minarray | dotselector )
            // /Library/WebServer/Documents/calc/Formula.g:314:4: ( minarray | dotselector )
            var alt75=2;
            var LA75_0 = this.input.LA(1);

            if ( (LA75_0==LARR||LA75_0==LCURL) ) {
                alt75=1;
            }
            else if ( (LA75_0==116) ) {
                alt75=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 75, 0, this.input);

                throw nvae;
            }
            switch (alt75) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:314:5: minarray
                    this.pushFollow(FormulaParser.FOLLOW_minarray_in_selector2036);
                    minarray218=this.minarray();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_minarray.add(minarray218.getTree());


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:314:16: dotselector
                    this.pushFollow(FormulaParser.FOLLOW_dotselector_in_selector2040);
                    dotselector219=this.dotselector();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_dotselector.add(dotselector219.getTree());


                    break;

            }



            // AST REWRITE
            // elements: minarray, dotselector
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 314:29: -> ^( SELECTOR ( minarray )? ( dotselector )? )
            {
                // /Library/WebServer/Documents/calc/Formula.g:314:32: ^( SELECTOR ( minarray )? ( dotselector )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(SELECTOR, "SELECTOR"), root_1);

                // /Library/WebServer/Documents/calc/Formula.g:314:43: ( minarray )?
                if ( stream_minarray.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_minarray.nextTree());

                }
                stream_minarray.reset();
                // /Library/WebServer/Documents/calc/Formula.g:314:53: ( dotselector )?
                if ( stream_dotselector.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_dotselector.nextTree());

                }
                stream_dotselector.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    minarray_return: (function() {
        FormulaParser.minarray_return = function(){};
        org.antlr.lang.extend(FormulaParser.minarray_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:317:1: minarray : ( LARR ( logicalExpression | MULT ) ( COMMA ( logicalExpression | MULT ) )* RARR | LCURL ( logicalExpression | MULT ) ( COMMA ( logicalExpression | MULT ) )* RCURL );
    // $ANTLR start "minarray"
    minarray: function() {
        var retval = new FormulaParser.minarray_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LARR220 = null;
        var MULT222 = null;
        var COMMA223 = null;
        var MULT225 = null;
        var RARR226 = null;
        var LCURL227 = null;
        var MULT229 = null;
        var COMMA230 = null;
        var MULT232 = null;
        var RCURL233 = null;
         var logicalExpression221 = null;
         var logicalExpression224 = null;
         var logicalExpression228 = null;
         var logicalExpression231 = null;

        var LARR220_tree=null;
        var MULT222_tree=null;
        var COMMA223_tree=null;
        var MULT225_tree=null;
        var RARR226_tree=null;
        var LCURL227_tree=null;
        var MULT229_tree=null;
        var COMMA230_tree=null;
        var MULT232_tree=null;
        var RCURL233_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:318:2: ( LARR ( logicalExpression | MULT ) ( COMMA ( logicalExpression | MULT ) )* RARR | LCURL ( logicalExpression | MULT ) ( COMMA ( logicalExpression | MULT ) )* RCURL )
            var alt82=2;
            var LA82_0 = this.input.LA(1);

            if ( (LA82_0==LARR) ) {
                alt82=1;
            }
            else if ( (LA82_0==LCURL) ) {
                alt82=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 82, 0, this.input);

                throw nvae;
            }
            switch (alt82) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:319:2: LARR ( logicalExpression | MULT ) ( COMMA ( logicalExpression | MULT ) )* RARR
                    root_0 = this.adaptor.nil();

                    LARR220=this.match(this.input,LARR,FormulaParser.FOLLOW_LARR_in_minarray2067); if (this.state.failed) return retval;
                    // /Library/WebServer/Documents/calc/Formula.g:319:9: ( logicalExpression | MULT )
                    var alt76=2;
                    var LA76_0 = this.input.LA(1);

                    if ( (LA76_0==FUNCTIONSTATEMENT||LA76_0==NEWSTATEMENT||LA76_0==IDENT||LA76_0==PRIMITIVE||LA76_0==MINUS||(LA76_0>=NOT && LA76_0<=LARR)||LA76_0==LCURL||(LA76_0>=STRING && LA76_0<=FALSE)||LA76_0==113) ) {
                        alt76=1;
                    }
                    else if ( (LA76_0==MULT) ) {
                        alt76=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 76, 0, this.input);

                        throw nvae;
                    }
                    switch (alt76) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:319:10: logicalExpression
                            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_minarray2072);
                            logicalExpression221=this.logicalExpression();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression221.getTree());


                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:319:28: MULT
                            MULT222=this.match(this.input,MULT,FormulaParser.FOLLOW_MULT_in_minarray2074); if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) {
                            MULT222_tree = this.adaptor.create(MULT222);
                            this.adaptor.addChild(root_0, MULT222_tree);
                            }


                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:319:34: ( COMMA ( logicalExpression | MULT ) )*
                    loop78:
                    do {
                        var alt78=2;
                        var LA78_0 = this.input.LA(1);

                        if ( (LA78_0==COMMA) ) {
                            alt78=1;
                        }


                        switch (alt78) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:319:35: COMMA ( logicalExpression | MULT )
                            COMMA223=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_minarray2078); if (this.state.failed) return retval;
                            // /Library/WebServer/Documents/calc/Formula.g:319:42: ( logicalExpression | MULT )
                            var alt77=2;
                            var LA77_0 = this.input.LA(1);

                            if ( (LA77_0==FUNCTIONSTATEMENT||LA77_0==NEWSTATEMENT||LA77_0==IDENT||LA77_0==PRIMITIVE||LA77_0==MINUS||(LA77_0>=NOT && LA77_0<=LARR)||LA77_0==LCURL||(LA77_0>=STRING && LA77_0<=FALSE)||LA77_0==113) ) {
                                alt77=1;
                            }
                            else if ( (LA77_0==MULT) ) {
                                alt77=2;
                            }
                            else {
                                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var nvae =
                                    new org.antlr.runtime.NoViableAltException("", 77, 0, this.input);

                                throw nvae;
                            }
                            switch (alt77) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:319:43: logicalExpression
                                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_minarray2082);
                                    logicalExpression224=this.logicalExpression();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression224.getTree());


                                    break;
                                case 2 :
                                    // /Library/WebServer/Documents/calc/Formula.g:319:61: MULT
                                    MULT225=this.match(this.input,MULT,FormulaParser.FOLLOW_MULT_in_minarray2084); if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) {
                                    MULT225_tree = this.adaptor.create(MULT225);
                                    this.adaptor.addChild(root_0, MULT225_tree);
                                    }


                                    break;

                            }



                            break;

                        default :
                            break loop78;
                        }
                    } while (true);

                    RARR226=this.match(this.input,RARR,FormulaParser.FOLLOW_RARR_in_minarray2091); if (this.state.failed) return retval;


                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:320:4: LCURL ( logicalExpression | MULT ) ( COMMA ( logicalExpression | MULT ) )* RCURL
                    root_0 = this.adaptor.nil();

                    LCURL227=this.match(this.input,LCURL,FormulaParser.FOLLOW_LCURL_in_minarray2097); if (this.state.failed) return retval;
                    // /Library/WebServer/Documents/calc/Formula.g:320:12: ( logicalExpression | MULT )
                    var alt79=2;
                    var LA79_0 = this.input.LA(1);

                    if ( (LA79_0==FUNCTIONSTATEMENT||LA79_0==NEWSTATEMENT||LA79_0==IDENT||LA79_0==PRIMITIVE||LA79_0==MINUS||(LA79_0>=NOT && LA79_0<=LARR)||LA79_0==LCURL||(LA79_0>=STRING && LA79_0<=FALSE)||LA79_0==113) ) {
                        alt79=1;
                    }
                    else if ( (LA79_0==MULT) ) {
                        alt79=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 79, 0, this.input);

                        throw nvae;
                    }
                    switch (alt79) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:320:13: logicalExpression
                            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_minarray2102);
                            logicalExpression228=this.logicalExpression();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression228.getTree());


                            break;
                        case 2 :
                            // /Library/WebServer/Documents/calc/Formula.g:320:31: MULT
                            MULT229=this.match(this.input,MULT,FormulaParser.FOLLOW_MULT_in_minarray2104); if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) {
                            MULT229_tree = this.adaptor.create(MULT229);
                            this.adaptor.addChild(root_0, MULT229_tree);
                            }


                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:320:37: ( COMMA ( logicalExpression | MULT ) )*
                    loop81:
                    do {
                        var alt81=2;
                        var LA81_0 = this.input.LA(1);

                        if ( (LA81_0==COMMA) ) {
                            alt81=1;
                        }


                        switch (alt81) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:320:38: COMMA ( logicalExpression | MULT )
                            COMMA230=this.match(this.input,COMMA,FormulaParser.FOLLOW_COMMA_in_minarray2108); if (this.state.failed) return retval;
                            // /Library/WebServer/Documents/calc/Formula.g:320:45: ( logicalExpression | MULT )
                            var alt80=2;
                            var LA80_0 = this.input.LA(1);

                            if ( (LA80_0==FUNCTIONSTATEMENT||LA80_0==NEWSTATEMENT||LA80_0==IDENT||LA80_0==PRIMITIVE||LA80_0==MINUS||(LA80_0>=NOT && LA80_0<=LARR)||LA80_0==LCURL||(LA80_0>=STRING && LA80_0<=FALSE)||LA80_0==113) ) {
                                alt80=1;
                            }
                            else if ( (LA80_0==MULT) ) {
                                alt80=2;
                            }
                            else {
                                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var nvae =
                                    new org.antlr.runtime.NoViableAltException("", 80, 0, this.input);

                                throw nvae;
                            }
                            switch (alt80) {
                                case 1 :
                                    // /Library/WebServer/Documents/calc/Formula.g:320:46: logicalExpression
                                    this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_minarray2112);
                                    logicalExpression231=this.logicalExpression();

                                    this.state._fsp--;
                                    if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, logicalExpression231.getTree());


                                    break;
                                case 2 :
                                    // /Library/WebServer/Documents/calc/Formula.g:320:64: MULT
                                    MULT232=this.match(this.input,MULT,FormulaParser.FOLLOW_MULT_in_minarray2114); if (this.state.failed) return retval;
                                    if ( this.state.backtracking===0 ) {
                                    MULT232_tree = this.adaptor.create(MULT232);
                                    this.adaptor.addChild(root_0, MULT232_tree);
                                    }


                                    break;

                            }



                            break;

                        default :
                            break loop81;
                        }
                    } while (true);

                    RCURL233=this.match(this.input,RCURL,FormulaParser.FOLLOW_RCURL_in_minarray2121); if (this.state.failed) return retval;


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    dotselector_return: (function() {
        FormulaParser.dotselector_return = function(){};
        org.antlr.lang.extend(FormulaParser.dotselector_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:322:1: dotselector : ( '.' arrayName )+ -> ^( DOTSELECTOR ( arrayName )+ ) ;
    // $ANTLR start "dotselector"
    dotselector: function() {
        var retval = new FormulaParser.dotselector_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal234 = null;
         var arrayName235 = null;

        var char_literal234_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_arrayName=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule arrayName");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:323:2: ( ( '.' arrayName )+ -> ^( DOTSELECTOR ( arrayName )+ ) )
            // /Library/WebServer/Documents/calc/Formula.g:323:4: ( '.' arrayName )+
            // /Library/WebServer/Documents/calc/Formula.g:323:4: ( '.' arrayName )+
            var cnt83=0;
            loop83:
            do {
                var alt83=2;
                var LA83_0 = this.input.LA(1);

                if ( (LA83_0==116) ) {
                    var LA83_2 = this.input.LA(2);

                    if ( (this.synpred108_Formula()) ) {
                        alt83=1;
                    }


                }


                switch (alt83) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:323:5: '.' arrayName
                    char_literal234=this.match(this.input,116,FormulaParser.FOLLOW_116_in_dotselector2133); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_116.add(char_literal234);

                    this.pushFollow(FormulaParser.FOLLOW_arrayName_in_dotselector2135);
                    arrayName235=this.arrayName();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_arrayName.add(arrayName235.getTree());


                    break;

                default :
                    if ( cnt83 >= 1 ) {
                        break loop83;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(83, this.input);
                        throw eee;
                }
                cnt83++;
            } while (true);



            // AST REWRITE
            // elements: arrayName
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 323:21: -> ^( DOTSELECTOR ( arrayName )+ )
            {
                // /Library/WebServer/Documents/calc/Formula.g:323:24: ^( DOTSELECTOR ( arrayName )+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(DOTSELECTOR, "DOTSELECTOR"), root_1);

                if ( !(stream_arrayName.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_arrayName.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_arrayName.nextTree());

                }
                stream_arrayName.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    arrayName_return: (function() {
        FormulaParser.arrayName_return = function(){};
        org.antlr.lang.extend(FormulaParser.arrayName_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:326:1: arrayName : ( IDENT | STRING | MULT );
    // $ANTLR start "arrayName"
    arrayName: function() {
        var retval = new FormulaParser.arrayName_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set236 = null;

        var set236_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:327:2: ( IDENT | STRING | MULT )
            // /Library/WebServer/Documents/calc/Formula.g:
            root_0 = this.adaptor.nil();

            set236=this.input.LT(1);
            if ( this.input.LA(1)==IDENT||this.input.LA(1)==MULT||this.input.LA(1)==STRING ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set236));
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    label_return: (function() {
        FormulaParser.label_return = function(){};
        org.antlr.lang.extend(FormulaParser.label_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:330:1: label : ( arrayName ( NEWLINE )* COLON )? ( NEWLINE )* logicalExpression -> ^( LABEL logicalExpression ( arrayName )? ) ;
    // $ANTLR start "label"
    label: function() {
        var retval = new FormulaParser.label_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NEWLINE238 = null;
        var COLON239 = null;
        var NEWLINE240 = null;
         var arrayName237 = null;
         var logicalExpression241 = null;

        var NEWLINE238_tree=null;
        var COLON239_tree=null;
        var NEWLINE240_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_NEWLINE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token NEWLINE");
        var stream_arrayName=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule arrayName");
        var stream_logicalExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule logicalExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:330:7: ( ( arrayName ( NEWLINE )* COLON )? ( NEWLINE )* logicalExpression -> ^( LABEL logicalExpression ( arrayName )? ) )
            // /Library/WebServer/Documents/calc/Formula.g:331:2: ( arrayName ( NEWLINE )* COLON )? ( NEWLINE )* logicalExpression
            // /Library/WebServer/Documents/calc/Formula.g:331:2: ( arrayName ( NEWLINE )* COLON )?
            var alt85=2;
            alt85 = this.dfa85.predict(this.input);
            switch (alt85) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:331:3: arrayName ( NEWLINE )* COLON
                    this.pushFollow(FormulaParser.FOLLOW_arrayName_in_label2173);
                    arrayName237=this.arrayName();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_arrayName.add(arrayName237.getTree());
                    // /Library/WebServer/Documents/calc/Formula.g:331:13: ( NEWLINE )*
                    loop84:
                    do {
                        var alt84=2;
                        var LA84_0 = this.input.LA(1);

                        if ( (LA84_0==NEWLINE) ) {
                            alt84=1;
                        }


                        switch (alt84) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                            NEWLINE238=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_label2175); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE238);



                            break;

                        default :
                            break loop84;
                        }
                    } while (true);

                    COLON239=this.match(this.input,COLON,FormulaParser.FOLLOW_COLON_in_label2178); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COLON.add(COLON239);



                    break;

            }

            // /Library/WebServer/Documents/calc/Formula.g:331:30: ( NEWLINE )*
            loop86:
            do {
                var alt86=2;
                var LA86_0 = this.input.LA(1);

                if ( (LA86_0==NEWLINE) ) {
                    alt86=1;
                }


                switch (alt86) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                    NEWLINE240=this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_label2182); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_NEWLINE.add(NEWLINE240);



                    break;

                default :
                    break loop86;
                }
            } while (true);

            this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_label2185);
            logicalExpression241=this.logicalExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_logicalExpression.add(logicalExpression241.getTree());


            // AST REWRITE
            // elements: arrayName, logicalExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 331:57: -> ^( LABEL logicalExpression ( arrayName )? )
            {
                // /Library/WebServer/Documents/calc/Formula.g:331:60: ^( LABEL logicalExpression ( arrayName )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LABEL, "LABEL"), root_1);

                this.adaptor.addChild(root_1, stream_logicalExpression.nextTree());
                // /Library/WebServer/Documents/calc/Formula.g:331:86: ( arrayName )?
                if ( stream_arrayName.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_arrayName.nextTree());

                }
                stream_arrayName.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    number_return: (function() {
        FormulaParser.number_return = function(){};
        org.antlr.lang.extend(FormulaParser.number_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:342:1: number : ( INTEGER | FLOAT );
    // $ANTLR start "number"
    number: function() {
        var retval = new FormulaParser.number_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set242 = null;

        var set242_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:342:8: ( INTEGER | FLOAT )
            // /Library/WebServer/Documents/calc/Formula.g:
            root_0 = this.adaptor.nil();

            set242=this.input.LT(1);
            if ( (this.input.LA(1)>=INTEGER && this.input.LA(1)<=FLOAT) ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set242));
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    negnumber_return: (function() {
        FormulaParser.negnumber_return = function(){};
        org.antlr.lang.extend(FormulaParser.negnumber_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:344:1: negnumber : '-' number -> ^( NEGATE number ) ;
    // $ANTLR start "negnumber"
    negnumber: function() {
        var retval = new FormulaParser.negnumber_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal243 = null;
         var number244 = null;

        var char_literal243_tree=null;
        var stream_MINUS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token MINUS");
        var stream_number=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule number");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:344:11: ( '-' number -> ^( NEGATE number ) )
            // /Library/WebServer/Documents/calc/Formula.g:344:13: '-' number
            char_literal243=this.match(this.input,MINUS,FormulaParser.FOLLOW_MINUS_in_negnumber2261); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_MINUS.add(char_literal243);

            this.pushFollow(FormulaParser.FOLLOW_number_in_negnumber2263);
            number244=this.number();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_number.add(number244.getTree());


            // AST REWRITE
            // elements: number
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 344:24: -> ^( NEGATE number )
            {
                // /Library/WebServer/Documents/calc/Formula.g:344:27: ^( NEGATE number )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(NEGATE, "NEGATE"), root_1);

                this.adaptor.addChild(root_1, stream_number.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bool_return: (function() {
        FormulaParser.bool_return = function(){};
        org.antlr.lang.extend(FormulaParser.bool_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:354:1: bool : ( TRUE | FALSE );
    // $ANTLR start "bool"
    bool: function() {
        var retval = new FormulaParser.bool_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set245 = null;

        var set245_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:355:2: ( TRUE | FALSE )
            // /Library/WebServer/Documents/calc/Formula.g:
            root_0 = this.adaptor.nil();

            set245=this.input.LT(1);
            if ( (this.input.LA(1)>=TRUE && this.input.LA(1)<=FALSE) ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set245));
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    material_return: (function() {
        FormulaParser.material_return = function(){};
        org.antlr.lang.extend(FormulaParser.material_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:367:1: material : LCURL additiveExpression {...}? unitMultiplicativeExpression RCURL -> ^( MATERIAL unitMultiplicativeExpression additiveExpression ) ;
    // $ANTLR start "material"
    material: function() {
        var retval = new FormulaParser.material_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LCURL246 = null;
        var RCURL249 = null;
         var additiveExpression247 = null;
         var unitMultiplicativeExpression248 = null;

        var LCURL246_tree=null;
        var RCURL249_tree=null;
        var stream_LCURL=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LCURL");
        var stream_RCURL=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RCURL");
        var stream_unitMultiplicativeExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule unitMultiplicativeExpression");
        var stream_additiveExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule additiveExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:367:9: ( LCURL additiveExpression {...}? unitMultiplicativeExpression RCURL -> ^( MATERIAL unitMultiplicativeExpression additiveExpression ) )
            // /Library/WebServer/Documents/calc/Formula.g:367:12: LCURL additiveExpression {...}? unitMultiplicativeExpression RCURL
            LCURL246=this.match(this.input,LCURL,FormulaParser.FOLLOW_LCURL_in_material2415); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_LCURL.add(LCURL246);

            this.pushFollow(FormulaParser.FOLLOW_additiveExpression_in_material2417);
            additiveExpression247=this.additiveExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_additiveExpression.add(additiveExpression247.getTree());
            if ( !(( this.input.get(this.input.index()-1).getText()==" ")) ) {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                throw new org.antlr.runtime.FailedPredicateException(this.input, "material", " this.input.get(this.input.index()-1).getText()==\" \"");
            }
            this.pushFollow(FormulaParser.FOLLOW_unitMultiplicativeExpression_in_material2421);
            unitMultiplicativeExpression248=this.unitMultiplicativeExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_unitMultiplicativeExpression.add(unitMultiplicativeExpression248.getTree());
            RCURL249=this.match(this.input,RCURL,FormulaParser.FOLLOW_RCURL_in_material2423); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_RCURL.add(RCURL249);



            // AST REWRITE
            // elements: additiveExpression, unitMultiplicativeExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 367:128: -> ^( MATERIAL unitMultiplicativeExpression additiveExpression )
            {
                // /Library/WebServer/Documents/calc/Formula.g:367:131: ^( MATERIAL unitMultiplicativeExpression additiveExpression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(MATERIAL, "MATERIAL"), root_1);

                this.adaptor.addChild(root_1, stream_unitMultiplicativeExpression.nextTree());
                this.adaptor.addChild(root_1, stream_additiveExpression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unitMultiplicativeExpression_return: (function() {
        FormulaParser.unitMultiplicativeExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.unitMultiplicativeExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:374:1: unitMultiplicativeExpression : unitInnerMultiplicativeExpression ( PER unitInnerMultiplicativeExpression )* ;
    // $ANTLR start "unitMultiplicativeExpression"
    unitMultiplicativeExpression: function() {
        var retval = new FormulaParser.unitMultiplicativeExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var PER251 = null;
         var unitInnerMultiplicativeExpression250 = null;
         var unitInnerMultiplicativeExpression252 = null;

        var PER251_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:375:2: ( unitInnerMultiplicativeExpression ( PER unitInnerMultiplicativeExpression )* )
            // /Library/WebServer/Documents/calc/Formula.g:375:4: unitInnerMultiplicativeExpression ( PER unitInnerMultiplicativeExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_unitInnerMultiplicativeExpression_in_unitMultiplicativeExpression2460);
            unitInnerMultiplicativeExpression250=this.unitInnerMultiplicativeExpression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, unitInnerMultiplicativeExpression250.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:375:38: ( PER unitInnerMultiplicativeExpression )*
            loop87:
            do {
                var alt87=2;
                var LA87_0 = this.input.LA(1);

                if ( (LA87_0==PER) ) {
                    alt87=1;
                }


                switch (alt87) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:375:40: PER unitInnerMultiplicativeExpression
                    PER251=this.match(this.input,PER,FormulaParser.FOLLOW_PER_in_unitMultiplicativeExpression2464); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    PER251_tree = this.adaptor.create(PER251);
                    root_0 = this.adaptor.becomeRoot(PER251_tree, root_0);
                    }
                    this.pushFollow(FormulaParser.FOLLOW_unitInnerMultiplicativeExpression_in_unitMultiplicativeExpression2467);
                    unitInnerMultiplicativeExpression252=this.unitInnerMultiplicativeExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, unitInnerMultiplicativeExpression252.getTree());


                    break;

                default :
                    break loop87;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unitInnerMultiplicativeExpression_return: (function() {
        FormulaParser.unitInnerMultiplicativeExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.unitInnerMultiplicativeExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:378:1: unitInnerMultiplicativeExpression : unitClump ( ( MULT | DIV ) unitClump )* ;
    // $ANTLR start "unitInnerMultiplicativeExpression"
    unitInnerMultiplicativeExpression: function() {
        var retval = new FormulaParser.unitInnerMultiplicativeExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set254 = null;
         var unitClump253 = null;
         var unitClump255 = null;

        var set254_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:379:2: ( unitClump ( ( MULT | DIV ) unitClump )* )
            // /Library/WebServer/Documents/calc/Formula.g:379:4: unitClump ( ( MULT | DIV ) unitClump )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_unitClump_in_unitInnerMultiplicativeExpression2483);
            unitClump253=this.unitClump();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, unitClump253.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:379:14: ( ( MULT | DIV ) unitClump )*
            loop88:
            do {
                var alt88=2;
                var LA88_0 = this.input.LA(1);

                if ( ((LA88_0>=MULT && LA88_0<=DIV)) ) {
                    alt88=1;
                }


                switch (alt88) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:379:16: ( MULT | DIV ) unitClump
                    
                    set254=this.input.LT(1);
                    if ( (this.input.LA(1)>=MULT && this.input.LA(1)<=DIV) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set254), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(FormulaParser.FOLLOW_unitClump_in_unitInnerMultiplicativeExpression2494);
                    unitClump255=this.unitClump();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, unitClump255.getTree());


                    break;

                default :
                    break loop88;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unitClump_return: (function() {
        FormulaParser.unitClump_return = function(){};
        org.antlr.lang.extend(FormulaParser.unitClump_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:382:1: unitClump : ( ( INTEGER DIV ) unitPowerExpression ( CUBED )? ( SQUARED )? -> ^( UNITCLUMP unitPowerExpression NEGATE ( CUBED )* ( SQUARED )* ) | unitPowerExpression ( CUBED )? ( SQUARED )? -> ^( UNITCLUMP unitPowerExpression ( CUBED )* ( SQUARED )* ) );
    // $ANTLR start "unitClump"
    unitClump: function() {
        var retval = new FormulaParser.unitClump_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var INTEGER256 = null;
        var DIV257 = null;
        var CUBED259 = null;
        var SQUARED260 = null;
        var CUBED262 = null;
        var SQUARED263 = null;
         var unitPowerExpression258 = null;
         var unitPowerExpression261 = null;

        var INTEGER256_tree=null;
        var DIV257_tree=null;
        var CUBED259_tree=null;
        var SQUARED260_tree=null;
        var CUBED262_tree=null;
        var SQUARED263_tree=null;
        var stream_INTEGER=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token INTEGER");
        var stream_SQUARED=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SQUARED");
        var stream_DIV=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token DIV");
        var stream_CUBED=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token CUBED");
        var stream_unitPowerExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule unitPowerExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:383:2: ( ( INTEGER DIV ) unitPowerExpression ( CUBED )? ( SQUARED )? -> ^( UNITCLUMP unitPowerExpression NEGATE ( CUBED )* ( SQUARED )* ) | unitPowerExpression ( CUBED )? ( SQUARED )? -> ^( UNITCLUMP unitPowerExpression ( CUBED )* ( SQUARED )* ) )
            var alt93=2;
            var LA93_0 = this.input.LA(1);

            if ( (LA93_0==INTEGER) ) {
                alt93=1;
            }
            else if ( (LA93_0==IDENT||LA93_0==113) ) {
                alt93=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 93, 0, this.input);

                throw nvae;
            }
            switch (alt93) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:383:4: ( INTEGER DIV ) unitPowerExpression ( CUBED )? ( SQUARED )?
                    // /Library/WebServer/Documents/calc/Formula.g:383:4: ( INTEGER DIV )
                    // /Library/WebServer/Documents/calc/Formula.g:383:5: INTEGER DIV
                    INTEGER256=this.match(this.input,INTEGER,FormulaParser.FOLLOW_INTEGER_in_unitClump2510); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_INTEGER.add(INTEGER256);

                    DIV257=this.match(this.input,DIV,FormulaParser.FOLLOW_DIV_in_unitClump2512); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_DIV.add(DIV257);




                    this.pushFollow(FormulaParser.FOLLOW_unitPowerExpression_in_unitClump2515);
                    unitPowerExpression258=this.unitPowerExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_unitPowerExpression.add(unitPowerExpression258.getTree());
                    // /Library/WebServer/Documents/calc/Formula.g:383:38: ( CUBED )?
                    var alt89=2;
                    var LA89_0 = this.input.LA(1);

                    if ( (LA89_0==CUBED) ) {
                        alt89=1;
                    }
                    switch (alt89) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: CUBED
                            CUBED259=this.match(this.input,CUBED,FormulaParser.FOLLOW_CUBED_in_unitClump2517); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_CUBED.add(CUBED259);



                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:383:45: ( SQUARED )?
                    var alt90=2;
                    var LA90_0 = this.input.LA(1);

                    if ( (LA90_0==SQUARED) ) {
                        alt90=1;
                    }
                    switch (alt90) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: SQUARED
                            SQUARED260=this.match(this.input,SQUARED,FormulaParser.FOLLOW_SQUARED_in_unitClump2520); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_SQUARED.add(SQUARED260);



                            break;

                    }



                    // AST REWRITE
                    // elements: CUBED, unitPowerExpression, SQUARED
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 383:54: -> ^( UNITCLUMP unitPowerExpression NEGATE ( CUBED )* ( SQUARED )* )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:383:57: ^( UNITCLUMP unitPowerExpression NEGATE ( CUBED )* ( SQUARED )* )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(UNITCLUMP, "UNITCLUMP"), root_1);

                        this.adaptor.addChild(root_1, stream_unitPowerExpression.nextTree());
                        this.adaptor.addChild(root_1, this.adaptor.create(NEGATE, "NEGATE"));
                        // /Library/WebServer/Documents/calc/Formula.g:383:96: ( CUBED )*
                        while ( stream_CUBED.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_CUBED.nextNode());

                        }
                        stream_CUBED.reset();
                        // /Library/WebServer/Documents/calc/Formula.g:383:103: ( SQUARED )*
                        while ( stream_SQUARED.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_SQUARED.nextNode());

                        }
                        stream_SQUARED.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:384:5: unitPowerExpression ( CUBED )? ( SQUARED )?
                    this.pushFollow(FormulaParser.FOLLOW_unitPowerExpression_in_unitClump2543);
                    unitPowerExpression261=this.unitPowerExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_unitPowerExpression.add(unitPowerExpression261.getTree());
                    // /Library/WebServer/Documents/calc/Formula.g:384:25: ( CUBED )?
                    var alt91=2;
                    var LA91_0 = this.input.LA(1);

                    if ( (LA91_0==CUBED) ) {
                        alt91=1;
                    }
                    switch (alt91) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: CUBED
                            CUBED262=this.match(this.input,CUBED,FormulaParser.FOLLOW_CUBED_in_unitClump2545); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_CUBED.add(CUBED262);



                            break;

                    }

                    // /Library/WebServer/Documents/calc/Formula.g:384:32: ( SQUARED )?
                    var alt92=2;
                    var LA92_0 = this.input.LA(1);

                    if ( (LA92_0==SQUARED) ) {
                        alt92=1;
                    }
                    switch (alt92) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: SQUARED
                            SQUARED263=this.match(this.input,SQUARED,FormulaParser.FOLLOW_SQUARED_in_unitClump2548); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_SQUARED.add(SQUARED263);



                            break;

                    }



                    // AST REWRITE
                    // elements: unitPowerExpression, CUBED, SQUARED
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 384:41: -> ^( UNITCLUMP unitPowerExpression ( CUBED )* ( SQUARED )* )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:384:44: ^( UNITCLUMP unitPowerExpression ( CUBED )* ( SQUARED )* )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(UNITCLUMP, "UNITCLUMP"), root_1);

                        this.adaptor.addChild(root_1, stream_unitPowerExpression.nextTree());
                        // /Library/WebServer/Documents/calc/Formula.g:384:76: ( CUBED )*
                        while ( stream_CUBED.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_CUBED.nextNode());

                        }
                        stream_CUBED.reset();
                        // /Library/WebServer/Documents/calc/Formula.g:384:83: ( SQUARED )*
                        while ( stream_SQUARED.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_SQUARED.nextNode());

                        }
                        stream_SQUARED.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unitPowerExpression_return: (function() {
        FormulaParser.unitPowerExpression_return = function(){};
        org.antlr.lang.extend(FormulaParser.unitPowerExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:388:1: unitPowerExpression : unit ( POW ( MINUS )? ( INTEGER | FLOAT ) )* ;
    // $ANTLR start "unitPowerExpression"
    unitPowerExpression: function() {
        var retval = new FormulaParser.unitPowerExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var POW265 = null;
        var MINUS266 = null;
        var set267 = null;
         var unit264 = null;

        var POW265_tree=null;
        var MINUS266_tree=null;
        var set267_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:389:2: ( unit ( POW ( MINUS )? ( INTEGER | FLOAT ) )* )
            // /Library/WebServer/Documents/calc/Formula.g:389:5: unit ( POW ( MINUS )? ( INTEGER | FLOAT ) )*
            root_0 = this.adaptor.nil();

            this.pushFollow(FormulaParser.FOLLOW_unit_in_unitPowerExpression2610);
            unit264=this.unit();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, unit264.getTree());
            // /Library/WebServer/Documents/calc/Formula.g:389:10: ( POW ( MINUS )? ( INTEGER | FLOAT ) )*
            loop95:
            do {
                var alt95=2;
                var LA95_0 = this.input.LA(1);

                if ( (LA95_0==POW) ) {
                    alt95=1;
                }


                switch (alt95) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:389:12: POW ( MINUS )? ( INTEGER | FLOAT )
                    POW265=this.match(this.input,POW,FormulaParser.FOLLOW_POW_in_unitPowerExpression2614); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    POW265_tree = this.adaptor.create(POW265);
                    root_0 = this.adaptor.becomeRoot(POW265_tree, root_0);
                    }
                    // /Library/WebServer/Documents/calc/Formula.g:389:17: ( MINUS )?
                    var alt94=2;
                    var LA94_0 = this.input.LA(1);

                    if ( (LA94_0==MINUS) ) {
                        alt94=1;
                    }
                    switch (alt94) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:0:0: MINUS
                            MINUS266=this.match(this.input,MINUS,FormulaParser.FOLLOW_MINUS_in_unitPowerExpression2617); if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) {
                            MINUS266_tree = this.adaptor.create(MINUS266);
                            this.adaptor.addChild(root_0, MINUS266_tree);
                            }


                            break;

                    }

                    set267=this.input.LT(1);
                    if ( (this.input.LA(1)>=INTEGER && this.input.LA(1)<=FLOAT) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set267));
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }



                    break;

                default :
                    break loop95;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unit_return: (function() {
        FormulaParser.unit_return = function(){};
        org.antlr.lang.extend(FormulaParser.unit_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:392:1: unit : ( IDENT ( IDENT )* -> ^( UNIT ( IDENT )+ ) | '(' unitMultiplicativeExpression ')' -> ^( UNITCLUMP unitMultiplicativeExpression ) );
    // $ANTLR start "unit"
    unit: function() {
        var retval = new FormulaParser.unit_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IDENT268 = null;
        var IDENT269 = null;
        var char_literal270 = null;
        var char_literal272 = null;
         var unitMultiplicativeExpression271 = null;

        var IDENT268_tree=null;
        var IDENT269_tree=null;
        var char_literal270_tree=null;
        var char_literal272_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_IDENT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IDENT");
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_unitMultiplicativeExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule unitMultiplicativeExpression");
        try {
            // /Library/WebServer/Documents/calc/Formula.g:392:6: ( IDENT ( IDENT )* -> ^( UNIT ( IDENT )+ ) | '(' unitMultiplicativeExpression ')' -> ^( UNITCLUMP unitMultiplicativeExpression ) )
            var alt97=2;
            var LA97_0 = this.input.LA(1);

            if ( (LA97_0==IDENT) ) {
                alt97=1;
            }
            else if ( (LA97_0==113) ) {
                alt97=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 97, 0, this.input);

                throw nvae;
            }
            switch (alt97) {
                case 1 :
                    // /Library/WebServer/Documents/calc/Formula.g:392:8: IDENT ( IDENT )*
                    IDENT268=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_unit2638); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT268);

                    // /Library/WebServer/Documents/calc/Formula.g:392:14: ( IDENT )*
                    loop96:
                    do {
                        var alt96=2;
                        var LA96_0 = this.input.LA(1);

                        if ( (LA96_0==IDENT) ) {
                            alt96=1;
                        }


                        switch (alt96) {
                        case 1 :
                            // /Library/WebServer/Documents/calc/Formula.g:392:15: IDENT
                            IDENT269=this.match(this.input,IDENT,FormulaParser.FOLLOW_IDENT_in_unit2641); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_IDENT.add(IDENT269);



                            break;

                        default :
                            break loop96;
                        }
                    } while (true);



                    // AST REWRITE
                    // elements: IDENT
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 392:23: -> ^( UNIT ( IDENT )+ )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:392:26: ^( UNIT ( IDENT )+ )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(UNIT, "UNIT"), root_1);

                        if ( !(stream_IDENT.hasNext()) ) {
                            throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                        }
                        while ( stream_IDENT.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_IDENT.nextNode());

                        }
                        stream_IDENT.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // /Library/WebServer/Documents/calc/Formula.g:393:5: '(' unitMultiplicativeExpression ')'
                    char_literal270=this.match(this.input,113,FormulaParser.FOLLOW_113_in_unit2658); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_113.add(char_literal270);

                    this.pushFollow(FormulaParser.FOLLOW_unitMultiplicativeExpression_in_unit2660);
                    unitMultiplicativeExpression271=this.unitMultiplicativeExpression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_unitMultiplicativeExpression.add(unitMultiplicativeExpression271.getTree());
                    char_literal272=this.match(this.input,114,FormulaParser.FOLLOW_114_in_unit2662); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_114.add(char_literal272);



                    // AST REWRITE
                    // elements: unitMultiplicativeExpression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 393:42: -> ^( UNITCLUMP unitMultiplicativeExpression )
                    {
                        // /Library/WebServer/Documents/calc/Formula.g:393:45: ^( UNITCLUMP unitMultiplicativeExpression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(UNITCLUMP, "UNITCLUMP"), root_1);

                        this.adaptor.addChild(root_1, stream_unitMultiplicativeExpression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    primitive_return: (function() {
        FormulaParser.primitive_return = function(){};
        org.antlr.lang.extend(FormulaParser.primitive_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:406:1: primitive : PRIMITIVE ;
    // $ANTLR start "primitive"
    primitive: function() {
        var retval = new FormulaParser.primitive_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var PRIMITIVE273 = null;

        var PRIMITIVE273_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:407:2: ( PRIMITIVE )
            // /Library/WebServer/Documents/calc/Formula.g:407:4: PRIMITIVE
            root_0 = this.adaptor.nil();

            PRIMITIVE273=this.match(this.input,PRIMITIVE,FormulaParser.FOLLOW_PRIMITIVE_in_primitive2731); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            PRIMITIVE273_tree = this.adaptor.create(PRIMITIVE273);
            this.adaptor.addChild(root_0, PRIMITIVE273_tree);
            }



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    string_return: (function() {
        FormulaParser.string_return = function(){};
        org.antlr.lang.extend(FormulaParser.string_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // /Library/WebServer/Documents/calc/Formula.g:466:1: string : STRING ;
    // $ANTLR start "string"
    string: function() {
        var retval = new FormulaParser.string_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var STRING274 = null;

        var STRING274_tree=null;

        try {
            // /Library/WebServer/Documents/calc/Formula.g:467:4: ( STRING )
            // /Library/WebServer/Documents/calc/Formula.g:467:7: STRING
            root_0 = this.adaptor.nil();

            STRING274=this.match(this.input,STRING,FormulaParser.FOLLOW_STRING_in_string3200); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            STRING274_tree = this.adaptor.create(STRING274);
            root_0 = this.adaptor.becomeRoot(STRING274_tree, root_0);
            }



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // $ANTLR start "synpred5_Formula"
    synpred5_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:121:5: ( assignment )
        // /Library/WebServer/Documents/calc/Formula.g:121:5: assignment
        this.pushFollow(FormulaParser.FOLLOW_assignment_in_synpred5_Formula508);
        this.assignment();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred5_Formula",

    // $ANTLR start "synpred6_Formula"
    synpred6_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:122:5: ( logicalExpression )
        // /Library/WebServer/Documents/calc/Formula.g:122:5: logicalExpression
        this.pushFollow(FormulaParser.FOLLOW_logicalExpression_in_synpred6_Formula514);
        this.logicalExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred6_Formula",

    // $ANTLR start "synpred8_Formula"
    synpred8_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:124:5: ( forLoop )
        // /Library/WebServer/Documents/calc/Formula.g:124:5: forLoop
        this.pushFollow(FormulaParser.FOLLOW_forLoop_in_synpred8_Formula526);
        this.forLoop();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred8_Formula",

    // $ANTLR start "synpred9_Formula"
    synpred9_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:125:5: ( forInLoop )
        // /Library/WebServer/Documents/calc/Formula.g:125:5: forInLoop
        this.pushFollow(FormulaParser.FOLLOW_forInLoop_in_synpred9_Formula532);
        this.forInLoop();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred9_Formula",

    // $ANTLR start "synpred11_Formula"
    synpred11_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:127:5: ( functionDef )
        // /Library/WebServer/Documents/calc/Formula.g:127:5: functionDef
        this.pushFollow(FormulaParser.FOLLOW_functionDef_in_synpred11_Formula544);
        this.functionDef();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred11_Formula",

    // $ANTLR start "synpred47_Formula"
    synpred47_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:187:26: ( OR booleanXORExpression )
        // /Library/WebServer/Documents/calc/Formula.g:187:26: OR booleanXORExpression
        this.match(this.input,OR,FormulaParser.FOLLOW_OR_in_synpred47_Formula1217); if (this.state.failed) return ;
        this.pushFollow(FormulaParser.FOLLOW_booleanXORExpression_in_synpred47_Formula1220);
        this.booleanXORExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred47_Formula",

    // $ANTLR start "synpred48_Formula"
    synpred48_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:193:26: ( XOR booleanAndExpression )
        // /Library/WebServer/Documents/calc/Formula.g:193:26: XOR booleanAndExpression
        this.match(this.input,XOR,FormulaParser.FOLLOW_XOR_in_synpred48_Formula1253); if (this.state.failed) return ;
        this.pushFollow(FormulaParser.FOLLOW_booleanAndExpression_in_synpred48_Formula1256);
        this.booleanAndExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred48_Formula",

    // $ANTLR start "synpred49_Formula"
    synpred49_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:199:24: ( AND equalityExpression )
        // /Library/WebServer/Documents/calc/Formula.g:199:24: AND equalityExpression
        this.match(this.input,AND,FormulaParser.FOLLOW_AND_in_synpred49_Formula1288); if (this.state.failed) return ;
        this.pushFollow(FormulaParser.FOLLOW_equalityExpression_in_synpred49_Formula1291);
        this.equalityExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred49_Formula",

    // $ANTLR start "synpred51_Formula"
    synpred51_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:205:26: ( ( EQUALS | NOTEQUALS ) relationalExpression )
        // /Library/WebServer/Documents/calc/Formula.g:205:26: ( EQUALS | NOTEQUALS ) relationalExpression
        if ( this.input.LA(1)==EQUALS||this.input.LA(1)==NOTEQUALS ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        this.pushFollow(FormulaParser.FOLLOW_relationalExpression_in_synpred51_Formula1332);
        this.relationalExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred51_Formula",

    // $ANTLR start "synpred55_Formula"
    synpred55_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:216:25: ( ( LT | LTEQ | GT | GTEQ ) additiveExpression )
        // /Library/WebServer/Documents/calc/Formula.g:216:25: ( LT | LTEQ | GT | GTEQ ) additiveExpression
        if ( (this.input.LA(1)>=LT && this.input.LA(1)<=GTEQ) ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        this.pushFollow(FormulaParser.FOLLOW_additiveExpression_in_synpred55_Formula1389);
        this.additiveExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred55_Formula",

    // $ANTLR start "synpred57_Formula"
    synpred57_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:225:31: ( ( PLUS | MINUS ) multiplicativeExpression )
        // /Library/WebServer/Documents/calc/Formula.g:225:31: ( PLUS | MINUS ) multiplicativeExpression
        if ( (this.input.LA(1)>=PLUS && this.input.LA(1)<=MINUS) ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        this.pushFollow(FormulaParser.FOLLOW_multiplicativeExpression_in_synpred57_Formula1443);
        this.multiplicativeExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred57_Formula",

    // $ANTLR start "synpred60_Formula"
    synpred60_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:232:22: ( ( MULT | DIV | MOD ) arrayExpression )
        // /Library/WebServer/Documents/calc/Formula.g:232:22: ( MULT | DIV | MOD ) arrayExpression
        if ( (this.input.LA(1)>=MULT && this.input.LA(1)<=MOD) ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        this.pushFollow(FormulaParser.FOLLOW_arrayExpression_in_synpred60_Formula1486);
        this.arrayExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred60_Formula",

    // $ANTLR start "synpred61_Formula"
    synpred61_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:240:25: ({...}? COLON {...}? negationExpression )
        // /Library/WebServer/Documents/calc/Formula.g:240:25: {...}? COLON {...}? negationExpression
        if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            throw new org.antlr.runtime.FailedPredicateException(this.input, "synpred61_Formula", " this.input.get(this.input.index()-1).getText()!=\" \"");
        }
        this.match(this.input,COLON,FormulaParser.FOLLOW_COLON_in_synpred61_Formula1538); if (this.state.failed) return ;
        if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            throw new org.antlr.runtime.FailedPredicateException(this.input, "synpred61_Formula", " this.input.get(this.input.index()-1).getText()!=\" \"");
        }
        this.pushFollow(FormulaParser.FOLLOW_negationExpression_in_synpred61_Formula1542);
        this.negationExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred61_Formula",

    // $ANTLR start "synpred62_Formula"
    synpred62_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:240:167: ({...}? COLON {...}? negationExpression )
        // /Library/WebServer/Documents/calc/Formula.g:240:167: {...}? COLON {...}? negationExpression
        if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            throw new org.antlr.runtime.FailedPredicateException(this.input, "synpred62_Formula", " this.input.get(this.input.index()-1).getText()!=\" \"");
        }
        this.match(this.input,COLON,FormulaParser.FOLLOW_COLON_in_synpred62_Formula1551); if (this.state.failed) return ;
        if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            throw new org.antlr.runtime.FailedPredicateException(this.input, "synpred62_Formula", " this.input.get(this.input.index()-1).getText()!=\" \"");
        }
        this.pushFollow(FormulaParser.FOLLOW_negationExpression_in_synpred62_Formula1555);
        this.negationExpression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred62_Formula",

    // $ANTLR start "synpred64_Formula"
    synpred64_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:249:21: ( POW unaryOrNegate )
        // /Library/WebServer/Documents/calc/Formula.g:249:21: POW unaryOrNegate
        this.match(this.input,POW,FormulaParser.FOLLOW_POW_in_synpred64_Formula1610); if (this.state.failed) return ;
        this.pushFollow(FormulaParser.FOLLOW_unaryOrNegate_in_synpred64_Formula1612);
        this.unaryOrNegate();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred64_Formula",

    // $ANTLR start "synpred68_Formula"
    synpred68_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:271:23: ({...}? ( selector | funCall ) )
        // /Library/WebServer/Documents/calc/Formula.g:271:23: {...}? ( selector | funCall )
        if ( !(( this.input.get(this.input.index()-1).getText()!=" ")) ) {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            throw new org.antlr.runtime.FailedPredicateException(this.input, "synpred68_Formula", " this.input.get(this.input.index()-1).getText()!=\" \"");
        }
        // /Library/WebServer/Documents/calc/Formula.g:271:79: ( selector | funCall )
        var alt119=2;
        var LA119_0 = this.input.LA(1);

        if ( (LA119_0==LARR||LA119_0==LCURL||LA119_0==116) ) {
            alt119=1;
        }
        else if ( (LA119_0==113) ) {
            alt119=2;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var nvae =
                new org.antlr.runtime.NoViableAltException("", 119, 0, this.input);

            throw nvae;
        }
        switch (alt119) {
            case 1 :
                // /Library/WebServer/Documents/calc/Formula.g:271:80: selector
                this.pushFollow(FormulaParser.FOLLOW_selector_in_synpred68_Formula1744);
                this.selector();

                this.state._fsp--;
                if (this.state.failed) return ;


                break;
            case 2 :
                // /Library/WebServer/Documents/calc/Formula.g:271:89: funCall
                this.pushFollow(FormulaParser.FOLLOW_funCall_in_synpred68_Formula1746);
                this.funCall();

                this.state._fsp--;
                if (this.state.failed) return ;


                break;

        }



    },
    // $ANTLR end "synpred68_Formula",

    // $ANTLR start "synpred75_Formula"
    synpred75_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:287:5: ( material )
        // /Library/WebServer/Documents/calc/Formula.g:287:5: material
        this.pushFollow(FormulaParser.FOLLOW_material_in_synpred75_Formula1841);
        this.material();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred75_Formula",

    // $ANTLR start "synpred78_Formula"
    synpred78_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:290:4: ( array )
        // /Library/WebServer/Documents/calc/Formula.g:290:4: array
        this.pushFollow(FormulaParser.FOLLOW_array_in_synpred78_Formula1856);
        this.array();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred78_Formula",

    // $ANTLR start "synpred80_Formula"
    synpred80_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:296:22: ( funCall )
        // /Library/WebServer/Documents/calc/Formula.g:296:22: funCall
        this.pushFollow(FormulaParser.FOLLOW_funCall_in_synpred80_Formula1880);
        this.funCall();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred80_Formula",

    // $ANTLR start "synpred85_Formula"
    synpred85_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:309:7: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:309:7: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred85_Formula1946); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred85_Formula",

    // $ANTLR start "synpred86_Formula"
    synpred86_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:309:23: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:309:23: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred86_Formula1952); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred86_Formula",

    // $ANTLR start "synpred87_Formula"
    synpred87_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:309:37: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:309:37: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred87_Formula1958); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred87_Formula",

    // $ANTLR start "synpred88_Formula"
    synpred88_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:309:52: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:309:52: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred88_Formula1963); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred88_Formula",

    // $ANTLR start "synpred93_Formula"
    synpred93_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:310:10: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:310:10: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred93_Formula1989); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred93_Formula",

    // $ANTLR start "synpred94_Formula"
    synpred94_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:310:26: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:310:26: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred94_Formula1995); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred94_Formula",

    // $ANTLR start "synpred95_Formula"
    synpred95_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:310:39: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:310:39: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred95_Formula2000); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred95_Formula",

    // $ANTLR start "synpred96_Formula"
    synpred96_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:310:54: ( NEWLINE )
        // /Library/WebServer/Documents/calc/Formula.g:310:54: NEWLINE
        this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred96_Formula2005); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred96_Formula",

    // $ANTLR start "synpred108_Formula"
    synpred108_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:323:5: ( '.' arrayName )
        // /Library/WebServer/Documents/calc/Formula.g:323:5: '.' arrayName
        this.match(this.input,116,FormulaParser.FOLLOW_116_in_synpred108_Formula2133); if (this.state.failed) return ;
        this.pushFollow(FormulaParser.FOLLOW_arrayName_in_synpred108_Formula2135);
        this.arrayName();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred108_Formula",

    // $ANTLR start "synpred112_Formula"
    synpred112_Formula_fragment: function() {
        // /Library/WebServer/Documents/calc/Formula.g:331:3: ( arrayName ( NEWLINE )* COLON )
        // /Library/WebServer/Documents/calc/Formula.g:331:3: arrayName ( NEWLINE )* COLON
        this.pushFollow(FormulaParser.FOLLOW_arrayName_in_synpred112_Formula2173);
        this.arrayName();

        this.state._fsp--;
        if (this.state.failed) return ;
        // /Library/WebServer/Documents/calc/Formula.g:331:13: ( NEWLINE )*
        loop145:
        do {
            var alt145=2;
            var LA145_0 = this.input.LA(1);

            if ( (LA145_0==NEWLINE) ) {
                alt145=1;
            }


            switch (alt145) {
            case 1 :
                // /Library/WebServer/Documents/calc/Formula.g:0:0: NEWLINE
                this.match(this.input,NEWLINE,FormulaParser.FOLLOW_NEWLINE_in_synpred112_Formula2175); if (this.state.failed) return ;


                break;

            default :
                break loop145;
            }
        } while (true);

        this.match(this.input,COLON,FormulaParser.FOLLOW_COLON_in_synpred112_Formula2178); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred112_Formula"

    // Delegated rules



    synpred95_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred95_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred94_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred94_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred80_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred80_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred49_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred49_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred57_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred57_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred68_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred68_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred51_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred51_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred62_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred62_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred64_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred64_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred93_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred93_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred55_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred55_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred85_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred85_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred87_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred87_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred48_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred48_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred86_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred86_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred9_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred9_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred75_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred75_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred96_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred96_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred47_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred47_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred8_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred8_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred112_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred112_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred6_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred6_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred5_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred5_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred60_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred60_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred61_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred61_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred108_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred108_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred11_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred11_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred78_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred78_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred88_Formula: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred88_Formula_fragment(); // can never throw exception
        } catch (re) {
            throw re;
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    }

}, true); // important to pass true to overwrite default implementations

org.antlr.lang.augmentObject(FormulaParser, {
    DFA5_eotS:
        "\u0017\uffff",
    DFA5_eofS:
        "\u0017\uffff",
    DFA5_minS:
        "\u0001\u0026\u0002\u0000\u0008\uffff\u0001\u0000\u0002\uffff\u0001"+
    "\u0000\u0008\uffff",
    DFA5_maxS:
        "\u0001\u0071\u0002\u0000\u0008\uffff\u0001\u0000\u0002\uffff\u0001"+
    "\u0000\u0008\uffff",
    DFA5_acceptS:
        "\u0003\uffff\u0001\u0002\u0009\uffff\u0001\u0003\u0001\uffff\u0001"+
    "\u0006\u0001\u0008\u0001\u0009\u0001\u000a\u0001\u0001\u0001\u0007\u0001"+
    "\u0004\u0001\u0005",
    DFA5_specialS:
        "\u0001\uffff\u0001\u0000\u0001\u0001\u0008\uffff\u0001\u0002\u0002"+
    "\uffff\u0001\u0003\u0008\uffff}>",
    DFA5_transitionS: [
            "\u0001\u000d\u0003\uffff\u0001\u000e\u000b\uffff\u0001\u000f"+
            "\u0005\uffff\u0001\u000b\u0002\uffff\u0001\u0010\u0001\u0003"+
            "\u0001\u0011\u0002\uffff\u0001\u0012\u0001\u0001\u0001\uffff"+
            "\u0001\u0002\u000a\uffff\u0001\u0003\u0005\uffff\u0002\u0003"+
            "\u0001\uffff\u0001\u0003\u0002\uffff\u0005\u0003\u000e\uffff"+
            "\u0001\u0003",
            "\u0001\uffff",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\uffff",
            "",
            "",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(FormulaParser, {
    DFA5_eot:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA5_eotS),
    DFA5_eof:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA5_eofS),
    DFA5_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA5_minS),
    DFA5_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA5_maxS),
    DFA5_accept:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA5_acceptS),
    DFA5_special:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA5_specialS),
    DFA5_transition: (function() {
        var a = [],
            i,
            numStates = FormulaParser.DFA5_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA5_transitionS[i]));
        }
        return a;
    })()
});

FormulaParser.DFA5 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 5;
    this.eot = FormulaParser.DFA5_eot;
    this.eof = FormulaParser.DFA5_eof;
    this.min = FormulaParser.DFA5_min;
    this.max = FormulaParser.DFA5_max;
    this.accept = FormulaParser.DFA5_accept;
    this.special = FormulaParser.DFA5_special;
    this.transition = FormulaParser.DFA5_transition;
};

org.antlr.lang.extend(FormulaParser.DFA5, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "120:1: expression : ( assignment | logicalExpression | whileLoop | forLoop | forInLoop | ifThenElse | functionDef | returnExp | tryCatch | throwExp );";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA5_1 = input.LA(1);

                             
                            var index5_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred5_Formula()) ) {s = 19;}

                            else if ( (this.synpred6_Formula()) ) {s = 3;}

                             
                            input.seek(index5_1);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA5_2 = input.LA(1);

                             
                            var index5_2 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred5_Formula()) ) {s = 19;}

                            else if ( (this.synpred6_Formula()) ) {s = 3;}

                             
                            input.seek(index5_2);
                            if ( s>=0 ) return s;
                            break;
                        case 2 : 
                            var LA5_11 = input.LA(1);

                             
                            var index5_11 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred6_Formula()) ) {s = 3;}

                            else if ( (this.synpred11_Formula()) ) {s = 20;}

                             
                            input.seek(index5_11);
                            if ( s>=0 ) return s;
                            break;
                        case 3 : 
                            var LA5_14 = input.LA(1);

                             
                            var index5_14 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred8_Formula()) ) {s = 21;}

                            else if ( (this.synpred9_Formula()) ) {s = 22;}

                             
                            input.seek(index5_14);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 5, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(FormulaParser, {
    DFA57_eotS:
        "\u000b\uffff",
    DFA57_eofS:
        "\u000b\uffff",
    DFA57_minS:
        "\u0001\u003c\u0003\uffff\u0001\u0000\u0006\uffff",
    DFA57_maxS:
        "\u0001\u0062\u0003\uffff\u0001\u0000\u0006\uffff",
    DFA57_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\uffff\u0001"+
    "\u0005\u0001\u0006\u0001\u0007\u0001\u0008\u0001\u0009\u0001\u0004",
    DFA57_specialS:
        "\u0004\uffff\u0001\u0000\u0006\uffff}>",
    DFA57_transitionS: [
            "\u0001\u0008\u0003\uffff\u0001\u0009\u0004\uffff\u0001\u0005"+
            "\u0001\uffff\u0001\u0006\u0011\uffff\u0001\u0007\u0001\uffff"+
            "\u0001\u0004\u0002\uffff\u0001\u0003\u0002\u0001\u0002\u0002",
            "",
            "",
            "",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(FormulaParser, {
    DFA57_eot:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA57_eotS),
    DFA57_eof:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA57_eofS),
    DFA57_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA57_minS),
    DFA57_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA57_maxS),
    DFA57_accept:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA57_acceptS),
    DFA57_special:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA57_specialS),
    DFA57_transition: (function() {
        var a = [],
            i,
            numStates = FormulaParser.DFA57_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA57_transitionS[i]));
        }
        return a;
    })()
});

FormulaParser.DFA57 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 57;
    this.eot = FormulaParser.DFA57_eot;
    this.eof = FormulaParser.DFA57_eof;
    this.min = FormulaParser.DFA57_min;
    this.max = FormulaParser.DFA57_max;
    this.accept = FormulaParser.DFA57_accept;
    this.special = FormulaParser.DFA57_special;
    this.transition = FormulaParser.DFA57_transition;
};

org.antlr.lang.extend(FormulaParser.DFA57, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "283:1: value : ( number | bool | string | material | IDENT | primitive | array | anonFunctionDef | newObject );";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA57_4 = input.LA(1);

                             
                            var index57_4 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred75_Formula()) ) {s = 10;}

                            else if ( (this.synpred78_Formula()) ) {s = 7;}

                             
                            input.seek(index57_4);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 57, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(FormulaParser, {
    DFA58_eotS:
        "\u001a\uffff",
    DFA58_eofS:
        "\u0001\u0002\u0019\uffff",
    DFA58_minS:
        "\u0001\u0020\u0001\u0000\u0018\uffff",
    DFA58_maxS:
        "\u0001\u0074\u0001\u0000\u0018\uffff",
    DFA58_acceptS:
        "\u0002\uffff\u0001\u0002\u0016\uffff\u0001\u0001",
    DFA58_specialS:
        "\u0001\uffff\u0001\u0000\u0018\uffff}>",
    DFA58_transitionS: [
            "\u0001\u0002\u000f\uffff\u0001\u0002\u0002\uffff\u0001\u0002"+
            "\u0003\uffff\u0001\u0002\u000d\uffff\u0002\u0002\u0001\uffff"+
            "\u0002\u0002\u0001\uffff\u000d\u0002\u0001\uffff\u0005\u0002"+
            "\u0001\uffff\u0001\u0002\u0011\uffff\u0001\u0001\u0001\u0002"+
            "\u0001\uffff\u0001\u0002",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(FormulaParser, {
    DFA58_eot:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA58_eotS),
    DFA58_eof:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA58_eofS),
    DFA58_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA58_minS),
    DFA58_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA58_maxS),
    DFA58_accept:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA58_acceptS),
    DFA58_special:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA58_specialS),
    DFA58_transition: (function() {
        var a = [],
            i,
            numStates = FormulaParser.DFA58_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA58_transitionS[i]));
        }
        return a;
    })()
});

FormulaParser.DFA58 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 58;
    this.eot = FormulaParser.DFA58_eot;
    this.eof = FormulaParser.DFA58_eof;
    this.min = FormulaParser.DFA58_min;
    this.max = FormulaParser.DFA58_max;
    this.accept = FormulaParser.DFA58_accept;
    this.special = FormulaParser.DFA58_special;
    this.transition = FormulaParser.DFA58_transition;
};

org.antlr.lang.extend(FormulaParser.DFA58, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "296:22: ( funCall )?";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA58_1 = input.LA(1);

                             
                            var index58_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred80_Formula()) ) {s = 25;}

                            else if ( ((( this.input.get(this.input.index()-1).getText()==" ")||( this.input.get(this.input.index()-1).getText()!=" "))) ) {s = 2;}

                             
                            input.seek(index58_1);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 58, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(FormulaParser, {
    DFA65_eotS:
        "\u0004\uffff",
    DFA65_eofS:
        "\u0004\uffff",
    DFA65_minS:
        "\u0001\u0020\u0001\uffff\u0001\u0020\u0001\uffff",
    DFA65_maxS:
        "\u0001\u0071\u0001\uffff\u0001\u0071\u0001\uffff",
    DFA65_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\uffff\u0001\u0002",
    DFA65_specialS:
        "\u0004\uffff}>",
    DFA65_transitionS: [
            "\u0001\u0002\u001b\uffff\u0001\u0001\u0003\uffff\u0001\u0001"+
            "\u0004\uffff\u0001\u0001\u0001\uffff\u0001\u0001\u000a\uffff"+
            "\u0002\u0001\u0004\uffff\u0002\u0001\u0001\u0003\u0001\u0001"+
            "\u0002\uffff\u0005\u0001\u000e\uffff\u0001\u0001",
            "",
            "\u0001\u0002\u001b\uffff\u0001\u0001\u0003\uffff\u0001\u0001"+
            "\u0004\uffff\u0001\u0001\u0001\uffff\u0001\u0001\u000a\uffff"+
            "\u0001\u0001\u0005\uffff\u0002\u0001\u0001\u0003\u0001\u0001"+
            "\u0002\uffff\u0005\u0001\u000e\uffff\u0001\u0001",
            ""
    ]
});

org.antlr.lang.augmentObject(FormulaParser, {
    DFA65_eot:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA65_eotS),
    DFA65_eof:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA65_eofS),
    DFA65_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA65_minS),
    DFA65_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA65_maxS),
    DFA65_accept:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA65_acceptS),
    DFA65_special:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA65_specialS),
    DFA65_transition: (function() {
        var a = [],
            i,
            numStates = FormulaParser.DFA65_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA65_transitionS[i]));
        }
        return a;
    })()
});

FormulaParser.DFA65 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 65;
    this.eot = FormulaParser.DFA65_eot;
    this.eof = FormulaParser.DFA65_eof;
    this.min = FormulaParser.DFA65_min;
    this.max = FormulaParser.DFA65_max;
    this.accept = FormulaParser.DFA65_accept;
    this.special = FormulaParser.DFA65_special;
    this.transition = FormulaParser.DFA65_transition;
};

org.antlr.lang.extend(FormulaParser.DFA65, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "309:16: ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )?";
    },
    dummy: null
});
org.antlr.lang.augmentObject(FormulaParser, {
    DFA72_eotS:
        "\u0004\uffff",
    DFA72_eofS:
        "\u0004\uffff",
    DFA72_minS:
        "\u0001\u0020\u0001\uffff\u0001\u0020\u0001\uffff",
    DFA72_maxS:
        "\u0001\u0071\u0001\uffff\u0001\u0071\u0001\uffff",
    DFA72_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\uffff\u0001\u0002",
    DFA72_specialS:
        "\u0004\uffff}>",
    DFA72_transitionS: [
            "\u0001\u0002\u001b\uffff\u0001\u0001\u0003\uffff\u0001\u0001"+
            "\u0004\uffff\u0001\u0001\u0001\uffff\u0001\u0001\u000a\uffff"+
            "\u0002\u0001\u0004\uffff\u0002\u0001\u0001\uffff\u0001\u0001"+
            "\u0001\u0003\u0001\uffff\u0005\u0001\u000e\uffff\u0001\u0001",
            "",
            "\u0001\u0002\u001b\uffff\u0001\u0001\u0003\uffff\u0001\u0001"+
            "\u0004\uffff\u0001\u0001\u0001\uffff\u0001\u0001\u000a\uffff"+
            "\u0001\u0001\u0005\uffff\u0002\u0001\u0001\uffff\u0001\u0001"+
            "\u0001\u0003\u0001\uffff\u0005\u0001\u000e\uffff\u0001\u0001",
            ""
    ]
});

org.antlr.lang.augmentObject(FormulaParser, {
    DFA72_eot:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA72_eotS),
    DFA72_eof:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA72_eofS),
    DFA72_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA72_minS),
    DFA72_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA72_maxS),
    DFA72_accept:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA72_acceptS),
    DFA72_special:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA72_specialS),
    DFA72_transition: (function() {
        var a = [],
            i,
            numStates = FormulaParser.DFA72_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA72_transitionS[i]));
        }
        return a;
    })()
});

FormulaParser.DFA72 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 72;
    this.eot = FormulaParser.DFA72_eot;
    this.eof = FormulaParser.DFA72_eof;
    this.min = FormulaParser.DFA72_min;
    this.max = FormulaParser.DFA72_max;
    this.accept = FormulaParser.DFA72_accept;
    this.special = FormulaParser.DFA72_special;
    this.transition = FormulaParser.DFA72_transition;
};

org.antlr.lang.extend(FormulaParser.DFA72, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "310:19: ( label ( NEWLINE )* ( ',' ( NEWLINE )* label ( NEWLINE )* )* )?";
    },
    dummy: null
});
org.antlr.lang.augmentObject(FormulaParser, {
    DFA85_eotS:
        "\u000f\uffff",
    DFA85_eofS:
        "\u000f\uffff",
    DFA85_minS:
        "\u0001\u0020\u0001\u0000\u0006\uffff\u0001\u0000\u0006\uffff",
    DFA85_maxS:
        "\u0001\u0071\u0001\u0000\u0006\uffff\u0001\u0000\u0006\uffff",
    DFA85_acceptS:
        "\u0002\uffff\u0001\u0002\u0007\uffff\u0001\u0001\u0004\uffff",
    DFA85_specialS:
        "\u0001\uffff\u0001\u0000\u0006\uffff\u0001\u0001\u0006\uffff}>",
    DFA85_transitionS: [
            "\u0001\u0002\u001b\uffff\u0001\u0002\u0003\uffff\u0001\u0002"+
            "\u0004\uffff\u0001\u0008\u0001\uffff\u0001\u0002\u000a\uffff"+
            "\u0001\u0002\u0001\u000a\u0004\uffff\u0002\u0002\u0001\uffff"+
            "\u0001\u0002\u0002\uffff\u0001\u0001\u0004\u0002\u000e\uffff"+
            "\u0001\u0002",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(FormulaParser, {
    DFA85_eot:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA85_eotS),
    DFA85_eof:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA85_eofS),
    DFA85_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA85_minS),
    DFA85_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(FormulaParser.DFA85_maxS),
    DFA85_accept:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA85_acceptS),
    DFA85_special:
        org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA85_specialS),
    DFA85_transition: (function() {
        var a = [],
            i,
            numStates = FormulaParser.DFA85_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(FormulaParser.DFA85_transitionS[i]));
        }
        return a;
    })()
});

FormulaParser.DFA85 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 85;
    this.eot = FormulaParser.DFA85_eot;
    this.eof = FormulaParser.DFA85_eof;
    this.min = FormulaParser.DFA85_min;
    this.max = FormulaParser.DFA85_max;
    this.accept = FormulaParser.DFA85_accept;
    this.special = FormulaParser.DFA85_special;
    this.transition = FormulaParser.DFA85_transition;
};

org.antlr.lang.extend(FormulaParser.DFA85, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "331:2: ( arrayName ( NEWLINE )* COLON )?";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA85_1 = input.LA(1);

                             
                            var index85_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred112_Formula()) ) {s = 10;}

                            else if ( (true) ) {s = 2;}

                             
                            input.seek(index85_1);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA85_8 = input.LA(1);

                             
                            var index85_8 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred112_Formula()) ) {s = 10;}

                            else if ( (true) ) {s = 2;}

                             
                            input.seek(index85_8);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 85, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
 

// public class variables
org.antlr.lang.augmentObject(FormulaParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "NEGATE", "ASSIGN", "FUNCALL", "MATERIAL", "UNIT", "POWER", "DEFAULTS", "PARAMS", "UNITCLUMP", "ARRAY", "LINES", "WHILE", "IFTHENELSE", "ELSE", "FOR", "FORIN", "FUNCTION", "ANONFUNCTION", "NUMBER", "LABEL", "RANGE", "INNER", "ASSIGNED", "SELECTOR", "DOTSELECTOR", "NEW", "TRYCATCH", "THROW", "NEWLINE", "W", "H", "I", "L", "E", "WHILESTATEMENT", "F", "O", "R", "FORSTATEMENT", "M", "FROMSTATEMENT", "N", "INSTATEMENT", "T", "TOSTATEMENT", "B", "Y", "BYSTATEMENT", "P", "LOOPSTATEMENT", "IFSTATEMENT", "THENSTATEMENT", "S", "ELSESTATEMENT", "U", "C", "FUNCTIONSTATEMENT", "D", "ENDBLOCK", "RETURNSTATEMENT", "NEWSTATEMENT", "TRYSTATEMENT", "A", "CATCHSTATEMENT", "THROWSTATEMENT", "IDENT", "EQUALS", "PRIMITIVE", "OR", "XOR", "X", "AND", "NOTEQUALS", "LT", "LTEQ", "GT", "GTEQ", "PLUS", "MINUS", "MULT", "DIV", "MOD", "COLON", "POW", "NOT", "LARR", "RARR", "LCURL", "RCURL", "COMMA", "STRING", "INTEGER", "FLOAT", "TRUE", "FALSE", "PER", "CUBED", "SQUARED", "Q", "LBRACKET", "RBRACKET", "COMMENT", "LINE_COMMENT", "WS", "G", "J", "K", "V", "Z", "'('", "')'", "'<-'", "'.'"],
    FOLLOW_NEWLINE_in_lines160: new org.antlr.runtime.BitSet([0x00000000, 0x90400441,0xCB0400B3, 0x00020007]),
    FOLLOW_expression_in_lines164: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_lines168: new org.antlr.runtime.BitSet([0x00000000, 0x90400441,0xCB0400B3, 0x00020007]),
    FOLLOW_EOF_in_lines171: new org.antlr.runtime.BitSet([0x00000000, 0x90400440,0xCB0400B3, 0x00020007]),
    FOLLOW_EOF_in_lines176: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_assignment_in_expression508: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_logicalExpression_in_expression514: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_whileLoop_in_expression520: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forLoop_in_expression526: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forInLoop_in_expression532: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ifThenElse_in_expression538: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_functionDef_in_expression544: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_returnExp_in_expression550: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_tryCatch_in_expression556: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_throwExp_in_expression562: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_RETURNSTATEMENT_in_returnExp574: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_returnExp577: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expression_in_innerBlock590: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_innerBlock594: new org.antlr.runtime.BitSet([0x00000002, 0x90400441,0xCB0400B3, 0x00020007]),
    FOLLOW_WHILESTATEMENT_in_whileLoop619: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_whileLoop621: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_whileLoop623: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_whileLoop626: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_whileLoop629: new org.antlr.runtime.BitSet([0x00000000, 0x00200000]),
    FOLLOW_LOOPSTATEMENT_in_whileLoop631: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FORSTATEMENT_in_forLoop652: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_forLoop654: new org.antlr.runtime.BitSet([0x00000000, 0x00001000]),
    FOLLOW_FROMSTATEMENT_in_forLoop656: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_forLoop658: new org.antlr.runtime.BitSet([0x00000000, 0x00010000]),
    FOLLOW_TOSTATEMENT_in_forLoop660: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_forLoop662: new org.antlr.runtime.BitSet([0x00000000, 0x00080001]),
    FOLLOW_BYSTATEMENT_in_forLoop665: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_forLoop667: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_forLoop671: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_forLoop674: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_forLoop677: new org.antlr.runtime.BitSet([0x00000000, 0x00200000]),
    FOLLOW_LOOPSTATEMENT_in_forLoop679: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FORSTATEMENT_in_forInLoop707: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_forInLoop709: new org.antlr.runtime.BitSet([0x00000000, 0x00004000]),
    FOLLOW_INSTATEMENT_in_forInLoop711: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_forInLoop713: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_forInLoop715: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_forInLoop718: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_forInLoop721: new org.antlr.runtime.BitSet([0x00000000, 0x00200000]),
    FOLLOW_LOOPSTATEMENT_in_forInLoop723: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IFSTATEMENT_in_ifThenElse748: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_ifThenElse750: new org.antlr.runtime.BitSet([0x00000000, 0x00800000]),
    FOLLOW_THENSTATEMENT_in_ifThenElse752: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_ifThenElse755: new org.antlr.runtime.BitSet([0x00000000, 0xD2400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_ifThenElse758: new org.antlr.runtime.BitSet([0x00000000, 0x42000000]),
    FOLLOW_ELSESTATEMENT_in_ifThenElse762: new org.antlr.runtime.BitSet([0x00000000, 0x00400000]),
    FOLLOW_IFSTATEMENT_in_ifThenElse764: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_ifThenElse766: new org.antlr.runtime.BitSet([0x00000000, 0x00800000]),
    FOLLOW_THENSTATEMENT_in_ifThenElse768: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_ifThenElse770: new org.antlr.runtime.BitSet([0x00000000, 0xD2400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_ifThenElse773: new org.antlr.runtime.BitSet([0x00000000, 0x42000000]),
    FOLLOW_ELSESTATEMENT_in_ifThenElse778: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_ifThenElse780: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_ifThenElse783: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_ifThenElse787: new org.antlr.runtime.BitSet([0x00000000, 0x00400000]),
    FOLLOW_IFSTATEMENT_in_ifThenElse789: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FUNCTIONSTATEMENT_in_functionDef820: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_functionDef822: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00020000]),
    FOLLOW_113_in_functionDef824: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00040000]),
    FOLLOW_IDENT_in_functionDef827: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000040, 0x00040000]),
    FOLLOW_EQUALS_in_functionDef831: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0xCA040000, 0x00000007]),
    FOLLOW_defaultValue_in_functionDef834: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_functionDef839: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_functionDef841: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_functionDef848: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_functionDef850: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_EQUALS_in_functionDef852: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0xCA040000, 0x00000007]),
    FOLLOW_defaultValue_in_functionDef854: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_114_in_functionDef861: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_functionDef863: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_functionDef866: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_functionDef869: new org.antlr.runtime.BitSet([0x00000000, 0x10000000]),
    FOLLOW_FUNCTIONSTATEMENT_in_functionDef871: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_TRYSTATEMENT_in_tryCatch904: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_tryCatch906: new org.antlr.runtime.BitSet([0x00000000, 0x90400441,0xCB0400BB, 0x00020007]),
    FOLLOW_innerBlock_in_tryCatch909: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000008, 0x00000000]),
    FOLLOW_CATCHSTATEMENT_in_tryCatch911: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_tryCatch913: new org.antlr.runtime.BitSet([0x00000000, 0x00000001]),
    FOLLOW_NEWLINE_in_tryCatch915: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_tryCatch919: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_tryCatch921: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_TRYSTATEMENT_in_tryCatch923: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_THROWSTATEMENT_in_throwExp945: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_primaryExpression_in_throwExp947: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FUNCTIONSTATEMENT_in_anonFunctionDef967: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00020000]),
    FOLLOW_113_in_anonFunctionDef970: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00040000]),
    FOLLOW_IDENT_in_anonFunctionDef973: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000040, 0x00040000]),
    FOLLOW_EQUALS_in_anonFunctionDef977: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0xCA040000, 0x00000007]),
    FOLLOW_defaultValue_in_anonFunctionDef980: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_anonFunctionDef985: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_anonFunctionDef987: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_anonFunctionDef994: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_anonFunctionDef996: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_EQUALS_in_anonFunctionDef998: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0xCA040000, 0x00000007]),
    FOLLOW_defaultValue_in_anonFunctionDef1000: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_114_in_anonFunctionDef1007: new org.antlr.runtime.BitSet([0x00000000, 0x90400441,0xCB0400B3, 0x00020007]),
    FOLLOW_NEWLINE_in_anonFunctionDef1012: new org.antlr.runtime.BitSet([0x00000000, 0xD0400441,0xCB0400B3, 0x00020007]),
    FOLLOW_innerBlock_in_anonFunctionDef1015: new org.antlr.runtime.BitSet([0x00000000, 0x40000000]),
    FOLLOW_ENDBLOCK_in_anonFunctionDef1018: new org.antlr.runtime.BitSet([0x00000000, 0x10000000]),
    FOLLOW_FUNCTIONSTATEMENT_in_anonFunctionDef1020: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expression_in_anonFunctionDef1025: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IDENT_in_assignment1067: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00020000]),
    FOLLOW_113_in_assignment1069: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00040000]),
    FOLLOW_IDENT_in_assignment1072: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000040, 0x00040000]),
    FOLLOW_EQUALS_in_assignment1076: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0xCA040000, 0x00000007]),
    FOLLOW_defaultValue_in_assignment1078: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_assignment1083: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_assignment1085: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_assignment1092: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_assignment1094: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_EQUALS_in_assignment1096: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0xCA040000, 0x00000007]),
    FOLLOW_defaultValue_in_assignment1098: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_114_in_assignment1105: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_assignment1107: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_assignment1109: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_PRIMITIVE_in_assignment1137: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00080000]),
    FOLLOW_assigned_in_assignment1141: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00080000]),
    FOLLOW_COMMA_in_assignment1145: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000A0, 0x00000000]),
    FOLLOW_PRIMITIVE_in_assignment1148: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00080000]),
    FOLLOW_assigned_in_assignment1152: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00080000]),
    FOLLOW_115_in_assignment1158: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_assignment1160: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IDENT_in_assigned1186: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0A000000, 0x00100000]),
    FOLLOW_selector_in_assigned1188: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_booleanXORExpression_in_logicalExpression1214: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000100, 0x00000000]),
    FOLLOW_OR_in_logicalExpression1217: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_booleanXORExpression_in_logicalExpression1220: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000100, 0x00000000]),
    FOLLOW_booleanAndExpression_in_booleanXORExpression1250: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000200, 0x00000000]),
    FOLLOW_XOR_in_booleanXORExpression1253: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_booleanAndExpression_in_booleanXORExpression1256: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000200, 0x00000000]),
    FOLLOW_equalityExpression_in_booleanAndExpression1285: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000800, 0x00000000]),
    FOLLOW_AND_in_booleanAndExpression1288: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_equalityExpression_in_booleanAndExpression1291: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000800, 0x00000000]),
    FOLLOW_relationalExpression_in_equalityExpression1322: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00001040, 0x00000000]),
    FOLLOW_set_in_equalityExpression1325: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_relationalExpression_in_equalityExpression1332: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00001040, 0x00000000]),
    FOLLOW_additiveExpression_in_relationalExpression1374: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0001E000, 0x00000000]),
    FOLLOW_set_in_relationalExpression1378: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_additiveExpression_in_relationalExpression1389: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0001E000, 0x00000000]),
    FOLLOW_multiplicativeExpression_in_additiveExpression1432: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00060000, 0x00000000]),
    FOLLOW_set_in_additiveExpression1436: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_multiplicativeExpression_in_additiveExpression1443: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00060000, 0x00000000]),
    FOLLOW_arrayExpression_in_multiplicativeExpression1473: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00380000, 0x00000000]),
    FOLLOW_set_in_multiplicativeExpression1477: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_arrayExpression_in_multiplicativeExpression1486: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00380000, 0x00000000]),
    FOLLOW_negationExpression_in_arrayExpression1532: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00400000, 0x00000000]),
    FOLLOW_COLON_in_arrayExpression1538: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_negationExpression_in_arrayExpression1542: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00400000, 0x00000000]),
    FOLLOW_COLON_in_arrayExpression1551: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_negationExpression_in_arrayExpression1555: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_MINUS_in_negationExpression1580: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_powerExpression_in_negationExpression1582: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_powerExpression_in_negationExpression1596: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_unaryExpression_in_powerExpression1607: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00800000, 0x00000000]),
    FOLLOW_POW_in_powerExpression1610: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_unaryOrNegate_in_powerExpression1612: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00800000, 0x00000000]),
    FOLLOW_unaryExpression_in_unaryOrNegate1639: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_MINUS_in_unaryOrNegate1645: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_unaryExpression_in_unaryOrNegate1647: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NOT_in_unaryExpression1675: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_innerPrimaryExpression_in_unaryExpression1678: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_innerPrimaryExpression_in_unaryExpression1687: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_selectionExpression_in_innerPrimaryExpression1718: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_primaryExpression_in_selectionExpression1738: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0A000000, 0x00120000]),
    FOLLOW_selector_in_selectionExpression1744: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0A000000, 0x00120000]),
    FOLLOW_funCall_in_selectionExpression1746: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0A000000, 0x00120000]),
    FOLLOW_113_in_funCall1761: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00060007]),
    FOLLOW_logicalExpression_in_funCall1765: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_COMMA_in_funCall1768: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_funCall1770: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x20000000, 0x00040000]),
    FOLLOW_114_in_funCall1777: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_113_in_primaryExpression1798: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_primaryExpression1801: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_primaryExpression1803: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_value_in_primaryExpression1809: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_number_in_value1823: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_bool_in_value1829: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_string_in_value1835: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_material_in_value1841: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IDENT_in_value1846: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_primitive_in_value1851: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_array_in_value1856: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_anonFunctionDef_in_value1861: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_newObject_in_value1866: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWSTATEMENT_in_newObject1876: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_newObject1878: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0A000000, 0x00120000]),
    FOLLOW_funCall_in_newObject1880: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_negnumber_in_defaultValue1906: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_number_in_defaultValue1912: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_bool_in_defaultValue1918: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_string_in_defaultValue1924: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_array_in_defaultValue1930: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LARR_in_array1944: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCF0C00A1, 0x00020007]),
    FOLLOW_NEWLINE_in_array1946: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCF0C00A1, 0x00020007]),
    FOLLOW_label_in_array1950: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x24000000, 0x00000000]),
    FOLLOW_NEWLINE_in_array1952: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x24000000, 0x00000000]),
    FOLLOW_COMMA_in_array1956: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCB0C00A1, 0x00020007]),
    FOLLOW_NEWLINE_in_array1958: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCB0C00A1, 0x00020007]),
    FOLLOW_label_in_array1961: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x24000000, 0x00000000]),
    FOLLOW_NEWLINE_in_array1963: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x24000000, 0x00000000]),
    FOLLOW_NEWLINE_in_array1970: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x04000000, 0x00000000]),
    FOLLOW_RARR_in_array1973: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LCURL_in_array1987: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xDB0C00A1, 0x00020007]),
    FOLLOW_NEWLINE_in_array1989: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xDB0C00A1, 0x00020007]),
    FOLLOW_label_in_array1993: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x30000000, 0x00000000]),
    FOLLOW_NEWLINE_in_array1995: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x30000000, 0x00000000]),
    FOLLOW_COMMA_in_array1998: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCB0C00A1, 0x00020007]),
    FOLLOW_NEWLINE_in_array2000: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCB0C00A1, 0x00020007]),
    FOLLOW_label_in_array2003: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x30000000, 0x00000000]),
    FOLLOW_NEWLINE_in_array2005: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x30000000, 0x00000000]),
    FOLLOW_NEWLINE_in_array2012: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x10000000, 0x00000000]),
    FOLLOW_RCURL_in_array2015: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_minarray_in_selector2036: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_dotselector_in_selector2040: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LARR_in_minarray2067: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0C00A1, 0x00020007]),
    FOLLOW_logicalExpression_in_minarray2072: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x24000000, 0x00000000]),
    FOLLOW_MULT_in_minarray2074: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x24000000, 0x00000000]),
    FOLLOW_COMMA_in_minarray2078: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0C00A1, 0x00020007]),
    FOLLOW_logicalExpression_in_minarray2082: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x24000000, 0x00000000]),
    FOLLOW_MULT_in_minarray2084: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x24000000, 0x00000000]),
    FOLLOW_RARR_in_minarray2091: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LCURL_in_minarray2097: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0C00A1, 0x00020007]),
    FOLLOW_logicalExpression_in_minarray2102: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x30000000, 0x00000000]),
    FOLLOW_MULT_in_minarray2104: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x30000000, 0x00000000]),
    FOLLOW_COMMA_in_minarray2108: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0C00A1, 0x00020007]),
    FOLLOW_logicalExpression_in_minarray2112: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x30000000, 0x00000000]),
    FOLLOW_MULT_in_minarray2114: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x30000000, 0x00000000]),
    FOLLOW_RCURL_in_minarray2121: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_dotselector2133: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x40080020, 0x00000000]),
    FOLLOW_arrayName_in_dotselector2135: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00100000]),
    FOLLOW_set_in_arrayName0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_arrayName_in_label2173: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x00400000, 0x00000000]),
    FOLLOW_NEWLINE_in_label2175: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x00400000, 0x00000000]),
    FOLLOW_COLON_in_label2178: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCB0400A1, 0x00020007]),
    FOLLOW_NEWLINE_in_label2182: new org.antlr.runtime.BitSet([0x00000000, 0x10000001,0xCB0400A1, 0x00020007]),
    FOLLOW_logicalExpression_in_label2185: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_number0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_MINUS_in_negnumber2261: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000000, 0x00000001]),
    FOLLOW_number_in_negnumber2263: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_bool0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LCURL_in_material2415: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_additiveExpression_in_material2417: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000020, 0x00020000]),
    FOLLOW_unitMultiplicativeExpression_in_material2421: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x10000000, 0x00000000]),
    FOLLOW_RCURL_in_material2423: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_unitInnerMultiplicativeExpression_in_unitMultiplicativeExpression2460: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000008]),
    FOLLOW_PER_in_unitMultiplicativeExpression2464: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000020, 0x00020000]),
    FOLLOW_unitInnerMultiplicativeExpression_in_unitMultiplicativeExpression2467: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000008]),
    FOLLOW_unitClump_in_unitInnerMultiplicativeExpression2483: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00180000, 0x00000000]),
    FOLLOW_set_in_unitInnerMultiplicativeExpression2487: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000020, 0x00020000]),
    FOLLOW_unitClump_in_unitInnerMultiplicativeExpression2494: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00180000, 0x00000000]),
    FOLLOW_INTEGER_in_unitClump2510: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00100000, 0x00000000]),
    FOLLOW_DIV_in_unitClump2512: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000020, 0x00020000]),
    FOLLOW_unitPowerExpression_in_unitClump2515: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000030]),
    FOLLOW_CUBED_in_unitClump2517: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000020]),
    FOLLOW_SQUARED_in_unitClump2520: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_unitPowerExpression_in_unitClump2543: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000030]),
    FOLLOW_CUBED_in_unitClump2545: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000020]),
    FOLLOW_SQUARED_in_unitClump2548: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_unit_in_unitPowerExpression2610: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00800000, 0x00000000]),
    FOLLOW_POW_in_unitPowerExpression2614: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80040000, 0x00000001]),
    FOLLOW_MINUS_in_unitPowerExpression2617: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000000, 0x00000001]),
    FOLLOW_set_in_unitPowerExpression2620: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00800000, 0x00000000]),
    FOLLOW_IDENT_in_unit2638: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_IDENT_in_unit2641: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_113_in_unit2658: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x80000020, 0x00020000]),
    FOLLOW_unitMultiplicativeExpression_in_unit2660: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_unit2662: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_PRIMITIVE_in_primitive2731: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_STRING_in_string3200: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_assignment_in_synpred5_Formula508: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_logicalExpression_in_synpred6_Formula514: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forLoop_in_synpred8_Formula526: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forInLoop_in_synpred9_Formula532: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_functionDef_in_synpred11_Formula544: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_OR_in_synpred47_Formula1217: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_booleanXORExpression_in_synpred47_Formula1220: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_XOR_in_synpred48_Formula1253: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_booleanAndExpression_in_synpred48_Formula1256: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_AND_in_synpred49_Formula1288: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_equalityExpression_in_synpred49_Formula1291: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred51_Formula1325: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_relationalExpression_in_synpred51_Formula1332: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred55_Formula1378: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_additiveExpression_in_synpred55_Formula1389: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred57_Formula1436: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_multiplicativeExpression_in_synpred57_Formula1443: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred60_Formula1477: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_arrayExpression_in_synpred60_Formula1486: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_COLON_in_synpred61_Formula1538: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_negationExpression_in_synpred61_Formula1542: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_COLON_in_synpred62_Formula1551: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_negationExpression_in_synpred62_Formula1555: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POW_in_synpred64_Formula1610: new org.antlr.runtime.BitSet([0x00000000, 0x10000000,0xCB0400A1, 0x00020007]),
    FOLLOW_unaryOrNegate_in_synpred64_Formula1612: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_selector_in_synpred68_Formula1744: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_funCall_in_synpred68_Formula1746: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_material_in_synpred75_Formula1841: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_array_in_synpred78_Formula1856: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_funCall_in_synpred80_Formula1880: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred85_Formula1946: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred86_Formula1952: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred87_Formula1958: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred88_Formula1963: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred93_Formula1989: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred94_Formula1995: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred95_Formula2000: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred96_Formula2005: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred108_Formula2133: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x40080020, 0x00000000]),
    FOLLOW_arrayName_in_synpred108_Formula2135: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_arrayName_in_synpred112_Formula2173: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x00400000, 0x00000000]),
    FOLLOW_NEWLINE_in_synpred112_Formula2175: new org.antlr.runtime.BitSet([0x00000000, 0x00000001,0x00400000, 0x00000000]),
    FOLLOW_COLON_in_synpred112_Formula2178: new org.antlr.runtime.BitSet([0x00000002, 0x00000000])
});

})();