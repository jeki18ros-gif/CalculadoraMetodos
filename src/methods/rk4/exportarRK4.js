import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarRK4(resultado, nombreFuncion, funcion, x0, y0, h, n) {
  const encabezados = ["n", "x", "y", "k1", "k2", "k3", "k4", "y_siguiente", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [fila.n, fila.x, fila.y, fila.k1, fila.k2, fila.k3, fila.k4, fila.y_siguiente, fila.error ?? "", fila.convergencia]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Runge-Kutta de Orden 4"],
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
    const formulaDeEtapa = (x, y) => {
      const expresion = expresionExcel(funcion, { x, y });
      return expresion ? `=${expresion}` : null;
    };

    return {
      n: `=ROW()-10`,
      x: indice === 0 ? `=${Number(x0)}` : `=B${numeroFila - 1}+${Number(h)}`,
      y: indice === 0 ? `=${Number(y0)}` : `=H${numeroFila - 1}`,
      k1: formulaDeEtapa(`B${numeroFila}`, `C${numeroFila}`),
      k2: formulaDeEtapa(`(B${numeroFila}+${Number(h)}/2)`, `(C${numeroFila}+${Number(h)}/2*D${numeroFila})`),
      k3: formulaDeEtapa(`(B${numeroFila}+${Number(h)}/2)`, `(C${numeroFila}+${Number(h)}/2*E${numeroFila})`),
      k4: formulaDeEtapa(`(B${numeroFila}+${Number(h)})`, `(C${numeroFila}+${Number(h)}*F${numeroFila})`),
      y_siguiente: `=C${numeroFila}+${Number(h)}/6*(D${numeroFila}+2*E${numeroFila}+2*F${numeroFila}+G${numeroFila})`,
    };
  });
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "RK4");
  XLSX.writeFile(libro, "Resultado_RK4.xlsx");
}
