import { Row } from "../../../components/table";
import { A } from "@solidjs/router";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";

const Jefes = (props: { records: DBComunalRecord<"jefe">[] }) => (
  <Table<"jefe">
    records={props.records}
    columns={["#", "Cédula", "Nombres", "Apellidos"]}
  >
    {({ cedula, nombres, apellidos }, i) => (
      <Row>
        <td>{i() + 1}</td>
        <td class="min-w-max">
          <A href={`/jefe/${cedula}`}>{Cedula(cedula)}</A>
        </td>
        <td class="min-w-max">{nombres}</td>
        <td class="min-w-max">{apellidos}</td>
      </Row>
    )}
  </Table>
);
export default Jefes;
