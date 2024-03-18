import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {GradeModel} from "../models/grade.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {ObjectId} from "mongodb";

export function getGradeTreeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const entrypoint = request.params.id as string

        const grade = await constructGradeTreeFromDB(new ObjectId(entrypoint));
        response.status(StatusCode.ok).send(grade);
    }, response)
}

async function constructGradeTreeFromDB(entrypoint: ObjectId): Promise<IGradeNode> {
    const currentNode = await GradeTreeNodeModel.findById(entrypoint).exec();
    const node: IGradeNode = {
        id: currentNode.id,
        grade: await GradeModel.findById(currentNode.grade).exec()
    };

    if (currentNode.children?.length) {
        node.children = [];
        for (let i = 0; i < currentNode.children.length; i++) {
            const childNode = await constructGradeTreeFromDB(currentNode.children[i]._id);
            node.children.push(childNode);
        }
    }

    return node;
}

interface IGradeNode {
    children?: IGradeNode[],
    grade: any,
    id: string
}
