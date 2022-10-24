import React, { createContext, useContext } from "react";

interface IAppletProvider {
  context: any;
  children: React.ReactNode;
}

const AppletContext = createContext<any>({});

export const AppletContextProvider: React.FC<IAppletProvider> = ({
  context,
  children,
}) => (
  <AppletContext.Provider value={context}>{children}</AppletContext.Provider>
);

export const useAppletContext = () => useContext(AppletContext);
