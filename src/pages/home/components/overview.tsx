import { For, Show, Suspense } from "solid-js";
import { ComunalRecord } from "../../../types/form";
import { plural } from "../../../lib/utils";
import { Family } from "../../../icons/form";
import { Id, Box, Gas, Person } from "../../../icons/index";
import { Home } from "../../../icons/aside";
import Hr from "../../../components/hr";

const cards = [
  {
    colors:
      "border-red-400 dark:border-red-200 text-red-950 dark:text-red-100 bg-[hsl(0,80%,98%)] dark:bg-[hsl(0,10%,12%)]",
    label: (
      <>
        <Person />
        Jefes
      </>
    ),
    key: "jefe",
  },
  {
    colors:
      "border-orange-400 dark:border-orange-200 text-orange-950 dark:text-orange-100 bg-[hsl(30,80%,98%)] dark:bg-[hsl(30,10%,12%)]",
    label: (
      <>
        <Home />
        Viviendas
      </>
    ),
    key: "vivienda",
  },
  {
    colors:
      "border-yellow-400 dark:border-yellow-200 text-yellow-950 dark:text-yellow-100 bg-[hsl(60,80%,98%)] dark:bg-[hsl(60,10%,12%)]",
    label: (
      <>
        <Family />
        Cargas Familiares
      </>
    ),
    key: "cargaFamiliar",
  },
  {
    colors:
      "border-emerald-400 dark:border-emerald-200 text-emerald-950 dark:text-emerald-100 bg-[hsl(110,80%,98%)] dark:bg-[hsl(110,10%,12%)]",
    label: (
      <>
        <Id />
        Poseedores de Carnet
      </>
    ),
    key: "carnet",
  },
  {
    colors:
      "border-cyan-400 dark:border-cyan-200 text-cyan-950 dark:text-cyan-100 bg-[hsl(180,180%,98%)] dark:bg-[hsl(180,10%,12%)]",
    label: (
      <>
        <Box />
        Beneficiados del Clap
      </>
    ),
    key: "clap",
  },
  {
    colors:
      "border-purple-400 dark:border-purple-200 text-purple-950 dark:text-purple-100 bg-[hsl(250,80%,98%)] dark:bg-[hsl(250,10%,12%)]",
    label: (
      <>
        <Gas />
        Beneficiados del Gas Comunal
      </>
    ),
    key: "gas",
  },
];

const Overview = (props: {
  data: { [key in keyof ComunalRecord]: number };
}) => {
  return (
    <section class="flex flex-wrap justify-center gap-2 gap-x-3 m-auto max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:*:min-w-full">
      <For each={cards}>
        {({ label, key, colors }) => (
          <div
            class={`flex flex-col justify-between gap-1 !p-3 rounded-xl border-1 text-center w-3/10 max-w-[200px] ${
              colors || ""
            } shadow-[0_2px_2px_rgba(0,0,0,0.4)] dark:shadow-[0_2px_2px_rgba(0,0,0,.5)]`}
          >
            <p class="flex flex-col p-1 px-2 font-bold *:min-h-[1.5em]">
              {label}
            </p>
            <Hr />
            <Suspense fallback={"Cargando..."}>
              <Show when={props.data}>
                <span>
                  {props.data[key as keyof ComunalRecord]}{" "}
                  {plural("registro", props.data[key as keyof ComunalRecord])}
                </span>
              </Show>
            </Suspense>
          </div>
        )}
      </For>
    </section>
  );
};
export default Overview;
