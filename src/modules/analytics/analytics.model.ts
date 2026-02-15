import mongoose, { Schema, Document } from "mongoose";

export interface IAnalytics extends Document {
  type: "page_view" | "blog_view" | "project_view";
  page: string;
  referrer?: string;
  device?: string;
  createdAt: Date;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    type: {
      type: String,
      enum: ["page_view", "blog_view", "project_view"],
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    referrer: {
      type: String,
    },
    device: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Analytics = mongoose.model<IAnalytics>(
  "Analytics",
  analyticsSchema
);
