import React from "react";
import { Applet } from "../components/Applet";

type TConfiguredApplets<T> = {
  [K in keyof T]: React.FC;
};

interface IAppletConfig {
  host: string;
  context?: any;
}

export function configureApplets<T>(config: {
  [K in keyof T]: IAppletConfig;
}) {
  return Object.entries(config).reduce((apps, [key, app]) => {
    const { host, context } = app as IAppletConfig;
    return {
      ...apps,
      [key]: () => <Applet host={host} name={key} context={context} />,
    };
  }, {} as TConfiguredApplets<T>);
}
