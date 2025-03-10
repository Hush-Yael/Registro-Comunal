import { createSignal, createContext, JSX } from "solid-js";

export type ModifyArrayField = undefined | "edit" | "delete";

const [adding, setAdding] = createSignal(false);
const [modifyIndex, setModifyIndex] = createSignal<number | undefined>();
const [open, setOpen] = createSignal(false);
const [modifyMode, setModifyMode] = createSignal<ModifyArrayField>();

export const ArrayFieldContext = createContext({
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

export const ArrayFieldContextProvider = (props: { children: JSX.Element }) => (
  <ArrayFieldContext.Provider value={ArrayFieldContext.defaultValue}>
    {props.children}
  </ArrayFieldContext.Provider>
);
