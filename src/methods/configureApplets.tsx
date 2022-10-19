import React from "react";
import { Applet } from "../components/Applet";

type TConfiguredApplets<T> = Record<keyof T, React.FC<IRouterProps>>;

interface IRouterProps {
  [key: string]: any;
}

interface IAppletConfig {
  host: string;
  context?: any;
}

export function configureApplets<T extends Record<string, IAppletConfig>>(
  config: T
): TConfiguredApplets<T> {
  return Object.entries(config).reduce((apps, [key, app]) => {
    const { host, context } = app;
    return {
      ...apps,
      [key]: () => <Applet host={host} name={key} context={context} />,
    };
  }, {} as TConfiguredApplets<T>);
}
