import { createSignal, JSX } from "solid-js";
import { Search as SearchIcon } from "../icons/header";
import Loader from "./loader";

type SearchProps = Omit<JSX.IntrinsicElements["input"], "onInput"> & {
  onInput: (value: string) => void;
  labelClass?: string;
  debounce?: number;
};

const Search = (props: SearchProps) => {
  let timeout: number;
  const [searching, setSearching] = createSignal(false);

  return (
    <label
      class={`flex items-center flex-1 p-2 input-solid ${
        props.labelClass || ""
      }`}
      for={props.id}
    >
      <SearchIcon class="mx-3" />
      <input
        {...props}
        class={`${props.class || ""}`}
        onInput={(e) => {
          clearTimeout(timeout);
          const value = e.target.value.trim();

          timeout = setTimeout(async () => {
            setSearching(true);
            await props.onInput(value);
            setSearching(false);
          }, props.debounce);
        }}
      />
      <Loader active={searching()} s={20} dt={0.2} />
    </label>
  );
};
export default Search;
