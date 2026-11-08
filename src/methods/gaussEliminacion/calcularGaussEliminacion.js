import { parseMatrixFromText, parseVectorFromText } from "../common";

export function calcularGaussEliminacion({ matrizA, vectorB, tolerancia = 1e-10 }) {
  const A = parseMatrixFromText(matrizA, "matriz A");
  const b = parseVectorFromText(vectorB, "vector b");

  if (A.length !== A[0].length) {
    throw new Error("La matriz A debe ser cuadrada.");
  }

  if (A.length !== b.length) {
    throw new Error("La matriz A y el vector b deben tener la misma dimensión.");
  }

  const n = A.length;
  const matriz = A.map((fila, i) => [...fila, b[i]]);
  const pasos = [];
  let errorFinal = 0;

  for (let k = 0; k < n - 1; k++) {
    let pivoteIndex = k;
    let pivote = Math.abs(matriz[k][k]);

    for (let i = k + 1; i < n; i++) {
      if (Math.abs(matriz[i][k]) > pivote) {
        pivote = Math.abs(matriz[i][k]);
        pivoteIndex = i;
      }
    }

    if (pivote < tolerancia) {
      throw new Error("La matriz es singular o casi singular en el método de Gauss.");
    }

    if (pivoteIndex !== k) {
      [matriz[k], matriz[pivoteIndex]] = [matriz[pivoteIndex], matriz[k]];
    }

    for (let i = k + 1; i < n; i++) {
      const factor = matriz[i][k] / matriz[k][k];
      for (let j = k; j <= n; j++) {
        matriz[i][j] -= factor * matriz[k][j];
      }
    }

    pasos.push({ paso: `eliminación ${k + 1}`, pivot: matriz[k][k], error: null, solucion: [...matriz.map((fila) => [...fila])] });
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let suma = 0;
    for (let j = i + 1; j < n; j++) {
      suma += matriz[i][j] * x[j];
    }
    x[i] = (matriz[i][n] - suma) / matriz[i][i];
  }

  const residuos = A.map((fila, i) => Math.abs(b[i] - fila.reduce((acc, valor, j) => acc + valor * x[j], 0)));
  errorFinal = Math.max(...residuos);

  pasos.push({ paso: "solución", pivot: null, error: errorFinal, solucion: [...x] });

  return {
    raiz: x,
    iteraciones: pasos.length,
    errorFinal,
    convergio: true,
    filas: pasos,
  };
}
