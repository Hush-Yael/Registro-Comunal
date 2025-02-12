import { Tabs } from "@kobalte/core/tabs";
import SectionTitle from "../../../components/section-title";
import Restore from "./restore";
import Overview from "./overview";
import { createResource } from "solid-js";
import { getOverview } from "../../../lib/db";
import { Backup, DBconfig, DB as DBIcon, Summary } from "../../../icons/home";
import Manejo from "./manejo";
import { breakpoint } from "..";

const DB = () => {
  const [data] = createResource(async () => getOverview());
  let tablist;

  return (
    <section>
      <SectionTitle>
        Base de datos del sector
        <DBIcon />
      </SectionTitle>
      <Tabs
        class="tabs"
        orientation={!breakpoint() ? "horizontal" : "vertical"}
        data-list-pos="r"
      >
        <Tabs.List ref={tablist} class="tab-list lg:my-2">
          <Tabs.Indicator class="tab-indicator !p-0" />
          <Tabs.Trigger class="p-1 px-2" value="overview">
            <Summary />
            Resumen
          </Tabs.Trigger>
          <Tabs.Trigger class="p-1 px-2" value="restore">
            <Backup />
            Restaurar datos
          </Tabs.Trigger>
          <Tabs.Trigger class="p-1 px-2" value="files">
            <DBconfig />
            Manejo de datos
          </Tabs.Trigger>
        </Tabs.List>
        <div class="*:p-2">
          <Tabs.Content value="overview">
            <Overview data={data()!} />
          </Tabs.Content>
          <Tabs.Content value="restore">
            <Restore />
          </Tabs.Content>
          <Tabs.Content value="files">
            <Manejo />
          </Tabs.Content>
        </div>
      </Tabs>
    </section>
  );
};
export default DB;
