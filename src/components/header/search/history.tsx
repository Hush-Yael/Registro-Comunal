import { createResource, For, Show } from "solid-js";
import { Hour } from "../../../icons/header";
import Loader from "../../loader";
import { getHistory } from "../../../lib/db";

const History = () => {
  const [history] = createResource(async () => {
    return await getHistory();
  });

  return (
    <div class="relative div-y-neutral h-full max-h-full overflow-auto *:p-3">
      <h2 class="flex items-center gap-2">
        <Hour class="!h-[1.5em]" />
        Búsquedas recientes
      </h2>
      <Show
        when={history() !== undefined}
        fallback={<Loader class="!absolute inset-0 m-auto" s={50} active />}
      >
        <Show
          when={history()}
          fallback={
            <p class="fore text-lg text-center">No hay búsquedas recientes</p>
          }
        >
          <ul class="div-y-neutral !py-0"></ul>
        </Show>
      </Show>
    </div>
  );
};
export default History;
