import {Request, Response} from "express";
import {User} from "../models/user.model";
import {hashSync} from "bcrypt";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {ErrorModel} from "../../errors/models/error.model";

export async function signUpController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashSync(request.body.password, 8),
        });

        if (request.body.roles?.length > 0) {
            user.set('roles', request.body.roles)
        }

        try {

            await user.save()
        } catch (error) {
            throw new ErrorModel(StatusCode.badRequest, user)
        }

        response.sendStatus(StatusCode.ok);
    }, response)
}
