import { createResource, For, Show, Suspense } from "solid-js";
import { plural } from "../../../lib/utils";
import { FamilyFilled } from "../../../icons/form";
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
    colors:
      "hover:bg-red-50/20 dark:hover:bg-red-50/10 hover:outline-red-600 dark:hover:outline-red-400 hover:**:!fill-red-700 hover:dark:**:!fill-[hsl(0_100%_65%)]",
    label: (
      <>
        <PersonFilled />
        Jefes
      </>
    ),
    key: "jefe",
  },
  {
    colors:
      "hover:bg-orange-50/20 dark:hover:bg-orange-50/10 hover:outline-orange-600 dark:hover:outline-orange-300 hover:**:!fill-orange-700 hover:dark:**:!fill-orange-400",
    label: (
      <>
        <HomeFilled />
        Viviendas
      </>
    ),
    key: "homes",
  },
  {
    colors:
      "hover:bg-yellow-50/20 dark:hover:bg-yellow-50/10 hover:outline-yellow-600 dark:hover:outline-yellow-300 hover:**:!fill-yellow-700 hover:dark:**:!fill-yellow-400",
    label: (
      <>
        <FamilyFilled />
        Cargas Familiares
      </>
    ),
    key: "family",
  },
  {
    colors:
      "hover:bg-emerald-50/20 dark:hover:bg-emerald-50/10 hover:outline-emerald-600 dark:hover:outline-emerald-300 hover:**:!fill-emerald-700 hover:dark:**:!fill-emerald-400",
    label: (
      <>
        <IdFilled />
        Poseedores de Carnet
      </>
    ),
    key: "carnet",
  },
  {
    colors:
      "hover:bg-cyan-50/20 dark:hover:bg-cyan-50/10 hover:outline-cyan-600 dark:hover:outline-cyan-300 hover:**:!fill-cyan-700 hover:dark:**:!fill-cyan-400",
    label: (
      <>
        <BoxFilled />
        Beneficiados del Clap
      </>
    ),
    key: "clap",
  },
  {
    colors:
      "hover:bg-purple-50/20 dark:hover:bg-purple-50/10 hover:outline-purple-600 dark:hover:outline-purple-300 hover:**:!fill-purple-700 hover:dark:**:!fill-purple-400",
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
  const [data] = createResource(async () => {
    return await getOverview();
  });

  return (
    <section class="flex flex-wrap justify-center gap-2 gap-x-3 m-auto max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:*:min-w-full">
      <For each={cards}>
        {({ label, key, colors }) => (
          <a
            href={`/registros?tab=${key}`}
            class={`flex flex-col justify-between gap-1 w-3/10 max-w-[200px] !p-3 rounded-xl outline-1 hover:outline-2 outline-neutral-400 dark:outline-neutral-700 hover:scale-101 dark:bg-[hsl(0,0%,13%)] ${
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
