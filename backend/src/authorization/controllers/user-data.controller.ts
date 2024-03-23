import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {ObjectId} from "mongodb";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {UserModel} from "../models/user.model";
import {hashSync} from "bcrypt";
import {RoleModel} from "../models/role.model";
import {ICreateUserDto} from "../dto/create-user.dto";
import {generate} from "generate-password";
import {GradeHistoryItemModel} from "../../grade/models/grade-history.model";
import {defaultGradeOfDepartment} from "../../employee/utils/default-grade-of-department";

@Controller('user')
export class UserDataController {
    @Post('create')
    public createUser(@Body() body: ICreateUserDto, @Res() response) {
        wrapErrorResponse(async () => {
            const password = generate({
                length: 10,
                uppercase: true,
                lowercase: true,
                numbers: true
            });

            const defaultGrade = await defaultGradeOfDepartment(body.department);

            const historyItem = await new GradeHistoryItemModel({
                grade: [
                    defaultGrade
                ]
            }).save();

            const user = new UserModel({
                username: body.username,
                email: body.email,
                password: hashSync(password, 8),
                history: [historyItem.id],
                grade: defaultGrade.id
            });

            const roles: string[] = body.roles;
            if (roles?.length > 0) {
                user.set('roles', roles.map((stringRole) => new ObjectId(stringRole)))
            }

            try {
                await user.save()
            } catch (error) {
                throw new ErrorModel(StatusCode.badRequest, user)
            }

            response.status(StatusCode.ok).send({
                login: user.username,
                password,
                roles: user.roles
            });
        }, response)
    }

    @Get('roles')
    public async roles() {
        return await RoleModel.find().exec();
    }

    @Get('info')
    public userInfo(@Res() response) {
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
}
