import { A, AnchorProps } from "@solidjs/router";
import { createSignal } from "solid-js";
import * as Icons from "../icons/aside";

export const [asideOpen, setAsideOpen] = createSignal(false);

const Link = (props: AnchorProps) => (
  <A
    {...props}
    class="relative flex justify-between items-center gap-1 aria-[current=page]:font-[600] before:absolute before:top-0 before:bottom-0 before:-left-3 not-aria-[current=page]:before:content-[none] before:w-[2px] before:bg-[currentColor]"
  >
    {props.children}
  </A>
);

const Aside = () => {
  let nav, wrapper;

  return (
    <aside
      class="group fixed z-4 top-[var(--h-h)] bottom-0 w-full bg-[hsla(0,0%,0%,0.3)] dark:bg-black/20 aria-hidden:pointer-events-none aria-hidden:opacity-0 transition-opacity duration-300 ease-in-out"
      aria-hidden={!asideOpen()}
      onclick={(e) => {
        if (e.target !== nav && e.target !== wrapper) setAsideOpen(false);
      }}
    >
      <nav
        ref={nav}
        class="w-full p-2 white rounded-b-2xl dark:border-b-1 dark:border-neutral-800 shadow-lg dark:shadow-xl transition-transform duration-200 ease-in-out transform -translate-y-full group-aria-[hidden=false]:translate-y-0 sm:translate-y-0"
      >
        <div
          ref={wrapper}
          class="relative flex flex-col gap-4 pt-1 pb-2 pl-4 pr-2"
        >
          <span
            class="absolute top-1 bottom-2 left-1 border-r-2 div-border"
            role="separator"
          />
          <Link href="/">
            Inicio
            <Icons.Home />
          </Link>
          <Link href="/registro">
            Registro de personas
            <Icons.Add />
          </Link>
          <Link href="/registros">
            Lista de registros <Icons.List />
          </Link>
          <Link href="/configuracion">
            Configuración
            <Icons.Gear />
          </Link>
          <Link href="/acerca-de">
            Acerca de
            <Icons.About />
          </Link>
        </div>
      </nav>
    </aside>
  );
};
export default Aside;
