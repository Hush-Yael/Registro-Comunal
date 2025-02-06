import { For } from "solid-js";
import { Table, Thead, Row } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import Answer from "../../../components/answer";

const Carnet = (props: { records: ComunalRecord[] }) => {
  return (
    <Table>
      <Thead>
        <th>Cedula</th>
        <th class="!text-center">Posee</th>
      </Thead>
      <tbody>
        <For each={props.records}>
          {(record) => (
            <Row>
              <td>{record.jefe.cedula.toLocaleString()}</td>
              <td>
                <Answer value={record.carnet.posee} />
              </td>
            </Row>
          )}
        </For>
      </tbody>
    </Table>
  );
};
export default Carnet;
