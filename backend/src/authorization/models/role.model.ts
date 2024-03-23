import {model, Schema} from "mongoose";

export const RoleModel = model(
    "Role",
    new Schema({
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
    })
);
