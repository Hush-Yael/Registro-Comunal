import { createSignal, createContext, JSX, Accessor, Setter } from "solid-js";

export type ModifyArrayField = undefined | "edit" | "delete";

export const ArrayFieldContext = createContext<{
  edit: {
    adding: Accessor<boolean>;
    setAdding: Setter<boolean>;
    modifyIndex: Accessor<number | undefined>;
    setModifyIndex: Setter<number | undefined>;
  };
  modal: {
    open: Accessor<boolean>;
    setOpen: Setter<boolean>;
    modifyMode: Accessor<ModifyArrayField>;
    setModifyMode: Setter<ModifyArrayField>;
    newIndex: undefined | number;
  };
}>();

export const ArrayFieldContextProvider = (props: { children: JSX.Element }) => {
  const [adding, setAdding] = createSignal(false);
  const [modifyIndex, setModifyIndex] = createSignal<number | undefined>();
  const [open, setOpen] = createSignal(false);
  const [modifyMode, setModifyMode] = createSignal<ModifyArrayField>();

  return (
    <ArrayFieldContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </ArrayFieldContext.Provider>
  );
};
