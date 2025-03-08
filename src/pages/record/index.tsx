import {
  createEffect,
  createResource,
  createSignal,
  onMount,
  Show,
} from "solid-js";
import { deleteRecord, getRecord } from "../../lib/db";
import { Navigate, useParams, useSearchParams } from "@solidjs/router";
import { ComunalRecord } from "../../types/form";
import Jefe from "../../components/data/jefe";
import Home from "../../components/data/home";
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
import { DBComunalRecord } from "../../types/db";

const Record = () => {
  const params = useParams(),
    [searchParams] = useSearchParams();
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

  const [redir, setRedir] = createSignal("");

  const modi = () => {
    setFormAction("edit");
    Form.reset();
    Form.update({
      defaultValues: Object.fromEntries(
        Object.entries(data()!).map(([name, object]) => {
          if (name === "jefe") {
            delete (object as DBComunalRecord["jefe"]).edad;
            object["oriCedula"] = (object as DBComunalRecord["jefe"]).cedula;
          } else {
            if (name === "family")
              return [
                name,
                (object as DBComunalRecord["family"]).map((record) => {
                  delete record.jefeCedula;
                  delete record.edad;
                  record["oriCedula"] = record.cedula as number;
                  return record;
                }),
              ];

            // se elimina la cedula del jefe de todas las tablas y el total de gas
            delete (object as DBComunalRecord["home"]).cedula;
            delete (object as DBComunalRecord["gas"]).total;
          }

          return [name, object];
        })
      ) as ComunalRecord,
    });
    setRedir("/registro");
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
            <Jefe readOnly data={(data() as ComunalRecord).jefe} />
            <Home readOnly data={(data() as ComunalRecord).home} />
            {/* @ts-ignore */}
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
    </main>
  );
};
export default Record;
