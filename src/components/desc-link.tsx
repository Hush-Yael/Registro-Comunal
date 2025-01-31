import { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { CaretR } from "../icons";

type Props = {
  href: string;
  linkChildren: JSX.Element;
  children: JSX.Element;
};

const DescLink = (props: Props) => {
  return (
    <div class="flex flex-col gap-1 p-1 rounded-xl border div-border">
      <A
        href={props.href}
        class="flex justify-between items-center gap-3 rounded-lg p-1 px-2.5 btn-primary"
      >
        {props.linkChildren}
        <CaretR />
      </A>
      <div class="px-1">{props.children}</div>
    </div>
  );
};
export default DescLink;
