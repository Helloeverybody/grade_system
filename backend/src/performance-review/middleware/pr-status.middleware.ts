import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {PrStatus} from "../enums/pr-status.enum";
import {PerformanceReviewModel} from "../models/performance-review.model";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export function prStatusMiddleware(statuses: PrStatus[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        wrapErrorResponse(async () => {
            const prId = request.params['id'];
            const prModel = await PerformanceReviewModel.findById(prId).exec()

            if (statuses.some((status) => status === prModel.status)) {
                next()
            } else {
                throw new ErrorModel(StatusCode.badRequest, `This method is not allowed in performance review status "${prModel.status}"`)
            }

        }, response)
    }
}