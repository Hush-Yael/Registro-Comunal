import {
  EDOS_CIVIL,
  habitanteData,
  NIVELES_ESTUDIOS,
  PARENTESCOS,
  personData,
} from "../constants";

export type DateStr = `${number}-${number}-${number}` | "";

export type PersonData = {
  cedula: number | "";
  nombres: string;
  apellidos: string;
  sexo: "M" | "F" | "";
  fechaNacimiento: DateStr;
  venezolano: 1 | 0;
  fallecido: 1 | 0;
  fechaDeceso: DateStr;
  edad?: number | null;
  oriCedula?: number;
};

export type HabitanteData = PersonData & {
  parentesco: (typeof PARENTESCOS)[number] | "";
};

export type HomeData = {
  id: string;
  avenida: HomePath;
  calle: HomePath;
  referencia: string;
  numCasa: string;
  oriId?: string;
};

export type Business = {
  RIF: number | "";
  oriRIF?: number;
  avenida: HomePath;
  calle: HomePath;
  nombre: string;
  oriNombre?: string;
  tipo: string;
};

export type ComunalRecord = {
  jefe: PersonData & {
    tel: string;
    email: string;
    nivelEstudios: (typeof NIVELES_ESTUDIOS)[number] | "";
    edoCivil: (typeof EDOS_CIVIL)[number] | "";
  };
  homes: HomeData[];
  businesses: Business[];
  family: HabitanteData[];
  carnet: { posee: Question };
  clap: {
    posee: Question;
    cantidad: number;
  };
  gas: {
    posee: Question;
    "10kg": number;
    "18kg": number;
    "27kg": number;
    "43kg": number;
    total?: number | null;
  };
};

export type Question = 1 | 0 | null;
export type QuestionLabel = "Sí" | "No" | "Desconocido";
export type HomePath = `${number}-${number}` | "";

export type RecordKey = keyof ComunalRecord;
type Record<K extends RecordKey> = ComunalRecord[K];

export type ArrayFields = "family" | "homes" | "businesses";

export type RecordPath<K extends RecordKey> = K extends ArrayFields
  ? keyof Record<K>[number]
  : keyof Record<K>;
export type ArrayRecordPath<K extends RecordKey> = keyof Record<K>[number];

export type RecordValues<
  K extends RecordKey,
  V extends RecordPath<K>
> = Record<K>[V];
