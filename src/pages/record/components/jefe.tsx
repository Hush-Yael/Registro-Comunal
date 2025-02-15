import Email from "../../../components/email";
import SectionTitle from "../../../components/section-title";
import Tel from "../../../components/tel";
import { Person } from "../../../icons";
import { ComunalRecord } from "../../../types/form";
import Cedula from "./cedula";
import Data from "./data";

const Jefe = (props: { data: ComunalRecord["jefe"] }) => {
  return (
    <section>
      <SectionTitle>
        Datos personales
        <Person class="!h-[1.125em]" />
      </SectionTitle>
      <article class="flex flex-col gap-2 py-3">
        <Cedula data={props.data} />
        <div class="flex flex-col gap-2 !px-3 gray-container-100">
          <p class="flex-1 p-1 text-center bg-neutral-200 dark:bg-neutral-900 rounded-xl">
            Información de contacto
          </p>
          <div class="flex flex-wrap gap-2 justify-between">
            <Data label="teléfono">
              <Tel data={props.data.tel} />
            </Data>
            <Data label="correo">
              <Email data={props.data.email} />
            </Data>
          </div>
        </div>
      </article>
    </section>
  );
};
export default Jefe;
