import * as XLSX from "xlsx";

export function exportarDiferenciasDivididas(resultado, nombreFuncion, puntos, xObjetivo) {
  const hoja = XLSX.utils.aoa_to_sheet([
    ["Diferencias divididas de Newton"],
    [`Nombre: ${nombreFuncion}`],
    [`Puntos: ${puntos}`],
    [`x objetivo: ${xObjetivo}`],
    [],
    ["orden", "valores"],
    ...resultado.filas.map((fila) => [fila.orden, Array.isArray(fila.valores) ? fila.valores.join("; ") : fila.valores]),
  ]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "NewtonDD");
  XLSX.writeFile(libro, "Resultado_Diferencias_Divididas.xlsx");
}
