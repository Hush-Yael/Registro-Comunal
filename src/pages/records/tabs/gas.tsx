import { For } from "solid-js";
import { Table, Thead, Row } from "../../../components/table";
import { FormData } from "../../form";
import Answer from "../components/answer";

const getTotal = (record: FormData) => {
  const nums = [
    record.gas["10kg"],
    record.gas["18kg"],
    record.gas["27kg"],
    record.gas["43kg"],
  ];

  return nums.reduce((p, curr) => p + (curr || 0), 0) || "";
};

const Gas = (props: { records: FormData[] }) => {
  return (
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
              <td class="text-left">{record.jefe.cedula.toLocaleString()}</td>
              <td>
                <Answer value={record.gas.posee} />
              </td>
              <td>{(record.gas.posee && record.gas["10kg"]) || ""}</td>
              <td>{(record.gas.posee && record.gas["18kg"]) || ""}</td>
              <td>{(record.gas.posee && record.gas["27kg"]) || ""}</td>
              <td>{(record.gas.posee && record.gas["43kg"]) || ""}</td>
              <td>{record.gas.posee && getTotal(record)}</td>
            </Row>
          )}
        </For>
      </tbody>
    </Table>
  );
};
export default Gas;
