import { A } from "@solidjs/router";
import * as Icons from "../icons/header";
import { asideOpen, setAsideOpen } from "./aside";
import Search from "./search";

const Header = () => {
  return (
    <header class="sticky z-5 top-0 flex gap-4 items-center h-[var(--h-h)] p-3 border-b-1 div-border white">
      <button
        aria-label="ver menú"
        onClick={() => setAsideOpen(!asideOpen())}
        class={`rounded-lg outline-1 outline-[transparent] 
          ${asideOpen() ? "outline-neutral-300 dark:outline-neutral-700" : ""}
          outline-offset-3
        transition-colors`}
      >
        <Icons.Menu class="!h-[24px]" />
      </button>
      <h1 class="font-bold text-2xl">
        <A href="/">Registro Comunal</A>
      </h1>
      <Search />
    </header>
  );
};
export default Header;
