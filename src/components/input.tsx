import { TextField } from "@kobalte/core/text-field";
import { ValidationError } from "@tanstack/solid-form";
import { JSX } from "solid-js";

export type InputProps = Omit<JSX.IntrinsicElements["input"], "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  label?: JSX.Element;
  inputClass?: string;
  variant?: "input-solid" | "input-dash";
  prefix?: JSX.Element;
  description?: JSX.Element;
  onlyLetters?: boolean;
  error?: ValidationError | string;
};

export const errorText = "text-red-500 dark:text-red-400";

const Input = (props: InputProps) => {
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
          props.onBeforeInput || props.onlyLetters
            ? (e: InputEvent) => {
                const data = e.data;
                if (data && !/[A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(data))
                  e.preventDefault();
              }
            : undefined
        }
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onBlur={(e) => {
          props.onChange(e.target.value.trim().replace(/\s{2,}/, " "));
          // @ts-ignore
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
