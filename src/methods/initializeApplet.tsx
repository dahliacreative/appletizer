import React from "react";
import ReactDom from "react-dom/client";
import { AppletContextProvider } from "../context/context";

export const initializeApplet = (name: string, Applet: React.FC) => {
  (window as any)[`mount${name}`] = (containerId: string, context: any) => {
    const root = ReactDom.createRoot(document.getElementById(containerId)!);
    root.render(
      <AppletContextProvider context={context}>
        <Applet />
      </AppletContextProvider>
    );
    (window as any)[`unmount${name}`] = root.unmount;
  };
};
