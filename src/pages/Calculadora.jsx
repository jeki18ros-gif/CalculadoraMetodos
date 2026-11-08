import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Calculator,
  CheckCircle2,
  FileSpreadsheet,
  Play,
  RotateCcw,
} from "lucide-react";

import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { FormularioBiseccion } from "../components/biseccion/FormularioBiseccion";
import { TablaBiseccion } from "../components/biseccion/TablaBiseccion";
import { FormularioReglaFalsa } from "../components/reglaFalsa/FormularioReglaFalsa";
import { TablaReglaFalsa } from "../components/reglaFalsa/TablaReglaFalsa";
import { FormularioPuntoFijo } from "../components/puntoFijo/FormularioPuntoFijo";
import { TablaPuntoFijo } from "../components/puntoFijo/TablaPuntoFijo";
import { FormularioNewtonRaphson } from "../components/newtonRaphson/FormularioNewtonRaphson";
import { TablaNewtonRaphson } from "../components/newtonRaphson/TablaNewtonRaphson";
import { FormularioNewtonRaphsonModificado } from "../components/newtonRaphsonModificado/FormularioNewtonRaphsonModificado";
import { TablaNewtonRaphsonModificado } from "../components/newtonRaphsonModificado/TablaNewtonRaphsonModificado";
import { FormularioAitkenSteffensen } from "../components/aitkenSteffensen/FormularioAitkenSteffensen";
import { TablaAitkenSteffensen } from "../components/aitkenSteffensen/TablaAitkenSteffensen";

import { calcularBiseccion } from "../methods/biseccion/calcularBiseccion";
import { exportarBiseccion } from "../methods/biseccion/exportarBiseccion";
import { calcularReglaFalsa } from "../methods/reglaFalsa/calcularReglaFalsa";
import { exportarReglaFalsa } from "../methods/reglaFalsa/exportarReglaFalsa";
import { calcularPuntoFijo } from "../methods/puntoFijo/calcularPuntoFijo";
import { exportarPuntoFijo } from "../methods/puntoFijo/exportarPuntoFijo";
import { calcularNewtonRaphson } from "../methods/newtonRaphson/calcularNewtonRaphson";
import { exportarNewtonRaphson } from "../methods/newtonRaphson/exportarNewtonRaphson";
import { calcularNewtonRaphsonModificado } from "../methods/newtonRaphsonModificado/calcularNewtonRaphsonModificado";
import { exportarNewtonRaphsonModificado } from "../methods/newtonRaphsonModificado/exportarNewtonRaphsonModificado";
import { calcularAitkenSteffensen } from "../methods/aitkenSteffensen/calcularAitkenSteffensen";
import { exportarAitkenSteffensen } from "../methods/aitkenSteffensen/exportarAitkenSteffensen";

const METODOS = [
  { id: "biseccion", label: "Bisección", description: "Método de intervalos" },
  { id: "reglaFalsa", label: "Regla Falsa", description: "Interpolación lineal" },
  { id: "puntoFijo", label: "Punto fijo", description: "Iteración de punto fijo" },
  { id: "newtonRaphson", label: "Newton-Raphson", description: "Tangentes" },
  { id: "newtonRaphsonModificado", label: "Newton-Raphson modificado", description: "Segunda derivada" },
  { id: "aitkenSteffensen", label: "Aitken-Steffensen", description: "Aceleración de convergencia" },
];

const crearEstadoInicial = (metodoId) => {
  const base = {
    funcion: "x^2 - 2",
    gFuncion: "(x + 2/x) / 2",
    derivada: "2*x",
    segundaDerivada: "2",
    a: "1",
    b: "2",
    x0: "1",
    tolerancia: "0.00001",
  };

  if (metodoId === "puntoFijo" || metodoId === "aitkenSteffensen") {
    base.funcion = "";
  }

  if (metodoId === "newtonRaphson") {
    base.funcion = "x^2 - 2";
  }

  if (metodoId === "newtonRaphsonModificado") {
    base.funcion = "x^2 - 2";
  }

  return base;
};

const formatearNumero = (valor) => {
  if (valor === null || valor === undefined) return "—";
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return "—";
  return numero.toLocaleString("en-US", { maximumFractionDigits: 10 });
};

export default function Calculadora() {
  const [metodoActivo, setMetodoActivo] = useState("biseccion");
  const [formulario, setFormulario] = useState(crearEstadoInicial("biseccion"));
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const metodoActual = useMemo(
    () => METODOS.find((metodo) => metodo.id === metodoActivo) ?? METODOS[0],
    [metodoActivo]
  );

  const cambiarMetodo = (id) => {
    setMetodoActivo(id);
    setResultado(null);
    setError("");
    setFormulario(crearEstadoInicial(id));
  };

  const actualizarCampo = (campo) => (evento) => {
    const valor = evento.target.value;
    setFormulario((estado) => ({ ...estado, [campo]: valor }));
  };

  const limpiar = () => {
    setResultado(null);
    setError("");
    setFormulario(crearEstadoInicial(metodoActivo));
  };

  const ejecutarMetodo = (evento) => {
    evento.preventDefault();
    setError("");
    setResultado(null);

    try {
      if (metodoActivo === "biseccion") {
        const datos = calcularBiseccion({
          funcion: formulario.funcion,
          a: formulario.a,
          b: formulario.b,
          tolerancia: formulario.tolerancia,
        });
        setResultado(datos);
        return;
      }

      if (metodoActivo === "reglaFalsa") {
        const datos = calcularReglaFalsa({
          funcion: formulario.funcion,
          a: formulario.a,
          b: formulario.b,
          tolerancia: formulario.tolerancia,
        });
        setResultado(datos);
        return;
      }

      if (metodoActivo === "puntoFijo") {
        const datos = calcularPuntoFijo({
          gFuncion: formulario.gFuncion,
          x0: formulario.x0,
          tolerancia: formulario.tolerancia,
        });
        setResultado(datos);
        return;
      }

      if (metodoActivo === "newtonRaphson") {
        const datos = calcularNewtonRaphson({
          funcion: formulario.funcion,
          derivada: formulario.derivada,
          x0: formulario.x0,
          tolerancia: formulario.tolerancia,
        });
        setResultado(datos);
        return;
      }

      if (metodoActivo === "newtonRaphsonModificado") {
        const datos = calcularNewtonRaphsonModificado({
          funcion: formulario.funcion,
          derivada: formulario.derivada,
          segundaDerivada: formulario.segundaDerivada,
          x0: formulario.x0,
          tolerancia: formulario.tolerancia,
        });
        setResultado(datos);
        return;
      }

      const datos = calcularAitkenSteffensen({
        gFuncion: formulario.gFuncion,
        x0: formulario.x0,
        tolerancia: formulario.tolerancia,
      });
      setResultado(datos);
    } catch (err) {
      setError(err.message || "Error al ejecutar el método.");
    }
  };

  const exportarResultado = () => {
    if (!resultado) return;

    const nombreFuncion = metodoActual.label;

    if (metodoActivo === "biseccion") {
      exportarBiseccion(resultado, nombreFuncion, formulario.funcion, formulario.tolerancia);
      return;
    }

    if (metodoActivo === "reglaFalsa") {
      exportarReglaFalsa(resultado, nombreFuncion, formulario.funcion, formulario.tolerancia);
      return;
    }

    if (metodoActivo === "puntoFijo") {
      exportarPuntoFijo(resultado, nombreFuncion, formulario.gFuncion, formulario.tolerancia, formulario.x0);
      return;
    }

    if (metodoActivo === "newtonRaphson") {
      exportarNewtonRaphson(resultado, nombreFuncion, formulario.funcion, formulario.derivada, formulario.tolerancia, formulario.x0);
      return;
    }

    if (metodoActivo === "newtonRaphsonModificado") {
      exportarNewtonRaphsonModificado(
        resultado,
        nombreFuncion,
        formulario.funcion,
        formulario.derivada,
        formulario.segundaDerivada,
        formulario.tolerancia,
        formulario.x0
      );
      return;
    }

    exportarAitkenSteffensen(resultado, nombreFuncion, formulario.gFuncion, formulario.tolerancia, formulario.x0);
  };

  const renderizarFormulario = () => {
    return (
      <div className="space-y-5">
        {metodoActivo === "biseccion" && <FormularioBiseccion formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "reglaFalsa" && <FormularioReglaFalsa formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "puntoFijo" && <FormularioPuntoFijo formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "newtonRaphson" && <FormularioNewtonRaphson formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "newtonRaphsonModificado" && (
          <FormularioNewtonRaphsonModificado formulario={formulario} actualizarCampo={actualizarCampo} />
        )}
        {metodoActivo === "aitkenSteffensen" && <FormularioAitkenSteffensen formulario={formulario} actualizarCampo={actualizarCampo} />}

        <div>
          <label className="mb-2 block text-sm font-semibold">Tolerancia</label>
          <input
            type="number"
            step="any"
            value={formulario.tolerancia}
            onChange={actualizarCampo("tolerancia")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 md:max-w-sm"
          />
        </div>
      </div>
    );
  };

  const renderizarFilas = () => {
    if (!resultado || !resultado.filas) return null;

    switch (metodoActivo) {
      case "biseccion":
        return <TablaBiseccion filas={resultado.filas} />;
      case "reglaFalsa":
        return <TablaReglaFalsa filas={resultado.filas} />;
      case "puntoFijo":
        return <TablaPuntoFijo filas={resultado.filas} />;
      case "newtonRaphson":
        return <TablaNewtonRaphson filas={resultado.filas} />;
      case "newtonRaphsonModificado":
        return <TablaNewtonRaphsonModificado filas={resultado.filas} />;
      case "aitkenSteffensen":
        return <TablaAitkenSteffensen filas={resultado.filas} />;
      default:
        return <TablaBiseccion filas={resultado.filas} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar
        metodos={METODOS}
        metodoActivo={metodoActivo}
        onSeleccionarMetodo={cambiarMetodo}
        menuAbierto={menuAbierto}
        onToggleMenu={setMenuAbierto}
      />

      <main className="min-h-screen overflow-x-hidden md:ml-72">
        <Header metodoActual={metodoActual} menuAbierto={menuAbierto} onToggleMenu={setMenuAbierto} />

        <div className="mx-auto max-w-7xl space-y-7 p-5 md:p-8">
          <section>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <BookOpen size={18} /> Análisis numérico
            </div>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Calculadora de {metodoActual.label}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {metodoActual.description}. Ingresa los datos y ejecuta el método para obtener la aproximación numérica y la tabla de iteraciones.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600"><Calculator size={22} /></div>
              <div>
                <h3 className="font-bold text-slate-900">Datos de entrada</h3>
                <p className="text-sm text-slate-500">Configura los parámetros del método seleccionado.</p>
              </div>
            </div>

            <form onSubmit={ejecutarMetodo} className="space-y-5">
              {renderizarFormulario()}

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={20} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                <button type="submit" className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                  <Play size={18} /> Calcular resultado
                </button>
                <button type="button" onClick={limpiar} className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50">
                  <RotateCcw size={18} /> Limpiar
                </button>
              </div>
            </form>
          </section>

          {resultado && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Raíz aproximada</p>
                  <p className="mt-2 text-2xl font-bold text-blue-700">{formatearNumero(resultado.raiz)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Iteraciones</p>
                  <p className="mt-2 text-2xl font-bold">{resultado.iteraciones}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Error final</p>
                  <p className="mt-2 text-2xl font-bold">{formatearNumero(resultado.errorFinal)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Convergencia</p>
                  <p className={`mt-2 flex items-center gap-2 text-lg font-bold ${resultado.convergio ? "text-green-600" : "text-amber-600"}`}>
                    {resultado.convergio ? <CheckCircle2 size={21} /> : <AlertCircle size={21} />}
                    {resultado.convergio ? "Converge" : "No converge"}
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
                  <div>
                    <h3 className="font-bold text-slate-900">Tabla de iteraciones</h3>
                    <p className="mt-1 text-sm text-slate-500">Desarrollo del método paso a paso.</p>
                  </div>
                  <button onClick={exportarResultado} className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700">
                    <FileSpreadsheet size={18} /> Exportar Excel
                  </button>
                </div>

                <div className="overflow-x-auto">{renderizarFilas()}</div>
                <div className="border-t border-slate-100 p-4 text-xs text-slate-500">Total de iteraciones: {resultado.iteraciones}</div>
              </section>
            </>
          )}

          {!resultado && (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Activity size={28} />
              </div>
              <h3 className="font-semibold text-slate-800">Esperando datos de entrada</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">Completa los parámetros del método y presiona “Calcular resultado” para visualizar las iteraciones.</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
