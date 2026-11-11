import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

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

  insertarFormulas(hoja, encabezados, datos, 6, ({ numeroFila, indice }) => {
    const filaAnterior = numeroFila - 1;
    const formulaG = expresionExcel(gFuncion, { x: `B${numeroFila}` });

    return {
      k: `=ROW()-8`,
      ...(indice > 0 ? { xk: `=D${filaAnterior}` } : {}),
      ...(formulaG ? { "g(xk)": `=${formulaG}` } : {}),
      "xk+1": formulaG ? `=${formulaG}` : null,
      error: `=IF(D${numeroFila}=0,0,ABS((D${numeroFila}-B${numeroFila})/D${numeroFila})*100)`,
      convergencia: `=IF(OR(E${numeroFila}<=${Number(tolerancia)},ABS(D${numeroFila}-B${numeroFila})<=${Number(tolerancia)}),"converge","diverge")`,
    };
  });

  hoja["!cols"] = [{ wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "PuntoFijo");
  XLSX.writeFile(libro, "Resultado_Punto_Fijo.xlsx");
}
