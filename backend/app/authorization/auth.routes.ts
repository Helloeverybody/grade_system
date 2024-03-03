import {Application} from "express";
import {signUpController} from "./controllers/sign-up.controller";
import {signInController} from "./controllers/sign-in.controller";
import {signOutController} from "./controllers/sign-out.controller";
import {checkDuplications} from "./middleware/check-duplications";
import {checkRoleExists} from "./middleware/check-role-exists";

export function setAuthRoutes(app: Application) {
    app.post('/auth/signup', [checkDuplications, checkRoleExists], signUpController);
    app.post('/auth/signin', signInController);
    app.post('/auth/signout', signOutController);
}
