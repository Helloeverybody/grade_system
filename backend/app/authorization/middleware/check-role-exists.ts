import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {Role} from "../../entities/roles.enum";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export function checkRoleExists(request: Request, response: Response, next: NextFunction) {
    wrapErrorResponse(async () => {
        if (request.body.roles?.length > 0) {
            const rolesExist = Object.keys(Role).some((role: Role) => {
                return request.body.roles.some((requestedRole: Role) => requestedRole === role)
            })
            if (!rolesExist) {
                throw new ErrorModel(StatusCode.badRequest, 'Such role doesn\'t exists!')
            }
        }

        next()
    }, response)
}
