import { A } from "@solidjs/router";
import { commonFilters } from "..";
import { TableRecords } from "../../../types/db";
import { Table } from "../components/table";
import { cedula as Cedula, parseDir } from "../../../lib/data";
import Dash from "../../../components/data/dash";

const Businesses = (props: { data: TableRecords["businesses"] }) => (
  <Table
    tableName="businesses"
    class="m-auto p-2"
    records={props.data}
    filters={[
      ...commonFilters,
      { label: "calle", value: "calle", dashNumbers: true },
      { label: "avenida", value: "avenida", dashNumbers: true },
      { label: "RIF", value: "RIF", number: true },
      { label: "tipo", value: "tipo", lettersOnly: true },
    ]}
    columns={[
      { text: "Cédula", align: "r" },
      "Nombres y Apellidos",
      { text: "RIF", align: "r" },
      "Dirección",
      "Tipo",
    ]}
  >
    {({ cedula, nombres, apellidos, RIF, calle, avenida, tipo }) => (
      <>
        <td class="!text-right whitespace-nowrap">
          <A class="link" href={`/jefe/${cedula}`}>
            {Cedula(cedula, null)}
          </A>
        </td>
        <td class="!min-w-[20ch]">
          {nombres} {apellidos}
        </td>
        <td class="whitespace-nowrap !text-right">
          {(RIF && RIF.toLocaleString()) || <Dash />}
        </td>
        <td class="!min-w-[20ch]">{parseDir(calle, avenida)}</td>
        <td>{tipo || <Dash />}</td>
      </>
    )}
  </Table>
);
export default Businesses;
