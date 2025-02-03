import { Select } from "@kobalte/core/select";
import { SelectBaseOptions } from "@kobalte/core/src/select/select-base.jsx";
import { JSX } from "solid-js";
import { CaretD, Check } from "../icons";

type Props = SelectBaseOptions<any> & {
  label: JSX.Element;
  parseOptionText?: (value: string) => string;
};

const SELECT = (props: Props) => {
  let debounce = false;

  const change = (value: any[]) => {
    if (debounce) return;

    props.onChange && props.onChange(value);
    debounce = true;
    setTimeout(() => (debounce = false), 50);
  };

  return (
    // @ts-ignore
    <Select
      class="flex flex-col gap-1"
      itemComponent={(itemProps) => (
        <Select.Item
          class="flex items-center gap-2 py-1 px-3 data-selected:border-1 rounded-lg outline-0 data-highlighted:bg-[hsl(0,0%,97%)] dark:data-highlighted:bg-[hsl(0,0%,19%)] dark:data-selected:bg-[hsl(0,0%,19%)] transition-colors duration-200"
          item={itemProps.item}
        >
          <Select.ItemIndicator>
            <Check />
          </Select.ItemIndicator>
          <Select.ItemLabel>
            {!props.parseOptionText
              ? itemProps.item.rawValue
              : props.parseOptionText(
                  itemProps.item.rawValue as unknown as string
                )}
          </Select.ItemLabel>
        </Select.Item>
      )}
      placeholder="Seleccionar..."
      {...props}
      onChange={change}
      // @ts-expect-error: strip props
      label={null}
      parseOptionText={null}
    >
      <Select.Label class="ml-1">{props.label}</Select.Label>
      <Select.Trigger class="flex justify-between items-center input !pr-1 w-full">
        <Select.Value class="not-data-placeholder-shown:font-bold data-placeholder-shown:text-neutral-500 dark:data-placeholder-shown:text-neutral-400">
          {(state) =>
            !props.parseOptionText
              ? (state.selectedOption() as string)
              : props.parseOptionText(state.selectedOption() as string)
          }
        </Select.Value>
        <Select.Icon>
          <CaretD class="h-[1.5em] scale-110 fore" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="dialog-content">
          <Select.Listbox class="flex flex-col gap-1 py-1 max-h-[360px] overflow-y-auto" />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};

export default SELECT;
