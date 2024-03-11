import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {User} from "../models/user.model";
import {Role} from "../../entities/roles.enum";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {Document} from "mongoose";
import {RoleModel} from "../models/role.model";

export function checkRole(requestedRole: Role) {
    async function checkRoleFits(request: Request, response: Response, next: NextFunction) {
        wrapErrorResponse(async () => {
            const user = await User.findById(response.locals.userId).exec();
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
