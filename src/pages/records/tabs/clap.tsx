import Answer from "../../../components/answer";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { Row } from "../../../components/table";
import { DBComunalRecords } from "../../../types/db";
import { A } from "@solidjs/router";
import { QuestionChart } from "../../../components/charts/question";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import Wrapper from "../components/only-chart-wrapper";

const Clap = (props: { data: DBComunalRecords["clap"] }) => {
  const [chartData, onChartSelect] = useYesNoChart(props.data.beneficiados);

  return (
    <Wrapper>
      <QuestionChart
        class="max-h-fit"
        size={150}
        title="¿Es beneficiado del CLAP?"
        data={chartData}
        onSelect={onChartSelect}
      />
      <Table<"clap">
        records={props.data.records}
        filters={[
          { label: "cédula", value: "cedula", number: true },
          "nombres",
          "apellidos",
          { label: "cantidad", value: "cantidad", number: true },
        ]}
        columns={[
          { text: "Cédula", align: "r" },
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
              <Answer value={posee} />
            </td>
            <td>{posee ? cantidad : ""}</td>
          </Row>
        )}
      </Table>
    </Wrapper>
  );
};
export default Clap;
