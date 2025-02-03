import { NumberField } from "@kobalte/core/number-field";
import { CaretD, CaretU } from "../icons";
import { JSX } from "solid-js";
import { inputClass, inputContainerClass } from "./input";

export type NumberProps = Omit<JSX.IntrinsicElements["input"], "prefix"> & {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  label?: JSX.Element;
  prefix?: JSX.Element;
};

const btnClass =
    "relative h-full bg-[hsl(0,0%,87%)] dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600",
  caretClass = "absolute top-0 bottom-0 right-0 left-0 m-auto";

const Number = (props: NumberProps) => {
  return (
    <NumberField
      class={`${inputContainerClass} ${props.class || ""}`}
      step={props.step}
      rawValue={props.value}
      onRawValueChange={props.onChange}
      minValue={props.min as number | undefined}
      maxValue={props.max as number | undefined}
    >
      {props.label && (
        <NumberField.Label class="ml-1">{props.label}</NumberField.Label>
      )}
      <div class={`${inputClass} flex gap-1 pr-1`}>
        {props.prefix}
        <NumberField.Input
          class={`w-full focus:outline-none ${props.class || ""}`}
          type="text"
          minLength={props.minLength}
          maxLength={props.maxLength}
        />
        <div class="flex flex-col justify-center gap-0.5 w-[1.25rem]">
          <NumberField.IncrementTrigger class={`${btnClass} rounded-t`}>
            <CaretU class={caretClass} />
          </NumberField.IncrementTrigger>
          <NumberField.DecrementTrigger class={`${btnClass} rounded-b`}>
            <CaretD class={caretClass} />
          </NumberField.DecrementTrigger>
        </div>
      </div>
    </NumberField>
  );
};
export default Number;
