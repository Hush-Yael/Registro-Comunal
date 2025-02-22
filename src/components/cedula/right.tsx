import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { SEXES } from "../../constants";
import { useField } from "../../hooks/useField";
import { Form } from "../../pages/form";
import { Photo } from "../cedula/photo";
import { Closer } from "../modal";
import { CedulaProps } from ".";
import Data from "./data";
import Select from "../select";
import { cedula } from "../../lib/data";
import Number from "../number";
import { FormSchemas } from "../../lib/form";
import { checkCedula } from "../../lib/db";
import { errorText } from "../input";

const ReadOnly = (props: Pick<CedulaProps<true>, "link" | "data">) => (
  <>
    <div class="flex flex-col">
      <Show
        when={!props.link}
        fallback={
          <Closer
            element={A}
            props={{
              class: "link font-bold",
              href: `jefe/${props.data!.cedula}`,
            }}
          >
            {cedula(props.data!.cedula)}
          </Closer>
        }
      >
        <p class="font-bold m-auto">
          <span>{cedula(props.data!.cedula)}</span>
        </p>
      </Show>
      <small class="text-center fore">
        {props.data!.venezolano ? "Venezolano" : "Extranjero"}
      </small>
    </div>

    <span class="flex flex-col gap-1 justify-end h-full flex-1 items-center">
      <Photo sexo={props.data!.sexo} class="!h-[5em]" />
    </span>
  </>
);

const Editable = (props: Pick<CedulaProps<undefined, number>, "familiar">) => (
  <>
    <div class="flex flex-col">
      <div class="relative flex items-end justify-center gap-1.5">
        <Form.Field
          // @ts-ignore
          name={`${
            props.familiar === undefined
              ? "jefe"
              : `family[${props.familiar as number}]`
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
              parseValueText={(value) => value.charAt(0)}
            />
          )}
        </Form.Field>
        <Form.Field
          validators={{
            onSubmit: FormSchemas.jefe.cedula,
            onBlurAsync: async ({ value }) => {
              return (await checkCedula(value))
                ? "La cédula ingresada ya se encuentra registrada"
                : undefined;
            },
          }}
          // @ts-ignore
          name={`${
            props.familiar === undefined
              ? "jefe"
              : `family[${props.familiar as number}]`
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
          props.familiar === undefined
            ? "jefe"
            : `family[${props.familiar as number}]`
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

const RightData = <R extends true | undefined>(props: CedulaProps<R>) => (
  <div
    class={`flex flex-col ${
      (props as CedulaProps<true>).readOnly ? "ml-auto" : ""
    }  gap-6 h-full`}
  >
    <Show
      when={(props as CedulaProps<true>).readOnly}
      fallback={
        <Editable familiar={(props as CedulaProps<undefined>).familiar} />
      }
    >
      <ReadOnly data={(props as CedulaProps<true>).data} link={props.link} />
    </Show>
  </div>
);

export default RightData;
