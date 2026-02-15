import { Router } from "express";
import {
    create,
    getAll,
    getOne,
    remove,
    update,
    getAllAdmin,
    togglePublish,
} from "./blog.controller";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

// Public
router.get("/", getAll);
router.get("/:slug", getOne);

// Admin
// Admin - see all blogs (including drafts)
router.get("/admin/all", verifyAccessToken, requireAdmin, getAllAdmin);

// Create blog
router.post("/", verifyAccessToken, requireAdmin, create);

// Toggle publish
router.patch("/:id/toggle", verifyAccessToken, requireAdmin, togglePublish);

// Update blog
router.put("/:id", verifyAccessToken, requireAdmin, update);

// Delete blog
router.delete("/:id", verifyAccessToken, requireAdmin, remove);

export default router;
