import {Response} from "express";

export async function wrapErrorResponse(action: () => Promise<void>, response: Response) {
    try {
        await action();
    } catch (error) {
        response.status(400)
        response.send(error)
    }
}
