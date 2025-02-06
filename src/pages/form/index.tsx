import { Cancel, Tick } from "../../icons";
import { personData } from "../../constants";
import Btn from "../../components/btn";
import { FormTabs } from "./components/tabs";
import { createForm, ValidationError } from "@tanstack/solid-form";
import toast from "solid-toast";
import { FormSchema } from "../../lib/form";
import { oneliner } from "../../lib/utils";
import { ComunalRecord } from "../../types/form";

const defaultValues: ComunalRecord = {
  jefe: {
    ...personData(),
    tel: "",
    email: "",
    edoCivil: "",
    nivelEstudios: "",
  },
  home: {
    calle: "",
    avenida: "",
    referencia: "",
    numCasa: "",
  },
  family: [],
  carnet: { posee: null },
  clap: { posee: null, cantidad: 0 },
  gas: { posee: null, "10kg": 0, "18kg": 0, "27kg": 0, "43kg": 0 },
};

export const Form = createForm<ComunalRecord>(() => ({
  defaultValues,
}));

const Register = () => {
  return (
    <main
      class="flex flex-col gap-4 flex-1 p-3 pt-1 pb-4 overflow-auto"
      onsubmit={(e) => e.preventDefault()}
    >
      <FormTabs />
      <div class="sticky bottom-0 flex items-center justify-center mt-auto white gap-2 *:w-full">
        <Btn variant="outline" type="reset" form="form">
          <Cancel />
          Descartar
        </Btn>
        <Btn
          variant="primary"
          onClick={async () => {
            const [errors] = (await oneliner(
              Form.validateAllFields("blur")
            )) as [ValidationError[], null];

            if (errors.length)
              return toast.error("Hay errores en el formulario", {
                duration: 3000,
              });

            const [revalidation] = (await oneliner(
              FormSchema.safeParseAsync(Form.state.values)
            )) as [{ success: boolean }, null];

            if (!revalidation.success)
              return toast.error("Hay errores en el formulario", {
                duration: 3000,
              });
          }}
        >
          <Tick />
          Añadir
        </Btn>
      </div>
    </main>
  );
};
export default Register;
