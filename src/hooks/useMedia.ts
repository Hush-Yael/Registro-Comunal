import { createSignal } from "solid-js";

export const useMedia = (query: string) => {
  const media = window.matchMedia(query);
  const [mediaChange, setMediaChange] = createSignal(media.matches);
  media.addEventListener
    ? media.addEventListener("change", () => setMediaChange(media.matches))
    : media.addListener(() => setMediaChange(media.matches));
  return mediaChange;
};
