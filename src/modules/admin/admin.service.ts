import { Blog } from "../blog/blog.model";
import { Project } from "../project/project.model";
import { Analytics } from "../analytics/analytics.model";

export const getDashboardData = async () => {
  const totalProjects = await Project.countDocuments();
  const totalBlogs = await Blog.countDocuments();

  const totalViews = await Analytics.countDocuments();
  const blogViews = await Analytics.countDocuments({
    type: "blog_view",
  });
  const projectViews = await Analytics.countDocuments({
    type: "project_view",
  });

  const topPages = await Analytics.aggregate([
    {
      $group: {
        _id: "$page",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const recentBlogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title slug createdAt published");

  const recentProjects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title createdAt");

  return {
    totalProjects,
    totalBlogs,
    totalViews,
    blogViews,
    projectViews,
    topPages,
    recentBlogs,
    recentProjects,
  };
};
