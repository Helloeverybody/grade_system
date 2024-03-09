import {model, Schema} from "mongoose";

export const Role = model(
    "Role",
    new Schema({
        name: {
            type: String,
            required: true
        },
    })
);
