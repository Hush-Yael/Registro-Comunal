import { Show } from "solid-js";
import { useField } from "../../hooks/useField";
import { FormSchemas } from "../../lib/form";
import { Form } from "../../pages/form";
import { ComunalRecord } from "../../types/form";
import { CedulaProps } from "../cedula";
import Data from "../cedula/data";
import Input from "../form/input";
import Email from "./email";
import { Email as EmailIcon } from "../../icons";
import ExpectUnknown from "./expect-unknown";
import Tel from "./tel";
import { Tel as TelIcon } from "../../icons";
import WithIcon from "./with-icon";

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
    <WithIcon class="w-full overflow-auto" icon={TelIcon}>
      <ExpectUnknown data={props.data.tel} label="teléfono">
        <Tel data={props.data.tel} />
      </ExpectUnknown>
    </WithIcon>
    <WithIcon class="w-full overflow-auto" icon={EmailIcon}>
      <ExpectUnknown data={props.data.email} label="correo">
        <Email data={props.data.email} />
      </ExpectUnknown>
    </WithIcon>
  </>
);

const Editable = () => (
  <>
    <WithIcon class="w-full overflow-auto" icon={TelIcon}>
      <Data label="teléfono">
        <Form.Field name="jefe.tel">
          {(f) => (
            <Input
              inputClass="w-full"
              {...useField(f)}
              onlyDashNumbers
              variant="input-dash"
            />
          )}
        </Form.Field>
      </Data>
    </WithIcon>
    <WithIcon class="w-full overflow-auto" icon={EmailIcon} iconClass="inset-2">
      <Data label="correo">
        <Form.Field
          name="jefe.email"
          validators={{
            // @ts-ignore
            onSubmit: FormSchemas.jefe.email,
          }}
        >
          {(f) => (
            <Input
              inputClass="w-full"
              {...useField(f)}
              type="email"
              variant="input-dash"
            />
          )}
        </Form.Field>
      </Data>
    </WithIcon>
  </>
);

const Contact = <R extends true | undefined>(props: ContactProps<R>) => (
  <article class="flex flex-col gap-4 !px-3 gray-container-100">
    <h3 class="flex-1 p-1 rounded-lg bg-[#eaeaea] dark:bg-[#333333] text-center font-bold text-xl">
      Información de contacto
    </h3>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 justify-between">
      <Show
        when={(props as CedulaProps<true>).readOnly}
        fallback={<Editable />}
      >
        <ReadOnly data={(props as ContactProps<true>).data} />
      </Show>
    </div>
  </article>
);

export default Contact;
