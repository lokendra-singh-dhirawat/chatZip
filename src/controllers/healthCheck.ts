import { type Request, type Response } from "express";
import config from "../config/index";
import asyncHandler from "../utils/asyncHandler";

export const healthcheck = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const responseData = {
      status: "available",
      environment: config.environment,
    };
    res.status(200).json(responseData);
  }
);
