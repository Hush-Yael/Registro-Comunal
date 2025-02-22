import { Show } from "solid-js";
import { Family as Icon } from "../../icons/form";
import SectionTitle from "../section-title";
import { ComunalRecord } from "../../types/form";
import FamilyReadTabs from "./family-read-tabs";
import FamilyFormTabs from "../../pages/form/components/family-form-tabs";

type FamilyProps<R extends true | undefined> = R extends true
  ? {
      readOnly: R;
      data: ComunalRecord["family"];
    }
  : {};

const Family = <R extends true | undefined>(props: FamilyProps<R>) => (
  <section class="flex flex-col gap-2">
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
      <FamilyFormTabs />
    </Show>
  </section>
);

export default Family;
