import { Model } from "../../src/api/Model.js";
import { check, failure, testConfig } from "../TestUtilities.js";


test("Auto function vectorization", () => {
  let m = new Model();

  let variable = m.Variable({
    name: "Variable"
  });


  variable.value = "log(10)";
  let res = m.simulate();
  expect(res.value(variable)).toBe(1);


  variable.value = "log({10, 100})";
  res = m.simulate();
  expect(res.value(variable)).toStrictEqual([1, 2]);


  variable.value = "log(\"a\")";
  expect(() => m.simulate()).toThrow(/does not accept string/);


  variable.value = "log({\"a\"})";
  expect(() => m.simulate()).toThrow(/requires a number for the parameter/);


  variable.value = "log({true})";
  expect(() => m.simulate()).toThrow(/requires a number for the parameter/);


  variable.value = "log({false})";
  expect(() => m.simulate()).toThrow(/requires a number for the parameter/);


  variable.value = "log(true)";
  expect(() => m.simulate()).toThrow(/does not accept boolean/);
});


test("Comments", () => {

  check("2+2#abc", 4);
  check("2+2//abc", 4);

  check(`2+2
//abc
`, 4);

  check(`if true then
4
//abc
end if
`, 4);


  check(`if true
then
4
//abc
end if
`, 4);

  check(`if true
  
  then
  
4
//abc
end if
`, 4);

  check(`1
//abc
4
`, 4);

  check(`if true then
  1
  // abc
  2
else
  3
end if`, 2);

  check("2+/*abc*/2", 4);
  check("2+/*ab \nc\n\nd*/2", 4);
  check("2+/*ab \nc\n\nd*/2/* xy\nz */", 4);
  check("/*ab \nc\n\nd*/3", 3);
  check("/* . */\nx <- 4\n/* . */\nx ", 4);
  check("/* . */\nx <- 4 /* . */\nx ", 4);
  check("/* . */ x <- 4\n/* . */\nx ", 4);
  check("/* . */ x <- 4 /* . */\nx ", 4);
  check("2+2\n/*abc\nxyz*/\n", 4);
  check(`x<-3 #set x
x`, 3);

  check("2+2\n2+3", 5);
  check("2+2\r\n2+3\r\n\n4+6", 10);
  check("2+2\n2+3\n1#abfds\n4+6#abc", 10);
  check("2+2\n/*\n2+3\n*/1#abfds\n4+6#abc", 10);
});


test("Basic calculations", () => {
  check("2+2", 4);
  check("2-3", -1);
  check("2*3", 6);
  check("1/2", 0.5);
  check("3^2", 9);
  check("(-3)^2", 9);
  check("(-2)^-2", 1/4);
  check("(-3)^0", 1);
  failure("(-3)^.5", "Cannot take a negative");
  failure("(-3)^1.5", "Cannot take a negative");
  failure("(-3)^(-.5)", "Cannot take a negative");
  check("(2-3)*3", -3);
  check("-3", -3);
  check("7 mod 5", 2);
  check("7 % 5", 2);
  check("true = true", 1);
  check("false = false", 1);
  check("true != true", 0);
  check("false != false", 0);
  check("false != true", 1);
  check("false == true", 0);
  check("true || false", 1);
  check("false || 1", 1);
  check("1 || false", 1);
  check("0 || 1", 1);
  check("!(0 || 0)", 1);
  check("!(0 || 1)", 0);
  check("!(1 || 1)", 0);
  check("!(0 && 0)", 1);
  check("!(0 && 1)", 1);
  check("!(1 && 1)", 0);
  check("0 || false", 0);
  check("false and 1", 0);
  check("1 and false", 0);
  check("0 and 1", 0);
  check("0 and false", 0);
  check("1 and 1", 1);
  check("8 and true", 1);
  check("true && false", 0);
  check("8 xor true", 0);
  check("0 xor true", 1);
  check("0 xor false", 0);
  check("true xor false", 1);
  check("true xor true", 0);
  check("false xor false", 0);
  check("not false", 1);
  check("not(false)", 1);
  check("! false", 1);
  failure("'a' && 1");
});


test("ifthenelse()", () => {
  check("ifthenelse(-1,1,2)", 1);
  check("ifthenelse(0,1,2)", 2);
  check("ifthenelse({true, false},1,2)", [1, 2]);
  check("ifthenelse({a:true, b:false}, 1, 2).a", 1);
  check("ifthenelse({a:true, b:false}, 1, 2).b", 2);
  check("ifthenelse({a:true, b:false}, {a:3,b:4}, 2).a", 3);
  check("ifthenelse({a:true, b:false}, 1, {a:5,b:6}).b", 6);
  check("ifthenelse({a:true, b:false}, {a:-1,b:-2}, {a:5,b:5}).a", -1);
  check("ifthenelse({a:true, b:false}, {a:-1,b:-2}, {a:5,b:6}).b", 6);

  check("IfThenElse(7 > 9,1,0)", 0);
  check("IfThenElse(7 <= 9,1,0)", 1);
  check("IfThenElse(1,5,9)", 5);
  check("IfThenElse(8,5,9)", 5);
  check("IfThenElse(-1,5,9)", 5);
  check("IfThenElse(.5,5,9)", 5);
  check("IfThenElse(0,5,9)", 9);
  failure("ifthenelse()");
  failure("ifthenelse(1)");
  failure("ifthenelse(1,2)");
});


test("Rounding", () => {

  check("round((1+3)*5^(6+5^2/3^3-2+3))", 1386898);
  check("round({2.6 cow})*{1 1/cow}", 3);
  failure("round({1 meter} + {10 centimeters})", "explicitly set");
  check("round({1.1 meter} + {3 meters}) * {1 1/meter}", 4);
  check("round({1.1 meter} * 4) * {1 1/meter}", 4);
  check("round({1.1 meter} / (1/4))* {1 1/meter}", 4);
  check("round(-{1.1 meter}) * {1 1/meter}", -1);
  check("round({1.1 meter} - {3 meters}) * {1 1/meter}", -2);
  check("round({1.1 meter}, 'meters')* {1 1/meter}", 1);
  check("round({1.1 meter}, 'centimeters')* {1 1/meter}", 1.1);
  check("round({1.1 meter} * {3 oof}) * {1 1/(meter*oof)}", 3);
  check("round({1.1 meter} / {.3333 oof}) * {1 oof/meter}", 3);
  failure("round({1 meter} * {10 centimeters})", "explicitly set");
  check("round({1 amount/years} * {10 years} * {1 1/amount})", 10);
  check("round({1 amount/years} / {1/10 1/years} / {1 amount})", 10);
  check("{1 year} / {1 year/dog} * {2 1/dog}", 2);
  check("{1 year} / {1 month/dog} * {2 1/dog}", 24);
  failure("round({1 meter} * ({1 mile} + {1 centimeter}))");
  failure("round({1 meter} + ({1 mile} + {1 centimeter}))");
  failure("round()");
  check("sum(round({1.1, 2.8}))", 4);
  check("ceiling(pi*10)", 32);
  failure("ceiling()");
  check("sum(ceiling({1.1, 2.1}))", 5);
  check("floor(1.9)", 1);
  failure("floor()");
  check("sum(floor({1.1,2.9}))", 3);
});


test("Comparisons", () => {
  check("! 1", 0);
  check("! 0", 1);
  check("1*2 = 2", 1);
  check("1*2 == 2", 1);
  check("2*2 <> 4", 0);
  check("2*2 != 4", 0);
  check("5 >= 4", 1);
  check("5 <= 4", 0);
  check("5 < 4", 0);
  check("5 > 4", 1);
  check("5 == 5", 1);
  check("5 == 10", 0);
  check("5 != 5", 0);
  check("5 != 10", 1);
  check("5 > 3", 1);
  check("5 > 7", 0);
  check("5 >= 5", 1);
  check("5 >= 7", 0);
  check("5 < 7", 1);
  check("5 < 3", 0);
  check("5 <= 5", 1);
  check("5 <= 3", 0);
});


test("Misc", () => {

  check("2*3/2", 3);
  check("2*3/4", 1.5);
  
  check("\n\n2+2", 4);
  check("2+2\n\n", 4);
  check("\n\n2+2\n\n", 4);
  failure("2+");

  testConfig.globals = "testa <- 7";

  check("testa + -testa", 0);
  check("testa^2", 49);
  failure("testa^");
  failure("xxxx", "does not exist");
  failure("constructor", "does not exist");
  failure("self", "does not exist");
  check("sqrt(4)", 2);
  failure("sqrt (4)");
  check("sqrt({4 meters^2}) * {1 1/meters}", 2);
  failure("{1,2}.constructor", "not in vector");
  failure("{a: 1}.constructor", "not in vector");
  check("{4 meters^2}^.5 * {1 1/meters}", 2);
  failure("sqrt()");
  failure("sqrt(1,2)");
  check("sum(flatten(sqrt({16, {9, 4} })))", 9 );
  check("log(100)", 2);
  check("log(1000)", 3);
  check("log(0.1)", -1);
  failure("log()");
  failure("log({1 cow})");
  check("sum(flatten(log({100, {10, 1000} })))", 6);
  check("ln(e^5)", 5);
  check("factorial(3)", 6);
  failure("factorial()");
  failure("factorial({1 cow})");
  check("sum(factorial({1,3}))", 7);
  check("0.1+0.2", 0.3);
  check("1e2", 100);
  check("1e+2", 100);
  check("1.0e-2", 0.01);
  check("1E2", 100);
  check("1E+2", 100);
  check("1.0E-2", 0.01);
  check("(1+2)", 3);
  check("1-2+3", 2);


  check(`1
  3`, 3);
  check(`a<-1.2
  {ceiling(a)}{1}`, 2);

  testConfig.globals = "testfn(a,b) <- a^2 + b^2";
  check("testfn(1,3)", 10);

  testConfig.globals = "testfn() <- 72";
  check("testfn()", 72);

  check("5^3^2", 1953125);
  check("max(7,4,10)", 10);
  check("min(7,4,10)", 4);

  check("max({ {1,2}, {0, 6} })", 6);
  check("min({ {1,2}, {0, 6} })", 0);
  check("max({1,2}, {0, 6})", [1, 6]);
  check("min({1,2}, {0, 6})", [0, 2]);

  failure("cos()");
  check("sum(cos({pi,pi/2}))", -1);
  failure("cos({1 cow})");
  failure("sin()");
  failure("sin(true)");
  check("sum(sin({pi,pi/2}))", 1);
  failure("sin({1 cow})");
  failure("tan()");
  check("sum(tan({pi/4}))", 1);
  failure("tan({1 cow})");
  failure("acos()");
  failure("acos({1 cow})");
  failure("asin()");
  failure("asin({1 cow})");
  failure("atan()");
  failure("atan({1 cow})");
  failure("arccos()");
  failure("arccos({1 cow})");
  failure("arcsin()");
  failure("arcsin({1 cow})");
  failure("arctan()");
  failure("arctan({1 cow})");
  check("cos(acos(.7))", 0.7);
  check("cos(acos({.7})){1}", 0.7);
  failure("{1, 2, 3} {1}");
  failure("{{1,2,3}, 2, 3}{1} {2}");
  failure("cos(acos({.7})) {1}");
  check("sin(asin(.8))", 0.8);
  check("sin(asin({.8})){1}", 0.8);
  check("tan(atan(.2))", 0.2);
  check("tan(atan({.2})){1}", 0.2);
  check("cos(arccos(.7))", 0.7);
  check("cos(arccos({.7})){1}", 0.7);
  check("sin(arcsin(.8))", 0.8);
  check("sin(arcsin({.8})){1}", 0.8);
  check("tan(arctan(.2))", 0.2);
  check("tan(arctan({.2})){1}", 0.2);

  check("magnitude({3,4})", 5);
  failure("magnitude(true)");

  check("1e10", 10000000000);
  check("1.e10", 10000000000);
  check("123.", 123);
  check("1e11/1e10", 10);
  check("123/1e22", 1.23e-20);
  check("0", 0);
  check("0+0", 0);
  check("1", 1);
  check("sin(pi)", 0, 8);
  check("sin(pi/2)", 1);
  check("sin(pi*3/2)", -1);
  check("cos(pi)", -1);
  check("cos(pi/2)", 0, 8);
  check("tan(pi/4)", 1);
  check("tan(0)", 0, 8);
  check("tan(pi)", -0, 8);
  check("tan(5/4*pi)", 1);
  check("sin({pi radians})", 0, 8);
  check("sin({90 degrees})", 1);
  check("cos({pi radians})", -1);
  check("cos({90 degrees})", 0, 8);
  check("tan({180 degrees})", -0, 8);
  check("tan({5/4*pi radians})", 1);
  check("3*-1", -3);
  check("-3*1", -3);
  check(".21", 0.21);
  check("0.21", 0.21);
  check("0.67", 0.67);
  check("12/4/3", 1);
  check("'a'='a'", 1);
  check("'a'='b'", 0);
  failure("log(0)");

  testConfig.globals = "q(x=2) <- x+2";
  check("q(5)", 7);
  check("q()", 4);

  testConfig.globals = "q(a, x=2) <- a*x+2";
  check("q(5)", 12);
  failure("q()");

  testConfig.globals = "q(a, x=2, y=3) <- a*x*y+2";
  check("q(5)", 32);
  check("q(5, 1)", 17);
  check("q(5, 1, -1)", -3);

  testConfig.globals = "q(a, x=-2, y=3) <- a*x*y+2";
  check("q(5)", -28);
  failure("q()");

  testConfig.globals = "q(a=true) <- ifthenelse(a,1,0)";
  check("q(true)", 1);
  check("q(false)", 0);
  check("q()", 1);

  testConfig.globals = "q(a={1,2,3}) <- a^2";
  check("q(7)", 49);
  check("q(){3}", 9);

  testConfig.globals = "q(a='cat') <- ifthenelse(a='cat',1,0)";
  check("q('cat')", 1);
  check("q('dog')", 0);
  check("q()", 1);

  testConfig.globals = "f(a, b, c=3, d=2) <- a+b+c+d";
  check("f(5,1)", 11);
  check("f(5,1,0)", 8);
  check("f(1,2,3,4)", 10);
  check("-1^2", -1);
  check("4^-1", 0.25);

  failure("true+5");
  failure("5+true");
  failure("true*5");
  failure("5*true");
  failure("5/true");
  failure("true/5");
  failure("5-true");
  failure("true-5");
  failure("5 % true");
  failure("true % 5");
  failure("5^true");
  failure("true^5");
  failure("-true");

  failure("{1,2,3}{-1}");
  failure("{1,2,3}{4}");
  failure("{1,2,3}{2.4}");

  failure("'a':'b'");
  failure("'a'<'b'");
  failure("'a'<='b'");
  failure("'a'>'b'");
  failure("'a'>='b'");


  check("'a'+2", "a2");
  check("2+'a'", "2a");

  check("if 1+1 > 1 then \n 10 \n end if", 10);
  check("if 1+1 > 1 then \n\n\n 10 \n\n\nend if", 10);
  check("if 1+1>3 then\n10\nend if", 0);

  check("if true then \n 2 \n else \n  \n end if", 2);
  check("if true\n 2 \n else \n  \n end if", 2);
  check("if false then \n  \n else \n 2 \n end if", 2);
  check("if false then \n  \n else if false then\n 3 \nelse \n 2 \n end if", 2);
  check("if false then \n  \n else if false then\n  \nelse \n 2 \n end if", 2);
  check("if false then \n  \n else if true then\n 3 \nelse \n 2 \n end if", 3);
  check("if false then \n  \n else if true\nthen\n 3 \nelse \n 2 \n end if", 3);
  check("if false then \n  \n else if true\n 3 \nelse \n 2 \n end if", 3);
  check("if false then \n  \n else if true then\n  \nelse \n 2 \n end if", 0);
  check("if false then \n  \n else if true then\n   end if", 0);
  check("if false then \n  \n else if false then\n   end if", 0);
  check("if false then \n 2 \n else \n  \n end if", 0);
  check("if true then \n  \n else \n 2 \n end if", 0);
  check("if true then \n  \n else \n  \n end if", 0);

  check("if 1+1>1 then\n10\nelse\nx<-5\nx^2\nend if", 10);
  check("if 1+1>1 then\n10\nelse\n\nx<-5\nx^2\nend if", 10);
  check("if 1+1>3 then\n10\nelse\nx<-5\nx^2\nend if", 25);

  check("if 1+1>1 then\n10\nelse if 4>3 then\n 6\nelse\nx<-5\nx^2\nend if", 10);
  check("if 0>1 then\n10\nelse if 4>3 then\n 6\nelse\nx<-5\nx^2\nend if", 6);
  check("if 0>1 then\n10\nelse if 2>3 then\n 6\nelse\nx<-5\nx^2\nend if", 25);

  failure("{1cow}");

  check("function xkk(a)\na<-a*2\na<-a*3\na\nend function\nxkk(4)", 24);
  check("function xkk(a)\n\nend function\nxkk(4)", 0);
  check("xkk <- function(a)\n\nend function\nxkk(4)", 0);
  failure("function xkk(a)\njkk<-100\na<-a*2\na<-a*3\na\nend function\nxkk(4)\njkk");

  check("1\n 2\n 3", 3);
  check("1\n return(2)\n 3", 2);
  check("if true then\n 5\n end if\n return 6", 6);
  check("if true then\n return 5\n end if\n return 6", 5);

  check("function test()\n 1\n 2\n end function\n test()*3", 6);
  check("function test()\n return 1\n 2\n end function\n test()*3", 3);

  check("", 0);
  check(" ", 0);
  check("# abc\n \n\n/*43*/", 0);


  failure("function a(x)\naVal <- 10\nb(x)\nend function\nfunction b(x)\nx+aVal\nend Function\na(2)");
  
  testConfig.globals = "";
});


test("Vectors", () => {

  check(" {1, 2}", [1, 2]);

  check("{1,3} = {1, 2}", [true, false]);
  check("{1, {3, 4}} = {1, {5, 4}}", [true, [false, true]]);
  check("{a: 1, b: {c: 3, d: 4}} = {a:1, b: {c: 5, d: 4}}", {a: true, b: {c: false, d: true}});
  failure("{1, 2, 3} = {1, 2}");
  failure("{a: 1, b: {c: 3, d: 4}} = {a: 3, c: 2}");
  failure("{a: 1, b: {c: 3, d: 4}, e: 3} = {1, 2}");
  check(" {1, 2} != {1,4}", [false, true]);
  check("{1,2,3} > {1,4,0}", [false, false, true]);
  check("{1,2,3} >= {1,4,0}", [true, false, true]);
  check("{1,2,3} < {1,4,0}", [false, true, false]);
  check("{1,2,3} <= {1,4,0}", [true, true, false]);


  check("1=  {1, 2}", [true, false]);
  check("1!= {1,4}", [false, true]);
  check("1> {1,4,0}", [false, false, true]);
  check("1 >= {1,4,0}", [true, false, true]);
  check("1< {1,4,0}", [false, true, false]);
  check("1<= {1,4,0}", [true, true, false]);

  check(" {1, 2} =1", [true, false]);
  check("{1,4} !=1", [false, true]);
  check("{1,4,0} <1", [false, false, true]);
  check("{1,4,0} <=1", [true, false, true]);
  check("{1,4,0} >1", [false, true, false]);
  check("{1,4,0} >=1", [true, true, false]);

  check("{true,false}  &&  {true,true}", [true, false]);
  check("{true,false}  && true", [true, false]);
  check("{true,false}  ||  {true,true}", [true, true]);
  check("{true,false}  || true", [true, true]);
  check("!  {true,false}", [false, true]);




  check("{2,3} + {1,4}", [3, 7]);
  check("{2,3} +2", [4, 5]);
  check("2+ {2,3}", [4, 5]);
  check("{2,3} - {1,4}", [1, -1]);
  check("{2,3} -2", [0, 1]);
  check("2- {2,3}", [0, -1]);
  check("{2,3} * {1,4}", [2, 12]);
  check("{2,3} *2", [4, 6]);
  check("2* {2,3}", [4, 6]);
  check("{2,3} / {1,4}", [2, .75]);
  check("{2,3} /2", [1, 1.5]);
  check("2/ {2,4}", [1, .5]);
  check("- {2,3}", [-2, -3]);
  check("{8,3}  mod 3", [2, 0]);
  check("3 mod  {8,2}", [3, 1]);
  check("{8,2} ^2", [64, 4]);
  check("2^ {3,2}", [8, 4]);
  check("{3,4} ^ {3,2}", [27, 16]);

  check("count(1,2, {4,5} )", 4);
  check("join(1,2, {4,5} ).length()", 4);
  check("min(1,2, {-1,5} )", [-1, 1]);
  check("max(1,2, {4,5} )", [4, 5]);
  check("min( {2,5} ,3,4)", [2, 3]);
  check("max( {4,5} ,3,4.5)", [4.5, 5]);
  check("join(1,2, {4,5} )", [1, 2, 4, 5]);
  check("select( {4,5} , 2)", 5);
  check("select( {4,5} ,  {2} )", [5]);
  check("select( {4,5} ,  {true,false} )", [4]);
  check("filter({4,5,6,1,7}, x>4)", [5, 6, 7]);
  check("filter({4,5,6,1,7}, function(i) i>4)", [5, 6, 7]);
  check("z <- {1,2,3}\nfilter(z, x>1)", [2, 3]);
  check("z <- {1,2,3}\nmap(z, x^2)\nz", [1, 2, 3]);
  check("{4,5,6,1,7}.filter(x>4)", [5, 6, 7]);
  check("{4,5,6,1,7}.filter(function(i) i>4)", [5, 6, 7]);


  check("'a'='b'", 0);
  check("'a'=\"a\"", 1);
  check("'a'!='b'", 1);
  check("'a'!='a'", 0);
  check("'a'='A'", 1);
  check("'bB'!='bb'", 0);


  check("5 = 500", 0);
  check("{5 meters} = {500 centimeters}", 1);
  check("{5 meters} = {500 sheep}", 0);
  check("{5 meters} = 500", 0);
  check("{5 meters} = 5", 0);
  failure( "{5 meters} > 5");

  check("{5 meters} > {500 centimeters}", 0);
  check("{600 centimeters} > {5 meters}", 1);

  check("{500 centimeters} < {5 meters}", 0);
  check("{3 meters} < {500 centimeters}", 1);

  check("{3 meters} >= {500 centimeters}", 0);
  check("{5 meters} >= {500 centimeters}", 1);

  check("{7 meters} <= {500 centimeters}", 0);
  check("{1 meters} <= {500 centimeters}", 1);

  check("sum(abs({1,-2}))", 3);
  check("sum({1,-2}.abs())", 3);

  check("a<-6\n {a cows}*{1 1/cows}", 6);
  check("a<-6\n {a+1 cows}*{1 1/cows}", 7);
  failure("{{1 sheep} cows}");
  failure("{{x sheep} cows}");
  failure("{1cows} * {1 1/cows}");

  check("(2/{1 year})*{1 year}", 2);
  check("(3*{1 year})/{1 year}", 3);

  check("({1 year}/2)/{1 year}", 0.5);
  check("({1 year}*3)/{1 year}", 3);

  check("({a:1, aa: 2,b:3}.keys()=={'a','aa','b'}){1}", 1);
  check("{1,2,3}.keys().length()", 0);
  check("({a:1, aa:2,b:3}.values()){1}", 1);
  failure("({a:1,aa:2,b:3}.values()){'a'}");

  check("map({4,5}, x^2)",  [16, 25]);
  check("map({4,5}, function(i) \n z<-i+i \n z*2 \n end function)",  [16, 20]);
  check("{4, 5}.map(x^2)",  [16, 25]);
  check("{4, 5}.map(mean)",  [4, 5]);
  check("{4, 5}.map(function(i) \n z<-i+i \n z*2 \n end function)",  [16, 20]);
  check("filter({4,5,6,1,7}, x>=4)", [4, 5, 6, 7]);
  check("map({4,6}, x/4)",  [1, 1.5]);

  check("repeat(x+1, 3)",  [2, 3, 4]);
  failure( "repeat(x+1, {3 cows})", "must be unitless");
  failure( "repeat(x+1, 'cat')", "must be a Number");
  failure( "repeat(x+1, true)", "must be a Number");

  check("repeat(x+1, {'a','b','c'}){'b'}",  3);
  failure( "repeat(x+1, {1, 2})", "all strings");
  failure( "repeat(x+1, {'a', 'b', 'a'})", "unique strings");
  failure( "repeat(x+1, {'a': 1, 'b': 2})", "can't have names");

  check("indexof({4,3,1}, 1)",  3);
  check("{4,3,1}.indexOf(1)",  3);
  check("indexof({4,3,1},{1,44,3})",  [3, 0, 2]);
  check("flatten({4,3,1},{1,44,3})",  [4, 3, 1, 1, 44, 3]);
  check("flatten({4,3,1,{1,44,3} })",  [4, 3, 1, 1, 44, 3]);
  check("{4,3,1,{1,44,3} }.flatten()",  [4, 3, 1, 1, 44, 3]);
  check("flatten({4,{3},1,{1,{44,3}} })",  [4, 3, 1, 1, 44, 3]);
  check("flatten({4,3,1,1,44,3 })",  [4, 3, 1, 1, 44, 3]);
  check("count(sample({4,3,1,1,44,3 },5))",  5);
  check("sample({4,3,1,1,44,3 }, 5).count()",  5);
  check("count(sample({4,3,1,1,44,3 },6,true))",  6);
  check("count(sample({4,3,1,1,44,3,4,5,6,7 },7,false))",  7);
  check("{4,3,1,1,44,3 }.sample(5).length()",  5);
  check("{4,3,1,1,44,3 }.sample(6,true).length()",  6);
  check("{4,3,1,1,44,3,4,5,6,7 }.sample(7,false).length()",  7);
  check("reverse({4,3,2},1)",  [1, 2, 3, 4]);
  check("{4,3,2,1}.reverse()",  [1, 2, 3, 4]);
  check("sort({4,2,3},1,2)",  [1, 2, 2, 3, 4]);
  check("{4,2,3 ,1,2}.sort()",  [1, 2, 2, 3, 4]);
  check("unique({4,2,3},1,2)",  [4, 2, 3, 1]);
  check("{4,2,3,1,2}.unique()",  [4, 2, 3, 1]);
  check("unique({1,{1,2},{3,4},{1,2}})", [1, [1, 2], [3, 4]]);
  check("contains({4,3,2}, 1)",  0);
  check("contains({5, 4,3,2}, 3)",  1);
  check("contains({4,{ x: 5 },2}, 3)",  0);
  check("contains({4,{ x: 5 },2}, 5)",  1);
  check("contains({4,{ x: 5, y: {99} },2}, 98)",  0);
  check("contains({4,{ x: 5, y: {99} },2}, 99)",  1);
  check("contains({4,8,9,{1,2,3,4,5},2}, 5)",  1);
  failure("contains(4, 4)");
  check("{'a','b'}.contains('b')", 1);
  check("{'a','b'}.contains('c')", 0);
  check("{'a','b'}.indexof('c')", 0);
  check("{'a','b'}.indexof('a')", 1);
  check("{'a','b', {1,2,3}, 4}.indexof(4)", 4);
  check("{'a','b', {1,2,3}, 4}.indexof(3)", 0);
  check("{4,3,2}.contains(1)",  0);
  check("{4,3,2}.contains(3)",  1);
  check("randBoolean() && false",  0);

  failure("sum(true)");
  failure("1/count({})");

  check("z<-1.2\n round(z)-z", -.2);
  check("z<-{1,3}\n z*2+z", [3, 9]);
  check("z<-{1,3}\n 2*z+z", [3, 9]);
  check("z<-{1,3}\n z+2*z", [3, 9]);
  check("z<-{1,3}\n z+z*2", [3, 9]);
  check("z<-{1,3}\n z+z*2*z", [3, 21]);


  check("repeat(ifthenelse(x mod 2,1,0), 3)",  [1, 0, 1]);
});


test("Units", () => {
  check("mean(1,4,-1,0)", 1);
  check("mean({1 cow}, {5 cow})*{1 1/cow}", 3);
  failure("mean({1 cow}, {1 pig})");
  check("median(1,4,-1,0)", .5);
  check("median(1,4,-1)", 1);
  check("{1,4,-1}.median()", 1);
  failure("median({1 cow}, {1 pig})");
  check("median({1 cow}, {2 cow}, {5 cow})*{1 1/cow}", 2);
  check("sum(1,4,-1)", 4);
  check("{1,4,-1}.sum()", 4);
  failure("sum({1 cow}, {1 pig})");
  check("sum({1 cow}, {2 cow}, {5 cow})*{1 1/cow}", 8);
  check("stddev(1,2,3)", 1);
  check("{1,2,3}.stdDev()", 1);
  check("stddev({1 cow}, {2 cow}, {3 cow})*{1 1/cow}", 1);
  failure("stddev({1 cow}, {1 pig})");
  check("product(1,2,3)", 6);
  check("{1,2,3}.product()", 6);
  check("unitless(product({1 cow}, {2 cow}, {4 cow})*{1 1/cow})", 8);

  check("{2 meter}*{3 1/meter}", 6);
  check("{2 meter^2}*{3 1/meter*1/meter}", 6);
  check("{2 meter^3/meter cubed}", 2);
  check("{2 meter cubed/meter^3}", 2);
  check("{1 meter^2/meter squared}", 1);
  check("{1 meter squared/meter^2}", 1);
  check("{1 cat}={1 dog}", 0);
  check("{1 cat}!={1 dog}", 1);
  failure("{1 cat}<{1 dog}");
  failure("{1 cat}<={1 dog}");
  failure("{1 cat}>{1 dog}");
  failure("{1 cat}>={1 dog}");
  check("{2 1/pig/pig}=={2 1/(pig*pig)}", 1);
  check("{2 1/pig/pig}=={2 1/(pig squared)}", 1);
  check("{2 cows/pigs*(pigs/(cows*birds))}=={2 1/(birds)}", 1);
  check("{2 1/(pigs*pigs)}=={2 (cows/(pigs)^2*(1/cows))}", 1);
  check("{1 cow per hour}*{1 hour} == {1 cow}", 1);
  check("{1 (cow per hour)*hour}*{1 hour} == {1 cow*hour}", 1);
  check("{1 cow per hour*hour}*{1 hour} == {1 cow/hour}", 1);
  check("{1 cow per hour squared}*{1 hour} == {1 cow/hour}", 1);
  check("{1 cow per (hour*hour)}*{1 hour} == {1 cow/hour}", 1);

  check("{1 cow*hour per hour}*{1 hour} == {1 cow*hour}", 1);
  check("{1 cow*(hour per hour)}*{1 hour} == {1 cow*hour}", 1);
  check("{1 cow per hour per hour}*{1 hour*hour} == {1 cow}", 1);
  check("{1 year/month}*{1 dog}*{1 1/dog}", 12);
  check("({1 dog}*{1 year/month})*{1 1/dog}", 12);


  check("{1 m/s}^0/{1 m/s}^0", 1);

  check("removeUnits({2 hours}, 'hours')", 2);
  check("removeUnits({2 hours}, 'minutes')", 120);
  check("removeUnits(2, 'minutes')", 2);
  failure("removeUnits({1 cow}, 'minutes')", "Incompatible units");

  check("removeUnits({a: {2 hours}, b: {60 minutes}}, 'hours')", {a: 2, b: 1});
});


test("Vector aggregation", () => {
  check("correlation( {1,2,4} ,  {.5,1,2} )", 1);
  check("correlation( {1,2,4} ,  {-.5,-1,-2} )", -1);
  check("correlation( {1,1,1} ,  {.5,1,2} )", 0);
  check("correlation( {1,2,4} ,  {1,1,1} )", 0);
  failure("correlation(1,  {.5,1,2} )");
  check("correlation( {1,2,4} ,  {-.5,-1,-2} )", -1);
  check("round(correlation( {1,3,2} ,  {2,4,2} )*1000)", 866);

  check("fill({1, {2,3} }, 7)", [7, [7, 7]]);
  check("mean(1,4,-1,0)", 1);
  check("mean( {1,4,-1} ,0)", [0.5, 2, -0.5]);
  check("median(1,  {4,-1} , 0)", [1, 0]);
  check("median( {1,4,-1} )", 1);
  check("sum( {1,4,-1} )", 4);
  check("stddev( {1,2,3} )", 1);
  check("product( {1,2,3} )", 6);
  failure("min({1, {2, 3}},{3, 4})");
  failure("min({1, 3},{3, {2, 3}})");
  check("min({1, {3,-1}},{3, {2, 3} })", [1, [2, -1]]);


  check("max({ { 1, {1, 2} }, {-1, {3,1} } })", 3 );
  check("mean({ {1,2}, {3,4}, {2,6} })", 3);
  check("max({ {1,2}, {3,4}, {-1,5} })", 5);
  check("min({ {1,2}, {3,4}, {-1,5} })", -1);
  check("max({ 1, {1, 2} }, {-1, {3,1} } )", [1, [3, 2]] );
  check("mean( {1,2}, {3,4}, {2,6} )", [2, 4]);
  check("max( {1,2}, {3,4}, {-1,5} )", [3, 5]);
  check("min( {1,2}, {3,4}, {-1,5} )", [-1, 2]);

  check("min({ {'a':1,'b':2}, {'b': 3,'a':-1} })", -1);

  check("{a:3,b:4,c:5}{2}", 4);
  check("{\n\na\n\n\n:\n\n\n3\n\n\n,\n\n\nb\n\n\n:4,c\n\n\n:5\n\n}{2}", 4);
  check("{1,\n4\n,5}{2}", 4);


  check("{ {1,2}, {3,4}, {-1,5} }{ {false, false, true}, 1}", [-1]);

  failure("median({1,2}, {3, 4, 3}, {2,6})");
  failure("median({1,2}, {3, 4}, {2,'a': 6})");
  failure("median({'b': 1,2}, {3, 4}, {2, 6})");
  check("median({ {1,2}, {3, 4, 3}, {2,6} })", 3);
  check("median({ {1,2}, {3, 4,3}, {'a': 2,'b': 6} })", 3);
  check("median({ {'b': 1, 'c':2}, {3, 4,3}, {2, 6} })", 3);

  check("union({1,2,3}, {2,3,4})", [1, 2, 3, 4]);
  check("{1,2,3}.union({2,3,4})", [1, 2, 3, 4]);
  failure("union(1,2)");
  failure("union(true,false)");
  check("intersection({1,2,3}, {2,3,4})", [2, 3]);
  check("{1,2,3}.intersection({2,3,4})", [2, 3]);
  check("difference({1,2,3}, {2,3,4})", [1, 4]);
  check("{1,2,3}.difference({2,3,4})", [1, 4]);
  check("difference({1},{1})", []);


  check("lookup({6 dog}, {{5 dog}, {7 dog}}, {{10 cow}, {15 cow}}) == {12.5 cow}", 1);
  failure("lookup({6 dog}, {{5 dog}, {7 dog}}, {{10 cow}, 15})");
  failure("lookup({6 dog}, {5, {7 dog}}, {{10 cow}, {15 cow}})");
  check("lookup(0, {0, 10, 20}, {0, 10, 40})", 0);
  check("lookup(20, {0, 10, 20}, {0, 10, 40})", 40);
  check("lookup(50, {0, 10, 20}, {0, 10, 40})", 40);
  check("lookup(-50, {0, 10, 20}, {0, 10, 40})", 0);
  check("lookup(5, {0, 10, 20}, {0, 10, 40})", 5);
  check("lookup(19, {0, 10, 20}, {0, 10, 40})", 37);
  failure("lookup(18, {1,2}, {4})");
  failure("lookup(18, {}, {})");

  check("Delays <- function()\nres <- {k: 1}\nres.k <- res.k + 1\nreturn res\nend function\ndelays()\ndelays().k", 2); // Make sure the res array is initialized each time in the function

  check("a <- 10\nWhile a < 20\n    a <- a+1\nEnd loop\n a^2", 400);
  failure("\nWhile false\n    \nEnd loop\n ");
  check("\nWhile false\n  //foo  \nEnd loop\n ", 0);
  check("for x in {1,2,3}\n    \nEnd loop\n ", 0);
  check("for x from 1 to 3\n    \nEnd loop\n ", 0);
  check("a <- 10\n\nWhile a < 20\n\n\n    a <- a+1\n\n\nEnd loop\n\n a^2", 400);
  failure("a <- 10\nWhile a < 20\n    s<-1\n    a <- a+1\nEnd loop\n s");
  check("q <- {}\nfor s in repeat(x^2,3)\nq<-join(q,s+1)\nend loop\nq", [2, 5, 10]);
  check("q <- {}\nfor s in repeat(x^2,3)\nj<-s+1\nq<-join(q,j)\nend loop\nq", [2, 5, 10]);
  check("vec <- { }\nFor s from 1 to 3\nvec <- join(vec, s*2)\nEnd loop\nvec", [2, 4, 6]);
  check("vec <- { }\nFor s from 1 to(3)\nvec <- join(vec, s*2)\nEnd loop\nvec", [2, 4, 6]);
  check("vec <- { }\nFor s from 1 to 3\n\nvec <- join(vec, s*2)\n\nEnd loop\nvec", [2, 4, 6]);
  check("vec <- { }\nFor s from 1 to 3\nq<-s*2\nvec <- join(vec, q)\nEnd loop\nvec", [2, 4, 6]);
  check("vec <- { }\nFor s from 1 to 3 by 2\nvec <- join(vec, s*2)\nEnd loop\nvec", [2, 6]);
  check("vec <- { }\nFor s from 1 to -3 by -2\nvec <- join(vec, s)\nEnd loop\nvec", [1, -1, -3]);

  check("2:2", [2]);
  check("1:3", [1, 2, 3]);
  check("1:0.5:3", [1, 1.5, 2, 2.5, 3]);
  check("1:(1+2)", [1, 2, 3]);
  check("3:1", [3, 2, 1]);
  check("3:-.5:1", [3, 2.5, 2, 1.5, 1]);
  check("(2+1):1", [3, 2, 1]);
  check("3:1.5", [3, 2]);
  check("{1 meter}:{2 meters}=={{1 meter}, {2 meters}}", [true, true]);
  failure("{1 meter}:{2 cow}");

  check("a <- {1,2}\n b <- {3,4}\n c <- a+b\n b{1}", 3);
  check("a <- {1,2}\n b <- {3,4}\n c <- a*b\n a{1}", 1);
  check("a <- {1,2}\n b <- {3,4}\n c <- -a\n a{1}", 1);

  testConfig.globals = "a <- {\"a\": {\"x\": -1, \"y\": -2, \"z\": -3}, \"b\": {\"x\": 11, \"y\": 12, \"z\": 13} }";
  check("a{1, 2}", -2);
  check("a{2, 2}", 12);
  check("a{2, \"z\"}", 13);
  check("a{\"a\", \"z\"}", -3);
  check("(a*{\"*\":2, \"z\":5}){\"a\", \"z\"}", -15);
  check("({\"*\":2, \"z\":5}*a){\"a\", \"z\"}", -15);
  check("({*:2}*a){\"a\", \"z\"}", -6);
  check("(a*{\"*\":2}){\"a\", \"z\"}", -6);
  check("a{\"a\", 1:2 }", {"x": -1, "y": -2});
  check("a{1, {\"x\", \"y\"} }", {"x": -1, "y": -2});
  check("a{1,  *} ", {"x": -1, "y": -2, "z": -3});
  check("a{\"a\", * } ", {"x": -1, "y": -2, "z": -3});
  check("a{\"a\", sum } ", -6);
  check("a{max, 1 } ", 11);
  check("a{min, 1 } ", -1);
  check("a{max, \"z\" } ", 13);
  check("a{max, \"Z\" } ", 13);
  check("a{min, \"z\" } ", -3);

  testConfig.globals = "a <- {\"a\": {\"x\": -1, \"y\": -2, \"z\": -3}, \"b\": {\"x\": 11, \"y\": 12, \"z\": 13} }\n range(x) <- max(x)-min(x)\n aa <- {}";
  check("aa.cat <- 10\n aa.cat ", 10);
  check("a{range, \"z\" } ", 16);
  check("a{\"a\", range } ", 2);
  check("a{\"a\", 1} <- 7 \n a{1, 1} ", 7);
  check("a{\"a\", 1} <- 7 \n a.a.x ", 7);
  check("a{\"a\", 1} <- 7 \n a.a.\"x\" ", 7);
  check("a{\"a\", 1} <- 7 \n (a{\"a\",*}).x ", 7);
  check("a{\"a\", 1} <- 7 \n a{*, \"x\"}.a ", 7);
  failure("a.*.\"x\" ");
  check("a.a <- 12 \n a.a ", 12);
  check("a.a <- false \n a.a ", 0);
  check("a.a <- 0 \n a.a ", 0);
  failure("a.c");
  check("a.c <- 7 \n a.c ", 7);
  check("a{ {\"aa\", \"bb\"} } <- 9 \n a.bb ", 9);
  check("a{\"b\", 2:3} <- 9 \n a{\"b\", 3} ", 9);
  check("{{1,2,3},{-1,2,4}}{*,*}{2,1}", -1);
  check("{{1,2,3},{-1,2,4}}{min}{max}", 3);
  check("{{1,2,3},{-1,2,4}}{min,max}", 3);
  check("{{1,2,3},{-1,2,4}}{max,min}", 1);
  check("{{1,2,3},{-1,2,4}}{max,3}", 4);
  check("{{1,2,3},{-1,2,4}}{max,1}", 1);
  check("{{1,2,3},{-1,2,4}}{1, max}", 3);
  check("{{1,2,3},{-1,2,4}}{2, max}", 4);
  check("{{1,2},{3,4}}{*, sum}{sum}", 10);

  check("ifthenelse({false, true}, {1,2}, {3,4}){1}", 3);
  check("ifthenelse({false, true}, {1,2}, {3,4}){2}", 2);
  failure("ifthenelse({false, true}, {1}, {3,4}){2}");

  check("ifthenelse({a: 1, b: 0, c: {d: 1, e: 1}}, {a: 1, c: {d: 1, e: 3}, b: 2}, {a: 11, c: {d: 11, e: 13}, b: 12}).a", 1);
  check("ifthenelse({a: 1, b: 0, c: {d: 1, e: 0}}, {a: 1, c: {d: 1, e: 3}, b: 2}, {a: 11, c: {d: 11, e: 13}, b: 12}).c.e", 13);
  failure("ifthenelse({a: 1, b: 0, c: {d: 1, e: 0}}, {a: 1, f:4, c: {d: 1, e: 3}, b: 2}, {a: 11, c: {d: 11, e: 13}, b: 12}).c.e");

  check("{\"a\": {\"x\": {\"j\": 1, \"k\":3},\"b\":{\"j\": 1, \"k\":3}}, \"b\":{\"x\":{\"j\": 1, \"k\":3},\"b\":{\"j\": 1, \"k\":3}}, \"c\":{\"x\":{\"j\": 1, \"k\":3},\"b\":{\"j\": 1, \"k\":3}}}{\"a\",\"x\",\"k\"}", 3);
  check("{\"a\": {\"x\": {\"j\": 1, \"k\":3},\"b\":{\"j\": 1, \"k\":3}}, \"b\":{\"x\":{\"j\": 1, \"k\":3},\"b\":{\"j\": 1, \"k\":3}}, \"c\":{\"x\":{\"j\": 1, \"k\":3},\"b\":{\"j\": 1, \"k\":3}}}.a.x.k", 3);

  failure("{\"t\":2}{\"q\"}");
  check("{\"*\":2}{\"q\"}", 2);
  failure("{\"t\":2}.q");
  check("{\"*\":2}.q", 2);

  check("({\"A\":1,\"B\":2} * {\"B\":3, \"A\":1}){\"A\"} ", 1);
  check("({\"A\":1,\"B\":2} * {\"A\":3, \"B\":1}){\"A\"} ", 3);
  check("({\"*\":2}+{\"A\":3, \"B\":2}){\"B\"} ", 4);

  check("filter({\"a\":1, \"b\":3}, x>2){\"b\"}", 3);
  check("map({\"a\":1, \"b\":3}, x^2){\"b\"}", 9);
  check("map({\"a\":1, \"b\":3}, key+\"a\"){\"b\"}", "ba");
  check("map({1, 3}, key+\"a\"){1}", "a");
  check("map({\"a\": 1, \"b\":3}, key+\"a\"){\"b\"}", "ba");


  check("{a:1, b:2}.b", 2);


  check("reverse({\"a\":1, \"b\":4, \"c\":5}){1}", 5);
  check("reverse({\"a\":1, \"b\":4, \"c\":5}){\"c\"}", 5);
  check("join({\"a\":1, \"b\":4, \"c\":5}, {\"d\":7}){\"c\"}", 5);
  check("join({\"a\":1, \"b\":4, \"c\":5}, {\"d\":7}){\"d\"}", 7);

  failure("{\"x\": {\"m\": 1} }*{\"y\": {\"m\": 0.1} }");

  check("collapse({\"a\": {\"x\":1,\"b\":3}, \"b\":{\"x\":3,\"b\":4}, \"c\":{\"x\":5,\"b\":6}}, {\"x\":4, \"b\":2})", {x: 9, b: 13});
  check("collapse({\"a\": {\"x\":1,\"b\":3}, \"b\":{\"x\":3,\"b\":4}, \"c\":{\"x\":5,\"b\":6}}, {\"a\":4, \"b\":2, \"c\":3})", {a: 4, b: 7, c: 11});
  check("collapse({\"a\": {\"x\": {\"j\": -3, \"k\":3},\"y\":{\"j\": 1, \"k\":7}}, \"b\":{\"x\":{\"j\": 3, \"k\":4},\"y\":{\"j\": 7, \"k\":-3}}, \"c\":{\"x\":{\"j\": 11, \"k\":1},\"y\":{\"j\": 2, \"k\":3}}}, {\"a\":4, \"b\":2, \"c\":3})", {a: 8, b: 11, c: 17});
  check("collapse({\"a\": {\"x\": {\"j\": -3, \"k\":3},\"y\":{\"j\": 1, \"k\":7}}, \"b\":{\"x\":{\"j\": 3, \"k\":4},\"y\":{\"j\": 7, \"k\":-3}}, \"c\":{\"x\":{\"j\": 11, \"k\":1},\"y\":{\"j\": 2, \"k\":3}}}, {\"j\":4, \"k\":3})", {j: 21, k: 15});
  check("collapse({\"a\": {\"x\": {\"j\": -3, \"k\":3},\"y\":{\"j\": 1, \"k\":7}}, \"b\":{\"x\":{\"j\": 3, \"k\":4},\"y\":{\"j\": 7, \"k\":-3}}, \"c\":{\"x\":{\"j\": 11, \"k\":1},\"y\":{\"j\": 2, \"k\":3}}}, {\"x\":0, \"y\":9})", {x: 19, y: 17});
  check("collapse({\"a\": {\"x\": {\"j\": -3, \"k\":3},\"y\":{\"j\": 1, \"k\":7}}, \"b\":{\"x\":{\"j\": 3, \"k\":4},\"y\":{\"j\": 7, \"k\":-3}}, \"c\":{\"x\":{\"j\": 11, \"k\":1},\"y\":{\"j\": 2, \"k\":3}}}, {\"a\": {\"j\":0, \"k\":9}, \"b\": {\"j\":1,\"k\":2}, \"c\": {\"j\":1,\"k\":2} }){\"a\"}", {j: -2, k: 10});
  check("collapse({'dogs': {'x': 1, 'y':2}, 'cats': {'x':3, 'y':4} },3)", 10);

  testConfig.globals = "";
});


test("Misc functions", () => {
  check("function fib(n)\n    if n==1 or n==0 then\n        1\n    else\n        fib(n-1)+fib(n-2)\n    end if\nend function\nfib(10)", 89);

  check("'abc \\n \\\\'", "abc \\n \\\\");
  check("\"abc \\n \\\\\"", "abc \n \\");

  check("'1,2,3'.split(',').join('-')", "1-2-3");
  check("'abcd'.indexOf('bc')", 2);
  check("'abcd'.contains('bc')", 1);
  check("'abcd'.contains('s')", 0);
  check("'abcd'.range(2)", "b");
  check("'abcd'.range(4:3)", "dc");
  check("'  abcd '.trim()", "abcd");
  check("'aBcd'.upperCase()", "ABCD");
  check("'aBcd'.lowerCase()", "abcd");
  check("'aBcd '.length()", 5);
  check("'aBcd '.trim().length()", 4);
  check("'123.4'.parse()+1", 124.4);

  testConfig.globals = "";
  failure("1.range(4:3)");
  failure("'abcd'.indexOf(2)");

  check("sign(2)", 1);
  check("sign(-2)", -1);
  check("sign(0)", 0);
  failure("sign('fdsfsd')");
  check("sign({3, -3})", [1, -1]);

  // Test Functional

  check("s <- rand\ns=s", 0);
  check("s <- rand()\ns=s", 1);
  check("s <- mean\ns(1,2,3)", 2);
  check("q(x) <- max(x)\n s <- q \n s({1,2,3})", 3);
  check("if true then\nxx<- median\nxx(1,2.1,3.5)\nend if", 2.1);
  check("if true then\nxx<- median\nxx(1,2.1,3.5)\nelse\n\nend if", 2.1);
  failure("if true then\nxx<- median\nxx(1,2,3.5)\nend if\nxx(2,3,4.5)");
  check("xx <- mean\nif true then\nxx<- median\nxx(1,2,3.5)\nend if\nxx(2,3,4.5)", 3);
  check("function MakeCounter()\ncounter <- 0\nfunction InnerCounter()\ncounter <- counter+1\ncounter\nend function\ninnerCounter\nend function\nc <- makecounter()\nc2 <- makecounter()\nz<-{c(), c(), c2(), c2(), c2(), c()}\nz", [1, 2, 1, 2, 3, 3]);

  testConfig.globals = "z<-{n: 210, m: mean, q:1}";
  check("{z.n, z.q}", [210, 1]);
  check("q<-z.m\nq(1,2)", 1.5);
  check("z.m(1,2)", 1.5);
  check("{max,min}{1}(1,2,3)", 3);
  check("{max,min}{2}(1,2,3)", 1);
  check("map({min, max, median}, x(1,2,3))", [1, 3, 2 ]);

  check("{a:10, b:function(a)\n10*a\nend function}.b(2)", 20);
  check("{a:11, b: function()\nself.a^2\nend function}.b()", 121);

  check("student <- {name: 'John Doe'}\nscott <- new student\nscott.name\nstudent.grade<-9\nscott.grade\nscott.grade <- 7\n{scott.grade, student.grade, scott.name}", [7, 9, "John Doe"]);

  testConfig.globals = "student <- {name: 'John Doe'}\nscott <- new student()\nscott.name\nstudent.grade<-9\nscott.grade\nscott.grade <- 7\n{scott.grade, student.grade, scott.name}";
  check("{scott.grade, student.grade, scott.name}", [7, 9, "John Doe"]);
  check("scott.parent.grade", 9);
  failure("student.parent");

  check("scott.parent.name", "John Doe");
  check("scott.name", "John Doe");

  check("Scott.name <- 'Scott'\n scott.parent.name", "John Doe");
  check("Scott.name <- 'Scott'\n  scott.name", "Scott");
  check("Scott.name <- 'Scott'\n student.studentName <- function()\nself.parent.name\nend function\nstudent.childName <- function()\nself.name\nend function\n{scott.childName(), scott.studentName()}", ["Scott", "John Doe"]);
  check("z<-{a:10, constructor: function(z)\nself.a<-z\nend function}\nq<- new z(20)\nq.a", 20);

  check("z <- function(x) x^2\nz(3)", 9);

  check("z <- function( a, b ) a+b\nz(3,2)", 5);

  check("z <- function( a, b, c=2) a+b+c\nz(3,2)", 7);

  check("function z( a, b, c=2)\na+b+c\nend function\nz(3,2)", 7);
  check("function z( a , b , c , d = 2, e=3)\na+b+c\nend function\nz(3,2,1)", 6);

  check("q <- 'a' \n q.parent.moo <- 'moob' \n 'abc'.moo", "moob");

  failure("1: 2");
  failure("1 :2");
  failure("1 : 2");
  failure("1:2: 7");
  check("a<-10\n{a:2}.a", 2);
  check("a<-10\n{a: 2}.a", 2);
  failure("a<-10\n{(a): 2}");

  check("z <- {}\nfunction xx(a)\na.x <-10\na\nend function\nq <- xx(z)\n{q.x, z.x}", [10, 10]);

  check("Person <- {\nfirstName: \"John\",\nlastName: \"Smith\",\nfullName: function() self.firstName+\" \"+self.lastName,\nconstructor: function(first, last)\nself.firstName <- first\nself.lastName <- last\nend function\n}\n\n\nStudent <- new Person(\"a\",\"b\")\nStudent.grade <- 10\nStudent.school <- \"Midfield High\"\nStudent.constructor <- function(first, last, grade, school)\n   self.grade <- grade\n   self.school <- school\nparent.constructor(first,last)\nend function\n\nz<-new Student(\"first\",\"last\",1,\"d\")\n{Student.fullName(), z.fullName()}", ["a b", "first last"]);

  check("foo <- {constructor: function() self.z<-123}\n xx<- new foo\n xx.z", 123);

  check("StringBase.xxx <- 10\n'a'.xxx", 10);
  check("VectorBase.yyy <- 20\n{}.yyy", 20);

  check("z <- {x:'ab'}\nz.x.length()", 2);
  check("z <- {x:{y:'ab'}}\nz.x.length()", 1);
  check("z <- {x:{y:'abc'}}\nz.x.y.length()", 3);

  testConfig.globals = "z <- 'abc'\nz.moo <- function() 2";
  check("z.moo()", 2);
  failure("'cow'.moo()");

  failure("throw 'oops!'");
  failure("if true then\n throw 'oops'\n end if\n 1");
  check("if false then\n throw 'oops'\n end if\n 1", 1);
  check("try\n 1\n 2\n catch err\n 3\n end try", 2);
  check("try\n  catch err\n 3\n end try", 0);
  check("try\n 1\n throw 'oops!'\n 2\n catch err\n 3\n end try", 3);
  check("try\n 1\n throw 'oops!'\n 2\n catch err\n \n end try", 0);
  check("try\n 1\n throw 'oops!'\n 2\n catch err\n err+'b'\n end try", "oops!b");

  testConfig.globals = "";
});


it("Function validation", () => {
  failure("rand(1)", "must either have");
  failure("randNormal(1)", "must either have");
});


it("Nested vectors", () => {
  failure("{1}{*, sum}", "No element");
  failure("1{*, sum}", "Can't use");
  failure("true{*, sum}", "Can't use");
  failure("\"a\"{*, sum}", "Can't use");


  failure("{1}{1, sum}", "No element");
  failure("1{1, sum}", "Index 1 is");
  failure("true{1, sum}", "Index 1 is");
  failure("\"a\"{1, sum}", "Index 1 is");

  check("{{1}}{*, sum}", [1]);
  check("{{1, 2}, {3, 4}}{*, sum}", [3, 7]);


  check("{{1}}{1, sum}", 1);
  check("{{1, 2}, {3, 4}}{1, sum}", 3);
});