import { SEXES } from "../constants";

export const plural = (
  string: string,
  n: number,
  plural = "s",
  singular = ""
) => {
  const words = string.split(" ");
  return words
    .map((string) => (n == 1 ? string + singular : `${string}${plural}`))
    .join(" ");
};

export const parseWithSex = (sex: keyof typeof SEXES, value: string) =>
  value.includes("@") ? value.replace("@", sex === "M" ? "o" : "a") : value;
