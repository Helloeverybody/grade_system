import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GradeModule} from "./grade/grade.module";
import {AuthorizationModule} from "./authorization/authorization.module";
import {EmployeeModule} from "./employee/employee.module";
import {PerformanceReviewModule} from "./performance-review/performance-review.module";

@Module({
  imports: [
      GradeModule,
      AuthorizationModule,
      EmployeeModule,
      PerformanceReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
