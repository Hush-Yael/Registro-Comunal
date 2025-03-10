import { Show } from "solid-js";
import { ArrayFieldContextProvider } from "../../contexts/array-field";
import { Shop } from "../../icons/form";
import { ComunalRecord } from "../../types/form";
import ArrayField from "../form/add-list";
import ReadArrayFieldItems from "../form/read-list";
import SectionTitle from "../layout/section-title";
import BusinessData from "./business-data";

export type BusinessSectionProps<R extends true | undefined> = {
  readOnly: R;
} & (R extends true
  ? {
      // para mostrar los ya añadidos (el index se pasa automáticamente en el <For> de ReadArrayFieldItems)
      data: ComunalRecord["business"];
    }
  : {});

const Business = <R extends true | undefined>(
  props: BusinessSectionProps<R>
) => {
  return (
    <section>
      <Show
        when={!(props as BusinessSectionProps<true>).readOnly}
        fallback={
          <>
            <SectionTitle>
              Negocios <Shop />
            </SectionTitle>
            <ReadArrayFieldItems
              list="business"
              modifiable={false}
              toRender={BusinessData}
              data={(props as BusinessSectionProps<true>).data}
            />
          </>
        }
      >
        <ArrayFieldContextProvider>
          <ArrayField list="business" toRender={BusinessData} />
        </ArrayFieldContextProvider>
      </Show>
    </section>
  );
};
export default Business;
