import { For } from "solid-js";
import { Table, Thead, Row } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import Answer from "../../../components/answer";

const Clap = (props: { records: ComunalRecord[] }) => {
  return (
    <Table>
      <Thead>
        <th>Cedula</th>
        <th>Posee</th>
        <th class="!text-center">Cantidad</th>
      </Thead>
      <tbody>
        <For each={props.records}>
          {(record) => (
            <Row>
              <td>{record.jefe.cedula.toLocaleString()}</td>
              <td>
                <Answer value={record.clap.posee} />
              </td>
              <td class="text-center">
                {record.clap.posee ? record.clap.cantidad : ""}
              </td>
            </Row>
          )}
        </For>
      </tbody>
    </Table>
  );
};
export default Clap;
