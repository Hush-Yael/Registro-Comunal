import { Show } from "solid-js";
import { Form } from "../../pages/form";
import { EDOS_CIVIL, NIVELES_ESTUDIOS, PARENTESCOS } from "../../constants";
import Data from "./data";
import Input from "../input";
import { useField } from "../../hooks/useField";
import Age from "../edad";
import Select from "../select";
import { parseWithSex, plural, yearsSinceDate } from "../../lib/utils";
import { DBComunalRecord } from "../../types/db";
import { FormSchemas } from "../../lib/form";
import ExpectUnknown from "../data/expect-unknown";
import Dash from "../dash";

type Props<
  R extends true | undefined,
  F extends number | undefined = undefined
> = {
  class?: string;
  familiar?: F;
} & (R extends true
  ? { readOnly: R } & (F extends undefined
      ? { data: DBComunalRecord<"jefe"> }
      : { data: DBComunalRecord<"family">[number] })
  : {});

const ReadOnly = <F extends number | undefined>(props: Props<true, F>) => (
  <>
    <Data readOnly={props.readOnly} label="Nombres">
      <span>{props.data.nombres}</span>
    </Data>
    <Data readOnly={props.readOnly} label="Apellidos">
      <span>{props.data.apellidos}</span>
    </Data>
    <Age
      age={
        // @ts-ignore
        props.data.edad ||
        (props.data.fechaNacimiento &&
          yearsSinceDate(props.data.fechaNacimiento))
      }
      date={props.data.fechaNacimiento}
    />
    <Show
      when={props.familiar === undefined}
      fallback={
        <ExpectUnknown
          data={(props as Props<true, number>).data.parentesco}
          label="Parentesco"
        >
          <span>
            {parseWithSex(
              props.data.sexo || "",
              (props as Props<true, number>).data.parentesco
            )}
          </span>
        </ExpectUnknown>
      }
    >
      <ExpectUnknown
        data={(props as Props<true>).data.edoCivil}
        label="Estado civil"
      >
        <span>
          {(props as Props<true>).data.edoCivil
            ? parseWithSex(
                (props as Props<true>).data.sexo,
                (props as Props<true>).data.edoCivil
              )
            : "Desconocido"}
        </span>
      </ExpectUnknown>
      <ExpectUnknown
        data={(props as Props<true>).data.nivelEstudios}
        label="Nivel de estudios"
      >
        <span>{(props as Props<true>).data.nivelEstudios}</span>
      </ExpectUnknown>
    </Show>
  </>
);

const Editable = (props: Pick<Props<undefined>, "familiar">) => (
  <>
    <Data label="Nombres">
      <Form.Field
        validators={{ onSubmit: FormSchemas.jefe.nombres }}
        // @ts-ignore
        name={`${
          props.familiar === undefined ? "jefe" : `family[${props.familiar}]`
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
          props.familiar === undefined ? "jefe" : `family[${props.familiar}]`
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
      <div class="flex items-center gap-1.5 w-full">
        <Form.Field
          // @ts-ignore
          name={`${
            props.familiar === undefined ? "jefe" : `family[${props.familiar}]`
          }.fechaNacimiento`}
        >
          {(f) => (
            <>
              <Input
                {...useField(f)}
                class="flex-1"
                inputClass="min-w-full"
                variant="input-dash"
                type="date"
              />
              <Show when={f().state.value}>
                <span class="flex items-center gap-1.5">
                  <Dash />
                  {(() => {
                    const age = yearsSinceDate(
                      Form.state.values.jefe.fechaNacimiento!
                    );

                    return `${age} ${plural("año", age)}`;
                  })()}
                </span>
              </Show>
            </>
          )}
        </Form.Field>
      </div>
    </Data>
    <Show
      when={props.familiar === undefined}
      fallback={
        <Data label="Parentesco">
          <Form.Field name={`family[${props.familiar! as number}].parentesco`}>
            {(f) => (
              <Select
                {...useField(f)}
                options={PARENTESCOS}
                variant="input-dash"
                parseText={(value) =>
                  value
                    ? parseWithSex(
                        Form.state.values.family[props.familiar! as number]
                          .sexo,
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
            props.familiar === undefined ? "jefe" : `family[${props.familiar}]`
          }.edoCivil`}
        >
          {(f) => (
            <Select
              {...useField(f)}
              variant="input-dash"
              parseText={(value) =>
                value ? parseWithSex(Form.state.values.jefe.sexo, value) : null
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
            props.familiar === undefined ? "jefe" : `family[${props.familiar}]`
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

const LeftData = <R extends true | undefined>(props: Props<R>) => {
  return (
    <div
      class={`flex flex-col justify-between ${
        (props as Props<true>).readOnly ? "gap-1" : "gap-3.5"
      }`}
    >
      <Show
        when={(props as Props<true>).readOnly}
        fallback={<Editable familiar={(props as Props<undefined>).familiar} />}
      >
        <ReadOnly
          readOnly
          data={(props as Props<true>).data}
          familiar={props.familiar}
        />
      </Show>
    </div>
  );
};

export default LeftData;
