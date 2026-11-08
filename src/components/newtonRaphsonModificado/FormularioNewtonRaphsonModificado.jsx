import { MathFieldInput } from "../common/MathFieldInput";

export function FormularioNewtonRaphsonModificado({ formulario, actualizarCampo }) {
  return (
    <>
      <MathFieldInput label="f(x)" value={formulario.funcion} onChange={actualizarCampo("funcion")} />
      <MathFieldInput label="f'(x)" value={formulario.derivada} onChange={actualizarCampo("derivada")} />
      <MathFieldInput label="f''(x)" value={formulario.segundaDerivada} onChange={actualizarCampo("segundaDerivada")} />
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
