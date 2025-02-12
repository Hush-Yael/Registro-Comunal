import { Show } from "solid-js";
import { Hour } from "../../../icons/header";
import { getHistory } from "../../../lib/db";

const History = () => {
  const history = getHistory();

  return (
    <div class="relative div-y-neutral h-full max-h-full overflow-auto *:p-3">
      <h2 class="flex items-center gap-2">
        <Hour class="!h-[1.5em]" />
        Búsquedas recientes
      </h2>
      <Show
        when={history.length}
        fallback={
          <p class="fore text-lg text-center">No hay búsquedas recientes</p>
        }
      >
        <ul class="div-y-neutral !py-0"></ul>
      </Show>
    </div>
  );
};
export default History;
