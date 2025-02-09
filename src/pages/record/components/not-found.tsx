import { A } from "@solidjs/router";
import { NoFile, ArrowL } from "../../../icons";
import { Add } from "../../../icons/aside";
import { cedula as Cedula } from "../../../lib/data";

const NotFound = (props: { cedula: string }) => {
  return (
    <article class="absolute top-0 bottom-0 left-0 right-0 h-fit max-w-[700px] flex flex-col items-center m-auto p-2 text-center">
      <NoFile class="!h-11 !w-11" />
      <h2 class="text-2xl font-bold">
        No hay registros para la cédula "
        <span class="font-[400] text-amber-500 dark:text-amber-400">
          {Cedula(parseInt(props.cedula))}
        </span>
        ".
      </h2>
      <p class="mt-3 fore text-balance">
        Es posible que la cédula sea{" "}
        <span class="decoration-wavy underline decoration-neutral-300 underline-offset-2">
          incorrecta
        </span>
        , que el registro haya sido <span class="text-red-400">eliminado</span>{" "}
        o que aún no se haya{" "}
        <span class="text-emerald-500 dark:text-emerald-400">añadido</span>.
      </p>
      <div class="flex justify-center items-center gap-3 w-8/10 max-w-[500px] m-auto mt-7 *:flex-1">
        <A href="/" class="!gap-2 p-1.5 btn btn-primary">
          <ArrowL />
          Ir al inicio
        </A>
        <A href="/registro" class="!gap-2 p-1.5 btn btn-outline">
          <Add />
          Ir al formulario
        </A>
      </div>
    </article>
  );
};
export default NotFound;
