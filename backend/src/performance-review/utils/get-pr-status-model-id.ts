import {PrStatus} from "../enums/pr-status.enum";
import {PerformanceReviewStatusModel} from "../models/performance-review-status.model";
import {ObjectId} from "mongodb";

export async function getPrStatusModelId(status: PrStatus): Promise<ObjectId> {
    return (await PerformanceReviewStatusModel.findOne({ status: status }).exec())._id;
}