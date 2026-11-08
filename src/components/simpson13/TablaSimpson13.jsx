import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaSimpson13({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["i", "x", "f_x", "peso"]} />;
}
