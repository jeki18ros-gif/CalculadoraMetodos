import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaLagrange({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["i", "x_i", "y_i", "l_i", "contribucion"]} />;
}
