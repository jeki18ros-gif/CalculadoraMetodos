import * as XLSX from "xlsx";

export function exportarAitkenSteffensen(resultado, nombreFuncion, gFuncion, tolerancia, x0) {
  const encabezados = ["k", "x0", "x1", "x2", "p", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [
    fila.k,
    fila.x0,
    fila.x1,
    fila.x2,
    fila.p,
    fila.error ?? "",
    fila.convergencia,
  ]);

  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Aitken-Steffensen"],
    [`Nombre: ${nombreFuncion}`],
    [`g(x): ${gFuncion}`],
    [`x0: ${x0}`],
    [`Tolerancia: ${tolerancia}%`],
    [],
    encabezados,
    ...datos,
  ]);

  hoja["!cols"] = [{ wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "AitkenSteffensen");
  XLSX.writeFile(libro, "Resultado_Aitken_Steffensen.xlsx");
}
