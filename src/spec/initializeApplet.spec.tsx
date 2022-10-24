import React from "react";
import {
  initializeApplet,
  useAppletContext,
} from "../methods/initializeApplet";
import { wait } from "@testing-library/user-event/dist/utils";

const Applet = () => {
  const { user } = useAppletContext();
  return <div>Welcome {user}</div>;
};

describe("initializeApplet", () => {
  it("should initialize an applet", async () => {
    const name = "Test";
    const container = document.createElement("div");
    container.id = `applet-${name}`;
    document.body.appendChild(container);

    initializeApplet(name, Applet);

    expect((window as any)[`mount${name}`]).toBeDefined();

    (window as any)[`mount${name}`](`applet-${name}`, {
      user: "John",
    });

    await wait();

    expect(container.textContent).toEqual("Welcome John");
    expect((window as any)[`unmount${name}`]).toBeDefined();

    (window as any)[`unmount${name}`]();
    expect(container.textContent).toEqual("");
  });

  it("should initialize an applet in isolation", async () => {
    const name = "Test";
    const container = document.createElement("div");
    container.id = `root`;
    document.body.appendChild(container);
    process.env.NODE_ENV = "development";
    process.env.REACT_APP_ISOLATED_APPLET = "true";

    initializeApplet(name, Applet, {
      user: "John",
    });

    await wait();

    expect(container.textContent).toEqual("Welcome John");
    expect((window as any)[`unmount${name}`]).toBeDefined();
  });
});
