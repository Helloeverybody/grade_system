import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {PerformanceReviewController} from "./controllers/performance-review.controller";
import {prStatusMiddleware} from "./middleware/pr-status.middleware";
import {PrStatus} from "./enums/pr-status.enum";
import {verifyTokenMiddleware} from "../authorization/middleware/verify-token.middleware";
import {isUserReviewerMiddleware} from "./middleware/is-user-reviewer.middleware";


@Module({
    controllers: [
        PerformanceReviewController
    ]
})
export class PerformanceReviewModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(
                verifyTokenMiddleware,
                isUserReviewerMiddleware,
                prStatusMiddleware([PrStatus.planned, PrStatus.rescheduled, PrStatus.fail])
            )
            .forRoutes(
                'performance-review/:id/start'
            )

        consumer
            .apply(
                verifyTokenMiddleware,
                isUserReviewerMiddleware,
                prStatusMiddleware([PrStatus.ongoing])
            )
            .forRoutes(
                'performance-review/:id/end-meeting'
            )

        consumer
            .apply(
                verifyTokenMiddleware,
                isUserReviewerMiddleware,
                prStatusMiddleware([PrStatus.postMeet])
            )
            .forRoutes(
                'performance-review/:id/post-meet'
            )

        consumer
            .apply(
                verifyTokenMiddleware,
                isUserReviewerMiddleware,
            )
            .forRoutes(
                'performance-review/:id/cancel'
            )
    }
}
