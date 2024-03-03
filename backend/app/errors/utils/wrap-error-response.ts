import {Response} from "express";
import {ErrorModel} from "../models/error.model";

export async function wrapErrorResponse(action: () => Promise<void>, response: Response) {
    try {
        await action();
    } catch (error: ErrorModel | any) {
        if (error instanceof ErrorModel) {
            response.status(error.statusCode).send(error.errorMessage)
        } else {
            response.status(500).send(error.toString())
        }
    }
}
