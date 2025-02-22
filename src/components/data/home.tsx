import { parseDir } from "../../lib/data";
import Data from "../cedula/data";
import SectionTitle from "../section-title";
import { Home } from "../../icons/aside";
import { ComunalRecord } from "../../types/form";
import { Show } from "solid-js";
import { Form } from "../../pages/form";
import Input from "../input";
import { useField } from "../../hooks/useField";
import { FormSchemas } from "../../lib/form";
import ExpectUnknown from "./expect-unknown";

type HomeDataProps<R extends true | undefined> = R extends true
  ? {
      readOnly: true;
      data: ComunalRecord["home"];
    }
  : {};

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

const HomeData = <R extends true | undefined>(props: HomeDataProps<R>) => {
  return (
    <section class="col-[2/3] row-[1/2]">
      <SectionTitle>
        Información de residencia
        <Home />
      </SectionTitle>
      <article class="py-3 items-center gap-4">
        <div
          class={`${
            (props as HomeDataProps<true>).readOnly
              ? "flex flex-wrap"
              : "grid grid-cols-2 *:m-auto"
          } gap-x-4 gap-y-1 justify-between gray-container-100 !p-3`}
        >
          <Show
            when={(props as HomeDataProps<true>).readOnly}
            fallback={<Editable />}
          >
            <ReadOnly data={(props as HomeDataProps<true>).data} />
          </Show>
        </div>
      </article>
    </section>
  );
};
export default HomeData;
