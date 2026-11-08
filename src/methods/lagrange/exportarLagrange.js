import * as XLSX from "xlsx";

export function exportarLagrange(resultado, nombreFuncion, puntos, xObjetivo) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Interpolación de Lagrange"],
    [`Nombre: ${nombreFuncion}`],
    [`Puntos: ${puntos}`],
    [`x objetivo: ${xObjetivo}`],
    [],
    ["i", "x_i", "y_i", "l_i", "contribucion"],
    ...resultado.filas.map((fila) => [fila.i, fila.x_i, fila.y_i, fila.l_i, fila.contribucion]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Lagrange");
  XLSX.writeFile(libro, "Resultado_Lagrange.xlsx");
}
