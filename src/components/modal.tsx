import { Dialog } from "@kobalte/core/dialog";
import { createEffect, createSignal, JSX, Show } from "solid-js";

type DialogProps = {
  defaultOpen?: boolean;
  class?: string;
  contentClass?: string;
  trigger: JSX.Element;
  title?: JSX.Element;
  description?: JSX.Element;
  children: JSX.Element;
  alert?: boolean;
  onSubmit?: (() => void) | (() => Promise<void>);
};

export const Overlay = (props: { children: JSX.Element }) => (
  <Dialog.Portal>
    <Dialog.Overlay>
      <div class="fixed z-50 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
        {props.children}
      </div>
    </Dialog.Overlay>
  </Dialog.Portal>
);

export const ModalContent = (props: {
  class?: string;
  contentClass?: string;
  alert?: boolean;
  children: JSX.Element;
}) => (
  <Dialog.Content
    onInteractOutside={(e) => {
      if (submitting()) e.preventDefault();
    }}
    onEscapeKeyDown={(e) => {
      if (submitting()) e.preventDefault();
    }}
    class={`relative dialog-content w-90 max-w-[400px]  ${props.class || ""}`}
    role={props.alert ? "alertdialog" : "dialog"}
  >
    <div class={`flex flex-col gap-3 p-3 ${props.contentClass || ""}`}>
      {props.children}
    </div>
  </Dialog.Content>
);

export const CloseBtn = (props: JSX.IntrinsicElements["button"]) => (
  <Dialog.CloseButton class="absolute z-1 top-2 right-2" {...props}>
    <svg class="fore" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
    </svg>
  </Dialog.CloseButton>
);

const [submitting, setSubmitting] = createSignal(false);

const Modal = (props: DialogProps) => {
  const [open, setOpen] = createSignal(props.defaultOpen || false);

  createEffect(() => {
    if (!open()) setSubmitting(false);
  });

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      {props.trigger}
      <Overlay>
        <ModalContent
          alert={props.alert}
          class={props.class}
          contentClass={props.contentClass}
        >
          {props.title && (
            <Dialog.Title class="text-lg font-bold">{props.title}</Dialog.Title>
          )}
          {props.description && (
            <Dialog.Description class="text-pretty">
              {props.description}
            </Dialog.Description>
          )}
          {props.children}
          <Show when={!props.alert}>
            <div class="flex justify-end w-full gap-3 mt-4">
              <Dialog.CloseButton
                class="btn btn-outline min-w-[8em] !py-2"
                disabled={submitting()}
                aria-label={undefined}
              >
                Cancelar
              </Dialog.CloseButton>
              <Dialog.CloseButton
                disabled={submitting()}
                class="btn btn-primary min-w-[8em] !py-2"
                aria-label={undefined}
                onclick={async () => {
                  setSubmitting(true);
                  props.onSubmit && (await props.onSubmit());
                  setOpen(false);
                }}
              >
                Aceptar
              </Dialog.CloseButton>
            </div>
          </Show>
        </ModalContent>
      </Overlay>
    </Dialog>
  );
};
export default Modal;
