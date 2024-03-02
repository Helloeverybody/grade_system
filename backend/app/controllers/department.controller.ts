import {ObjectId} from "mongodb";
import {EmployeeModel} from "../dto/employee.dto";
import {wrapErrorResponse} from "../utils/wrap-response";
import {Request, Response} from "express";
import {Department} from "../entities/department";
import {DepartmentModel} from "../dto/department.dto";

export async function getDepartmentController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const allUsers = await DepartmentModel.find({})
        response.send(allUsers)
    }, response)
}

export async function getByIdDepartmentController (request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const result = await DepartmentModel.findById(request.params.id)
        response.send(result)
    }, response)
}

export async function postDepartmentController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const body = request.body;
        const model = new DepartmentModel(body);

        await model.save();
        response.send(model.id)
    }, response)
}
