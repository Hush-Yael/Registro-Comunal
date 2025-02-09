import { For } from "solid-js";
import { Row, Table, Thead } from "../../../components/table";
import { ComunalRecord } from "../../../types/form";
import { parseDir } from "../../../lib/data";
import { cedula as Cedula } from "../../../lib/data";

const Homes = (props: {
  records: (ComunalRecord["home"] & { cedula: number })[];
}) => (
  <Table>
    <Thead>
      <th>Cedula</th>
      <th>N°</th>
      <th>Dirección</th>
      <th>Referencias</th>
    </Thead>
    <tbody>
      <For each={props.records}>
        {({ cedula, numCasa, calle, avenida, referencia }) => (
          <Row>
            <td>{Cedula(cedula)}</td>
            <td>{numCasa}</td>
            <td class="first-letter:uppercase">{parseDir(calle, avenida)}</td>
            <td>{referencia}</td>
          </Row>
        )}
      </For>
    </tbody>
  </Table>
);
export default Homes;
