import { TablaMetodoGeneral } from "../common/TablaMetodoGeneral";

export function TablaSecante({ filas }) {
  return (
    <TablaMetodoGeneral
      filas={filas}
      columnas={["k", "x0", "x1", "f_x0", "f_x1", "x2", "error", "convergencia"]}
    />
  );
}
