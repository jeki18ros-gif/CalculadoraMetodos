import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarNewtonRaphson(resultado, nombreFuncion, funcion, derivada, tolerancia, x0) {
  const encabezados = ["k", "xk", "f(xk)", "f'(xk)", "xk+1", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [
    fila.k,
    fila.xk,
    fila.f_xk,
    fila.dfx,
    fila.xk1,
    fila.error ?? "",
    fila.convergencia,
  ]);

  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Newton-Raphson"],
    [`Nombre: ${nombreFuncion}`],
    [`f(x): ${funcion}`],
    [`f'(x): ${derivada || "derivada automática"}`],
    [`x0: ${x0}`],
    [`Tolerancia: ${tolerancia}%`],
    [],
    encabezados,
    ...datos,
  ]);

  insertarFormulas(hoja, encabezados, datos, 7, ({ numeroFila, indice }) => {
    const filaAnterior = numeroFila - 1;
    const formulaFuncion = expresionExcel(funcion, { x: `B${numeroFila}` });

    return {
      k: `=ROW()-9`,
      ...(indice > 0 ? { xk: `=E${filaAnterior}` } : {}),
      ...(formulaFuncion ? { "f(xk)": `=${formulaFuncion}` } : {}),
      "xk+1": `=B${numeroFila}-C${numeroFila}/D${numeroFila}`,
      ...(indice > 0
        ? { error: `=IF(E${numeroFila}=0,0,ABS((E${numeroFila}-B${numeroFila})/E${numeroFila})*100)` }
        : {}),
      convergencia: `=IF(OR(F${numeroFila}<=${Number(tolerancia)},ABS(C${numeroFila})<=${Number(tolerancia)}),"converge","diverge")`,
    };
  });

  hoja["!cols"] = [{ wch: 8 }, { wch: 16 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "NewtonRaphson");
  XLSX.writeFile(libro, "Resultado_Newton_Raphson.xlsx");
}
