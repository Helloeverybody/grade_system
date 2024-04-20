import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export const UserModel = model(
    "User",
    new Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [ObjectId],
        //TODO понять в какой момент должен ставиться nextGrade если его не было при создании пользователя или при переходе его на след грейд
        nextGrade: ObjectId,
        history: [ObjectId],
        department: ObjectId,
    })
);
