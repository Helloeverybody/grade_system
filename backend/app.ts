import express from 'express';
import {connect} from "mongoose";
import {
    getByIdEmployeeController,
    getEmployeeController,
    postEmployeeController
} from "./app/controllers/employee.controller";
import {
    getByIdDepartmentController,
    getDepartmentController,
    postDepartmentController
} from "./app/controllers/department.controller";

const app = express();
app.use(express.static("public"));
app.use(express.json());

(
    async () => {
        await connect('mongodb://localhost:27017/grade_system');
        const port = 3000;
        app.listen(port, () => console.log(`server running on port ${port}`))
    }
)()

app.get("/employee", getEmployeeController)
app.post("/employee", postEmployeeController)
app.get("/employee/:id", getByIdEmployeeController)

app.get("/department", getDepartmentController)
app.post("/department", postDepartmentController)
app.get("/department/:id", getByIdDepartmentController)
