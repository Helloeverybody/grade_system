import {model, Schema} from "mongoose";
import {Role} from "../entities/roles.enum";
import {ObjectId} from "mongodb";

export const employeeSchema = new Schema({
    role: {
        type: String,
        enum: Object.keys(Role)
    },
    gradeId: ObjectId
});

export const EmployeeModel = model("Employee", employeeSchema);

