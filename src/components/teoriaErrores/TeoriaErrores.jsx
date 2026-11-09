import { useState } from "react";
import {
  calcularMedicionesDirectas,
  calcularMedicionesIndirectas,
} from "../../methods/teoriaErrores/calcularTeoriaErrores";
import { VistaTeoriaErrores } from "./VistaTeoriaErrores";

const estadoDirectoInicial = {
  magnitud: "",
  unidad: "",
  mediciones: ["", ""],
  incertidumbreInstrumental: "",
};

const estadoIndirectoInicial = {
  opcion: "suma",
  valorA: "",
  incertidumbreA: "",
  unidadA: "",
  valorB: "",
  incertidumbreB: "",
  unidadB: "",
  exponente: "",
  unidadY: "",
  nombreY: "",
};

export function TeoriaErrores() {
  const [pestanaActiva, setPestanaActiva] = useState("directas");
  const [directas, setDirectas] = useState(estadoDirectoInicial);
  const [indirectas, setIndirectas] = useState(estadoIndirectoInicial);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const cambiarPestana = (pestana) => {
    setPestanaActiva(pestana);
    setResultado(null);
    setError("");
  };

  const actualizarDirectas = (evento) => {
    const { name, value } = evento.target;
    setDirectas((actual) => ({ ...actual, [name]: value }));
    setResultado(null);
    setError("");
  };

  const actualizarMedicion = (indice, valor) => {
    setDirectas((actual) => ({
      ...actual,
      mediciones: actual.mediciones.map((medicion, i) =>
        i === indice ? valor : medicion
      ),
    }));
    setResultado(null);
    setError("");
  };

  const agregarMedicion = () => {
    setDirectas((actual) => ({
      ...actual,
      mediciones: [...actual.mediciones, ""],
    }));
  };

  const quitarMedicion = (indice) => {
    setDirectas((actual) => ({
      ...actual,
      mediciones: actual.mediciones.filter((_, i) => i !== indice),
    }));
    setResultado(null);
    setError("");
  };

  const actualizarIndirectas = (evento) => {
    const { name, value } = evento.target;
    setIndirectas((actual) => ({ ...actual, [name]: value }));
    setResultado(null);
    setError("");
  };

  const calcular = (evento) => {
    evento.preventDefault();
    setResultado(null);
    setError("");

    try {
      const nuevoResultado =
        pestanaActiva === "directas"
          ? {
              tipo: "directas",
              ...calcularMedicionesDirectas(directas),
            }
          : {
              tipo: "indirectas",
              ...calcularMedicionesIndirectas(indirectas),
            };
      setResultado(nuevoResultado);
    } catch (errorCalculo) {
      setError(errorCalculo.message || "No fue posible calcular la incertidumbre.");
    }
  };

  const limpiar = () => {
    setDirectas({
      ...estadoDirectoInicial,
      mediciones: [...estadoDirectoInicial.mediciones],
    });
    setIndirectas({ ...estadoIndirectoInicial });
    setResultado(null);
    setError("");
  };

  return (
    <VistaTeoriaErrores
      pestanaActiva={pestanaActiva}
      directas={directas}
      indirectas={indirectas}
      resultado={resultado}
      error={error}
      onCambiarPestana={cambiarPestana}
      onActualizarDirectas={actualizarDirectas}
      onActualizarMedicion={actualizarMedicion}
      onAgregarMedicion={agregarMedicion}
      onQuitarMedicion={quitarMedicion}
      onActualizarIndirectas={actualizarIndirectas}
      onCalcular={calcular}
      onLimpiar={limpiar}
    />
  );
}
