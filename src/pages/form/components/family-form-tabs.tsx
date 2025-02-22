import { Tabs } from "@kobalte/core/tabs";
import { createEffect, createSignal, Show } from "solid-js";
import { Form } from "..";
import { habitanteData } from "../../../constants";
import { CancelRound, CancelRoundFilled, Check, Trash } from "../../../icons";
import { Edit } from "../../../icons/aside";
import { HabitanteData } from "../../../types/form";
import AddFamiliar from "./add-familiar";
import Btn from "../../../components/btn";
import Cedula from "../../../components/cedula";
import FamilyReadTabs from "../../../components/data/family-read-tabs";
import { FormSchemas } from "../../../lib/form";
import { z } from "zod";

export const familyTabMsgClass =
  "flex flex-col gap-3 items-center justify-center min-h-[150px] max-w-[500px] w-full m-auto text-lg border-3 rounded-xl";

export type ModifyFamily = "edit" | "delete";

const FamilyFormTabs = () => {
  const [tab, setTab] = createSignal("add");
  const [habitantes, setHabitantes] = createSignal<HabitanteData[]>(
    Form.store.state.values.family
  );
  const [adding, setAdding] = createSignal(false);
  const [modify, setModify] = createSignal<false | ModifyFamily>(false);
  const [modifyIndex, setModifyIndex] = createSignal<number | undefined>();

  Form.store.subscribe(() => {
    setHabitantes(Form.store.state.values.family);
  });

  createEffect(() => {
    if (!modify()) setModifyIndex(undefined);
  });

  createEffect(async () => {
    if (modifyIndex() !== undefined) {
      if (modify() === "delete") {
        if (await confirm("¿Seguro que desea eliminar el familiar?")) {
          Form.removeFieldValue("family", modifyIndex()!);
          if (modifyIndex() === 0) {
            setModify(false);
          }
        }
      } else {
        if (
          adding() &&
          !(await confirm(
            "Se está añadiendo un familiar. Continuar provocará que se pierdan los datos ingresados.\n¿Desea continuar?"
          ))
        )
          return;

        setModify(false);
        setTab("add");
        setAdding(true);
      }
    }
  });

  return (
    <>
      <Tabs class="flex flex-col gap-4" value={tab()} onChange={setTab}>
        <Tabs.List class="flex items-center gap-2 w-full overflow-auto pb-2 border-b-1 div-border">
          <Tabs.Trigger class="tab-trigger" value="add">
            Nuevo
          </Tabs.Trigger>
          <Tabs.Trigger class="tab-trigger" value="added">
            Añadidos
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content
          value="add"
          class="flex flex-col max-w-[525px] w-full m-auto "
        >
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
            <Cedula
              class="max-w-[unset]"
              familiar={modifyIndex() ?? habitantes().length - 1}
            />
            <div class="grid grid-cols-2 items-center gap-2 min-w-[300px] ml-auto p-3 ">
              <Btn
                variant="outline-danger"
                onClick={() => {
                  setAdding(false);
                  Form.removeFieldValue("family", habitantes().length - 1);
                }}
              >
                <CancelRoundFilled /> Descartar
              </Btn>
              <Btn
                variant="primary"
                onClick={async () => {
                  const index = modifyIndex() ?? habitantes().length - 1,
                    values = Form.state.values.family[index];

                  const sch = { ...FormSchemas.jefe };
                  // @ts-ignore
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

                  if (modifyIndex() !== undefined) {
                    setModifyIndex(undefined);
                    Form.replaceFieldValue("family", index, values);
                  }
                  setAdding(false);
                }}
              >
                <Check /> Confirmar
              </Btn>
            </div>
          </Show>
        </Tabs.Content>

        <Tabs.Content value="added" class="*:m-auto">
          <div class="flex flex-col gap-4">
            <FamilyReadTabs
              modifiable={modify()}
              setModifyIndex={setModifyIndex}
              data={adding() ? habitantes().slice(0, -1) : habitantes()}
            />
            <Show when={habitantes().length - (adding() ? 1 : 0)}>
              <div class="border-t-1 div-border flex items-center justify-end gap-4 pt-4 *:!gap-2">
                <Show
                  when={!modify()}
                  fallback={
                    <Btn variant="outline" onclick={[setModify, false]}>
                      <CancelRound />
                      <span>Cancelar</span>
                    </Btn>
                  }
                >
                  <Btn variant="primary" onClick={[setModify, "edit"]}>
                    <Edit /> Modificar familiar
                  </Btn>
                  <Btn variant="primary-danger" onClick={[setModify, "delete"]}>
                    <Trash /> Eliminar familiar
                  </Btn>
                </Show>
              </div>
            </Show>
          </div>
        </Tabs.Content>
      </Tabs>
    </>
  );
};
export default FamilyFormTabs;
