import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarEuler(resultado, nombreFuncion, funcion, x0, y0, h, n) {
  const encabezados = ["n", "x", "y", "k1", "y_siguiente", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [fila.n, fila.x, fila.y, fila.k1, fila.y_siguiente, fila.error ?? "", fila.convergencia]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Euler"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`x0: ${x0}`],
    [`y0: ${y0}`],
    [`h: ${h}`],
    [`n: ${n}`],
    [],
    encabezados,
    ...datos,
  ]);
  insertarFormulas(hoja, encabezados, datos, 8, ({ numeroFila, indice }) => {
    const expresion = expresionExcel(funcion, { x: `B${numeroFila}`, y: `C${numeroFila}` });

    return {
      n: `=ROW()-10`,
      x: indice === 0 ? `=${Number(x0)}` : `=B${numeroFila - 1}+${Number(h)}`,
      y: indice === 0 ? `=${Number(y0)}` : `=E${numeroFila - 1}`,
      ...(expresion ? { k1: `=${expresion}` } : {}),
      y_siguiente: `=C${numeroFila}+${Number(h)}*D${numeroFila}`,
    };
  });
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Euler");
  XLSX.writeFile(libro, "Resultado_Euler.xlsx");
}
