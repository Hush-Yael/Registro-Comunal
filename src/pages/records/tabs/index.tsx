import { For } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import { ComunalRecord } from "../../../types/form";
import Jefes from "./jefes";
import Homes from "./homes";
import Clap from "./clap";
import Carnet from "./carnet";
import Gas from "./gas";
import { createSignal } from "solid-js";

type Props = {
  records: ComunalRecord[];
};

const tabs = {
  jefes: Jefes,
  viviendas: Homes,
  clap: Clap,
  carnet: Carnet,
  gas: Gas,
};

const media = window.matchMedia("(min-width: 700px)");
const [mediaChange, setMediaChange] = createSignal(media.matches);
media.addEventListener("change", () => setMediaChange(media.matches));

const RecordsTabs = (props: Props) => {
  return (
    <section>
      <Tabs
        defaultValue="gas"
        orientation={!mediaChange() ? "horizontal" : "vertical"}
      >
        <Tabs.List class={`tab-list ${mediaChange() ? "flex-col" : ""}`}>
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
        <For each={Object.entries(tabs)}>
          {([key, content]) => (
            <Tabs.Content
              value={key}
              class="w-full *:min-w-[300px] py-4 overflow-auto"
            >
              {content({ records: props.records })}
            </Tabs.Content>
          )}
        </For>
      </Tabs>
    </section>
  );
};
export default RecordsTabs;
