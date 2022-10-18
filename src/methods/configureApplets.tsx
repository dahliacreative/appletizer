import React from "react";
import { IAppletProps, Applet } from "../components/Applet";
import history from "history";

type TConfiguredApplets<T> = Record<keyof T, React.FC>;

interface IRouterProps {
  [key: string]: any;
  history: history.History;
}

export function configureApplets<T extends Record<string, IAppletProps>>(
  config: T
): TConfiguredApplets<T> {
  return Object.entries(config).reduce((apps, [key, app]) => {
    return {
      ...apps,
      [key]: ({ history }: IRouterProps) => (
        <Applet
          host={app.host}
          name={key}
          history={history}
          context={Object.entries(app.context ?? {}).reduce(
            (ctxs, [key, ctx]) => ({
              ...ctxs,
              [key]: ctx(),
            }),
            {}
          )}
        />
      ),
    };
  }, {} as TConfiguredApplets<T>);
}
