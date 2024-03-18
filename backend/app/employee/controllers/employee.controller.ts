import {Request, Response} from "express";
import {UserModel} from "../../authorization/models/user.model";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";

export async function getEmployeeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const allUsers = await UserModel.find({})
        response.send(allUsers)
    }, response)
}

export async function getByIdEmployeeController (request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const result = await UserModel.findById(request.params.id)
        response.send(result)
    }, response)
}

export async function postEmployeeController(request: Request, response: Response) {
    wrapErrorResponse(async () => {
        const body = request.body;
        const model = new UserModel(body);
        await model.save();
        response.send(model.id)
    }, response)
}
