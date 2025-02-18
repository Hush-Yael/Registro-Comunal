import { For, Show } from "solid-js";
import SectionTitle from "../../../components/section-title";
import { ComunalRecord } from "../../../types/form";
import Cedula from "../components/cedula";
import { Family as FamilyIcon } from "../../../icons/form";
import { parseWithSex } from "../../../lib/utils";
import { PARENTESCOS } from "../../../constants";
import { Tabs } from "@kobalte/core/tabs";
import { Portal } from "solid-js/web";

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

const Family = (props: { data: ComunalRecord["family"] }) => {
  let tablist;
  const tabs = getFamilyTabs(props.data);

  return (
    <section class="col-[1/3] min-[800px]:min-w-full">
      <SectionTitle>
        Carga familiar
        <FamilyIcon />
      </SectionTitle>
      <article class="flex flex-col gap-3 py-3">
        <Show when={!props.data || !props.data.length}>
          No hay familiares registrados.
        </Show>
        <Show when={props.data && props.data.length}>
          <Show when={tabs}>
            <Tabs class="flex flex-col gap-3">
              <Tabs.List
                class="flex items-center gap-2 w-full overflow-auto"
                ref={tablist}
              />
              <For each={Object.entries(tabs as FamilyTabs)}>
                {([label, data]) => (
                  <>
                    <Portal mount={tablist}>
                      <Tabs.Trigger class="tab-trigger" value={label}>
                        {label}{" "}
                        {typeof data !== "string" && <b>({data.amount})</b>}
                      </Tabs.Trigger>
                    </Portal>
                    <Tabs.Content value={label}>
                      <ul class="flex items-center gap-3 overflow-auto *:min-w-full snap-x snap-proximity *:snap-center min-[800px]:gap-4 min-[800px]:*:min-w-max">
                        <For each={props.data}>
                          {(habitante) => {
                            const value =
                              typeof data === "string" ? data : data.value;

                            return (
                              (!value ||
                                (typeof data !== "string"
                                  ? habitante.parentesco === value
                                  : habitante.parentesco.includes(value))) && (
                                <li>
                                  <Cedula data={habitante} />
                                </li>
                              )
                            );
                          }}
                        </For>
                      </ul>
                    </Tabs.Content>
                  </>
                )}
              </For>
            </Tabs>
          </Show>
          <Show when={!tabs}>
            <ul class="flex items-center gap-3 overflow-auto *:min-w-full snap-x snap-proximity *:snap-center">
              <For each={props.data}>
                {(habitante) => (
                  <li>
                    <Cedula data={habitante} />
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </Show>
      </article>
    </section>
  );
};
export default Family;
