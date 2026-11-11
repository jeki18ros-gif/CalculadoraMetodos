import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarNewtonRaphsonModificado(resultado, nombreFuncion, funcion, derivada, segundaDerivada, tolerancia, x0) {
  const encabezados = ["k", "xk", "f(xk)", "f'(xk)", "f''(xk)", "xk+1", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [
    fila.k,
    fila.xk,
    fila.f_xk,
    fila.dfx,
    fila.d2fx,
    fila.xk1,
    fila.error ?? "",
    fila.convergencia,
  ]);

  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Newton-Raphson Modificado"],
    [`Nombre: ${nombreFuncion}`],
    [`f(x): ${funcion}`],
    [`f'(x): ${derivada || "derivada automática"}`],
    [`f''(x): ${segundaDerivada || "segunda derivada automática"}`],
    [`x0: ${x0}`],
    [`Tolerancia: ${tolerancia}%`],
    [],
    encabezados,
    ...datos,
  ]);

  insertarFormulas(hoja, encabezados, datos, 8, ({ numeroFila, indice }) => {
    const filaAnterior = numeroFila - 1;
    const formulaFuncion = expresionExcel(funcion, { x: `B${numeroFila}` });
    const formulaDerivada = expresionExcel(derivada, { x: `B${numeroFila}` });
    const formulaSegundaDerivada = expresionExcel(segundaDerivada, { x: `B${numeroFila}` });

    return {
      k: `=ROW()-10`,
      ...(indice > 0 ? { xk: `=F${filaAnterior}` } : {}),
      ...(formulaFuncion ? { "f(xk)": `=${formulaFuncion}` } : {}),
      ...(formulaDerivada ? { "f'(xk)": `=${formulaDerivada}` } : {}),
      ...(formulaSegundaDerivada ? { "f''(xk)": `=${formulaSegundaDerivada}` } : {}),
      "xk+1": `=B${numeroFila}-C${numeroFila}*D${numeroFila}/(D${numeroFila}^2-C${numeroFila}*E${numeroFila})`,
      ...(indice > 0
        ? { error: `=IF(F${numeroFila}=0,0,ABS((F${numeroFila}-B${numeroFila})/F${numeroFila})*100)` }
        : {}),
    };
  });

  hoja["!cols"] = [{ wch: 8 }, { wch: 14 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 16 }, { wch: 18 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "NewtonModificado");
  XLSX.writeFile(libro, "Resultado_Newton_Raphson_Modificado.xlsx");
}
