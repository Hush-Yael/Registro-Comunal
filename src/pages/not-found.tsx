import { A } from "@solidjs/router";
import { ArrowL } from "../icons";

const NotFound = () => {
  return (
    <main class="flex flex-col gap-0.5 p-5 mx-auto w-full max-w-[500px] md:gap-2">
      <svg
        class="!h-11 !w-11"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="24"
        height="24"
        stroke-width="1.5"
      >
        <path d="M3 3l18 18"></path>
        <path d="M7 3h7l5 5v7m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14"></path>
      </svg>
      <h2 class="text-4xl font-bold">404...</h2>
      <p class="text-2xl">Sección no encontrada.</p>
      <p class="fore">Parece que la sección que buscas no existe.</p>
      <A href="/" class="mt-4 p-1.5 btn btn-primary !gap-2">
        <ArrowL />
        Ir al inicio
      </A>
    </main>
  );
};
export default NotFound;
