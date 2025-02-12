import {
  ToggleGroup as Group,
  ToggleGroupRootProps,
} from "@kobalte/core/toggle-group";
import { createEffect, createSignal, For, JSX } from "solid-js";

type Option = { label: JSX.Element; value: string };
type ToggleGroupProps = ToggleGroupRootProps & {
  class?: string;
  options: string[] | Option[];
  onChange?: (value: string | string[]) => void;
};

const ToggleGroup = (props: ToggleGroupProps) => {
  const [value, setValue] = createSignal<string[]>([]);

  createEffect(() => {
    props.onChange && props.onChange(value() as string & string[]);
  });

  return (
    <Group
      {...props}
      // @ts-expect-error strip prop
      options={null}
      class={`flex flex-wrap gap-2 ${props.class || ""}`}
      value={value()}
      onChange={setValue}
    >
      <For each={props.options}>
        {(option) => (
          <Group.Item
            class="px-3 rounded-2xl border div-border aria-pressed:!border-neutral-900 dark:aria-pressed:!border-white not-aria-pressed:text-neutral-600 dark:not-aria-pressed:text-neutral-400 aria-pressed:bg-neutral-900 aria-pressed:text-white dark:aria-pressed:bg-white dark:aria-pressed:text-neutral-900"
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
