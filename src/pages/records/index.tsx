import { createResource, JSX } from "solid-js";
import { getRecords } from "../../lib/db";
import { For, Show, Suspense } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import Jefes from "./tabs/jefes";
import Homes from "./tabs/homes";
import Clap from "./tabs/clap";
import Carnet from "./tabs/carnet";
import Gas from "./tabs/gas";
import Loader from "../../components/loader";
import { ComunalRecord, RecordKey } from "../../types/form";
import {
  externalFilter,
  NamedFilter,
  setExternalFilter,
} from "./components/table";
import { useSearchParams } from "@solidjs/router";

export const commonFilters: NamedFilter<RecordKey>[] = [
  { label: "cédula", value: "cedula", number: true },
  { label: "nombres", value: "nombres", lettersOnly: true },
  { label: "apellidos", value: "apellidos", lettersOnly: true },
];

const tabs: {
  label: string;
  value: keyof Omit<ComunalRecord, "family">;
  content: (props: any) => JSX.Element;
}[] = [
  { label: "Jefes de hogar", value: "jefe", content: Jefes },
  { label: "Viviendas", value: "home", content: Homes },
  { label: "CLAP", value: "clap", content: Clap },
  { label: "Carnet", value: "carnet", content: Carnet },
  { label: "Gas", value: "gas", content: Gas },
];

const Records = () => {
  const [records] = createResource(async () => await getRecords());

  return (
    <main class="p-2 px-3" style={{ height: "calc(100vh - var(--h-h))" }}>
      <Tabs
        class="tabs overflow-auto h-full"
        defaultValue={(searchParams.tab as string) || "jefe"}
        onChange={(tab) => {
          if (externalFilter()) setExternalFilter(undefined);
          setSearchParams({ tab });
        }}
      >
        <Tabs.List class="tab-list sticky top-0">
          <For each={tabs}>
            {(tab) => (
              <Tabs.Trigger value={tab.value}>{tab.label}</Tabs.Trigger>
            )}
          </For>
          <Tabs.Indicator class="tab-indicator" />
        </Tabs.List>
        <Suspense
          fallback={
            <Loader
              wrapperClass="absolute top-0 bottom-0 left-0 right-0 m-auto"
              s={80}
              active
            >
              Cargando...
            </Loader>
          }
        >
          <Show when={records()}>
            <For each={tabs}>
              {({ value, content }) => (
                <Tabs.Content value={value}>
                  {content({
                    data: records()![value],
                  })}
                </Tabs.Content>
              )}
            </For>
          </Show>{" "}
        </Suspense>
      </Tabs>
    </main>
  );
};

export default Records;
