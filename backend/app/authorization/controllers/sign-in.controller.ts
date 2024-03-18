import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../models/user.model";
import {compareSync} from "bcrypt";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {sign} from "jsonwebtoken";
import {authConfig} from "../config/auth.config";
import {Role} from "../../entities/roles.enum";

// TODO токен лучше передавать не через cookie, а через Authorization заголовок
// TODO нет refresh токена, не безопасно
export async function signInController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const [userByUsername, userByEmail] = await Promise.all([
            UserModel.findOne({
                username: request.body.username
            }).exec(),
            UserModel.findOne({
                email: request.body.email
            }).exec()
        ])

        const user = userByEmail || userByUsername;

        if (user) {
            const passwordCorrect = compareSync(request.body.password, user.password)

            if (passwordCorrect) {
                request.session.token = sign({ id: user.id },
                    authConfig.secretKey,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 86400, // 24 hours
                    });

                response.status(StatusCode.ok).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: user.roles
                })
            } else {
                throw new ErrorModel(StatusCode.forbidden, 'Incorrect password!')
            }
        } else {
            throw new ErrorModel(StatusCode.notFound, 'User with given email or username doesn\'t exist!')
        }

    }, response)
}
