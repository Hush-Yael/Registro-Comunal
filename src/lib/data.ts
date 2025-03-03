import { HomePath } from "../types/form";
import { plural } from "./utils";

export const cedula = (data: number | "", venezolano: 1 | 0 | null = 1) => {
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

export const onlyLetters = (data: string) => !/[A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(data);

export const onlyDashNumbers = (data: string, value: string) =>
  !/\d|-/.test(data) ||
  (data === "-" && (!/(^\d)/.test(value) || value.includes("-")));
