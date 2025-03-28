import Answer from "../../../components/data/answer";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { TableRecords } from "../../../types/db";
import { A } from "@solidjs/router";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import { QuestionChart } from "../../../components/charts/question";
import Wrapper from "../components/only-chart-wrapper";
import { commonFilters } from "..";

const Carnet = (props: { data: TableRecords["carnet"] }) => {
  const [chartData, onChartSelect] = useYesNoChart(props.data.beneficiados);

  return (
    <Wrapper>
      <QuestionChart
        class="min-[1100px]:sticky top-0 max-h-fit"
        size={150}
        title="¿Posee Carnet de la Patria?"
        data={chartData}
        onSelect={onChartSelect}
      />
      <Table
        tableName="carnet"
        filters={commonFilters}
        records={props.data.records}
        columns={[
          { text: "Cédula", align: "r" },
          "Nombres y Apellidos",
          { text: "Posee", align: "c" },
        ]}
      >
        {({ cedula, nombres, apellidos, posee }) => (
          <>
            <td class="!text-right">
              <A class="link" href={`/jefe/${cedula}`}>
                {Cedula(cedula, null)}
              </A>
            </td>
            <td>
              {nombres} {apellidos}
            </td>
            <td>
              <Answer value={posee} />
            </td>
          </>
        )}
      </Table>
    </Wrapper>
  );
};
export default Carnet;
