import { Router } from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;