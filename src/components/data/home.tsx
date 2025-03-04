import SectionTitle from "../layout/section-title";
import { Home as Icon } from "../../icons/aside";
import { ComunalRecord } from "../../types/form";
import HomeData from "./home-data";

export type HomeDataProps<R extends true | undefined> = R extends true
  ? {
      readOnly: true;
      data: ComunalRecord["home"];
    }
  : {};

const Home = <R extends true | undefined>(props: HomeDataProps<R>) => {
  return (
    <section class="col-[2/3] row-[1/2]">
      <SectionTitle>
        Información de residencia
        <Icon />
      </SectionTitle>
      <article class="py-3 items-center gap-4">
        <div
          class={`${
            (props as HomeDataProps<true>).readOnly
              ? "flex flex-wrap"
              : "grid grid-cols-2 *:m-auto"
          } gap-x-4 gap-y-1 justify-between gray-container-100 !p-3`}
        >
          <HomeData
            readOnly={(props as HomeDataProps<true>).readOnly}
            data={(props as HomeDataProps<true>).data}
          />
        </div>
      </article>
    </section>
  );
};
export default Home;
