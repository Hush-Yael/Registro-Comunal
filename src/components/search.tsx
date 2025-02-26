import { createSignal, Show } from "solid-js";
import { Search as SearchIcon } from "../icons/header";
import Loader from "./loader";
import { TextField, TextFieldRootProps } from "@kobalte/core/text-field";
import { NumberField, NumberFieldRootProps } from "@kobalte/core/number-field";
import NumberBtns from "./form/number-btns";
import { onlyLetters, onlyDashNumbers } from "../lib/data";
import { parseStringDiacrits } from "../lib/utils";

type SearchProps<IT extends "text" | "number"> = {
  type: IT;
  class?: string;
  inputClass?: string;
  onChange: IT extends "text"
    ? (value: string) => void | Promise<unknown>
    : (value: number) => void | Promise<unknown>;
  debounce?: number;
  onBeforeInput?: (e: InputEvent) => void;
  placeholder?: string;
  onlyLetters?: boolean;
  onlyDashNumbers?: boolean;
} & (IT extends "text" ? TextFieldRootProps : NumberFieldRootProps);

const Search = <IT extends "text" | "number">(props: SearchProps<IT>) => {
  let timeout: number;
  const [searching, setSearching] = createSignal(false);

  const change = (v: string | number) => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      setSearching(true);
      await props.onChange(
        // @ts-ignore
        typeof v === "string" ? parseStringDiacrits(v.trim()) : v || ""
      );
      setSearching(false);
    }, props.debounce);
  };

  return (
    <div class={`flex items-center flex-1 ${props.class || ""}`}>
      <SearchIcon class="mx-3" />
      <Show
        when={props.type === "number"}
        fallback={
          <TextField
            class="w-full"
            defaultValue={props.defaultValue as string}
            onChange={change}
          >
            <TextField.Input
              class={`w-full p-1 ${props.inputClass || ""}`}
              placeholder={props.placeholder}
              onBeforeInput={
                props.onlyLetters || props.onlyDashNumbers
                  ? (e) => {
                      if (e.data) {
                        if (props.onlyLetters && onlyLetters(e.data))
                          e.preventDefault();
                        else if (
                          props.onlyDashNumbers &&
                          onlyDashNumbers(
                            e.data,
                            (e.target as HTMLInputElement).value
                          )
                        )
                          e.preventDefault();
                      }
                    }
                  : props.onBeforeInput
              }
            />
          </TextField>
        }
      >
        <NumberField
          class="w-full"
          defaultValue={props.defaultValue}
          onRawValueChange={change}
        >
          <div class="grid grid-cols-[1fr_auto]">
            <NumberField.Input
              class={`w-full p-1 ${props.inputClass || ""}`}
              placeholder={props.placeholder}
            />
            <NumberBtns />
          </div>
        </NumberField>
      </Show>
      <Loader active={searching()} s={20} dt={0.2} />
    </div>
  );
};
export default Search;
