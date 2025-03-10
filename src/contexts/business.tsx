import { createContext, JSX } from "solid-js";
import { ComunalRecord } from "../types/form";

export type TBusinessContext = {
  index: number;
  readOnly: true | undefined;
  data: ComunalRecord["business"][number];
};

export const BusinessContext = createContext<TBusinessContext>();

export const BusinessContextProvider = (props: {
  children: JSX.Element;
  value: TBusinessContext;
}) => (
  <BusinessContext.Provider value={props.value}>
    {props.children}
  </BusinessContext.Provider>
);
