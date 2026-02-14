import { Router } from "express";
import { login, register } from "./auth.controller";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get(
    "/me",
    verifyAccessToken,
    requireAdmin,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin 🔥",
        });
    }
);

export default router;
