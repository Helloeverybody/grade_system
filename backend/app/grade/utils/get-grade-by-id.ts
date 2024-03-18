import {Document} from "mongoose";
import {GradeModel} from "../models/grade.model";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function getGradeById(gradeId: string) {
    let grade: Document = await GradeModel.findById(gradeId).exec();

    if (!grade) {
        const gradeNode = await GradeTreeNodeModel.findById(gradeId).exec()

        if (!gradeNode) {
            throw new ErrorModel(StatusCode.notFound, 'Grade not found')
        }

        grade = await GradeModel.findById(gradeNode.grade).exec();
    }

    return grade;
}
