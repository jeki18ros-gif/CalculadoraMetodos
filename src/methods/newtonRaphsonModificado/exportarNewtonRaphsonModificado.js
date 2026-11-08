import * as XLSX from "xlsx";

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

  hoja["!cols"] = [{ wch: 8 }, { wch: 14 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 16 }, { wch: 18 }, { wch: 18 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "NewtonModificado");
  XLSX.writeFile(libro, "Resultado_Newton_Raphson_Modificado.xlsx");
}
