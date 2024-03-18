import express from 'express';
import {connect, Document} from "mongoose";
import cors from 'cors';
import cookieSession from "cookie-session";
import {setAuthRoutes} from "./app/authorization/auth.routes";
import {RoleModel} from "./app/authorization/models/role.model";
import {Role} from "./app/entities/roles.enum";
import {setEmployeeRoutes} from "./app/employee/employee.routes";
import {setGradeRoutes} from "./app/grade/grade.routes";

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
        await setDefaultRoles()

        const port = 3000;
        app.listen(port, () => console.log(`server running on port ${port}`))
    }
)()

async function setDefaultRoles() {
    await Promise.all([
        setDefaultRole(new RoleModel({
            name: Role.admin,
            title: 'Администратор',
            description: 'Может всё'
        })),
        setDefaultRole(new RoleModel({
            name: Role.employee,
            title: 'Сотрудник',
            description: 'Может просматривать свой прогресс'
        })),
        setDefaultRole(new RoleModel({
            name: Role.hr,
            title: 'HR-сотрудник',
            description: 'Может настраивать грейды'
        })),
        setDefaultRole(new RoleModel({
            name: Role.manager,
            title: 'Руководитель',
            description: 'Может редактировать грейдовое дерево своего отдела'
        }))
    ])
}

async function setDefaultRole(roleModel: Document) {
    const roleOnDB = await RoleModel.findOne({ name: (roleModel as any).name }).exec();
    if (!roleOnDB) {
        roleModel.save()
    }
}

setAuthRoutes(app)
setEmployeeRoutes(app)
setGradeRoutes(app)
