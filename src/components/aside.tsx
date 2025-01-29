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
      class="group fixed z-10 top-0 bottom-0 w-full bg-black/10 dark:bg-black/20 aria-hidden:pointer-events-none aria-hidden:opacity-0 transition-opacity duration-300 ease-in-out"
      aria-hidden={!asideOpen()}
      onclick={(e) => {
        if (e.target !== nav && e.target !== wrapper) setAsideOpen(false);
      }}
    >
      <nav
        ref={nav}
        class="h-full w-65 p-2 white dark:border-r-1 dark:border-neutral-800 shadow-lg dark:shadow-xl transition-transform duration-200 ease-in-out transform -translate-x-full group-aria-[hidden=false]:translate-x-0 sm:translate-x-0"
      >
        <div ref={wrapper} class="relative flex flex-col gap-3 pl-5">
          <span
            class="absolute top-0 bottom-0 left-2 border-r-2 div-border"
            role="separator"
          />
          <Link href="/nuevo-registro">
            Nuevo registro
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
