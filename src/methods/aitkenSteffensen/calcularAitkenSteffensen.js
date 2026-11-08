import { evaluate } from "mathjs";

export function calcularAitkenSteffensen({
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

  const filas = [];
  let xAnt = xInicial;
  let convergio = false;
  let raiz = xInicial;

  for (let k = 0; k < maxIteraciones; k++) {
    const x1 = g(xAnt);
    const x2 = g(x1);
    const denominador = x2 - 2 * x1 + xAnt;

    if (Math.abs(denominador) < 1e-12) {
      throw new Error("El denominador de Aitken-Steffensen es cero o muy cercano a cero.");
    }

    const p = xAnt - ((x1 - xAnt) ** 2) / denominador;
    const error = Math.abs((p - xAnt) / p) * 100;
    convergio = error <= tol || Math.abs(p - xAnt) <= tol;

    filas.push({
      k,
      x0: xAnt,
      x1,
      x2,
      p,
      error,
      convergencia: convergio ? "converge" : "diverge",
    });

    raiz = p;
    if (convergio) break;
    xAnt = p;
  }

  return {
    raiz,
    iteraciones: filas.length,
    errorFinal: filas[filas.length - 1]?.error ?? 0,
    convergio,
    filas,
  };
}
