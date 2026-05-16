import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

export default function requireRole(role: "USER" | "ADMIN") {
  return function (req: Request, _res: Response, next: NextFunction) {
    const authUser = req.authUser;
    if (!authUser) return next(new AppError("Unauthorized", 401));
    if (authUser.role !== role) return next(new AppError("Forbidden", 403));
    next();
  };
}
