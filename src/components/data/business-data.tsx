import { For, Show, useContext } from "solid-js";
import { useField } from "../../hooks/useField";
import { parseDir } from "../../lib/data";
import { Form } from "../../pages/form";
import Data from "../cedula/data";
import Input from "../form/input";
import { BusinessesSectionProps } from "./businesses";
import { FormSchemas } from "../../lib/form";
import Number from "../form/number";
import Menu, { Trigger, MenuContent } from "../dialog/dropdown-menu";
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { TIPOS_NEGOCIOS } from "../../constants";
import { CaretD, Check } from "../../icons";
import {
  BusinessesContext,
  BusinessesContextProvider,
} from "../../contexts/businesses";
import { ComunalRecord } from "../../types/form";
import { Hash, Location, Path, ShopFilled, Tag } from "../../icons/form";
import ExpectUnknown from "./expect-unknown";
import WithIcon from "./with-icon";
import { checkBName, checkRIF } from "../../lib/db";

const ReadOnly = () => {
  const { data } = useContext(BusinessesContext)!;

  return (
    <div class="grid grid-cols-2 gap-3 gap-y-4 *:nth-[odd]:ml-auto">
      <WithIcon
        class="col-span-2 font-[500] !ml-0 items-start"
        icon={ShopFilled}
        iconClass="text-cyan-700 dark:text-cyan-500"
      >
        <Data label="Nombre">{data.nombre}</Data>
      </WithIcon>
      <WithIcon icon={Tag}>
        <ExpectUnknown data={data.tipo} label="Tipo de negocio">
          {data.tipo}
        </ExpectUnknown>
      </WithIcon>
      <WithIcon icon={Hash}>
        <ExpectUnknown data={data.RIF} label="Número de RIF">
          {data.RIF.toLocaleString()}
        </ExpectUnknown>
      </WithIcon>
      <WithIcon icon={Location} class="col-span-2" iconClass="!text-red-400">
        <Data class="first-letter:uppercase" label="Dirección">
          {parseDir(data.calle, data.avenida)}
        </Data>
      </WithIcon>
    </div>
  );
};

const Editable = () => {
  const { index } = useContext(BusinessesContext)!;

  return (
    <div class="flex flex-col gap-5">
      <WithIcon icon={ShopFilled} iconClass="text-cyan-700 dark:text-cyan-500">
        <Data label="Nombre">
          <Form.Field
            name={`businesses[${index}].nombre`}
            validators={{
              // @ts-ignore
              onSubmit: FormSchemas.businesses.nombre,
              onBlurAsync: async ({ value }) => {
                const oriNombre = Form.state.values.businesses[index].oriNombre;

                return value !== oriNombre && (await checkBName(value))
                  ? "El nombre ingresado ya se encuentra registrado"
                  : undefined;
              },
            }}
          >
            {(f) => (
              <Input
                inputClass="w-full"
                {...useField(f)}
                variant="input-dash"
              />
            )}
          </Form.Field>
        </Data>
      </WithIcon>

      <WithIcon icon={Tag}>
        <Data label="Tipo de negocio" class="gap-2">
          <Form.Field name={`businesses[${index}].tipo`}>
            {(f) => (
              <div class="grid grid-cols-[1fr_auto] gap-4 items-center">
                <Input
                  {...useField(f)}
                  onlyLetters
                  inputClass="w-full"
                  variant="input-dash"
                />

                <Menu>
                  <Trigger class="flex items-center gap-1.5 input-dash gray">
                    Ver sugerencias
                    <CaretD />
                  </Trigger>
                  <MenuContent>
                    <DropdownMenu.RadioGroup
                      class="flex flex-col gap-1.5 max-h-[300px] p-1 overflow-y-auto"
                      value={f().state.value}
                      onChange={f().handleChange}
                    >
                      <For each={TIPOS_NEGOCIOS}>
                        {(t) => (
                          <DropdownMenu.RadioItem
                            class="flex items-center justify-between gap-2 p-0.75 px-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#333] data-checked:bg-neutral-100 data-checked:dark:bg-[hsl(0,0%,18%)] cursor-pointer first-letter:capitalize transition-colors"
                            value={t}
                          >
                            {t}
                            <DropdownMenu.ItemIndicator>
                              <Check class="h-[1.2em]" />
                            </DropdownMenu.ItemIndicator>
                          </DropdownMenu.RadioItem>
                        )}
                      </For>
                    </DropdownMenu.RadioGroup>
                  </MenuContent>
                </Menu>
              </div>
            )}
          </Form.Field>
        </Data>
      </WithIcon>

      <WithIcon icon={Hash}>
        <Data label="Número de RIF">
          <Form.Field
            name={`businesses[${index}].RIF`}
            validators={{
              // @ts-ignore
              onSubmit: FormSchemas.businesses.RIF,
              onBlurAsync: async ({ value }) => {
                const oriRIF = Form.state.values.businesses[index].oriRIF;

                return value !== oriRIF && (await checkRIF(value as number))
                  ? "El RIF ingresado ya se encuentra registrado"
                  : undefined;
              },
            }}
          >
            {(f) => <Number {...useField(f)} variant="input-dash" />}
          </Form.Field>
        </Data>
      </WithIcon>

      <div class="flex gap-5 w-full *:w-full">
        <WithIcon icon={Path}>
          <Data label="Calle">
            <Form.Field
              name={`businesses[${index}].calle`}
              validators={{
                // @ts-ignore
                onSubmit: FormSchemas.businesses.calle,
              }}
              children={(f) => (
                <Input
                  {...useField(f)}
                  onlyDashNumbers
                  maxLength={5}
                  inputClass="w-full"
                  variant="input-dash"
                  type="text"
                />
              )}
            />
          </Data>
        </WithIcon>
        <WithIcon icon={Path}>
          <Data label="Avenida">
            <Form.Field
              name={`businesses[${index}].avenida`}
              validators={{
                // @ts-ignore
                onSubmit: FormSchemas.businesses.avenida,
              }}
              children={(f) => (
                <Input
                  {...useField(f)}
                  onlyDashNumbers
                  maxLength={5}
                  inputClass="w-full"
                  variant="input-dash"
                  type="text"
                />
              )}
            />
          </Data>
        </WithIcon>
      </div>
    </div>
  );
};

type BusinessDataProps<R extends true | undefined> = Omit<
  BusinessesSectionProps<R>,
  "data"
> & {
  class?: string;
  data: ComunalRecord["businesses"][number];
} & (R extends true ? { index: number } : {});

const BusinessData = <R extends true | undefined>(
  props: BusinessDataProps<R>
) => {
  return (
    <div class={`!p-4 gray-container-100 ${props.class || ""}`}>
      <BusinessesContextProvider
        value={{
          readOnly: props.readOnly,
          index: (props as BusinessDataProps<true>).index,
          data: props.data,
        }}
      >
        <Show when={props.readOnly} fallback={<Editable />}>
          <ReadOnly />
        </Show>
      </BusinessesContextProvider>
    </div>
  );
};
export default BusinessData;
