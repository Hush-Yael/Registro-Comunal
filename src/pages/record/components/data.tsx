import { JSX } from "solid-js";

type DataProps = { label: string; labelClass?: string; children: JSX.Element };

const Data = (props: DataProps) => (
  <p class="flex flex-col">
    <small class={`fore ${props.labelClass || ""}`}>{props.label}</small>
    {props.children}
  </p>
);

export default Data;
