import { createContext, JSX } from "solid-js";
import { DBComunalRecord } from "../types/db";

export type ModifyFamily = undefined | "edit" | "delete";

type Context = {
  familiar?: number | undefined;
  readOnly: true | undefined;
  data: undefined | DBComunalRecord<"jefe"> | DBComunalRecord<"family">[number];
  cedulaAsLink: boolean | undefined;
};

export const CedulaContext = createContext<Context>({
  familiar: undefined,
  readOnly: undefined,
  data: undefined,
  cedulaAsLink: false,
});

export const CedulaContextProvider = (props: {
  children: JSX.Element;
  value: Context;
}) => (
  <CedulaContext.Provider value={props.value || CedulaContext.defaultValue}>
    {props.children}
  </CedulaContext.Provider>
);
