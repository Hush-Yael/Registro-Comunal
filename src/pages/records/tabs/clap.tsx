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
        <th class="!text-right">#</th>
        <th class="!text-right">Cedula</th>
        <th>Posee</th>
        <th class="!text-right">Cantidad</th>
      </>
    }
    tbodyClass="text-right"
  >
    {({ cedula, posee, cantidad }, i) => (
      <Row>
        <td>{i() + 1}</td>
        <td>{Cedula(cedula)}</td>
        <td class="text-center">
          <Answer value={SQLiteBool(posee)} />
        </td>
        <td>{posee ? cantidad : ""}</td>
      </Row>
    )}
  </Table>
);
export default Clap;
