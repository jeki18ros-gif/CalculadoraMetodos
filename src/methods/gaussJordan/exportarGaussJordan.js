import * as XLSX from "xlsx";

export function exportarGaussJordan(resultado, nombreFuncion, matrizA, vectorB) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Gauss-Jordan"],
    [`Nombre: ${nombreFuncion}`],
    [`Matriz A: ${matrizA}`],
    [`Vector b: ${vectorB}`],
    [],
    ["paso", "pivot", "error", "solucion"],
    ...resultado.filas.map((fila) => [fila.paso, fila.pivot ?? "", fila.error ?? "", Array.isArray(fila.solucion) ? fila.solucion.join("; ") : fila.solucion]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "GaussJordan");
  XLSX.writeFile(libro, "Resultado_Gauss_Jordan.xlsx");
}
