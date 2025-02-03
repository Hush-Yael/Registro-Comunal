import { TextField } from "@kobalte/core/text-field";
import { JSX } from "solid-js";

export type InputProps = JSX.IntrinsicElements["input"] & {
  value: string;
  onChange: (value: string) => void;
  label?: JSX.Element;
  prefix?: JSX.Element;
  description?: JSX.Element;
  error?: JSX.Element;
};

export const inputContainerClass = "flex flex-col gap-1";
export const inputClass =
  "input font-bold focus:outline-black dark:focus:outline-white";

const Input = (props: InputProps) => {
  return (
    <TextField
      class={`${inputContainerClass} ${props.class || ""}`}
      value={props.value}
      onChange={props.onChange}
    >
      {props.label && (
        <TextField.Label class="ml-1">{props.label}</TextField.Label>
      )}
      <TextField.Input
        class={`${inputClass} ${props.class || ""}`}
        minLength={props.minLength}
        maxLength={props.maxLength}
      />
      {props.description && (
        <TextField.Description class="fore px-2">
          {props.description}
        </TextField.Description>
      )}
      {props.error && (
        <TextField.ErrorMessage>{props.error}</TextField.ErrorMessage>
      )}
    </TextField>
  );
};
export default Input;
