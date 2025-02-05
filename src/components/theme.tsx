import { Match, Switch } from "solid-js";
import { theme, setTheme } from "../App";
import { Sun, Moon, System } from "../icons";
import Menu, { MenuContent, Trigger } from "./dropdown-menu";
import RadioGroup from "./radio-group";

const themes = [
  {
    label: (
      <>
        <Sun /> Claro
      </>
    ),
    value: "light",
  },
  {
    label: (
      <>
        <Moon /> Oscuro
      </>
    ),
    value: "dark",
  },
  {
    label: (
      <>
        <System /> Automático
      </>
    ),
    value: "system",
  },
];

const Theme = () => {
  return (
    <Menu>
      <Trigger class="*:!size-[24px]">
        <Switch>
          <Match when={theme() === "light"}>
            <Sun />
          </Match>
          <Match when={theme() === "dark"}>
            <Moon />
          </Match>
          <Match when={theme() === "system"}>
            <System />
          </Match>
        </Switch>
      </Trigger>
      <MenuContent class="dialog-content !z-10 dark:!bg-neutral-900 !shadow-xl">
        <RadioGroup
          orientation="vertical"
          wrapperClass="!p-0  !bg-[transparent]"
          name="theme"
          value={theme() || "light"}
          items={themes}
          onChange={(item) => setTheme(item.value)}
        />
      </MenuContent>
    </Menu>
  );
};
export default Theme;
