import { setTheme, theme } from "../../App";
import Hr from "../../components/divider";
import RadioGroup from "../../components/radio-group";
import { Gear } from "../../icons/aside";
import * as Icons from "../../icons/settings";

const themes = [
  {
    label: (
      <>
        <Icons.Sun class="h-[1.125em]" /> Claro
      </>
    ),
    value: "light",
  },
  {
    label: (
      <>
        <Icons.Moon class="h-[1.125em]" /> Oscuro
      </>
    ),
    value: "dark",
  },
  {
    label: (
      <>
        <Icons.System class="h-[1.125em]" /> Automático
      </>
    ),
    value: "system",
  },
];

const Settings = () => {
  return (
    <main class="p-4">
      <h2 class="flex items-center gap-2  text-2xl font-bold">
        <Gear />
        Configuración
      </h2>
      <Hr />
      <div class="mt-3">
        <RadioGroup
          legend="Tema"
          name="theme"
          value={theme()}
          items={themes}
          onChange={(item) => setTheme(item.value)}
        />
      </div>
    </main>
  );
};
export default Settings;
