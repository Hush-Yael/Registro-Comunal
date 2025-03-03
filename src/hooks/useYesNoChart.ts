import { QuestionChartMatch } from "../components/charts/question";
import { setExternalFilter } from "../pages/records/components/table";
import { TableRecords } from "../types/db";

export const useYesNoChart = <K extends "carnet" | "clap" | "gas">(
  chartData: TableRecords[K]["beneficiados"]
) =>
  [
    [chartData[1] || 0, chartData[0] || 0, chartData.null || 0],
    (filter: QuestionChartMatch) =>
      setExternalFilter(
        // @ts-ignore
        filter === undefined ? undefined : { path: "posee", value: filter }
      ),
  ] as [[number, number, number], (filter: QuestionChartMatch) => void];
