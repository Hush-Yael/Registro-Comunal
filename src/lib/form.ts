export const getValue = (target: HTMLInputElement) => {
  const value = target.type === "number" ? target.valueAsNumber : target.value;
  return target.type === "number" && isNaN(value as number) ? "" : value;
};
