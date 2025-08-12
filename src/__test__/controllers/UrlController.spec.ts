// UrlController.test.ts
import { Request, Response, NextFunction } from "express";
import { UrlController } from "../../controllers";

describe("UrlController", () => {
  let controller: UrlController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    controller = new UrlController();

    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe("get", () => {
    it("should return 200 and url data", async () => {
      mockReq.query = { urlId: "123" };

      await controller.get(
        mockReq as Request,
        mockRes as Response,
        mockNext as unknown as NextFunction
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ url: "123", encoded: `${mockReq.query.urlId} ${mockReq.query.urlId}` });
    });

    it("should call next on error", async () => {
      mockReq.query = {}; // Force undefined to simulate error
      jest.spyOn(mockRes, "send").mockImplementationOnce(() => {
        throw new Error("Boom");
      });

      await controller.get(
        mockReq as Request,
        mockRes as Response,
        mockNext as unknown as NextFunction
      );

      expect(mockNext).toHaveBeenCalledWith({
        error: "Boom",
        status: 500
      });
    });
  });

  describe("create", () => {
    it("should return 200 and url in json", async () => {
      mockReq.body = { url: "http://example.com" };

      await controller.create(
        mockReq as Request,
        mockRes as Response,
        mockNext as unknown as NextFunction
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ url: "http://example.com" });
    });
  });
});
