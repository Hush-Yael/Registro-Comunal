import { Row } from "../../../components/table";
import { parseDir } from "../../../lib/data";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import Dash from "../../../components/dash";
import { A } from "@solidjs/router";
import { DBComunalRecords } from "../../../types/db";
import { commonFilters } from "..";

const Homes = (props: { data: DBComunalRecords["home"] }) => (
  <Table<"home">
    class="m-auto p-2"
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
    {(
      { cedula, nombres, apellidos, numCasa, calle, avenida, referencia },
      i
    ) => (
      <Row>
        <td class="!text-right">{i() + 1}</td>
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
      </Row>
    )}
  </Table>
);
export default Homes;
