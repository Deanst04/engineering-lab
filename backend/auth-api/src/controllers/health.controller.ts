import { Request, Response } from "express";

export function getHealthStatus(_req: Request, res: Response): void {
  res.status(200).json({
    status: "ok",
    message: "Auth API is running",
  });
}