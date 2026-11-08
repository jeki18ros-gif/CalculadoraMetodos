export function FormularioGaussSeidel({ formulario, actualizarCampo }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">Matriz A</label>
        <textarea
          value={formulario.matrizA}
          onChange={actualizarCampo("matrizA")}
          rows={5}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Ejemplo: 4 1 1; 1 3 1; 1 1 5"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">Vector b</label>
        <textarea
          value={formulario.vectorB}
          onChange={actualizarCampo("vectorB")}
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Ejemplo: 2; 5; 7"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">x0</label>
        <textarea
          value={formulario.x0}
          onChange={actualizarCampo("x0")}
          rows={2}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Ejemplo: 0; 0; 0"
        />
      </div>
    </div>
  );
}
