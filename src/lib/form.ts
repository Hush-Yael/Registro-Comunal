import { z } from "zod";

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
  email: z.union([z.literal(""), z.string().email("El correo no es valido")], {
    message: empty + "el correo",
  }),
};

const DashNumSchema = z.union(
  [
    z.literal("", { message: empty + "ningún valor" }),
    z
      .string({
        message: empty + "ningún valor",
      })
      .regex(
        /(^\d+$)|(^\d+-\d+$)/,
        `Todos los valores deben ser mayores a cero`
      ),
  ],
  {
    message: empty + "ningún valor",
  }
);

export const FormSchemas = {
  jefe,
  homes: {
    numCasa: DashNumSchema,
    calle: DashNumSchema,
    avenida: DashNumSchema,
  },
  businesses: {
    RIF: z.union(
      [
        z.literal("", { message: empty + "el RIF" }),
        z.number({ message: empty + "el RIF" }).min(1, "el RIF" + noZero),
      ],
      {
        message: empty + "el RIF",
      }
    ),
    calle: DashNumSchema,
    avenida: DashNumSchema,
    nombre: z
      .string({ message: empty + "el nombre" })
      .min(1, empty + "el nombre"),
  },
};

export const FormSchema = z.object({
  jefe: z.object(FormSchemas.jefe),
  homes: z.array(z.object(FormSchemas.homes)),
  businesses: z.array(z.object(FormSchemas.businesses)),
});
