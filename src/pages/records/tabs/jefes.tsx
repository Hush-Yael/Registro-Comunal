import { For } from "solid-js";
import { ComunalRecord } from "../../../types/form";
import { Row, Table, Thead } from "../../../components/table";
import { A } from "@solidjs/router";
import { cedula as Cedula } from "../../../lib/data";

const Jefes = (props: { records: ComunalRecord["jefe"][] }) => (
  <Table>
    <Thead>
      <th>#</th>
      <th>Cédula</th>
      <th>Nombres</th>
      <th>Apellidos</th>
    </Thead>
    <tbody>
      <For each={props.records}>
        {({ cedula, nombres, apellidos }, i) => (
          <Row>
            <td>{i() + 1}</td>
            <td class="min-w-max">
              <A href={`/jefe/${cedula}`}>{Cedula(cedula)}</A>
            </td>
            <td class="min-w-max">{nombres}</td>
            <td class="min-w-max">{apellidos}</td>
          </Row>
        )}
      </For>
    </tbody>
  </Table>
);
export default Jefes;
