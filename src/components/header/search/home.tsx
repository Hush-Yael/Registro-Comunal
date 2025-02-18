import Data from "../../../pages/record/components/data";
import { HomeData } from "../../../pages/record/components/home";
import { cedula } from "../../../lib/data";
import { DBSearch } from "../../../types/db";
import { Closer } from "../../modal";
import { A } from "@solidjs/router";

const Home = (props: { data: DBSearch["home"] }) => {
  return (
    <div class="grid grid-cols-2 gap-1 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 *:last:col-span-2 shadow">
      <Data label="Jefe/a">
        <span class="text-yellow-700 dark:text-amber-200">
          {props.data.nombres} {props.data.apellidos}
        </span>
      </Data>
      <Data class="text-right" label="Cédula">
        <Closer
          element={A}
          props={{
            class: "link",
            href: `jefe/${props.data.cedula}`,
          }}
        >
          {cedula(props.data.cedula as number)}
        </Closer>
      </Data>
      <HomeData data={props.data} />
    </div>
  );
};
export default Home;
