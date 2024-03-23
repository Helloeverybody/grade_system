import {Module} from "@nestjs/common";
import { DepartmentController } from './controllers/department.controller';

@Module({
    controllers: [
        DepartmentController
    ]
})
export class EmployeeModule {

}

