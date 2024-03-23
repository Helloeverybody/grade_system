import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export const gradeSchema = new Schema({
    title: String,
    description: String
});

export const GradeModel = model("Grade", gradeSchema);
