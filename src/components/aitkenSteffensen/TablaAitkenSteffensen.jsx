const formatearNumero = (valor) => {
  if (valor === null || valor === undefined) return "—";
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return "—";
  return numero.toLocaleString("en-US", { maximumFractionDigits: 10 });
};

export function TablaAitkenSteffensen({ filas }) {
  return (
    <table className="w-full whitespace-nowrap text-left text-sm">
      <thead className="bg-slate-100 text-xs uppercase text-slate-600">
        <tr>
          {["k", "x0", "x1", "x2", "p", "Error (%)", "Convergencia"].map((columna) => (
            <th key={columna} className="px-4 py-4 font-bold">
              {columna}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {filas.map((fila) => (
          <tr key={fila.k} className="hover:bg-blue-50/50">
            <td className="px-4 py-4 font-semibold">{fila.k}</td>
            <td className="px-4 py-4">{formatearNumero(fila.x0)}</td>
            <td className="px-4 py-4">{formatearNumero(fila.x1)}</td>
            <td className="px-4 py-4">{formatearNumero(fila.x2)}</td>
            <td className="px-4 py-4 font-semibold text-blue-700">{formatearNumero(fila.p)}</td>
            <td className="px-4 py-4">{formatearNumero(fila.error)}</td>
            <td className="px-4 py-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  fila.convergencia === "converge" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {fila.convergencia}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
