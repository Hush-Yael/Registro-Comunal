import { A } from "@solidjs/router";
import * as Icons from "../icons/header";
import { setAsideOpen } from "./aside";
const Header = () => {
  return (
    <header class="sticky z-5 top-0 flex gap-4 items-center py-2 px-3 border-b-1 div-border white">
      <button aria-label="ver menú" onClick={() => setAsideOpen(true)}>
        <Icons.Menu class="!h-[24px]" />
      </button>
      <h1 class="font-bold text-2xl">
        <A href="/">Registro Comunal</A>
      </h1>
      <button aria-label="buscar" class="ml-auto">
        <Icons.Search class="!h-[24px]" />
      </button>
    </header>
  );
};
export default Header;
