import Answer from "../../../components/answer";
import { cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecords } from "../../../types/db";
import { A } from "@solidjs/router";
import { QuestionChart } from "../../../components/charts/question";
import { useYesNoChart } from "../../../hooks/useYesNoChart";
import Dash from "../../../components/dash";
import { commonFilters } from "..";
import Bars from "../../../components/charts/bars";
import { plural } from "../../../lib/utils";

const Gas = (props: { data: DBComunalRecords["gas"] }) => {
  const [chartData, onChartSelect] = useYesNoChart(props.data.beneficiados);

  return (
    <div class="flex flex-col gap-4 items-center p-2 min-[1200px]:grid grid-cols-[1fr_auto] min-[1200px]:items-start">
      <div class="flex gap-2 col-[2/3] row-[1/2] w-full max-w-max *:min-w-max max-[1200px]:m-auto min-[1200px]:flex-col overflow-auto">
        <div>
          <Bars
            title="Distribución de bombonas"
            class="h-full justify-between"
            w={250}
            max={props.data.total}
            stepSize={5}
            data={Object.values(props.data.spread)}
            labels={Object.keys(props.data.spread)}
          >
            <ul class="flex flex-col gap-1 mt-1 list-disc">
              <li>
                <b>{props.data.promedio}</b>{" "}
                {plural("bombona", props.data.promedio!)} en promedio
              </li>
              <li>
                <b>{props.data.total}</b> {plural("bombona", props.data.total)}{" "}
                en total
              </li>
            </ul>
          </Bars>
        </div>
        <QuestionChart
          class="max-h-fit"
          size={150}
          title="¿Es beneficiado del gas comunal?"
          data={chartData}
          onSelect={onChartSelect}
        />
      </div>
      <Table<"gas">
        records={props.data.records}
        theadClass="*:text-right"
        tbodyClass="text-right"
        filters={[
          ...commonFilters,
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
        {(record) => (
          <>
            <td>
              <A class="link" href={`/jefe/${record.cedula}`}>
                {cedula(record.cedula, null)}
              </A>
            </td>
            <td class="text-left whitespace-nowrap">
              {record.nombres} {record.apellidos}
            </td>
            <td class="!text-center">
              <Answer value={record.posee} />
            </td>
            <td>{(record.posee && record["10kg"]) || ""}</td>
            <td>{(record.posee && record["18kg"]) || ""}</td>
            <td>{(record.posee && record["27kg"]) || ""}</td>
            <td>{(record.posee && record["43kg"]) || ""}</td>
            <td>{record.posee && (record.total || <Dash />)}</td>
          </>
        )}
      </Table>
    </div>
  );
};
export default Gas;
