import { MathFieldInput } from "../common/MathFieldInput";

export function FormularioSimpson38({ formulario, actualizarCampo }) {
  return (
    <>
      <MathFieldInput label="f(x)" value={formulario.funcion} onChange={actualizarCampo("funcion")} />
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold">a</label>
          <input
            type="number"
            step="any"
            value={formulario.a}
            onChange={actualizarCampo("a")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">b</label>
          <input
            type="number"
            step="any"
            value={formulario.b}
            onChange={actualizarCampo("b")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">n</label>
          <input
            type="number"
            step="1"
            min="3"
            value={formulario.n}
            onChange={actualizarCampo("n")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
}
