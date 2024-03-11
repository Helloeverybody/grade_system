import express from 'express';
import {connect, Document, HydratedDocument} from "mongoose";
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
import {RoleModel} from "./app/authorization/models/role.model";
import {Role} from "./app/entities/roles.enum";
import * as module from "module";

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
        setDefaultRoles()

        const port = 3000;
        app.listen(port, () => console.log(`server running on port ${port}`))
    }
)()

async function setDefaultRoles() {
    setDefaultRole(new RoleModel({
        name: Role.admin,
        title: 'Администратор',
        description: 'Может всё'
    }));
    setDefaultRole(new RoleModel({
        name: Role.employee,
        title: 'Сотрудник',
        description: 'Может просматривать свой прогресс'
    }));
    setDefaultRole(new RoleModel({
        name: Role.knowledgeBaseEditor,
        title: 'Редактор базы знаний',
        description: 'Может редактировать базу знаний своего отдела'
    }));
    setDefaultRole(new RoleModel({
        name: Role.gradeEditor,
        title: 'Редактор грейдового дерева',
        description: 'Может редактировать грейдовое дерево своего отдела'
    }));
}

async function setDefaultRole(roleModel: Document) {
    const roleOnDB = await RoleModel.findOne({ name: (roleModel as any).name }).exec();
    if (!roleOnDB) {
        roleModel.save()
    }
}

app.get("/employee", getEmployeeController)
app.post("/employee", postEmployeeController)
app.get("/employee/:id", getByIdEmployeeController)

app.get("/department", getDepartmentController)
app.post("/department", postDepartmentController)
app.get("/department/:id", getByIdDepartmentController)

setAuthRoutes(app)
