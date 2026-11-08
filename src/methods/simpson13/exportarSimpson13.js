import * as XLSX from "xlsx";

export function exportarSimpson13(resultado, nombreFuncion, funcion, a, b, n) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Regla de Simpson 1/3"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`a: ${a}`],
    [`b: ${b}`],
    [`n: ${n}`],
    [],
    ["i", "x", "f(x)", "peso"],
    ...resultado.filas.map((fila) => [fila.i, fila.x, fila.f_x, fila.peso]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Simpson13");
  XLSX.writeFile(libro, "Resultado_Simpson_1_3.xlsx");
}
