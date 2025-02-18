import SectionTitle from "../../../components/section-title";
import { parseDir } from "../../../lib/data";
import { ComunalRecord } from "../../../types/form";
import { Home as HomeIcon } from "../../../icons/aside";
import Data from "./data";

export const HomeData = (props: { data: ComunalRecord["home"] }) => (
  <>
    <Data label="Número de casa">{props.data.numCasa || "Desconocido"}</Data>
    <Data class="text-right" label="Dirección">
      <span class="first-letter:uppercase">
        {parseDir(props.data.calle, props.data.avenida)}
      </span>
    </Data>
    <Data label="Referencias">
      {props.data.referencia || <i class="fore">Sin referencias</i>}
    </Data>
  </>
);

const Home = (props: { data: ComunalRecord["home"] }) => {
  return (
    <section class="col-[2/3] row-[1/2]">
      <SectionTitle>
        Información de residencia
        <HomeIcon />
      </SectionTitle>
      <article class="py-3 items-center gap-4">
        <div class="flex flex-wrap gap-x-4 gap-y-1 justify-between gray-container-100 !p-3">
          <HomeData data={props.data} />
        </div>
      </article>
    </section>
  );
};
export default Home;
