import { createSignal } from "solid-js";
import { Form } from "..";
import Cedula from "../../../components/cedula";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { EDOS_CIVIL, NIVELES_ESTUDIOS, Sex, SEXES } from "../../../constants";
import { useField } from "../../../hooks/useField";
import { parseWithSex } from "../../../lib/utils";
import { FormSchemas } from "../../../lib/form";
import { checkCedula } from "../../../lib/db";

const Jefe = () => {
  const [sexo, setSexo] = createSignal<Sex | "">(Form.state.values.jefe.sexo);
  const [ven, setVen] = createSignal(Form.state.values.jefe.venezolano);

  Form.store.subscribe(() => {
    setVen(Form.store.state.values.jefe.venezolano);
    setSexo(Form.store.state.values.jefe.sexo);
  });

  return (
    <>
      <Form.Field
        name="jefe.cedula"
        validators={{
          onBlur: FormSchemas.jefe.cedula,
          onBlurAsync: async ({ value }) => {
            return (await checkCedula(value))
              ? "La cédula ingresada ya se encuentra registrada"
              : undefined;
          },
        }}
        children={(f) => (
          <Cedula
            {...useField(f)}
            ven={ven()}
            onVenChange={(value) =>
              Form.setFieldValue("jefe.venezolano", value)
            }
          />
        )}
      />

      <Form.Field
        validators={{
          onBlur: FormSchemas.jefe.nombres,
        }}
        name="jefe.nombres"
        children={(f) => <Input {...useField(f)} label="Nombres" />}
      />

      <Form.Field
        validators={{ onBlur: FormSchemas.jefe.nombres }}
        name="jefe.apellidos"
        children={(f) => (
          <Input {...useField(f)} label="Apellidos" type="text" />
        )}
      />

      <Form.Field
        validators={{
          onBlur: FormSchemas.jefe.sexo,
        }}
        name="jefe.sexo"
        children={(f) => (
          <Select
            {...useField(f, true)}
            label="Sexo"
            options={SEXES}
            useObject
          />
        )}
      />

      <Form.Field
        name="jefe.fechaNacimiento"
        children={(f) => (
          <Input {...useField(f)} label="Fecha de nacimiento" type="date" />
        )}
      />

      <Form.Field
        name="jefe.tel"
        children={(f) => <Input {...useField(f)} label="Teléfono" type="tel" />}
      />

      <Form.Field
        name="jefe.email"
        children={(f) => <Input {...useField(f)} label="Correo" type="email" />}
      />

      <Form.Field
        name="jefe.edoCivil"
        children={(f) => (
          <Select
            {...useField(f)}
            parseOptionText={(value) => parseWithSex(sexo(), value)}
            label="Estado civil"
            options={EDOS_CIVIL}
          />
        )}
      />

      <Form.Field
        name="jefe.nivelEstudios"
        children={(f) => (
          <Select
            {...useField(f)}
            label="Nivel de estudios"
            options={NIVELES_ESTUDIOS}
          />
        )}
      />
    </>
  );
};
export default Jefe;
