import { Import, Restore as RestoreIcon } from "../../../icons/home";
import Alert from "../../../components/alert";
import { open } from "@tauri-apps/plugin-dialog";
import { restoreDefaultData, restoreFromFile } from "../../../lib/db";
import Btn from "./db-btn";
import Container from "./container";
import Modal from "../../../components/modal";
import { Dialog } from "@kobalte/core";
import toast from "solid-toast";

const Restore = () => {
  return (
    <section class="flex flex-col gap-3">
      <Container>
        <Modal
          trigger={
            <Dialog.Trigger
              // @ts-ignore
              as={(p) => (
                <Btn variant="alert" {...p}>
                  <RestoreIcon class="!h-[.9em]" />
                  Datos iniciales
                </Btn>
              )}
            />
          }
          onSubmit={() =>
            toast.promise(restoreDefaultData(), {
              loading: "Restaurando datos iniciales...",
              success: "Los datos iniciales fueron restaurados",
              error: "Error al restaurar los datos iniciales",
            })
          }
          title={
            <>
              <RestoreIcon class="inline !h-[.9em] mr-2" />
              Restaurar datos iniciales
            </>
          }
          center
        >
          <Alert variant="info" class="px-2">
            Estos fueron recolectados por los estudiantes durante el censo,
            antes del desarrollo de la aplicación.
          </Alert>
          <Alert class="mt-auto" variant="alert">
            La mayoría de ellos pueden estar desactualizados o incompletos
          </Alert>
        </Modal>
        <Btn
          onClick={async () => {
            const path = await open({
              filters: [
                {
                  name: "DB",
                  extensions: ["db"],
                },
              ],
            });

            if (path === null) return;
            toast.promise(restoreFromFile(path), {
              loading: "Restaurando copia de seguridad...",
              success: "Se restauró la copia de seguridad",
              error: "Error al restaurar la copia de seguridad",
            });
          }}
        >
          <Import />
          Subir archivo
        </Btn>
      </Container>
    </section>
  );
};
export default Restore;
