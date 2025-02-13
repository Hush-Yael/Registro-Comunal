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

const tabs = [
  { label: "Jefes de hogar", value: "jefe", content: Jefes },
  { label: "Viviendas", value: "vivienda", content: Homes },
  { label: "CLAP", value: "clap", content: Clap },
  { label: "Carnet", value: "carnet", content: Carnet },
  { label: "Gas", value: "gas", content: Gas },
];

const mediaChanged = useMedia("(min-width: 1024px)");

const RecordsTabs = (props: Props) => {
  return (
    <section>
      <Tabs
        class="tabs"
        defaultValue="jefes"
        orientation={!mediaChanged() ? "horizontal" : "vertical"}
        data-list-pos="r"
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
          <Show when={props.records}>
            <For each={tabs}>
              {({ value, content }) => (
                <Tabs.Content value={value} class="*:m-auto py-4 overflow-auto">
                  {content({
                    records: props.records![value as keyof ComunalRecord],
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
