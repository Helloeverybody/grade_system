import {model, Schema} from "mongoose";

const departmentSettingsSchema = new Schema({
    defaultPerformanceReviewModel: {
        timeFromEmploymentDay: Number,
        agenda: String,
        title: String
    },
    defaultFirstTargets: [{
        title: String,
        description: String,
    }]
})

export const DepartmentSettingsModel = model("DepartmentSettings", departmentSettingsSchema)
