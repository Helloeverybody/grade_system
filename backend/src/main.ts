import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RoleModel} from "./authorization/models/role.model";
import {connect, Document} from "mongoose";
import * as express from "express";
import cookieSession from "cookie-session";
import {Role} from "./authorization/enums/roles.enum";
import cors from 'cors';

(async function bootstrap() {
  await configurateDB();
  const app = await NestFactory.create(AppModule);

  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());
  app.use(cookieSession({
    name: 'session',
    keys: ['COOKIE_SECRET']
  }));

  const serverPort = 3000;

  await app.listen(serverPort)
      .then(() => {
        console.log(`Server is running on port ${serverPort}`)
      });
})()

async function configurateDB() {

  const dbConfig = {
    host: 'localhost',
    port: '27017',
    dbName: 'grade_system'
  }

  await connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);
  await setDefaultRoles()
}


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
