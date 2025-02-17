import { QuestionChartMatch } from "../components/charts/question";
import { setExternalFilter } from "../pages/records/components/table";
import { DBComunalRecords } from "../types/db";

export const useYesNoChart = <K extends "carnet" | "clap" | "gas">(
  unfilteredRecords: DBComunalRecords[K]["beneficiados"]
): [[number, number, number], (filter: QuestionChartMatch) => void] => [
  [
    unfilteredRecords[1] || 0,
    unfilteredRecords[0] || 0,
    unfilteredRecords.null || 0,
  ],
  (filter: QuestionChartMatch) =>
    setExternalFilter(
      filter === undefined ? undefined : { path: "posee", value: filter }
    ),
];
