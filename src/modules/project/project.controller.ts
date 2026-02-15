import { Request, Response } from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
} from "./project.service";
import { createProjectSchema } from "./project.validation";

import cloudinary from "../../config/cloudinary";

export const create = async (req: any, res: Response) => {
    try {
        // If techStack is a string, parse it to an array
        if (typeof req.body.techStack === "string") {
            req.body.techStack = req.body.techStack.split(",").map((s: string) => s.trim());
        }

        const parsed = createProjectSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.flatten(),
            });
        }

        let imageUrl = "";

        if (req.file) {
            // Upload image to Cloudinary using stream
            const result: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "portfolio_projects" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(req.file.buffer);
            });

            imageUrl = result.secure_url;
        }

        const project = await createProject({
            ...parsed.data,
            image: imageUrl,
        });

        res.status(201).json({
            success: true,
            project,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    const result = await getAllProjects(req.query);

    res.json({
        success: true,
        ...result,
    });
};

export const getOne = async (req: Request, res: Response) => {
    const project = await getProjectById(req.params.id);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    res.json({
        success: true,
        project,
    });
};

export const remove = async (req: Request, res: Response) => {
    await deleteProject(req.params.id);

    res.json({
        success: true,
        message: "Project deleted",
    });
};
