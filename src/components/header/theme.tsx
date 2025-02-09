import { Match, Switch } from "solid-js";
import { theme, setTheme } from "../../App";
import { Sun, Moon, System } from "../../icons";
import Menu, { MenuContent, Trigger } from "../dropdown-menu";
import RadioGroup from "../radio-group";

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
      <Trigger class="flex items-center gap-2">
        <Switch>
          <Match when={theme() === "light"}>
            <Sun class="!size-[24px] sm:!size-[1.2em]" />
          </Match>
          <Match when={theme() === "dark"}>
            <Moon class="!size-[24px] sm:!size-[1.2em]" />
          </Match>
          <Match when={theme() === "system"}>
            <System class="!size-[24px] sm:!size-[1.2em]" />
          </Match>
        </Switch>
        <span class="hidden sm:inline">Tema</span>
      </Trigger>
      <MenuContent class="dialog-content !z-10 dark:!bg-neutral-900 !shadow-xl sm:!top-1">
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
