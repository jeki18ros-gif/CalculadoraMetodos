
import { evaluate } from "mathjs";

export function calcularBiseccion({
  funcion,
  a,
  b,
  tolerancia = 0.00001,
  maxIteraciones = 1000,
}) {
  a = Number(a);
  b = Number(b);
  tolerancia = Number(tolerancia);

  if (!funcion || !funcion.trim()) {
    throw new Error("Ingresa una función matemática.");
  }

  if (!Number.isFinite(a) || !Number.isFinite(b) || a >= b) {
    throw new Error("El intervalo debe cumplir ak < bk.");
  }

  if (!Number.isFinite(tolerancia) || tolerancia <= 0) {
    throw new Error("La tolerancia debe ser mayor que cero.");
  }

  const f = (x) => {
    const resultado = evaluate(funcion, { x });
    const numero = Number(resultado);

    if (!Number.isFinite(numero)) {
      throw new Error(`La función no está definida correctamente en x = ${x}.`);
    }

    return numero;
  };

  let fa = f(a);
  let fb = f(b);

  if (fa === 0 || fb === 0) {
    const raiz = fa === 0 ? a : b;

    return {
      raiz,
      iteraciones: 0,
      errorFinal: 0,
      convergio: true,
      filas: [{
        k: 0,
        ak: a,
        ck: raiz,
        bk: b,
        fak: fa,
        fck: 0,
        fbk: fb,
        producto: 0,
        error: null,
        convergencia: "converge",
      }],
    };
  }

  if (fa * fb > 0) {
    throw new Error(
      "No se puede aplicar Bisección: f(ak) y f(bk) deben tener signos opuestos."
    );
  }

  const filas = [];
  let anteriorC = null;
  let convergio = false;
  let raiz = null;

  for (let k = 0; k < maxIteraciones; k++) {
    const ak = a;
    const bk = b;
    const ck = (ak + bk) / 2;

    const fak = f(ak);
    const fck = f(ck);
    const fbk = f(bk);

    const producto = fak * fck;

    const error = anteriorC === null
      ? null
      : Math.abs((ck - anteriorC) / ck) * 100;

    convergio =
      fck === 0 ||
      (error !== null && error <= tolerancia);

    filas.push({
      k,
      ak,
      ck,
      bk,
      fak,
      fck,
      fbk,
      producto,
      error,
      convergencia: convergio ? "converge" : "diverge",
    });

    raiz = ck;

    if (convergio) break;

    // Seleccionar el nuevo intervalo
    if (producto < 0) {
      b = ck;
    } else {
      a = ck;
    }

    anteriorC = ck;
  }

  return {
    raiz,
    iteraciones: filas.length,
    errorFinal: filas[filas.length - 1].error,
    convergio,
    filas,
  };
}
