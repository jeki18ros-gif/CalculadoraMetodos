import { evaluarFuncion } from "../common.js";

export function calcularReglaFalsa({
  funcion,
  a,
  b,
  tolerancia = 0.00001,
  maxIteraciones = 1000,
}) {
  let aNum = Number(a);
  let bNum = Number(b);
  const tol = Number(tolerancia);

  if (!funcion || !funcion.trim()) {
    throw new Error("Ingresa una función matemática.");
  }

  if (!Number.isFinite(aNum) || !Number.isFinite(bNum) || aNum >= bNum) {
    throw new Error("El intervalo debe cumplir ak < bk.");
  }

  if (!Number.isFinite(tol) || tol <= 0) {
    throw new Error("La tolerancia debe ser mayor que cero.");
  }

  const f = (x) => evaluarFuncion(funcion, x);
  let fa = f(aNum);
  let fb = f(bNum);

  if (fa === 0) {
    return { raiz: aNum, iteraciones: 0, errorFinal: 0, convergio: true, filas: [{ k: 0, ak: aNum, ck: aNum, bk: bNum, fak: fa, fck: 0, fbk: fb, error: 0, convergencia: "converge" }] };
  }

  if (fb === 0) {
    return { raiz: bNum, iteraciones: 0, errorFinal: 0, convergio: true, filas: [{ k: 0, ak: aNum, ck: bNum, bk: bNum, fak: fa, fck: 0, fbk: fb, error: 0, convergencia: "converge" }] };
  }

  if (fa * fb > 0) {
    throw new Error("No se puede aplicar Regla Falsa: f(ak) y f(bk) deben tener signos opuestos.");
  }

  const filas = [];
  let anteriorC = null;
  let convergio = false;
  let raiz = null;

  for (let k = 0; k < maxIteraciones; k++) {
    const ak = aNum;
    const bk = bNum;
    const divisor = fb - fa;

    if (divisor === 0) {
      throw new Error("La división para la Regla Falsa es indeterminada en este intervalo.");
    }

    const ck = (ak * fb - bk * fa) / divisor;
    const fck = f(ck);
    const error = anteriorC === null ? null : Math.abs((ck - anteriorC) / ck) * 100;
    convergio = fck === 0 || (error !== null && error <= tol);

    filas.push({
      k,
      ak,
      ck,
      bk,
      fak: fa,
      fck,
      fbk: fb,
      error,
      convergencia: convergio ? "converge" : "diverge",
    });

    raiz = ck;
    if (convergio) break;

    if (fa * fck < 0) {
      bNum = ck;
      fb = fck;
    } else {
      aNum = ck;
      fa = fck;
    }

    anteriorC = ck;
  }

  return {
    raiz,
    iteraciones: filas.length,
    errorFinal: filas[filas.length - 1]?.error ?? 0,
    convergio,
    filas,
  };
}
