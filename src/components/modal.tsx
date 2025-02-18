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
  center?: boolean;
  onSubmit?: (() => void) | (() => Promise<void>);
};

export const Overlay = (props: { children: JSX.Element }) => (
  <Dialog.Portal>
    <Dialog.Overlay>
      <div class="fixed z-50 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.25)] dark:bg-[rgba(0,0,0,0.6)]">
        {props.children}
      </div>
    </Dialog.Overlay>
  </Dialog.Portal>
);

const [disabled, setDisabled] = createSignal(false);

export const ModalContent = (props: {
  class?: string;
  contentClass?: string;
  alert?: boolean;
  children: JSX.Element;
}) => (
  <Dialog.Content
    onInteractOutside={(e) => {
      if (disabled()) e.preventDefault();
    }}
    onEscapeKeyDown={(e) => {
      if (disabled()) e.preventDefault();
    }}
    class={`relative dialog-content w-90 max-w-[400px] !shadow-[0_4px_8px_rgba(0,0,0,0.3)] dark:!shadow-[0_0_15px_rgba(0,0,0,.5)] ${
      props.class || ""
    }`}
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

const Modal = (props: DialogProps) => {
  const [open, setOpen] = createSignal(props.defaultOpen || false);
  const [force, setForce] = createSignal(false);

  createEffect(async () => {
    if (!open()) {
      setDisabled(false);
      setForce(true);

      setTimeout(() => {
        setForce(false);
      }, 200);
    }
  });

  return (
    <Dialog open={open()} onOpenChange={setOpen} forceMount={force()}>
      {props.trigger}
      <Overlay>
        <ModalContent
          alert={props.alert}
          class={props.class}
          contentClass={props.contentClass}
        >
          {props.title && (
            <Dialog.Title
              class={`pb-1 border-b-1 div-border text-lg font-bold ${
                props.center ? "text-center" : ""
              }`}
            >
              {props.title}
            </Dialog.Title>
          )}
          {props.description && (
            <Dialog.Description class="text-pretty">
              {props.description}
            </Dialog.Description>
          )}
          {props.children}
          <Show when={!props.alert}>
            <div
              class={`flex ${
                !props.center ? "justify-end" : "justify-center"
              } w-full gap-3 border-t-1 div-border pt-4 *:disabled:opacity-60`}
            >
              <Dialog.CloseButton
                class={`btn btn-outline ${
                  !props.center ? "min-w-[7em]" : "w-full"
                } p-1.25`}
                disabled={disabled()}
                aria-label={undefined}
              >
                Cancelar
              </Dialog.CloseButton>
              <Dialog.CloseButton
                disabled={disabled()}
                class={`btn btn-primary ${
                  !props.center ? "min-w-[7em]" : "w-full"
                } p-1.25`}
                aria-label={undefined}
                onclick={async () => {
                  setDisabled(true);
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
