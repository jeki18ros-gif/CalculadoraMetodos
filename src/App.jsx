import { useState } from "react";
import {
  Calculator,
  BookOpen,
  History,
  FileSpreadsheet,
  Menu,
  Activity,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
} from "lucide-react";

import { calcularBiseccion } from "./methods/biseccion/calcularBiseccion";
import { exportarBiseccion } from "./methods/biseccion/exportarBiseccion";

export default function App() {
  const [funcion, setFuncion] = useState("x^2 - 2");
  const [a, setA] = useState("1");
  const [b, setB] = useState("2");
  const [tolerancia, setTolerancia] = useState("0.00001");
  const [nombreFuncion, setNombreFuncion] = useState("Función cuadrática");

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const [menuAbierto, setMenuAbierto] = useState(false);

  const calcular = (e) => {
    e.preventDefault();
    setError("");
    setResultado(null);

    try {
      const datos = calcularBiseccion({
        funcion,
        a,
        b,
        tolerancia,
      });

      setResultado(datos);
    } catch (err) {
      setError(err.message);
    }
  };

  const limpiar = () => {
    setFuncion("");
    setA("");
    setB("");
    setTolerancia("0.00001");
    setNombreFuncion("Función cuadrática");
    setResultado(null);
    setError("");
  };

  const formato = (valor) => {
    if (valor === null || valor === undefined) return "—";
    return Number(valor).toLocaleString("en-US", {
      maximumFractionDigits: 10,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-slate-950 text-white transition-transform md:translate-x-0 ${menuAbierto ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
          <div className="rounded-xl bg-blue-600 p-2">
            <Calculator size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold">NuméricaLab</h1>
            <p className="text-xs text-slate-400">Métodos numéricos</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Principal
          </p>

          <button className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium">
            <Calculator size={19} />
            Calculadora
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400">
            <History size={19} />
            Historial
          </button>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Métodos disponibles
          </p>

          <div className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-3">
            <p className="text-sm font-medium text-blue-400">Bisección</p>
            <p className="mt-1 text-xs text-slate-400">Método activo</p>
          </div>

          {["Falsa posición", "Newton-Raphson", "Secante"].map((nombre) => (
            <div key={nombre} className="flex items-center justify-between px-4 py-3 text-sm text-slate-500">
              {nombre}
              <span className="text-xs">Próximamente</span>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-5">
          <p className="text-xs text-slate-500">
            Sistema académico
          </p>
          <p className="mt-1 text-sm font-medium">Análisis numérico</p>
        </div>
      </aside>

      {/* FONDO DEL MENU MOVIL */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen md:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-xs text-slate-500">
                Métodos numéricos / Calculadora
              </p>
              <h2 className="text-lg font-bold text-slate-900">
                Método de Bisección
              </h2>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700 sm:flex">
            <Activity size={17} />
            Calculadora académica
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-7 p-5 md:p-8">

          {/* INTRODUCCION */}
          <section>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <BookOpen size={18} />
              Análisis numérico
            </div>

            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Calculadora de Bisección
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Encuentra una raíz aproximada de una función matemática
              mediante el método de bisección. Ingresa la función,
              define el intervalo inicial y establece la tolerancia.
            </p>
          </section>

          {/* FORMULARIO */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Calculator size={22} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Datos de entrada
                </h3>
                <p className="text-sm text-slate-500">
                  Configura los parámetros del método.
                </p>
              </div>
            </div>

            <form onSubmit={calcular} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nombre de la función
                </label>

                <input
                  value={nombreFuncion}
                  onChange={(e) => setNombreFuncion(e.target.value)}
                  placeholder="Ejemplo: Función cuadrática"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Expresión matemática f(x)
                </label>

                <input
                  value={funcion}
                  onChange={(e) => setFuncion(e.target.value)}
                  placeholder="Ejemplo: x^2 - 2"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Escribe la expresión matemática utilizando x como variable.
                  Ejemplo: x^3 - 4*x - 9.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    ak - Límite inferior
                  </label>

                  <input
                    type="number"
                    step="any"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    bk - Límite superior
                  </label>

                  <input
                    type="number"
                    step="any"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Tolerancia de error (%)
                </label>

                <input
                  type="number"
                  step="any"
                  min="0.000000001"
                  value={tolerancia}
                  onChange={(e) => setTolerancia(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:max-w-sm"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Valor predeterminado: 0.00001 %
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={20} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Play size={18} />
                  Calcular resultado
                </button>

                <button
                  type="button"
                  onClick={limpiar}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <RotateCcw size={18} />
                  Limpiar
                </button>
              </div>

            </form>
          </section>

          {/* RESULTADOS */}
          {resultado && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Raíz aproximada</p>
                  <p className="mt-2 text-2xl font-bold text-blue-700">
                    {formato(resultado.raiz)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Iteraciones</p>
                  <p className="mt-2 text-2xl font-bold">
                    {resultado.iteraciones}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Error final (%)</p>
                  <p className="mt-2 text-2xl font-bold">
                    {formato(resultado.errorFinal)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Convergencia</p>
                  <p className={`mt-2 flex items-center gap-2 text-lg font-bold ${resultado.convergio ? "text-green-600" : "text-amber-600"}`}>
                    {resultado.convergio
                      ? <CheckCircle2 size={21} />
                      : <AlertCircle size={21} />
                    }
                    {resultado.convergio ? "Converge" : "Límite alcanzado"}
                  </p>
                </div>

              </section>

              {!resultado.convergio && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  Se alcanzó el máximo de iteraciones sin cumplir la tolerancia.
                  Puedes aumentar el límite de iteraciones en el algoritmo.
                </div>
              )}

              {/* TABLA */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Tabla de iteraciones
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Desarrollo del método paso a paso.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      exportarBiseccion(
                        resultado,
                        nombreFuncion,
                        funcion,
                        tolerancia
                      )
                    }
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <FileSpreadsheet size={18} />
                    Exportar Excel
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full whitespace-nowrap text-left text-sm">

                    <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                      <tr>
                        {[
                          "k", "ak", "ck", "bk",
                          "fak", "fck", "fbk",
                          "fak*fck", "Error (%)", "Convergencia"
                        ].map((columna) => (
                          <th key={columna} className="px-4 py-4 font-bold">
                            {columna}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {resultado.filas.map((fila) => (
                        <tr key={fila.k} className="hover:bg-blue-50/50">
                          <td className="px-4 py-4 font-semibold">{fila.k}</td>
                          <td className="px-4 py-4">{formato(fila.ak)}</td>
                          <td className="px-4 py-4 font-semibold text-blue-700">{formato(fila.ck)}</td>
                          <td className="px-4 py-4">{formato(fila.bk)}</td>
                          <td className="px-4 py-4">{formato(fila.fak)}</td>
                          <td className="px-4 py-4">{formato(fila.fck)}</td>
                          <td className="px-4 py-4">{formato(fila.fbk)}</td>
                          <td className="px-4 py-4">{formato(fila.producto)}</td>
                          <td className="px-4 py-4">{formato(fila.error)}</td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${fila.convergencia === "converge" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                              {fila.convergencia}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                <div className="border-t border-slate-100 p-4 text-xs text-slate-500">
                  Total de iteraciones: {resultado.iteraciones}
                </div>

              </section>
            </>
          )}

          {!resultado && (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Activity size={28} />
              </div>

              <h3 className="font-semibold text-slate-800">
                Esperando datos de entrada
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Completa los parámetros del método y presiona
                "Calcular resultado" para visualizar las iteraciones.
              </p>
            </section>
          )}

          <footer className="pb-5 pt-2 text-center text-xs text-slate-400">
            NuméricaLab · Sistema de métodos numéricos
          </footer>

        </div>
      </main>
    </div>
  );
}