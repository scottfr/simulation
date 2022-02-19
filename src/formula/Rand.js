import { ModelError } from "./ModelError.js";
import { jStat } from "../../vendor/jstat/jstat.js";


export class RandList {
  /**
   * @param {import("../Simulator").Simulator} simulate
   */
  constructor(simulate) {
    this.simulate = simulate;

    /** @type {number[]} */
    this.vals = [];
  }

  /**
	 * @param {number} i
   *
	 * @returns {number}
	 */
  get(i) {
    if (i > this.vals.length - 1) {
      for (let j = this.vals.length; j <= i; j++) {
        if (this.simulate.random) {
          this.vals.push(this.simulate.random());
        } else {
          this.vals.push(Math.random());
        }
      }
    }
    return this.vals[i];
  }
}


/**
 * @param {import("../Simulator").Simulator} simulate
 *
 * @returns {number}
 */
function getRandPos(simulate) {
  return Math.floor((simulate.time().value - simulate.timeStart.value) / simulate.timeStep.value);
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number=} minVal
 * @param {number=} maxVal
 *
 * @return {number}
 */
export function Rand(simulate, minVal=null, maxVal=null) {
  simulate.stochastic = true;

  if (minVal !== null && minVal !== undefined) {
    isNormalNumber(minVal, "Rand", "Minimum");
    isNormalNumber(maxVal, "Rand", "Maximum");

    return Rand(simulate) * (maxVal - minVal) + (0 + minVal);
  }
  if (simulate.RKOrder === 1) {
    if (simulate.random) {
      return simulate.random();
    } else {
      return Math.random();
    }
  }
  let RandPos = getRandPos(simulate);
  if (RandPos !== simulate.lastRandPos) {
    simulate.randLoc = -1;
    simulate.lastRandPos = RandPos;
  }
  while (simulate.previousRandLists.length <= RandPos) {
    simulate.previousRandLists.push(new RandList(simulate));
  }
  simulate.randLoc = simulate.randLoc + 1;
  return simulate.previousRandLists[RandPos].get(simulate.randLoc);
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number=} mu
 * @param {number=} sigma
 *
 * @returns {number}
 */
export function RandNormal(simulate, mu=null, sigma=null) {
  isNormalNumber(mu, "RandNormal", "mu");
  isNormalNumber(sigma, "RandNormal", "sigma");

  if (mu === null) {
    mu = 0;
  }
  if (sigma === null) {
    sigma = 1;
  }

  let z;
  z = Math.sqrt(-2 * Math.log(1 - Rand(simulate))) * Math.cos(Rand(simulate) * 2 * 3.141593);
  return z * sigma + (0 + mu);
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number=} lambda
 *
 * @returns {number}
 */
export function RandExp(simulate, lambda=null) {
  if (lambda === null) {
    lambda = 1;
  }

  if (lambda < 0) {
    throw new ModelError(`Lambda for RandExp must be greater than or equal to 0; got ${lambda}.`, {
      code: 4000
    });
  }

  isNormalNumber(lambda, "RandExp", "lambda");

  return -(1 / lambda) * Math.log(Rand(simulate));
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} mu
 * @param {number} sigma
 *
 * @returns {number}
 */
export function RandLognormal(simulate, mu, sigma) {
  isNormalNumber(mu, "RandLognormal", "mu");
  isNormalNumber(sigma, "RandLognormal", "sigma");


  if (mu <= 0) {
    throw new ModelError(`<i>Mu</i> for RandLognormal() must be greater than 0; got ${mu}.`, {
      code: 4001
    });
  }
  if (sigma <= 0) {
    throw new ModelError(`<i>Sigma</i> for RandLognormal() must be greater than 0; got ${sigma}.`, {
      code: 4002
    });
  }


  let lmu = Math.log(mu) - 0.5 * Math.log(1 + Math.pow(sigma / mu, 2));
  let lsigma = Math.sqrt(Math.log(1 + Math.pow(sigma / mu, 2)));

  return Math.exp(RandNormal(simulate, lmu, lsigma));
}


/**
 * Based on:
 *   https://github.com/numpy/numpy/blob/623bc1fae1d47df24e7f1e29321d0c0ba2771ce0/numpy/random/src/distributions/distributions.c
 *
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} count
 * @param {number} probability
 *
 * @returns {number}
 */
export function RandBinomial(simulate, count, probability) {
  isNormalNumber(count, "RandBinomial", "count");
  isNormalNumber(probability, "RandBinomial", "probability");
  if (count < 0) {
    throw new ModelError(`<i>Count</i> for RandBinomial() must be greater than or equal to 0; got ${count}.`, {
      code: 4003
    });
  }
  if (probability < 0 || probability > 1) {
    throw new ModelError(`<i>Probability</i> for RandBinomial() must be between 0 and 1 (inclusive); got ${probability}.`, {
      code: 4004
    });
  }

  if ((count === 0) || (probability === 0)) {
    return 0;
  }

  if (probability <= 0.5) {
    if (probability * count <= 30.0) {
      return randomBinomialInversion(simulate, count, probability);
    } else {
      return randomBinomialBtpe(simulate, count, probability);
    }
  } else {
    let q = 1.0 - probability;
    if (q * count <= 30.0) {
      return count - randomBinomialInversion(simulate, count, q);
    } else {
      return count - randomBinomialBtpe(simulate, count, q);
    }
  }
}

/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} n
 * @param {number} p
 */
function randomBinomialBtpe(simulate, n, p) {
  let r, q, fm, p1, xm, xl, xr, c, laml, lamr, p2, p3, p4;
  let a, u, v, s, F, rho, t, A, nrq, x1, x2, f1, f2, z, z2, w, w2, x;
  let m, y, k, i;


  r = Math.min(p, 1.0 - p);
  q = 1.0 - r;
  fm = n * r + r;
  m = Math.floor(fm);
  p1 = Math.floor(2.195 * Math.sqrt(n * r * q) - 4.6 * q) + 0.5;
  xm = m + 0.5;
  xl = xm - p1;
  xr = xm + p1;
  c = 0.134 + 20.5 / (15.3 + m);
  a = (fm - xl) / (fm - xl * r);
  laml = a * (1.0 + a / 2.0);
  a = (xr - fm) / (xr * q);
  lamr = a * (1.0 + a / 2.0);
  p2 = p1 * (1.0 + 2.0 * c);
  p3 = p2 + c / laml;
  p4 = p3 + c / lamr;


  // eslint-disable-next-line
  while (true) {
    nrq = n * r * q;
    u = Rand(simulate) * p4;
    v = Rand(simulate);
    if (!(u > p1)) {
      y = Math.floor(xm - p1 * v + u);
      break;
    }


    if (!(u > p2)) {
      x = xl + (u - p1) / c;
      v = v * c + 1.0 - Math.abs(m - x + 0.5) / p1;
      if (v > 1.0){
        continue;
      }
      y = Math.floor(x);
    } else if (!(u > p3)) {
      y = Math.floor(xl + Math.log(v) / laml);
      /* Reject if v==0.0 since previous cast is undefined */
      if ((y < 0) || (v === 0.0)){
        continue;
      }
      v = v * (u - p2) * laml;
    } else {
      y = Math.floor(xr - Math.log(v) / lamr);
      /* Reject if v==0.0 since previous cast is undefined */
      if ((y > n) || (v === 0.0)) {
        continue;
      }
      v = v * (u - p3) * lamr;
    }

    k = Math.abs(y - m);
    if (!((k > 20) && (k < ((nrq) / 2.0 - 1)))) {
      s = r / q;
      a = s * (n + 1);
      F = 1.0;
      if (m < y) {
        for (i = m + 1; i <= y; i++) {
          F *= (a / i - s);
        }
      } else if (m > y) {
        for (i = y + 1; i <= m; i++) {
          F /= (a / i - s);
        }
      }
      if (v > F) {
        continue;
      }
      break;
    } else {
      rho =
      (k / (nrq)) * ((k * (k / 3.0 + 0.625) + 0.16666666666666666) / nrq + 0.5);
      t = -k * k / (2 * nrq);
      /* log(0.0) ok here */
      A = Math.log(v);
      if (A < (t - rho)){
        break;
      }
      if (A > (t + rho)) {
        continue;
      }

      x1 = y + 1;
      f1 = m + 1;
      z = n + 1 - m;
      w = n - y + 1;
      x2 = x1 * x1;
      f2 = f1 * f1;
      z2 = z * z;
      w2 = w * w;
      if (A > (xm * Math.log(f1 / x1) + (n - m + 0.5) * Math.log(z / w) +
           (y - m) * Math.log(w * r / (x1 * q)) +
           (13680. - (462. - (132. - (99. - 140. / f2) / f2) / f2) / f2) / f1 /
               166320. +
           (13680. - (462. - (132. - (99. - 140. / z2) / z2) / z2) / z2) / z /
               166320. +
           (13680. - (462. - (132. - (99. - 140. / x2) / x2) / x2) / x2) / x1 /
               166320. +
           (13680. - (462. - (132. - (99. - 140. / w2) / w2) / w2) / w2) / w /
               166320.)) {
        continue;
      }
    }
  }

  if (p > 0.5) {
    y = n - y;
  }

  return y;
}

/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} n
 * @param {number} p
 */
function randomBinomialInversion(simulate, n, p) {
  let q, qn, np, px, U;
  let X, bound;

  q = 1.0 - p;
  qn = Math.exp(n * Math.log(q));
  np = n * p;
  bound = Math.min(n, np + 10.0 * Math.sqrt(np * q + 1));

  X = 0;
  px = qn;
  U = Rand(simulate);
  while (U > px) {
    X++;
    if (X > bound) {
      X = 0;
      px = qn;
      U = Rand(simulate);
    } else {
      U -= px;
      px = ((n - X + 1) * p * px) / (X * q);
    }
  }
  return X;
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} successes
 * @param {number} probability
 *
 * @returns {number}
 */
export function RandNegativeBinomial(simulate, successes, probability) {
  isNormalNumber(successes, "RandNegativeBinomial", "successes");
  isNormalNumber(probability, "RandNegativeBinomial", "probability");
  if (successes < 0) {
    throw new ModelError(`<i>Successes</i> for RandNegativeBinomial() must be greater than or equal to 0; got ${successes}.`, {
      code: 4005
    });
  }
  if (probability < 0 || probability > 1) {
    throw new ModelError(`<i>Probability</i> for RandNegativeBinomial() must be between 0 and 1 (inclusive); got ${probability}.`, {
      code: 4006
    });
  }

  let i = 0;
  let s = 0;
  while (s < successes) {
    if (Rand(simulate) <= probability) {
      s = s + 1;
    }
    i = i + 1;
  }
  return i;
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} lambda
 *
 * @returns {number}
 */
export function RandPoisson(simulate, lambda) {
  isNormalNumber(lambda, "RandPoisson", "lambda");
  if (lambda < 0) {
    throw new ModelError(`<i>Lambda</i> for RandPoisson() must be greater than or equal to 0; got ${lambda}.`, {
      code: 4007
    });
  }


  if (lambda < 50) {
    // Slow method suitable for small lambda's
    // https://en.wikipedia.org/wiki/Poisson_distribution#Generating_Poisson-distributed_random_variables
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    // eslint-disable-next-line
		while (true) {
      k = k + 1;
      p = p * Rand(simulate);
      if (!(p > L)) {
        break;
      }
    }
    return k - 1;
  } else {
    // Approximation suitable for large lambda's
    // https://www.johndcook.com/blog/2010/06/14/generating-poisson-random-values/
    let c = 0.767 - 3.36 / lambda;
    let beta = Math.PI / Math.sqrt(3.0 * lambda);
    let alpha = beta * lambda;
    let k = Math.log(c) - lambda - Math.log(beta);

    // eslint-disable-next-line
		while (true) {
      let u = Rand(simulate);
      let x = (alpha - Math.log((1.0 - u) / u)) / beta;
      let n = Math.floor(x + 0.5);
      if (n < 0) {
        continue;
      }
      let v = Rand(simulate);
      let y = alpha - beta * x;
      let lhs = y + Math.log(v / Math.pow(1.0 + Math.exp(y), 2));
      let rhs = k + n * Math.log(lambda) - jStat.gammaln(n + 1);
      if (lhs <= rhs) {
        return n;
      }
    }
  }
}

/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} alpha
 * @param {number} beta
 *
 * @returns {number}
 */
export function RandGamma(simulate, alpha, beta) {
  isNormalNumber(alpha, "RandGamma", "alpha");
  isNormalNumber(beta, "RandGamma", "beta");

  if (alpha <= 0) {
    throw new ModelError(`<i>Alpha</i> (shape parameter) for RandGamma() must be greater than 0; got ${alpha}.`, {
      code: 4008
    });
  }
  if (beta <= 0) {
    throw new ModelError(`<i>Beta</i> (rate parameter) for RandGamma() must be greater than 0; got ${beta}.`, {
      code: 4009
    });
  }


  let temp = 1;
  for (let i = 1; i <= alpha; i++) {
    temp = temp * Rand(simulate);
  }
  return -beta * Math.log(temp);
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} alpha
 * @param {number} beta
 *
 * @returns {number}
 */
export function RandBeta(simulate, alpha, beta) {
  isNormalNumber(alpha, "RandBeta", "alpha");
  isNormalNumber(beta, "RandBeta", "beta");

  if (alpha <= 0) {
    throw new ModelError(`<i>Alpha</i> for RandBeta() must be greater than 0; got ${alpha}.`, {
      code: 4010
    });
  }
  if (beta <= 0) {
    throw new ModelError(`<i>Beta</i> for RandBeta() must be greater than 0; got ${beta}.`, {
      code: 4011
    });
  }

  let x = RandGamma(simulate, alpha, 1);
  let y = RandGamma(simulate, beta, 1);
  return x / (x + y);
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number} minimum
 * @param {number} maximum
 * @param {number} peak
 *
 * @returns {number}
 */
export function RandTriangular(simulate, minimum, maximum, peak) {
  isNormalNumber(minimum, "RandTriangular", "minimum");
  isNormalNumber(maximum, "RandTriangular", "maximum");
  isNormalNumber(peak, "RandTriangular", "peak");

  let a = 0 + minimum;
  let b = 0 + maximum;
  let c = 0 + peak;

  if (a === b) {
    throw new ModelError("Maximum can't equal the minimum for the triangular distribution.", {
      code: 4012
    });
  }

  if (c < a || c > b) {
    throw new ModelError("The peak must be within the maximum and minimum for the triangular distribution.", {
      code: 4013
    });
  }

  let fc = (c - a) / (b - a);

  let u = Rand(simulate);

  if (u < fc) {
    return a + Math.sqrt(u * (b - a) * (c - a));
  } else {
    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
  }
}


/**
 * @param {import("../Simulator").Simulator} simulate
 * @param {number[]} x
 * @param {number[]} y
 *
 * @returns {number}
 */
export function RandDist(simulate, x, y) {
  if (x.length !== y.length) {
    throw new ModelError("The lengths of the 'x' and 'y' vectors must be the same.", {
      code: 4014
    });
  }
  if (x.length < 2) {
    throw new ModelError("There must be at least 2 points in a distribution to generate a random number.", {
      code: 4015
    });
  }
  for (let i = 0; i < x.length; i++) {
    isNormalNumber(x[i], "RandDist", "x");
    isNormalNumber(y[i], "RandDist", "y");
    if (y[i] < 0) {
      throw new ModelError("The y values of RandDist cannot be negative.", {
        code: 4016
      });
    }
  }

  let area = 0;
  for (let i = 0; i < x.length - 1; i++) {
    area += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
  }
  if (area === 0) {
    throw new ModelError("The area of the distribution in RandDist cannot be 0.", {
      code: 4017
    });
  }

  let a = area * Rand(simulate);
  area = 0;
  for (let i = 0; i < x.length - 1; i++) {
    let nextArea = (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
    if (a > area && a < area + nextArea) {
      let neededArea = a - area;
      let slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
      let dist;
      if (slope === 0) {
        dist = neededArea / y[i];
      } else {
        dist = (-y[i] + Math.sqrt(Math.pow(y[i], 2) + 2 * slope * neededArea)) / slope;
      }

      return x[i] + dist;
    }
    area += nextArea;
  }

}


/**
 * @param {number} x
 * @param {string} name
 * @param {string} v
 */
function isNormalNumber(x, name, v) {
  if (isNaN(x)) {
    throw new ModelError(`The <i>${v}</i> passed to ${name}() was not a number.`, {
      code: 4018
    });
  }

  if (!isFinite(x)) {
    throw new ModelError(`The <i>${v}</i> passed to ${name}() must not be infinite.`, {
      code: 4019
    });
  }

  if (x > 1e+15) {
    // randBinomial fails at a count of around 1e26. Let's add a reasonable maximum to all these
    // functions
    throw new ModelError(`The <i>${v}</i> passed to ${name}() must not be not be greater than 1e15 (got ${x}).`, {
      code: 4020
    });
  }
}
