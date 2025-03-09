import { JSX, Show } from "solid-js";
import { GasFilled, BoxFilled, IdFilled } from "../../icons";
import { ComunalRecord } from "../../types/form";
import Answer from "./answer";
import Data from "../cedula/data";
import SectionTitle from "../layout/section-title";
import { Form } from "../../pages/form";
import YesNo from "../form/yes-no";
import { useField } from "../../hooks/useField";
import Number from "../form/number";
import WithIcon from "./with-icon";

type ProgramsProps<R extends true | undefined> = R extends true
  ? {
      readOnly?: R;
      data: {
        carnet: ComunalRecord["carnet"];
        clap: ComunalRecord["clap"];
        gas: ComunalRecord["gas"];
      };
    }
  : {};

const Container = (props: {
  class?: string;
  label: JSX.Element;
  labelClass?: string;
  children: JSX.Element;
}) => (
  <div class={props.class}>
    <span
      class={`flex items-center gap-2 font-[500] ${props.labelClass || ""}`}
    >
      {props.label}
    </span>
    {props.children}
  </div>
);

const ReadOnly = (props: Pick<ProgramsProps<true>, "data">) => (
  <>
    <Container
      class="flex justify-between"
      label={
        <WithIcon icon={IdFilled} iconClass="inset-2 !text-emerald-500">
          ¿Posee Carnet de la patria?
        </WithIcon>
      }
    >
      <Answer value={props.data.carnet.posee} />
    </Container>
    <Container
      class="flex flex-col gap-2 !py-3"
      label={
        <WithIcon
          icon={BoxFilled}
          iconClass="!text-cyan-500"
          class="flex items-center font-[500]"
        >
          Bolsa o caja del clap
        </WithIcon>
      }
    >
      <div class="flex justify-between text-center">
        <Data label="Posee">
          <Answer value={props.data.clap.posee} />
        </Data>
        <Data label="cantidad">
          {props.data.clap.posee ? (
            props.data.clap.cantidad
          ) : (
            <span class="fore">—</span>
          )}
        </Data>
      </div>
    </Container>
    <Container
      class="flex flex-col gap-2"
      label={
        <WithIcon
          icon={GasFilled}
          iconClass="inset-2 translate-x-0.5 !text-purple-400"
        >
          Gas
        </WithIcon>
      }
    >
      <div class="flex justify-between text-center">
        <Data label="Posee">
          <Answer value={props.data.gas.posee} />
        </Data>
        <Data label="10kg">{props.data.gas["10kg"]}</Data>
        <Data label="18kg">{props.data.gas["18kg"]}</Data>
        <Data label="27kg">{props.data.gas["27kg"]}</Data>
        <Data label="43kg">{props.data.gas["43kg"]}</Data>
        <Data label="Total">
          {props.data.gas.posee ? (
            props.data.gas.total
          ) : (
            <span class="fore">—</span>
          )}
        </Data>
      </div>
    </Container>
  </>
);

const Editable = () => {
  return (
    <>
      <Container
        class="flex justify-between"
        label={
          <WithIcon icon={IdFilled} iconClass="inset-2 !text-emerald-500">
            ¿Posee Carnet de la Patria?
          </WithIcon>
        }
      >
        <Form.Field
          name="carnet.posee"
          children={(f) => <YesNo {...useField(f)} />}
        />
      </Container>

      <div class="flex flex-col gap-4">
        <WithIcon
          icon={BoxFilled}
          iconClass="!text-cyan-500"
          class="flex items-center font-[500]"
        >
          ¿Es beneficiado de la bolsa / caja del clap?
        </WithIcon>

        <Form.Field
          name="clap.posee"
          children={(f) => (
            <div class="flex items-center justify-between">
              <Data class="gap-1" label="Respuesta">
                <YesNo {...useField(f)} />
              </Data>
              <Form.Field
                name="clap.cantidad"
                children={(subF) => (
                  <Number
                    class="flex flex-col gap-2"
                    wrapperClass="gap-2"
                    label="Número de bolsas o cajas"
                    variant="input-dash"
                    type="number"
                    min={1}
                    disabled={!f().state.value}
                    {...useField(subF)}
                  />
                )}
              />
            </div>
          )}
        />
      </div>

      <div class="flex flex-col gap-7">
        <Form.Field
          name="gas.posee"
          children={(f) => (
            <>
              <Container
                class="flex justify-between"
                label={
                  <WithIcon
                    icon={GasFilled}
                    iconClass="inset-2 translate-x-0.5 !text-purple-400"
                  >
                    ¿Es beneficiado por el gas comunal?
                  </WithIcon>
                }
              >
                <Data class="gap-1" label="Respuesta">
                  <YesNo {...useField(f)} />
                </Data>
              </Container>
              <div class="flex justify-between text-center *:gap-2">
                <Data label="10kg">
                  <Form.Field
                    name="gas.10kg"
                    children={(subF) => (
                      <Number
                        disabled={!f().state.value}
                        class="w-[7ch]"
                        variant="input-dash"
                        {...useField(subF)}
                      />
                    )}
                  />
                </Data>
                <Data label="18kg">
                  <Form.Field
                    name="gas.18kg"
                    children={(subF) => (
                      <Number
                        disabled={!f().state.value}
                        class="w-[7ch]"
                        variant="input-dash"
                        {...useField(subF)}
                      />
                    )}
                  />
                </Data>
                <Data label="27kg">
                  <Form.Field
                    name="gas.27kg"
                    children={(subF) => (
                      <Number
                        disabled={!f().state.value}
                        class="w-[7ch]"
                        variant="input-dash"
                        {...useField(subF)}
                      />
                    )}
                  />
                </Data>
                <Data label="43kg">
                  <Form.Field
                    name="gas.43kg"
                    children={(subF) => (
                      <Number
                        disabled={!f().state.value}
                        class="w-[7ch]"
                        variant="input-dash"
                        {...useField(subF)}
                      />
                    )}
                  />
                </Data>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
};

const Programs = <R extends true | undefined>(props: ProgramsProps<R>) => (
  <section class="col-[2/3] row-[1/3]">
    <article class="py-3">
      <div
        class={`gray-container-100 flex flex-col ${
          !(props as ProgramsProps<true>).readOnly
            ? "*:p-3"
            : "!py-0 *:p-2 *:py-4"
        }  div-y-neutral`}
      >
        <Show
          when={(props as ProgramsProps<true>).readOnly}
          fallback={<Editable />}
        >
          <SectionTitle>Programas sociales</SectionTitle>
          <ReadOnly data={(props as ProgramsProps<true>).data} />
        </Show>
      </div>
    </article>
  </section>
);
export default Programs;
