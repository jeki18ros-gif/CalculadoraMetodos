import { parse } from "mathjs";
import * as XLSX from "xlsx";

const funcionesExcel = {
  abs: "ABS",
  acos: "ACOS",
  asin: "ASIN",
  atan: "ATAN",
  cos: "COS",
  cosh: "COSH",
  exp: "EXP",
  log10: "LOG10",
  max: "MAX",
  min: "MIN",
  sin: "SIN",
  sinh: "SINH",
  sqrt: "SQRT",
  tan: "TAN",
  tanh: "TANH",
};

function convertirNodoExcel(nodo, variables) {
  if (nodo.type === "ParenthesisNode") {
    return `(${convertirNodoExcel(nodo.content, variables)})`;
  }

  if (nodo.type === "ConstantNode") {
    return String(nodo.value);
  }

  if (nodo.type === "SymbolNode") {
    if (nodo.name === "pi") return "PI()";
    if (nodo.name === "e") return "EXP(1)";
    return variables[nodo.name] ?? null;
  }

  if (nodo.type === "OperatorNode") {
    const argumentos = nodo.args.map((argumento) => convertirNodoExcel(argumento, variables));
    if (argumentos.some((argumento) => argumento === null)) return null;
    if (argumentos.length === 1 && (nodo.op === "-" || nodo.op === "+")) {
      return `${nodo.op}${argumentos[0]}`;
    }

    const operador = { add: "+", subtract: "-", multiply: "*", divide: "/", pow: "^" }[nodo.fn];
    return operador && argumentos.length === 2
      ? `(${argumentos[0]}${operador}${argumentos[1]})`
      : null;
  }

  if (nodo.type === "FunctionNode" && nodo.fn.type === "SymbolNode") {
    const nombre = nodo.fn.name.toLowerCase();
    const argumentos = nodo.args.map((argumento) => convertirNodoExcel(argumento, variables));
    if (argumentos.some((argumento) => argumento === null)) return null;

    if (nombre === "ln" && argumentos.length === 1) return `LN(${argumentos[0]})`;
    if (nombre === "log" && argumentos.length === 1) return `LN(${argumentos[0]})`;
    if (nombre === "log" && argumentos.length === 2) return `LOG(${argumentos.join(",")})`;
    if (nombre === "round" && argumentos.length === 1) return `ROUND(${argumentos[0]},0)`;
    if (nombre === "pow" && argumentos.length === 2) return `POWER(${argumentos.join(",")})`;

    const funcion = funcionesExcel[nombre];
    return funcion ? `${funcion}(${argumentos.join(",")})` : null;
  }

  return null;
}

export function expresionExcel(expresion, variables) {
  if (!expresion?.trim()) return null;

  try {
    return convertirNodoExcel(parse(expresion), variables);
  } catch {
    return null;
  }
}

export function insertarFormulas(hoja, encabezados, datos, filaEncabezado, crearFormulas) {
  const posiciones = Object.fromEntries(encabezados.map((encabezado, indice) => [encabezado, indice]));

  datos.forEach((datosFila, indice) => {
    const numeroFila = filaEncabezado + indice + 2;
    const formulas = crearFormulas({ numeroFila, indice, posiciones }) ?? {};

    Object.entries(formulas).forEach(([encabezado, formula]) => {
      const posicion = posiciones[encabezado];
      const valor = datosFila[posicion];
      if (!formula || typeof valor !== "number" || !Number.isFinite(valor)) return;

      const direccion = XLSX.utils.encode_cell({ r: numeroFila - 1, c: posicion });
      hoja[direccion] = { t: "n", v: valor, f: formula.startsWith("=") ? formula.slice(1) : formula };
    });
  });
}
