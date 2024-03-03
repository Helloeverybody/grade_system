import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {verify} from "jsonwebtoken";
import {authConfig} from "../config/auth.config";

export function verifyToken(request: Request, response: Response, next: NextFunction) {
    wrapErrorResponse(async () => {
        const token = request.session.token
        if (!token) {
            throw new ErrorModel(StatusCode.forbidden, 'no token provided!')
        }

        verify(token, authConfig.secretKey, (error, decoded) => {
            if (error) {
                throw new ErrorModel(StatusCode.unauthorized, 'JWT tchoken incorrect!')
            }

            response.locals.userId = decoded.id;
            next()
        })
    }, response)
}
