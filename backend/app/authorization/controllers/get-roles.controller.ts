import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {RoleModel} from "../models/role.model";

export async function getRolesController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const allExistingRoles = await RoleModel.find().exec()
        response.send(allExistingRoles)
    }, response)
}
