import {GradeHistoryItemModel} from "../models/grade-history.model";
import {GradeModel} from "../models/grade.model";
import {UserModel} from "../../authorization/models/user.model";

export async function addGradeToHistory(userId: string, gradeId: string, targets: string[]) {
    const grade = await GradeModel
        .findById(gradeId)
        .select({  })
        .exec()

    const historyItem = await new GradeHistoryItemModel({
        grade: grade,
    }).save();

    UserModel.updateOne({ _id: userId }, { $addToSet: { history: historyItem.id } })
}
