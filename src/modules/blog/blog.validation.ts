import { z } from "zod";

export const createBlogSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(20),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
});

export const updateBlogSchema = z.object({
    title: z.string().min(5).optional(),
    content: z.string().min(20).optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
});
