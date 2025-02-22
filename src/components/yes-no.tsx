import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { CancelRoundFilled, CaretD, Check, QuestionFilled } from "../icons";
import Menu, { MenuContent, Trigger } from "./dropdown-menu";
import Select, { SelectProps, SelectValue } from "./select";
import { createSignal } from "solid-js";
import { Question } from "../types/form";
import { effect } from "solid-js/web";
import Answer from "./answer";
import { SQLiteBool } from "../lib/db";

type Props = {
  value: Question;
  onChange: (value: Question) => void;
};

const YesNo = (props: Props) => {
  const [value, setValue] = createSignal<string>();

  effect(() => {
    setValue(props.value === null ? "null" : String(props.value));
  });

  return (
    <Menu>
      <Trigger class="flex items-center justify-center gap-1">
        <Answer value={SQLiteBool(props.value)} />
        <CaretD />
      </Trigger>
      <MenuContent>
        <DropdownMenu.RadioGroup
          class="*:flex *:items-center *:gap-2 *:p-1 *:px-2 *:border-1 *:border-transparent *:aria-[checked=true]:border-[currentColor] *:rounded-md *:transition-colors *:cursor-pointer"
          value={value()}
          onChange={(v) => {
            props.onChange(v === "null" ? null : Number(v));
          }}
        >
          <DropdownMenu.RadioItem value={"1"}>
            <Check class="scale-130 **:fill-green-600" />
            Si
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value={"0"}>
            <CancelRoundFilled class="!fill-red-500" />
            No{" "}
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value={"null"}>
            <QuestionFilled class="scale-90 !fill-neutral-500 dark:!fill-neutral-400" />
            Desconocido
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </MenuContent>
    </Menu>
  );
};

export default YesNo;
