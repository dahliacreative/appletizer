import { initializeApplet } from "../methods/initializeApplet";

describe("initializeApplet", () => {
  it("should initialize an applet", () => {
    const Applet = () => null;
    const name = "Test";
    initializeApplet(name, Applet);
    expect((window as any)[`mount${name}`]).toBeDefined();

    const container = document.createElement("div");
    container.id = "applet-Test";
    document.body.appendChild(container);
    (window as any)[`mount${name}`]("applet-Test", { push: () => {} }, {});
    expect((window as any)[`unmount${name}`]).toBeDefined();
  });
});
