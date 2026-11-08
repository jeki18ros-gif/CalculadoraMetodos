import { evaluate } from "mathjs";

export function calcularSecante({
  funcion,
  x0,
  x1,
  tolerancia = 0.00001,
  maxIteraciones = 1000,
}) {
  x0 = Number(x0);
  x1 = Number(x1);
  tolerancia = Number(tolerancia);

  if (!funcion || !funcion.trim()) {
    throw new Error("Ingresa una función matemática.");
  }

  if (!Number.isFinite(x0) || !Number.isFinite(x1)) {
    throw new Error("Los valores iniciales x0 y x1 deben ser numéricos.");
  }

  if (!Number.isFinite(tolerancia) || tolerancia <= 0) {
    throw new Error("La tolerancia debe ser mayor que cero.");
  }

  const f = (valor) => {
    const resultado = evaluate(funcion, { x: valor });
    const numero = Number(resultado);
    if (!Number.isFinite(numero)) {
      throw new Error(`La función no está definida correctamente en x = ${valor}.`);
    }
    return numero;
  };

  const filas = [];
  let anterior = null;
  let convergio = false;
  let raiz = x1;

  for (let k = 0; k < maxIteraciones; k++) {
    const fx0 = f(x0);
    const fx1 = f(x1);
    const denominador = fx1 - fx0;

    if (Math.abs(denominador) < Number.EPSILON) {
      throw new Error("La secante se anula: f(x1) - f(x0) es demasiado pequeño.");
    }

    const x2 = x1 - (fx1 * (x1 - x0)) / denominador;
    const error = anterior === null ? null : Math.abs((x2 - anterior) / x2) * 100;
    convergio = error === null ? false : error <= tolerancia;

    filas.push({
      k,
      x0,
      x1,
      f_x0: fx0,
      f_x1: fx1,
      x2,
      error,
      convergencia: convergio ? "converge" : "diverge",
    });

    raiz = x2;

    if (convergio) break;

    x0 = x1;
    x1 = x2;
    anterior = x2;
  }

  return {
    raiz,
    iteraciones: filas.length,
    errorFinal: filas[filas.length - 1]?.error ?? null,
    convergio,
    filas,
  };
}
