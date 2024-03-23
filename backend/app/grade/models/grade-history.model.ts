import {model, Schema} from "mongoose";
import {gradeSchema} from "./grade.model";
import {targetSchema} from "./target.model";

export const gradeHistorySchema = new Schema({
    grade: gradeSchema,
    targets: [targetSchema],
    receivingDay: Date
});

export const GradeHistoryItemModel = model("GradeHistory", gradeHistorySchema);
