import {model, Schema} from "mongoose";
import {Role} from "../../entities/roles.enum";
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
        grade: ObjectId,
        department: ObjectId
    })
);
