import {Request, Response} from "express";
import {UserModel} from "../models/user.model";
import {hashSync} from "bcrypt";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {ErrorModel} from "../../errors/models/error.model";
import {ObjectId} from "mongodb";
import { generate } from "generate-password";
import {GradeHistoryItemModel} from "../../grade/models/grade-history.model";
import {defaultGradeOfDepartment} from "../../employee/utils/default-grade-of-department";

export async function createUserController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const password = generate({
            length: 10,
            uppercase: true,
            lowercase: true,
            numbers: true
        });

        const defaultGrade = await defaultGradeOfDepartment(request.body.department);

        const historyItem = await new GradeHistoryItemModel({
            grade: [
                defaultGrade
            ]
        }).save();

        const user = new UserModel({
            username: request.body.username,
            email: request.body.email,
            password: hashSync(password, 8),
            history: [historyItem.id],
            grade: defaultGrade.id
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

        response.status(StatusCode.ok).send({
            login: user.username,
            password,
            roles: user.roles
        });
    }, response)
}
