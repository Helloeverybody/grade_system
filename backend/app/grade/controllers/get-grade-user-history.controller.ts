import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {GradeHistoryItemModel} from "../models/grade-history.model";
import {UserModel} from "../../authorization/models/user.model";

export function getGradeUserHistoryController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const user = await UserModel.findById(response.locals.userId).exec()
        response.status(StatusCode.ok).send(await GradeHistoryItemModel.findById(user.history))
    }, response)
}
