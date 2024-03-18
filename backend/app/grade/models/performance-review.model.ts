import {model, Schema} from "mongoose";

const performanceReviewSchema = new Schema({
    title: String,
    description: String,
    startDateTime: Date,
    conclusion: String
});

export const performanceReviewModel = model("PerformanceReview", performanceReviewSchema);
