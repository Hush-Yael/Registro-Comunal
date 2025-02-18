import { Home as HomeIcon } from "../../../icons/aside";
import {
  Family as FamilyIcon,
  Programs as ProgramsIcon,
} from "../../../icons/form";
import Jefe from "../tabs/jefe";
import Home from "../tabs/home";
import Family from "../tabs/family";
import Programs from "../tabs/programs";
import { For } from "solid-js";
import { Person } from "../../../icons";
import { Tabs } from "@kobalte/core/tabs";
import { Form } from "..";

const TABS = [
  {
    value: "jefe",
    label: (
      <>
        <Person /> Datos del jefe
      </>
    ),
    content: Jefe,
  },
  {
    value: "home",
    label: (
      <>
        <HomeIcon /> Datos del domicilio
      </>
    ),
    content: Home,
  },
  {
    value: "family",
    label: (
      <>
        <FamilyIcon /> Carga familiar
      </>
    ),
    content: Family,
  },
  {
    value: "programs",
    label: (
      <>
        <ProgramsIcon /> Programas sociales
      </>
    ),
    content: Programs,
  },
];

export const FormTabs = () => {
  return (
    <Tabs class="tabs" defaultValue="jefe">
      <Tabs.List class="tab-list overflow-auto">
        <For each={TABS}>
          {(tab) => <Tabs.Trigger value={tab.value}>{tab.label}</Tabs.Trigger>}
        </For>
        <Tabs.Indicator class="tab-indicator" />
      </Tabs.List>
      <form
        id="form"
        class="relative p-2 pb-3 border div-border rounded-xl inset-shadow-sm *:flex *:flex-col *:gap-4"
        onsubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          Form.handleSubmit();
        }}
      >
        <For each={TABS}>
          {(tab) => (
            <Tabs.Content value={tab.value}>{<tab.content />}</Tabs.Content>
          )}
        </For>
      </form>
    </Tabs>
  );
};
