import { createResource, Show, Suspense } from "solid-js";
import { getRecord } from "../../lib/db";
import { Navigate, useParams } from "@solidjs/router";
import Jefe from "./components/jefe";
import { ComunalRecord } from "../../types/form";
import Home from "./components/home";
import Family from "./components/family";
import Programs from "./components/programs";

const Record = () => {
  const { cedula } = useParams();

  const [data] = createResource(async () => {
    const data = await getRecord(parseInt(cedula));

    const empty = Object.values(data).every((_) => _ === undefined);
    if (empty) return null;

    return data;
  });

  return (
    <main class="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Show when={!data() === null}>
          <Navigate href="/" />
        </Show>
        <Show when={data()}>
          <div class="flex flex-col gap-5 *:max-w-[450px] *:w-full *:m-auto">
            <Jefe data={(data() as ComunalRecord).jefe} />
            <Home data={(data() as ComunalRecord).home} />
            <Family data={(data() as ComunalRecord).family} />
            <Programs
              data={{
                carnet: (data() as ComunalRecord).carnet,
                clap: (data() as ComunalRecord).clap,
                gas: (data() as ComunalRecord).gas,
              }}
            />
          </div>
        </Show>
      </Suspense>
    </main>
  );
};
export default Record;
