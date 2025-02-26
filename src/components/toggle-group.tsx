import {
  ToggleGroup as Group,
  ToggleGroupRootProps,
} from "@kobalte/core/toggle-group";
import { createEffect, createSignal, For, JSX } from "solid-js";

type Option = { label: JSX.Element; value: string };
type Value = string[] | Option[];
type CValue<N extends true | undefined> = N extends true
  ? null | string | string[]
  : string | string[];

type ToggleGroupProps<
  T extends Value,
  N extends true | undefined
> = ToggleGroupRootProps & {
  class?: string;
  options: T;
  notNull?: N;
  multiple?: boolean;
  onChange?: (value: CValue<N>) => void;
};

const ToggleGroup = <T extends Value, N extends true | undefined>(
  props: ToggleGroupProps<T, N>
) => {
  const [value, setValue] = createSignal<CValue<N> | undefined>(
    props.defaultValue
  );

  createEffect(() => {
    props.onChange && props.onChange(value()!);
  });

  return (
    <Group
      {...props}
      // @ts-expect-error strip prop
      options={null}
      class={`flex gap-2 overflow-auto min-h-max *:min-w-max ${
        props.class || ""
      }`}
      value={value()}
      onChange={setValue}
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
