import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeModel} from "../models/grade.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export function getGradeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        let allGrades;

        if (request.query) {
            allGrades = await GradeModel.find({
                departmentId: { $in: request.query.departments },
            }).exec()
        } else {
            allGrades = await GradeModel.find().exec()
        }

        response.status(StatusCode.ok).send(allGrades)
    }, response)
}
