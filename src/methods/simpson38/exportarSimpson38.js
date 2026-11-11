import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarSimpson38(resultado, nombreFuncion, funcion, a, b, n) {
  const encabezados = ["i", "x", "f(x)", "peso"];
  const datos = resultado.filas.map((fila) => [fila.i, fila.x, fila.f_x, fila.peso]);
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Regla de Simpson 3/8"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`a: ${a}`],
    [`b: ${b}`],
    [`n: ${n}`],
    [],
    encabezados,
    ...datos,
  ]);
  const intervalos = resultado.filas.length - 1;
  const funcionEn = (celda) => {
    const expresion = expresionExcel(funcion, { x: celda });
    return expresion ? `=${expresion}` : null;
  };
  insertarFormulas(hoja, encabezados, datos, 7, ({ numeroFila }) => ({
    x: `=${Number(a)}+A${numeroFila}*(${(Number(b) - Number(a)) / intervalos})`,
    "f(x)": funcionEn(`B${numeroFila}`),
    peso: `=IF(OR(A${numeroFila}=0,A${numeroFila}=${intervalos}),1,IF(MOD(A${numeroFila},3)=0,2,3))`,
  }));
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Simpson38");
  XLSX.writeFile(libro, "Resultado_Simpson_3_8.xlsx");
}
