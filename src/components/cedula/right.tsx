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
import { Portal } from "solid-js/web";
import DatePicker from "../form/date-picker";
import { yearsSinceDate } from "../../lib/utils";
import RadioGroup from "../form/radio-group";
import { Grave } from "../../icons";

const ReadOnly = () => {
  const { data, cedulaAsLink } = useContext(CedulaContext)!;

  return (
    <>
      <div class="flex flex-col items-center gap-3">
        <div class="flex flex-col items-center">
          <Show
            when={!cedulaAsLink}
            fallback={
              <Closer
                element={A}
                props={{
                  class: "link font-bold",
                  href: `jefe/${data.cedula}`,
                }}
              >
                {cedula(data.cedula)}
              </Closer>
            }
          >
            <p class="font-bold m-auto">
              <span>{cedula(data.cedula)}</span>
            </p>
          </Show>
          <small class="text-center fore">
            {data.venezolano ? "Venezolano" : "Extranjero"}
          </small>
        </div>
      </div>

      <span class="flex flex-col gap-2 justify-end h-full flex-1 items-center">
        <Show when={data.fallecido}>
          <p class="flex flex-col items-center gap-1">
            <Grave class="!size-7 fore" />
            Fallecid{data.sexo === "F" ? "a" : "o"}
          </p>
        </Show>
        <Photo sexo={data!.sexo} class="!h-[5em]" />
      </span>
    </>
  );
};

const Editable = () => {
  const { index } = useContext(CedulaContext)!;
  let outErr: HTMLDivElement;

  return (
    <>
      <div class="flex flex-col gap-2">
        <div class="flex items-end justify-center gap-1.5">
          <Form.Field
            // @ts-ignore
            name={`${
              index === undefined ? "jefe" : `family[${index as number}]`
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
                  index === undefined
                    ? Form.state.values.jefe.oriCedula
                    : Form.state.values.family[index].oriCedula;

                return (!ori &&
                  (await checkCedula(value, index !== undefined))) ||
                  (value !== ori &&
                    (await checkCedula(value, index !== undefined)))
                  ? "La cédula ingresada ya se encuentra registrada"
                  : undefined;
              },
            }}
            // @ts-ignore
            name={`${
              index === undefined ? "jefe" : `family[${index as number}]`
            }.cedula`}
          >
            {(f) => (
              <div class="flex flex-col">
                <Data label="Cédula">
                  <Number
                    {...useField(f)}
                    variant="input-dash"
                    error={""}
                    min={1}
                  />
                </Data>
                <Show when={f().state.meta.errors.length}>
                  <Portal mount={outErr!}>
                    <p class={errorText}>{f().state.meta.errors}</p>
                  </Portal>
                </Show>
              </div>
            )}
          </Form.Field>
        </div>
        <div ref={outErr!} />
        <Form.Field
          // @ts-ignore
          name={`${
            index === undefined ? "jefe" : `family[${index as number}]`
          }.fallecido`}
        >
          {(f) => (
            <>
              <Data label="¿Ha fallecido?" class="input-dash">
                <RadioGroup
                  wrapperClass="gap-1.5 !px-0 *:rounded-lg"
                  itemClass="flex-1 *:justify-center data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:bg-neutral-700"
                  items={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Sí" },
                  ]}
                  name={f().name}
                  value={String(f().state.value)}
                  onChange={(option) => {
                    const value = window.Number(option.value);
                    f().handleChange(value);

                    if (!value)
                      Form.setFieldValue(
                        // @ts-ignore
                        `${
                          index === undefined
                            ? "jefe"
                            : `family[${index as number}]`
                        }.fechaDeceso`,
                        ""
                      );
                  }}
                />
              </Data>

              <Show when={f().state.value}>
                <Data label="Fecha de deceso">
                  <Form.Field
                    // @ts-ignore
                    name={`${
                      index === undefined
                        ? "jefe"
                        : `family[${index as number}]`
                    }.fechaDeceso`}
                  >
                    {(f) => (
                      <>
                        <Form.Field
                          // @ts-ignore
                          name={`${
                            index === undefined
                              ? "jefe"
                              : `family[${index as number}]`
                          }.fechaNacimiento`}
                        >
                          {(subF) => (
                            <DatePicker
                              {...useField(f)}
                              variant="input-dash"
                              class="w-full"
                              min={(subF().state.value as string) || undefined}
                            />
                          )}
                        </Form.Field>
                        <Show when={f().state.value}>
                          <span class="flex items-center gap-1.5 fore">
                            Hace{" "}
                            {yearsSinceDate({
                              dateString: f().state.value! as string,
                              showYears: true,
                            })}
                          </span>
                        </Show>
                      </>
                    )}
                  </Form.Field>
                </Data>
              </Show>
            </>
          )}
        </Form.Field>
      </div>
      <div class="flex flex-col gap-2 mt-auto">
        <Form.Field
          validators={{ onSubmit: FormSchemas.jefe.sexo }}
          // @ts-ignore
          name={`${
            index === undefined ? "jefe" : `family[${index as number}]`
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
    <div class={`flex flex-col ${readOnly ? "ml-auto" : ""}  gap-8 h-full`}>
      <Show when={readOnly} fallback={<Editable />}>
        <ReadOnly />
      </Show>
    </div>
  );
};

export default RightData;
