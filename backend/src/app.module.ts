import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GradeModule} from "./grade/grade.module";
import {AuthorizationModule} from "./authorization/authorization.module";
import {EmployeeModule} from "./employee/employee.module";

@Module({
  imports: [
      GradeModule,
      AuthorizationModule,
      EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
