import { Project } from "./project.model";

export const createProject = async (data: any) => {
    return await Project.create(data);
};

export const getAllProjects = async (query: any) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const search = query.search || "";
    const tech = query.tech || "";

    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    if (tech) {
        filter.techStack = tech;
    }

    const projects = await Project.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Project.countDocuments(filter);

    return {
        projects,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};

export const getProjectById = async (id: string) => {
    return await Project.findById(id);
};

export const deleteProject = async (id: string) => {
    return await Project.findByIdAndDelete(id);
};
