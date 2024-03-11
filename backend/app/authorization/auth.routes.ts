import {Application} from "express";
import {createUserController} from "./controllers/create-user.controller";
import {signInController} from "./controllers/sign-in.controller";
import {signOutController} from "./controllers/sign-out.controller";
import {checkDuplications} from "./middleware/check-duplications";
import {checkRoleExists} from "./middleware/check-role-exists";
import {getRolesController} from "./controllers/get-roles.controller";

export function setAuthRoutes(app: Application) {
    app.post('/auth/create-user', [checkDuplications, checkRoleExists], createUserController);
    app.post('/auth/signin', signInController);
    app.post('/auth/signout', signOutController);
    app.get('/auth/roles', getRolesController);
}
