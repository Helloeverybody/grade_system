import {
    getByIdDepartmentController,
    getDepartmentController,
    postDepartmentController
} from "./controllers/department.controller";
import {Application} from "express";
import {
    getByIdEmployeeController,
    getEmployeeController,
    postEmployeeController
} from "./controllers/employee.controller";


export function setEmployeeRoutes(app: Application) {
    // app.get("/employee", getEmployeeController)
    // app.post("/employee", postEmployeeController)
    // app.get("/employee/:id", getByIdEmployeeController)

    app.get("/department", getDepartmentController)
    app.post("/department", postDepartmentController)
    app.get("/department/:id", getByIdDepartmentController)
}
