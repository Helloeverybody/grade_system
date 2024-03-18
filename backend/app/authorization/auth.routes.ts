import {Application} from "express";
import {createUserController} from "./controllers/create-user.controller";
import {signInController} from "./controllers/sign-in.controller";
import {signOutController} from "./controllers/sign-out.controller";
import {checkDuplications} from "./middleware/check-duplications";
import {checkRoleExists} from "./middleware/check-role-exists";
import {getRolesController} from "./controllers/get-roles.controller";
import {pingController} from "./controllers/ping.controller";
import {verifyToken} from "./middleware/verify-token";
import {checkRole} from "./middleware/check-role";
import {Role} from "../entities/roles.enum";
import {userInfoController} from "./controllers/user-info.controller";

export function setAuthRoutes(app: Application) {
    app.post('/auth/create-user', [verifyToken, checkRole(Role.admin), checkDuplications, checkRoleExists], createUserController);
    app.post('/auth/sign-in', signInController);
    app.post('/auth/sign-out', signOutController);
    app.get('/auth/roles', getRolesController);
    app.get('/auth/ping', [verifyToken], pingController);
    app.get('/user-info', [verifyToken], userInfoController);
}
