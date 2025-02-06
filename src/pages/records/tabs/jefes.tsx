import { For } from "solid-js";
import { ComunalRecord } from "../../../types/form";
import { Row, Table, Thead } from "../../../components/table";

const Jefes = (props: { records: ComunalRecord[] }) => {
  return (
    <Table>
      <Thead>
        <th>N°</th>
        <th>Cédula</th>
        <th>Nombres</th>
        <th>Apellidos</th>
      </Thead>
      <tbody>
        <For each={props.records}>
          {({ jefe }, i) => (
            <Row>
              <td class="">{i() + 1}</td>
              <td class="min-w-max">{jefe.cedula.toLocaleString()}</td>
              <td class="min-w-max">{jefe.nombres}</td>
              <td class="min-w-max">{jefe.apellidos}</td>
            </Row>
          )}
        </For>
      </tbody>
    </Table>
  );
};
export default Jefes;
