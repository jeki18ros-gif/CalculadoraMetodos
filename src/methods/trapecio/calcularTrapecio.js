import { evaluate } from "mathjs";

export function calcularTrapecio({ funcion, a, b, n, tolerancia = 0.00001 }) {
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

  if (!Number.isFinite(n) || n < 1 || !Number.isInteger(n)) {
    throw new Error("El número de subintervalos n debe ser un entero positivo.");
  }

  const f = (valor) => {
    const resultado = evaluate(funcion, { x: valor });
    const numero = Number(resultado);
    if (!Number.isFinite(numero)) {
      throw new Error(`La función no está definida correctamente en x = ${valor}.`);
    }
    return numero;
  };

  const h = (b - a) / n;
  let suma = f(a) + f(b);
  const filas = [];

  for (let i = 1; i < n; i++) {
    const xi = a + i * h;
    const fi = f(xi);
    suma += 2 * fi;
    filas.push({ i, x: xi, f_x: fi, suma_parcial: suma });
  }

  const integral = (h / 2) * suma;
  const errorFinal = Math.abs(integral) <= tolerancia ? 0 : null;

  return {
    raiz: integral,
    iteraciones: filas.length,
    errorFinal,
    convergio: true,
    filas,
  };
}
