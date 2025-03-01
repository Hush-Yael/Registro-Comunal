import { createEffect, Show, useContext } from "solid-js";
import { Form } from "../../pages/form";
import { EDOS_CIVIL, NIVELES_ESTUDIOS, PARENTESCOS } from "../../constants";
import Data from "./data";
import Input from "../input";
import { useField } from "../../hooks/useField";
import Age from "../edad";
import Select from "../select";
import { parseWithSex, yearsSinceDate } from "../../lib/utils";
import { FormSchemas } from "../../lib/form";
import ExpectUnknown from "../data/expect-unknown";
import DatePicker from "../form/date-picker";
import { CedulaContext } from "../../contexts/cedula";
import { HabitanteData } from "../../types/form";
import { DBComunalRecord } from "../../types/db";

const ReadOnly = () => {
  const { readOnly, data, familiar } = useContext(CedulaContext);

  return (
    <>
      <Data readOnly={readOnly} label="Nombres">
        <span>{data!.nombres}</span>
      </Data>
      <Data readOnly={readOnly} label="Apellidos">
        <span>{data!.apellidos}</span>
      </Data>
      <Age
        age={
          // @ts-ignore
          data!.edad ||
          (data!.fechaNacimiento && yearsSinceDate(data!.fechaNacimiento))
        }
        date={data!.fechaNacimiento}
      />
      <Show
        when={familiar === undefined}
        fallback={
          <ExpectUnknown
            data={(data as HabitanteData).parentesco}
            label="Parentesco"
          >
            <span>
              {parseWithSex(
                data!.sexo || "",
                (data as HabitanteData).parentesco
              )}
            </span>
          </ExpectUnknown>
        }
      >
        <ExpectUnknown
          data={(data as DBComunalRecord<"jefe">).edoCivil}
          label="Estado civil"
        >
          <span>
            {(data as DBComunalRecord<"jefe">).edoCivil
              ? parseWithSex(
                  data!.sexo,
                  (data as DBComunalRecord<"jefe">).edoCivil
                )
              : "Desconocido"}
          </span>
        </ExpectUnknown>
        <ExpectUnknown
          data={(data as DBComunalRecord<"jefe">).nivelEstudios}
          label="Nivel de estudios"
        >
          <span>{(data as DBComunalRecord<"jefe">).nivelEstudios}</span>
        </ExpectUnknown>
      </Show>
    </>
  );
};

const Editable = () => {
  const { familiar } = useContext(CedulaContext);

  return (
    <>
      <Data label="Nombres">
        <Form.Field
          validators={{ onSubmit: FormSchemas.jefe.nombres }}
          // @ts-ignore
          name={`${
            familiar === undefined ? "jefe" : `family[${familiar}]`
          }.nombres`}
        >
          {(f) => (
            <Input
              {...useField(f)}
              inputClass="w-full"
              variant="input-dash"
              onlyLetters
            />
          )}
        </Form.Field>
      </Data>
      <Data label="Apellidos">
        <Form.Field
          validators={{ onSubmit: FormSchemas.jefe.apellidos }}
          // @ts-ignore
          name={`${
            familiar === undefined ? "jefe" : `family[${familiar}]`
          }.apellidos`}
        >
          {(f) => (
            <Input
              {...useField(f)}
              inputClass="w-full"
              variant="input-dash"
              onlyLetters
              type="text"
            />
          )}
        </Form.Field>
      </Data>
      <Data label="Fecha de nacimiento">
        <div class="flex flex-col gap-1.5 w-full">
          <Form.Field
            // @ts-ignore
            name={`${
              familiar === undefined ? "jefe" : `family[${familiar}]`
            }.fechaNacimiento`}
          >
            {(f) => (
              <>
                <DatePicker
                  {...useField(f)}
                  variant="input-dash"
                  class="w-full"
                />
                <Show when={f().state.value}>
                  <span class="flex items-center gap-1.5 fore">
                    {yearsSinceDate(f().state.value! as string, true)}
                  </span>
                </Show>
              </>
            )}
          </Form.Field>
        </div>
      </Data>
      <Show
        when={familiar === undefined}
        fallback={
          <Data label="Parentesco">
            <Form.Field name={`family[${familiar! as number}].parentesco`}>
              {(f) => (
                <Select
                  {...useField(f)}
                  options={PARENTESCOS}
                  variant="input-dash"
                  parseText={(value) =>
                    value
                      ? parseWithSex(
                          Form.state.values.family[familiar! as number].sexo,
                          value
                        )
                      : null
                  }
                />
              )}
            </Form.Field>
          </Data>
        }
      >
        <Data label="Estado civil">
          <Form.Field
            // @ts-ignore
            name={`${
              familiar === undefined ? "jefe" : `family[${familiar}]`
            }.edoCivil`}
          >
            {(f) => (
              <Select
                {...useField(f)}
                variant="input-dash"
                parseText={(value) =>
                  value
                    ? parseWithSex(Form.state.values.jefe.sexo, value)
                    : null
                }
                options={EDOS_CIVIL as unknown as string[]}
              />
            )}
          </Form.Field>
        </Data>
        <Data<true> label="Nivel de estudios">
          <Form.Field
            // @ts-ignore
            name={`${
              familiar === undefined ? "jefe" : `family[${familiar}]`
            }.nivelEstudios`}
          >
            {(f) => (
              <Select
                {...useField(f)}
                variant="input-dash"
                options={NIVELES_ESTUDIOS as unknown as string[]}
              />
            )}
          </Form.Field>
        </Data>
      </Show>
    </>
  );
};

const LeftData = () => {
  const { readOnly } = useContext(CedulaContext);

  return (
    <div
      class={`flex flex-col justify-between ${readOnly ? "gap-1" : "gap-3.5"}`}
    >
      <Show when={readOnly} fallback={<Editable />}>
        <ReadOnly />
      </Show>
    </div>
  );
};

export default LeftData;
