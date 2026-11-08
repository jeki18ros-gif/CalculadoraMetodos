import * as XLSX from "xlsx";

export function exportarSecante(resultado, nombreFuncion, funcion, tolerancia, x0, x1) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de la Secante"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`Tolerancia: ${tolerancia}`],
    [`x0: ${x0}`],
    [`x1: ${x1}`],
    [],
    ["k", "x0", "x1", "f(x0)", "f(x1)", "x2", "error", "convergencia"],
    ...resultado.filas.map((fila) => [fila.k, fila.x0, fila.x1, fila.f_x0, fila.f_x1, fila.x2, fila.error ?? "", fila.convergencia]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Secante");
  XLSX.writeFile(libro, "Resultado_Secante.xlsx");
}
