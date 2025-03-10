import SectionTitle from "../layout/section-title";
import { Home as Icon } from "../../icons/aside";
import { ComunalRecord } from "../../types/form";
import HomeData from "./home-data";
import { Show } from "solid-js";
import { ArrayFieldContextProvider } from "../../contexts/array-field";
import ArrayField from "../form/add-list";
import ReadArrayFieldItems from "../form/read-list";

export type HomeSectionProps<R extends true | undefined> = R extends true
  ? {
      readOnly: true;
      data: ComunalRecord["homes"];
    }
  : {};

const Homes = <R extends true | undefined>(props: HomeSectionProps<R>) => {
  return (
    <section
      class={`col-span-2 flex flex-col gap-2 ${
        (props as HomeSectionProps<true>).readOnly
          ? "min-[800px]:col-[1/4] min-[800px]:min-w-full"
          : "min-[1000px]:col-[1/4] min-[1000px]:min-w-full"
      }`}
    >
      <Show
        when={!(props as HomeSectionProps<true>).readOnly}
        fallback={
          <>
            <SectionTitle>
              Residencias
              <Icon />
            </SectionTitle>
            <ReadArrayFieldItems
              list="homes"
              modifiable={false}
              toRender={HomeData}
              data={(props as HomeSectionProps<true>).data}
            />
          </>
        }
      >
        <ArrayFieldContextProvider>
          <ArrayField list="homes" toRender={HomeData} />
        </ArrayFieldContextProvider>
      </Show>
    </section>
  );
};
export default Homes;
