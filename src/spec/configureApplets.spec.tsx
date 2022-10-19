import React from "react";
import { render } from "@testing-library/react";
import { configureApplets } from "../methods/configureApplets";
import { createBrowserHistory } from "history";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("configureApplets", () => {
  it("should return configured applets", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => ({ files: { "main.js": "main.js" } }),
    });

    const Applets = configureApplets({
      One: {
        host: "http://localhost:3001",
        context: {
          context1: () => "context1",
          context2: () => "context2",
        },
      },
      Two: {
        host: "http://localhost:3002",
      },
    });

    expect(Applets).toEqual({
      One: expect.any(Function),
      Two: expect.any(Function),
    });

    const { container } = render(
      <Applets.One history={createBrowserHistory()} />
    );

    expect(container).toMatchSnapshot();
  });
});
