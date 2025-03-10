import { createContext, JSX } from "solid-js";
import { ComunalRecord } from "../types/form";

export type THomesContext = {
  index: number;
  readOnly: true | undefined;
  data: ComunalRecord["homes"][number];
};

export const HomesContext = createContext<THomesContext>();

export const HomesContextProvider = (props: {
  children: JSX.Element;
  value: THomesContext;
}) => (
  <HomesContext.Provider value={props.value}>
    {props.children}
  </HomesContext.Provider>
);
