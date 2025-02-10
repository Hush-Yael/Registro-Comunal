import { Row } from "../../../components/table";
import { getTotalGas } from "../../../lib/data";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";

const Gas = (props: { records: DBComunalRecord<"gas">[] }) => (
  <Table<"gas">
    records={props.records}
    tbodyClass="text-center"
    columns={["Cedula", "Posee", "10kg", "18kg", "27kg", "43kg", "Total"]}
  >
    {(record) => (
      <Row>
        <td class="text-left">{cedula(record.cedula)}</td>
        <td>
          <Answer value={SQLiteBool(record.posee)} />
        </td>
        <td>{(record.posee && record["10kg"]) || ""}</td>
        <td>{(record.posee && record["18kg"]) || ""}</td>
        <td>{(record.posee && record["27kg"]) || ""}</td>
        <td>{(record.posee && record["43kg"]) || ""}</td>
        <td>{record.posee && getTotalGas(record)}</td>
      </Row>
    )}
  </Table>
);

export default Gas;
