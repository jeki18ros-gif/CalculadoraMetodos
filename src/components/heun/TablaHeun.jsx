import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaHeun({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["n", "x", "y", "k1", "k2", "y_predicho", "y_siguiente", "error", "convergencia"]} />;
}
