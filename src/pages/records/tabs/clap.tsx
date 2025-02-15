import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { Row } from "../../../components/table";
import { DBComunalRecord } from "../../../types/db";
import { A } from "@solidjs/router";
import { QuestionChart } from "../../../components/charts/question";
import { useYesNoChart } from "../../../hooks/useYesNoChart";

const Clap = (props: { records: DBComunalRecord<"clap">[] }) => {
  const { filteredRecords, setFiltered, poseeData } = useYesNoChart(
    props.records
  );

  return (
    <>
      <QuestionChart
        size={250}
        title="¿Es beneficiado del CLAP?"
        data={poseeData}
        onHide={setFiltered}
      />
      <Table<"clap">
        records={filteredRecords()}
        filters={["cedula", "nombres", "apellidos"]}
        columns={[
          { text: "Cedula", align: "r" },
          "Nombres y Apellidos",
          "Posee",
          { text: "Cantidad", align: "r" },
        ]}
        tbodyClass="text-right"
      >
        {({ cedula, nombres, apellidos, posee, cantidad }, i) => (
          <Row>
            <td>{i() + 1}</td>
            <td>
              <A class="link" href={`/jefe/${cedula}`}>
                {Cedula(cedula, null)}
              </A>
            </td>
            <td class="!text-left">
              {nombres} {apellidos}
            </td>
            <td class="text-center">
              <Answer value={SQLiteBool(posee)} />
            </td>
            <td>{posee ? cantidad : ""}</td>
          </Row>
        )}
      </Table>
    </>
  );
};
export default Clap;
