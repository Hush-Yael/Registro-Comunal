import { JSX } from "solid-js";

export type FieldsProps = {
  class?: string;
  div?: boolean;
  legend?: JSX.Element;
  legendClass?: string;
  wrapperClass?: string;
  children: JSX.Element;
};

const Fields = (props: FieldsProps) => {
  const legendClass = "mb-1 px-2";
  const children = (
    <>
      {props.legend && (
        <legend class={`${legendClass} ${props.legendClass || ""}`}>
          {props.legend}
        </legend>
      )}
      <div class={`input !rounded-xl ${props.wrapperClass || ""}`}>
        {props.children}
      </div>
    </>
  );

  return props.div ? (
    <div class={props.class}>{children}</div>
  ) : (
    <fieldset class={props.class}>{children}</fieldset>
  );
};
export default Fields;
