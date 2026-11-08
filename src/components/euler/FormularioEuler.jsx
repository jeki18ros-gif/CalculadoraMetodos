import { MathFieldInput } from "../common/MathFieldInput";

export function FormularioEuler({ formulario, actualizarCampo }) {
  return (
    <>
      <MathFieldInput label="f(x, y)" value={formulario.funcion} onChange={actualizarCampo("funcion")} />
      <div className="grid gap-5 md:grid-cols-4">
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
          <label className="mb-2 block text-sm font-semibold">y0</label>
          <input
            type="number"
            step="any"
            value={formulario.y0}
            onChange={actualizarCampo("y0")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">h</label>
          <input
            type="number"
            step="any"
            value={formulario.h}
            onChange={actualizarCampo("h")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">n</label>
          <input
            type="number"
            step="1"
            min="1"
            value={formulario.n}
            onChange={actualizarCampo("n")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
}
