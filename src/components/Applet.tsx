import React, { useEffect } from "react";
import { IApplet } from "../methods/initializeApplet";

export interface IAppletProps extends IApplet {
  host: string;
  name: string;
}

export const Applet: React.FC<IAppletProps> = ({
  name,
  host,
  history,
  context,
}) => {
  const APPLICATION_ID = `applet-${name}`;
  const SCRIPT_ID = `applet-script-${name}`;
  const MANIFEST = `${host}/asset-manifest.json`;
  const MOUNT = `mount${name}`;
  const UNMOUNT = `unmount${name}`;
  const KEY = `applet-${name}-${Date.now()}`;

  useEffect(() => {
    const renderApplet = () => {
      (window as any)[MOUNT](APPLICATION_ID, history, context);
    };

    if (document.getElementById(SCRIPT_ID)) {
      renderApplet();
      return;
    }

    fetch(MANIFEST)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = renderApplet;
        document.body.appendChild(script);
      });

    return () => {
      // Ignoring this line because it's not possible to test
      // due to a bug in testing-library where effect cleanups
      // are not called when unmounting.
      // istanbul ignore next
      (window as any)[UNMOUNT] && (window as any)[UNMOUNT]();
    };
  });

  return <main id={APPLICATION_ID} key={KEY} />;
};
