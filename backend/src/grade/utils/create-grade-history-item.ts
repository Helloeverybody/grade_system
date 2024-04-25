import {GradeModel} from "../models/grade.model";
import {UserModel} from "../../authorization/models/user.model";
import {GradeHistoryItemModel} from "../models/grade-history-item.model";
import {NextUserGradeItemModel} from "../models/next-user-grade.model";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {ObjectId} from "mongodb";

export async function createGradeHistoryItem(userId: ObjectId, performanceReviewId: ObjectId): Promise<string> {
    const user = await UserModel.findById(userId).exec();
    const oldNextGrade = await NextUserGradeItemModel.findById(user.nextGrade).exec();
    const targetGradeNode = await GradeTreeNodeModel.findById(oldNextGrade.grade).exec();

    const gradeToSave = await GradeModel
        .findById(
            targetGradeNode.grade,
            {
                __v: 0,
                _id: 0
            })
        .exec();

    const historyItem = await new GradeHistoryItemModel({
        grade: gradeToSave.toObject(),
        targets: oldNextGrade.targets,
        receivingDay: new Date(),
        performanceReview: performanceReviewId
    }).save()

    return historyItem.id;
}
