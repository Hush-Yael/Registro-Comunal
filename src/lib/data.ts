import { ComunalRecord, HomePath } from "../types/form";
import { plural } from "./utils";

export const cedula = (tel: number | "") =>
  tel ? tel.toLocaleString("es") : "Desconocida";

export const tel = (tel: string) =>
  tel ? tel.replace(/^(04\d{2})/, " $1-") : "Desconocido";

export const parseDir = (calle: HomePath, avenida: HomePath) => {
  const calles = calle.split("-"),
    avenidas = avenida.split("-");

  return `
  ${plural("avenida", avenidas.length)} ${avenidas.join(" y ")},
    ${plural("calle", calles.length)} ${calles.join(" y ")}
  `;
};

export const getTotalGas = (record: ComunalRecord["gas"]) => {
  const nums = [record["10kg"], record["18kg"], record["27kg"], record["43kg"]];

  return nums.reduce((p, curr) => p + (curr || 0), 0) || "";
};
