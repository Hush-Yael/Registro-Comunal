import { NumberField } from "@kobalte/core/number-field";
import { TextField } from "@kobalte/core/text-field";
import { JSX } from "solid-js";
import { CaretD, CaretU } from "../icons";

export type InputProps = JSX.IntrinsicElements["input"] & {
  onChange?: (value: string) => void;
  step?: number;
  label?: JSX.Element;
  prefix?: JSX.Element;
  description?: JSX.Element;
  error?: JSX.Element;
};

const Input = (props: InputProps) => {
  const number = props.type === "number";
  const Field = !number ? TextField : NumberField;
  const inputClass = `input font-bold ${
      !number
        ? "focus:outline-black dark:focus:outline-white"
        : "focus-within:outline-black dark:focus-within:outline-white"
    }`,
    btnClass =
      "relative h-full bg-[hsl(0,0%,87%)] dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600",
    caretClass = "absolute top-0 bottom-0 right-0 left-0 m-auto";

  return (
    <Field
      {...props}
      {...(number && {
        minValue: props.min as number | undefined,
        maxValue: props.max as number | undefined,
      })}
      value={props.value as string}
      class="flex flex-col gap-1"
      prefix={null}
      label={null}
      description={null}
      error={null}
    >
      <Field.Label class="ml-1">{props.label}</Field.Label>
      {!number ? (
        <Field.Input
          class={`${inputClass} ${props.class || ""}`}
          minLength={props.minLength}
          maxLength={props.maxLength}
        />
      ) : (
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
      )}
      {props.description && (
        <Field.Description class="fore px-2">
          {props.description}
        </Field.Description>
      )}
      {props.error && <Field.ErrorMessage>{props.error}</Field.ErrorMessage>}
    </Field>
  );
};
export default Input;
