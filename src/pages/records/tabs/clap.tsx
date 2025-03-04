import Answer from "../../../components/data/answer";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { TableRecords } from "../../../types/db";
import { A } from "@solidjs/router";
import { QuestionChart } from "../../../components/charts/question";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import Wrapper from "../components/only-chart-wrapper";
import { commonFilters } from "..";

const Clap = (props: { data: TableRecords["clap"] }) => {
  const [chartData, onChartSelect] = useYesNoChart(props.data.beneficiados);

  return (
    <Wrapper>
      <QuestionChart
        class="min-[1100px]:sticky top-0 !max-h-fit"
        size={150}
        title="¿Es beneficiado del CLAP?"
        data={chartData}
        onSelect={onChartSelect}
      />
      <Table<"clap">
        records={props.data.records}
        filters={[
          ...commonFilters,
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
        {({ cedula, nombres, apellidos, posee, cantidad }) => (
          <>
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
          </>
        )}
      </Table>
    </Wrapper>
  );
};
export default Clap;
