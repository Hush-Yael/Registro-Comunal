import {
  EDOS_CIVIL,
  habitanteData,
  NIVELES_ESTUDIOS,
  PARENTESCOS,
  personData,
} from "../constants";

export type ComunalRecord = {
  jefe: PersonData & {
    tel: string;
    email: string;
    nivelEstudios: (typeof NIVELES_ESTUDIOS)[number] | "";
    edoCivil: (typeof EDOS_CIVIL)[number] | "";
  };
  home: {
    avenida: HomePath;
    calle: HomePath;
    referencia: string;
    numCasa: string;
  };
  family: ReturnType<typeof habitanteData>[];
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
  };
};

export type Question = boolean | null;
export type HomePath = `${number}` | `${number}-${number}` | "";

export type PersonData = {
  cedula: number | "";
  nombres: string;
  apellidos: string;
  sexo: "M" | "F" | "";
  fechaNacimiento: `${number}-${number}-${number}` | `${number}` | "";
  venezolano: boolean;
};

export type JefeData = PersonData & {
  edoCivil: ComunalRecord["jefe"]["edoCivil"];
};

export type HabitanteData = PersonData & {
  parentesco: (typeof PARENTESCOS)[number] | "";
};
