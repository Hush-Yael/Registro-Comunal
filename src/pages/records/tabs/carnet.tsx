import { Row } from "../../../components/table";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";

const Carnet = (props: { records: DBComunalRecord<"carnet">[] }) => (
  <Table<"carnet">
    records={props.records}
    columns={
      <>
        <th>#</th>
        <th>Cedula</th>
        <th class="!text-center">Posee</th>
      </>
    }
  >
    {({ cedula, posee }, i) => (
      <Row>
        <td>{i() + 1}</td>
        <td>{Cedula(cedula)}</td>
        <td>
          <Answer value={SQLiteBool(posee)} />
        </td>
      </Row>
    )}
  </Table>
);
export default Carnet;
