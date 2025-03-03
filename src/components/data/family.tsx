import { Show } from "solid-js";
import { Family as Icon } from "../../icons/form";
import SectionTitle from "../section-title";
import { HabitanteData } from "../../types/form";
import FamilyReadTabs from "./family-read-tabs";
import FamilyFormTabs from "../../pages/form/components/family-form-tabs";
import { FamilyContextProvider } from "../../contexts/family";

type FamilyProps<R extends true | undefined> = R extends true
  ? {
      readOnly: R;
      data: (HabitanteData & { edad: number | null })[];
    }
  : {};

const Family = <R extends true | undefined>(props: FamilyProps<R>) => (
  <section
    class={`flex flex-col gap-2 ${
      (props as FamilyProps<true>).readOnly
        ? "min-[800px]:col-[1/4] min-[800px]:min-w-full"
        : "min-[1000px]:col-[1/4] min-[1000px]:min-w-full"
    }`}
  >
    <SectionTitle>
      Carga familiar
      <Icon />
    </SectionTitle>
    <Show
      when={!(props as FamilyProps<true>).readOnly}
      fallback={
        <FamilyReadTabs
          modifiable={false}
          data={(props as FamilyProps<true>).data}
        />
      }
    >
      <FamilyContextProvider>
        <FamilyFormTabs />
      </FamilyContextProvider>
    </Show>
  </section>
);

export default Family;
