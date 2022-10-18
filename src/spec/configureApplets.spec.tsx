import { configureApplets } from "../methods/configureApplets";

describe("configureApplets", () => {
  it("should return a configured applet", () => {
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
        context: {
          context1: () => "context1",
          context2: () => "context2",
        },
      },
    });

    expect(Applets).toEqual({
      One: expect.any(Function),
      Two: expect.any(Function),
    });
  });
});
