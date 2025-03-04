import { A } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { SEXES } from "../../constants";
import { useField } from "../../hooks/useField";
import { Form } from "../../pages/form";
import { Photo } from "../cedula/photo";
import { Closer } from "../dialog/modal";
import Data from "./data";
import Select from "../form/select";
import { cedula } from "../../lib/data";
import Number from "../form/number";
import { FormSchemas } from "../../lib/form";
import { checkCedula } from "../../lib/db";
import { errorText } from "../form/input";
import { CedulaContext } from "../../contexts/cedula";

const ReadOnly = () => {
  const { data, cedulaAsLink } = useContext(CedulaContext)!;

  return (
    <>
      <div class="flex flex-col items-center">
        <Show
          when={!cedulaAsLink}
          fallback={
            <Closer
              element={A}
              props={{
                class: "link font-bold",
                href: `jefe/${data!.cedula}`,
              }}
            >
              {cedula(data!.cedula)}
            </Closer>
          }
        >
          <p class="font-bold m-auto">
            <span>{cedula(data!.cedula)}</span>
          </p>
        </Show>
        <small class="text-center fore">
          {data!.venezolano ? "Venezolano" : "Extranjero"}
        </small>
      </div>

      <span class="flex flex-col gap-1 justify-end h-full flex-1 items-center">
        <Photo sexo={data!.sexo} class="!h-[5em]" />
      </span>
    </>
  );
};

const Editable = () => {
  const { familiar } = useContext(CedulaContext)!;

  return (
    <>
      <div class="flex flex-col">
        <div class="relative flex items-end justify-center gap-1.5">
          <Form.Field
            // @ts-ignore
            name={`${
              familiar === undefined ? "jefe" : `family[${familiar as number}]`
            }.venezolano`}
          >
            {(f) => (
              <Select
                {...useField(f, true)}
                variant="input-dash"
                inputClass="flex-row-reverse gap-1 !pr-1"
                options={[
                  { value: 1, label: "Venezolano" },
                  { value: 0, label: "Extranjero" },
                ]}
                notNull
                useObject
                parseValueText={(value) => (value ? value.charAt(0) : "")}
              />
            )}
          </Form.Field>
          <Form.Field
            validators={{
              onSubmit: FormSchemas.jefe.cedula,
              onBlurAsync: async ({ value }) => {
                const ori =
                  familiar === undefined
                    ? Form.state.values.jefe.oriCedula
                    : Form.state.values.family[familiar].oriCedula;

                return (!ori &&
                  (await checkCedula(value, familiar !== undefined))) ||
                  (value !== ori &&
                    (await checkCedula(value, familiar !== undefined)))
                  ? "La cédula ingresada ya se encuentra registrada"
                  : undefined;
              },
            }}
            // @ts-ignore
            name={`${
              familiar === undefined ? "jefe" : `family[${familiar as number}]`
            }.cedula`}
          >
            {(f) => (
              <>
                <Data label="Cédula">
                  <Number
                    {...useField(f)}
                    variant="input-dash"
                    error={""}
                    min={1}
                  />
                </Data>
                <Show when={f().state.meta.errors.length}>
                  <p
                    class={`absolute top-[105%] right-0 left-0 text-right ${errorText}`}
                  >
                    {f().state.meta.errors}
                  </p>
                </Show>
              </>
            )}
          </Form.Field>
        </div>
      </div>
      <div class="flex flex-col gap-2 mt-auto">
        <Form.Field
          validators={{ onSubmit: FormSchemas.jefe.sexo }}
          // @ts-ignore
          name={`${
            familiar === undefined ? "jefe" : `family[${familiar as number}]`
          }.sexo`}
        >
          {(f) => (
            <>
              <Photo sexo={f().state.value} class="!h-[5em]" noText />
              <Select
                {...useField(f, true)}
                variant="input-dash"
                options={SEXES}
                placeholder="Definir sexo..."
                useObject
              />
            </>
          )}
        </Form.Field>
      </div>
    </>
  );
};

const RightData = () => {
  const { readOnly } = useContext(CedulaContext)!;

  return (
    <div class={`flex flex-col ${readOnly ? "ml-auto" : ""}  gap-6 h-full`}>
      <Show when={readOnly} fallback={<Editable />}>
        <ReadOnly />
      </Show>
    </div>
  );
};

export default RightData;
