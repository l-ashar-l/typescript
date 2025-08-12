// __tests__/Server.unit.spec.ts
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import Server from "../Server";
import { IConfig } from "../config";

// Mock dependencies
jest.mock("express", () => {
  const use = jest.fn();
  const listen = jest.fn();
  const mockApp = { use, listen } as unknown as Application;
  return jest.fn(() => mockApp);
});

jest.mock("cors", () => jest.fn(() => "cors-middleware"));
jest.mock("helmet", () => jest.fn(() => "helmet-middleware"));
jest.mock("../routes", () => ({
  router: "router-middleware",
  notFoundRoute: "not-found-middleware",
}));

describe.skip("Server class (unit)", () => {
  let config: IConfig;
  let server: Server;
  let appMock: any;

  beforeEach(() => {
    config = {
      port: 3000,
      env: "test",
      apiPrefix: "/api"
    } as IConfig;
    (express as unknown as jest.Mock).mockClear();
    appMock = express();
    server = new Server(config);
  });

  it("should bootstrap with CORS, Helmet, and routes", () => {
    server.bootstrap();

    expect(cors).toHaveBeenCalled();
    expect(helmet).toHaveBeenCalled();

    // Called in order: cors, helmet, router, notFoundRoute
    expect(appMock.use).toHaveBeenCalledWith("cors-middleware");
    expect(appMock.use).toHaveBeenCalledWith("helmet-middleware");
    expect(appMock.use).toHaveBeenCalledWith(config.apiPrefix, "router-middleware");
    expect(appMock.use).toHaveBeenCalledWith("not-found-middleware");
  });

  it("should call listen with the given port", () => {
    server.run();
    expect(appMock.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });
});
