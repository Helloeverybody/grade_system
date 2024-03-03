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
import cors from 'cors';
import cookieSession from "cookie-session";
import {setAuthRoutes} from "./app/authorization/auth.routes";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: ['COOKIE_SECRET']
}));

(
    async () => {
        const dbConfig = {
            host: 'localhost',
            port: '27017',
            dbName: 'grade_system'
        }

        await connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);

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

setAuthRoutes(app)
