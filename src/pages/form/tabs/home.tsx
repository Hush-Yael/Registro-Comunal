import { Form } from "..";
import Input from "../../../components/input";
import PathInput from "../../../components/path-input";
import { useField } from "../../../hooks/useField";
import { FormSchemas } from "../../../lib/form";

const Home = () => {
  return (
    <>
      <Form.Field
        name="home.numCasa"
        children={(f) => (
          <Input {...useField(f)} label="Numero de casa" type="text" />
        )}
      />

      <Form.Field
        name="home.calle"
        validators={{
          // @ts-ignore
          onBlur: FormSchemas.home.calle,
        }}
        children={(f) => (
          <PathInput
            {...useField(f)}
            pathType="calle"
            label="Calle"
            type="text"
          />
        )}
      />

      <Form.Field
        name="home.avenida"
        validators={{
          // @ts-ignore
          onBlur: FormSchemas.home.avenida,
        }}
        children={(f) => (
          <PathInput
            {...useField(f)}
            pathType="avenida"
            label="Avenida"
            type="text"
          />
        )}
      />

      <Form.Field
        name="home.referencia"
        children={(f) => (
          <Input {...useField(f)} label="Alguna referencia" type="text" />
        )}
      />
    </>
  );
};
export default Home;
