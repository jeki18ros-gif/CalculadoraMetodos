import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaGaussSeidel({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["k", "x", "error", "convergencia"]} />;
}
