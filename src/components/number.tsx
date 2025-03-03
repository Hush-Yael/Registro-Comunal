import { NumberField } from "@kobalte/core/number-field";
import { JSX, Show } from "solid-js";
import { errorText } from "./input";
import { ValidationError } from "@tanstack/solid-form";
import NumberBtns from "./form/number-btns";

export type NumberProps = Omit<
  JSX.IntrinsicElements["input"],
  "prefix" | "onChange" | "onBlur"
> & {
  variant?: "input-solid" | "input-dash";
  inputClass?: string;
  wrapperClass?: string;
  value: number;
  onBlur?: () => void;
  onChange: (value: number) => void;
  step?: number;
  label?: JSX.Element;
  prefix?: JSX.Element;
  error?: ValidationError | string;
  hideError?: boolean;
};

const getValue = (e: Event) => {
  const v: string | number = (e.target as HTMLInputElement)!.value
    .trim()
    .replace(/,|\./g, "");
  return v ? window.Number(v) : NaN;
};

const Number = (props: NumberProps) => {
  let befValue: number = props.value,
    btnTouched = false;

  const btnF = () => (btnTouched = true);

  return (
    <NumberField
      class={`${props.class || ""}`}
      step={props.step}
      rawValue={props.value}
      minValue={props.min as number | undefined}
      maxValue={props.max as number | undefined}
      validationState={props.error ? "invalid" : "valid"}
      disabled={props.disabled}
    >
      {props.label && (
        <NumberField.Label class="ml-1">{props.label}</NumberField.Label>
      )}
      <div
        class={`${
          !props.variant ? "input-solid" : props.variant
        } flex gap-1 pr-1 ${
          props.error ? `!border-red-500 dark:!border-red-400 ${errorText}` : ""
        } ${props.wrapperClass || ""}`}
      >
        {props.prefix}
        <NumberField.Input
          class={`w-full focus:outline-none ${props.inputClass || ""}`}
          onFocus={(e) => (befValue = getValue(e))}
          onBlur={(e) => {
            const v = getValue(e);

            if (
              !btnTouched &&
              ((isNaN(v) && isNaN(befValue)) || befValue === v)
            )
              return;

            btnTouched = false;
            props.onChange(v);
            props.onBlur && props.onBlur();
          }}
          minLength={props.minLength}
          maxLength={props.maxLength}
        />
        <NumberBtns onFucus={btnF} variant={props.variant} />
      </div>
      <Show when={!props.hideError}>
        <NumberField.ErrorMessage class={errorText}>
          {props.error}
        </NumberField.ErrorMessage>
      </Show>
    </NumberField>
  );
};
export default Number;
