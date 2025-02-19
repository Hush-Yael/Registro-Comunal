import { Select } from "@kobalte/core/select";
import { SelectBaseOptions } from "@kobalte/core/src/select/select-base.jsx";
import { JSX } from "solid-js";
import { CaretD, Check } from "../icons";
import { ValidationError } from "@tanstack/solid-form";
import { errorText } from "./input";

export type SelectOption = {
  value: unknown;
  label: string;
};
type SelectValue = string | SelectOption;

type Props<T extends SelectValue[]> = Omit<
  SelectBaseOptions<string | SelectOption>,
  "value" | "options"
> & {
  options: T;
  value: SelectValue | null;
  onChange?: (value: SelectValue | null) => void;
  onBlur?: () => void;
  inputClass?: string;
  label?: JSX.Element;
  variant?: "input-solid" | "input-dash";
  parseOptionText?: (value: string) => string;
  parseValueText?: (value: string) => string;
  useObject?: boolean;
  notNull?: boolean;
  contentClass?: string;
  error?: ValidationError | string;
};

const SELECT = <T extends SelectValue[]>(props: Props<T>) => {
  let debounce = false;

  const change = (value: string | SelectOption | null) => {
    if (debounce || (props.notNull && value === null)) return;
    const _value = value === null ? "" : value;
    props.onChange && props.onChange(_value);
    debounce = true;
    setTimeout(() => (debounce = false), 50);
  };

  return (
    // @ts-ignore
    <Select
      class="flex flex-col gap-1"
      placeholder={props.placeholder || "Seleccionar..."}
      itemComponent={(itemProps) => {
        const label = (
          !props.useObject
            ? itemProps.item.rawValue
            : (itemProps.item.rawValue as unknown as SelectOption).label
        ) as string;

        return (
          <Select.Item
            class="flex items-center gap-2 py-1 px-3 data-selected:border-1 rounded-lg outline-0 data-highlighted:bg-[hsl(0,0%,97%)] dark:data-highlighted:bg-[hsl(0,0%,19%)] dark:data-selected:bg-[hsl(0,0%,19%)] transition-colors duration-200"
            item={itemProps.item}
          >
            <Select.ItemIndicator>
              <Check />
            </Select.ItemIndicator>
            <Select.ItemLabel>
              {!props.parseOptionText ? label : props.parseOptionText(label)}
            </Select.ItemLabel>
          </Select.Item>
        );
      }}
      options={props.options}
      value={props.value}
      {...(props.useObject && {
        optionValue: "value",
        optionTextValue: "label",
      })}
      onChange={change}
      validationState={props.error ? "invalid" : "valid"}
    >
      {props.label && <Select.Label class="ml-1">{props.label}</Select.Label>}
      <Select.Trigger
        class={`${
          !props.variant ? "input-solid" : props.variant
        } flex justify-between items-center data-invalid:!border-red-500 dark:data-invalid:!border-red-400 !pr-1 w-full ${
          props.inputClass || ""
        }`}
        onBlur={props.onBlur}
      >
        <Select.Value class="not-data-placeholder-shown:font-bold data-placeholder-shown:text-neutral-500 dark:data-placeholder-shown:text-neutral-400">
          {(state) => {
            const option = state.selectedOption() as string | SelectOption;
            const value = (
              !props.useObject ? option : (option as SelectOption).label
            ) as string;

            return !props.parseValueText ? value : props.parseValueText(value);
          }}
        </Select.Value>
        <Select.Icon>
          <CaretD class="h-[1.5em] scale-110 fore" />
        </Select.Icon>
      </Select.Trigger>
      <Select.ErrorMessage class={errorText}>{props.error}</Select.ErrorMessage>
      <Select.Portal>
        <Select.Content
          class={`dialog-content max-h-[360px] overflow-auto ${
            props.contentClass || ""
          }`}
        >
          <Select.Listbox class="flex flex-col gap-1 py-1" />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};

export default SELECT;
