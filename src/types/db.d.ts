import { number } from "zod";
import {
  ComunalRecord,
  RecordKey,
  HabitanteData,
  RecordValues,
  RecordPath,
} from "./form";
import { EDOS_CIVIL, NIVELES_ESTUDIOS } from "../constants";

export type DBComunalRecord = Omit<ComunalRecord, "family"> & {
  [K in RecordKey]: { cedula?: number };
} & {
  family: (ComunalRecord["family"][number] & { jefeCedula?: number })[];
} & {
  gas: { total?: number };
};

export type TableRecord<Key extends RecordKey> = ComunalRecord[Key] & {
  nombres: string;
  apellidos: string;
  cedula: number;
} & (Key extends "gas" ? { total: number } : {}) &
  (Key extends "jefe" | "family" ? { edad: number | null } : {});

type QuestionMap = { beneficiados: { 1: number; 0: number; null: number } };
type JefesCharts = "sexo" | "nivelEstudios" | "edoCivil" | "venezolano";

export type JefeMatch<K extends RecordKey, P extends RecordPath<K>> = {
  // todos los posibles valores del campo
  match: RecordValues<K, P>;
  text: string;
  value: number;
};

export type TableRecords = {
  jefe: { records: TableRecord<"jefe">[] } & {
    charts: {
      sexo: JefeMatch<"jefe", "sexo">[];
      nivelEstudios: (JefeMatch<"jefe", "nivelEstudios"> & {
        match: "";
        text: string;
        value: number;
      })[];
      edoCivil: (JefeMatch<"jefe", "edoCivil"> & {
        match: "";
        text: string;
        value: number;
      })[];
      venezolano: JefeMatch<"jefe", "venezolano">[];
      fallecido: JefeMatch<"jefe", "fallecido">[];
      edades: {
        mayor: number;
        menor: number;
        promedio: number;
        range: Pick<AgesRange, "jóvenes" | "adultos", "ancianos">;
      };
    };
  };
  homes: TableRecord<"homes">;
  carnet: { records: TableRecord<"carnet">[] } & QuestionMap;
  clap: { records: TableRecord<"clap">[] } & QuestionMap;
  gas: {
    records: TableRecord<"gas">[];
  } & QuestionMap & {
      total: number;
      promedio: number;
      spread: {
        "10kg": number;
        "18kg": number;
        "27kg": number;
        "43kg": number;
      };
    };
};

export type DBSearch = {
  jefe: ComunalRecord["jefe"];
  homes: ComunalRecord["homes"][number] &
    Pick<PersonData, "cedula" | "nombres" | "apellidos">;
  family: HabitanteData & {
    jefeCedula: number;
    jefeNombres: string;
    jefeApellidos: string;
  };
};

export type AgesRange = {
  infantes: number;
  niños: number;
  adolescentes: number;
  adultos: number;
  jóvenes: number;
  ancianos: number;
};
