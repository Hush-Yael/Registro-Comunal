import { z } from "zod";

export const getValue = (target: HTMLInputElement) => {
  const value = target.type === "number" ? target.valueAsNumber : target.value;
  return target.type === "number" && isNaN(value as number) ? "" : value;
};

const empty = "No se ha indicado ",
  noZero = " debe ser mayor a 0";

const jefe = {
  cedula: z
    .number({ message: empty + "la cédula" })
    .min(1, "La cédula" + noZero),
  sexo: z.enum(["M", "F"], {
    message: empty + "el sexo",
  }),
  nombres: z
    .string({ message: empty + "los nombres" })
    .min(1, empty + "los nombres"),
  apellidos: z
    .string({ message: empty + "los apellidos" })
    .min(1, empty + "los apellidos"),
};

const PathSchema = z
  .string({
    message: empty + "ningún valor",
  })
  .regex(/(\d)|(\d-\d)/, `Todos los valores deben ser mayores a cero`);

const home = {
  numCasa: z
    .string({ message: empty + "el numero de casa" })
    .min(1, "el numero de casa" + noZero),
  calle: PathSchema,
  avenida: PathSchema,
};

export const FormSchemas = {
  jefe,
  home,
};

export const FormSchema = z.object(
  (() => {
    const _: { [key: string]: z.ZodSchema } = {};

    Object.keys(FormSchemas).forEach(
      (key) => (_[key] = z.object(FormSchemas[key as keyof typeof FormSchemas]))
    );
    return _;
  })()
);
