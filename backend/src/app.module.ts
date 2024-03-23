import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GradeModule} from "./grade/grade.module";
import {AuthorizationModule} from "./authorization/authorization.module";

@Module({
  imports: [
      GradeModule,
      AuthorizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
