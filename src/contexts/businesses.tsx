import { createContext, JSX } from "solid-js";
import { ComunalRecord } from "../types/form";

export type TBusinessesContext = {
  index: number;
  readOnly: true | undefined;
  data: ComunalRecord["businesses"][number];
};

export const BusinessesContext = createContext<TBusinessesContext>();

export const BusinessesContextProvider = (props: {
  children: JSX.Element;
  value: TBusinessesContext;
}) => (
  <BusinessesContext.Provider value={props.value}>
    {props.children}
  </BusinessesContext.Provider>
);
