import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {RoleModel} from "../models/role.model";

export function checkRoleExists(request: Request, response: Response, next: NextFunction) {
    wrapErrorResponse(async () => {
        if (request.body.roles?.length > 0) {
            const rolesFromDb = await RoleModel.find({ _id: { $in: request.body.roles }}).exec()

            request.body.roles.forEach((roleId: string) => {
                if (!rolesFromDb.find((role) => role.id === roleId)) {
                    throw new ErrorModel(StatusCode.badRequest, `Such role with id ${roleId} doesn't exists!`)
                }
            })
        }

        next()
    }, response)
}
