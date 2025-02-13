import { createSignal, Show } from "solid-js";
import Btn from "../../../components/btn";
import Fields from "../../../components/fields";
import Input from "../../../components/input";
import { Add } from "../../../icons/aside";
import Select from "../../../components/select";
import { parseWithSex } from "../../../lib/utils";
import { PARENTESCOS, habitanteData } from "../../../constants";
import Hr from "../../../components/hr";
import Pagination from "../../../components/pagination";
import Cedula from "../../../components/cedula";
import { Form } from "..";
import { effect } from "solid-js/web";
import { HabitanteData } from "../../../types/form";

const Family = () => {
  const [index, setIndex] = createSignal(0);
  const [habitantes, setHabitantes] = createSignal<HabitanteData[]>(
    Form.store.state.values.family
  );
  const [currentPerson, setCurrentPerson] = createSignal<HabitanteData>(
    Form.store.state.values.family[0] || habitanteData()
  );

  Form.store.subscribe(() => {
    // al añadir un nuevo habitante, se actualizan los datos
    setHabitantes(Form.store.state.values.family);
    // al usar el handler, se actualizan los datos
    const currentPerson = Form.store.state.values.family[index()];
    currentPerson && setCurrentPerson(currentPerson);
  });

  // al cambiar de habitante, se actualizan los datos
  effect(() => {
    const currentPerson = Form.store.state.values.family[index()];
    currentPerson && setCurrentPerson(currentPerson);
  });

  const change = (path: string, value: unknown) => {
    // @ts-expect-error
    Form.setFieldValue(`family[${index()}].${path}`, value);
  };

  return (
    <Form.Field
      name="family"
      mode="array"
      children={(f) => (
        <Fields
          div
          legend="Datos de los habitantes"
          wrapperClass="flex flex-col !p-2 gap-4"
        >
          <Show
            when={habitantes().length}
            fallback={
              <i class="mt-2 text-center fore">
                No se ha añadido ningún habitante.
              </i>
            }
          >
            <div class="relative flex flex-col gap-3 ">
              <Input
                label="Nombres"
                value={currentPerson().nombres as string}
                onChange={(value: string) => change("nombres", value)}
              />

              <Input
                label="Apellidos"
                value={currentPerson().apellidos as string}
                onChange={(value: string) => change("apellidos", value)}
              />

              <Cedula
                ven={currentPerson().venezolano}
                onVenChange={(value) => {
                  change("venezolano", value);
                }}
                value={currentPerson().cedula as number}
                onChange={(value: number) => change("cedula", value)}
              />

              <Input
                label="Fecha de nacimiento"
                type="date"
                value={currentPerson().fechaNacimiento as string}
                onChange={(value: string) => change("fechaNacimiento", value)}
              />

              <Select
                value={currentPerson().parentesco as unknown as string[]}
                onChange={(value) => change("parentesco", value)}
                label="parentesco"
                options={PARENTESCOS}
                parseOptionText={(value) =>
                  parseWithSex(habitantes()[index()].sexo, value)
                }
              />
              <Hr />
              <Show when={habitantes().length > 1}>
                <Pagination
                  page={index() + 1}
                  onPageChange={(page) => setIndex(page - 1)}
                  itemClass="not-aria-[current=page]:bg-white dark:not-aria-[current=page]:bg-neutral-900"
                  class="max-w-full overflow-auto"
                  fixedItems
                  count={habitantes().length}
                />
              </Show>
            </div>
          </Show>
          <div class="flex flex-wrap gap-2 *:w-full">
            <Show when={habitantes().length}>
              <Btn
                variant="primary-danger"
                onClick={() => {
                  if (confirm("¿Seguro que quieres eliminar este habitante?")) {
                    if (index() === 0 && habitantes().length === 1) setIndex(0);
                    else if (index() === habitantes().length - 1)
                      setIndex(index() - 1);

                    f().removeValue(index());
                  }
                }}
              >
                Eliminar habitante seleccionado
              </Btn>
            </Show>
            <Btn
              class="w-full"
              variant="primary"
              onclick={() => {
                f().pushValue(habitanteData());
              }}
            >
              Añadir nuevo habitante
              <Add />
            </Btn>
          </div>
        </Fields>
      )}
    />
  );
};
export default Family;
