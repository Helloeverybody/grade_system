import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthorizationController} from "./controllers/authorization.controller";
import {UserDataController} from "./controllers/user-data.controller";
import {verifyTokenMiddleware} from "./middleware/verify-token.middleware";
import {checkRoleMiddleware} from "./middleware/check-role.middleware";
import {checkDuplicationsMiddleware} from "./middleware/check-duplications.middleware";
import {checkRoleExistsMiddleware} from "./middleware/check-role-exists.middleware";
import {Role} from "./enums/roles.enum";

@Module({
    controllers: [
        AuthorizationController,
        UserDataController
    ]
})
export class AuthorizationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                verifyTokenMiddleware,
                checkRoleMiddleware(Role.admin),
                checkDuplicationsMiddleware,
                checkRoleExistsMiddleware
            )
            .forRoutes('/user/create');

        consumer
            .apply(
                verifyTokenMiddleware
            )
            .forRoutes('user/info', 'auth/ping')
    }
}
