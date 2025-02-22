import { plural } from "../lib/utils";
import Dash from "./dash";
import ExpectUnknown from "./data/expect-unknown";

type AgeProps = {
  date: string | undefined;
  age: number | null;
};

const Age = (props: AgeProps) => (
  <ExpectUnknown
    label="Fecha de nacimiento"
    data={props.date}
    class="flex gap-1"
    unknownMsg="Desconocida"
  >
    <span class="flex gap-1">
      {props.date}
      <Dash />
      {props.age} {plural("año", props.age!)}
    </span>
  </ExpectUnknown>
);

export default Age;
