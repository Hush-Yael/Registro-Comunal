import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { Row } from "../../../components/table";
import { DBComunalRecord } from "../../../types/db";

const Clap = (props: { records: DBComunalRecord<"clap">[] }) => (
  <Table<"clap">
    records={props.records}
    columns={
      <>
        <th>#</th>
        <th>Cedula</th>
        <th>Posee</th>
        <th class="!text-center">Cantidad</th>
      </>
    }
  >
    {({ cedula, posee, cantidad }) => (
      <Row>
        <td>{Cedula(cedula)}</td>
        <td>
          <Answer value={SQLiteBool(posee)} />
        </td>
        <td class="text-center">{posee ? cantidad : ""}</td>
      </Row>
    )}
  </Table>
);
export default Clap;
