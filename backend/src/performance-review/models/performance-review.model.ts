import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";
import {PrStatus} from "../enums/pr-status.enum";

export const performanceReviewSchema = new Schema({
    title: String,
    agenda: String,
    startDateTime: Date,
    status: {
        type: String,
        required: true,
        default: PrStatus.planned
    },
    reviewer: ObjectId,
    employee: ObjectId,
    otherParticipants: [ObjectId],
    postMeetText: String,
    newTargets: [ObjectId]
});

export const PerformanceReviewModel = model("PerformanceReview", performanceReviewSchema);
