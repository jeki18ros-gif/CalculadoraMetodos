export function FormularioBiseccion({ formulario, actualizarCampo }) {
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

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">ak</label>
          <input
            type="number"
            step="any"
            value={formulario.a}
            onChange={actualizarCampo("a")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">bk</label>
          <input
            type="number"
            step="any"
            value={formulario.b}
            onChange={actualizarCampo("b")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
}
