import { parseDir } from "../../../lib/data";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import Dash from "../../../components/data/dash";
import { A } from "@solidjs/router";
import { TableRecords } from "../../../types/db";
import { commonFilters } from "..";
import WithSelectFallecidos from "../components/with-select-fallecidos";

const Homes = (props: { data: TableRecords["homes"] }) => (
  <WithSelectFallecidos hidden={!props.data.length}>
    <Table
      tableName="homes"
      class="m-auto"
      records={props.data}
      filters={[
        ...commonFilters,
        { label: "N° de casa", value: "numCasa", dashNumbers: true },
        { label: "calle", value: "calle", dashNumbers: true },
        { label: "avenida", value: "avenida", dashNumbers: true },
        "referencia",
      ]}
      columns={[
        { text: "Cédula", align: "r" },
        "Nombres y Apellidos",
        { text: "N°", align: "r" },
        "Dirección",
        "Referencias",
      ]}
    >
      {({
        cedula,
        nombres,
        apellidos,
        numCasa,
        calle,
        avenida,
        referencia,
      }) => (
        <>
          <td class="!text-right whitespace-nowrap">
            <A class="link" href={`/jefe/${cedula}`}>
              {Cedula(cedula, null)}
            </A>
          </td>
          <td class="!min-w-[20ch]">
            {nombres} {apellidos}
          </td>
          <td class="whitespace-nowrap !text-right">{numCasa || <Dash />}</td>
          <td class="first-letter:uppercase">{parseDir(calle, avenida)}</td>
          <td>{referencia}</td>
        </>
      )}
    </Table>
  </WithSelectFallecidos>
);
export default Homes;
