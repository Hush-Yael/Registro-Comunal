import { Bandera } from "./bandera";
import Left from "./left";
import Right from "./right";
import { CedulaContextProvider } from "../../contexts/cedula";
import { ComunalRecord } from "../../types/form";

export type CedulaProps<
  R extends true | undefined,
  F extends number | undefined = undefined
> = {
  class?: string;
  link?: boolean;
  familiar?: F;
} & (R extends true
  ? { readOnly: R } & {
      data: F extends undefined
        ? ComunalRecord["jefe"]
        : ComunalRecord["family"][number];
    }
  : {});

const Cedula = <R extends true | undefined, F extends number | undefined>(
  props: CedulaProps<R, F>
) => {
  return (
    <CedulaContextProvider
      value={{
        familiar: props.familiar,
        readOnly: (props as CedulaProps<true>).readOnly,
        data: (props as CedulaProps<true> & CedulaProps<true, number>).data,
        cedulaAsLink: props.link,
      }}
    >
      <div
        class={`flex flex-col justify-center gap-3 gray-container-100 max-w-[450px] ${
          props.class || ""
        }`}
        id={
          (props as CedulaProps<true>).readOnly && props.familiar
            ? `fam-${(props as CedulaProps<true>).data.cedula}`
            : undefined
        }
      >
        <Bandera />
        <div class={`grid grid-cols-[1fr_.75fr] gap-x-4 px-2 pb-1`}>
          <Left />
          <Right />
        </div>
      </div>
    </CedulaContextProvider>
  );
};
export default Cedula;
