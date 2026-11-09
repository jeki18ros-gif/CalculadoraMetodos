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
import { TeoriaErrores } from "../components/teoriaErrores/TeoriaErrores";

import { FormularioBiseccion } from "../components/biseccion/FormularioBiseccion";
import { TablaBiseccion } from "../components/biseccion/TablaBiseccion";
import { FormularioReglaFalsa } from "../components/reglaFalsa/FormularioReglaFalsa";
import { TablaReglaFalsa } from "../components/reglaFalsa/TablaReglaFalsa";
import { FormularioSecante } from "../components/secante/FormularioSecante";
import { TablaSecante } from "../components/secante/TablaSecante";
import { FormularioPuntoFijo } from "../components/puntoFijo/FormularioPuntoFijo";
import { TablaPuntoFijo } from "../components/puntoFijo/TablaPuntoFijo";
import { FormularioNewtonRaphson } from "../components/newtonRaphson/FormularioNewtonRaphson";
import { TablaNewtonRaphson } from "../components/newtonRaphson/TablaNewtonRaphson";
import { FormularioNewtonRaphsonModificado } from "../components/newtonRaphsonModificado/FormularioNewtonRaphsonModificado";
import { TablaNewtonRaphsonModificado } from "../components/newtonRaphsonModificado/TablaNewtonRaphsonModificado";
import { FormularioAitkenSteffensen } from "../components/aitkenSteffensen/FormularioAitkenSteffensen";
import { TablaAitkenSteffensen } from "../components/aitkenSteffensen/TablaAitkenSteffensen";
import { FormularioGaussEliminacion } from "../components/gaussEliminacion/FormularioGaussEliminacion";
import { TablaGaussEliminacion } from "../components/gaussEliminacion/TablaGaussEliminacion";
import { FormularioGaussJordan } from "../components/gaussJordan/FormularioGaussJordan";
import { TablaGaussJordan } from "../components/gaussJordan/TablaGaussJordan";
import { FormularioJacobi } from "../components/jacobi/FormularioJacobi";
import { TablaJacobi } from "../components/jacobi/TablaJacobi";
import { FormularioGaussSeidel } from "../components/gaussSeidel/FormularioGaussSeidel";
import { TablaGaussSeidel } from "../components/gaussSeidel/TablaGaussSeidel";
import { FormularioTrapecio } from "../components/trapecio/FormularioTrapecio";
import { TablaTrapecio } from "../components/trapecio/TablaTrapecio";
import { FormularioSimpson13 } from "../components/simpson13/FormularioSimpson13";
import { TablaSimpson13 } from "../components/simpson13/TablaSimpson13";
import { FormularioSimpson38 } from "../components/simpson38/FormularioSimpson38";
import { TablaSimpson38 } from "../components/simpson38/TablaSimpson38";
import { FormularioLagrange } from "../components/lagrange/FormularioLagrange";
import { TablaLagrange } from "../components/lagrange/TablaLagrange";
import { FormularioDiferenciasDivididas } from "../components/diferenciasDivididas/FormularioDiferenciasDivididas";
import { TablaDiferenciasDivididas } from "../components/diferenciasDivididas/TablaDiferenciasDivididas";
import { FormularioEuler } from "../components/euler/FormularioEuler";
import { TablaEuler } from "../components/euler/TablaEuler";
import { FormularioHeun } from "../components/heun/FormularioHeun";
import { TablaHeun } from "../components/heun/TablaHeun";
import { FormularioRK4 } from "../components/rk4/FormularioRK4";
import { TablaRK4 } from "../components/rk4/TablaRK4";

import { calcularBiseccion } from "../methods/biseccion/calcularBiseccion";
import { exportarBiseccion } from "../methods/biseccion/exportarBiseccion";
import { calcularReglaFalsa } from "../methods/reglaFalsa/calcularReglaFalsa";
import { exportarReglaFalsa } from "../methods/reglaFalsa/exportarReglaFalsa";
import { calcularSecante } from "../methods/secante/calcularSecante";
import { exportarSecante } from "../methods/secante/exportarSecante";
import { calcularPuntoFijo } from "../methods/puntoFijo/calcularPuntoFijo";
import { exportarPuntoFijo } from "../methods/puntoFijo/exportarPuntoFijo";
import { calcularNewtonRaphson } from "../methods/newtonRaphson/calcularNewtonRaphson";
import { exportarNewtonRaphson } from "../methods/newtonRaphson/exportarNewtonRaphson";
import { calcularNewtonRaphsonModificado } from "../methods/newtonRaphsonModificado/calcularNewtonRaphsonModificado";
import { exportarNewtonRaphsonModificado } from "../methods/newtonRaphsonModificado/exportarNewtonRaphsonModificado";
import { calcularAitkenSteffensen } from "../methods/aitkenSteffensen/calcularAitkenSteffensen";
import { exportarAitkenSteffensen } from "../methods/aitkenSteffensen/exportarAitkenSteffensen";
import { calcularGaussEliminacion } from "../methods/gaussEliminacion/calcularGaussEliminacion";
import { exportarGaussEliminacion } from "../methods/gaussEliminacion/exportarGaussEliminacion";
import { calcularGaussJordan } from "../methods/gaussJordan/calcularGaussJordan";
import { exportarGaussJordan } from "../methods/gaussJordan/exportarGaussJordan";
import { calcularJacobi } from "../methods/jacobi/calcularJacobi";
import { exportarJacobi } from "../methods/jacobi/exportarJacobi";
import { calcularGaussSeidel } from "../methods/gaussSeidel/calcularGaussSeidel";
import { exportarGaussSeidel } from "../methods/gaussSeidel/exportarGaussSeidel";
import { calcularTrapecio } from "../methods/trapecio/calcularTrapecio";
import { exportarTrapecio } from "../methods/trapecio/exportarTrapecio";
import { calcularSimpson13 } from "../methods/simpson13/calcularSimpson13";
import { exportarSimpson13 } from "../methods/simpson13/exportarSimpson13";
import { calcularSimpson38 } from "../methods/simpson38/calcularSimpson38";
import { exportarSimpson38 } from "../methods/simpson38/exportarSimpson38";
import { calcularLagrange } from "../methods/lagrange/calcularLagrange";
import { exportarLagrange } from "../methods/lagrange/exportarLagrange";
import { calcularDiferenciasDivididas } from "../methods/diferenciasDivididas/calcularDiferenciasDivididas";
import { exportarDiferenciasDivididas } from "../methods/diferenciasDivididas/exportarDiferenciasDivididas";
import { calcularEuler } from "../methods/euler/calcularEuler";
import { exportarEuler } from "../methods/euler/exportarEuler";
import { calcularHeun } from "../methods/heun/calcularHeun";
import { exportarHeun } from "../methods/heun/exportarHeun";
import { calcularRK4 } from "../methods/rk4/calcularRK4";
import { exportarRK4 } from "../methods/rk4/exportarRK4";

const METODOS = [
  { id: "biseccion", label: "Bisección", description: "Método de intervalos" },
  { id: "reglaFalsa", label: "Regla Falsa", description: "Interpolación lineal" },
  { id: "secante", label: "Secante", description: "Aproximación secante" },
  { id: "puntoFijo", label: "Punto fijo", description: "Iteración de punto fijo" },
  { id: "newtonRaphson", label: "Newton-Raphson", description: "Tangentes" },
  { id: "newtonRaphsonModificado", label: "Newton-Raphson modificado", description: "Segunda derivada" },
  { id: "aitkenSteffensen", label: "Aitken-Steffensen", description: "Aceleración de convergencia" },
  { id: "gaussEliminacion", label: "Gauss", description: "Eliminación directa" },
  { id: "gaussJordan", label: "Gauss-Jordan", description: "Matriz reducida" },
  { id: "jacobi", label: "Jacobi", description: "Iteración paralela" },
  { id: "gaussSeidel", label: "Gauss-Seidel", description: "Actualización inmediata" },
  { id: "trapecio", label: "Trapecio", description: "Integración numérica" },
  { id: "simpson13", label: "Simpson 1/3", description: "Regla parabólica" },
  { id: "simpson38", label: "Simpson 3/8", description: "Regla cúbica" },
  { id: "lagrange", label: "Lagrange", description: "Interpolación polinómica" },
  { id: "diferenciasDivididas", label: "Diferencias divididas", description: "Newton dividido" },
  { id: "euler", label: "Euler", description: "EDO de un paso" },
  { id: "heun", label: "Heun", description: "Euler mejorado" },
  { id: "rk4", label: "Runge-Kutta 4", description: "EDO de orden 4" },
];

const SECCION_TEORIA_ERRORES = {
  id: "teoriaErrores",
  label: "Teoría de errores",
  description: "Mediciones e incertidumbre",
};

const crearEstadoInicial = (metodoId) => {
  const base = {
    funcion: "x^2 - 2",
    gFuncion: "(x + 2/x) / 2",
    derivada: "2*x",
    segundaDerivada: "2",
    a: "0",
    b: "1",
    x0: "1",
    x1: "2",
    y0: "1",
    h: "0.1",
    n: "10",
    matrizA: "4 1 -1; 2 5 1; 1 2 4",
    vectorB: "7; 8; 9",
    puntos: "0,1; 1,3; 2,9",
    xObjetivo: "1.5",
    tolerancia: "0.00001",
  };

  if (metodoId === "puntoFijo" || metodoId === "aitkenSteffensen") {
    base.funcion = "";
  }

  if (metodoId === "newtonRaphson" || metodoId === "newtonRaphsonModificado") {
    base.funcion = "x^2 - 2";
  }

  if (metodoId === "gaussEliminacion" || metodoId === "gaussJordan" || metodoId === "jacobi" || metodoId === "gaussSeidel") {
    base.matrizA = "4 1 -1; 2 5 1; 1 2 4";
    base.vectorB = "7; 8; 9";
    base.x0 = "0; 0; 0";
  }

  if (metodoId === "trapecio" || metodoId === "simpson13" || metodoId === "simpson38") {
    base.funcion = "x^2";
    base.a = "0";
    base.b = "1";
    base.n = "10";
  }

  if (metodoId === "lagrange" || metodoId === "diferenciasDivididas") {
    base.puntos = "0,1; 1,3; 2,9";
    base.xObjetivo = "1.5";
  }

  if (metodoId === "euler" || metodoId === "heun" || metodoId === "rk4") {
    base.funcion = "y - x";
    base.x0 = "0";
    base.y0 = "1";
    base.h = "0.1";
    base.n = "10";
  }

  return base;
};

const formatearNumero = (valor) => {
  if (Array.isArray(valor)) {
    return valor.map((item) => formatearNumero(item)).join(", ");
  }

  if (valor === null || valor === undefined) return "—";
  if (typeof valor === "object") {
    return JSON.stringify(valor);
  }

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
    () =>
      metodoActivo === SECCION_TEORIA_ERRORES.id
        ? SECCION_TEORIA_ERRORES
        : METODOS.find((metodo) => metodo.id === metodoActivo) ?? METODOS[0],
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
        setResultado(calcularBiseccion({ funcion: formulario.funcion, a: formulario.a, b: formulario.b, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "reglaFalsa") {
        setResultado(calcularReglaFalsa({ funcion: formulario.funcion, a: formulario.a, b: formulario.b, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "secante") {
        setResultado(calcularSecante({ funcion: formulario.funcion, x0: formulario.x0, x1: formulario.x1, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "puntoFijo") {
        setResultado(calcularPuntoFijo({ gFuncion: formulario.gFuncion, x0: formulario.x0, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "newtonRaphson") {
        setResultado(calcularNewtonRaphson({ funcion: formulario.funcion, derivada: formulario.derivada, x0: formulario.x0, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "newtonRaphsonModificado") {
        setResultado(calcularNewtonRaphsonModificado({ funcion: formulario.funcion, derivada: formulario.derivada, segundaDerivada: formulario.segundaDerivada, x0: formulario.x0, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "aitkenSteffensen") {
        setResultado(calcularAitkenSteffensen({ gFuncion: formulario.gFuncion, x0: formulario.x0, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "gaussEliminacion") {
        setResultado(calcularGaussEliminacion({ matrizA: formulario.matrizA, vectorB: formulario.vectorB, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "gaussJordan") {
        setResultado(calcularGaussJordan({ matrizA: formulario.matrizA, vectorB: formulario.vectorB, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "jacobi") {
        setResultado(calcularJacobi({ matrizA: formulario.matrizA, vectorB: formulario.vectorB, x0: formulario.x0, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "gaussSeidel") {
        setResultado(calcularGaussSeidel({ matrizA: formulario.matrizA, vectorB: formulario.vectorB, x0: formulario.x0, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "trapecio") {
        setResultado(calcularTrapecio({ funcion: formulario.funcion, a: formulario.a, b: formulario.b, n: formulario.n, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "simpson13") {
        setResultado(calcularSimpson13({ funcion: formulario.funcion, a: formulario.a, b: formulario.b, n: formulario.n, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "simpson38") {
        setResultado(calcularSimpson38({ funcion: formulario.funcion, a: formulario.a, b: formulario.b, n: formulario.n, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "lagrange") {
        setResultado(calcularLagrange({ puntos: formulario.puntos, xObjetivo: formulario.xObjetivo }));
        return;
      }

      if (metodoActivo === "diferenciasDivididas") {
        setResultado(calcularDiferenciasDivididas({ puntos: formulario.puntos, xObjetivo: formulario.xObjetivo }));
        return;
      }

      if (metodoActivo === "euler") {
        setResultado(calcularEuler({ funcion: formulario.funcion, x0: formulario.x0, y0: formulario.y0, h: formulario.h, n: formulario.n, tolerancia: formulario.tolerancia }));
        return;
      }

      if (metodoActivo === "heun") {
        setResultado(calcularHeun({ funcion: formulario.funcion, x0: formulario.x0, y0: formulario.y0, h: formulario.h, n: formulario.n, tolerancia: formulario.tolerancia }));
        return;
      }

      setResultado(calcularRK4({ funcion: formulario.funcion, x0: formulario.x0, y0: formulario.y0, h: formulario.h, n: formulario.n, tolerancia: formulario.tolerancia }));
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

    if (metodoActivo === "secante") {
      exportarSecante(resultado, nombreFuncion, formulario.funcion, formulario.tolerancia, formulario.x0, formulario.x1);
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
      exportarNewtonRaphsonModificado(resultado, nombreFuncion, formulario.funcion, formulario.derivada, formulario.segundaDerivada, formulario.tolerancia, formulario.x0);
      return;
    }

    if (metodoActivo === "aitkenSteffensen") {
      exportarAitkenSteffensen(resultado, nombreFuncion, formulario.gFuncion, formulario.tolerancia, formulario.x0);
      return;
    }

    if (metodoActivo === "gaussEliminacion") {
      exportarGaussEliminacion(resultado, nombreFuncion, formulario.matrizA, formulario.vectorB);
      return;
    }

    if (metodoActivo === "gaussJordan") {
      exportarGaussJordan(resultado, nombreFuncion, formulario.matrizA, formulario.vectorB);
      return;
    }

    if (metodoActivo === "jacobi") {
      exportarJacobi(resultado, nombreFuncion, formulario.matrizA, formulario.vectorB, formulario.x0);
      return;
    }

    if (metodoActivo === "gaussSeidel") {
      exportarGaussSeidel(resultado, nombreFuncion, formulario.matrizA, formulario.vectorB, formulario.x0);
      return;
    }

    if (metodoActivo === "trapecio") {
      exportarTrapecio(resultado, nombreFuncion, formulario.funcion, formulario.a, formulario.b, formulario.n);
      return;
    }

    if (metodoActivo === "simpson13") {
      exportarSimpson13(resultado, nombreFuncion, formulario.funcion, formulario.a, formulario.b, formulario.n);
      return;
    }

    if (metodoActivo === "simpson38") {
      exportarSimpson38(resultado, nombreFuncion, formulario.funcion, formulario.a, formulario.b, formulario.n);
      return;
    }

    if (metodoActivo === "lagrange") {
      exportarLagrange(resultado, nombreFuncion, formulario.puntos, formulario.xObjetivo);
      return;
    }

    if (metodoActivo === "diferenciasDivididas") {
      exportarDiferenciasDivididas(resultado, nombreFuncion, formulario.puntos, formulario.xObjetivo);
      return;
    }

    if (metodoActivo === "euler") {
      exportarEuler(resultado, nombreFuncion, formulario.funcion, formulario.x0, formulario.y0, formulario.h, formulario.n);
      return;
    }

    if (metodoActivo === "heun") {
      exportarHeun(resultado, nombreFuncion, formulario.funcion, formulario.x0, formulario.y0, formulario.h, formulario.n);
      return;
    }

    exportarRK4(resultado, nombreFuncion, formulario.funcion, formulario.x0, formulario.y0, formulario.h, formulario.n);
  };

  const renderizarFormulario = () => {
    return (
      <div className="space-y-5">
        {metodoActivo === "biseccion" && <FormularioBiseccion formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "reglaFalsa" && <FormularioReglaFalsa formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "secante" && <FormularioSecante formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "puntoFijo" && <FormularioPuntoFijo formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "newtonRaphson" && <FormularioNewtonRaphson formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "newtonRaphsonModificado" && (
          <FormularioNewtonRaphsonModificado formulario={formulario} actualizarCampo={actualizarCampo} />
        )}
        {metodoActivo === "aitkenSteffensen" && <FormularioAitkenSteffensen formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "gaussEliminacion" && <FormularioGaussEliminacion formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "gaussJordan" && <FormularioGaussJordan formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "jacobi" && <FormularioJacobi formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "gaussSeidel" && <FormularioGaussSeidel formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "trapecio" && <FormularioTrapecio formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "simpson13" && <FormularioSimpson13 formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "simpson38" && <FormularioSimpson38 formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "lagrange" && <FormularioLagrange formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "diferenciasDivididas" && (
          <FormularioDiferenciasDivididas formulario={formulario} actualizarCampo={actualizarCampo} />
        )}
        {metodoActivo === "euler" && <FormularioEuler formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "heun" && <FormularioHeun formulario={formulario} actualizarCampo={actualizarCampo} />}
        {metodoActivo === "rk4" && <FormularioRK4 formulario={formulario} actualizarCampo={actualizarCampo} />}

        {!["gaussEliminacion", "gaussJordan", "jacobi", "gaussSeidel", "lagrange", "diferenciasDivididas"].includes(metodoActivo) && (
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
        )}
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
      case "secante":
        return <TablaSecante filas={resultado.filas} />;
      case "puntoFijo":
        return <TablaPuntoFijo filas={resultado.filas} />;
      case "newtonRaphson":
        return <TablaNewtonRaphson filas={resultado.filas} />;
      case "newtonRaphsonModificado":
        return <TablaNewtonRaphsonModificado filas={resultado.filas} />;
      case "aitkenSteffensen":
        return <TablaAitkenSteffensen filas={resultado.filas} />;
      case "gaussEliminacion":
        return <TablaGaussEliminacion filas={resultado.filas} />;
      case "gaussJordan":
        return <TablaGaussJordan filas={resultado.filas} />;
      case "jacobi":
        return <TablaJacobi filas={resultado.filas} />;
      case "gaussSeidel":
        return <TablaGaussSeidel filas={resultado.filas} />;
      case "trapecio":
        return <TablaTrapecio filas={resultado.filas} />;
      case "simpson13":
        return <TablaSimpson13 filas={resultado.filas} />;
      case "simpson38":
        return <TablaSimpson38 filas={resultado.filas} />;
      case "lagrange":
        return <TablaLagrange filas={resultado.filas} />;
      case "diferenciasDivididas":
        return <TablaDiferenciasDivididas filas={resultado.filas} />;
      case "euler":
        return <TablaEuler filas={resultado.filas} />;
      case "heun":
        return <TablaHeun filas={resultado.filas} />;
      case "rk4":
        return <TablaRK4 filas={resultado.filas} />;
      default:
        return <TablaBiseccion filas={resultado.filas} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar
        metodos={METODOS}
        seccionSuperior={SECCION_TEORIA_ERRORES}
        metodoActivo={metodoActivo}
        onSeleccionarMetodo={cambiarMetodo}
        menuAbierto={menuAbierto}
        onToggleMenu={setMenuAbierto}
      />

      <main className="min-h-screen overflow-x-hidden md:ml-72">
        <Header
          metodoActual={metodoActual}
          menuAbierto={menuAbierto}
          onToggleMenu={setMenuAbierto}
          temaOscuro={metodoActivo === SECCION_TEORIA_ERRORES.id}
        />

        {metodoActivo === SECCION_TEORIA_ERRORES.id ? (
          <TeoriaErrores />
        ) : (
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
                  <p className="text-sm text-slate-500">Resultado</p>
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
        )}
      </main>
    </div>
  );
}
