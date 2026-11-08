import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaJacobi({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["k", "x", "error", "convergencia"]} />;
}
