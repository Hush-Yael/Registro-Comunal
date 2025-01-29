import { setTheme, theme } from "../../App";
import RadioGroup from "../../components/radio-group";
import SectionTitle from "../../components/section-title";
import { Gear } from "../../icons/aside";
import * as Icons from "../../icons/settings";

const themes = [
  {
    label: (
      <>
        <Icons.Sun /> Claro
      </>
    ),
    value: "light",
  },
  {
    label: (
      <>
        <Icons.Moon /> Oscuro
      </>
    ),
    value: "dark",
  },
  {
    label: (
      <>
        <Icons.System /> Automático
      </>
    ),
    value: "system",
  },
];

const Settings = () => {
  return (
    <main class="p-4">
      <SectionTitle>
        Configuración
        <Gear class="fore" />
      </SectionTitle>
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
