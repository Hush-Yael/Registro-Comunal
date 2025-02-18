import { Row } from "../../../components/table";
import Answer from "../../../components/answer";
import { SQLiteBool } from "../../../lib/db";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecords } from "../../../types/db";
import { A } from "@solidjs/router";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import { QuestionChart } from "../../../components/charts/question";
import Wrapper from "../components/only-chart-wrapper";

const Carnet = (props: { data: DBComunalRecords["carnet"] }) => {
  const [chartData, onChartSelect] = useYesNoChart(props.data.beneficiados);

  return (
    <Wrapper>
      <QuestionChart
        class="max-h-fit"
        size={150}
        title="¿Posee Carnet de la Patria?"
        data={chartData}
        onSelect={onChartSelect}
      />
      <Table<"carnet">
        filters={[{ label: "cédula", value: "cedula" }, "nombres", "apellidos"]}
        records={props.data.records}
        columns={[
          { text: "Cédula", align: "r" },
          "Nombres y Apellidos",
          { text: "Posee", align: "c" },
        ]}
      >
        {({ cedula, nombres, apellidos, posee }, i) => (
          <Row>
            <td class="!text-right">{i() + 1}</td>
            <td class="!text-right">
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
    </Wrapper>
  );
};
export default Carnet;
