import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaRK4({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["n", "x", "y", "k1", "k2", "k3", "k4", "y_siguiente", "error", "convergencia"]} />;
}
