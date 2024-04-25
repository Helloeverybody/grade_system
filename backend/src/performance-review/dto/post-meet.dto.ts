import {PrStatus} from "../enums/pr-status.enum";
import {ICreateMeeting} from "./create-meeting";

export interface IPostMeetDto {
    status: PrStatus.fail | PrStatus.success | PrStatus.rescheduled,
    postMeetText: string,
    // Назначается при статусах fail rescheduled
    newStartDateTime?: Date,
    // Назначается при статусе success
    nextGradeId?: string,
    newMeeting?: ICreateMeeting
}