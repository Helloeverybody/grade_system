import {model, Schema} from "mongoose";
import {gradeSchema} from "./grade.model";
import {targetSchema} from "./target.model";
import {performanceReviewSchema} from "./performance-review.model";

export const gradeHistorySchema = new Schema({
    grade: gradeSchema,
    targets: [targetSchema],
    receivingDay: Date,
    performanceReview: performanceReviewSchema
});

export const GradeHistoryItemModel = model("GradeHistory", gradeHistorySchema);
