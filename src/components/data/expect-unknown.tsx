import { JSX } from "solid-js";
import Data, { DataProps } from "../cedula/data";

type Props = DataProps<true> & { data: unknown; unknownMsg?: JSX.Element };

const ExpectUnknown = (props: Props) => {
  return (
    <Data {...props} readOnly>
      {props.data ? (
        props.children
      ) : (
        <i class="fore">{props.unknownMsg || "Desconocido"}</i>
      )}
    </Data>
  );
};
export default ExpectUnknown;
