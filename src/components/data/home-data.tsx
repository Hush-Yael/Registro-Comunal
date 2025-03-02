import { Show } from "solid-js";
import { useField } from "../../hooks/useField";
import { parseDir } from "../../lib/data";
import { FormSchemas } from "../../lib/form";
import { Form } from "../../pages/form";
import Data from "../cedula/data";
import Input from "../input";
import ExpectUnknown from "./expect-unknown";
import { HomeDataProps } from "./home";

const ReadOnly = (props: Pick<HomeDataProps<true>, "data">) => (
  <>
    <ExpectUnknown
      data={(props as HomeDataProps<true>).data.numCasa}
      label="Número de casa"
    >
      {(props as HomeDataProps<true>).data.numCasa}
    </ExpectUnknown>

    <Data class="text-right" label="Dirección">
      <span class="first-letter:uppercase">
        {parseDir(
          (props as HomeDataProps<true>).data.calle,
          (props as HomeDataProps<true>).data.avenida
        )}
      </span>
    </Data>

    <ExpectUnknown
      label="Referencias"
      data={(props as HomeDataProps<true>).data.referencia}
      unknownMsg="Sin referencias"
    >
      {(props as HomeDataProps<true>).data.referencia}
    </ExpectUnknown>
  </>
);

const Editable = () => (
  <>
    <Data label="Número de casa">
      <Form.Field
        name="home.numCasa"
        validators={{
          onSubmit: FormSchemas.home.numCasa,
        }}
        children={(f) => (
          <Input
            {...useField(f)}
            onlyDashNumbers
            variant="input-dash"
            type="text"
          />
        )}
      />
    </Data>

    <Data label="Calle">
      <Form.Field
        name="home.calle"
        validators={{
          // @ts-ignore
          onSubmit: FormSchemas.home.calle,
        }}
        children={(f) => (
          <Input
            {...useField(f)}
            onlyDashNumbers
            maxLength={5}
            variant="input-dash"
            type="text"
          />
        )}
      />
    </Data>
    <Data label="Avenida">
      <Form.Field
        name="home.avenida"
        validators={{
          // @ts-ignore
          onSubmit: FormSchemas.home.avenida,
        }}
        children={(f) => (
          <Input
            {...useField(f)}
            onlyDashNumbers
            variant="input-dash"
            maxLength={5}
            type="text"
          />
        )}
      />
    </Data>

    <Data label="Referencias">
      <Form.Field
        name="home.referencia"
        children={(f) => (
          <Input variant="input-dash" {...useField(f)} type="text" />
        )}
      />
    </Data>
  </>
);

const HomeData = <R extends true | undefined>(props: HomeDataProps<R>) => (
  <Show when={(props as HomeDataProps<true>).readOnly} fallback={<Editable />}>
    <ReadOnly data={(props as HomeDataProps<true>).data} />
  </Show>
);
export default HomeData;
