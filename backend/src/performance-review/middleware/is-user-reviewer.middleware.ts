import {NextFunction, Request, Response} from "express";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {PerformanceReviewModel} from "../models/performance-review.model";
import {ObjectId} from "mongodb";
import {ErrorModel} from "../../errors/models/error.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function isUserReviewerMiddleware(request: Request, response: Response, next: NextFunction) {
    wrapErrorResponse(async () => {
        const prId = request.params['id'];
        const prModel = await PerformanceReviewModel.findById(prId).exec();

        const userId = new ObjectId(response.locals.userId);

        if(!userId.equals(prModel.reviewer as ObjectId)) {
            throw new ErrorModel(StatusCode.badRequest, 'User must be reviewer')
        }

        next()
    }, response)
}