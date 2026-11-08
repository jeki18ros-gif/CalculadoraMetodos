import { evaluate } from "mathjs";

export function calcularSimpson13({ funcion, a, b, n, tolerancia = 0.00001 }) {
  a = Number(a);
  b = Number(b);
  n = Number(n);
  tolerancia = Number(tolerancia);

  if (!funcion || !funcion.trim()) {
    throw new Error("Ingresa una función matemática.");
  }

  if (!Number.isFinite(a) || !Number.isFinite(b) || a === b) {
    throw new Error("Los límites a y b deben ser finitos y distintos.");
  }

  if (!Number.isFinite(n) || n < 2 || !Number.isInteger(n)) {
    throw new Error("El número de subintervalos n debe ser un entero mayor o igual a 2.");
  }

  const nAjustado = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / nAjustado;
  const f = (valor) => {
    const resultado = evaluate(funcion, { x: valor });
    const numero = Number(resultado);
    if (!Number.isFinite(numero)) {
      throw new Error(`La función no está definida correctamente en x = ${valor}.`);
    }
    return numero;
  };

  let sumaImpar = 0;
  let sumaPar = 0;
  const filas = [];

  for (let i = 0; i <= nAjustado; i++) {
    const xi = a + i * h;
    const fi = f(xi);
    filas.push({ i, x: xi, f_x: fi, peso: i === 0 || i === nAjustado ? 1 : i % 2 === 0 ? 2 : 4 });
    if (i > 0 && i < nAjustado) {
      if (i % 2 === 0) sumaPar += fi;
      else sumaImpar += fi;
    }
  }

  const integral = (h / 3) * (f(a) + 4 * sumaImpar + 2 * sumaPar + f(b));
  const errorFinal = Math.abs(integral) <= tolerancia ? 0 : null;

  return {
    raiz: integral,
    iteraciones: filas.length,
    errorFinal,
    convergio: true,
    filas,
    ajuste: nAjustado !== n ? `Se ajustó n a ${nAjustado} para cumplir la paridad requerida.` : null,
  };
}
