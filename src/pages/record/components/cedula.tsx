import { Match, Show, Switch } from "solid-js";
import { Sex } from "../../../constants";
import { Female, Male, Person as PersonIcon } from "../../../icons";
import { parseWithSex } from "../../../lib/utils";
import { cedula } from "../../../lib/data";
import Data from "./data";
import { JefeData } from "../../../types/form";
import Age from "../../../components/edad";
import { A } from "@solidjs/router";
import { Closer } from "../../../components/modal";

type CedulaProps = {
  class?: string;
  data: JefeData;
  link?: boolean;
};

export const Bandera = () => (
  <figure class="*:h-2 w-[97%] m-auto">
    <div class="bg-[#FFCE00] rounded-t-2xl" />
    <div class="bg-[#203899]" />
    <div class="bg-[#D82B2B] rounded-b-2xl" />
  </figure>
);

const LeftData = (props: CedulaProps) => (
  <div class="flex flex-col gap-1">
    <Data label="nombres">
      <span class="">{props.data.nombres}</span>
    </Data>
    <Data label="apellidos">
      <span class="">{props.data.apellidos}</span>
    </Data>
    <Data label="fecha de nacimiento">
      <Age age={props.data.edad} date={props.data.fechaNacimiento} />
    </Data>
    <Data label="estado civil">
      <span>
        {props.data.edoCivil
          ? parseWithSex(props.data.sexo, props.data.edoCivil)
          : "Desconocido"}
      </span>
    </Data>
  </div>
);

type PhotoProps = {
  noText?: boolean;
  sexo: Sex | "";
  class?: string;
};

export const Photo = (props: PhotoProps) => (
  <Switch fallback={<PersonIcon class={props.class} />}>
    <Match when={props.sexo === "M"}>
      <Male class={`text-sky-800 dark:text-sky-500 ${props.class || ""}`} />
      {!props.noText && "Masculino"}
    </Match>
    <Match when={props.sexo === "F"}>
      <Female class={`text-pink-800 dark:text-pink-500 ${props.class || ""}`} />
      {!props.noText && "Femenino"}
    </Match>
  </Switch>
);

const RightData = (props: CedulaProps) => (
  <div class="flex flex-col h-full">
    <div class="flex flex-col">
      <Show
        when={!props.link}
        fallback={
          <Closer
            element={A}
            props={{
              class: "font-bold",
              href: `jefe/${props.data.cedula}`,
            }}
          >
            {cedula(props.data.cedula)}
          </Closer>
        }
      >
        <p class="font-bold">
          <span>{cedula(props.data.cedula)}</span>
        </p>
      </Show>
      <small class="text-center fore">
        {props.data.venezolano ? "Venezolano" : "Extranjero"}
      </small>
    </div>
    <span class="flex flex-col gap-1 justify-end h-full flex-1 items-center">
      <Photo sexo={props.data.sexo} class="!h-[5em]" />
    </span>
  </div>
);

const Cedula = (props: CedulaProps) => (
  <div
    class={`flex flex-col gap-3 gray-container-100 max-w-[450px] ${
      props.class || ""
    }`}
  >
    <Bandera />
    <div class="grid grid-cols-[1fr_auto] gap-x-4 px-2">
      <LeftData data={props.data} />
      <RightData link={props.link} data={props.data} />
    </div>
  </div>
);
export default Cedula;
