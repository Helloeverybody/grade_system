import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RoleModel} from "./authorization/models/role.model";
import {connect, Document} from "mongoose";
import * as express from "express";
import cookieSession from "cookie-session";
import {Role} from "./authorization/enums/roles.enum";
import cors from 'cors';
import {PerformanceReviewStatusModel} from "./performance-review/models/performance-review-status.model";
import {PrStatus} from "./performance-review/enums/pr-status.enum";

(async function bootstrap() {
  await configureDB();
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

async function configureDB() {
    const dbConfig = {
      host: 'localhost',
      port: '27017',
      dbName: 'grade_system'
    }

    await connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`)
        .catch(() => {
          console.log('Database is not accessible, let\'s try again')

          return configureDB()
        })
        .then(() => {
          console.log('Database on-line, setting up default settings')

          return setDefaultRoles()
        })
        .then(setDefaultPRStatuses);
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
      description: 'Может проводить собеседования у подчиненных'
    })),
    setDefaultRole(new RoleModel({
      name: Role.knowledgeEditor,
      title: 'Редактор базы знаний',
      description: 'Может редактировать базу знаний своего отдела'
    }))
  ])
}

async function setDefaultRole(roleModel: Document) {
  const roleOnDB = await RoleModel.findOne({ name: (roleModel as any).name }).exec();
  if (!roleOnDB) {
    roleModel.save()
  }
}

async function setDefaultPRStatuses() {
  await Promise.all([
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.planned,
      statusLabel: 'Собеседование запланировано'
    })),
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.ongoing,
      statusLabel: 'Собеседование в процессе'
    })),
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.postMeet,
      statusLabel: 'Формирование постмита'
    })),
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.success,
      statusLabel: 'Собеседование завершено, грейд получен'
    })),
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.fail,
      statusLabel: 'Собеседование завершено, грейд не присужден. Назначена новая дата встречи'
    })),
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.rescheduled,
      statusLabel: 'Назначена дополнительная встреча'
    })),
    setDefaultStatus(new PerformanceReviewStatusModel({
      status: PrStatus.cancelled,
      statusLabel: 'Встреча отменена. Назначена новая встреча'
    })),
  ])
}

async function setDefaultStatus(statusModel: Document) {
  const roleOnDB = await PerformanceReviewStatusModel.findOne({ status: (statusModel as any).status }).exec();
  if (!roleOnDB) {
    statusModel.save()
  }
}
