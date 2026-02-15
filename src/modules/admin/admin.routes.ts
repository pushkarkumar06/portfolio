import { Router } from "express";
import { dashboard } from "./admin.controller";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  verifyAccessToken,
  requireAdmin,
  dashboard
);

export default router;
