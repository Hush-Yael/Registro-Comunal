import { Sex } from "../constants";

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

export const parseWithSex = (
  sex: Sex | "",
  value: string,
  unknownFormat = "o/a"
) =>
  value.includes("@")
    ? value.replace("@", !sex ? unknownFormat : sex === "M" ? "o" : "a")
    : value;

export const getRandomInt = (min = 0, max = 1) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
  Math.ceil(min);

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const oneliner = async (
  promise: Promise<unknown>
): Promise<[unknown | null, null | Error]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (e) {
    console.warn(e);
    return [null, e as Error];
  }
};
