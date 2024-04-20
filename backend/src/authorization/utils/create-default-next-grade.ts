import {NextUserGradeItemModel} from "../../grade/models/next-user-grade.model";
import {TargetItemModel} from "../../grade/models/target.model";
import {PerformanceReviewModel} from "../../grade/models/performance-review.model";
import {DepartmentModel} from "../../employee/models/department.model";
import {DepartmentSettingsModel} from "../../employee/models/department-settings.model";
import {getRandomNextGrade} from "../../grade/utils/get-random-next-grade";
import {ObjectId} from "mongodb";

export async function createDefaultNextGrade(departmentId: string): Promise<string> {
    //TODO нужно сделать настройку дефолтного грейда
    const department = await DepartmentModel
        .findById(departmentId)
        .exec()

    const departmentSettings = await DepartmentSettingsModel
        .findById(department.departmentSettings)
        .exec()

    const defaultFirstTargets = await Promise.all(departmentSettings.defaultFirstTargets.map(async (target) => {
        return await new TargetItemModel({
            title: target.title,
            description: target.description
        }).save()
    }))

    const firstPerformanceReview = await new PerformanceReviewModel({
        title: departmentSettings.defaultPerformanceReviewModel.title,
        agenda: departmentSettings.defaultPerformanceReviewModel.agenda,
        startDateTime: getPRDateTime(departmentSettings.defaultPerformanceReviewModel.timeFromEmploymentDay)
    }).save()

    const nextGradeId = await getRandomNextGrade(department.gradeTreeId as ObjectId);

    if (nextGradeId) {
        const nextGrade = await new NextUserGradeItemModel({
            targets: defaultFirstTargets.map((target) => target.id),
            grade: nextGradeId,
            performanceReview: firstPerformanceReview.id
        }).save()

        return nextGrade.id
    }

    return undefined;
}

function getPRDateTime (days: number) {
    const newDate = new Date();
    newDate.setDate(new Date().getDate() + days);
    newDate.setHours(15)

    return newDate;
}
