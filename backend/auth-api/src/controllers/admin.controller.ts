import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function getAllUsers(_req: Request, res: Response) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return res.status(200).json({
        users,
    });
}
