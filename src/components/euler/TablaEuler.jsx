import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaEuler({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["n", "x", "y", "k1", "y_siguiente", "error", "convergencia"]} />;
}
