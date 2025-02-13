import { ComunalRecord, HomePath } from "../types/form";
import { plural } from "./utils";

export const cedula = (data: number | "", venezolano = true) => {
  const _cedula = data ? data.toLocaleString("es") : "Desconocida";
  return _cedula ? `${venezolano ? "V" : "E"} - ${_cedula}` : "Desconocida";
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

export const getTotalGas = (record: ComunalRecord["gas"]) => {
  const nums = [record["10kg"], record["18kg"], record["27kg"], record["43kg"]];

  return nums.reduce((p, curr) => p + (curr || 0), 0) || "";
};
