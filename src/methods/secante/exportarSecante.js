import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarSecante(resultado, nombreFuncion, funcion, tolerancia, x0, x1) {
  const encabezados = ["k", "x0", "x1", "f(x0)", "f(x1)", "x2", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [fila.k, fila.x0, fila.x1, fila.f_x0, fila.f_x1, fila.x2, fila.error ?? "", fila.convergencia]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de la Secante"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`Tolerancia: ${tolerancia}`],
    [`x0: ${x0}`],
    [`x1: ${x1}`],
    [],
    encabezados,
    ...datos,
  ]);
  insertarFormulas(hoja, encabezados, datos, 7, ({ numeroFila, indice }) => {
    const filaAnterior = numeroFila - 1;
    const funcionEn = (celda) => {
      const expresion = expresionExcel(funcion, { x: celda });
      return expresion ? `=${expresion}` : null;
    };

    return {
      k: `=ROW()-9`,
      ...(indice > 0 ? { x0: `=C${filaAnterior}`, x1: `=F${filaAnterior}` } : {}),
      "f(x0)": funcionEn(`B${numeroFila}`),
      "f(x1)": funcionEn(`C${numeroFila}`),
      x2: `=C${numeroFila}-E${numeroFila}*(C${numeroFila}-B${numeroFila})/(E${numeroFila}-D${numeroFila})`,
      ...(indice > 0
        ? { error: `=IF(F${numeroFila}=0,0,ABS((F${numeroFila}-F${filaAnterior})/F${numeroFila})*100)` }
        : {}),
      convergencia: `=IF(G${numeroFila}="", "diverge",IF(G${numeroFila}<=${Number(tolerancia)},"converge","diverge"))`,
    };
  });
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Secante");
  XLSX.writeFile(libro, "Resultado_Secante.xlsx");
}
