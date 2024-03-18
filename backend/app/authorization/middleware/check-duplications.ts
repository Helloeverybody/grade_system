import {NextFunction, Request, Response} from "express";
import {UserModel} from "../models/user.model";
import {ErrorModel} from "../../errors/models/error.model";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function checkDuplications(request: Request, response: Response, next: NextFunction) {
    wrapErrorResponse(async () => {
        const userByUsername = await UserModel
            .findOne({ username: request.body.username })
            .exec()

        const userByEmail = await UserModel
            .findOne({ email: request.body.email })
            .exec()

        if (userByUsername || userByEmail) {
            throw new ErrorModel(StatusCode.badRequest, 'User already exists!')
        }

        next()
    }, response)
}
