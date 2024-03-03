import {Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function signOutController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        request.session = null;
        response.sendStatus(StatusCode.ok)
    }, response)
}
