import Cedula from "../cedula";
import SectionTitle from "../section-title";
import { Person } from "../../icons";
import { ComunalRecord } from "../../types/form";
import Contact from "./contact";

type JefeProps<R extends true | undefined> = R extends true
  ? {
      readOnly: true;
      data: ComunalRecord["jefe"] | ComunalRecord["family"][number];
    }
  : {};

const Jefe = <R extends true | undefined>(props: JefeProps<R>) => {
  return (
    <section class="col-[1/2] row-[1/3]">
      <SectionTitle>
        Datos personales
        <Person class="!h-[1.125em]" />
      </SectionTitle>
      <div class="flex flex-col gap-2 py-3  *:max-w-[unset]">
        <Cedula
          readOnly={(props as JefeProps<true>).readOnly}
          data={(props as JefeProps<true>).data}
        />
        <Contact
          readOnly={(props as JefeProps<true>).readOnly}
          data={{
            tel: ((props as JefeProps<true>).data as ComunalRecord["jefe"]).tel,
            email: ((props as JefeProps<true>).data as ComunalRecord["jefe"])
              .email,
          }}
        />
      </div>
    </section>
  );
};

export default Jefe;
