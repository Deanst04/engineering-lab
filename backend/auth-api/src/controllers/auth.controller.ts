import { Request, Response } from "express";
import prisma from "../config/prisma";
import { hashPassword, comparePasswords } from "../utils/password.util";
import { sign } from "jsonwebtoken";
import "../types/auth.types";
import AppError from "../errors/AppError";

const jwtSecret = process.env.JWT_SECRET;

export async function registerUser(req: Request, res: Response) {
  const { firstName, lastName, username, email, password } = req.body;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    const existingField = existingUser.email === email ? "Email" : "Username";
    throw new AppError(`${existingField} already exists`, 409);
  }
  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      passwordHash,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const jwt = sign({ userId: user.id, role: user.role }, jwtSecret!, {
    expiresIn: "1h",
  });
  return res.status(201).json({
    jwt,
    user,
  });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }
  const isPasswordMatch = await comparePasswords(password, user.passwordHash);
  if (!isPasswordMatch) {
    throw new AppError("Invalid email or password", 401);
  }
  const { passwordHash, ...userWithoutPassword } = user;
  const jwt = sign({ userId: user.id, role: user.role }, jwtSecret!, {
    expiresIn: "1h",
  });
  return res.status(200).json({
    jwt,
    user: userWithoutPassword,
  });
}

export async function getCurrentUser(req: Request, res: Response) {
  const authUser = req.authUser;
  if (!authUser) {
    throw new AppError("Unauthorized", 401);
  }
  const user = await prisma.user.findUnique({
    where: { id: authUser.userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return res.status(200).json({
    user,
  });
}
