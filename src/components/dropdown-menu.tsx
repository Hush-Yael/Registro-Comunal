import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { JSX } from "solid-js";
import { Check } from "../icons";
import { MenuRadioItemProps } from "@kobalte/core/src/menu/menu-radio-item.jsx";
import { MenuTriggerProps } from "@kobalte/core/src/menu/menu-trigger.jsx";

type Props = {
  children: JSX.Element;
};

export const Menu = (props: Props) => (
  <DropdownMenu>{props.children}</DropdownMenu>
);

export const Trigger = (
  props: Props & { class?: string } & MenuTriggerProps
) => <DropdownMenu.Trigger {...props}>{props.children}</DropdownMenu.Trigger>;

export const MenuContent = (
  props: Props & {
    class?: string;
  }
) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content class={props.class || "dialog-content mt-1"}>
      {props.children}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
);

const Indicator = () => (
  <DropdownMenu.ItemIndicator>
    <Check class="h-[1.2em]" />
  </DropdownMenu.ItemIndicator>
);

export const RadioItem = (props: Props & MenuRadioItemProps) => (
  <DropdownMenu.RadioItem
    class="flex items-center gap-1 aria-[checked=false]:pl-[1.45em]"
    {...props}
  >
    <Indicator />
    {props.children}
  </DropdownMenu.RadioItem>
);

export default Menu;
