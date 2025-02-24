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

// Main wrapper function
export const oneliner = async <T, E = Error>(
  promise: Promise<T>
): Promise<[T, null] | [null, E]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (e) {
    return [null, e as E];
  }
};

export const yearsSinceDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const today = new Date();
  const inputDate = new Date(year, month - 1, day);
  let yearsDiff = today.getFullYear() - inputDate.getFullYear();

  if (
    today.getMonth() < inputDate.getMonth() ||
    (today.getMonth() === inputDate.getMonth() &&
      today.getDate() < inputDate.getDate())
  ) {
    yearsDiff--;
  }

  return yearsDiff;
};

export const parseStringDiacrits = (string: string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
    .normalize();
