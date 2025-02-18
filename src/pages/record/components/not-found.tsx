import { A } from "@solidjs/router";
import { ArrowL } from "../../../icons";
import { Add } from "../../../icons/aside";
import { cedula as Cedula } from "../../../lib/data";

const NotFound = (props: { cedula: string }) => {
  return (
    <div class="flex items-center h-full m-auto max-sm:h-[calc(100vh-var(--h-h))]">
      <article class="flex flex-col gap-10 w-8/10 max-w-[700px] m-auto p-2 ">
        <div class="flex flex-col gap-6">
          <h2 class="flex flex-col max-[800px]:items-center text-3xl font-bold decoration-2 underline underline-offset-4">
            <svg
              class="!h-13 !w-13 text-red-400"
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
              <path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057"></path>
              <path d="M3 3l18 18"></path>
            </svg>
            Error de búsqueda
          </h2>
          <div class="">
            <h3 class="text-2xl">
              <span>No hay registros para la cédula: </span>{" "}
              <span class="font-[400] text-amber-500 dark:text-amber-400">
                {Cedula(parseInt(props.cedula))}
              </span>
            </h3>
            <p class="mt-3 fore">
              Es posible que la cédula sea{" "}
              <span class="decoration-wavy underline decoration-neutral-300 underline-offset-2">
                incorrecta
              </span>
              , que el registro haya sido{" "}
              <span class="text-red-400">eliminado</span> o que aún no se haya{" "}
              <span class="text-emerald-500 dark:text-emerald-400">
                añadido
              </span>
              .
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 justify-center items-center gap-3 max-w-[500px] min-[800px]:ml-auto min-[800px]:min-w-[400px]">
          <A href="/" class="!gap-2 p-2 btn btn-primary">
            <ArrowL />
            Ir al inicio
          </A>
          <A href="/registro" class="!gap-2 p-2 btn btn-outline">
            <Add />
            Ir al formulario
          </A>
        </div>
      </article>
    </div>
  );
};
export default NotFound;
