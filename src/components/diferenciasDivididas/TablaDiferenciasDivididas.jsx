import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaDiferenciasDivididas({ filas }) {
  return <TablaMetodoGeneral filas={filas} columnas={["orden", "valores"]} />;
}
