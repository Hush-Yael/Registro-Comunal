import Data from "../../cedula/data";
import HomeData from "../../data/home-data";
import { cedula } from "../../../lib/data";
import { DBSearch } from "../../../types/db";
import { Closer } from "../../dialog/modal";
import { A } from "@solidjs/router";
import { PersonFilled } from "../../../icons";

const Home = (props: { data: DBSearch["homes"] }) => (
  <div class="flex flex-col gap-2 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 *:last:col-span-2 shadow">
    <div class="grid grid-cols-2 px-2.5">
      <Data
        labelClass="flex items-center gap-1.5"
        label={
          <>
            <PersonFilled />
            Dueño/a
          </>
        }
        class="gap-1"
      >
        {props.data.nombres} {props.data.apellidos}
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
    </div>
    <HomeData readOnly data={props.data} />
  </div>
);
export default Home;
