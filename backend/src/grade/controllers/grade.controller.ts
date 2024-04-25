import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeModel} from "../models/grade.model";
import {getGradeNodeById} from "../utils/get-grade-node-by-id";
import {GradeTreeNodeModel} from "../models/grade-tree-node.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {getGradeById} from "../utils/get-grade-by-id";
import {IGradeCreateDto} from "../dto/grade-create.dto";
import {ObjectId} from "mongodb";
import {Response} from "express";
import {UserModel} from "../../authorization/models/user.model";
import {NextUserGradeItemModel} from "../models/next-user-grade.model";
import {TargetItemModel} from "../models/target.model";
import {PerformanceReviewModel} from "../../performance-review/models/performance-review.model";

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
    getGradeById(@Param('id') id: string, @Res() response: Response) {
        wrapErrorResponse(async () => {
            response.status(StatusCode.ok).send(getGradeById(new ObjectId(id)))
        }, response)
    }

    @Get('personal/next')
    getGradePersonalNext(@Res() response: Response) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec();
            const nextGrade = await NextUserGradeItemModel
                .findById(user.nextGrade)
                .projection({ __v: 0 })
                .exec()

            response
                .status(StatusCode.ok)
                .send({
                    grade: await GradeModel
                        .findById(nextGrade.grade)
                        .projection({ __v: 0 })
                        .exec(),
                    targets: await Promise.all(nextGrade.targets.map(async targetId => {
                        await TargetItemModel
                            .findById(targetId)
                            .projection({ __v: 0 })
                            .exec()
                    })),
                    performanceReview: await PerformanceReviewModel
                        .findById(nextGrade.performanceReview)
                        .projection({ __v: 0 })
                        .exec()
                })
        }, response)
    }
}
