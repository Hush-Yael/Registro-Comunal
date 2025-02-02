export const SEXES = {
  M: "masculino",
  F: "femenino",
} as const;

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
] as const;

export const personData = () =>
  ({
    cedula: "",
    sexo: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
  } as {
    [key: string]: string | number;
    cedula: number | "";
    sexo: "M" | "F" | "";
    fechaNacimiento: `${number}-${number}-${number}` | `${number}` | "";
  });

export const habitanteData = () =>
  ({
    ...personData(),
    parentesco: "",
  } as ReturnType<typeof personData> & {
    parentesco: (typeof PARENTESCOS)[number] | "";
  });
