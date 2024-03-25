import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export const nextUserGradeSchema = new Schema({
    grade: ObjectId,
    targets: [ObjectId],
    performanceReview: ObjectId
});

export const NextUserGradeItemModel = model("NextUserGrade", nextUserGradeSchema);
