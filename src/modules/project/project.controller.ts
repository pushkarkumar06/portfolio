import { Request, Response } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
} from "./project.service";
import { createProjectSchema } from "./project.validation";

export const create = async (req: Request, res: Response) => {
  const parsed = createProjectSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten(),
    });
  }

  const project = await createProject(parsed.data);

  res.status(201).json({
    success: true,
    project,
  });
};

export const getAll = async (req: Request, res: Response) => {
  const projects = await getAllProjects();

  res.json({
    success: true,
    projects,
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
