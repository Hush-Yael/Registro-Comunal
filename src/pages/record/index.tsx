import {
  createEffect,
  createResource,
  createSignal,
  onMount,
  Show,
} from "solid-js";
import { deleteRecord, getRecord } from "../../lib/db";
import { Navigate, useParams, useSearchParams } from "@solidjs/router";
import Jefe from "../../components/data/jefe";
import Homes from "../../components/data/homes";
import Family from "../../components/data/family";
import Programs from "../../components/data/programs";
import Loader from "../../components/loader";
import NotFound from "./components/not-found";
import Btn from "../../components/layout/btn";
import { Edit } from "../../icons/aside";
import { Trash } from "../../icons";
import Modal, { Trigger } from "../../components/dialog/modal";
import Alert from "../../components/layout/alert";
import { Form, setFormAction } from "../form";
import toast from "solid-toast";

const Record = () => {
  const params = useParams(),
    [searchParams] = useSearchParams();
  const [currCedula, setCurrCedula] = createSignal(params.cedula);
  const [empty, setEmpty] = createSignal(false);

  const [data, { refetch }] = createResource(params.cedula, async () => {
    const data = await getRecord(parseInt(params.cedula));

    setEmpty(
      Object.values({ ...data, family: undefined }).every((_) =>
        Array.isArray(_) ? !_.length : _ === undefined
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

  const [redir, setRedir] = createSignal("");

  const modi = () => {
    setFormAction("edit");
    setRedir(`/registro?modify=${data()!.jefe.cedula}`);
  };

  onMount(() => {
    if (searchParams.familiar)
      setTimeout(() => {
        const li = document.getElementById(`fam-${searchParams.familiar}`);
        if (li) li.scrollIntoView();
      }, 200);
  });

  return (
    <main class="flex flex-col flex-1 gap-4 p-4">
      {redir() && <Navigate href={redir()} />}
      <Show
        when={!data.loading}
        fallback={
          <Loader wrapperClass="absolute inset-0 m-auto" active s={60}>
            Cargando...
          </Loader>
        }
      >
        <Show when={!empty()} fallback={<NotFound cedula={params.cedula} />}>
          <header class="grid grid-cols-2 items-center gap-3 w-max ml-auto">
            <Show
              when={Form.state.isDirty}
              fallback={
                <Btn
                  variant="primary"
                  onclick={modi}
                  aria-label="Modificar registro"
                >
                  <Edit />
                </Btn>
              }
            >
              <Modal
                trigger={
                  <Trigger variant="primary" aria-label="Modificar registro">
                    <Edit />
                  </Trigger>
                }
                title="Modificar registro"
                center
                onSubmit={modi}
              >
                <Alert
                  variant="alert"
                  title="Hay cambios sin guardar en el formulario"
                >
                  Continuar hará que se pierdan.
                </Alert>
                <p class="text-center">
                  ¿Seguro que desea ir a modificar el registro?
                </p>
              </Modal>
            </Show>

            <Modal
              trigger={
                <Trigger
                  variant="primary-danger"
                  aria-label="Eliminar registro"
                >
                  <Trash />
                </Trigger>
              }
              center
              title="Eliminar registro"
              onSubmit={async () => {
                toast.promise(deleteRecord(data()!.jefe.cedula as number), {
                  loading: "Eliminando...",
                  success: () => {
                    setRedir("/");
                    return "Registro eliminado";
                  },
                  error: "Error al eliminar el registro",
                });
              }}
            >
              <p class="text-center">¿Seguro que desea eliminar el registro?</p>
              <Alert variant="warning">Esta acción no se puede deshacer</Alert>
            </Modal>
          </header>
          <div class="flex flex-col gap-5 max-w-[1000px] w-full m-auto *:max-w-[450px] *:w-full max-[800px]:*:m-auto min-[800px]:grid min-[1000px]:gap-x-10 grid-cols-2 grid-rows-[auto_auto-1fr]">
            <Jefe readOnly data={data()!.jefe} />
            <Programs
              readOnly
              data={{
                carnet: data()!.carnet,
                clap: data()!.clap,
                gas: data()!.gas,
              }}
            />
            <Homes readOnly data={data()!.homes} />
            {/* @ts-ignore */}
            <Family readOnly data={data()!.family} />
          </div>
        </Show>
      </Show>
    </main>
  );
};
export default Record;
