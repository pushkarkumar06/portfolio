import { Request, Response } from "express";
import { getDashboardData } from "./admin.service";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getDashboardData();

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
