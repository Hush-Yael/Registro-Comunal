import { Show } from "solid-js";
import { yearsSinceDate } from "../lib/utils";
import Dash from "./dash";

type AgeProps = {
  date: string | undefined;
};

const Age = (props: AgeProps) => (
  <span class="flex gap-1">
    {props.date || <i class="fore">Desconocida</i>}
    <Show when={props.date}>
      <Dash />
      {yearsSinceDate(props.date as string)} años
    </Show>
  </span>
);

export default Age;
