import { Bandera } from "./bandera";
import Left from "./left";
import Right from "./right";
import { DBComunalRecord } from "../../types/db";

export type CedulaProps<
  R extends true | undefined,
  F extends number | undefined = undefined
> = {
  class?: string;
  link?: boolean;
  familiar?: F;
} & (R extends true
  ? { readOnly: R } & (F extends undefined
      ? { data: DBComunalRecord<"jefe"> }
      : { data: DBComunalRecord<"family">[number] })
  : {});

const Cedula = <R extends true | undefined, F extends number | undefined>(
  props: CedulaProps<R, F>
) => {
  return (
    <div
      class={`flex flex-col justify-center gap-3 gray-container-100 max-w-[450px] ${
        props.class || ""
      }`}
    >
      <Bandera />
      <div class={`grid grid-cols-[1fr_.75fr] gap-x-4 px-2 pb-1`}>
        <Left
          readOnly={(props as CedulaProps<true>).readOnly}
          data={(props as CedulaProps<true>).data}
          familiar={props.familiar}
        />
        <Right
          readOnly={(props as CedulaProps<true>).readOnly}
          link={props.link}
          data={(props as CedulaProps<true>).data}
          // @ts-ignore
          familiar={(props as CedulaProps<undefined>).familiar}
        />
      </div>
    </div>
  );
};
export default Cedula;
