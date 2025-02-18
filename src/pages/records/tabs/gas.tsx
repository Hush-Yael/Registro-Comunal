import { Row } from "../../../components/table";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecords } from "../../../types/db";
import { A } from "@solidjs/router";
import { QuestionChart } from "../../../components/charts/question";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import Dash from "../../../components/dash";
import Wrapper from "../components/only-chart-wrapper";

const Gas = (props: { data: DBComunalRecords["gas"] }) => {
  const [chartData, onChartSelect] = useYesNoChart(props.data.beneficiados);

  return (
    <Wrapper>
      <QuestionChart
        class="max-h-fit"
        size={150}
        title="¿Es beneficiado del gas comunal?"
        data={chartData}
        onSelect={onChartSelect}
      />
      <Table<"gas">
        records={props.data.records}
        theadClass="*:text-right"
        tbodyClass="text-right"
        filters={[
          { label: "cédula", value: "cedula", number: true },
          "nombres",
          "apellidos",
          { label: "bombonas de 10kg", value: "10kg", number: true },
          { label: "bombonas de 18kg", value: "18kg", number: true },
          { label: "bombonas de 27kg", value: "27kg", number: true },
          { label: "bombonas de 43kg", value: "43kg", number: true },
          { label: "total de bombonas", value: "total", number: true },
        ]}
        columns={[
          "Cédula",
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
            <td class="text-left whitespace-nowrap">
              {record.nombres} {record.apellidos}
            </td>
            <td class="!text-center">
              <Answer value={SQLiteBool(record.posee)} />
            </td>
            <td>{(record.posee && record["10kg"]) || ""}</td>
            <td>{(record.posee && record["18kg"]) || ""}</td>
            <td>{(record.posee && record["27kg"]) || ""}</td>
            <td>{(record.posee && record["43kg"]) || ""}</td>
            <td>{record.posee && (record.total || <Dash />)}</td>
          </Row>
        )}
      </Table>
    </Wrapper>
  );
};
export default Gas;
