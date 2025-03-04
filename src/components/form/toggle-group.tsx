import {
  ToggleGroup as Group,
  ToggleGroupRootProps,
} from "@kobalte/core/toggle-group";
import { createSignal, For, JSX } from "solid-js";

type Option = { label: JSX.Element; value: string };
type Options = string[] | Option[];

type Value<M extends boolean, N extends true | undefined> = M extends true
  ? string[]
  : N extends undefined
  ? string | null
  : string;

type ToggleGroupProps<
  O extends Options,
  N extends true | undefined,
  M extends boolean = false
> = Omit<ToggleGroupRootProps, "value" | "onChange"> & {
  class?: string;
  options: O;
  value?: Value<M, N>;
  defaultValue?: undefined | Value<M, N>;
  notNull?: N;
  multiple?: M;
  onChange?: (
    value: M extends false ? Value<false, N> : Value<true, N>
  ) => void;
};

const ToggleGroup = <
  O extends Options,
  N extends true | undefined,
  M extends boolean = false
>(
  props: ToggleGroupProps<O, N, M>
) => {
  const [value, setValue] = createSignal<Value<M, N> | undefined>(
    props.defaultValue
  );

  return (
    <Group
      {...props}
      options={null}
      class={`flex gap-2 overflow-auto min-h-max *:min-w-max ${
        props.class || ""
      }`}
      value={props.value || value()}
      // @ts-expect-error
      onChange={(v: M extends true ? string[] : Value<false, N>) => {
        if (props.notNull && (v === null || v.length === 0)) return;
        // @ts-expect-error
        setValue(v as Value<M, N>);
        // @ts-expect-error
        props.onChange && props.onChange(v);
      }}
      multiple={props.multiple}
    >
      <For each={props.options}>
        {(option) => (
          <Group.Item
            class="flex items-center justify-center gap-2 px-3 rounded-2xl border div-border aria-pressed:!border-neutral-900 dark:aria-pressed:!border-white not-aria-pressed:text-neutral-600 dark:not-aria-pressed:text-neutral-400 aria-pressed:bg-neutral-900 aria-pressed:text-white dark:aria-pressed:bg-white dark:aria-pressed:text-neutral-900 transition-colors"
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.label}
          </Group.Item>
        )}
      </For>
    </Group>
  );
};
export default ToggleGroup;
