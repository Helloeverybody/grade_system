import {model, Schema} from "mongoose";

export const performanceReviewSchema = new Schema({
    title: String,
    agenda: String,
    startDateTime: Date,
    status: String
});

export const PerformanceReviewModel = model("PerformanceReview", performanceReviewSchema);
