import { Row } from "../../../components/table";
import { parseDir } from "../../../lib/data";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";

const Homes = (props: { records: DBComunalRecord<"home">[] }) => (
  <Table<"home">
    records={props.records}
    columns={
      <>
        <th class="!text-right">#</th>
        <th class="!text-right">Cedula</th>
        <th class="!text-right">N°</th>
        <th>Dirección</th>
        <th>Referencias</th>
      </>
    }
  >
    {({ cedula, numCasa, calle, avenida, referencia }, i) => (
      <Row>
        <td class="!text-right">{i() + 1}</td>
        <td class="!text-right">{Cedula(cedula)}</td>
        <td class="!text-right">{numCasa}</td>
        <td class="first-letter:uppercase">{parseDir(calle, avenida)}</td>
        <td>{referencia}</td>
      </Row>
    )}
  </Table>
);
export default Homes;
