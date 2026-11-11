import * as XLSX from "xlsx";
import { expresionExcel, insertarFormulas } from "../exportarExcel.js";

export function exportarReglaFalsa(resultado, nombreFuncion, funcion, tolerancia) {
  const encabezados = ["k", "ak", "ck", "bk", "fak", "fck", "fbk", "error", "convergencia"];
  const datos = resultado.filas.map((fila) => [
    fila.k,
    fila.ak,
    fila.ck,
    fila.bk,
    fila.fak,
    fila.fck,
    fila.fbk,
    fila.error ?? "",
    fila.convergencia,
  ]);

  const hoja = XLSX.utils.aoa_to_sheet([
    ["Método de Regla Falsa"],
    [`Nombre: ${nombreFuncion}`],
    [`Función: ${funcion}`],
    [`Tolerancia: ${tolerancia}%`],
    [],
    encabezados,
    ...datos,
  ]);

  insertarFormulas(hoja, encabezados, datos, 5, ({ numeroFila, indice }) => {
    const filaAnterior = numeroFila - 1;
    const expresionEn = (celda) => {
      const expresion = expresionExcel(funcion, { x: celda });
      return expresion ? `=${expresion}` : null;
    };

    return {
      k: `=ROW()-7`,
      ...(indice > 0
        ? {
            ak: `=IF(E${filaAnterior}*F${filaAnterior}<0,B${filaAnterior},C${filaAnterior})`,
            bk: `=IF(E${filaAnterior}*F${filaAnterior}<0,C${filaAnterior},D${filaAnterior})`,
            fak: `=IF(E${filaAnterior}*F${filaAnterior}<0,E${filaAnterior},F${filaAnterior})`,
            fbk: `=IF(D${numeroFila}=C${filaAnterior},F${filaAnterior},G${filaAnterior})`,
          }
        : {}),
      ck: `=(B${numeroFila}*G${numeroFila}-D${numeroFila}*E${numeroFila})/(G${numeroFila}-E${numeroFila})`,
      fck: expresionEn(`C${numeroFila}`),
      ...(indice > 0
        ? { error: `=IF(C${numeroFila}=0,0,ABS((C${numeroFila}-C${filaAnterior})/C${numeroFila})*100)` }
        : {}),
      convergencia: `=IF(F${numeroFila}=0,"converge",IF(H${numeroFila}="", "diverge",IF(H${numeroFila}<=${Number(tolerancia)},"converge","diverge")))`,
    };
  });

  hoja["!cols"] = [
    { wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 16 },
    { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 18 },
  ];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "ReglaFalsa");
  XLSX.writeFile(libro, "Resultado_Regla_Falsa.xlsx");
}
