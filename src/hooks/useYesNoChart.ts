import { QuestionChartMatch } from "../components/charts/question";
import { setExternalFilter } from "../pages/records/components/table";
import { DBComunalRecords } from "../types/db";

export const useYesNoChart = <K extends "carnet" | "clap" | "gas">(
  chartData: DBComunalRecords[K]["beneficiados"]
): [[number, number, number], (filter: QuestionChartMatch) => void] => [
  [chartData[1] || 0, chartData[0] || 0, chartData.null || 0],
  (filter: QuestionChartMatch) =>
    setExternalFilter(
      filter === undefined ? undefined : { path: "posee", value: filter }
    ),
];
