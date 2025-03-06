import { createMemo, For, Show, useContext } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import { Portal } from "solid-js/web";
import { PARENTESCOS } from "../../constants";
import { parseWithSex } from "../../lib/utils";
import { ComunalRecord, HabitanteData } from "../../types/form";
import Cedula from "../cedula";
import { familyTabMsgClass } from "../../pages/form/components/family-form-tabs";
import { NoFamily } from "../../icons/form";
import { Trash } from "../../icons";
import { Edit } from "../../icons/aside";
import Btn from "../layout/btn";
import { FamilyFormContext, ModifyFamily } from "../../contexts/family";

type FamilyTabsProps = {
  data: (HabitanteData & { edad?: number | null | undefined })[];
  modifiable: boolean;
};

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

const Actions = (props: { index: number }) => {
  const context = useContext(FamilyFormContext);
  const { adding, setAdding, setModifyIndex } = context.edit;
  const { setOpen, setModifyMode } = context.modal;

  const prompt = (mode: ModifyFamily) => {
    setModifyMode(mode);
    context.modal.newIndex = props.index;
    setOpen(true);
  };

  return (
    <div class="grid grid-cols-2 items-center w-full m-auto gray-container-100 !rounded-b-[0] !p-0 *:!rounded-[0] *:!gap-1.5 text-sm overflow-hidden">
      <Btn
        class="!rounded-tl-[inherit]"
        onClick={() => {
          if (adding()) return prompt("edit");

          setModifyMode("edit");
          setModifyIndex(props.index);
          setAdding(true);
        }}
        variant="secondary"
      >
        <Edit class="!h-[1em]" /> Modificar
      </Btn>
      <Btn
        class="!rounded-tr-[inherit]"
        onClick={[prompt, "delete"]}
        variant="primary-danger"
      >
        <Trash class="!h-[1em]" /> Eliminar
      </Btn>
    </div>
  );
};

const FamilyReadTabs = (props: FamilyTabsProps) => {
  let tablist: HTMLDivElement;
  const tabs = createMemo(() => getFamilyTabs(props.data));

  return (
    <Show
      when={tabs()}
      fallback={
        <p
          style={{ "border-style": "solid dashed" }}
          class={`${familyTabMsgClass}  border-red-200 dark:border-[hsl(0,30%,30%)]`}
        >
          <NoFamily class="text-red-500 min-h-[2.5em]" />
          No se han agregado familiares
        </p>
      }
    >
      <Tabs class="flex flex-col gap-3">
        <Tabs.List
          class="flex items-center gap-2 w-full pb-2 border-b-1 div-border overflow-auto"
          ref={tablist!}
        />
        <For each={Object.entries(tabs() as FamilyTabs)}>
          {([label, data]) => (
            <>
              <Portal mount={tablist!}>
                <Tabs.Trigger class="tab-trigger" value={label}>
                  {label} {typeof data !== "string" && <b>({data.amount})</b>}
                </Tabs.Trigger>
              </Portal>
              <Tabs.Content value={label}>
                <ul class="flex items-center gap-3 pb-0.75 overflow-x-auto *:min-w-[400px] snap-x snap-proximity *:snap-center min-[800px]:gap-4 min-[800px]:*:w-max *:m-auto">
                  <For each={props.data}>
                    {(habitante, i) => {
                      const value =
                        typeof data === "string" ? data : data.value;

                      if (
                        !value ||
                        (typeof data !== "string"
                          ? habitante.parentesco === value
                          : habitante.parentesco.includes(value))
                      )
                        return (
                          <li class="relative">
                            {props.modifiable && <Actions index={i()} />}
                            {/* @ts-ignore */}
                            <Cedula
                              class={
                                props.modifiable
                                  ? "!rounded-t-[0] !border-t-0"
                                  : undefined
                              }
                              readOnly
                              familiar={i()}
                              data={habitante}
                            />
                          </li>
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
  );
};
export default FamilyReadTabs;
