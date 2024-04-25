import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {Response} from "express";
import {PerformanceReviewModel} from "../models/performance-review.model";
import {PrStatus} from "../enums/pr-status.enum";
import {ErrorModel} from "../../errors/models/error.model";
import {IPostMeetDto} from "../dto/post-meet.dto";
import {ICancelMeetingDto} from "../dto/cancel-meeting.dto";
import {UserModel} from "../../authorization/models/user.model";
import {NextUserGradeItemModel} from "../../grade/models/next-user-grade.model";
import {GradeHistoryItemModel} from "../../grade/models/grade-history-item.model";
import {GradeModel} from "../../grade/models/grade.model";
import {GradeTreeNodeModel} from "../../grade/models/grade-tree-node.model";
import {createGradeHistoryItem} from "../../grade/utils/create-grade-history-item";
import {ObjectId} from "mongodb";

@Controller('performance-review')
export class PerformanceReviewController {
    // planned -> ongoing
    @Post(':id/start')
    startMeeting(@Param('id') id: string, @Res() response) {
        wrapErrorResponse(async () => {
            const performanceReview = await PerformanceReviewModel.findById(id).exec()

            await performanceReview.updateOne({
                status: PrStatus.ongoing
            }).exec()
        }, response)
    }

    // TODO доработать когда будут готовы базы знаний
    @Post(':id/approve-knowledge')
    approveKnowledge(@Param('id') id: string, @Res() response) {
        wrapErrorResponse(async () => {

        }, response)
    }

    // ongoing -> postmeet
    @Post(':id/end-meeting')
    endMeeting(@Param('id') id: string, @Res() response) {
        wrapErrorResponse(async () => {
            const performanceReview = await PerformanceReviewModel.findById(id).exec()

            await performanceReview.updateOne({
                status: PrStatus.postMeet
            }).exec()
        }, response)
    }

    // postmeet -> *
    @Post(':id/post-meet')
    createPostMeet(@Param('id') id: string, @Body() dto: IPostMeetDto, @Res() response: Response) {
        wrapErrorResponse(async () => {
            if (!Object.values(PrStatus).includes(dto.status)) {
                throw new ErrorModel(StatusCode.badRequest, 'This status is not allowed')
            }

            let response;

            switch (dto.status) {
                case PrStatus.fail:
                case PrStatus.rescheduled: {
                    response = await this.processMeetingReschedule(id, dto);
                    break;
                }
                case PrStatus.success: {
                    response = await this.processMeetingSuccess(id, dto)
                    break;
                }
            }

            await PerformanceReviewModel.updateOne(
                {
                    _id: id
                },
                {
                    ...response,
                    status: dto.status,
                    postMeetText: dto.postMeetText
                }).exec()
        }, response)
    }

    private async processMeetingSuccess(id: string, body: IPostMeetDto) {
        const performanceReview = await PerformanceReviewModel.findById(id).exec()

        const newMeeting = await new PerformanceReviewModel({
            title: body.newMeeting.title,
            agenda: body.newMeeting.agenda,
            startDateTime: body.newMeeting.startDateTime,
            reviewer: body.newMeeting.reviewer || performanceReview.reviewer,
            employee: performanceReview.employee,
            otherParticipants: body.newMeeting.otherParticipants
        }).save()

        const historyItemId = createGradeHistoryItem(performanceReview.employee as ObjectId, performanceReview._id);

        //TODO создать ????????????????????? я забыл.....

        const newNextGrade = new NextUserGradeItemModel({
            grade: body.nextGradeId,
            performanceReview: newMeeting.id,
            targets: performanceReview.newTargets
        })

        await UserModel.updateOne(
            {
                _id: performanceReview.employee
            },
            {
                nextGrade: newNextGrade.id,
                $addToSet: {
                    history: historyItemId
                }
            }
        ).exec()
    }

    private async processMeetingReschedule(id: string, body: IPostMeetDto) {
        return {
            startDateTime: body.newStartDateTime
        }
    }

    // * -> cancel
    @Post(':id/cancel')
    cancelMeeting(@Param('id') id: string, @Body() dto: ICancelMeetingDto, @Res() response: Response) {
        wrapErrorResponse(async () => {
            const performanceReview = await PerformanceReviewModel.findById(id).exec()

            await performanceReview.updateOne({
                status: PrStatus.cancelled
            }).exec()

            const newMeeting = await new PerformanceReviewModel({
                title: dto.newMeeting.title,
                agenda: dto.newMeeting.agenda,
                startDateTime: dto.newMeeting.startDateTime,
                reviewer: dto.newMeeting.reviewer || performanceReview.reviewer,
                employee: performanceReview.employee,
                otherParticipants: dto.newMeeting.otherParticipants
            }).save()

            const user = await UserModel.findById(performanceReview.employee).exec()

            await NextUserGradeItemModel.updateOne(
                {
                    _id: user.nextGrade
                },
                {
                    performanceReview: newMeeting.id
                }
            ).exec()

            response.send({
                newMeeting: newMeeting.id
            })
        }, response)
    }

    @Post(':id/edit')
    editMeeting(@Param('id') id: string, @Res() response) {
        wrapErrorResponse(async () => {

        }, response)
    }

    @Get('statuses')
    public getAllStatuses() {
        return Object.values(PrStatus);
    }
}
