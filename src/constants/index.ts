import { Business, HabitanteData, HomeData, PersonData } from "../types/form";

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

export const personData = (): PersonData => ({
  cedula: "",
  sexo: "",
  nombres: "",
  apellidos: "",
  fechaNacimiento: "",
  venezolano: 1,
  fallecido: 0,
  fechaDeceso: "",
});

export const habitanteData = (): HabitanteData => ({
  ...personData(),
  parentesco: "",
});

export const homeData = (): HomeData => ({
  calle: "",
  avenida: "",
  referencia: "",
  numCasa: "",
  id: crypto.randomUUID(),
});

export const negocio = (): Business => ({
  RIF: "",
  avenida: "",
  calle: "",
  nombre: "",
  tipo: "",
});

export const TIPOS_NEGOCIOS = [
  "agropecuaria",
  "barbería",
  "bodega",
  "carnicería",
  "cerrajería",
  "farmacia",
  "funeraria",
  "licorería",
  "panadería",
  "restaurante",
  "taller",
  "verdurería",
] as const;
