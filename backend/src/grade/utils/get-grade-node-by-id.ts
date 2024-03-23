import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function getGradeNodeById(gradeId: string) {
    const gradeNode = await GradeTreeNodeModel.findById(gradeId).exec()

    if (!gradeNode) {
        throw new ErrorModel(StatusCode.notFound, 'Grade node not found')
    }

    return gradeNode;
}
