import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../models/user.model";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {RoleModel} from "../models/role.model";
import {Role} from "../enums/roles.enum";

export function checkRoleMiddleware(requestedRole: Role) {
    async function checkRoleFits(request: Request, response: Response, next: NextFunction) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec();
            if (!user) {
                throw new ErrorModel(StatusCode.notFound, 'User not found!')
            }

            const userRoles = await RoleModel.find({ _id: { $in: user.roles }}).exec()

            if (!userRoles.some((role: any) => role.name === requestedRole)) {
                throw new ErrorModel(StatusCode.forbidden, 'User require admin role!')
            }

            next()
        }, response)
    }

    return checkRoleFits
}
