const formatearNumero = (valor) => {
  if (Array.isArray(valor)) {
    return valor.map((item) => formatearNumero(item)).join("; ");
  }

  if (valor === null || valor === undefined) return "—";
  if (typeof valor === "object") {
    return JSON.stringify(valor);
  }

  const numero = Number(valor);
  if (!Number.isFinite(numero)) return String(valor);
  return numero.toLocaleString("en-US", { maximumFractionDigits: 10 });
};

export function TablaMetodoGeneral({ filas = [], columnas = [] }) {
  const columnasDefinidas = columnas.length
    ? columnas
    : filas[0]
      ? Object.keys(filas[0])
      : [];

  return (
    <table className="w-full whitespace-nowrap text-left text-sm">
      <thead className="bg-slate-100 text-xs uppercase text-slate-600">
        <tr>
          {columnasDefinidas.map((columna) => (
            <th key={columna} className="px-4 py-4 font-bold">
              {columna}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {filas.map((fila, index) => (
          <tr key={`${fila.k ?? index}-${index}`} className="hover:bg-blue-50/50">
            {columnasDefinidas.map((columna) => (
              <td key={`${columna}-${index}`} className="px-4 py-4">
                {formatearNumero(fila[columna])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
