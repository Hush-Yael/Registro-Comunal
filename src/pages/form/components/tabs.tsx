import { Home as HomeIcon } from "../../../icons/aside";
import {
  Family as FamilyIcon,
  Programs as ProgramsIcon,
} from "../../../icons/form";
import Jefe from "../tabs/jefe";
import Home from "../tabs/home";
import Family from "../tabs/family";
import Programs from "../tabs/programs";
import { For, JSX } from "solid-js";
import { Person } from "../../../icons";
import { Tabs } from "@kobalte/core/tabs";
import { Form } from "..";

class TabData {
  constructor(
    public content: () => JSX.Element,
    public icon: (props: any) => JSX.Element
  ) {
    this.content = content;
    this.icon = icon;
  }
}

const tablist = {
  jefe: new TabData(Jefe, Person),
  home: new TabData(Home, HomeIcon),
  family: new TabData(Family, FamilyIcon),
  programs: new TabData(Programs, ProgramsIcon),
};

class Tab {
  constructor(public value: string, public label: string) {}

  get trigger() {
    return (
      <Tabs.Trigger
        class="group flex items-center gap-1 py-1.5 px-2 not-data-selected:px-3"
        value={this.value}
      >
        {tablist[this.value as keyof typeof tablist].icon({
          class: "h-[1.25em]",
        })}
        <span class="group-not-data-selected:hidden">{this.label}</span>
      </Tabs.Trigger>
    );
  }

  get content() {
    return (
      <Tabs.Content class="flex flex-col gap-4" value={this.value}>
        {tablist[this.value as keyof typeof tablist].content!()}
      </Tabs.Content>
    );
  }
}

const TABS = [
  new Tab("jefe", "Datos del jefe"),
  new Tab("home", "Datos del domicilio"),
  new Tab("family", "Carga familiar"),
  new Tab("programs", "Programas sociales"),
];

export const FormTabs = () => {
  return (
    <Tabs class="tabs" defaultValue="jefe">
      <Tabs.List class="tab-list">
        <For each={TABS}>{(tab) => tab.trigger}</For>
        <Tabs.Indicator class="tab-indicator" />
      </Tabs.List>
      <form
        id="form"
        class="relative p-2 pb-3 border div-border rounded-xl inset-shadow-sm"
        onsubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          Form.handleSubmit();
        }}
      >
        <For each={TABS}>{(tab) => tab.content}</For>
      </form>
    </Tabs>
  );
};
