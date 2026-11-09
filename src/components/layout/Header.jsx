import { Activity, Menu } from "lucide-react";

export function Header({ metodoActual, menuAbierto, onToggleMenu, temaOscuro = false }) {
  return (
    <header
      className={[
        "sticky top-0 z-10 flex h-20 items-center justify-between border-b px-5 backdrop-blur-sm md:px-8",
        temaOscuro
          ? "border-red-950/70 bg-[#100c10]/95 text-rose-100"
          : "border-slate-200 bg-white/90",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <button type="button" className="md:hidden" onClick={() => onToggleMenu(!menuAbierto)} aria-label="Abrir menú">
          <Menu size={24} className={temaOscuro ? "text-rose-300" : "text-slate-700"} />
        </button>
        <div>
          <p className={`text-xs ${temaOscuro ? "text-rose-300/60" : "text-slate-500"}`}>Métodos numéricos / Calculadora</p>
          <h2 className={`text-lg font-bold ${temaOscuro ? "text-rose-50" : "text-slate-900"}`}>{metodoActual.label}</h2>
        </div>
      </div>

      <div className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex ${temaOscuro ? "bg-red-950/50 text-rose-300" : "bg-blue-50 text-blue-700"}`}>
        <Activity size={17} /> Calculadora académica
      </div>
    </header>
  );
}
