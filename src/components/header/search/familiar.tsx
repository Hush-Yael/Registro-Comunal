import { A } from "@solidjs/router";
import { PARENTESCOS } from "../../../constants";
import { cedula } from "../../../lib/data";
import { parseWithSex } from "../../../lib/utils";
import { Photo } from "../../../components/cedula/photo";
import Hr from "../../layout/hr";
import { DBSearch } from "../../../types/db";
import { Closer } from "../../dialog/modal";

type FamiliarProps = {
  data: DBSearch["family"];
};

const VALID_PS = PARENTESCOS.filter((v) => v !== "otro");
const Familiar = (props: FamiliarProps) => (
  <div class="flex flex-col gap-2.5 p-3 rounded-lg">
    <div class="flex items-center gap-2">
      <Photo noText class="!h-7 min-w-max" sexo={props.data.sexo} />
      <p>
        {props.data.nombres} {props.data.apellidos}
      </p>
      {props.data.cedula && (
        <Closer
          element={A}
          props={{
            class: "ml-auto link min-w-max",
            href: `jefe/${props.data.jefeCedula}?familiar=${props.data.cedula}`,
          }}
        >
          {cedula(props.data.cedula)}
        </Closer>
      )}
    </div>
    <Hr class="dark:!border-[#555]" />
    <div class="flex items-center gap-2">
      <p class="first-letter:uppercase">
        {VALID_PS.includes(props.data.parentesco)
          ? parseWithSex(props.data.sexo, props.data.parentesco)
          : "Familiar"}{" "}
        de{" "}
        <span class="text-yellow-700 dark:text-amber-200 font-bold">
          {props.data.jefeNombres} {props.data.jefeApellidos}
        </span>
      </p>
      <Closer
        element={A}
        props={{
          class: "ml-auto link min-w-max",
          href: `jefe/${props.data.jefeCedula}`,
        }}
      >
        {cedula(props.data.jefeCedula)}
      </Closer>
    </div>
  </div>
);
export default Familiar;
