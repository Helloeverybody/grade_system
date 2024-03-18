import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const gradeTreeNodeSchema = new Schema({
    previous: ObjectId,
    children: [ObjectId],
    grade: ObjectId,
    department: ObjectId
});

export const GradeTreeNodeModel = model("GradeTree", gradeTreeNodeSchema);
