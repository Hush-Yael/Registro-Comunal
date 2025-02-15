import { ComunalRecord, HomePath } from "../types/form";
import { plural } from "./utils";

export const cedula = (
  data: number | "",
  venezolano: boolean | null = true
) => {
  const _cedula = data ? data.toLocaleString("es") : "Desconocida";
  return _cedula
    ? venezolano !== null
      ? `${venezolano ? "V" : "E"} - ${_cedula}`
      : _cedula
    : "Desconocida";
};

export const tel = (tel: string) => tel.replace(/^(04\d{2})/, " $1-");

export const parseDir = (calle: HomePath, avenida: HomePath) => {
  if (!calle && !avenida) return "Desconocida";

  const calles = calle ? calle.split("-") : [""],
    avenidas = avenida ? avenida.split("-") : [""];

  return `
  ${plural("avenida", avenidas.length)} ${avenidas.join(" y ")},
    ${plural("calle", calles.length)} ${calles.join(" y ")}
  `;
};
