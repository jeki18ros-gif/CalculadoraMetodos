export function FormularioLagrange({ formulario, actualizarCampo }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">Puntos (x,y)</label>
        <textarea
          value={formulario.puntos}
          onChange={actualizarCampo("puntos")}
          rows={6}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Ejemplo: 0,1; 1,3; 2,9"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">x objetivo</label>
        <input
          type="number"
          step="any"
          value={formulario.xObjetivo}
          onChange={actualizarCampo("xObjetivo")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
