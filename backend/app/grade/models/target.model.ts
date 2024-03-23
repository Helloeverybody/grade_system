import {model, Schema} from "mongoose";

export const targetSchema = new Schema({
    title: String,
    description: String,
});

export const TargetItemModel = model("Target", targetSchema);
