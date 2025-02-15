import { Row } from "../../../components/table";
import { parseDir } from "../../../lib/data";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";
import Dash from "../../../components/dash";
import { A } from "@solidjs/router";

const Homes = (props: { records: DBComunalRecord<"home">[] }) => (
  <Table<"home">
    records={props.records}
    filters={[
      { label: "cédula", value: "cedula" },
      "nombres",
      "apellidos",
      { label: "N° de casa", value: "numCasa" },
      "calle",
      "avenida",
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
        <td class="!text-right">
          <A class="link" href={`/jefe/${cedula}`}>
            {Cedula(cedula, null)}
          </A>
        </td>
        <td>
          {nombres} {apellidos}
        </td>
        <td class="!text-right">{numCasa || <Dash />}</td>
        <td class="first-letter:uppercase">{parseDir(calle, avenida)}</td>
        <td>{referencia}</td>
      </Row>
    )}
  </Table>
);
export default Homes;
