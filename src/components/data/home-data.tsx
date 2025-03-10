import { Show, useContext } from "solid-js";
import { useField } from "../../hooks/useField";
import { parseDir } from "../../lib/data";
import { FormSchemas } from "../../lib/form";
import { Form } from "../../pages/form";
import Data from "../cedula/data";
import Input from "../form/input";
import ExpectUnknown from "./expect-unknown";
import { HomesContext, HomesContextProvider } from "../../contexts/homes";
import { ComunalRecord, HomePath } from "../../types/form";
import WithIcon from "./with-icon";
import { Hash, Location, Path } from "../../icons/form";
import { checkNumCasa } from "../../lib/db";

const ReadOnly = () => {
  const { data } = useContext(HomesContext)!;

  return (
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-[auto_auto] gap-4 items-center justify-between">
        <WithIcon icon={Location} iconClass="!text-red-400">
          <Data label="Dirección" class="text-balance">
            <span class="first-letter:uppercase">
              {parseDir(data.calle, data.avenida)}
            </span>
          </Data>
        </WithIcon>
        <WithIcon icon={Hash}>
          <ExpectUnknown
            class="text-right mr-1.5"
            data={data.numCasa}
            label="Número de casa"
          >
            {data.numCasa}
          </ExpectUnknown>
        </WithIcon>
      </div>
      <ExpectUnknown
        label="Referencias"
        data={data.referencia}
        unknownMsg="Sin referencias"
      >
        {data.referencia}
      </ExpectUnknown>
    </div>
  );
};

const Editable = () => {
  const { index } = useContext(HomesContext)!;

  return (
    <div class="flex flex-col gap-5 justify-center justify-items-center">
      <div class="flex flex-wrap max-[550px]:*:w-full min-[550px]:grid grid-cols-[1fr_1fr_1fr] justify-between gap-5">
        <WithIcon icon={Hash}>
          <Data label="Número de casa">
            <Form.Field
              name={`homes[${index}].numCasa`}
              validators={{
                onSubmit: FormSchemas.homes.numCasa,
                onBlurAsync: async ({ value }) => {
                  const cedula = Form.state.values.jefe.cedula,
                    ori = Form.state.values.homes[index].oriId;

                  return (!ori || (ori && value !== ori)) &&
                    (await checkNumCasa(cedula, value as HomePath))
                    ? "El número de casa ingresado ya se encuentra registrado"
                    : undefined;
                },
              }}
              children={(f) => (
                <Input
                  {...useField(f)}
                  onlyDashNumbers
                  inputClass="w-full"
                  variant="input-dash"
                  type="text"
                />
              )}
            />
          </Data>
        </WithIcon>
        <WithIcon icon={Path} iconClass="">
          <Data label="Calle">
            <Form.Field
              name={`homes[${index}].calle`}
              validators={{
                // @ts-ignore
                onSubmit: FormSchemas.homes.calle,
              }}
              children={(f) => (
                <Input
                  {...useField(f)}
                  onlyDashNumbers
                  inputClass="w-full"
                  maxLength={5}
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
              name={`homes[${index}].avenida`}
              validators={{
                // @ts-ignore
                onSubmit: FormSchemas.homes.avenida,
              }}
              children={(f) => (
                <Input
                  {...useField(f)}
                  onlyDashNumbers
                  inputClass="w-full"
                  variant="input-dash"
                  maxLength={5}
                  type="text"
                />
              )}
            />
          </Data>
        </WithIcon>
      </div>
      <Data label="Referencias">
        <Form.Field
          name={`homes[${index}].referencia`}
          children={(f) => (
            <Input
              inputClass="w-full"
              variant="input-dash"
              {...useField(f)}
              type="text"
            />
          )}
        />
      </Data>
    </div>
  );
};

type HomesDataProps<R extends true | undefined> = {
  class?: string;
  readOnly?: R;
} & (R extends true
  ? { data: ComunalRecord["homes"][number] }
  : { index: number });

const HomeData = <R extends true | undefined>(props: HomesDataProps<R>) => (
  <div class={`!p-4 gray-container-100 ${props.class || ""}`}>
    <HomesContextProvider
      value={{
        readOnly: (props as HomesDataProps<true>).readOnly,
        index: (props as HomesDataProps<undefined>).index,
        data: (props as HomesDataProps<true>).data,
      }}
    >
      <Show
        when={(props as HomesDataProps<true>).readOnly}
        fallback={<Editable />}
      >
        <ReadOnly />
      </Show>
    </HomesContextProvider>
  </div>
);
export default HomeData;
