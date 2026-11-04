
import * as XLSX from "xlsx";

export function exportarBiseccion(
  resultado,
  nombreFuncion,
  funcion,
  tolerancia
) {
  const encabezados = [
    "k",
    "ak",
    "ck",
    "bk",
    "fak",
    "fck",
    "fbk",
    "fak*fck",
    "error",
    "convergencia",
  ];

  const datos = resultado.filas.map((fila) => [
    fila.k,
    fila.ak,
    fila.ck,
    fila.bk,
    fila.fak,
    fila.fck,
    fila.fbk,
    fila.producto,
    fila.error ?? "",
    fila.convergencia,
  ]);

const hoja = XLSX.utils.aoa_to_sheet([
  ["Método de Bisección"],
  [`Nombre: ${nombreFuncion}`],
  [`Función: ${funcion}`],
  [`Tolerancia: ${tolerancia}%`],
  [],
  encabezados,
  ...datos,
]);

  hoja["!cols"] = [
    { wch: 8 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 18 },
    { wch: 16 },
  ];

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    libro,
    hoja,
    "Biseccion"
  );

  XLSX.writeFile(libro, "Resultado_Biseccion.xlsx");
}
