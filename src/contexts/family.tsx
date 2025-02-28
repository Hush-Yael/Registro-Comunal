import { createSignal, createContext, JSX } from "solid-js";

export type ModifyFamily = undefined | "edit" | "delete";

const [adding, setAdding] = createSignal(false);
const [modifyIndex, setModifyIndex] = createSignal<number | undefined>();
const [open, setOpen] = createSignal(false);
const [modifyMode, setModifyMode] = createSignal<ModifyFamily>();

export const FamilyFormContext = createContext({
  edit: {
    adding,
    setAdding,
    modifyIndex,
    setModifyIndex,
  },
  modal: {
    open,
    setOpen,
    modifyMode,
    setModifyMode,
    newIndex: undefined as undefined | number,
  },
});

export const FamilyContextProvider = (props: { children: JSX.Element }) => (
  <FamilyFormContext.Provider value={FamilyFormContext.defaultValue}>
    {props.children}
  </FamilyFormContext.Provider>
);
