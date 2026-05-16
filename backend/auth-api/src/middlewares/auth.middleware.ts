import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthUser } from "../types/auth.types";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = process.env.JWT_SECRET;
    const authHeader = req.get("Authorization");
    if (!jwtSecret) return next({
        status: 500,
        message: 'JWT_SECRET is not defined'
    })
    if (!authHeader) return next({
        status: 401,
        message: 'missing Authorization header',
    })
    if (!authHeader.startsWith('Bearer ')) return next({
        status: 401,
        message: 'missing Bearer keyword'
    })
    const parts = authHeader.split(' ');
    const jwtToken = parts[1];
    if (!jwtToken) return next({
        status: 401,
        message: 'missing jwt token'
    })
    try {
        const user = verify(jwtToken, jwtSecret) as AuthUser;
        req.authUser = user;
        next();
    } catch (e) {
        next(e);
    }
}
