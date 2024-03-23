import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {GradeController} from "./controllers/grade.controller";
import {UserGradeHistoryController} from "./controllers/user-grade-history.controller";
import {verifyTokenMiddleware} from "../authorization/middleware/verify-token.middleware";


@Module({
    controllers: [
        GradeController,
        UserGradeHistoryController
    ]
})
export class GradeModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(
                verifyTokenMiddleware
            )
            .forRoutes('grade-history')
    }
}
