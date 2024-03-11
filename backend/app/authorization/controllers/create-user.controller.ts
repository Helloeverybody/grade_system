import {Request, Response} from "express";
import {User} from "../models/user.model";
import {hashSync} from "bcrypt";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {ErrorModel} from "../../errors/models/error.model";
import {ObjectId} from "mongodb";
import { generate } from "generate-password";

export async function createUserController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const password = generate({
            length: 10,
            uppercase: true,
            lowercase: true,
            numbers: true
        });

        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashSync(password, 8),
        });

        const roles: [] = request.body.roles;
        if (roles?.length > 0) {
            user.set('roles', roles.map((stringRole) => new ObjectId(stringRole)))
        }

        try {
            await user.save()
        } catch (error) {
            throw new ErrorModel(StatusCode.badRequest, user)
        }

        response.status(StatusCode.ok).send({ login: user.username, password, roles: user.roles });
    }, response)
}
