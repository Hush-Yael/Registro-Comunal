import { ComunalRecord } from "./form";

export type DBComunalRecord<Key extends keyof ComunalRecord> =
  ComunalRecord[Key] & {
    cedula: number;
  };

export type DBComunalRecords = {
  [Key in keyof ComunalRecord]: DBComunalRecord<Key>[];
};
