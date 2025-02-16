import { number } from "zod";
import { ComunalRecord, RecordKey, HabitanteData, JefeData } from "./form";

export type DBComunalRecord<Key extends RecordKey> = ComunalRecord[Key] & {
  nombres: string;
  apellidos: string;
  cedula: number;
} & (Key extends "gas" ? { total: number } : {}) &
  (Key extends "jefe" ? { edad: number | null } : {});

type QuestionMap = { beneficiados: { 1: number; 0: number; null: number } };
type JefesCharts = "sexo" | "nivelEstudios" | "edoCivil" | "venezolano";

export type DBComunalRecords = {
  jefe: { records: DBComunalRecord<"jefe">[] } & {
    charts: {
      [key in JefesCharts]: {
        [string]: number;
      };
    };
  };
  home: DBComunalRecord<"home">[];
  carnet: { records: DBComunalRecord<"carnet">[] } & QuestionMap;
  clap: { records: DBComunalRecord<"clap">[] } & QuestionMap;
  gas: {
    records: DBComunalRecord<"gas">[];
  } & QuestionMap;
};

export type DBSearch = {
  jefe: JefeData;
  home: ComunalRecord["home"] &
    Pick<PersonData, "cedula" | "nombres" | "apellidos">;
  family: HabitanteData & {
    jefeCedula: number;
    jefeNombres: string;
    jefeApellidos: string;
  };
};
