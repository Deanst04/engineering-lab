import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validationMiddleware(registerSchema), registerUser);
router.post("/login", validationMiddleware(loginSchema), loginUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;