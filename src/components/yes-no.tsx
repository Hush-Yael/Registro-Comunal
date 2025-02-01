import Fields, { FieldsProps } from "./fields";
import {
  CancelRound,
  CancelRoundFilled,
  Check,
  CheckOutlined,
  Question,
  QuestionFilled,
} from "../icons";
import { Show } from "solid-js";

export type YesNoProps = Omit<FieldsProps, "children"> & {
  name: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
};

const labelClass =
    "flex items-center justify-between gap-2.5 input !pr-2 !rounded-xl !px-3 ",
  inputClass = "absolute pointer-events-none appearance-none";

const YesNo = (props: YesNoProps) => {
  return (
    <Fields {...props}>
      <div class="flex gap-1 *:flex-1 p-1">
        <label
          data-checked={props.value === false}
          class={`${labelClass} data-[checked=true]:!border-red-400`}
          for={props.name + "-no"}
        >
          <input
            class={inputClass}
            type="radio"
            name={"yesNo " + props.name}
            id={props.name + "-no"}
            checked={props.value === false}
            onChange={() => props.onChange(false)}
          />
          <span>No</span>
          <Show
            when={props.value === false}
            fallback={<CancelRound class="fore" />}
          >
            <CancelRoundFilled class="!fill-red-500" />
          </Show>
        </label>

        <label
          data-checked={props.value === null}
          class={`group ${labelClass} !flex-[2] data-[checked=true]:!border-orange-300`}
          for={props.name + "-unknown"}
        >
          <span>Desconocido</span>
          <input
            class={inputClass}
            type="radio"
            id={props.name + "-unknown"}
            checked={props.value === null}
            onChange={() => props.onChange(null)}
          />
          <Show
            when={props.value === null}
            fallback={<Question class="fore" />}
          >
            <QuestionFilled class="!fill-orange-400" />
          </Show>
        </label>

        <label
          data-checked={props.value === true}
          class={`${labelClass} data-[checked=true]:!border-green-600`}
          for={props.name + "-yes"}
        >
          <input
            class={inputClass}
            type="radio"
            name={"yesNo " + props.name}
            id={props.name + "-yes"}
            checked={props.value === true}
            onChange={() => props.onChange(true)}
          />
          <span>Sí</span>
          <Show
            when={props.value === true}
            fallback={<CheckOutlined class="fore" />}
          >
            <Check class="scale-135 **:fill-green-600" />
          </Show>
        </label>
      </div>
    </Fields>
  );
};
export default YesNo;
