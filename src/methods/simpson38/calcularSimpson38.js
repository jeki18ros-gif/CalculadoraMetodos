import { evaluate } from "mathjs";

export function calcularSimpson38({ funcion, a, b, n, tolerancia = 0.00001 }) {
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

  if (!Number.isFinite(n) || n < 3 || !Number.isInteger(n)) {
    throw new Error("El número de subintervalos n debe ser un entero mayor o igual a 3.");
  }

  const nAjustado = n % 3 === 0 ? n : n + (3 - (n % 3));
  const h = (b - a) / nAjustado;
  const f = (valor) => {
    const resultado = evaluate(funcion, { x: valor });
    const numero = Number(resultado);
    if (!Number.isFinite(numero)) {
      throw new Error(`La función no está definida correctamente en x = ${valor}.`);
    }
    return numero;
  };

  let sumaNoMultiplo = 0;
  let sumaMultiplo = 0;
  const filas = [];

  for (let i = 0; i <= nAjustado; i++) {
    const xi = a + i * h;
    const fi = f(xi);
    const peso = i === 0 || i === nAjustado ? 1 : i % 3 === 0 ? 2 : 3;
    filas.push({ i, x: xi, f_x: fi, peso });
    if (i > 0 && i < nAjustado) {
      if (i % 3 === 0) sumaMultiplo += fi;
      else sumaNoMultiplo += fi;
    }
  }

  const integral = (3 * h / 8) * (f(a) + 3 * sumaNoMultiplo + 2 * sumaMultiplo + f(b));
  const errorFinal = Math.abs(integral) <= tolerancia ? 0 : null;

  return {
    raiz: integral,
    iteraciones: filas.length,
    errorFinal,
    convergio: true,
    filas,
    ajuste: nAjustado !== n ? `Se ajustó n a ${nAjustado} para cumplir la condición de múltiplo de 3.` : null,
  };
}
