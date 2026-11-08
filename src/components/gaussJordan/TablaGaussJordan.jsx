import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaGaussJordan({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["paso", "pivot", "error", "solucion"]} />;
}
