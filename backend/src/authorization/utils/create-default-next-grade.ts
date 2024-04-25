import {NextUserGradeItemModel} from "../../grade/models/next-user-grade.model";
import {TargetItemModel} from "../../grade/models/target.model";
import {PerformanceReviewModel} from "../../performance-review/models/performance-review.model";
import {DepartmentModel} from "../../employee/models/department.model";
import {DepartmentSettingsModel} from "../../employee/models/department-settings.model";
import {getRandomNextGrade} from "../../grade/utils/get-random-next-grade";
import {ObjectId} from "mongodb";
import {PrStatus} from "../../performance-review/enums/pr-status.enum";
import {getPrStatusModelId} from "../../performance-review/utils/get-pr-status-model-id";
import {UserModel} from "../models/user.model";

export async function createDefaultNextGrade(userId: ObjectId): Promise<string> {
    const user = await UserModel.findById(userId).exec();

    //TODO нужно сделать настройку дефолтного грейда
    const department = await DepartmentModel
        .findById(user.department)
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
        startDateTime: getPRDateTime(departmentSettings.defaultPerformanceReviewModel.timeFromEmploymentDay),
        employee: userId,
    }).save()

    if (user.director) {
        firstPerformanceReview.updateOne({ reviewer: user.director });
    }

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
