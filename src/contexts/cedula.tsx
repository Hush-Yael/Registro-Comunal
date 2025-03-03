import { createContext, JSX } from "solid-js";
import { ComunalRecord } from "../types/form";

export type ModifyFamily = undefined | "edit" | "delete";

export type TCedulaContext = {
  familiar?: number | undefined;
  readOnly: true | undefined;
  cedulaAsLink: boolean | undefined;
  data: ComunalRecord["jefe"] & ComunalRecord["family"][number];
};

export const CedulaContext = createContext<TCedulaContext>();

export const CedulaContextProvider = (props: {
  children: JSX.Element;
  value: TCedulaContext;
}) => (
  <CedulaContext.Provider value={props.value}>
    {props.children}
  </CedulaContext.Provider>
);
