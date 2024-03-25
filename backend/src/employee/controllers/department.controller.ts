import {Response} from "express";
import {DepartmentModel} from "../models/department.model";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeTreeNodeModel} from "../../grade/models/grade-tree-node.model";
import {GradeModel} from "../../grade/models/grade.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {ICreateDepartmentDto} from "../dto/create-department.dto";
import {ObjectId} from "mongodb";
import {DepartmentSettingsModel} from "../models/department-settings.model";

@Controller('department')
export class DepartmentController {
    @Get()
    getDepartment(@Res() response) {
        wrapErrorResponse(async () => {
            const allDepartments = await DepartmentModel.find().exec()
            response.send(allDepartments)
        }, response)
    }

    @Get(':id')
    getByIdDepartment (@Param('id') id, @Res() response) {
        wrapErrorResponse(async () => {
            const result = await DepartmentModel.findById(id).exec()
            response.send(result)
        }, response)
    }

    @Post()
    createDepartment(@Body() body: ICreateDepartmentDto, @Res() response: Response) {
        wrapErrorResponse(async () => {
            //TODO сделать ресты для настройки отдела
            const newDepartmentSettings = await new DepartmentSettingsModel({
                defaultPerformanceReviewModel: {
                    title: body.defaultPerformanceReviewModel.title,
                    agenda: body.defaultPerformanceReviewModel.agenda,
                    timeFromEmploymentDay: body.defaultPerformanceReviewModel.timeFromEmploymentDay
                },
                defaultFirstTargets: body.defaultFirstTargets ? body.defaultFirstTargets.map((target) => ({
                    title: target.title,
                    description: target.description
                })) : undefined
            }).save();

            const newDepartmentModel = new DepartmentModel({
                director: body.director,
                departmentSettings: newDepartmentSettings.id
            });

            const defaultGrade = await new GradeModel({
                title: 'Новичок',
                description: 'Это стандартный грейд, вы можете изменить его'
            }).save()

            const newGradeTree = await new GradeTreeNodeModel({
                department: newDepartmentModel.id,
                grade: defaultGrade.id
            }).save()

            newDepartmentModel.employees.push(new ObjectId(body.director))
            newDepartmentModel.gradeTreeId = newGradeTree.id

            response.status(StatusCode.ok).send(await newDepartmentModel.save())
        }, response)
    }
}

