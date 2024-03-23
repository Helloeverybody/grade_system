import {Controller, Get, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../../authorization/models/user.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {GradeHistoryItemModel} from "../models/grade-history.model";

@Controller('grade-history')
export class UserGradeHistoryController {
    @Get()
    getUserGradeHistory(@Res() response) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec()
            response.status(StatusCode.ok).send(await GradeHistoryItemModel.findById(user.history))
        }, response)
    }
}
