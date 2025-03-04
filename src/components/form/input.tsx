import { TextField } from "@kobalte/core/text-field";
import { ValidationError } from "@tanstack/solid-form";
import { JSX } from "solid-js";
import { onlyDashNumbers, onlyLetters } from "../../lib/data";

export type InputProps = Omit<
  JSX.IntrinsicElements["input"],
  "onChange" | "onBeforeInput" | "onBlur"
> & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onBeforeInput?: (
    e: InputEvent,
    data: string | null,
    target: HTMLInputElement
  ) => void;
  label?: JSX.Element;
  inputClass?: string;
  variant?: "input-solid" | "input-dash";
  prefix?: JSX.Element;
  description?: JSX.Element;
  onlyLetters?: boolean;
  onlyDashNumbers?: boolean;
  error?: ValidationError | string;
};

export const errorText = "text-red-500 dark:text-red-400";

const Input = (props: InputProps) => {
  let befValue = props.value;

  return (
    <TextField
      class={`${props.class || ""}`}
      validationState={props.error ? "invalid" : "valid"}
    >
      {props.label && (
        <TextField.Label class="ml-1">{props.label}</TextField.Label>
      )}
      <TextField.Input
        class={`${
          !props.variant ? "input-solid" : props.variant
        } data-invalid:!border-red-500 ${props.error ? errorText : ""} ${
          props.inputClass || ""
        }`}
        onBeforeInput={
          props.onBeforeInput || props.onlyLetters || props.onlyDashNumbers
            ? (e) => {
                const data = e.data,
                  target = e.target;
                if (props.onBeforeInput)
                  return props.onBeforeInput(e, data, target);

                if (data) {
                  if (props.onlyLetters && onlyLetters(data))
                    e.preventDefault();
                  else if (
                    props.onlyDashNumbers &&
                    onlyDashNumbers(data, target.value)
                  )
                    e.preventDefault();
                }
              }
            : undefined
        }
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onFocus={(e) => (befValue = e.target.value)}
        onBlur={(e) => {
          const v = e.target.value.trim().replace(/\s{2,}/, " ");
          if (v === befValue) return;
          props.onChange(v);
          props.onBlur && props.onBlur!();
        }}
        minLength={props.minLength}
        maxLength={props.maxLength}
      />
      {props.description && (
        <TextField.Description class="fore px-2">
          {props.description}
        </TextField.Description>
      )}
      {props.error && (
        <TextField.ErrorMessage class={errorText}>
          {props.error}
        </TextField.ErrorMessage>
      )}
    </TextField>
  );
};
export default Input;
