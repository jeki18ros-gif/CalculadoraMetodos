import * as XLSX from "xlsx";

export function exportarPuntoFijo(resultado, nombreFuncion, gFuncion, tolerancia, x0) {
  const encabezados = ["k", "xk", "g(xk)", "xk+1", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [
    fila.k,
    fila.xk,
    fila.gk,
    fila.xk1,
    fila.error ?? "",
    fila.convergencia,
  ]);

  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Punto Fijo"],
    [`Nombre: ${nombreFuncion}`],
    [`g(x): ${gFuncion}`],
    [`x0: ${x0}`],
    [`Tolerancia: ${tolerancia}%`],
    [],
    encabezados,
    ...datos,
  ]);

  hoja["!cols"] = [{ wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "PuntoFijo");
  XLSX.writeFile(libro, "Resultado_Punto_Fijo.xlsx");
}
