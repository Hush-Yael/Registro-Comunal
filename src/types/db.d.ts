import { ComunalRecord, HabitanteData, JefeData } from "./form";

export type DBComunalRecord<Key extends keyof ComunalRecord> =
  ComunalRecord[Key] & {
    nombres: string;
    apellidos: string;
    cedula: number;
  } & (Key extends "gas" ? { total: number } : {});

export type DBComunalRecords = {
  [Key in keyof ComunalRecord]: (DBComunalRecord<Key> &
    (Key extends "gas" ? { total: number } : {}))[];
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
