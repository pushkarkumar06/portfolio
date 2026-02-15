import { Router } from "express";
import {
    create,
    getAll,
    getOne,
    remove,
} from "./project.controller";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

// Public routes
router.get("/", getAll);
router.get("/:id", getOne);

// Admin routes
router.post("/", verifyAccessToken, requireAdmin, upload.single("image"), create);
router.delete("/:id", verifyAccessToken, requireAdmin, remove);

export default router;
