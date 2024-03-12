import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function pingController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        response.status(StatusCode.ok).send({ status: 'OK' })
    }, response)
}
