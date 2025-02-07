import Modal, { CloseBtn } from "../modal";
import { Dialog } from "@kobalte/core/dialog";
import { Search as SearchIcon } from "../../icons/header";
import { createSignal } from "solid-js";

const Search = () => {
  const [query, setQuery] = createSignal("");

  return (
    <Modal
      trigger={
        <Dialog.Trigger aria-label="buscar">
          <SearchIcon class="!h-[24px]" />
        </Dialog.Trigger>
      }
      alert
      class="!w-[90vw] h-[90%] !p-0"
      contentClass="!p-0"
    >
      <div class="flex items-center gap-3 border-b-1 div-border">
        <label class="flex items-center flex-1 py-2 " for="search">
          <SearchIcon class="mx-3" />
          <input
            id="search"
            class="w-full focus:outline-0"
            placeholder="Buscar en los registros..."
            value={query()}
            onChange={(e) => setQuery(e.target.value.trim())}
            autocomplete="off"
          />
        </label>
        <CloseBtn class="mr-3" />
      </div>
    </Modal>
  );
};
export default Search;
