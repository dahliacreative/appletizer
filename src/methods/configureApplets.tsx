import React from "react";
import { Applet } from "../components/Applet";
import history from "history";

type TConfiguredApplets<T> = Record<keyof T, React.FC<IRouterProps>>;

interface IRouterProps {
  [key: string]: any;
  history: history.History;
}

interface IAppletConfig {
  host: string;
  context?: {
    [key: string]: () => unknown;
  };
}

export function configureApplets<T extends Record<string, IAppletConfig>>(
  config: T
): TConfiguredApplets<T> {
  return Object.entries(config).reduce((apps, [key, app]) => {
    const context = Object.entries(app.context ?? {}).reduce(
      (ctxs, [key, ctx]) => ({
        ...ctxs,
        [key]: ctx(),
      }),
      {}
    );
    return {
      ...apps,
      [key]: ({ history }: IRouterProps) => (
        <Applet
          host={app.host}
          name={key}
          history={history}
          context={context}
        />
      ),
    };
  }, {} as TConfiguredApplets<T>);
}
