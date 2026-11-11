import * as XLSX from "xlsx";
import { insertarFormulas } from "../exportarExcel.js";

export function exportarLagrange(resultado, nombreFuncion, puntos, xObjetivo) {
  const encabezados = ["i", "x_i", "y_i", "l_i", "contribucion"];
  const datos = resultado.filas.map((fila) => [fila.i, fila.x_i, fila.y_i, fila.l_i, fila.contribucion]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Interpolación de Lagrange"],
    [`Nombre: ${nombreFuncion}`],
    [`Puntos: ${puntos}`],
    [`x objetivo: ${xObjetivo}`],
    [],
    encabezados,
    ...datos,
  ]);
  insertarFormulas(hoja, encabezados, datos, 5, ({ numeroFila, indice }) => {
    const terminos = datos
      .map((_, otroIndice) => otroIndice)
      .filter((otroIndice) => otroIndice !== indice)
      .map((otroIndice) => {
        const filaOtro = 7 + otroIndice;
        const filaPunto = 7 + indice;
        return `((${Number(xObjetivo)}-B${filaOtro})/(B${filaPunto}-B${filaOtro}))`;
      });

    return {
      "l_i": terminos.length ? `=${terminos.join("*")}` : "=1",
      contribucion: `=C${numeroFila}*D${numeroFila}`,
    };
  });
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Lagrange");
  XLSX.writeFile(libro, "Resultado_Lagrange.xlsx");
}
