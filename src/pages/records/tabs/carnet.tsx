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
        <th class="!text-right">#</th>
        <th class="!text-right">Cedula</th>
        <th>Posee</th>
      </>
    }
  >
    {({ cedula, posee }, i) => (
      <Row>
        <td class="!text-right">{i() + 1}</td>
        <td class="!text-right">{Cedula(cedula)}</td>
        <td>
          <Answer value={SQLiteBool(posee)} />
        </td>
      </Row>
    )}
  </Table>
);
export default Carnet;
