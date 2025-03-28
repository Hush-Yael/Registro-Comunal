import { createSignal, Show, useContext } from "solid-js";
import { Form } from "../../pages/form";
import { EDOS_CIVIL, NIVELES_ESTUDIOS, PARENTESCOS } from "../../constants";
import Data from "./data";
import Input from "../form/input";
import { useField } from "../../hooks/useField";
import Select from "../form/select";
import { parseWithSex, yearsSinceDate } from "../../lib/utils";
import { FormSchemas } from "../../lib/form";
import ExpectUnknown from "../data/expect-unknown";
import DatePicker from "../form/date-picker";
import { CedulaContext } from "../../contexts/cedula";
import Age from "../data/edad";
import Dash from "../data/dash";

const ReadOnly = () => {
  const { data, index } = useContext(CedulaContext)!;

  return (
    <>
      <Data readOnly label="Nombres">
        <span>{data.nombres}</span>
      </Data>
      <Data readOnly label="Apellidos">
        <span>{data.apellidos}</span>
      </Data>
      <Data label="Fecha de nacimiento">
        <Age
          fechaNacimiento={data.fechaNacimiento}
          fallecido={data.fallecido}
          fechaDeceso={data.fechaDeceso}
          edad={data.edad}
        />
      </Data>
      <Show when={data.fallecido}>
        <Data label="Fecha de deceso">
          <Show
            when={data.fechaDeceso}
            fallback={<i class="fore">Desconocida</i>}
          >
            <p class="flex items-center gap-2">
              {data.fechaDeceso}
              <Dash />
              <span>
                Hace{" "}
                {yearsSinceDate({
                  dateString: data.fechaDeceso,
                  showYears: true,
                })}
              </span>
            </p>
          </Show>
        </Data>
      </Show>
      <Show
        when={index === undefined}
        fallback={
          <ExpectUnknown data={data.parentesco} label="Parentesco">
            <span>{parseWithSex(data.sexo || "", data.parentesco)}</span>
          </ExpectUnknown>
        }
      >
        <ExpectUnknown data={data.edoCivil} label="Estado civil">
          <span>
            {data.edoCivil
              ? parseWithSex(data.sexo, data.edoCivil)
              : "Desconocido"}
          </span>
        </ExpectUnknown>
        <ExpectUnknown data={data.nivelEstudios} label="Nivel de estudios">
          <span>{data.nivelEstudios}</span>
        </ExpectUnknown>
      </Show>
    </>
  );
};

const getDecesoTarget = (index: number | undefined) =>
  index === undefined
    ? Form.store.state.values.jefe
    : Form.store.state.values.family[index];

const Editable = () => {
  const { index } = useContext(CedulaContext)!;
  const decesoTarget = getDecesoTarget(index);

  const [deceso, setDeceso] = createSignal({
    state: decesoTarget.fallecido,
    date: decesoTarget.fechaDeceso,
  });

  Form.store.subscribe(() => {
    const decesoTarget = getDecesoTarget(index);
    if (decesoTarget)
      setDeceso({
        state: decesoTarget.fallecido,
        date: decesoTarget.fechaDeceso,
      });
  });

  return (
    <>
      <Data label="Nombres">
        <Form.Field
          validators={{ onSubmit: FormSchemas.jefe.nombres }}
          // @ts-ignore
          name={`${index === undefined ? "jefe" : `family[${index}]`}.nombres`}
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
            index === undefined ? "jefe" : `family[${index}]`
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
        <Form.Field
          // @ts-ignore
          name={`${
            index === undefined ? "jefe" : `family[${index}]`
          }.fechaNacimiento`}
        >
          {(f) => (
            <div class="flex flex-col gap-1.5 w-full">
              <DatePicker
                {...useField(f)}
                variant="input-dash"
                class="w-full"
                max={deceso().date || undefined}
              />
              <Show
                when={
                  f().state.value &&
                  (!deceso().state || (deceso().state && deceso().date))
                }
              >
                <span class="flex items-center gap-1.5 fore">
                  {deceso().state ? "Vivió " : ""}
                  {yearsSinceDate({
                    dateString: f().state.value! as string,
                    showYears: true,
                    from: deceso().state ? new Date(deceso().date) : new Date(),
                  })}
                </span>
              </Show>
            </div>
          )}
        </Form.Field>
      </Data>
      <Show
        when={index === undefined}
        fallback={
          <Data label="Parentesco">
            <Form.Field name={`family[${index! as number}].parentesco`}>
              {(f) => (
                <Select
                  {...useField(f)}
                  options={PARENTESCOS}
                  variant="input-dash"
                  parseText={(value) =>
                    value
                      ? parseWithSex(
                          Form.state.values.family[index! as number].sexo,
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
              index === undefined ? "jefe" : `family[${index}]`
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
              index === undefined ? "jefe" : `family[${index}]`
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
  const { readOnly } = useContext(CedulaContext)!;

  return (
    <div
      class={`flex flex-col justify-between ${readOnly ? "gap-2" : "gap-3.5"}`}
    >
      <Show when={readOnly} fallback={<Editable />}>
        <ReadOnly />
      </Show>
    </div>
  );
};

export default LeftData;
