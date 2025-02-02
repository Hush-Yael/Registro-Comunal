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

export const personData = () => ({
  cedula: "",
  sexo: "",
  nombres: "",
  apellidos: "",
  fechaNacimiento: "",
});

export const habitanteData = () => ({
  ...personData(),
  parentesco: "",
});
