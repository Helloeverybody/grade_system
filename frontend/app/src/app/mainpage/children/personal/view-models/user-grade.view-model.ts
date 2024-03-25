import {IGradeResponseModel} from "../data/response-models/grade.response-model";

export class UserGradeViewModel {
	public title: string;
	public description: string;
	/** Дата получения грейда (предполагаемая или уже пройденная) */
	public receivingDate: string;

	public static fromDTO(dto: IGradeResponseModel, receivingDate?: Date): UserGradeViewModel {
		const viewModel = new UserGradeViewModel();

		viewModel.title = dto.title;
		viewModel.description = dto.description;
		viewModel.receivingDate = receivingDate.toDateString();

		return viewModel;
	}
}
