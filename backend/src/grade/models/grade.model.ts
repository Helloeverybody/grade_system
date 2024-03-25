import {model, Schema} from "mongoose";

export const gradeSchema = new Schema({
    title: String,
    description: String
});

export const GradeModel = model("Grade", gradeSchema);
