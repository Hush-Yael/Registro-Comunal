import { createResource, For, Show, Suspense } from "solid-js";
import { plural } from "../../../lib/utils";
import { FamilyFilled, ShopFilled } from "../../../icons/form";
import {
  GasFilled,
  BoxFilled,
  IdFilled,
  PersonFilled,
} from "../../../icons/index";
import { HomeFilled } from "../../../icons/aside";
import Hr from "../../../components/layout/hr";
import { RecordKey } from "../../../types/form";
import { getOverview } from "../../../lib/db";

const cards = [
  {
    colors: `
      hover:bg-red-100/20 focus-visible:bg-red-100/20 dark:hover:bg-red-50/10 focus-visible:dark:hover:bg-red-50/10 
      hover:outline-red-500 focus-visible:outline-red-500 dark:hover:outline-red-400 dark:focus-visible:outline-red-400
      hover:**:!fill-red-700 focus-visible:**:!fill-red-700 hover:dark:**:!fill-[hsl(0_100%_65%)] focus-visible:dark:**:!fill-[hsl(0_100%_65%)]`,
    label: (
      <>
        <PersonFilled />
        Jefes
      </>
    ),
    key: "jefe",
  },
  {
    colors: `
      hover:bg-yellow-100/20 focus-visible:bg-yellow-100/20 dark:hover:bg-yellow-50/10 focus-visible:dark:hover:bg-yellow-50/10 
      hover:outline-yellow-500 focus-visible:outline-yellow-500 dark:hover:outline-yellow-300 dark:focus-visible:outline-yellow-300
      hover:**:!fill-yellow-700 focus-visible:**:!fill-yellow-700 hover:dark:**:!fill-yellow-400 focus-visible:dark:**:!fill-yellow-400`,
    label: (
      <>
        <HomeFilled />
        Viviendas
      </>
    ),
    key: "homes",
  },
  {
    colors: `
      hover:bg-lime-100/20 focus-visible:bg-lime-100/20 dark:hover:bg-lime-50/10 focus-visible:dark:hover:bg-lime-50/10 
      hover:outline-lime-500 focus-visible:outline-lime-500 dark:hover:outline-lime-300 dark:focus-visible:outline-lime-300
      hover:**:!fill-lime-700 focus-visible:**:!fill-lime-700 hover:dark:**:!fill-lime-400 focus-visible:dark:**:!fill-lime-400`,
    label: (
      <>
        <ShopFilled />
        Negocios
      </>
    ),
    key: "businesses",
  },
  {
    colors: `
      hover:bg-emerald-100/20 focus-visible:bg-emerald-100/20 dark:hover:bg-emerald-50/10 focus-visible:dark:hover:bg-emerald-50/10 
      hover:outline-emerald-500 focus-visible:outline-emerald-500 dark:hover:outline-emerald-300 dark:focus-visible:outline-emerald-300
      hover:**:!fill-emerald-700 focus-visible:**:!fill-emerald-700 hover:dark:**:!fill-emerald-400 focus-visible:dark:**:!fill-emerald-400`,
    label: (
      <>
        <FamilyFilled />
        Cargas Familiares
      </>
    ),
    key: "family",
  },
  {
    colors: `
      hover:bg-cyan-100/20 focus-visible:bg-cyan-100/20 dark:hover:bg-cyan-50/10 focus-visible:dark:hover:bg-cyan-50/10 
      hover:outline-cyan-500 focus-visible:outline-cyan-500 dark:hover:outline-cyan-300 dark:focus-visible:outline-cyan-300
      hover:**:!fill-cyan-700 focus-visible:**:!fill-cyan-700 hover:dark:**:!fill-cyan-400 focus-visible:dark:**:!fill-cyan-400`,
    label: (
      <>
        <IdFilled />
        Poseedores de Carnet
      </>
    ),
    key: "carnet",
  },
  {
    colors: `
      hover:bg-blue-100/20 focus-visible:bg-blue-100/20 dark:hover:bg-blue-50/10 focus-visible:dark:hover:bg-blue-50/10 
      hover:outline-blue-500 focus-visible:outline-blue-500 dark:hover:outline-blue-300 dark:focus-visible:outline-blue-300
      hover:**:!fill-blue-700 focus-visible:**:!fill-blue-700 hover:dark:**:!fill-blue-400 focus-visible:dark:**:!fill-blue-400`,
    label: (
      <>
        <BoxFilled />
        Beneficiados del Clap
      </>
    ),
    key: "clap",
  },
  {
    colors: `
      hover:bg-purple-100/20 focus-visible:bg-purple-100/20 dark:hover:bg-purple-50/10 focus-visible:dark:hover:bg-purple-50/10 
      hover:outline-purple-500 focus-visible:outline-purple-500 dark:hover:outline-purple-300 dark:focus-visible:outline-purple-300
      hover:**:!fill-purple-700 focus-visible:**:!fill-purple-700 hover:dark:**:!fill-purple-400 focus-visible:dark:**:!fill-purple-400`,
    label: (
      <>
        <GasFilled />
        Beneficiados del Gas Comunal
      </>
    ),
    key: "gas",
  },
];

const Overview = () => {
  const [data] = createResource(async () => await getOverview());

  return (
    <section class="not-support-[display:grid]:flex flex-wrap justify-center grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] supports-[display:grid]:*:w-full gap-2 gap-x-3 m-auto">
      <For each={cards}>
        {({ label, key, colors }) => (
          <a
            href={`/registros?tab=${key}`}
            class={`flex flex-col justify-between gap-1 w-3/10 not-support-[display:grid]:max-w-[200px] !p-3 rounded-xl outline-1 hover:outline-2 focus-visible:outline-2 outline-neutral-400 dark:outline-neutral-700 hover:scale-101 focus-visible:scale-101 dark:bg-[hsl(0,0%,13%)] ${
              colors || ""
            } **:transition-colors text-center shadow-md dark:!shadow-[0_2px_2px_rgba(0,0,0,.5)]`}
            style={{
              transition:
                "color 0.3s ease-in-out, background-color 0.3s ease-in-out, outline-color 0.3s ease-in-out, transform 0.1s ease-in-out, scale 0.1s ease-in-out",
            }}
          >
            <span class="flex flex-col gap-0.5 p-1 font-[500] px-2 *:min-h-[1.5em] *:transition-colors *:duration-100">
              {label}
            </span>
            <Hr />
            <Suspense fallback={"Cargando..."}>
              <Show when={data()}>
                <span>
                  {data()![key as RecordKey]}{" "}
                  {plural("registro", data()![key as RecordKey])}
                </span>
              </Show>
            </Suspense>
          </a>
        )}
      </For>
    </section>
  );
};
export default Overview;
