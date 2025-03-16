import { createEffect, createResource, createSignal, JSX } from "solid-js";
import { getRecords } from "../../lib/db";
import { For, Show } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import Jefes from "./tabs/jefes";
import Homes from "./tabs/homes";
import Clap from "./tabs/clap";
import Carnet from "./tabs/carnet";
import Gas from "./tabs/gas";
import Loader from "../../components/loader";
import { RecordKey } from "../../types/form";
import { externalFilter, setExternalFilter } from "./components/table";
import { useSearchParams } from "@solidjs/router";
import { NamedFilter } from "../../types/table";
import Businesses from "./tabs/businesses";
import Family from "./tabs/family";

export const commonFilters: NamedFilter<RecordKey>[] = [
  { label: "cédula", value: "cedula", number: true },
  { label: "nombres", value: "nombres", lettersOnly: true },
  { label: "apellidos", value: "apellidos", lettersOnly: true },
];

const tabs: {
  label: string;
  value: RecordKey;
  content: (props: any) => JSX.Element;
}[] = [
  { label: "Jefes de hogar", value: "jefe", content: Jefes },
  { label: "Viviendas", value: "homes", content: Homes },
  { label: "Negocios", value: "businesses", content: Businesses },
  { label: "Cargas familiares", value: "family", content: Family },
  { label: "CLAP", value: "clap", content: Clap },
  { label: "Carnet", value: "carnet", content: Carnet },
  { label: "Gas", value: "gas", content: Gas },
];

export const [shouldLoadAll, setShouldLoadAll] = createSignal(true);

const [allRecords, { refetch }] = createResource(shouldLoadAll(), async () => {
  setShouldLoadAll(false);
  return await getRecords();
});

const Records = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  createEffect(() => {
    if (!allRecords.error && !allRecords.loading && shouldLoadAll()) refetch();
  });

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
        <Show
          when={!allRecords.loading}
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
          <For each={tabs}>
            {({ value, content }) => (
              <Tabs.Content value={value}>
                {content({
                  data: allRecords()![value],
                })}
              </Tabs.Content>
            )}
          </For>
        </Show>
      </Tabs>
    </main>
  );
};

export default Records;
