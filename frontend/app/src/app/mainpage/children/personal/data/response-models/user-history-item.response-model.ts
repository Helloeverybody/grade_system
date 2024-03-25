import {ITargetResponseModel} from "./target.response-model";
import {IGradeResponseModel} from "./grade.response-model";

export interface IUserHistoryItemResponseModel {
	grade: IGradeResponseModel,
	targets: ITargetResponseModel[],
	receivingDay: Date
}
