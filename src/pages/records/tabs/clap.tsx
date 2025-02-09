import { For } from "solid-js";
import { Table, Thead, Row } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";

const Clap = (props: {
  records: (ComunalRecord["clap"] & { cedula: number })[];
}) => (
  <Table>
    <Thead>
      <th>Cedula</th>
      <th>Posee</th>
      <th class="!text-center">Cantidad</th>
    </Thead>
    <tbody>
      <For each={props.records}>
        {({ cedula, posee, cantidad }) => (
          <Row>
            <td>{Cedula(cedula)}</td>
            <td>
              <Answer value={SQLiteBool(posee)} />
            </td>
            <td class="text-center">{posee ? cantidad : ""}</td>
          </Row>
        )}
      </For>
    </tbody>
  </Table>
);
export default Clap;
