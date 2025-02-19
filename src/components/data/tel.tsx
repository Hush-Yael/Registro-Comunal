import { tel } from "../../lib/data";
import { ComunalRecord } from "../../types/form";

type TelProps = {
  data: ComunalRecord["jefe"]["tel"];
};

const Tel = (props: TelProps) => {
  return props.data ? (
    <a class="link" href={`tel:+58${props.data.replace(/[0]/, "")}`}>
      {tel(props.data)}
    </a>
  ) : (
    <i class="fore">Desconocido</i>
  );
};
export default Tel;
