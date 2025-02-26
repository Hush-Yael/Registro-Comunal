import { Accessor, createEffect, createSignal, Setter } from "solid-js";

export const useLocalStorage = <T>(
  key: string,
  defaultV?: T
): [Accessor<T>, Setter<T>] => {
  const v = JSON.parse(localStorage.getItem(key)!);
  if (!v && defaultV) localStorage.setItem(key, JSON.stringify(defaultV));
  const [value, setValue] = createSignal<T>(v || defaultV);

  createEffect(() => {
    if (value()) localStorage.setItem(key, JSON.stringify(value()));
    else localStorage.removeItem(key);
  });

  return [value, setValue] as const;
};
