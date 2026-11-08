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

export function parseMatrixFromText(text, label = "matriz") {
  if (!text || !String(text).trim()) {
    throw new Error(`Debes ingresar una ${label} válida.`);
  }

  const filas = String(text)
    .split(/[;\n]+/)
    .map((fila) => fila.trim())
    .filter(Boolean);

  if (filas.length === 0) {
    throw new Error(`Debes ingresar una ${label} válida.`);
  }

  const matriz = filas.map((fila) => {
    const valores = fila
      .split(/[\s,]+/)
      .map((valor) => valor.trim())
      .filter(Boolean)
      .map((valor) => Number(valor));

    if (valores.length === 0 || valores.some((valor) => !Number.isFinite(valor))) {
      throw new Error(`La ${label} contiene valores no numéricos.`);
    }

    return valores;
  });

  const ancho = matriz[0].length;
  if (matriz.some((fila) => fila.length !== ancho)) {
    throw new Error(`La ${label} debe tener filas con la misma longitud.`);
  }

  return matriz;
}

export function parseVectorFromText(text, label = "vector") {
  if (!text || !String(text).trim()) {
    throw new Error(`Debes ingresar un ${label} válido.`);
  }

  const texto = String(text).trim();
  const filas = texto
    .split(/[;\n]+/)
    .map((fila) => fila.trim())
    .filter(Boolean);

  if (filas.length === 0) {
    throw new Error(`Debes ingresar un ${label} válido.`);
  }

  const vector = [];
  filas.forEach((fila) => {
    const valores = fila
      .split(/[\s,]+/)
      .map((valor) => valor.trim())
      .filter(Boolean)
      .map((valor) => Number(valor));

    if (valores.length === 0 || valores.some((valor) => !Number.isFinite(valor))) {
      throw new Error(`El ${label} contiene valores no numéricos.`);
    }

    if (valores.length === 1) {
      vector.push(valores[0]);
      return;
    }

    vector.push(...valores);
  });

  return vector;
}
