import React from "react";
import ReactDom from "react-dom/client";
import history from "history";

export interface IApplet {
  history: history.History;
  context?: {
    [key: string]: () => unknown;
  };
}

export const initializeApplet = (name: string, Applet: React.FC<IApplet>) => {
  (window as any)[`render${name}`] = (
    containerId: string,
    history: history.History,
    context: IApplet["context"]
  ) => {
    const root = ReactDom.createRoot(document.getElementById(containerId)!);
    root.render(<Applet history={history} context={context} />);
    (window as any)[`unmount${name}`] = root.unmount;
  };
};
