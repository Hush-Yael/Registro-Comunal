import { Dialog } from "@kobalte/core";
import Alert from "../../../components/layout/alert";
import Modal from "../../../components/dialog/modal";
import { Drop, Export } from "../../../icons/home";
import { emptyDB, createBackup } from "../../../lib/db";
import Container from "./container";
import Btn from "./db-btn";
import { open } from "@tauri-apps/plugin-dialog";
import toast from "solid-toast";
import { setShouldLoadAll } from "../../records";

const Manejo = () => (
  <Container>
    <Modal
      trigger={
        <Dialog.Trigger
          // @ts-ignore
          as={(p) => (
            <Btn variant="danger" {...p}>
              <Drop class="!h-[1.5em]" /> Borrar datos
            </Btn>
          )}
        />
      }
      onSubmit={() => {
        toast.promise(emptyDB(), {
          loading: "Eliminando datos...",
          success: "Se han eliminado los datos",
          error: (e) => {
            console.log(e);
            return "Error al eliminar los datos";
          },
        });
        setShouldLoadAll(true);
      }}
      title={
        <>
          <Drop class="inline mr-2 align-sub" />
          Eliminar datos
        </>
      }
      center
    >
      <Alert variant="alert">
        Esta acción eliminará todos los datos actuales, dejando la base de datos
        vacía.
      </Alert>
      <Alert variant="warning">
        Si hay datos que desea conservar, asegúrese de antes haber hecho una
        copia de seguridad.
      </Alert>
    </Modal>
    <Btn
      onClick={async () => {
        const path = await open({ directory: true });
        if (path === null) return toast("Se canceló la operación");

        toast.promise(createBackup(path), {
          loading: "Generando copia de seguridad...",
          success: "Se ha creado la copia de seguridad",
          error: "Error al crear la copia de seguridad",
        });
      }}
    >
      <Export class="!h-[1.5em]" /> Exportar datos
    </Btn>
  </Container>
);
export default Manejo;
