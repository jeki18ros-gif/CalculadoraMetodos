export function FormularioGaussJordan({ formulario, actualizarCampo }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">Matriz A</label>
        <textarea
          value={formulario.matrizA}
          onChange={actualizarCampo("matrizA")}
          rows={5}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Ejemplo: 2 1 -1; 1 3 2; -1 2 4"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">Vector b</label>
        <textarea
          value={formulario.vectorB}
          onChange={actualizarCampo("vectorB")}
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Ejemplo: 1; 2; 3"
        />
      </div>
    </div>
  );
}
