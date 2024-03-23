import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeModel} from "../models/grade.model";
import {getGradeNodeById} from "../utils/get-grade-node-by-id";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {getGradeById} from "../utils/get-grade-by-id";
import {IGradeCreateDto} from "../dto/grade-create.dto";

@Controller('grade')
export class GradeController {
    @Post()
    postGrade(@Body() dto: IGradeCreateDto, @Res() response) {
        wrapErrorResponse(async () => {
            const newGrade = await new GradeModel({
                title: dto.title,
                description: dto.description
            }).save()

            const previousGradeNode = await getGradeNodeById(dto.previous);

            const newGradeTreeNode = await new GradeTreeNodeModel({
                previous: dto.previous,
                department: previousGradeNode.department,
                grade: newGrade.id
            }).save()

            await previousGradeNode.updateOne({ $addToSet: { children: newGradeTreeNode.id } }).exec()

            response.status(StatusCode.ok).send(newGradeTreeNode)
        }, response)
    }

    @Get()
    getGrade(@Res() response, @Query() query) {
        wrapErrorResponse(async () => {
            let allGrades;

            if (query) {
                allGrades = await GradeModel.find({
                    departmentId: { $in: query.departments },
                }).exec()
            } else {
                allGrades = await GradeModel.find().exec()
            }

            response.status(StatusCode.ok).send(allGrades)
        }, response)
    }

    @Get(':id')
    getGradeById(@Param('id') id, @Res() response) {
        wrapErrorResponse(async () => {
            response.status(StatusCode.ok).send(getGradeById(id))
        }, response)
    }
}
