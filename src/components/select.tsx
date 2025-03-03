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

type Props<T extends SelectValue[], N extends true | undefined> = Omit<
  SelectBaseOptions<string | SelectOption>,
  "value" | "options"
> & {
  options: T;
  value: SelectValue | null;
  onChange?: (
    value: N extends undefined ? SelectValue | null : SelectValue
  ) => void;
  onBlur?: () => void;
  inputClass?: string;
  label?: JSX.Element;
  variant?: "input-solid" | "input-dash";
  parseText?: (value: string | null) => JSX.Element;
  parseOptionText?: (value: string) => JSX.Element;
  parseValueText?: (
    value: N extends undefined ? string | null : string
  ) => JSX.Element;
  useObject?: boolean;
  notNull?: N;
  contentClass?: string;
  error?: ValidationError | string;
};

const SELECT = <T extends SelectValue[], N extends true | undefined>(
  props: Props<T, N>
) => {
  let debounce = false,
    befValue = props.value;

  const change = (
    value: N extends undefined ? SelectValue | null : SelectValue
  ) => {
    if (debounce || (props.notNull && value === null) || befValue === value)
      return;

    props.onChange && props.onChange(value);
    debounce = true;
    setTimeout(() => (debounce = false), 50);
  };

  return (
    <Select
      class="flex flex-col gap-1"
      placeholder={props.placeholder || "Seleccionar..."}
      itemComponent={(itemProps) => {
        const parser = props.parseText || props.parseOptionText,
          label = (
            !props.useObject
              ? itemProps.item.rawValue
              : (itemProps.item.rawValue as unknown as SelectOption).label
          ) as string;

        return (
          <Select.Item
            class="flex items-center gap-2 py-1 px-3 data-selected:border-1 rounded-lg outline-0 data-highlighted:bg-[hsl(0,0%,97%)] dark:data-highlighted:bg-[hsl(0,0%,19%)] dark:data-selected:bg-[hsl(0,0%,19%)] transition-colors duration-200 cursor-pointer"
            item={itemProps.item}
          >
            <Select.ItemIndicator>
              <Check />
            </Select.ItemIndicator>
            <Select.ItemLabel>
              {!parser ? label : parser(label)}
            </Select.ItemLabel>
          </Select.Item>
        );
      }}
      options={props.options}
      // @ts-ignore
      value={props.value}
      {...(props.useObject && {
        optionValue: "value",
        optionTextValue: "label",
      })}
      // @ts-ignore
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
        onClick={() => (befValue = props.value)}
      >
        <Select.Value class="not-data-placeholder-shown:font-bold data-placeholder-shown:text-neutral-500 dark:data-placeholder-shown:text-neutral-400">
          {(state) => {
            const option = state.selectedOption() as string | SelectOption,
              parser = props.parseText || props.parseValueText;

            const value = (
              !props.useObject
                ? option
                : option
                ? (option as SelectOption).label
                : null
            ) as string | null;

            return !parser ? value : parser(value!);
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
