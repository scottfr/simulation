// Building: java -jar antlr-4.13.jar -no-visitor -no-listener Formula.g && sed -i '' '1,/\/\/
// @ts-nocheck/{/\/\/ @ts-nocheck/!d;}' ./FormulaLexer.js && sed -i '' '1,/\/\/ @ts-nocheck/{/\/\/
// @ts-nocheck/!d;}' FormulaParser.js; rm -Rf .antlr

grammar Formula;
options
{
	language = JavaScript;
	caseInsensitive = true;
}

@header {
// @ts-nocheck
/* eslint-disable */


import antlr4 from "../../../vendor/antlr4-all.js";
}

COMMENT: R_? '/*' (.)*? '*/' R_? -> skip;

LINE_COMMENT: R_? ('//' | '#') (~('\n' | '\r'))* R_? -> skip;

R__: SPACE* (NEWLINES SPACE*)+;

R_: SPACE+;

// Optional whitespace contains newlines: ((R__ | R_)*) Optional whitespace does not contain
// newlines: ((R_)*) Note that using parser rules for these slows things down 5% or so

NEWLINES: '\n' | '\r';

lines: ((R__ | R_)*) (
		expression (R__+ expression)* ((R__ | R_)*)
	)? EOF;

WHILESTATEMENT: 'while';

FORSTATEMENT: 'for';

FROMSTATEMENT: 'from';

INSTATEMENT: 'in';

TOSTATEMENT: 'to';

BYSTATEMENT: 'by';

LOOPSTATEMENT: 'loop';

IFSTATEMENT: 'if';

THENSTATEMENT: 'then';

ELSESTATEMENT: 'else';

FUNCTIONSTATEMENT: 'function';

ENDBLOCK: 'end';

RETURNSTATEMENT: 'return';

NEWSTATEMENT: 'new';

TRYSTATEMENT: 'try';

CATCHSTATEMENT: 'catch';

THROWSTATEMENT: 'throw';

expression:
	assignment
	| logicalExpression
	| whileLoop
	| forLoop
	| forInLoop
	| ifThenElse
	| functionDef
	| returnExp
	| tryCatch
	| throwExp;

returnExp: RETURNSTATEMENT (R_*) logicalExpression;

innerBlock: ((R__ | R_)*) (
		expression (R__+ expression)* ((R__ | R_)*)
	)?;

whileLoop:
	WHILESTATEMENT (R_*) logicalExpression (R__ innerBlock) R__ ENDBLOCK R_ LOOPSTATEMENT;

forLoop:
	FORSTATEMENT R_ IDENT R_ FROMSTATEMENT (R_*) logicalExpression (
		R_*
	) TOSTATEMENT (R_*) logicalExpression (
		(R_*) BYSTATEMENT (R_*) logicalExpression
	)? (R__ innerBlock)? R__ ENDBLOCK R_ LOOPSTATEMENT;

forInLoop:
	FORSTATEMENT R_ IDENT R_ INSTATEMENT (R_*) logicalExpression (
		R__ innerBlock
	)? R__ ENDBLOCK R_ LOOPSTATEMENT;

ifThenElse:
	IFSTATEMENT (R_*) logicalExpression ((R__ | R_)*) THENSTATEMENT? (
		R__ innerBlock
	)? (
		R__ ELSESTATEMENT R_ IFSTATEMENT (R_*) logicalExpression (
			(R__ | R_)*
		) THENSTATEMENT? (R__ innerBlock)?
	)* (R__ ELSESTATEMENT (R__ innerBlock)?)? R__ ENDBLOCK R_ IFSTATEMENT;

functionDef:
	FUNCTIONSTATEMENT R_ IDENT (R_*) '(' (
		(R_*) IDENT (
			(R_*) EQUALS (R_*) defaultValue
			| ((R_*) ',' (R_*) IDENT)*
		) ((R_*) ',' (R_*) IDENT (R_*) EQUALS (R_*) defaultValue)*
	)? (R_*) ')' (R__ innerBlock)? R__ ENDBLOCK R_ FUNCTIONSTATEMENT;

tryCatch:
	TRYSTATEMENT (R__ innerBlock)? R__ CATCHSTATEMENT R_ IDENT (
		R__ innerBlock
	)? R__ ENDBLOCK R_ TRYSTATEMENT;

throwExp: THROWSTATEMENT R_ primaryExpression;

anonFunctionDef:
	FUNCTIONSTATEMENT (R_*) '(' (
		(R_*) IDENT (
			(R_*) EQUALS (R_*) defaultValue
			| ( (R_*) ',' (R_*) IDENT)*
		) ((R_*) ',' (R_*) IDENT (R_*) EQUALS (R_*) defaultValue)*
	)? (R_*) ')' (
		((R__ innerBlock)? R__ ENDBLOCK R_ FUNCTIONSTATEMENT)
		| (R_*) expression
	);

assignment:
	IDENT (R_*) '(' (
		(R_*) IDENT (
			(R_*) EQUALS (R_*) defaultValue
			| ((R_*) ',' (R_*) IDENT)*
		) (',' (R_*) IDENT (R_*) EQUALS (R_*) defaultValue)*
	)? (R_*) ')' (R_*) '<-' (R_*) logicalExpression
	| (PRIMITIVE | assigned) (
		(R_*) ',' (R_*) (PRIMITIVE | assigned)
	)* (R_*) '<-' (R_*) logicalExpression;

assigned: IDENT selector?;

logicalExpression:
	booleanXORExpression ((R_*) OR (R_*) booleanXORExpression)*;

OR: '||' | 'or';

booleanXORExpression:
	booleanAndExpression ((R_*) XOR (R_*) booleanAndExpression)*;

XOR: 'xor';

booleanAndExpression:
	equalityExpression ((R_*) AND (R_*) equalityExpression)*;

AND: '&&' | 'and';

equalityExpression:
	relationalExpression (
		(R_*) (EQUALS | NOTEQUALS) (R_*) relationalExpression
	)*;

EQUALS: '=' | '==';

NOTEQUALS: '!=' | '<>';

relationalExpression:
	additiveExpression (
		(R_*) (LT | LTEQ | GT | GTEQ) (R_*) additiveExpression
	)*;

LT: '<';
LTEQ: '<=';
GT: '>';
GTEQ: '>=';

additiveExpression:
	multiplicativeExpression (
		(R_*) (PLUS | MINUS) (R_*) multiplicativeExpression
	)*;

PLUS: '+';
MINUS: '-';

multiplicativeExpression:
	arrayExpression (
		(R_*) (MULT | DIV | MOD) (R_*) arrayExpression
	)*;

MULT: '*';
DIV: '/';
MOD: '%' | 'mod';

arrayExpression:
	negationExpression (':' negationExpression)? (
		':' negationExpression
	)?;

negationExpression:
	MINUS (R_*) powerExpression
	| powerExpression;

powerExpression:
	unaryExpression ((R_*) POW (R_*) unaryOrNegate)*;

unaryOrNegate: MINUS (R_*) unaryExpression | unaryExpression;

POW: '^';

unaryExpression:
	('!' | 'not') (R_*) innerPrimaryExpression
	| innerPrimaryExpression;

innerPrimaryExpression: selectionExpression;

selectionExpression: primaryExpression ( selector | funCall)*;

funCall:
	'(' (
		(R_*) logicalExpression (
			(R_*) ',' (R_*) logicalExpression
		)*
	)? (R_*) ')';

primaryExpression:
	'(' ((R__ | R_)*) logicalExpression ((R__ | R_)*) ')'
	| value;

value:
	number
	| BOOL
	| string
	| material
	| IDENT
	| PRIMITIVE
	| array
	| anonFunctionDef
	| newObject;

material:
	LCURL (R_*) additiveExpression R_ unitMultiplicativeExpression (
		R_*
	) RCURL;

array:
	LARR (
		((R__ | R_)*) label (
			((R__ | R_)*) ',' ((R__ | R_)*) label
		)*
	)? ((R__ | R_)*) RARR
	| LCURL (
		((R__ | R_)*) label (
			((R__ | R_)*) ',' ((R__ | R_)*) label
		)*
	)? ((R__ | R_)*) RCURL
	| LARR (
		((R__ | R_)*) logicalExpression (
			((R__ | R_)*) ',' ((R__ | R_)*) logicalExpression
		)*
	)? ((R__ | R_)*) RARR
	| LCURL (
		((R__ | R_)*) logicalExpression (
			((R__ | R_)*) ',' ((R__ | R_)*) logicalExpression
		)*
	)? ((R__ | R_)*) RCURL;

newObject: NEWSTATEMENT R_ IDENT funCall?;

defaultValue: negnumber | number | BOOL | string | array;

selector: (minarray | dotselector);

minarray:
	LARR (R_*) (logicalExpression | MULT) (
		(R_*) ',' (R_*) (logicalExpression | MULT)
	)* (R_*) RARR
	| LCURL (R_*) (logicalExpression | MULT) (
		(R_*) ',' (R_*) (logicalExpression | MULT)
	)* (R_*) RCURL;

dotselector: ('.' arrayName)+;

arrayName: IDENT | STRING | MULT;

label:
	arrayName ((R__ | R_)*) ':' ((R__ | R_)*) logicalExpression;

LARR: '\u00AB' | '<<';
RARR: '\u00BB' | '>>';

LCURL: '{';
RCURL: '}';

number: INTEGER | FLOAT;

negnumber: '-' number;

INTEGER: ('0' ..'9')+ ('e' ('+' | '-')? ('0' ..'9')*)?;

FLOAT: (('0' ..'9')* '.' ('0' ..'9')+ | ('0' ..'9')+ '.') (
		'e' ('+' | '-')? ('0' ..'9')*
	)?;

BOOL: 'true' | 'false';

PER: 'per';

unitMultiplicativeExpression:
	unitInnerMultiplicativeExpression (
		R_ PER R_ unitInnerMultiplicativeExpression
	)*;

unitInnerMultiplicativeExpression:
	unitClump ((R_*) (MULT | DIV) (R_*) unitClump)*;

unitClump: (INTEGER (R_*) DIV) (R_*) unitPowerExpression (
		R_ CUBED
	)? (R_ SQUARED)?
	| unitPowerExpression (R_ CUBED)? (R_ SQUARED)?;
SQUARED: 'squared';
CUBED: 'cubed';
unitPowerExpression:
	unit ((R_*) POW ((R_*) MINUS)? (R_*) (INTEGER | FLOAT))*;

unit:
	IDENT (R_ IDENT)*
	| '(' (R_*) unitMultiplicativeExpression (R_*) ')';

IDENT: [\p{L}] [\p{L}\p{N}_]*;

PRIMITIVE:
	LBRACKET (~('[' | ']'))+? RBRACKET
	| LBRACKET LBRACKET (~('[' | ']'))+? RBRACKET RBRACKET;

LBRACKET: '[';

RBRACKET: ']';

SPACE: (' ' | '\t' | '\u000C');

string: STRING;

STRING: '\'' .*? '\'' | '"' ('\\"' | ~'"')* '"';