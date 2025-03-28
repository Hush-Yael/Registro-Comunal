import { JSX } from "solid-js";
import { ComunalRecord } from "../../types/form";
import { Form } from "../../pages/form";

export type DataProps<R extends true | undefined> = {
  class?: string;
  label: JSX.Element;
  labelClass?: string;
  readOnly?: R;
  children: R extends true
    ? JSX.Element | ComunalRecord["jefe"]
    : (typeof Form)["Field"];
};

const wC = "flex flex-col";

const Data = <R extends true | undefined>(props: DataProps<R>) => {
  const c = (
    <>
      <small class={`fore ${props.labelClass || ""}`}>{props.label}</small>
      {props.children}
    </>
  );

  return !props.readOnly ? (
    <div class={`${wC} ${props.class || ""}`}>{c}</div>
  ) : (
    <p class={`${wC} ${props.class || ""}`}>{c}</p>
  );
};

export default Data;
