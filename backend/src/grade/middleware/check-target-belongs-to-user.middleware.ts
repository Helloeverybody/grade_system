import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../../authorization/models/user.model";
import {NextUserGradeItemModel} from "../models/next-user-grade.model";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function checkTargetBelongsToUserMiddleware(request: Request, response: Response, next: NextFunction) {
    wrapErrorResponse(async () => {
        const user = await UserModel.findById(response.locals.userId).exec()
        const nextGrade = await NextUserGradeItemModel.findById(user.nextGrade).exec()

        const targetBelongsToUser = nextGrade.targets.some((target) => target.id === request.params['id'])
        if (!targetBelongsToUser) {
            throw new ErrorModel(StatusCode.badRequest, 'Target not belongs to this user, can not change it')
        }

        next()
    }, response)
}