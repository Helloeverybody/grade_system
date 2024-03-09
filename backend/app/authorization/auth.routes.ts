import {Application} from "express";
import {signUpController} from "./controllers/sign-up.controller";
import {signInController} from "./controllers/sign-in.controller";
import {signOutController} from "./controllers/sign-out.controller";
import {checkDuplications} from "./middleware/check-duplications";
import {checkRoleExists} from "./middleware/check-role-exists";
import {checkRole} from "./middleware/check-role";
import {Role} from "../entities/roles.enum";
import {verifyToken} from "./middleware/verify-token";

export function setAuthRoutes(app: Application) {
    app.post('/auth/create-user', [verifyToken, checkRole(Role.admin), checkDuplications, checkRoleExists], signUpController);
    app.post('/auth/signin', signInController);
    app.post('/auth/signout', signOutController);
}
