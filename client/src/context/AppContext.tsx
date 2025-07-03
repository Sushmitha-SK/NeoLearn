import { createContext } from "react";
import type { ReactNode } from "react";

interface AppContextType {
}

interface AppContextProviderProps {
    children: ReactNode;
}

const defaultContextValue: AppContextType = {
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const value: AppContextType = {
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

