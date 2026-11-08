import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaTrapecio({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["i", "x", "f_x", "suma_parcial"]} />;
}
