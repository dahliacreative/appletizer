import React from "react";
import ReactDom from "react-dom/client";
import { AppletContextProvider, useAppletContext } from "../context/context";

export const initializeApplet = (
  name: string,
  Applet: React.FC,
  developmentContext: any = {}
) => {
  let root: ReactDom.Root | null = null;
  (window as any)[`mount${name}`] = (containerId: string, context: any) => {
    if (!root) {
      root = ReactDom.createRoot(document.getElementById(containerId)!);
    }
    root.render(
      <AppletContextProvider context={context}>
        <Applet />
      </AppletContextProvider>
    );
    (window as any)[`unmount${name}`] = () => {
      root!.unmount();
    };
  };

  if (
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_ISOLATED_APPLET
  ) {
    (window as any)[`mount${name}`](
      process.env.REACT_APP_ISOLATED_CONTAINER || "root",
      developmentContext
    );
  }
};

export { useAppletContext };
