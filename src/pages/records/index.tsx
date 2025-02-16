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
import { ComunalRecord } from "../../types/form";

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
    <main class="p-2 px-3">
      <section>
        <Tabs class="tabs" data-list-pos="r">
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
                  <Tabs.Content
                    value={value}
                    class="flex flex-col gap-6 pt-1 *:m-auto"
                  >
                    {content({
                      data: records()![value],
                    })}
                  </Tabs.Content>
                )}
              </For>
            </Show>{" "}
          </Suspense>
        </Tabs>
      </section>
    </main>
  );
};

export default Records;
