import { For } from "solid-js";
import { Table, Thead, Row } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";

const Carnet = (props: {
  records: (ComunalRecord["carnet"] & { cedula: number })[];
}) => (
  <Table>
    <Thead>
      <th>Cedula</th>
      <th class="!text-center">Posee</th>
    </Thead>
    <tbody>
      <For each={props.records}>
        {({ cedula, posee }) => (
          <Row>
            <td>{Cedula(cedula)}</td>
            <td>
              <Answer value={SQLiteBool(posee)} />
            </td>
          </Row>
        )}
      </For>
    </tbody>
  </Table>
);
export default Carnet;
