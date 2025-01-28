import * as Icons from "../icons/header";
import { setAsideOpen } from "./aside";
const Header = () => {
  return (
    <header class="sticky z-5 top-0 flex gap-4 items-center py-2 px-3 border-b-1 div-border white">
      <button aria-label="ver menú" onClick={() => setAsideOpen(true)}>
        <Icons.Menu />
      </button>
      <h1 class="font-bold text-2xl">Registro Comunal</h1>
      <button aria-label="buscar" class="ml-auto">
        <Icons.Search />
      </button>
    </header>
  );
};
export default Header;
