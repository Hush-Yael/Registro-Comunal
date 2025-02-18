import {
  createEffect,
  createResource,
  createSignal,
  Show,
  Suspense,
} from "solid-js";
import { getRecord } from "../../lib/db";
import { useParams } from "@solidjs/router";
import Jefe from "./components/jefe";
import { ComunalRecord } from "../../types/form";
import Home from "./components/home";
import Family from "./components/family";
import Programs from "./components/programs";
import Loader from "../../components/loader";
import NotFound from "./components/not-found";

const Record = () => {
  const params = useParams();
  const [currCedula, setCurrCedula] = createSignal(params.cedula);
  const [empty, setEmpty] = createSignal(false);

  const [data, { refetch }] = createResource(params.cedula, async () => {
    const data = await getRecord(parseInt(params.cedula));
    setEmpty(
      !data.family.length &&
        Object.values({ ...data, family: undefined }).every(
          (_) => _ === undefined
        )
    );
    return data;
  });

  createEffect(() => {
    if (!data.error && !data.loading && currCedula() !== params.cedula) {
      refetch();
      setCurrCedula(params.cedula);
    }
  });

  return (
    <main class="relative p-4 flex-1">
      <Suspense
        fallback={
          <Loader wrapperClass="absolute inset-0 m-auto" active s={60}>
            Cargando...
          </Loader>
        }
      >
        <Show when={data()}>
          <Show when={empty()}>
            <NotFound cedula={params.cedula} />
          </Show>
          <Show when={!empty()}>
            <div class="flex flex-col gap-5 max-w-[1000px] w-full m-auto *:max-w-[450px] *:w-full max-[800px]:*:m-auto min-[800px]:grid min-[1000px]:gap-x-10 grid-cols-2 grid-rows-[auto_auto-1fr]">
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
        </Show>
      </Suspense>
    </main>
  );
};
export default Record;
