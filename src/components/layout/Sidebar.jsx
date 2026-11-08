import { Calculator, BookOpenText } from "lucide-react";

export function Sidebar({ metodos, metodoActivo, onSeleccionarMetodo, menuAbierto, onToggleMenu }) {
  return (
    <>
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 flex h-screen w-72 flex-col bg-slate-950 text-white shadow-xl transition-transform duration-200 ease-out md:translate-x-0",
          menuAbierto ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-800 px-5">
          <div className="rounded-xl bg-blue-600 p-2.5 shadow-lg shadow-blue-900/30">
            <Calculator size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold">NuméricaLab</h1>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Métodos numéricos</p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <nav className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <BookOpenText size={16} className="text-blue-400" />
                Calculadora
              </div>
            </div>

            <div>
              <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Métodos disponibles
              </p>
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
                      "flex w-full flex-col rounded-xl px-3 py-3 text-left text-sm transition-all duration-150",
                      metodoActivo === metodo.id
                        ? "border border-blue-500/40 bg-blue-500/10 text-blue-200 shadow-inner shadow-blue-500/10"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200",
                    ].join(" ")}
                  >
                    <span className={metodoActivo === metodo.id ? "font-semibold text-blue-300" : "font-medium"}>
                      {metodo.label}
                    </span>
                    <span className="mt-1 text-xs text-slate-400">{metodo.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="border-t border-slate-800 bg-slate-950/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Sistema académico</p>
            <p className="mt-1 text-sm font-medium text-slate-200">Análisis numérico</p>
          </div>
        </div>
      </aside>

      {menuAbierto && <div className="fixed inset-0 z-20 bg-slate-950/40 md:hidden" onClick={() => onToggleMenu(false)} />}
    </>
  );
}
