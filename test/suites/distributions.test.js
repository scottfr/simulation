import { check, failure, testConfig } from "../TestUtilities.js";


test("Statistics", () => {
  check("expit(0)", 0.5);
  check("expit(100000000)", 1);
  check("expit(-100000000)", 0);
  check("logit(.5)", 0);
  check("logit(0) < -1e10", 1);
  check("logit(1) > 1e10", 1);
  failure("logit(-.1)", "between 0 and 1");
  failure("logit(1.1)", "between 0 and 1");

  check("Round(pdfNormal(1)*10000)", 2420);
  check("Round(pdfNormal(1, 3, 2)*10000)", 1210);
  check("Round(cdfNormal(1)*10000)", 8413);
  check("Round(cdfNormal(1, 3, 2)*10000)", 1587);
  check("Round(invNormal(.6)*10000)", 2533);
  check("Round(invNormal(.7, 3, 2)*10000)", 40488);
  failure("pdfNormal(1, 0, -1)", "Standard Deviation");
  failure("cdfNormal(1, 0, -1)", "Standard Deviation");
  failure("invNormal(.5, 0, -1)", "Standard Deviation");
  failure("invNormal(2)");
  failure("invNormal(-1)");

  check("Round(pdfLogNormal(1)*10000)", 3989);
  check("Round(pdfLogNormal(1, 3, 2)*10000)", 648);
  check("Round(cdfLogNormal(1)*10000)", 5000);
  check("Round(cdfLogNormal(1, 3, 2)*10000)", 668);
  check("Round(invLogNormal(.6)*10000)", 12883);
  check("Round(invLogNormal(.7, 3, 2)*10000)", 573287);
  failure("pdfLogNormal(1, 0, -1)", "Standard Deviation");
  failure("cdfLogNormal(1, 0, -1)", "Standard Deviation");
  failure("invLogNormal(.5, 0, -1)", "Standard Deviation");
  failure("invLogNormal(2)");
  failure("invLogNormal(-1)");

  check("Round(pdfT(1, 10)*10000)", 2304);
  check("Round(pdfT(2,3)*10000)", 675);
  check("Round(cdfT(1, 10)*10000)", 8296);
  check("Round(cdfT(2, 3)*10000)", 9303);
  check("Round(invT(.1, 10)*10000)", -13722);
  check("Round(invT(.9, 2)*10000)", 18856);
  failure("pdfT(1, 0)", "greater than 0");
  failure("cdfT(1, 0)", "greater than 0");
  failure("invT(2, 3)");
  failure("invT(.9, -1)");

  check("Round(pdfF(1, 10, 7)*10000)", 5552);
  check("Round(pdfF(2, 3, 8)*10000)", 1472);
  check("Round(cdfF(1, 10, 7)*10000)", 4834);
  check("Round(cdfF(2, 3, 8)*10000)", 8073);
  check("Round(invF(.1, 10, 7)*10000)", 4143);
  check("Round(invF(.9, 2, 8)*10000)", 31131);
  failure("pdfF(1, 0, 7)", "greater than 0");
  failure("pdfF(1, 10, 0)", "greater than 0");
  failure("cdfF(1, 0, 7)", "greater than 0");
  failure("cdfF(1, 10, 0)", "greater than 0");
  failure("invF(2, 3, 4)");
  failure("invF(.9, -1, 5)");
  failure("invF(.9, 1, -5)");


  check("Round(pdfChiSquared(1, 10)*10000)", 8);
  check("Round(pdfChiSquared(2,3)*10000)", 2076);
  check("Round(cdfChiSquared(1, 10)*10000)", 2);
  check("Round(cdfChiSquared(2, 3)*10000)", 4276);
  check("Round(invChiSquared(.1, 10)*10000)", 48652);
  check("Round(invChiSquared(.9, 2)*10000)", 46052);
  failure("pdfChiSquared(1, 0)", "greater than 0");
  failure("cdfChiSquared(1, 0)", "greater than 0");
  failure("invChiSquared(2, 3)");
  failure("invChiSquared(.9, -1)");

  check("Round(pdfExponential(1, 10)*10000)", 5);
  check("Round(pdfExponential(2,3)*10000)", 74);
  check("Round(cdfExponential(1, 10)*10000)", 10000);
  check("Round(cdfExponential(2, 3)*10000)", 9975);
  check("Round(invExponential(.1, 10)*10000)", 105);
  check("Round(invExponential(.9, 2)*10000)", 11513);
  failure("pdfExponential(1, 0)", "greater than 0");
  failure("cdfExponential(1, 0)", "greater than 0");
  failure("invExponential(2, 3)");
  failure("invExponential(.9, -1)");

  check("Round(pmfPoisson(1, 10)*10000)", 5);
  check("Round(pmfPoisson(2, 3)*10000)", 2240);
  check("Round(cdfPoisson(1, 10)*10000)", 5);
  check("Round(cdfPoisson(2, 3)*10000)", 4232);
  check("cdfPoisson(1, 0)", 1);
  check("pmfPoisson(0, 0)", 1);
  check("pmfPoisson(1, 0)", 0);
  failure("pmfPoisson(1, -10)");


  failure("randTriangular(1,1,1)");
  failure("randTriangular(1,2,-1)");
  failure("randTriangular(1,2,3)");

  failure("randBeta()");
  failure("randBeta(1,2,3)");
  failure("randBeta(0, 1)", "greater than 0");
  failure("randBeta(1, 0)", "greater than 0");
  failure("randNormal(0, -1)", "greater than or equal to 0");
  failure("randExp(-1)", "greater than or equal to 0");
  failure("randLogNormal(0, 1)", "greater than 0");
  failure("randLogNormal(1, 0)", "greater than 0");
  failure("randBinomial(-1, .5)", "greater than or equal to 0");
  failure("randNegativeBinomial(-1, .5)", "greater than or equal to 0");
  failure("randNegativeBinomial(1.5, .5)", "integer");
  failure("randNegativeBinomial(1, 0)", "cannot be 0");
  failure("randNegativeBinomial(1, 1.1)", "between 0 and 1");
  failure("randGamma(0, 1)", "greater than 0");
  failure("randGamma(1, 0)", "greater than 0");
  failure("randPoisson(-1)", "greater than or equal to 0");
  failure("setRandSeed({1 cow})", "does not accept units");
  failure("setRandSeed({1, 2})", "does not accept vectors");

  failure("RandDist(1,1,1)");
  failure("RandDist()");
  failure("RandDist({1,2})");
  failure("RandDist({ {1,2}, {1,2} })");
  failure("RandDist({0, 1}, {0, 0})", "area");
});


test("Random number generation", () => {
  testConfig.globals = "setRandSeed(12)";

  check("round(mean(repeat(randNormal(), 2000))*10)", 0);
  check("round(mean(repeat(randNormal(0.8, .01), 1000))*100)", 80);

  check("round(mean(repeat(randLogNormal(0.71, .01), 1000))*100)", 71);

  check("round(mean(repeat(rand(), 50000))*100)", 50);
  check("round(mean(repeat(rand(.5, 1), 5000))*100)", 75);

  check("randBoolean(0)", 0);
  check("randBoolean(1)", 1);
  failure("randBoolean({.5})", "non-named vectors");
  check("randBoolean({a: 0, b: 1}).a", 0);
  check("randBoolean({a: 0, b: 1}).b", 1);

  check("randBinomial(0, .5)", 0);
  check("randBinomial(7, 0)", 0);
  check("randBinomial(7, 1)", 7);
  check("round(randBinomial(100000, .8)/100000*100)", 80);

  check("round(mean(repeat(randNegativeBinomial(5, 0.25), 200000)))", 20);
  check("round(mean(repeat(randNegativeBinomial(3, 0.75), 200000))*10)", 40);
  check("randNegativeBinomial(0, 0.3)", 0);
  check("randNegativeBinomial(7, 1.0)", 7);

  check("round(sum(repeat(ifThenElse(randBoolean(.3),1,0),2000))/200)", 3);

  check("round(mean(repeat(randPoisson(0.12), 10000))*100)", 12);
  check("randPoisson(0)", 0);

  check("round(mean(repeat(randExp(2), 10000))*100)", 50);

  check("round(mean(repeat(randTriangular(0, 1, .7), 20000))*10)", Math.round(1.7/3*10));

  check("round(mean(repeat(randDist({{1, 2},{2, 2}}), 20000))*10)", 15);
  check("round(mean(repeat(randDist({ {1, 2}, {2, 2}, {2, 0}, {3, 0}, {3, 2}, {4, 2} }), 20000))*10)", 25);
  check("round(mean(repeat(randDist({1, 2}, {2, 2}), 20000))*10)", 15);

  check("round(mean(repeat(randDist({ 1, 2, 2, 3, 3, 4 }, {2, 2, 0, 0, 2, 2}), 20000))*10)", 25);
  check("round(mean(repeat(randDist({0, 1}, {1, 4}), 20000))*10)", 6);
  check("round(mean(repeat(randDist({0, 1, 2}, {1, 4, 1}), 20000))*10)", 10);

  check("round(mean(repeat(randDist({0, 1, 2}, {0, 1, 0}), 20000))*10)", 10);
  check("round(mean(repeat(randDist({ 1, 2, 2, 3, 3, 4 }, { 2, 2, 0, 0, 2, 2 }), 20000))*10)", 25);
  check("round(mean(repeat(randDist({0, 1, 2}, {0, 1, 0}), 20000))*10)", 10);
  check("round(mean(repeat(randDist({ 0, 1, 3, 4 }, { 0, 2, 2, 0 }), 20000))*10)", 20);



  check("round(mean(repeat(randGamma(1, 1), 200000))*10)", 10);
  check("round(mean(repeat(randGamma(5, 0.5), 200000))*100)", 250);
  check("round(mean(repeat(randGamma(4, 2), 200000))*10)", 80);
  check("round(mean(repeat(randGamma(2.5, 1), 200000))*10)", 25);
  check("round(mean(repeat(randGamma(0.7, 2), 300000))*100)", 140);


  check("round(mean(repeat(randBeta(1, 2), 20000))*10)", Math.round((1/(1+2/1))*10));
  check("round(mean(repeat(randBeta(2, 1), 20000))*10)", Math.round((1/(1+1/2))*10));
  check("round(mean(repeat(randBeta(2.5, 3.5), 20000))*100)", 42);
  check("round(mean(repeat(randBeta(0.7, 0.3), 20000))*100)", 70);



  check("round(mean(repeat(randnormal({a: 0, b:10}, {a: .1, b: .2}){\"a\"}, 10000))*10)", 0);
  check("round(mean(repeat(randnormal({a: 0, b:10}, .1){\"b\"}, 10000))*10)", 100);
  check("round(mean(repeat(randnormal(10, {a: .1, b: .2}){\"b\"}, 10000))*10)", 100);
  check("round(mean(repeat(randnormal({a: 0, b:10}, {a: .1, b: .2}){\"b\"}, 10000))*10)", 100);
  // mismatched keys
  failure("randnormal({a: 0, b:10}, {x: .1, y: .2})", "Vector keys do not match between parameters");
  // non-named vectors
  failure("randnormal(1, {1, 2, 3})", "does not accepted non-named vectors");

  testConfig.globals = "";
});
