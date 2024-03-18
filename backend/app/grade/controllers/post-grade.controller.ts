import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeModel} from "../models/grade.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {getGradeNodeById} from "../utils/get-grade-node-by-id";

export function postGradeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const newGrade = await new GradeModel({
            title: request.body.title,
            description: request.body.description
        }).save()

        const previousGradeNode = await getGradeNodeById(request.body.previous);

        const newGradeTreeNode = await new GradeTreeNodeModel({
            previous: request.body.previous,
            department: previousGradeNode.department,
            grade: newGrade.id
        }).save()

        await previousGradeNode.updateOne({ $addToSet: { children: newGradeTreeNode.id } }).exec()

        response.status(StatusCode.ok).send(newGradeTreeNode)
    }, response)
}


