import { Show } from "solid-js";
import { plural, yearsSinceDate } from "../../lib/utils";
import Dash from "./dash";

type AgeProps = {
  class?: string;
  fechaNacimiento: string | undefined;
  fechaDeceso: string | undefined;
  fallecido: 1 | 0 | undefined;
  edad?: number | null;
};

const Age = (props: AgeProps) => {
  const edad =
    props.edad ||
    (props.fechaNacimiento &&
      yearsSinceDate({ dateString: props.fechaNacimiento! as string }));

  return (
    <p class={`flex gap-1 ${props.class || ""}`}>
      {props.fechaNacimiento || <i class="fore">Desconocida</i>}
      <Show
        when={
          props.fechaNacimiento &&
          (!props.fallecido || (props.fallecido && props.fechaDeceso))
        }
      >
        <Dash />
        {props.fallecido ? (
          <>
            Vivió{" "}
            {yearsSinceDate({
              dateString: props.fechaNacimiento! as string,
              showYears: true,
              from: props.fallecido ? new Date(props.fechaDeceso!) : new Date(),
            })}
          </>
        ) : (
          <>
            {edad} {plural("año", edad as number)}
          </>
        )}
      </Show>
    </p>
  );
};

export default Age;
