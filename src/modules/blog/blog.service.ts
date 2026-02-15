import { Blog } from "./blog.model";
import { generateSlug } from "../../utils/slugify";

export const createBlog = async (data: any) => {
    const slug = generateSlug(data.title);

    const existing = await Blog.findOne({ slug });

    if (existing) {
        throw new Error("Blog with similar title already exists");
    }

    return await Blog.create({
        ...data,
        slug,
    });
};

export const getAllBlogs = async (query: any) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const search = query.search || "";

    const skip = (page - 1) * limit;

    const filter: any = { published: true };

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Blog.countDocuments(filter);

    return {
        blogs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};

export const getBlogBySlug = async (slug: string) => {
    return await Blog.findOne({ slug, published: true });
};

export const deleteBlog = async (id: string) => {
    return await Blog.findByIdAndDelete(id);
};

export const updateBlog = async (id: string, data: any) => {
    const blog = await Blog.findById(id);

    if (!blog) {
        throw new Error("Blog not found");
    }

    // If title changes → regenerate slug
    if (data.title && data.title !== blog.title) {
        const newSlug = generateSlug(data.title);

        const existing = await Blog.findOne({ slug: newSlug });

        if (existing && existing._id.toString() !== id) {
            throw new Error("Another blog with similar title exists");
        }

        blog.slug = newSlug;
    }

    // Update fields
    if (data.title) blog.title = data.title;
    if (data.content) blog.content = data.content;
    if (data.tags) blog.tags = data.tags;
    if (typeof data.published === "boolean")
        blog.published = data.published;

    await blog.save();

    return blog;
};

export const getAllBlogsAdmin = async () => {
    return await Blog.find().sort({ createdAt: -1 });
};

export const togglePublishStatus = async (id: string) => {
    const blog = await Blog.findById(id);

    if (!blog) {
        throw new Error("Blog not found");
    }

    blog.published = !blog.published;

    await blog.save();

    return blog;
};
