import {
  createSignal,
  JSX,
  Match,
  onCleanup,
  Show,
  Switch,
  useContext,
} from "solid-js";
import { Form } from "../../pages/form";
import { habitanteData, homeData, negocio } from "../../constants";
import { CancelRoundFilled, Check } from "../../icons";
import Btn from "../../components/layout/btn";
import { FormSchemas } from "../../lib/form";
import { z } from "zod";
import Modal from "../../components/dialog/modal";
import toast from "solid-toast";
import { ArrayFieldContext } from "../../contexts/array-field";
import ReadArrayFieldItems from "./read-list";
import { AddFamiliar, AddHome, AddSquared } from "../../icons/form";
import {
  ArrayTablesPrimaryKey,
  checkBName,
  checkCedula,
  checkRIF,
} from "../../lib/db";
import { Business, HabitanteData } from "../../types/form";

export const familyTabMsgClass =
  "flex flex-col gap-3 items-center justify-center min-h-[150px] max-w-[500px] w-full m-auto text-lg border-3 rounded-xl";

export type ModifyFamily = undefined | "edit" | "delete";
export type ArrayFieldList = "family" | "businesses" | "homes";

const SCHEMAS: { [key in ArrayFieldList]: any } = {
  family: FormSchemas.jefe,
  businesses: FormSchemas.businesses,
  homes: FormSchemas.homes,
};

const PATH_TO_SEARCH: { [key in ArrayFieldList]: string | string[] } = {
  family: "cedula",
  businesses: ["RIF", "nombre"],
  homes: "numCasa",
};

const ALREADY_MSGS: { [key in ArrayFieldList]: string } = {
  family: "Ya existe un familiar registrado con esa cedula",
  businesses: "Ya existe un negocio registrado con ese nombre o RIF",
  homes: "Ya existe una vivienda registrada con ese número",
};

const AddBtn = (props: {
  list: ArrayFieldList;
  setAdding: (v: boolean) => void;
}) => (
  <button
    type="button"
    style={{ "border-style": "dashed solid" }}
    class={`${familyTabMsgClass} border-neutral-400 dark:border-neutral-600 hover:border-neutral-600 dark:hover:border-neutral-400  w-full font-[500] tracking-wide gray hover:!text-black dark:hover:!text-white text-lg transition-colors duration-350 *:min-h-[2.5em]`}
    onClick={() => {
      Form.pushFieldValue(props.list, {
        ...(props.list === "family"
          ? habitanteData()
          : props.list === "homes"
          ? homeData()
          : negocio()),
        toCommit: true,
      });
      props.setAdding(true);
    }}
  >
    <Switch>
      <Match when={props.list === "family"}>
        <AddFamiliar />
      </Match>
      <Match when={props.list === "businesses"}>
        <AddSquared />
      </Match>
      <Match when={props.list === "homes"}>
        <AddHome />
      </Match>
    </Switch>
    Presiona para agregar un registro
  </button>
);

type ArrayFieldProps = {
  list: ArrayFieldList;
  toRender: (p) => JSX.Element;
  tabbable?: boolean;
  getTabs?: (items: any[]) => any;
};

const ArrayField = (props: ArrayFieldProps) => {
  const [list, setList] = createSignal<
    (typeof Form.store.state.values)[typeof props.list]
  >(Form.store.state.values[props.list]);

  const context = useContext(ArrayFieldContext);
  const { adding, setAdding, modifyIndex, setModifyIndex } = context!.edit;
  const { open, setOpen, modifyMode, setModifyMode } = context!.modal;

  const reset = () => {
    setModifyIndex(undefined);
    setModifyMode(undefined);
    setAdding(false);
  };

  Form.store.subscribe(() => {
    const l = Form.store.state.values[props.list];
    setList(l);
  });

  onCleanup(() => {
    Form.setFieldValue(
      props.list,
      Form.state.values[props.list].filter((item) => !item.toCommit) as any
    );
  });

  return (
    <>
      <section>
        <div class="flex items-center justify-between border-b-1 div-border py-2 mb-4">
          <h3 class="">{!modifyMode() ? "Nuevo" : "Modificar"} registro</h3>
          <Show when={adding()}>
            <div class="grid grid-cols-2 items-center gap-2 *:py-1">
              <Btn
                variant="outline-danger"
                onClick={() => {
                  Form.removeFieldValue(props.list, list().length - 1);
                  reset();
                }}
              >
                <CancelRoundFilled /> Descartar
              </Btn>
              <Btn
                variant="primary"
                onClick={async () => {
                  const length = list().length,
                    index = length - 1,
                    values = Form.state.values[props.list][index];

                  if (SCHEMAS[props.list]) {
                    const sch = SCHEMAS[props.list];
                    if (props.list === "family") delete sch.email;

                    const validation = await z
                      .object(sch)
                      .safeParseAsync(values);

                    if (!validation.success) {
                      for (let i = 0; i < validation.error.issues.length; i++) {
                        const { path } = validation.error.issues[i];
                        Form.validateField(
                          // @ts-ignore
                          `${props.list}[${index}].${path[0]}`,
                          "submit"
                        );
                      }

                      return;
                    }
                  }

                  // primary-keys a comparar
                  const toSearch = PATH_TO_SEARCH[props.list];

                  if (
                    list().find((item, i) => {
                      if (
                        item === values ||
                        i === length ||
                        i === modifyIndex() ||
                        item.deleted
                      )
                        return;

                      return typeof toSearch === "string"
                        ? item[toSearch] && item[toSearch] === values[toSearch]
                        : (toSearch as string[]).find(
                            (path) => item[path] && item[path] === values[path]
                          );
                    })
                  )
                    return toast.error(ALREADY_MSGS[props.list]);

                  switch (props.list) {
                    case "family": {
                      if (
                        await checkCedula(
                          (values as HabitanteData).cedula as number,
                          true
                        )
                      )
                        return toast.error(
                          "La cedula ya se encuentra registrada"
                        );
                      break;
                    }
                    case "businesses": {
                      if (await checkRIF((values as Business).RIF as number))
                        return toast.error("El RIF ya se encuentra registrado");
                      else if (
                        (values as Business).nombre !==
                          (values as Business).oriNombre &&
                        (await checkBName((values as Business).nombre))
                      )
                        return toast.error(
                          "El nombre ingresado ya se encuentra registrado"
                        );
                      break;
                    }
                  }

                  delete values.toCommit;

                  // al añadir uno nuevo
                  if (modifyIndex() !== undefined) {
                    Form.replaceFieldValue(props.list, modifyIndex()!, values);
                    Form.removeFieldValue(props.list, index);
                  }

                  reset();
                }}
              >
                <Check /> {modifyIndex() !== undefined ? "Confirmar" : "Añadir"}
              </Btn>
            </div>
          </Show>
        </div>
        <Show
          when={adding()}
          fallback={<AddBtn list={props.list} setAdding={setAdding} />}
        >
          <div class="max-w-[650px] m-auto">
            <props.toRender class="max-w-[unset]" index={list().length - 1} />
          </div>
        </Show>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="border-b-1 div-border py-2">Registros añadidos</h3>
        <ReadArrayFieldItems
          modifiable={!adding()}
          list={props.list}
          data={adding() ? list().slice(0, -1) : list()}
          toRender={props.toRender}
          getTabs={props.getTabs}
        />
      </section>

      <Modal
        open={open}
        setOpen={setOpen}
        title={`${modifyMode() === "edit" ? "Modificar" : "Eliminar"} registro`}
        onSubmit={async () => {
          const i = context!.modal.newIndex!;

          if (modifyMode() === "delete") {
            const pk = ArrayTablesPrimaryKey[props.list],
              values = Form.state.values[props.list][i];

            // registro añadido pero no existente en la base de datos: se evita enviarlo
            if (!values["ori" + pk])
              return Form.removeFieldValue(props.list, i);

            // se indica eliminar el registro ya existente
            // @ts-expect-error
            Form.replaceFieldValue(props.list, i, {
              [pk.toLowerCase()]: values[pk.toLowerCase()],
              ["ori" + pk]: values["ori" + pk],
              deleted: true,
            });
          } else {
            Form.pushFieldValue(props.list, { ...list()[i], toCommit: true });
            setModifyMode("edit");
            setModifyIndex(i);
          }
        }}
        onCleanup={() => {
          if (modifyMode() === "delete") {
            setModifyIndex(undefined);
            setModifyMode(undefined);
          }

          context!.modal.newIndex = undefined;
        }}
        center
        class="text-center"
      >
        <Show
          when={modifyMode() === "delete"}
          fallback={
            <>
              <p>
                Ya se está añadiendo un registro. Continuar provocará que se
                pierdan los datos ingresados.
              </p>
              <p>¿Desea continuar?</p>
            </>
          }
        >
          <p>¿Seguro que desea eliminar el registro?</p>
          <p class="text-red-500 dark:text-[hsl(0,100%,70%)]">
            Esta acción no puede deshacerse.
          </p>
        </Show>
      </Modal>
    </>
  );
};
export default ArrayField;
