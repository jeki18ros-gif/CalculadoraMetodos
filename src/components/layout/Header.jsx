import { Activity, Menu } from "lucide-react";

export function Header({ metodoActual, menuAbierto, onToggleMenu }) {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-sm md:px-8">
      <div className="flex items-center gap-3">
        <button type="button" className="md:hidden" onClick={() => onToggleMenu(!menuAbierto)} aria-label="Abrir menú">
          <Menu size={24} className="text-slate-700" />
        </button>
        <div>
          <p className="text-xs text-slate-500">Métodos numéricos / Calculadora</p>
          <h2 className="text-lg font-bold text-slate-900">{metodoActual.label}</h2>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700 sm:flex">
        <Activity size={17} /> Calculadora académica
      </div>
    </header>
  );
}
