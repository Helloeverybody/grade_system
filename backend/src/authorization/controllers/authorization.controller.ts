import {Body, Controller, Get, Post, Request, Res, Session} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../models/user.model";
import {compareSync} from "bcrypt";
import {sign} from "jsonwebtoken";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {ErrorModel} from "../../errors/models/error.model";
import {authConfig} from "../config/auth.config";
import {ISignInDto} from "../dto/sign-in.dto";

//TODO нужен рефреш токен, держать все в куках несекьюрно

@Controller('auth')
export class AuthorizationController {
    @Post('sign-in')
    public signIn(@Body() body: ISignInDto, @Res() response, @Session() session) {
        wrapErrorResponse(async () => {
            const [userByUsername, userByEmail] = await Promise.all([
                UserModel.findOne({
                    username: body.username
                }).exec(),
                UserModel.findOne({
                    email: body.email
                }).exec()
            ])

            const user = userByEmail || userByUsername;

            if (user) {
                const passwordCorrect = compareSync(body.password, user.password)

                if (passwordCorrect) {
                    session.token =
                        sign(
                            { id: user.id },
                            authConfig.secretKey,
                            {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                            }
                        );

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
    @Post('sign-out')
    public signOut(@Request() request) {
        request.session = null;
    }

    @Get('ping')
    public ping() {
        return { status: 'OK' };
    }
}
