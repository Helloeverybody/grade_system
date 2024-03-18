import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {UserModel} from "../models/user.model";
import {RoleModel} from "../models/role.model";

export async function userInfoController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const userModel = await UserModel.findById(response.locals.userId).exec();
        response.status(StatusCode.ok).send({
            username: userModel.username,
            email: userModel.email,
            roles: await RoleModel.find({ _id: { $in: userModel.roles }}).exec(),
            id: userModel._id
        })
    }, response)
}
