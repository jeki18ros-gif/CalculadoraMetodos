import * as XLSX from "xlsx";

export function exportarGaussSeidel(resultado, nombreFuncion, matrizA, vectorB, x0) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Gauss-Seidel"],
    [`Nombre: ${nombreFuncion}`],
    [`Matriz A: ${matrizA}`],
    [`Vector b: ${vectorB}`],
    [`x0: ${x0}`],
    [],
    ["k", "x", "error", "convergencia"],
    ...resultado.filas.map((fila) => [fila.k, Array.isArray(fila.x) ? fila.x.join("; ") : fila.x, fila.error ?? "", fila.convergencia]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "GaussSeidel");
  XLSX.writeFile(libro, "Resultado_Gauss_Seidel.xlsx");
}
