import { Analytics } from "./analytics.model";

export const trackEvent = async (data: any) => {
  return await Analytics.create(data);
};

export const getStats = async () => {
  const totalViews = await Analytics.countDocuments();

  const blogViews = await Analytics.countDocuments({
    type: "blog_view",
  });

  const projectViews = await Analytics.countDocuments({
    type: "project_view",
  });

  const pageViews = await Analytics.countDocuments({
    type: "page_view",
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

  return {
    totalViews,
    pageViews,
    blogViews,
    projectViews,
    topPages,
  };
};
