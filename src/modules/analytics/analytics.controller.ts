import { Request, Response } from "express";
import { trackEvent, getStats } from "./analytics.service";

export const track = async (req: Request, res: Response) => {
  try {
    const { type, page } = req.body;

    const referrer = req.headers.referer || "direct";
    const userAgent = req.headers["user-agent"] || "";

    const device = userAgent.includes("Mobile")
      ? "mobile"
      : "desktop";

    await trackEvent({
      type,
      page,
      referrer,
      device,
    });

    res.status(201).json({ success: true });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const stats = async (req: Request, res: Response) => {
  const data = await getStats();

  res.json({
    success: true,
    data,
  });
};
