import { A, AnchorProps } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { useMedia } from "../../hooks/useMedia";
import * as Icons from "../../icons/aside";
import { effect } from "solid-js/web";
import { Question } from "../../icons";

const mediaChanged = useMedia("(min-width: 640px)");
export const [asideOpen, setAsideOpen] = createSignal(mediaChanged());

effect(() => {
  if (mediaChanged()) setAsideOpen(true);
  else setAsideOpen(false);
});

const Link = (props: AnchorProps) => (
  <A
    {...props}
    class="relative flex justify-between items-center gap-2 aria-[current=page]:font-[600] before:absolute before:top-0 before:bottom-0 before:-left-3 not-aria-[current=page]:before:content-[none] before:w-[2px] before:bg-[currentColor]"
  >
    {props.children}
  </A>
);

const Aside = () => {
  let nav: HTMLElement, wrapper: HTMLDivElement;

  const escape = (e: KeyboardEvent) =>
    e.key === "Escape" && setAsideOpen(false);

  createEffect(() => {
    if (!mediaChanged() && asideOpen())
      window.addEventListener("keydown", escape);
    else window.removeEventListener("keydown", escape);
  });

  return (
    <aside
      class="group fixed z-4 top-[var(--h-h)] bottom-0 w-full bg-[hsla(0,0%,0%,0.3)] dark:bg-black/20 aria-hidden:pointer-events-none aria-hidden:opacity-0 transition-opacity duration-300 ease-in-out sm:border-r sm:border-r-neutral-300 sm:dark:border-r-neutral-800 sm:!bg-transparent"
      aria-hidden={!asideOpen()}
      onclick={(e) => {
        if (e.target !== nav! && e.target !== wrapper! && !mediaChanged())
          setAsideOpen(false);
      }}
    >
      <nav
        ref={nav!}
        class="w-full p-2 white rounded-b-2xl dark:border-b-1 dark:border-neutral-800 max-sm:shadow-lg max-sm:dark:shadow-xl transition-transform duration-200 ease-in-out transform -translate-y-full group-aria-[hidden=false]:translate-y-0 sm:translate-y-0 sm:rounded-[0] sm:!border-0"
      >
        <div
          ref={wrapper!}
          class="relative flex flex-col gap-4 pt-1 pb-2 pl-4 pr-2 sm:gap-7 sm:*:flex-row-reverse sm:*:justify-end min-[900px]:!gap-4"
        >
          <span
            class="absolute top-1 bottom-2 left-1 border-r-2 div-border"
            role="separator"
          />
          <Link href="/">
            <span>Inicio</span>
            <Icons.Home />
          </Link>
          <Link href="/registro">
            <span>Registro</span>
            <Icons.Edit />
          </Link>
          <Link href="/registros">
            <span>Lista de registros</span>
            <Icons.List />
          </Link>
          <Link href="/acerca-de">
            <span>Acerca de</span>
            <Question />
          </Link>
        </div>
      </nav>
    </aside>
  );
};
export default Aside;
