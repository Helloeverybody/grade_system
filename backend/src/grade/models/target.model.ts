import {model, Schema} from "mongoose";
import {TargetStatus} from "../enums/target-status.enum";

export const targetSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: TargetStatus.needToAchieve
    }
});

export const TargetItemModel = model("Target", targetSchema);
