export function calcularLagrange({ puntos, xObjetivo }) {
  const datos = String(puntos)
    .split(/[;\n]+/)
    .map((fila) => fila.trim())
    .filter(Boolean)
    .map((fila) => {
      const [x, y] = fila.split(/[\s,]+/).map((valor) => Number(valor));
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new Error("Cada punto debe tener el formato x,y.");
      }
      return { x, y };
    });

  if (datos.length < 2) {
    throw new Error("Debes ingresar al menos dos puntos.");
  }

  const x = Number(xObjetivo);
  if (!Number.isFinite(x)) {
    throw new Error("El valor x objetivo debe ser numérico.");
  }

  let valor = 0;
  const filas = [];

  datos.forEach((punto, i) => {
    let base = 1;
    datos.forEach((otro, j) => {
      if (i !== j) {
        base *= (x - otro.x) / (punto.x - otro.x);
      }
    });

    const contribucion = punto.y * base;
    valor += contribucion;
    filas.push({ i, x_i: punto.x, y_i: punto.y, l_i: base, contribucion });
  });

  return {
    raiz: valor,
    iteraciones: filas.length,
    errorFinal: null,
    convergio: true,
    filas,
  };
}
