function leerNumero(valor, etiqueta) {
  if (String(valor).trim() === "") {
    throw new Error(`Ingresa ${etiqueta}.`);
  }

  const numero = Number(valor);
  if (!Number.isFinite(numero)) {
    throw new Error(`${etiqueta} debe ser un número válido.`);
  }

  return numero;
}

function validarTexto(valor, etiqueta) {
  if (!String(valor).trim()) {
    throw new Error(`Ingresa ${etiqueta}.`);
  }

  return String(valor).trim();
}

function asegurarFinito(valor, etiqueta) {
  if (!Number.isFinite(valor)) {
    throw new Error(`No fue posible calcular ${etiqueta} con los valores ingresados.`);
  }

  return valor;
}

export function calcularMedicionesDirectas({
  magnitud,
  unidad,
  mediciones,
  incertidumbreInstrumental,
}) {
  const nombreMagnitud = validarTexto(magnitud, "la magnitud física");
  const unidadMedida = validarTexto(unidad, "la unidad de medida");
  if (!Array.isArray(mediciones) || mediciones.length < 2) {
    throw new Error("Se necesitan al menos dos mediciones.");
  }

  const valores = mediciones.map((valor, indice) =>
    leerNumero(valor, `la medición ${indice + 1}`)
  );
  const errorInstrumental = leerNumero(
    incertidumbreInstrumental,
    "la incertidumbre instrumental"
  );

  if (errorInstrumental < 0) {
    throw new Error("La incertidumbre instrumental no puede ser negativa.");
  }

  const media = valores.reduce((total, valor) => total + valor, 0) / valores.length;
  const sumaCuadrados = valores.reduce(
    (total, valor) => total + (valor - media) ** 2,
    0
  );
  const desviacionEstandar = Math.sqrt(sumaCuadrados / (valores.length - 1));
  const errorEstandar = desviacionEstandar / Math.sqrt(valores.length);
  const incertidumbreCombinada = Math.sqrt(
    errorEstandar ** 2 + errorInstrumental ** 2
  );
  const coeficienteVariacion =
    media === 0 ? null : (desviacionEstandar / Math.abs(media)) * 100;
  const limiteInferior = media - incertidumbreCombinada;
  const limiteSuperior = media + incertidumbreCombinada;

  asegurarFinito(media, "el promedio");
  asegurarFinito(desviacionEstandar, "la desviación estándar");
  asegurarFinito(errorEstandar, "el error estándar");
  asegurarFinito(incertidumbreCombinada, "la incertidumbre combinada");
  asegurarFinito(limiteInferior, "el límite inferior");
  asegurarFinito(limiteSuperior, "el límite superior");
  if (coeficienteVariacion !== null) {
    asegurarFinito(coeficienteVariacion, "el coeficiente de variación");
  }

  return {
    magnitud: nombreMagnitud,
    unidad: unidadMedida,
    mediciones: valores,
    cantidad: valores.length,
    media,
    desviacionEstandar,
    errorEstandar,
    incertidumbreInstrumental: errorInstrumental,
    incertidumbreCombinada,
    limiteInferior,
    limiteSuperior,
    coeficienteVariacion,
  };
}

export function calcularMedicionesIndirectas({
  opcion,
  valorA,
  incertidumbreA,
  unidadA,
  valorB,
  incertidumbreB,
  unidadB,
  exponente,
  unidadY,
  nombreY,
}) {
  const a = leerNumero(valorA, "el valor de A");
  const deltaA = leerNumero(incertidumbreA, "la incertidumbre de A");
  const unidadMagnitudA = validarTexto(unidadA, "la unidad de A");
  const unidadResultado = validarTexto(unidadY, "la unidad del resultado Y");
  const magnitudResultado = validarTexto(nombreY, "el nombre de la magnitud final");

  if (deltaA < 0) {
    throw new Error("La incertidumbre de A no puede ser negativa.");
  }

  let resultado;
  let derivadaA;
  let derivadaB = null;
  let contribucionA;
  let contribucionB = null;
  let deltaY;
  let formula;
  let b = null;
  let deltaB = null;
  let unidadMagnitudB = null;

  if (["suma", "resta", "producto", "division"].includes(opcion)) {
    b = leerNumero(valorB, "el valor de B");
    deltaB = leerNumero(incertidumbreB, "la incertidumbre de B");
    unidadMagnitudB = validarTexto(unidadB, "la unidad de B");

    if (deltaB < 0) {
      throw new Error("La incertidumbre de B no puede ser negativa.");
    }

    if (opcion === "suma") {
      resultado = a + b;
      derivadaA = 1;
      derivadaB = 1;
      formula = "Y = A + B";
    } else if (opcion === "resta") {
      resultado = a - b;
      derivadaA = 1;
      derivadaB = -1;
      formula = "Y = A - B";
    } else if (opcion === "producto") {
      resultado = a * b;
      derivadaA = b;
      derivadaB = a;
      formula = "Y = A × B";
    } else {
      if (b === 0) {
        throw new Error("No se puede dividir entre cero.");
      }

      resultado = a / b;
      derivadaA = 1 / b;
      derivadaB = -a / b ** 2;
      formula = "Y = A / B";
    }

    contribucionA = derivadaA * deltaA;
    contribucionB = derivadaB * deltaB;
    deltaY = Math.sqrt(contribucionA ** 2 + contribucionB ** 2);
  } else if (opcion === "potencia") {
    const p = leerNumero(exponente, "el exponente p");
    if (a === 0 && p < 0) {
      throw new Error("No se puede elevar cero a un exponente negativo.");
    }
    if (a === 0 && p > 0 && p < 1) {
      throw new Error("La derivada de A^p no está definida para esos valores.");
    }

    resultado = a ** p;
    derivadaA = p === 0 ? 0 : p * a ** (p - 1);
    contribucionA = derivadaA * deltaA;
    deltaY = Math.abs(contribucionA);
    formula = `Y = A^${p}`;
  } else {
    throw new Error("Selecciona una operación válida.");
  }

  asegurarFinito(resultado, "el resultado Y");
  asegurarFinito(derivadaA, "la derivada parcial respecto a A");
  if (derivadaB !== null) {
    asegurarFinito(derivadaB, "la derivada parcial respecto a B");
  }
  asegurarFinito(contribucionA, "la contribución de A");
  if (contribucionB !== null) {
    asegurarFinito(contribucionB, "la contribución de B");
  }
  asegurarFinito(deltaY, "la incertidumbre absoluta");
  asegurarFinito(resultado - deltaY, "el límite inferior");
  asegurarFinito(resultado + deltaY, "el límite superior");

  return {
    formula,
    nombreY: magnitudResultado,
    unidadY: unidadResultado,
    valorA: a,
    incertidumbreA: deltaA,
    unidadA: unidadMagnitudA,
    valorB: b,
    incertidumbreB: deltaB,
    unidadB: unidadMagnitudB,
    resultado,
    derivadaA,
    derivadaB,
    contribucionA: Math.abs(contribucionA),
    contribucionB: contribucionB === null ? null : Math.abs(contribucionB),
    incertidumbreCombinada: deltaY,
    limiteInferior: resultado - deltaY,
    limiteSuperior: resultado + deltaY,
  };
}
