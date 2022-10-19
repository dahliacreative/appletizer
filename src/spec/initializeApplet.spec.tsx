import React from "react";
import { initializeApplet } from "../methods/initializeApplet";
import { useAppletContext } from "../context/context";
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
  });
});
