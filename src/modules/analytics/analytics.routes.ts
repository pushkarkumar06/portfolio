import { Router } from "express";
import { track, stats } from "./analytics.controller";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

// Public tracking route
router.post("/track", track);

// Admin-only stats route
router.get(
  "/stats",
  verifyAccessToken,
  requireAdmin,
  stats
);

export default router;
