import {
  createEffect,
  createResource,
  createSignal,
  Show,
  Suspense,
} from "solid-js";
import { getRecord } from "../../lib/db";
import { useParams } from "@solidjs/router";
import { ComunalRecord } from "../../types/form";
import Jefe from "../../components/data/jefe";
import Home from "../../components/data/home";
import Family from "../../components/data/family";
import Programs from "../../components/data/programs";
import Loader from "../../components/loader";
import NotFound from "./components/not-found";
import Btn from "../../components/btn";

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
            <header class="flex items-center gap-3">
              <Btn variant="primary">Modificar</Btn>
              <Btn variant="primary-danger" class="">
                Eliminar
              </Btn>
            </header>
            <div class="flex flex-col gap-5 max-w-[1000px] w-full m-auto *:max-w-[450px] *:w-full max-[800px]:*:m-auto min-[800px]:grid min-[1000px]:gap-x-10 grid-cols-2 grid-rows-[auto_auto-1fr]">
              <Jefe readOnly data={(data() as ComunalRecord).jefe} />
              <Home readOnly data={(data() as ComunalRecord).home} />
              <Family readOnly data={(data() as ComunalRecord).family} />
              <Programs
                readOnly
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
