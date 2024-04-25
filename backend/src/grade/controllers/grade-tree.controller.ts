import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {GradeModel} from "../models/grade.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {ObjectId} from "mongodb";
import {Controller, Get, Param, Res} from "@nestjs/common";

@Controller('grade-tree')
export class GradeTreeController {
    @Get(':id')
    getGradeTree(@Res() response, @Param('id') id) {
        wrapErrorResponse(async () => {
            const grade = await constructGradeTreeFromDB(new ObjectId(id));
            response.status(StatusCode.ok).send(grade);
        }, response)
    }
}


async function constructGradeTreeFromDB(entrypoint: ObjectId): Promise<IGradeNode> {
    const currentNode = await GradeTreeNodeModel
        .findById(entrypoint)
        .select({ __v: 0 })
        .exec();

    const node: IGradeNode = {
        id: currentNode.id,
        grade: await GradeModel
            .findById(currentNode.grade)
            .select({ __v: 0, _id: 0 })
            .exec()
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
