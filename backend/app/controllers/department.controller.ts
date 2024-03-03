import {Request, Response} from "express";
import {DepartmentModel} from "../dto/department.dto";
import {wrapErrorResponse} from "../errors/utils/wrap-error-response";

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
