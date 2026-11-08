export function calcularDiferenciasDivididas({ puntos, xObjetivo }) {
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
  const xs = datos.map((punto) => punto.x);
  const tabla = [datos.map((punto) => punto.y)];

  for (let orden = 1; orden < datos.length; orden++) {
    const fila = [];
    for (let i = 0; i <= datos.length - orden - 1; i++) {
      const numerador = tabla[orden - 1][i + 1] - tabla[orden - 1][i];
      const denominador = xs[i + orden] - xs[i];
      fila.push(numerador / denominador);
    }
    tabla.push(fila);
  }

  const coeficientes = tabla.map((fila) => fila[0]);
  let valor = coeficientes[0];
  let producto = 1;

  for (let i = 1; i < coeficientes.length; i++) {
    producto *= (x - xs[i - 1]);
    valor += coeficientes[i] * producto;
  }

  return {
    raiz: valor,
    iteraciones: tabla.length,
    errorFinal: null,
    convergio: true,
    filas: tabla.map((fila, index) => ({ orden: index, valores: [...fila] })),
    coeficientes,
  };
}
