import { Request, Response } from "express";
import prisma from "../config/prisma";
import { hashPassword, comparePasswords } from "../utils/password.util";
import { sign } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export async function registerUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });
    const existingField = existingUser?.email === email ? "Email" : "Username";
    if (existingUser) {
      return res.status(409).json({
        message: `${existingField} already exists`
      });
    }
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({ 
      data: { 
        firstName, 
        lastName, 
        username, 
        email, 
        passwordHash 
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    const jwt = sign({ userId: user.id, role: user.role }, jwtSecret!, { expiresIn: "1h" });
    return res.status(201).json({
      jwt,
      user,
    });
  } catch (e) {
    console.error("Error in registerUser:", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const { passwordHash, ...userWithoutPassword } = user;
    const isPasswordMatch = await comparePasswords(password, user.passwordHash);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const jwt = sign({ userId: user.id, role: user.role }, jwtSecret!, { expiresIn: "1h" });
    return res.status(200).json({
      jwt,
      user: userWithoutPassword,
    });
  } catch (e) {
    console.error("Error in loginUser:", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export function getCurrentUser(_req: Request, res: Response): void {
  // throw new Error("Test error");
  res.status(200).json({
    message: "Current user route is working",
  });
}
