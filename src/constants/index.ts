import { HabitanteData, PersonData } from "../types/form";

export const SEXES = [
  { value: "M", label: "masculino" },
  { value: "F", label: "femenino" },
];

export type Sex = "M" | "F";

export const EDOS_CIVIL = [
  "solter@",
  "casad@",
  "viud@",
  "divorciad@",
  "concubinad@",
  "unión libre",
  "otro",
] as const;

export const NIVELES_ESTUDIOS = [
  "primaria",
  "secundaria",
  "superior",
  "posgrado",
  "otro",
] as const;

export const PARENTESCOS = [
  "hij@",
  "padre",
  "madre",
  "herman@",
  "abuel@",
  "niet@",
  "espos@",
  "ti@",
  "sobrin@",
  "prim@",
  "otro",
];

export const personData = () =>
  ({
    cedula: "",
    sexo: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    venezolano: 1,
    fallecido: 0,
    fechaDeceso: "",
  } as PersonData);

export const habitanteData = () =>
  ({
    ...personData(),
    parentesco: "",
  } as HabitanteData);
