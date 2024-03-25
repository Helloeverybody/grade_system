import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const departmentSchema = new Schema({
    director: {
        type: ObjectId,
        required: true
    },
    employees: Array(ObjectId),
    gradeTreeId: ObjectId,
    departmentSettings: ObjectId
});

export const DepartmentModel = model("Department", departmentSchema);
