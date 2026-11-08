import { evaluate } from "mathjs";

export function calcularEuler({ funcion, x0, y0, h, n, tolerancia = 0.00001 }) {
  x0 = Number(x0);
  y0 = Number(y0);
  h = Number(h);
  n = Number(n);
  tolerancia = Number(tolerancia);

  if (!funcion || !funcion.trim()) {
    throw new Error("Ingresa una función matemática.");
  }

  if (!Number.isFinite(x0) || !Number.isFinite(y0) || !Number.isFinite(h) || h === 0 || !Number.isFinite(n) || n < 1) {
    throw new Error("Los datos iniciales x0, y0, h y n deben ser válidos.");
  }

  const f = (x, y) => {
    const resultado = evaluate(funcion, { x, y });
    const numero = Number(resultado);
    if (!Number.isFinite(numero)) {
      throw new Error(`La función no está definida correctamente en x = ${x}, y = ${y}.`);
    }
    return numero;
  };

  let x = x0;
  let y = y0;
  const filas = [];

  for (let i = 0; i < n; i++) {
    const k1 = f(x, y);
    const ySiguiente = y + h * k1;
    const error = Math.abs(ySiguiente - y) <= tolerancia ? 0 : null;
    filas.push({ n: i, x, y, k1, y_siguiente: ySiguiente, error, convergencia: error === 0 ? "converge" : "iteración" });
    x += h;
    y = ySiguiente;
  }

  return {
    raiz: y,
    iteraciones: filas.length,
    errorFinal: filas[filas.length - 1]?.error ?? null,
    convergio: true,
    filas,
  };
}
