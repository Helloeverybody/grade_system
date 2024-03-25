import {model, Schema} from "mongoose";
import {targetSchema} from "../../grade/models/target.model";

const defaultPerformanceReviewSchema = new Schema({
        timeFromEmploymentDay: Number,
        agenda: String,
        title: String
    })

const departmentSettingsSchema = new Schema({
    defaultPerformanceReviewModel: defaultPerformanceReviewSchema,
    defaultFirstTargets: [targetSchema]
})

export const DepartmentSettingsModel = model("DepartmentSettings", departmentSettingsSchema)
