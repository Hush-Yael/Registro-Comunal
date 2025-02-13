import { Show } from "solid-js";
import { yearsSinceDate } from "../lib/utils";

type AgeProps = {
  date: string | undefined;
};

const Age = (props: AgeProps) => {
  return (
    <span class="flex gap-1">
      {props.date || <i class="fore">Desconocida</i>}
      <Show when={props.date}>
        <span class="text-neutral-300 dark:text-neutral-600">—</span>
        {yearsSinceDate(props.date as string)} años
      </Show>
    </span>
  );
};
export default Age;
