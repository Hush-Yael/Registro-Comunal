import { Show } from "solid-js";
import { useField } from "../../hooks/useField";
import { FormSchemas } from "../../lib/form";
import { Form } from "../../pages/form";
import { ComunalRecord } from "../../types/form";
import { CedulaProps } from "../cedula";
import Data from "../cedula/data";
import Input from "../input";
import Email from "./email";
import ExpectUnknown from "./expect-unknown";
import Tel from "./tel";

type ContactProps<R extends true | undefined> = R extends true
  ? {
      readOnly: R;
      data: {
        tel: ComunalRecord["jefe"]["tel"];
        email: ComunalRecord["jefe"]["email"];
      };
    }
  : {};

const ReadOnly = (props: Pick<ContactProps<true>, "data">) => (
  <>
    <ExpectUnknown data={props.data.tel} label="teléfono">
      <Tel data={props.data.tel} />
    </ExpectUnknown>
    <ExpectUnknown data={props.data.email} label="correo">
      <Email data={props.data.email} />
    </ExpectUnknown>
  </>
);

const Editable = () => (
  <>
    <Data label="teléfono">
      <Form.Field name="jefe.tel">
        {(f) => <Input {...useField(f)} onlyDashNumbers variant="input-dash" />}
      </Form.Field>
    </Data>
    <Data label="correo">
      <Form.Field
        name="jefe.email"
        validators={{
          // @ts-ignore
          onSubmit: FormSchemas.jefe.email,
        }}
      >
        {(f) => <Input variant="input-dash" {...useField(f)} type="email" />}
      </Form.Field>
    </Data>
  </>
);

const Contact = <R extends true | undefined>(props: ContactProps<R>) => (
  <article class="flex flex-col gap-2 !px-3 gray-container-100">
    <h3 class="flex-1 p-1 text-center bg-neutral-200 dark:bg-neutral-900 rounded-xl">
      Información de contacto
    </h3>
    <div class="flex flex-wrap gap-2 justify-between">
      <Show
        when={(props as CedulaProps<true>).readOnly}
        fallback={<Editable />}
      >
        <ReadOnly data={(props as CedulaProps<true>).data} />
      </Show>
    </div>
  </article>
);

export default Contact;
