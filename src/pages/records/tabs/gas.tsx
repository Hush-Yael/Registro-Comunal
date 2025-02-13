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
    theadClass="*:text-right"
    tbodyClass="text-right"
    columns={
      <>
        <th>#</th>
        <th>Cedula</th>
        <th class="!text-left">Nombres y Apellidos</th>
        <th>Posee</th>
        <th>10kg</th>
        <th>18kg</th>
        <th>27kg</th>
        <th>43kg</th>
        <th>Total</th>
      </>
    }
  >
    {(record, i) => (
      <Row>
        <td>{i() + 1}</td>
        <td>{cedula(record.cedula)}</td>
        <td class="text-left">
          {record.nombres} {record.apellidos}
        </td>
        <td class="!text-center">
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
