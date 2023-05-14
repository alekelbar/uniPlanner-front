import { createContext } from "react";

export type GlobalContext = { handleShowSnack: (message: string) => void };

export const globalContext = createContext<GlobalContext>({} as GlobalContext);

export const { Provider } = globalContext;
