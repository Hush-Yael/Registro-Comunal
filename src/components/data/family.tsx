import { Show } from "solid-js";
import { Family as Icon } from "../../icons/form";
import SectionTitle from "../layout/section-title";
import { ComunalRecord, HabitanteData } from "../../types/form";
import { ArrayFieldContextProvider } from "../../contexts/array-field";
import ReadArrayFieldItems, {
  ArrayFieldTab,
  ArrayFieldTabs,
} from "../form/read-list";
import ArrayField from "../form/add-list";
import Cedula from "../cedula";
import { PARENTESCOS } from "../../constants";
import { parseWithSex } from "../../lib/utils";

type FamilyProps<R extends true | undefined> = R extends true
  ? {
      readOnly: R;
      data: (HabitanteData & { edad: number | null })[];
    }
  : {};

const getFamilyTabs = (habitantes: ComunalRecord["family"]) => {
  const neededTabs: ArrayFieldTabs = {};

  for (let i = 0; i < habitantes.length; i++) {
    const habitante = habitantes[i];
    const parentesco = habitante.parentesco;
    const no = /((m|p)adre)|espos/.test(parentesco);

    const tab = PARENTESCOS.includes(parentesco)
      ? !no
        ? parseWithSex("M", parentesco) + "s"
        : parentesco
      : "sin especificar";

    if (!(tab in neededTabs)) {
      if (no) {
        if (/(m|p)adre/.test(tab)) neededTabs.padres = "adre";
        else neededTabs[parseWithSex("", tab)] = "espos";
      } else
        neededTabs[tab] = {
          amount: 1,
          value: parentesco,
        };
    } else if (!no) (neededTabs[tab] as ArrayFieldTab).amount++;
  }

  return {
    todos: { amount: habitantes.length, value: "" },
    ...neededTabs,
  };
};

const Family = <R extends true | undefined>(props: FamilyProps<R>) => (
  <section
    class={`flex flex-col gap-2 ${
      (props as FamilyProps<true>).readOnly
        ? "min-[800px]:col-[1/4] min-[800px]:min-w-full"
        : "min-[1000px]:col-[1/4] min-[1000px]:min-w-full"
    }`}
  >
    <Show
      when={!(props as FamilyProps<true>).readOnly}
      fallback={
        <>
          <SectionTitle>
            Carga familiar
            <Icon />
          </SectionTitle>
          <ReadArrayFieldItems
            list="family"
            toRender={Cedula}
            modifiable={false}
            getTabs={getFamilyTabs}
            data={(props as FamilyProps<true>).data}
          />
        </>
      }
    >
      <ArrayFieldContextProvider>
        <ArrayField
          list="family"
          toRender={Cedula}
          tabbable
          getTabs={getFamilyTabs}
        />
      </ArrayFieldContextProvider>
    </Show>
  </section>
);

export default Family;
