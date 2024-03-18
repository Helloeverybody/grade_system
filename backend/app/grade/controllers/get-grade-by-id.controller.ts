import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {getGradeById} from "../utils/get-grade-by-id";

export function getGradeByIdController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        response.status(StatusCode.ok).send(getGradeById(request.params.id))
    }, response)
}
