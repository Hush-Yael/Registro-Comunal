import { A } from "@solidjs/router";
import { ArrowL, NoFile } from "../icons";

const NotFound = () => {
  return (
    <main class="flex flex-col gap-0.5 p-5 mx-auto w-full max-w-[500px] md:gap-2">
      <NoFile class="!h-11 !w-11" />
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
