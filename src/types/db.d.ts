import { number } from "zod";
import { ComunalRecord, RecordKey, HabitanteData, JefeData } from "./form";
import { EDOS_CIVIL, NIVELES_ESTUDIOS } from "../constants";

export type DBComunalRecord<Key extends RecordKey> = ComunalRecord[Key] & {
  nombres: string;
  apellidos: string;
  cedula: number;
} & (Key extends "gas" ? { total: number } : {}) &
  (Key extends "jefe" | "family" ? { edad: number | null } : {});

type QuestionMap = { beneficiados: { 1: number; 0: number; null: number } };
type JefesCharts = "sexo" | "nivelEstudios" | "edoCivil" | "venezolano";

export type JefeMatch<T> = { match: T; text: string; value: number };

export type DBComunalRecords = {
  jefe: { records: DBComunalRecord<"jefe">[] } & {
    charts: {
      sexo: {
        match: DBComunalRecord<"jefe">["sexo"];
        text: string;
        value: number;
      }[];
      nivelEstudios: {
        match: (typeof NIVELES_ESTUDIOS)[number];
        text: string;
        value: number;
      }[];
      edoCivil: {
        match: (typeof EDOS_CIVIL)[number];
        text: string;
        value: number;
      }[];
      venezolano: [JefeMatch<"true">, JefeMatch<"false">];
    };
  };
  home: DBComunalRecord<"home">[];
  carnet: { records: DBComunalRecord<"carnet">[] } & QuestionMap;
  clap: { records: DBComunalRecord<"clap">[] } & QuestionMap;
  gas: {
    records: DBComunalRecord<"gas">[];
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
  jefe: JefeData;
  home: ComunalRecord["home"] &
    Pick<PersonData, "cedula" | "nombres" | "apellidos">;
  family: HabitanteData & {
    jefeCedula: number;
    jefeNombres: string;
    jefeApellidos: string;
  };
};
