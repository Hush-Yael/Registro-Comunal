import { ComunalRecord, RecordKey, HabitanteData, JefeData } from "./form";

export type DBComunalRecord<Key extends RecordKey> = ComunalRecord[Key] & {
  nombres: string;
  apellidos: string;
  cedula: number;
} & (Key extends "gas" ? { total: number } : {});

export type DBComunalRecords = {
  [Key in RecordKey]: (DBComunalRecord<Key> &
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
