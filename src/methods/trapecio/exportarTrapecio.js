import * as XLSX from "xlsx";

export function exportarTrapecio(resultado, nombreFuncion, funcion, a, b, n) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Regla del Trapecio"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`a: ${a}`],
    [`b: ${b}`],
    [`n: ${n}`],
    [],
    ["i", "x", "f(x)", "suma_parcial"],
    ...resultado.filas.map((fila) => [fila.i, fila.x, fila.f_x, fila.suma_parcial]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Trapecio");
  XLSX.writeFile(libro, "Resultado_Trapecio.xlsx");
}
