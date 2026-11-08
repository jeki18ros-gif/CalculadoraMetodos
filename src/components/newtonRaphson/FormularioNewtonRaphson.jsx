export function FormularioNewtonRaphson({ formulario, actualizarCampo }) {
  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-semibold">f(x)</label>
        <input
          value={formulario.funcion}
          onChange={actualizarCampo("funcion")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">f'(x) (opcional, se deriva automáticamente si se deja vacío)</label>
        <input
          value={formulario.derivada}
          onChange={actualizarCampo("derivada")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">x0</label>
        <input
          type="number"
          step="any"
          value={formulario.x0}
          onChange={actualizarCampo("x0")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
    </>
  );
}
