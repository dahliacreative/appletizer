import React from "react";
import fetchMock from "jest-fetch-mock";
import { render } from "@testing-library/react";
import { Applet } from "../components/Applet";
import { createBrowserHistory } from "history";
import { wait } from "@testing-library/user-event/dist/utils";

fetchMock.enableMocks();

describe("Applet", () => {
  it("should fetch the manifest", () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => ({ files: { "main.js": "main.js" } }),
    });

    const { container } = render(
      <Applet
        name="Test"
        host="http://localhost:3001"
        history={createBrowserHistory()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("mount the application when the script is already in the page", () => {
    const script = document.createElement("script");
    script.id = "applet-script-Test";
    document.head.appendChild(script);

    const mockMount = jest.fn();
    (window as any).mountTest = mockMount;

    render(
      <Applet
        name="Test"
        host="http://localhost:3001"
        history={createBrowserHistory()}
        context={{}}
      />
    );

    expect(mockMount).toHaveBeenCalledWith(
      "applet-Test",
      expect.any(Object),
      {}
    );
  });
});
