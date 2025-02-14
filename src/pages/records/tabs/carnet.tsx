import { Row } from "../../../components/table";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";
import { A } from "@solidjs/router";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import { QuestionChart } from "../../../components/charts/question";

const Carnet = (props: { records: DBComunalRecord<"carnet">[] }) => {
  const { filteredRecords, setFiltered, poseeData } = useYesNoChart(
    props.records
  );

  return (
    <>
      <QuestionChart
        size={250}
        title="¿Posee Carnet de la Patria?"
        data={poseeData}
        onHide={setFiltered}
      />
      <Table<"carnet">
        records={filteredRecords()}
        columns={
          <>
            <th class="!text-right">#</th>
            <th class="!text-right">Cedula</th>
            <th>Nombres y Apellidos</th>
            <th>Posee</th>
          </>
        }
      >
        {({ cedula, nombres, apellidos, posee }, i) => (
          <Row>
            <td class="!text-right">{i() + 1}</td>
            <td>
              <A class="link" href={`/jefe/${cedula}`}>
                {Cedula(cedula, null)}
              </A>
            </td>
            <td>
              {nombres} {apellidos}
            </td>
            <td>
              <Answer value={SQLiteBool(posee)} />
            </td>
          </Row>
        )}
      </Table>
    </>
  );
};
export default Carnet;
