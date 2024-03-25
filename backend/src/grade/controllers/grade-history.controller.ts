import {Controller, Get, Param, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../../authorization/models/user.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {GradeHistoryItemModel} from "../models/grade-history-item.model";

@Controller('grade-history')
export class GradeHistoryController {
    @Get('personal')
    getUserGradeHistoryPersonal(@Res() response) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec()
            response
                .status(StatusCode.ok)
                .send(
                    await Promise.all(user.history.map(async (id) => {
                        await GradeHistoryItemModel
                            .findById(id)
                            .projection({ __v: 0 })
                            .exec()
                    }))
                )
        }, response)
    }

    @Get('personal/last')
    getUserGradeHistoryPersonalLastElement(@Res() response) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec()
            response
                .status(StatusCode.ok)
                .send(
                    await GradeHistoryItemModel
                        .findById(user.history[user.history.length - 1])
                        .projection({ __v: 0 })
                        .exec()
                )
        }, response)
    }
    @Get(':id')
    getUserGradeHistory(@Res() response, @Param('id') userId: string) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(userId).exec();

            response
                .status(StatusCode.ok)
                .send(
                    await Promise.all(user.history.map(async (id) => {
                        await GradeHistoryItemModel
                            .findById(id)
                            .projection({ __v: 0 })
                            .exec()
                    }))
                )
        }, response)
    }

    @Get(':id/last')
    getUserGradeHistoryLastElement(@Res() response, @Param('id') userId: string) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(userId).exec();

            response
                .status(StatusCode.ok)
                .send(
                    await GradeHistoryItemModel
                        .findById(user.history[user.history.length - 1])
                        .projection({ __v: 0 })
                        .exec()
                )
        }, response)
    }
}
