import * as XLSX from "xlsx";

export function exportarRK4(resultado, nombreFuncion, funcion, x0, y0, h, n) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Runge-Kutta de Orden 4"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`x0: ${x0}`],
    [`y0: ${y0}`],
    [`h: ${h}`],
    [`n: ${n}`],
    [],
    ["n", "x", "y", "k1", "k2", "k3", "k4", "y_siguiente", "error", "convergencia"],
    ...resultado.filas.map((fila) => [fila.n, fila.x, fila.y, fila.k1, fila.k2, fila.k3, fila.k4, fila.y_siguiente, fila.error ?? "", fila.convergencia]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "RK4");
  XLSX.writeFile(libro, "Resultado_RK4.xlsx");
}
