import {Application} from "express";
import {postGradeController} from "./controllers/post-grade.controller";
import {getGradeController} from "./controllers/get-grade.controller";
import {getGradeTreeController} from "./controllers/get-grade-tree.controller";
import {getGradeByIdController} from "./controllers/get-grade-by-id.controller";
import {getGradeUserHistoryController} from "./controllers/get-grade-user-history.controller";
import {verifyToken} from "../authorization/middleware/verify-token";

export function setGradeRoutes(app: Application) {
    app.get('/grade', getGradeController)
    app.get('/grade/:id', getGradeByIdController)
    app.post('/grade', postGradeController)
    app.get('/grade-tree/:id', getGradeTreeController)
    app.get('/grade/user-history', [verifyToken], getGradeUserHistoryController)
    app.get('/grade/user-history/last')

    app.patch('/grade/:id')
    app.delete('/grade/:id')
}
