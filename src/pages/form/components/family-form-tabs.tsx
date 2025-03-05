import { createSignal, Show, useContext } from "solid-js";
import { Form } from "..";
import { habitanteData } from "../../../constants";
import { CancelRoundFilled, Check } from "../../../icons";
import { HabitanteData } from "../../../types/form";
import AddFamiliar from "./add-familiar";
import Btn from "../../../components/layout/btn";
import Cedula from "../../../components/cedula";
import FamilyReadTabs from "../../../components/data/family-read-tabs";
import { FormSchemas } from "../../../lib/form";
import { z } from "zod";
import Modal from "../../../components/dialog/modal";
import { FamilyFormContext } from "../../../contexts/family";

export const familyTabMsgClass =
  "flex flex-col gap-3 items-center justify-center min-h-[150px] max-w-[500px] w-full m-auto text-lg border-3 rounded-xl";

export type ModifyFamily = undefined | "edit" | "delete";

const FamilyFormTabs = () => {
  const [habitantes, setHabitantes] = createSignal<HabitanteData[]>(
    Form.store.state.values.family
  );
  const context = useContext(FamilyFormContext);
  const { adding, setAdding, modifyIndex, setModifyIndex } = context.edit;
  const { open, setOpen, modifyMode, setModifyMode } = context.modal;

  const reset = () => {
    setModifyIndex(undefined);
    setModifyMode(undefined);
    setAdding(false);
  };

  Form.store.subscribe(() => {
    setHabitantes(Form.store.state.values.family);
  });

  return (
    <>
      <section>
        <div class="flex items-center justify-between border-b-1 div-border py-2 mb-4">
          <h3 class="">{!modifyMode() ? "Nuevo" : "Modificar"} familiar</h3>
          <Show when={adding()}>
            <div class="grid grid-cols-2 items-center gap-2 *:py-1">
              <Btn
                variant="outline-danger"
                onClick={() => {
                  // al cancelar añadir uno nuevo
                  if (!modifyMode())
                    Form.removeFieldValue("family", habitantes().length - 1);
                  reset();
                }}
              >
                <CancelRoundFilled /> Descartar
              </Btn>
              <Btn
                class="bg-[hsl(157,71%,50%)] text-[hsl(155,56%,21%)]"
                onClick={async () => {
                  const index = modifyIndex() ?? habitantes().length - 1,
                    values = Form.state.values.family[index];

                  const sch = { ...FormSchemas.jefe } as Partial<
                    typeof FormSchemas.jefe
                  >;
                  delete sch.email;
                  const validation = await z.object(sch).safeParseAsync(values);

                  if (!validation.success) {
                    for (let i = 0; i < validation.error.issues.length; i++) {
                      const { path } = validation.error.issues[i];
                      Form.validateField(
                        // @ts-ignore
                        `family[${index}].${path[0]}`,
                        "submit"
                      );
                    }

                    return;
                  }

                  // al añadir uno nuevo
                  if (modifyIndex() !== undefined)
                    Form.replaceFieldValue("family", index, values);

                  reset();
                }}
              >
                <Check /> Confirmar
              </Btn>
            </div>
          </Show>
        </div>
        <Show
          when={adding()}
          fallback={
            <AddFamiliar
              onClick={() => {
                Form.pushFieldValue("family", habitanteData());
                setAdding(true);
              }}
            />
          }
        >
          <div class="max-w-[650px] m-auto">
            <Cedula
              class="max-w-[unset]"
              familiar={modifyIndex() ?? habitantes().length - 1}
            />
          </div>
        </Show>
      </section>
      <section class="flex flex-col gap-4 //max-w-[90vw]">
        <h3 class="border-b-1 div-border py-2">Familiares añadidos</h3>
        <FamilyReadTabs
          modifiable
          data={
            adding() && !modifyMode() ? habitantes().slice(0, -1) : habitantes()
          }
        />
      </section>

      <Modal
        open={open}
        setOpen={setOpen}
        title={`${modifyMode() === "edit" ? "Modificar" : "Eliminar"} familiar`}
        onSubmit={async () => {
          const i = context.modal.newIndex!;

          if (modifyMode() === "delete") {
            Form.removeFieldValue("family", i);
          } else {
            setAdding(true);
            setModifyMode("edit");
            setModifyIndex(i);
          }
        }}
        onCleanup={() => {
          if (modifyMode() === "delete") {
            setModifyIndex(undefined);
            setModifyMode(undefined);
          }

          context.modal.newIndex = undefined;
        }}
        center
        class="text-center"
      >
        <Show
          when={modifyMode() === "delete"}
          fallback={
            <>
              <p>
                Ya se está añadiendo un familiar. Continuar provocará que se
                pierdan los datos ingresados.
              </p>
              <p>¿Desea continuar?</p>
            </>
          }
        >
          <p>¿Seguro que desea eliminar el familiar?</p>
          <p class="text-red-500 dark:text-[hsl(0,100%,70%)]">
            Esta acción no puede deshacerse.
          </p>
        </Show>
      </Modal>
    </>
  );
};
export default FamilyFormTabs;
