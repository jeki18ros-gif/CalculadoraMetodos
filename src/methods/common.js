import { derivative, evaluate } from "mathjs";

export function toNumber(value, fallback = null) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function evaluarExpresion(expresion, variable, valor) {
  if (!expresion || !expresion.trim()) {
    throw new Error("Debes ingresar una expresión matemática.");
  }

  const resultado = evaluate(expresion, { [variable]: valor });
  const numero = Number(resultado);

  if (!Number.isFinite(numero)) {
    throw new Error(`La función no está definida correctamente en ${variable} = ${valor}.`);
  }

  return numero;
}

export function evaluarFuncion(funcion, x) {
  return evaluarExpresion(funcion, "x", x);
}

export function obtenerDerivada(expresion, variable = "x") {
  if (!expresion || !expresion.trim()) {
    throw new Error("Debes ingresar la expresión de la derivada o la función original.");
  }

  try {
    return derivative(expresion, variable);
  } catch {
    throw new Error("No fue posible derivar la expresión ingresada.");
  }
}

export function evaluarDerivada(expresion, x) {
  const derivada = obtenerDerivada(expresion, "x");
  const numero = Number(derivada.evaluate({ x }));
  if (!Number.isFinite(numero)) {
    throw new Error(`La derivada no está definida correctamente en x = ${x}.`);
  }
  return numero;
}

export function errorPorcentual(actual, anterior) {
  if (actual === 0) {
    return 0;
  }

  if (anterior === null || anterior === undefined || anterior === 0) {
    return null;
  }

  return Math.abs((actual - anterior) / actual) * 100;
}

export function errorPorcentualRelativo(actual, anterior) {
  if (actual === 0) {
    return 0;
  }

  if (anterior === null || anterior === undefined) {
    return null;
  }

  return Math.abs((actual - anterior) / actual) * 100;
}
