import { A } from "@solidjs/router";
import * as Icons from "../../icons/header";
import { asideOpen, setAsideOpen } from "../aside";
import Search from "./search";
import Theme from "./theme";
import { useMedia } from "../../hooks/useMedia";
import { Show } from "solid-js";

const mediaChanged = useMedia("(min-width: 640px)");

const Header = () => {
  return (
    <header class="sticky z-5 top-0 flex gap-4 items-center h-[var(--h-h)] p-3 border-b-1 div-border white lg:px-4 transition-[height]">
      <Show when={!mediaChanged()}>
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
      </Show>
      <h1 class="font-bold text-2xl">
        <A href="/">Registro Comunal</A>
      </h1>
      <div class="flex items-center gap-3 ml-auto *:rounded-lg sm:*:p-1 sm:*:px-3 sm:*:bg-neutral-100 sm:dark:*:bg-neutral-800 sm:*:hover:bg-[hsl(0,0%,93%)] sm:dark:*:hover:bg-[hsl(0,0%,18%)] *:transition-colors">
        <Theme />
        <Search />
      </div>
    </header>
  );
};
export default Header;
