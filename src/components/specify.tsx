import { JSX, Show } from "solid-js";
import YesNo, { YesNoProps } from "./yes-no";
import Fields from "./fields";

type SpecifyProps = YesNoProps & {
  specify: JSX.Element;
};

const Specify = (props: SpecifyProps) => (
  <Fields legend={props.legend}>
    <YesNo
      {...props}
      legend={null}
      wrapperClass="!border-0 !p-0 !bg-[transparent]"
    />
    <Show when={props.value === true}>
      <div class="flex flex-col gap-2.5 mt-1">{props.specify}</div>
    </Show>
  </Fields>
);
export default Specify;
