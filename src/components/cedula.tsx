import { CaretD } from "../icons";
import Menu, { MenuContent, RadioItem, Trigger } from "./dropdown-menu";
import { DropdownMenu } from "@kobalte/core";
import Number, { NumberProps } from "./number";
import { errorText } from "./input";
import { Show } from "solid-js";

type CedulaProps = NumberProps & {
  ven: boolean;
  onVenChange: (value: boolean) => void;
};

const Cedula = (props: CedulaProps) => {
  const ven = () => (props.ven ? "V" : "E");
  return (
    <div class="flex flex-col gap-1">
      <div class="grid grid-cols-[auto_1fr] items-center gap-1">
        <p class="col-span-2 ml-1.25">Cédula</p>
        <Menu>
          <Trigger
            aria-label="seleccionar nacionalidad"
            class="flex items-center row-[2/3] col-[1/2] h-full !p-0 input"
            type="button"
          >
            <CaretD class="!h-[1.5em] fore" />
          </Trigger>
          <MenuContent>
            <DropdownMenu.RadioGroup
              class="*:cursor-pointer *:rounded-lg *:px-1 *:hover:bg-neutral-100 dark:*:hover:bg-neutral-700 *:transition-colors"
              value={ven()}
              onChange={(value) => props.onVenChange(value === "V")}
            >
              <RadioItem value="V">Venezolano</RadioItem>
              <RadioItem value="E">Extranjero</RadioItem>
            </DropdownMenu.RadioGroup>
          </MenuContent>
        </Menu>
        <div class="w-full">
          <Number
            type="number"
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            error={props.error}
            hideError
            min={1}
            prefix={<span class="tracking-[3px]">{ven()}-</span>}
          />
        </div>
      </div>
      <Show when={props.error}>
        <p class={`${errorText} ml-1`}>{props.error}</p>
      </Show>
    </div>
  );
};
export default Cedula;
