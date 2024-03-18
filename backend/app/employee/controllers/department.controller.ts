import {Request, Response} from "express";
import {DepartmentModel} from "../models/department.model";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {GradeTreeNodeModel} from "../../grade/models/grade-tree-node.model";
import {GradeModel} from "../../grade/models/grade.model";
import {StatusCode} from "../../errors/enums/status-code.enum";

export async function getDepartmentController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const allDepartments = await DepartmentModel.find({}).exec()
        response.send(allDepartments)
    }, response)
}

export async function getByIdDepartmentController (request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const result = await DepartmentModel.findById(request.params.id).exec()
        response.send(result)
    }, response)
}

export async function postDepartmentController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const body = request.body;

        const newDepartmentModel = new DepartmentModel({
            director: body.director
        });

        const defaultGrade = await new GradeModel({
            title: 'Новичок',
            description: 'Это стандартный грейд, вы можете изменить его'
        }).save()

        const newGradeTree = await new GradeTreeNodeModel({
            department: newDepartmentModel.id,
            grade: defaultGrade.id
        }).save()

        newDepartmentModel.employees.push(body.director)
        newDepartmentModel.gradeTreeId = newGradeTree.id

        response.status(StatusCode.ok).send(await newDepartmentModel.save())
    }, response)
}
