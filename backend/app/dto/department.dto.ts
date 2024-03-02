import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export const departmentSchema = new Schema({
    director: {
        type: ObjectId,
        required: true
    },
    employees: Array(ObjectId),
    gradeTreeId: ObjectId,
});

export const DepartmentModel = model("Department", departmentSchema);

