import { For, Index, Setter, Show } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import { Portal } from "solid-js/web";
import { PARENTESCOS } from "../../constants";
import { parseWithSex } from "../../lib/utils";
import { ComunalRecord } from "../../types/form";
import Cedula from "../cedula";
import {
  familyTabMsgClass,
  ModifyFamily,
} from "../../pages/form/components/family-form-tabs";
import { NoFamily } from "../../icons/form";

type FamilyTabsProps<R extends false | ModifyFamily> = {
  data: ComunalRecord["family"];
} & (R extends ModifyFamily
  ? {
      modifiable: ModifyFamily;
      setModifyIndex: Setter<number | undefined>;
    }
  : { modifiable: false });

type FamilyTab = {
  amount: number;
  value: string;
};

type FamilyTabs = { [key: string]: FamilyTab | string };

const getFamilyTabs = (habitantes: ComunalRecord["family"]) => {
  if (!habitantes.length) return;

  const neededTabs: FamilyTabs = {};

  for (let i = 0; i < habitantes.length; i++) {
    const habitante = habitantes[i];
    const parentesco = habitante.parentesco;
    const no = /((m|p)adre)|espos/.test(parentesco);

    const tab = PARENTESCOS.includes(parentesco)
      ? !no
        ? parseWithSex("M", parentesco) + "s"
        : parentesco
      : "sin especificar";

    if (!(tab in neededTabs)) {
      if (no) {
        console.log(tab);

        if (/(m|p)adre/.test(tab)) neededTabs.padres = "adre";
        else neededTabs[parseWithSex("", tab)] = "espos";
      } else
        neededTabs[tab] = {
          amount: 1,
          value: parentesco,
        };
    } else if (!no) (neededTabs[tab] as FamilyTab).amount++;
  }

  return { todos: { amount: habitantes.length, value: "" }, ...neededTabs };
};

const ul =
  "flex items-center gap-3 overflow-x-auto *:min-w-[400px] snap-x snap-proximity *:snap-center min-[800px]:gap-4 min-[800px]:*:w-max *:m-auto";

const c =
  "absolute inset-1 rounded-xl border-2 outline-0 border-dashed border-neutral-400 dark:border-neutral-600 hover:border-[currentColor] focus-visible:border-[currentColor] hover:bg-[#0002] dark:hover:bg-[#fff1] focus-visible:bg-[#0002] dark:focus-visible:bg-[#fff1] transition-colors duration-300";

const FamilyReadTabs = <R extends false | ModifyFamily>(
  props: FamilyTabsProps<R>
) => {
  if (!props.data.length)
    return (
      <p
        style={{ "border-style": "solid dashed" }}
        class={`${familyTabMsgClass}  border-red-200 dark:border-[hsl(0,30%,30%)]`}
      >
        <NoFamily class="text-red-500 min-h-[2.5em]" />
        No se han agregado familiares
      </p>
    );

  let tablist;
  const tabs = getFamilyTabs(props.data);

  return (
    <Show
      when={tabs}
      fallback={
        <ul class={ul}>
          <Index each={props.data}>
            {(habitante, i) => (
              <li class="relative">
                <Show when={props.modifiable}>
                  <button
                    aria-label="Seleccionar"
                    class={c}
                    onClick={() =>
                      (props as FamilyTabsProps<ModifyFamily>).setModifyIndex(i)
                    }
                  />
                </Show>
                <Cedula readOnly familiar={i} data={habitante()} />
              </li>
            )}
          </Index>
        </ul>
      }
    >
      <Tabs class="flex flex-col gap-3">
        <Tabs.List
          class="flex items-center gap-2 w-full pb-2 border-b-1 div-border overflow-auto"
          ref={tablist}
        />
        <For each={Object.entries(tabs as FamilyTabs)}>
          {([label, data]) => (
            <>
              <Portal mount={tablist}>
                <Tabs.Trigger class="tab-trigger" value={label}>
                  {label} {typeof data !== "string" && <b>({data.amount})</b>}
                </Tabs.Trigger>
              </Portal>
              <Tabs.Content value={label}>
                <ul class={ul}>
                  <Index each={props.data}>
                    {(habitante, i) => {
                      const value =
                        typeof data === "string" ? data : data.value;

                      if (
                        !value ||
                        (typeof data !== "string"
                          ? habitante().parentesco === value
                          : habitante().parentesco.includes(value))
                      )
                        return (
                          <li class="relative">
                            <Show when={props.modifiable}>
                              <button
                                aria-label="Seleccionar"
                                class={c}
                                onClick={() =>
                                  (
                                    props as FamilyTabsProps<ModifyFamily>
                                  ).setModifyIndex(i)
                                }
                              />
                            </Show>
                            <Cedula readOnly familiar={i} data={habitante()} />
                          </li>
                        );
                    }}
                  </Index>
                </ul>
              </Tabs.Content>
            </>
          )}
        </For>
      </Tabs>
    </Show>
  );
};
export default FamilyReadTabs;
