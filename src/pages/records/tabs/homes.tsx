import { Row } from "../../../components/table";
import { parseDir } from "../../../lib/data";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";

const Homes = (props: { records: DBComunalRecord<"home">[] }) => (
  <Table<"home">
    records={props.records}
    columns={["#", "Cedula", "N°", "Dirección", "Referencias"]}
  >
    {({ cedula, numCasa, calle, avenida, referencia }, i) => (
      <Row>
        <td>{i() + 1}</td>
        <td>{Cedula(cedula)}</td>
        <td>{numCasa}</td>
        <td class="first-letter:uppercase">{parseDir(calle, avenida)}</td>
        <td>{referencia}</td>
      </Row>
    )}
  </Table>
);
export default Homes;
