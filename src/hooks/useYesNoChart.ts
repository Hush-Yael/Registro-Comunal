import { createSignal } from "solid-js";
import { DBComunalRecord } from "../types/db";
import { SQLiteBool } from "../lib/db";

export const useYesNoChart = <K extends "carnet" | "clap" | "gas">(
  unfilteredRecords: DBComunalRecord<K>[]
): {
  setFiltered: (value: boolean | null | undefined) => void;
  poseeData: [number, number, number];
  filteredRecords: () => DBComunalRecord<K>[];
} => {
  const [filtered, setFiltered] = createSignal<boolean | null | undefined>();
  const poseeData: [number, number, number] = [0, 0, 0];

  unfilteredRecords.forEach((record) => {
    if (record.posee === null) poseeData[2] += 1;
    else if (!record.posee) poseeData[1] += 1;
    else if (record.posee) poseeData[0] += 1;
  });

  const filteredRecords = () =>
    filtered() === undefined
      ? unfilteredRecords
      : unfilteredRecords.filter((r) => filtered() === SQLiteBool(r.posee));

  return { setFiltered, poseeData, filteredRecords };
};
