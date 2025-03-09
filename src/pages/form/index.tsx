import {
  Box,
  BoxFilled,
  Cancel,
  Person,
  PersonFilled,
  Tick,
} from "../../icons";
import { habitanteData, personData } from "../../constants";
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
import { createSignal, For, Show } from "solid-js";
import { Reset } from "../../icons/form";
import { addRecord, checkCedula, updateRecord } from "../../lib/db";
import { cedula } from "../../lib/data";
import Modal, { Trigger } from "../../components/dialog/modal";
import Alert from "../../components/layout/alert";
import { Tabs } from "@kobalte/core/tabs";
import { useMedia } from "../../hooks/useMedia";
import { Home, HomeFilled } from "../../icons/aside";
import {
  Family as FamilyIcon,
  FamilyFilled as FamilyIconFilled,
} from "../../icons/form";
import { useSearchParams } from "@solidjs/router";

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
  // family: [],
  family: [{ ...habitanteData(), cedula: 5 }],
  carnet: { posee: null },
  clap: { posee: null, cantidad: 0 },
  gas: { posee: null, "10kg": 0, "18kg": 0, "27kg": 0, "43kg": 0 },
};

export const [formAction, setFormAction] = createSignal<"add" | "edit">("add");
export const Form = createForm<ComunalRecord>(() => ({
  defaultValues,
}));

const TABS = {
  jefe: {
    text: "Datos personales",
    outlined: <Person />,
    filled: <PersonFilled />,
    content: Jefe,
  },
  home: {
    text: "Datos de residencia",
    outlined: <Home />,
    filled: <HomeFilled />,
    content: HomeData,
  },
  family: {
    text: "Carga familiar",
    outlined: <FamilyIcon />,
    filled: <FamilyIconFilled />,
    content: Family,
  },
  programs: {
    text: "Programas sociales",
    outlined: <Box />,
    filled: <BoxFilled />,
    content: Programs,
  },
};

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = createSignal((searchParams.tab as string) || "jefe");
  const breakpoint = useMedia("(min-width: 800px)");

  createEffect(async () => {
    if (searchParams.modify) {
      const loading = toast.loading("Cargando datos...");

      Form.update({
        defaultValues: await getToModify(
          parseInt(searchParams.modify as string)
        ),
      });

      setSearchParams({ modify: null });
      setFormAction("edit");

      toast.dismiss(loading);
      toast(
        <span class="flex items-center gap-2">
          <Info /> Editando datos
        </span>,
        {
          duration: 3000,
          className: "!bg-sky-600 !text-white",
        }
      );
    }
  });

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
    <main class="max-[800px]:p-3">
      <Tabs
        class="tabs grid-rows-[auto_1fr] h-full"
        orientation={!breakpoint() ? "horizontal" : "vertical"}
        data-list-pos="r"
        value={tab()}
        onChange={(tab) => {
          setTab(tab);
          setSearchParams({ tab });
        }}
      >
        <Tabs.List class="tab-list *:!gap-2.5 row-[2/3] overflow-auto !p-0 !pl-2 !m-0">
          <For each={Object.keys(TABS)}>
            {(_tab) => (
              <Tabs.Trigger value={_tab}>
                <Show when={_tab === tab()} fallback={TABS[_tab].outlined}>
                  {TABS[_tab].filled}
                </Show>
                {TABS[_tab].text}
              </Tabs.Trigger>
            )}
          </For>
          <Tabs.Indicator class="tab-indicator" />
        </Tabs.List>
        <form
          id="form"
          class="h-full px-3 *:w-full *:m-auto col-[1/2] row-[1/3] overflow-auto min-[800px]:!py-2 min-[800px]:!px-4"
          onsubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <For each={Object.entries(TABS)}>
            {([key, tab]) => (
              <Tabs.Content
                class={
                  key !== "family" ? "max-w-[650px]" : "min-[800px]:max-h-[0]"
                }
                value={key}
              >
                {tab.content({})}
              </Tabs.Content>
            )}
          </For>
        </form>
        <div class="grid grid-cols-2 items-center justify-center gap-2 column-[2/3] row-[1/2] max-w-[650px] w-full m-auto min-[800px]:grid-cols-1 min-[800px]:py-2 min-[800px]:border-l-1 div-border">
          <Modal
            trigger={
              <Trigger variant="outline" type="reset" thickness="md">
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
            thickness="md"
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
      </Tabs>
    </main>
  );
};
export default Register;
