export const SEXES = {
  M: "masculino",
  F: "femenino",
};

export const EDOS_CIVIL = [
  "solter@",
  "casad@",
  "viud@",
  "divorciad@",
  "concubinad@",
  "unión libre",
  "otro",
];

export const NIVELES_ESTUDIOS = [
  "primaria",
  "secundaria",
  "superior",
  "posgrado",
  "otro",
];

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
  } as {
    cedula: number | "";
    nombres: string;
    apellidos: string;
    sexo: "M" | "F" | "";
    fechaNacimiento: `${number}-${number}-${number}` | `${number}` | "";
  });

export const habitanteData = () =>
  ({
    ...personData(),
    venezolano: true,
    parentesco: "",
  } as ReturnType<typeof personData> & {
    venezolano: boolean;
    parentesco: (typeof PARENTESCOS)[number] | "";
  });
