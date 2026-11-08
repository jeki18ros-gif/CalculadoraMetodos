import * as XLSX from "xlsx";

export function exportarJacobi(resultado, nombreFuncion, matrizA, vectorB, x0) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Jacobi"],
    [`Nombre: ${nombreFuncion}`],
    [`Matriz A: ${matrizA}`],
    [`Vector b: ${vectorB}`],
    [`x0: ${x0}`],
    [],
    ["k", "x", "error", "convergencia"],
    ...resultado.filas.map((fila) => [fila.k, Array.isArray(fila.x) ? fila.x.join("; ") : fila.x, fila.error ?? "", fila.convergencia]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Jacobi");
  XLSX.writeFile(libro, "Resultado_Jacobi.xlsx");
}
