import {TargetStatus} from "../enums/target-status.enum";
import {IPrOperation} from "../../performance-review/dto/pr-operation.interface";

export interface ITargetStatusChangeDto extends IPrOperation {
    requestedStatus: TargetStatus.cancelled | TargetStatus.accepted | TargetStatus.notAccepted
}