import {model, Schema} from "mongoose";

export const performanceReviewStatusSchema = new Schema({
    status: String,
    statusLabel: String
});

export const PerformanceReviewStatusModel = model("PerformanceReviewStatus", performanceReviewStatusSchema);