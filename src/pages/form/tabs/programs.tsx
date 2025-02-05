import { Form } from "..";
import Number from "../../../components/number";
import Specify from "../../../components/specify";
import YesNo from "../../../components/yes-no";
import { useField } from "../../../hooks/useField";

const Programs = () => {
  return (
    <>
      <Form.Field
        name="carnet.posee"
        children={(f) => (
          <YesNo
            legend="¿Posee Carnet de la Patria?"
            name="carnet"
            {...useField(f)}
          />
        )}
      />

      <Form.Field
        name="clap.posee"
        children={(f) => (
          // @ts-expect-error ya se obtiene el name
          <Specify
            legend="¿Le llega bolsa / caja del clap?"
            {...useField(f, false, true)}
            specify={
              <Form.Field
                name="clap.cantidad"
                children={(subF) => (
                  <Number
                    label="Número de bolsas o cajas"
                    type="number"
                    min={1}
                    {...useField(subF)}
                  />
                )}
              />
            }
          />
        )}
      />

      <Form.Field
        name="gas.posee"
        children={(f) => (
          // @ts-expect-error ya se obtiene el name
          <Specify
            legend="¿Es beneficiado por el gas comunal?"
            {...useField(f, false, true)}
            specify={
              <>
                <Form.Field
                  name="gas.10kg"
                  children={(subF) => (
                    <Number label="Bombonas de 10kg" {...useField(subF)} />
                  )}
                />
                <Form.Field
                  name="gas.18kg"
                  children={(subF) => (
                    <Number label="Bombonas de 18kg" {...useField(subF)} />
                  )}
                />
                <Form.Field
                  name="gas.27kg"
                  children={(subF) => (
                    <Number label="Bombonas de 27kg" {...useField(subF)} />
                  )}
                />
                <Form.Field
                  name="gas.43kg"
                  children={(subF) => (
                    <Number label="Bombonas de 43kg" {...useField(subF)} />
                  )}
                />
              </>
            }
          />
        )}
      />
    </>
  );
};
export default Programs;
