import {Application} from "express";
import {postGradeController} from "./controllers/post-grade.controller";
import {getGradeController} from "./controllers/get-grade.controller";
import {getGradeTreeController} from "./controllers/get-grade-tree.controller";
import {getGradeByIdController} from "./controllers/get-grade-by-id.controller";

export function setGradeRoutes(app: Application) {
    app.get('/grade', getGradeController)
    app.get('/grade/:id', getGradeByIdController)
    app.patch('/grade/:id')
    app.delete('/grade/:id')
    app.post('/grade', postGradeController)

    app.get('/grade-tree/:id', getGradeTreeController)
}
