import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../../authorization/models/user.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {TargetItemModel} from "../models/target.model";
import {PerformanceReviewModel} from "../../performance-review/models/performance-review.model";
import {ITargetCreateDto} from "../dto/target-create.dto";
import {Response} from "express";
import {PrStatus} from "../../performance-review/enums/pr-status.enum";
import {ErrorModel} from "../../errors/models/error.model";
import {ITargetStatusChangeDto} from "../dto/target-status-change.dto";
import {TargetStatus} from "../enums/target-status.enum";

@Controller('target')
export class TargetsController {
    @Get('personal')
    getUserTargets(@Res() response) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec()

            response
                .status(StatusCode.ok)
                .send(
                    await TargetItemModel
                        .findById(user.id) //plokho
                        .projection({ __v: 0 })
                        .exec()
                )
        }, response)
    }

    @Post('reviewTarget/:targetId')
    reviewTarget(@Param('targetId') targetId: string, @Body() dto: ITargetStatusChangeDto, @Res() response) {
        wrapErrorResponse(async () => {
            if (!Object.values(TargetStatus).includes(dto.requestedStatus)) {
                throw new ErrorModel(StatusCode.badRequest, 'This end status is not allowed')
            }

            await TargetItemModel.updateOne(
                {
                    _id: targetId
                },
                {
                    status: dto.requestedStatus
                }
            ).exec()
        }, response)
    }

    @Post('setTarget/:id')
    setTarget(@Body() dto: ITargetCreateDto, @Param('id') prId: string, @Res() response: Response) {
        wrapErrorResponse(async () => {
            const newTarget = await new TargetItemModel({
                title: dto.title,
                description: dto.description
            }).save()

            await PerformanceReviewModel.updateOne(
                {
                    _id: prId
                },
                {
                    $addToSet: { newTargets: newTarget.id }
                }
            ).exec();

            response.send({
                newTargetId: newTarget.id
            })
        }, response)
    }

    @Post('achieveTarget/:targetId')
    achieveTarget(@Param('targetId') targetId: string, @Res() response) {
        wrapErrorResponse(async () => {
            await TargetItemModel.updateOne(
                {
                    _id: targetId
                },
                {
                    status: TargetStatus.achieved
                }
            ).exec()
        }, response)
    }
}
