import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaGaussEliminacion({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["paso", "pivot", "error", "solucion"]} />;
}
