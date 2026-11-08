import { derivative, evaluate } from "mathjs";

export function calcularNewtonRaphson({
  funcion,
  derivada,
  x0,
  tolerancia = 0.00001,
  maxIteraciones = 1000,
}) {
  const xInicial = Number(x0);
  const tol = Number(tolerancia);

  if (!funcion || !funcion.trim()) {
    throw new Error("Ingresa la función f(x).");
  }

  if (!Number.isFinite(xInicial)) {
    throw new Error("El valor inicial debe ser numérico.");
  }

  if (!Number.isFinite(tol) || tol <= 0) {
    throw new Error("La tolerancia debe ser mayor que cero.");
  }

  const f = (x) => {
    const result = Number(evaluate(funcion, { x }));
    if (!Number.isFinite(result)) {
      throw new Error(`f(x) no está definida correctamente en x = ${x}.`);
    }
    return result;
  };

  const derivadaExp = derivada && derivada.trim() ? derivada : derivative(funcion, "x").toString();
  const df = (x) => {
    const result = Number(evaluate(derivadaExp, { x }));
    if (!Number.isFinite(result)) {
      throw new Error(`f'(x) no está definida correctamente en x = ${x}.`);
    }
    return result;
  };

  const filas = [];
  let xAnterior = xInicial;
  let convergio = false;
  let raiz = null;

  for (let k = 0; k < maxIteraciones; k++) {
    const fx = f(xAnterior);
    const dfx = df(xAnterior);

    if (Math.abs(dfx) < 1e-12) {
      throw new Error("La derivada es cero o muy cercana a cero; Newton-Raphson no puede aplicarse.");
    }

    const xNuevo = xAnterior - fx / dfx;
    const error = Math.abs((xNuevo - xAnterior) / xNuevo) * 100;
    convergio = error <= tol || Math.abs(fx) <= tol;

    filas.push({
      k,
      xk: xAnterior,
      f_xk: fx,
      dfx,
      xk1: xNuevo,
      error,
      convergencia: convergio ? "converge" : "diverge",
    });

    raiz = xNuevo;
    if (convergio) break;
    xAnterior = xNuevo;
  }

  return {
    raiz,
    iteraciones: filas.length,
    errorFinal: filas[filas.length - 1]?.error ?? 0,
    convergio,
    filas,
  };
}
