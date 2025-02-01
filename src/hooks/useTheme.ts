import { createEffect, createSignal } from "solid-js";

const applySystemTheme = (e: MediaQueryListEvent) => {
  e.matches
    ? document.documentElement.classList.add("dark")
    : document.documentElement.removeAttribute("class");
};
const media = window.matchMedia("(prefers-color-scheme: dark)");

export const useTheme = () => {
  const [theme, setTheme] = createSignal(localStorage.getItem("theme"));

  const HTML = document.documentElement;

  createEffect(() => {
    const _theme = theme();

    if (!_theme) localStorage.setItem("theme", "light");
    else {
      if (_theme == "light") HTML.removeAttribute("class");
      else if (_theme == "dark") HTML.classList.add("dark");
      else {
        media.matches && HTML.classList.add("dark");

        try {
          media.addEventListener("change", applySystemTheme);
        } catch (e1) {
          try {
            media.addListener(applySystemTheme);
          } catch (e2) {
            console.error(e2);
          }
        }
      }

      localStorage.setItem("theme", _theme);
    }
  });

  return { theme, setTheme };
};
