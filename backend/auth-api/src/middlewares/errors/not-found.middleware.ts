import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

export default function notFoundMiddleware(_req: Request, _res: Response, next: NextFunction): void {
    next(new AppError("Route not found", 404));
}
