import {model, Schema} from "mongoose";
import {Role} from "../../entities/roles.enum";

export const User = model(
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
        roles: {
            type: [String],
            enum: Object.keys(Role),
            default: [Role.employee]
        },
    })
);
