import { A } from "@solidjs/router";
import { PersonFilled } from "../../../icons";
import { DBSearch } from "../../../types/db";
import Data from "../../cedula/data";
import { Closer } from "../../dialog/modal";
import { cedula } from "../../../lib/data";
import { Show } from "solid-js";
import HomeData from "../../data/home-data";
import BusinessData from "../../data/business-data";

type SearchBuildingProps<K extends "homes" | "businesses"> = {
  data: DBSearch[K];
  tableName: K;
};

const SearchedBuilding = <K extends "homes" | "businesses">(
  props: SearchBuildingProps<K>
) => {
  return (
    <div class="flex flex-col gap-2 p-1.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 *:last:col-span-2 shadow">
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
      <Show
        when={props.tableName === "homes"}
        fallback={
          /* @ts-expect-error */
          <BusinessData readOnly data={props.data as DBSearch["businesses"]} />
        }
      >
        <HomeData readOnly data={props.data as DBSearch["homes"]} />
      </Show>
    </div>
  );
};
export default SearchedBuilding;
