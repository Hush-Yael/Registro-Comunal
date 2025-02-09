import { For } from "solid-js";
import { Table, Thead, Row } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import { getTotalGas } from "../../../lib/data";
import Answer from "../../../components/answer";

const Gas = (props: {
  records: (ComunalRecord["gas"] & { cedula: number })[];
}) => (
  <Table>
    <Thead>
      <th>Cedula</th>
      <th>Posee</th>
      <th>10kg</th>
      <th>18kg</th>
      <th>27kg</th>
      <th>43kg</th>
      <th>Total</th>
    </Thead>
    <tbody class="text-center">
      <For each={props.records}>
        {(record) => (
          <Row>
            <td class="text-left">{record.cedula.toLocaleString()}</td>
            <td>
              <Answer value={record.posee} />
            </td>
            <td>{(record.posee && record["10kg"]) || ""}</td>
            <td>{(record.posee && record["18kg"]) || ""}</td>
            <td>{(record.posee && record["27kg"]) || ""}</td>
            <td>{(record.posee && record["43kg"]) || ""}</td>
            <td>{record.posee && getTotalGas(record)}</td>
          </Row>
        )}
      </For>
    </tbody>
  </Table>
);

export default Gas;
