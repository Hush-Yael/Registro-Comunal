import * as radio from "@zag-js/radio-group";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { JSX } from "solid-js";
import { Index, createMemo, createUniqueId } from "solid-js";

type RadioOption = {
  label: JSX.Element;
  value: string;
};

type RadioGroupProps = {
  legend: JSX.Element;
  items: RadioOption[];
  value: string;
  name: string;
  disabled?: boolean;
  onChange?: (details: RadioOption) => void;
  orientation?: "horizontal" | "vertical";
};

const RadioGroup = (props: RadioGroupProps) => {
  const id = createUniqueId();
  const [state, send] = useMachine(
    radio.machine({
      id,
      value: props.value ?? props.items[0].value,
      name: props.name,
      disabled: props.disabled,
      orientation: props.orientation || "horizontal",
      onValueChange: props.onChange,
    })
  );
  const api = createMemo(() => radio.connect(state, send, normalizeProps));

  return (
    <div role="radiogroup" aria-labelledby={id + "-legend"}>
      <p id={id + "-legend"} class="mb-0.5 ml-1 text-lg font-[500]">
        {props.legend}
      </p>
      <div
        class={`relative flex ${
          props.orientation === "vertical"
            ? "flex-col gap-2"
            : "justify-between gap-1"
        } p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 max-w-full overflow-auto`}
        {...api().getRootProps()}
      >
        <div
          {...api().getIndicatorProps()}
          class="z-1 w-[var(--width)] h-[var(--height)] rounded-xl btn-primary shadow-md cursor-pointer user-select-none"
        />
        <Index each={props.items}>
          {(item) => (
            <label
              {...api().getItemProps({ value: item().value })}
              class="relative data-[state=checked]:z-2 data-[state=checked]:font-[500] data-[state=checked]:text-white dark:data-[state=checked]:text-black"
            >
              <span
                class="flex items-center gap-1 py-0.5 px-2"
                {...api().getItemTextProps({ value: item().value })}
              >
                {item().label}
              </span>
              <input
                {...api().getItemHiddenInputProps({ value: item().value })}
              />
            </label>
          )}
        </Index>
      </div>
    </div>
  );
};
export default RadioGroup;
