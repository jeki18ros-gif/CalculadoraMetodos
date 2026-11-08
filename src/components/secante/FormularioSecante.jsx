import { MathFieldInput } from "../common/MathFieldInput";

export function FormularioSecante({ formulario, actualizarCampo }) {
  return (
    <>
      <MathFieldInput label="f(x)" value={formulario.funcion} onChange={actualizarCampo("funcion")} />
      <div className="grid gap-5 md:grid-cols-2">
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
        <div>
          <label className="mb-2 block text-sm font-semibold">x1</label>
          <input
            type="number"
            step="any"
            value={formulario.x1}
            onChange={actualizarCampo("x1")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
}
