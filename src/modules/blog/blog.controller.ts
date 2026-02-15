import { Request, Response } from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    deleteBlog,
    updateBlog,
    getAllBlogsAdmin,
    togglePublishStatus,
} from "./blog.service";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";

export const create = async (req: Request, res: Response) => {
    const parsed = createBlogSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            errors: parsed.error.flatten(),
        });
    }

    const blog = await createBlog(parsed.data);

    res.status(201).json({
        success: true,
        blog,
    });
};

export const getAll = async (req: Request, res: Response) => {
    const result = await getAllBlogs(req.query);

    res.json({
        success: true,
        ...result,
    });
};

export const getOne = async (req: Request, res: Response) => {
    const blog = await getBlogBySlug(req.params.slug);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    res.json({
        success: true,
        blog,
    });
};

export const update = async (req: Request, res: Response) => {
    const parsed = updateBlogSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            errors: parsed.error.flatten(),
        });
    }

    try {
        const blog = await updateBlog(req.params.id, parsed.data);

        res.json({
            success: true,
            blog,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    await deleteBlog(req.params.id);

    res.json({
        success: true,
        message: "Blog deleted",
    });
};

export const getAllAdmin = async (req: Request, res: Response) => {
    const blogs = await getAllBlogsAdmin();

    res.json({
        success: true,
        blogs,
    });
};

export const togglePublish = async (req: Request, res: Response) => {
    try {
        const blog = await togglePublishStatus(req.params.id);

        res.json({
            success: true,
            message: blog.published ? "Blog published" : "Blog moved to draft",
            blog,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
