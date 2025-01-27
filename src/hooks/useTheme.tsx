import { createEffect, createSignal } from "solid-js";

export const useTheme = () => {
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  const [theme, setTheme] = createSignal(
    localStorage.getItem("theme") || preferredTheme
  );

  createEffect(() => {
    document.documentElement.className = theme();
    localStorage.setItem("theme", theme());
  });
  return { theme, setTheme };
};
