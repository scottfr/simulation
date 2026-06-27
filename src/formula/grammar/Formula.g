// Building:
/*
rm -f FormulaParser.ts FormulaParser.js FormulaLexer.ts FormulaLexer.js && \
antlr-ng -Dlanguage=TypeScript -v false -l false Formula.g && \
for f in FormulaParser FormulaLexer; do
  npx tsc "$f.ts" --noResolve --noCheck --module esnext --target esnext &&
  sed -i '' $'1s|^|// eslint-disable\\\n// @ts-nocheck\\\n\\\n|' "$f.js" &&
  sed -i '' 's|antlr4ng|../../../vendor/antlr4ng-all.js|g' "$f.js"
done; \
rm -Rf .antlr
*/
grammar Formula;
options
{
	language = JavaScript;
	caseInsensitive = true;
}

COMMENT: R_? '/*' .*? '*/' R_? -> channel(HIDDEN);

LINE_COMMENT: R_? ('//' | '#') ~[\r\n]* R_? -> channel(HIDDEN);

fragment SPACE: (' ' | '\t' | '\u000C');

R__: SPACE* (NEWLINES SPACE*)+;

R_: SPACE+;

// Optional whitespace contains newlines: ((R__ | R_)*) Optional whitespace does not contain
// newlines: ((R_)*) Note that using parser rules for these slows things down 5% or so

NEWLINES: '\n' | '\r';

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

ENDPREFIX: 'end' SPACE+;

ENDBLOCK: 'end';

RETURNSTATEMENT: 'return';

NEWSTATEMENT: 'new';

TRYSTATEMENT: 'try';

CATCHSTATEMENT: 'catch';

THROWSTATEMENT: 'throw';

LPAREN: '(';
COMMA: ',';
RPAREN: ')';
ASSIGN: '<-';
DOT: '.';
COLON: ':';

OR: '||' | 'or';
XOR: 'xor';
AND: '&&' | 'and';

EQUALS: '=' | '==';
NOTEQUALS: '!=' | '<>';

LT: '<';
LTEQ: '<=';
GT: '>';
GTEQ: '>=';

PLUS: '+';
MINUS: '-';

MULT: '*';
DIV: '/';
MOD: '%' | 'mod';

POW: '^';

NOT: '!' | 'not';

LARR: '\u00AB' | '<<';
RARR: '\u00BB' | '>>';

LCURL: '{';
RCURL: '}';

BOOL: 'true' | 'false';

PER: 'per';
SQUARED: 'squared';
CUBED: 'cubed';

LBRACKET: '[';
RBRACKET: ']';

IDENT: [\p{L}] [\p{L}\p{N}_]*;

PRIMITIVE:
	LBRACKET (~('[' | ']'))+? RBRACKET
	| LBRACKET LBRACKET (~('[' | ']'))+? RBRACKET RBRACKET;

INTEGER: ('0' ..'9')+ ('e' ('+' | '-')? ('0' ..'9')*)?;

FLOAT: (('0' ..'9')* '.' ('0' ..'9')+ | ('0' ..'9')+ '.') (
		'e' ('+' | '-')? ('0' ..'9')*
	)?;


STRING: '\'' .*? '\'' | '"' ('\\"' | ~'"')* '"';

lines: ((R__ | R_)*) (
		expression (R__+ expression)* ((R__ | R_)*)
	)? EOF;

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
	WHILESTATEMENT (R_*) logicalExpression (R__ innerBlock) R__ ENDPREFIX LOOPSTATEMENT;

forLoop:
	FORSTATEMENT R_ IDENT R_ FROMSTATEMENT (R_*) logicalExpression (
		R_*
	) TOSTATEMENT (R_*) logicalExpression (
		(R_*) BYSTATEMENT (R_*) logicalExpression
	)? (R__ innerBlock)? R__ ENDPREFIX LOOPSTATEMENT;

forInLoop:
	FORSTATEMENT R_ IDENT R_ INSTATEMENT (R_*) logicalExpression (
		R__ innerBlock
	)? R__ ENDPREFIX LOOPSTATEMENT;

ifThenElse:
	IFSTATEMENT (R_*) logicalExpression ((R__ | R_)*) THENSTATEMENT? (
		R__ innerBlock
	)? (
		R__ ELSESTATEMENT R_ IFSTATEMENT (R_*) logicalExpression (
			(R__ | R_)*
		) THENSTATEMENT? (R__ innerBlock)?
	)* (R__ ELSESTATEMENT (R__ innerBlock)?)? R__ ENDPREFIX IFSTATEMENT;

functionDef:
	FUNCTIONSTATEMENT R_ IDENT (R_*) LPAREN (
		(R_*) IDENT (
			(R_*) EQUALS (R_*) defaultValue
			| ((R_*) COMMA (R_*) IDENT)*
		) ((R_*) COMMA (R_*) IDENT (R_*) EQUALS (R_*) defaultValue)*
	)? (R_*) RPAREN (R__ innerBlock)? R__ ENDPREFIX FUNCTIONSTATEMENT;

tryCatch:
	TRYSTATEMENT (R__ innerBlock)? R__ CATCHSTATEMENT R_ IDENT (
		R__ innerBlock
	)? R__ ENDPREFIX TRYSTATEMENT;

throwExp: THROWSTATEMENT R_ primaryExpression;

anonFunctionDef:
	FUNCTIONSTATEMENT (R_*) LPAREN (
		(R_*) IDENT (
			(R_*) EQUALS (R_*) defaultValue
			| ((R_*) COMMA (R_*) IDENT)*
		) ((R_*) COMMA (R_*) IDENT (R_*) EQUALS (R_*) defaultValue)*
	)? (R_*) RPAREN (
		((R__ innerBlock)? R__ ENDPREFIX FUNCTIONSTATEMENT)
		| (R_*) expression
	);

assignment:
	IDENT (R_*) LPAREN (
		(R_*) IDENT (
			(R_*) EQUALS (R_*) defaultValue
			| ((R_*) COMMA (R_*) IDENT)*
		) ((R_*) COMMA (R_*) IDENT (R_*) EQUALS (R_*) defaultValue)*
	)? (R_*) RPAREN (R_*) ASSIGN (R_*) logicalExpression
	| (primitiveRef | assigned) (
		(R_*) COMMA (R_*) (primitiveRef | assigned)
	)* (R_*) ASSIGN (R_*) logicalExpression;

assigned: IDENT selector?;

logicalExpression:
	booleanXORExpression ((R_*) OR (R_*) booleanXORExpression)*;

booleanXORExpression:
	booleanAndExpression ((R_*) XOR (R_*) booleanAndExpression)*;

booleanAndExpression:
	equalityExpression ((R_*) AND (R_*) equalityExpression)*;

equalityExpression:
	relationalExpression (
		(R_*) (EQUALS | NOTEQUALS) (R_*) relationalExpression
	)*;

relationalExpression:
	additiveExpression (
		(R_*) (LT | LTEQ | GT | GTEQ) (R_*) additiveExpression
	)*;

additiveExpression:
	multiplicativeExpression (
		(R_*) (PLUS | MINUS) (R_*) multiplicativeExpression
	)*;

multiplicativeExpression:
	arrayExpression (
		(R_*) (MULT | DIV | MOD) (R_*) arrayExpression
	)*;

arrayExpression:
	negationExpression (COLON negationExpression)? (
		COLON negationExpression
	)?;

negationExpression:
	MINUS (R_*) powerExpression
	| powerExpression;

powerExpression:
	unaryExpression ((R_*) POW (R_*) unaryOrNegate)*;

unaryOrNegate: MINUS (R_*) unaryExpression | unaryExpression;

unaryExpression:
	NOT (R_*) innerPrimaryExpression
	| innerPrimaryExpression;

innerPrimaryExpression: selectionExpression;

selectionExpression: primaryExpression (selector | funCall)*;

funCall:
	LPAREN (
		(R_*) logicalExpression (
			(R_*) COMMA (R_*) logicalExpression
		)*
	)? (R_*) RPAREN;

primaryExpression:
	LPAREN ((R__ | R_)*) logicalExpression ((R__ | R_)*) RPAREN
	| value;

value:
	number
	| BOOL
	| string
	| material
	| symbolRef
	| primitiveRef
	| array
	| anonFunctionDef
	| newObject;

symbolRef: IDENT;

memberSymbolRef: IDENT | STRING | MULT;

primitiveRef: PRIMITIVE;

typeRef: IDENT;

material:
	LCURL (R_*) additiveExpression R_ unitMultiplicativeExpression (
		R_*
	) RCURL;

array:
	LARR (
		((R__ | R_)*) label (
			((R__ | R_)*) COMMA ((R__ | R_)*) label
		)*
	)? ((R__ | R_)*) RARR
	| LCURL (
		((R__ | R_)*) label (
			((R__ | R_)*) COMMA ((R__ | R_)*) label
		)*
	)? ((R__ | R_)*) RCURL
	| LARR (
		((R__ | R_)*) logicalExpression (
			((R__ | R_)*) COMMA ((R__ | R_)*) logicalExpression
		)*
	)? ((R__ | R_)*) RARR
	| LCURL (
		((R__ | R_)*) logicalExpression (
			((R__ | R_)*) COMMA ((R__ | R_)*) logicalExpression
		)*
	)? ((R__ | R_)*) RCURL;

newObject: NEWSTATEMENT R_ typeRef funCall?;

defaultValue: negnumber | number | BOOL | string | array;

selector: (minarray | dotselector);

minarray:
	LARR (R_*) (logicalExpression | MULT) (
		(R_*) COMMA (R_*) (logicalExpression | MULT)
	)* (R_*) RARR
	| LCURL (R_*) (logicalExpression | MULT) (
		(R_*) COMMA (R_*) (logicalExpression | MULT)
	)* (R_*) RCURL;

dotselector: (DOT memberSymbolRef)+;

arrayName: IDENT | STRING | MULT;

label:
	arrayName ((R__ | R_)*) COLON ((R__ | R_)*) logicalExpression;

number: INTEGER | FLOAT;

negnumber: MINUS number;

string: STRING;

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

unitPowerExpression:
	unit ((R_*) POW ((R_*) MINUS)? (R_*) (INTEGER | FLOAT))*;

unit:
	unitRef
	| LPAREN (R_*) unitMultiplicativeExpression (R_*) RPAREN;

unitRef: IDENT (R_ IDENT)*;
