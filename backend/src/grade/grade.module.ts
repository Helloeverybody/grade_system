import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {GradeController} from "./controllers/grade.controller";
import {GradeHistoryController} from "./controllers/grade-history.controller";
import {verifyTokenMiddleware} from "../authorization/middleware/verify-token.middleware";
import {GradeTreeController} from "./controllers/grade-tree.controller";
import {checkRoleMiddleware} from "../authorization/middleware/check-role.middleware";
import {Role} from "../authorization/enums/roles.enum";
import {RequestMethod} from "@nestjs/common/enums/request-method.enum";


@Module({
    controllers: [
        GradeController,
        GradeTreeController,
        GradeHistoryController
    ]
})
export class GradeModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(
                verifyTokenMiddleware
            )
            .forRoutes(
                'grade-history/personal',
                'grade-history/personal/last',
                'grade/:id',
                'grade/personal/next',
                { path: 'grade', method: RequestMethod.GET },
            )

        consumer
            .apply(
                verifyTokenMiddleware,
                checkRoleMiddleware(Role.admin)
            )
            .forRoutes(
                'grade-history/:id',
                'grade-history/:id/last',
                { path: 'grade', method: RequestMethod.POST }
            )
    }
}
