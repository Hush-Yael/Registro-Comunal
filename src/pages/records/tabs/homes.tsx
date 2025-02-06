import { For } from "solid-js";
import { Row, Table, Thead } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import { parseDir } from "../../../lib/data";

const Homes = (props: { records: ComunalRecord[] }) => {
  return (
    <Table>
      <Thead>
        <th>Cedula</th>
        <th>N°</th>
        <th>Dirección</th>
        <th>Referencias</th>
      </Thead>
      <tbody>
        <For each={props.records}>
          {(record) => (
            <Row>
              <td>{record.jefe.cedula.toLocaleString()}</td>
              <td>{record.home.numCasa}</td>
              <td class="first-letter:uppercase">
                {parseDir(record.home.calle, record.home.avenida)}
              </td>
              <td>{record.home.referencia}</td>
            </Row>
          )}
        </For>
      </tbody>
    </Table>
  );
};
export default Homes;
