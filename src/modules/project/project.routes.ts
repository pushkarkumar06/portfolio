import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
} from "./project.controller";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

// Public routes
router.get("/", getAll);
router.get("/:id", getOne);

// Admin routes
router.post("/", verifyAccessToken, requireAdmin, create);
router.delete("/:id", verifyAccessToken, requireAdmin, remove);

export default router;
