import { Calculator, History } from "lucide-react";

export function Sidebar({ metodos, metodoActivo, onSeleccionarMetodo, menuAbierto, onToggleMenu }) {
  return (
    <>
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 flex h-screen w-72 flex-col bg-slate-950 text-white transition-transform duration-200 ease-out md:translate-x-0",
          menuAbierto ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-800 px-6">
          <div className="rounded-xl bg-blue-600 p-2">
            <Calculator size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold">NuméricaLab</h1>
            <p className="text-xs text-slate-400">Métodos numéricos</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Principal</p>
          
            <Calculator size={19} /> Calculadora
  
          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Métodos disponibles</p>
          <div className="space-y-2 pb-4">
            {metodos.map((metodo) => (
              <button
                key={metodo.id}
                type="button"
                onClick={() => {
                  onSeleccionarMetodo(metodo.id);
                  onToggleMenu(false);
                }}
                className={[
                  "flex w-full flex-col rounded-lg px-4 py-3 text-left text-sm transition",
                  metodoActivo === metodo.id
                    ? "border border-blue-500/40 bg-blue-500/10 text-blue-200"
                    : "text-slate-500 hover:bg-slate-800 hover:text-slate-200",
                ].join(" ")}
              >
                <span className={metodoActivo === metodo.id ? "font-medium text-blue-400" : "font-medium"}>{metodo.label}</span>
                <span className="mt-1 text-xs text-slate-400">{metodo.description}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-800 p-5">
          <p className="text-xs text-slate-500">Sistema académico</p>
          <p className="mt-1 text-sm font-medium">Análisis numérico</p>
        </div>
      </aside>

      {menuAbierto && <div className="fixed inset-0 z-20 bg-slate-950/40 md:hidden" onClick={() => onToggleMenu(false)} />}
    </>
  );
}
