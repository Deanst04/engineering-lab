import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthUser } from "../types/auth.types";
import AppError from "../errors/AppError";

export default function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return next(new Error("JWT_SECRET is not defined"));

    const authHeader = req.get("Authorization");
    if (!authHeader) return next(new AppError("Missing Authorization header", 401));
    if (!authHeader.startsWith("Bearer ")) return next(new AppError("Missing Bearer keyword", 401));

    const jwtToken = authHeader.split(" ")[1];
    if (!jwtToken) return next(new AppError("Missing JWT token", 401));

    try {
        const user = verify(jwtToken, jwtSecret) as AuthUser;
        req.authUser = user;
        next();
    } catch {
        next(new AppError("Invalid or expired token", 401));
    }
}
