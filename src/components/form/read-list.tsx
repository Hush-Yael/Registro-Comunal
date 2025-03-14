import { For, JSX, Match, Show, Switch, useContext } from "solid-js";
import { Tabs } from "@kobalte/core/tabs";
import { Portal } from "solid-js/web";
import { NoFamily, NoShop } from "../../icons/form";
import { Trash } from "../../icons";
import { EditFilled } from "../../icons/aside";
import Btn from "../layout/btn";
import {
  ArrayFieldContext,
  ModifyArrayField,
} from "../../contexts/array-field";
import { ArrayFieldList, familyTabMsgClass } from "./add-list";
import { Form } from "../../pages/form";
import { HabitanteData } from "../../types/form";

type ReadArrayFieldProps<T> = {
  data: T[];
  list: ArrayFieldList;
  modifiable?: boolean;
  toRender: (props: {
    class?: string;
    data: T;
    readOnly: true | undefined;
    index: number;
  }) => JSX.Element;
  getTabs?: (items: T[]) => ArrayFieldTabs;
};

export type ArrayFieldTab = {
  amount: number;
  value: string;
};

export type ArrayFieldTabs = { [key: string]: ArrayFieldTab | string };

const Actions = (props: { list: ArrayFieldList; index: number }) => {
  const context = useContext(ArrayFieldContext);
  const { adding, setAdding, setModifyIndex } = context.edit;
  const { setOpen, setModifyMode } = context.modal;

  const prompt = (mode: ModifyArrayField) => {
    setModifyMode(mode);
    context.modal.newIndex = props.index;
    setOpen(true);
  };

  return (
    <div class="grid grid-cols-2 items-center w-full m-auto gray-container-100 !rounded-b-[0] !p-0 *:!rounded-[0] *:!gap-1.5 text-sm overflow-hidden">
      <Btn
        class="!rounded-tl-[inherit] dark:hover:!bg-[#222]"
        onClick={() => {
          if (adding()) return prompt("edit");

          setModifyMode("edit");
          setModifyIndex(props.index);
          Form.pushFieldValue(props.list, {
            ...Form.state.values[props.list][props.index],
            toCommit: true,
          });
          setAdding(true);
        }}
        variant="secondary"
        thickness="lg"
        aria-label="Modificar"
      >
        <EditFilled class="scale-140" />
      </Btn>
      <Btn
        class="!rounded-tr-[inherit]"
        onClick={[prompt, "delete"]}
        variant="primary-danger"
        thickness="lg"
        aria-label="Eliminar"
      >
        <Trash class="scale-130" />
      </Btn>
    </div>
  );
};

const TAB_CONDITIONS: Partial<{
  [key in ArrayFieldList]: ({
    data,
    value,
    item,
  }: {
    data: ArrayFieldTab;
    value: string;
    item: any;
  }) => boolean;
}> = {
  family: ({ data, value, item }) =>
    typeof data !== "string"
      ? item.parentesco === value
      : item.parentesco.includes(value),
  businesses: ({ data, value, item }) =>
    typeof data !== "string" ? item.tipo === value : item.tipo.includes(value),
};

const listC =
  "flex items-center gap-3 pb-0.75 overflow-x-auto *:min-w-[400px] snap-x snap-proximity *:snap-center min-[800px]:gap-4 min-[800px]:*:w-max *:m-auto";

type ListOnlyProps<T> = Pick<
  ReadArrayFieldProps<T>,
  "list" | "data" | "toRender" | "modifiable"
>;

const ListOnly = <T,>(props: ListOnlyProps<T>) => {
  const { modifyIndex } = useContext(ArrayFieldContext).edit;

  return (
    <ul class={listC}>
      <For each={props.data}>
        {(item, i) =>
          !(item as HabitanteData).deleted && (
            <li
              class="data-disabled:opacity-50 data-disabled:filter-[grayscale(80%)]"
              bool:data-disabled={modifyIndex() === i()}
            >
              {props.modifiable && <Actions list={props.list} index={i()} />}
              <props.toRender
                class={
                  props.modifiable ? "!rounded-t-[0] !border-t-0" : undefined
                }
                readOnly
                index={i()}
                data={item}
              />
            </li>
          )
        }
      </For>
    </ul>
  );
};

type TabbableProps<T> = Pick<
  ReadArrayFieldProps<T>,
  "list" | "toRender" | "data" | "modifiable"
> & {
  tabs: ArrayFieldTabs;
};

const Tabbable = <T,>(props: TabbableProps<T>) => {
  let tablist: HTMLDivElement;
  const { modifyIndex } = useContext(ArrayFieldContext).edit;

  return (
    <Tabs class="flex flex-col gap-3">
      <Tabs.List
        class="flex items-center gap-2 w-full pb-2 border-b-1 div-border overflow-auto"
        ref={tablist!}
      />
      <For each={Object.entries(props.tabs)}>
        {([tabLabel, tabData]) => (
          <>
            <Portal mount={tablist!}>
              <Tabs.Trigger class="tab-trigger" value={tabLabel}>
                {tabLabel}{" "}
                {typeof tabData !== "string" && <b>({tabData.amount})</b>}
              </Tabs.Trigger>
            </Portal>
            <Tabs.Content value={tabLabel}>
              <ul class={listC}>
                <For each={props.data}>
                  {(item, i) => {
                    const value =
                      typeof tabData === "string" ? tabData : tabData.value;

                    if (
                      !(item as HabitanteData).deleted &&
                      (!value ||
                        !(props.list in TAB_CONDITIONS) ||
                        TAB_CONDITIONS[props.list]!({
                          data: tabData as ArrayFieldTab,
                          value,
                          item: item,
                        }))
                    )
                      return (
                        <li
                          class="relative data-disabled:opacity-50 data-disabled:filter-[grayscale(80%)]"
                          bool:data-disabled={modifyIndex() === i()}
                        >
                          {props.modifiable && (
                            <Actions list={props.list} index={i()} />
                          )}
                          <props.toRender
                            class={
                              props.modifiable
                                ? "!rounded-t-[0] !border-t-0"
                                : undefined
                            }
                            readOnly
                            index={i()}
                            data={item}
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
  );
};

const ReadArrayFieldItems = <T,>(props: ReadArrayFieldProps<T>) => {
  const tabs = () => (props.getTabs ? props.getTabs!(props.data) : undefined);

  return (
    <Show
      when={props.data.length}
      fallback={
        <p
          style={{ "border-style": "solid dashed" }}
          class={`${familyTabMsgClass}  border-red-200 dark:border-[hsl(0,30%,30%)] *:!fill-red-500 *:min-h-[2.5em]`}
        >
          <Switch>
            <Match when={props.list === "family"}>
              <NoFamily />
            </Match>
            <Match when={props.list === "businesses"}>
              <NoShop />
            </Match>
            <Match when={props.list === "homes"}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M12,1.78,1.43,9.18l1.14,1.64L4,9.82V22H20V9.82l1.43,1,1.14-1.64Zm-.17,15.77-1.66-1.1,1.54-2.32-2-2,2.46-3.68,1.66,1.1-1.54,2.32,2,2Z" />
                </g>
              </svg>
            </Match>
          </Switch>
          No se han añadido registros
        </p>
      }
    >
      <Show
        when={props.getTabs}
        fallback={
          <ListOnly
            list={props.list}
            data={props.data}
            toRender={props.toRender}
            modifiable={props.modifiable}
          />
        }
      >
        <Tabbable
          tabs={tabs!()!}
          data={props.data}
          list={props.list}
          toRender={props.toRender}
          modifiable={props.modifiable}
        />
      </Show>
    </Show>
  );
};
export default ReadArrayFieldItems;
