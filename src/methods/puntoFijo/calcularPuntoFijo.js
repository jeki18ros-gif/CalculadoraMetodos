import { derivative, evaluate } from "mathjs";

export function calcularPuntoFijo({
  gFuncion,
  x0,
  tolerancia = 0.00001,
  maxIteraciones = 1000,
}) {
  const xInicial = Number(x0);
  const tol = Number(tolerancia);

  if (!gFuncion || !gFuncion.trim()) {
    throw new Error("Ingresa la función de iteración g(x).");
  }

  if (!Number.isFinite(xInicial)) {
    throw new Error("El valor inicial debe ser numérico.");
  }

  if (!Number.isFinite(tol) || tol <= 0) {
    throw new Error("La tolerancia debe ser mayor que cero.");
  }

  const g = (x) => {
    const result = Number(evaluate(gFuncion, { x }));
    if (!Number.isFinite(result)) {
      throw new Error(`g(x) no está definida correctamente en x = ${x}.`);
    }
    return result;
  };

  const derivada = derivative(gFuncion, "x");
  const dg0 = Number(derivada.evaluate({ x: xInicial }));

  if (!Number.isFinite(dg0)) {
    throw new Error("La derivada de g(x) no es finita en x0.");
  }

  if (Math.abs(dg0) >= 1) {
    throw new Error("No se cumple la condición de convergencia: |g'(x0)| < 1.");
  }

  const filas = [];
  let xAnterior = xInicial;
  let convergio = false;
  let raiz = null;

  for (let k = 0; k < maxIteraciones; k++) {
    const xNuevo = g(xAnterior);
    const error = Math.abs((xNuevo - xAnterior) / xNuevo) * 100;
    convergio = error <= tol || Math.abs(xNuevo - xAnterior) <= tol;

    filas.push({
      k,
      xk: xAnterior,
      gk: g(xAnterior),
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
