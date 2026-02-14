import { Project } from "./project.model";

export const createProject = async (data: any) => {
  return await Project.create(data);
};

export const getAllProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

export const getProjectById = async (id: string) => {
  return await Project.findById(id);
};

export const deleteProject = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};
