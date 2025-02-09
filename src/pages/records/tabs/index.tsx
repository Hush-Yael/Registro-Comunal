import { For, Show, Suspense } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import { ComunalRecord } from "../../../types/form";
import Jefes from "./jefes";
import Homes from "./homes";
import Clap from "./clap";
import Carnet from "./carnet";
import Gas from "./gas";
import Loader from "../../../components/loader";
import { DBComunalRecords } from "../../../types/db";
import { useMedia } from "../../../hooks/useMedia";

type Props = {
  records: DBComunalRecords | undefined;
};

const tabs = {
  jefe: Jefes,
  home: Homes,
  clap: Clap,
  carnet: Carnet,
  gas: Gas,
};

const mediaChanged = useMedia("(min-width: 1024px)");

const RecordsTabs = (props: Props) => {
  return (
    <section>
      <Tabs
        defaultValue="jefes"
        orientation={!mediaChanged() ? "horizontal" : "vertical"}
      >
        <Tabs.List class={`tab-list ${mediaChanged() ? "flex-col" : ""}`}>
          <For each={Object.keys(tabs)}>
            {(tab) => (
              <Tabs.Trigger
                class="min-w-max p-2 first-letter:uppercase"
                value={tab}
              >
                {tab}
              </Tabs.Trigger>
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
          <Show when={props.records}>
            <For each={Object.entries(tabs)}>
              {([key, content]) => (
                <Tabs.Content
                  value={key}
                  class="w-full *:min-w-[300px] *:m-auto py-4 overflow-auto"
                >
                  {content({
                    records: props.records![key as keyof ComunalRecord],
                  })}
                </Tabs.Content>
              )}
            </For>
          </Show>
        </Suspense>
      </Tabs>
    </section>
  );
};
export default RecordsTabs;
