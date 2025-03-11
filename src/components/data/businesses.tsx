import { Show } from "solid-js";
import { ArrayFieldContextProvider } from "../../contexts/array-field";
import { Shop } from "../../icons/form";
import { ComunalRecord } from "../../types/form";
import ArrayField from "../form/add-list";
import ReadArrayFieldItems from "../form/read-list";
import SectionTitle from "../layout/section-title";
import BusinessData from "./business-data";

export type BusinessesSectionProps<R extends true | undefined> = {
  readOnly: R;
} & (R extends true
  ? {
      // para mostrar los ya añadidos (el index se pasa automáticamente en el <For> de ReadArrayFieldItems)
      data: ComunalRecord["businesses"];
    }
  : {});

const Businesses = <R extends true | undefined>(
  props: BusinessesSectionProps<R>
) => {
  return (
    <section class="flex flex-col gap-2 min-[800px]:col-[1/4] min-[800px]:min-w-full">
      <Show
        when={!(props as BusinessesSectionProps<true>).readOnly}
        fallback={
          <>
            <SectionTitle>
              Negocios <Shop />
            </SectionTitle>
            <ReadArrayFieldItems
              list="businesses"
              modifiable={false}
              toRender={BusinessData}
              data={(props as BusinessesSectionProps<true>).data}
            />
          </>
        }
      >
        <ArrayFieldContextProvider>
          <ArrayField list="businesses" toRender={BusinessData} />
        </ArrayFieldContextProvider>
      </Show>
    </section>
  );
};
export default Businesses;
