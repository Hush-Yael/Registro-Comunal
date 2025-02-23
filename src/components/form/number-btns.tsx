import { NumberField } from "@kobalte/core/number-field";
import { InputProps } from "../input";
import { CaretD, CaretU } from "../../icons";

type NumberBtnsProps = Pick<InputProps, "variant"> & {
  onFucus?: () => void;
};

const btnClass =
    "relative h-full bg-[hsl(0,0%,87%)] dark:bg-neutral-700 not-disabled:hover:bg-neutral-300 dark:not-disabled:hover:bg-neutral-600 disabled:opacity-50 min-w-[1.25em]",
  caretClass = "absolute top-0 bottom-0 right-0 left-0 m-auto";

const NumberBtns = (props: NumberBtnsProps) => (
  <div
    class={`flex flex-col justify-center gap-0.5 w-[1.25rem]${
      props.variant === "input-dash" ? " min-h-7 !pb-1" : ""
    }`}
  >
    <NumberField.IncrementTrigger
      class={`${btnClass} rounded-t`}
      onFocus={props.onFucus}
    >
      <CaretU class={caretClass} />
    </NumberField.IncrementTrigger>
    <NumberField.DecrementTrigger
      class={`${btnClass} rounded-b`}
      onFocus={props.onFucus}
    >
      <CaretD class={caretClass} />
    </NumberField.DecrementTrigger>
  </div>
);
export default NumberBtns;
