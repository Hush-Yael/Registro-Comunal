import Modal, { CloseBtn } from "../modal";
import { Dialog } from "@kobalte/core/dialog";
import SearchInput from "../search";
import { Search as SearchIcon } from "../../icons/header";
import { createSignal } from "solid-js";

const Search = () => {
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
        <SearchInput
          id="search"
          class="w-full focus:outline-0"
          placeholder="Buscar en los registros..."
          autocomplete="off"
        />
        <CloseBtn class="mr-3" />
      </div>
    </Modal>
  );
};
export default Search;
