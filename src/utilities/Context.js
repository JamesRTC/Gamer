import { createContext, useContext } from "react";

export const PropsContext = createContext();

export function useProps() {
  const context = useContext(PropsContext);
  return context;
}
