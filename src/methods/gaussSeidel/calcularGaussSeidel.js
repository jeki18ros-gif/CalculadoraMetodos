import { parseMatrixFromText, parseVectorFromText } from "../common";

export function calcularGaussSeidel({ matrizA, vectorB, x0, tolerancia = 1e-6, maxIteraciones = 100 }) {
  const A = parseMatrixFromText(matrizA, "matriz A");
  const b = parseVectorFromText(vectorB, "vector b");
  const inicial = parseVectorFromText(x0 || "0;0;0", "vector inicial");

  if (A.length !== A[0].length) {
    throw new Error("La matriz A debe ser cuadrada.");
  }

  if (A.length !== b.length || A.length !== inicial.length) {
    throw new Error("La matriz A, el vector b y el vector inicial deben tener la misma dimensión.");
  }

  const filas = [];
  let x = [...inicial];
  let convergio = false;
  let error = Infinity;

  for (let k = 0; k < maxIteraciones; k++) {
    const nuevo = [...x];

    for (let i = 0; i < x.length; i++) {
      let suma = 0;
      for (let j = 0; j < x.length; j++) {
        if (i !== j) {
          suma += A[i][j] * (j < i ? nuevo[j] : x[j]);
        }
      }
      nuevo[i] = (b[i] - suma) / A[i][i];
    }

    error = Math.max(...nuevo.map((valor, i) => Math.abs(valor - x[i])));
    convergio = error <= tolerancia;
    filas.push({
      k,
      x: [...nuevo],
      error,
      convergencia: convergio ? "converge" : "diverge",
    });

    x = nuevo;
    if (convergio) break;
  }

  return {
    raiz: x,
    iteraciones: filas.length,
    errorFinal: error,
    convergio,
    filas,
  };
}
