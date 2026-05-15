import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { registerSchema } from "../validations/auth.validation";

const router = Router();

router.post("/register", validationMiddleware(registerSchema), registerUser);
router.post("/login", loginUser);
router.get("/me", getCurrentUser);

export default router;