import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarTrapecio(resultado, nombreFuncion, funcion, a, b, n) {
  const encabezados = ["i", "x", "f(x)", "suma_parcial"];
  const datos = resultado.filas.map((fila) => [fila.i, fila.x, fila.f_x, fila.suma_parcial]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Regla del Trapecio"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`a: ${a}`],
    [`b: ${b}`],
    [`n: ${n}`],
    [],
    encabezados,
    ...datos,
  ]);
  const paso = (Number(b) - Number(a)) / Number(n);
  const funcionEn = (celda) => {
    const expresion = expresionExcel(funcion, { x: celda });
    return expresion ? `=${expresion}` : null;
  };
  const formulaEnA = funcionEn(String(Number(a)));
  const formulaEnB = funcionEn(String(Number(b)));
  insertarFormulas(hoja, encabezados, datos, 7, ({ numeroFila, indice }) => ({
    x: `=${Number(a)}+A${numeroFila}*(${paso})`,
    "f(x)": funcionEn(`B${numeroFila}`),
    suma_parcial: indice === 0
      ? formulaEnA && formulaEnB
        ? `=${formulaEnA.slice(1)}+${formulaEnB.slice(1)}+2*C${numeroFila}`
        : null
      : `=D${numeroFila - 1}+2*C${numeroFila}`,
  }));
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Trapecio");
  XLSX.writeFile(libro, "Resultado_Trapecio.xlsx");
}
