import { createSignal } from "solid-js";
import { DBComunalRecords } from "../types/db";
import { SQLiteBool } from "../lib/db";

export const useYesNoChart = <K extends "carnet" | "clap" | "gas">(
  unfilteredRecords: DBComunalRecords[K]
): {
  setFiltered: (value: boolean | null | undefined) => void;
  poseeData: [number, number, number];
  filteredRecords: () => DBComunalRecords[K]["records"];
} => {
  const [filtered, setFiltered] = createSignal<boolean | null | undefined>();
  const poseeData = [
    unfilteredRecords.beneficiados[1],
    unfilteredRecords.beneficiados[0],
    unfilteredRecords.beneficiados.null,
  ] as [number, number, number];

  const filteredRecords = () =>
    filtered() === undefined
      ? unfilteredRecords.records
      : unfilteredRecords.records.filter(
          (r) => filtered() === SQLiteBool(r.posee)
        );

  return { setFiltered, poseeData, filteredRecords };
};
