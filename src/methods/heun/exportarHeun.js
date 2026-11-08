import * as XLSX from "xlsx";

export function exportarHeun(resultado, nombreFuncion, funcion, x0, y0, h, n) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Heun"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`x0: ${x0}`],
    [`y0: ${y0}`],
    [`h: ${h}`],
    [`n: ${n}`],
    [],
    ["n", "x", "y", "k1", "k2", "y_predicho", "y_siguiente", "error", "convergencia"],
    ...resultado.filas.map((fila) => [fila.n, fila.x, fila.y, fila.k1, fila.k2, fila.y_predicho, fila.y_siguiente, fila.error ?? "", fila.convergencia]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Heun");
  XLSX.writeFile(libro, "Resultado_Heun.xlsx");
}
