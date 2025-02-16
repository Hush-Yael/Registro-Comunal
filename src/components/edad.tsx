import { Show } from "solid-js";
import { plural } from "../lib/utils";
import Dash from "./dash";

type AgeProps = {
  date: string | undefined;
  age: number | null;
};

const Age = (props: AgeProps) => (
  <span class="flex gap-1">
    {props.date || <i class="fore">Desconocida</i>}
    <Show when={props.date}>
      <Dash />
      {props.age} {plural("año", props.age!)}
    </Show>
  </span>
);

export default Age;
