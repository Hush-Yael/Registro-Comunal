import { Match, Show, Switch } from "solid-js";
import { personData } from "../../../constants";
import { Female, Male, Person as PersonIcon } from "../../../icons";
import { parseWithSex, yearsSinceDate } from "../../../lib/utils";
import { cedula } from "../../../lib/data";
import Data from "./data";
import { ComunalRecord } from "../../../types/form";

type PersonProps = {
  data: ReturnType<typeof personData> & {
    edoCivil: ComunalRecord["jefe"]["edoCivil"];
  };
};

const Person = (props: PersonProps) => {
  return (
    <div class="flex flex-col gap-3 gray-container-100 max-w-[450px]">
      <figure class="*:h-2 w-[97%] m-auto">
        <div class="bg-[#FFCE00] rounded-t-2xl" />
        <div class="bg-[#203899]" />
        <div class="bg-[#D82B2B] rounded-b-2xl" />
      </figure>
      <div class="grid grid-cols-[1fr_auto] gap-x-4 px-2">
        <div class="flex flex-col gap-1">
          <Data label="nombres">
            <span class="">{props.data.nombres}</span>
          </Data>
          <Data label="apellidos">
            <span class="">{props.data.apellidos}</span>
          </Data>
          <Data label="fecha de nacimiento">
            <span class="flex gap-1">
              {props.data.fechaNacimiento || "Desconocida"}
              <Show when={props.data.fechaNacimiento}>
                <span class="text-neutral-300 dark:text-neutral-600">—</span>
                {yearsSinceDate(props.data.fechaNacimiento)} años
              </Show>
            </span>
          </Data>
          <Data label="estado civil">
            <span>
              {props.data.edoCivil
                ? parseWithSex(props.data.sexo, props.data.edoCivil)
                : "Desconocido"}
            </span>
          </Data>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex flex-col">
            <p class="font-bold">
              <span class="tracking-[3px]">
                {props.data.venezolano ? "V" : "E"}-
              </span>
              <span>{cedula(props.data.cedula)}</span>
            </p>
            <small class="text-center fore">
              {props.data.venezolano ? "Venezolano" : "Extranjero"}
            </small>
          </div>
          <span class="flex flex-col gap-1 justify-end h-full flex-1 items-center *:min-h-[5em]">
            <Switch fallback={<PersonIcon />}>
              <Match when={props.data.sexo === "M"}>
                <Male class="text-sky-800 dark:text-sky-500" />
                Masculino
              </Match>
              <Match when={props.data.sexo === "F"}>
                <Female class="text-pink-800 dark:text-pink-500" />
                Femenino
              </Match>
            </Switch>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Person;
