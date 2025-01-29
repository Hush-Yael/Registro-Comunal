import { Select } from "@kobalte/core/select";
import { SelectBaseOptions } from "@kobalte/core/src/select/select-base.jsx";
import { JSX } from "solid-js";
import { CaretD, Check } from "../icons";

type Props = {
  label: JSX.Element;
} & SelectBaseOptions<any>;

const SELECT = (props: Props) => (
  // @ts-ignore
  <Select
    class="flex flex-col gap-1"
    itemComponent={(props) => {
      return (
        <Select.Item
          class="flex items-center gap-2 py-1 px-3 data-selected:border-1 rounded-lg outline-0 data-highlighted:bg-[hsl(0,0%,97%)] dark:data-highlighted:bg-[hsl(0,0%,19%)] dark:data-selected:bg-[hsl(0,0%,19%)] transition-colors duration-200"
          item={props.item}
        >
          <Select.ItemIndicator>
            <Check />
          </Select.ItemIndicator>
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
        </Select.Item>
      );
    }}
    {...props}
    // @ts-expect-error: strip prop
    label={null}
  >
    <Select.Label class="ml-1">{props.label}</Select.Label>
    <Select.Trigger class="flex justify-between items-center input !pr-1 w-full">
      <Select.Value class="font-bold">
        {(state) => state.selectedOption() as string}
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

export default SELECT;
