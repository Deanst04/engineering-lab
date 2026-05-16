import { Router } from "express";
import { getAllUsers } from "../controllers/admin.controller";
import authMiddleware from "../middlewares/auth.middleware";
import requireRole from "../middlewares/role.middleware";

const router = Router();

router.get("/users", authMiddleware, requireRole("ADMIN"), getAllUsers);

export default router;
