import { Cancel, Tick } from "../../icons";
import { personData } from "../../constants";
import Btn from "../../components/layout/btn";
import { createForm } from "@tanstack/solid-form";
import toast from "solid-toast";
import { FormSchema } from "../../lib/form";
import { oneliner } from "../../lib/utils";
import { ComunalRecord } from "../../types/form";
import Jefe from "../../components/data/jefe";
import HomeData from "../../components/data/home";
import Programs from "../../components/data/programs";
import Family from "../../components/data/family";
import { createSignal, Show } from "solid-js";
import { Reset } from "../../icons/form";
import { addRecord, checkCedula, updateRecord } from "../../lib/db";
import { cedula } from "../../lib/data";
import Modal, { Trigger } from "../../components/dialog/modal";
import Alert from "../../components/layout/alert";

const defaultValues: ComunalRecord = {
  jefe: {
    ...personData(),
    tel: "",
    email: "",
    edoCivil: "",
    nivelEstudios: "",
  },
  home: {
    calle: "",
    avenida: "",
    referencia: "",
    numCasa: "",
  },
  family: [],
  carnet: { posee: null },
  clap: { posee: null, cantidad: 0 },
  gas: { posee: null, "10kg": 0, "18kg": 0, "27kg": 0, "43kg": 0 },
};

export const [formAction, setFormAction] = createSignal<"add" | "edit">("add");
export const Form = createForm<ComunalRecord>(() => ({
  defaultValues,
}));
const Register = () => {
  const reset = () => {
    if (formAction() === "edit") Form.update({ defaultValues });
    Form.reset();
    setFormAction("add");
    document.body.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main class="flex flex-col gap-4 flex-1 p-3 pt-1 pb-4 overflow-auto">
      <form
        id="form"
        class="flex flex-col gap-5 min-[1000px]:gap-x-10 max-w-[1000px] w-full m-auto p-3 *:max-w-[450px] *:w-full max-[1000px]:*:m-auto min-[1000px]:grid  grid-cols-2 grid-rows-[auto_auto-1fr]"
        onsubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Jefe />
        <HomeData />
        <Family />
        <Programs />
      </form>
      <div class="sticky bottom-0 grid grid-cols-2 items-center justify-center max-w-[450px] w-full m-auto white gap-2 *:w-full min-[1000px]:my-3 min-[1000px]:gap-4 min-[1000px]:*:p-2.5">
        <Modal
          trigger={
            <Trigger variant="outline" type="reset">
              <Show
                when={formAction() === "add"}
                fallback={
                  <>
                    <Cancel />
                    Descartar cambios
                  </>
                }
              >
                <Reset />
                Reiniciar formulario
              </Show>
            </Trigger>
          }
          onSubmit={reset}
          title="Reiniciar formulario"
          class="text-center"
          center
        >
          <p>¿Realmente desea reiniciar el formulario?</p>
          <Alert title variant="alert">
            Se perderán todos los datos ingresados
          </Alert>
        </Modal>
        <Btn
          variant="primary"
          form="form"
          onClick={async () => {
            const load = toast.loading("Guardando...");

            const [validation, err] = await oneliner(
              FormSchema.safeParseAsync(Form.state.values)
            );

            toast.dismiss(load);

            if (err) toast.error("Error al intentar validar");

            if (!validation!.success) {
              for (let i = 0; i < validation!.error.issues.length; i++) {
                const { path } = validation!.error.issues[i];
                // @ts-ignore
                Form.validateField(path.join("."), "submit");
              }

              return toast.error("Hay errores en el formulario", {
                duration: 5000,
              });
            }

            if (
              (formAction() === "add" ||
                Form.state.values.jefe.cedula !==
                  Form.state.values.jefe.oriCedula) &&
              (await checkCedula(Form.state.values.jefe.cedula as number))
            )
              return toast.error(
                `Ya existe un registro con la cedula: ${cedula(
                  Form.state.values.jefe.cedula,
                  Form.state.values.jefe.venezolano
                )}`,
                { duration: 5000 }
              );

            const [success, error] = await oneliner(
              formAction() === "edit"
                ? updateRecord(Form.state.values)
                : addRecord(Form.state.values)
            );

            if (!success || error) {
              toast.error(
                `Error al intentar ${
                  formAction() === "edit" ? "actualizar" : "guardar"
                } el registro`,
                { duration: 5000 }
              );
              return console.error(error);
            }

            toast.success(
              `Registro ${
                formAction() === "edit" ? "actualizado" : "guardado"
              } con éxito`
            );
            reset();
          }}
        >
          <Tick />
          {formAction() === "edit" ? "Actualizar" : "Añadir"} registro
        </Btn>
      </div>
    </main>
  );
};
export default Register;
