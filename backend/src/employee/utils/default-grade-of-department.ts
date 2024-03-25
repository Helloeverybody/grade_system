import {DepartmentModel} from "../models/department.model";
import {getGradeById} from "../../grade/utils/get-grade-by-id";
import {ObjectId} from "mongodb";

export async function defaultGradeOfDepartment(departmentId: string) {
    const department = await DepartmentModel
        .findById(departmentId)
        .exec();

    return getGradeById(department.gradeTreeId as ObjectId)
}
