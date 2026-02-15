import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import projectRoutes from "./modules/project/project.routes";
import blogRoutes from "./modules/blog/blog.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import adminRoutes from "./modules/admin/admin.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running 🚀" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);


// Error handler middleware
app.use(errorHandler);

export default app;
