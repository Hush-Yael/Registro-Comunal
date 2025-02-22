import { Match, Switch } from "solid-js";
import { Sex } from "../../constants";
import { Male, Female, Person } from "../../icons";

type PhotoProps = {
  noText?: boolean;
  sexo: Sex | "";
  class?: string;
};

export const Photo = (props: PhotoProps) => (
  <Switch fallback={<Person class={props.class} />}>
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
