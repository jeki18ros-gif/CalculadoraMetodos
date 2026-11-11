import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

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

  insertarFormulas(hoja, encabezados, datos, 6, ({ numeroFila, indice }) => {
    const filaAnterior = numeroFila - 1;
    const gEn = (celda) => {
      const expresion = expresionExcel(gFuncion, { x: celda });
      return expresion ? `=${expresion}` : null;
    };

    return {
      k: `=ROW()-8`,
      ...(indice > 0 ? { x0: `=E${filaAnterior}` } : {}),
      x1: gEn(`B${numeroFila}`),
      x2: gEn(`C${numeroFila}`),
      p: `=B${numeroFila}-(C${numeroFila}-B${numeroFila})^2/(D${numeroFila}-2*C${numeroFila}+B${numeroFila})`,
      error: `=IF(E${numeroFila}=0,0,ABS((E${numeroFila}-B${numeroFila})/E${numeroFila})*100)`,
    };
  });

  hoja["!cols"] = [{ wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "AitkenSteffensen");
  XLSX.writeFile(libro, "Resultado_Aitken_Steffensen.xlsx");
}
