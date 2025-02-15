import { Row } from "../../../components/table";
import { getTotalGas } from "../../../lib/data";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";
import { A } from "@solidjs/router";
import { QuestionChart } from "../../../components/charts/question";
import { useYesNoChart } from "../../../hooks/useYesNoChart";

const Gas = (props: { records: DBComunalRecord<"gas">[] }) => {
  const { filteredRecords, setFiltered, poseeData } = useYesNoChart(
    props.records
  );

  return (
    <>
      <QuestionChart
        size={250}
        title="¿Es beneficiado del gas comunal?"
        data={poseeData}
        onHide={setFiltered}
      />
      <Table<"gas">
        records={filteredRecords()}
        theadClass="*:text-right"
        tbodyClass="text-right"
        filters={["cedula", "nombres", "apellidos"]}
        columns={[
          "Cedula",
          { text: "Nombres y Apellidos", align: "l" },
          { text: "Posee", align: "c" },
          "10kg",
          "18kg",
          "27kg",
          "43kg",
          "Total",
        ]}
      >
        {(record, i) => (
          <Row>
            <td>{i() + 1}</td>
            <td>
              <A class="link" href={`/jefe/${record.cedula}`}>
                {cedula(record.cedula, null)}
              </A>
            </td>
            <td class="text-left">
              {record.nombres} {record.apellidos}
            </td>
            <td class="!text-center">
              <Answer value={SQLiteBool(record.posee)} />
            </td>
            <td>{(record.posee && record["10kg"]) || ""}</td>
            <td>{(record.posee && record["18kg"]) || ""}</td>
            <td>{(record.posee && record["27kg"]) || ""}</td>
            <td>{(record.posee && record["43kg"]) || ""}</td>
            <td>{record.posee && getTotalGas(record)}</td>
          </Row>
        )}
      </Table>
    </>
  );
};
export default Gas;
