import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarHeun(resultado, nombreFuncion, funcion, x0, y0, h, n) {
  const encabezados = ["n", "x", "y", "k1", "k2", "y_predicho", "y_siguiente", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [fila.n, fila.x, fila.y, fila.k1, fila.k2, fila.y_predicho, fila.y_siguiente, fila.error ?? "", fila.convergencia]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Heun"],
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
    const expresionK1 = expresionExcel(funcion, { x: `B${numeroFila}`, y: `C${numeroFila}` });
    const expresionK2 = expresionExcel(funcion, {
      x: `(B${numeroFila}+${Number(h)})`,
      y: `F${numeroFila}`,
    });

    return {
      n: `=ROW()-10`,
      x: indice === 0 ? `=${Number(x0)}` : `=B${numeroFila - 1}+${Number(h)}`,
      y: indice === 0 ? `=${Number(y0)}` : `=G${numeroFila - 1}`,
      ...(expresionK1 ? { k1: `=${expresionK1}` } : {}),
      ...(expresionK2 ? { k2: `=${expresionK2}` } : {}),
      y_predicho: `=C${numeroFila}+${Number(h)}*D${numeroFila}`,
      y_siguiente: `=C${numeroFila}+${Number(h)}/2*(D${numeroFila}+E${numeroFila})`,
    };
  });
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Heun");
  XLSX.writeFile(libro, "Resultado_Heun.xlsx");
}
