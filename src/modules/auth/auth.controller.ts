import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginUser, registerAdmin, refreshAccessToken, logoutUser } from "./auth.service";
import { loginSchema } from "./auth.validation";

/**
 * Register Admin
 */
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await registerAdmin(name, email, password);

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Login Admin
 */
export const login = async (req: Request, res: Response) => {
    try {
        const parsed = loginSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
                errors: parsed.error.flatten(),
            });
        }

        const { email, password } = parsed.data;

        const { accessToken, refreshToken } = await loginUser(
            email,
            password
        );

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: "strict",
            })
            .json({
                success: true,
                accessToken,
            });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken;

        const newAccessToken = await refreshAccessToken(token);

        res.json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = async (req: any, res: Response) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No refresh token found",
            });
        }

        const decoded: any = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET as string
        );

        await logoutUser(decoded.id);

        res.clearCookie("refreshToken");

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Logout failed",
        });
    }
};
