import {ObjectId} from "mongodb";
import {EmployeeModel} from "../dto/employee.dto";
import {wrapErrorResponse} from "../utils/wrap-response";
import {Request, Response} from "express";

export async function getEmployeeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const allUsers = await EmployeeModel.find({})
        response.send(allUsers)
    }, response)
}

export async function getByIdEmployeeController (request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const result = await EmployeeModel.findById(request.params.id)
        response.send(result)
    }, response)
}

export async function postEmployeeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const body = request.body;
        const model = new EmployeeModel(body);
        await model.save();
        response.send( model.id)
    }, response)
}
