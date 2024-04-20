import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {ObjectId} from "mongodb";

export async function getRandomNextGrade(currentGradeNodeId: ObjectId) {
    const gradeNode = await GradeTreeNodeModel.findById(currentGradeNodeId).exec()

    if (!gradeNode) {
        throw new ErrorModel(StatusCode.notFound, 'Grade node not found')
    }

    if (gradeNode.children.length > 0) {
        return gradeNode.children[0].id;
    }

    return undefined;
}