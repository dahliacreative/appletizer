import React from "react";
import fetchMock from "jest-fetch-mock";
import { render } from "@testing-library/react";
import { Applet } from "../components/Applet";

fetchMock.enableMocks();

describe("Applet", () => {
  it("should fetch the manifest", () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => ({ files: { "main.js": "main.js" } }),
    });

    const { container } = render(
      <Applet name="Test" host="http://localhost:3001" />
    );

    expect(container).toMatchSnapshot();
  });

  it("mount the application when the script is already in the page", () => {
    const script = document.createElement("script");
    script.id = "applet-script-Test";
    document.head.appendChild(script);

    const mockMount = jest.fn();
    (window as any).mountTest = mockMount;

    const { rerender } = render(
      <Applet
        name="Test"
        host="http://localhost:3001"
        context={{
          name: "Test",
        }}
      />
    );

    expect(mockMount).toHaveBeenCalledWith("applet-Test", {
      name: "Test",
    });

    rerender(
      <Applet
        name="Test"
        host="http://localhost:3001"
        context={{
          name: "Updated name",
        }}
      />
    );

    expect(mockMount).toHaveBeenCalledWith("applet-Test", {
      name: "Updated name",
    });
  });
});
