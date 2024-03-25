import {inject, Injectable} from "@angular/core";
import {GradePersonalRequestService} from "../data/services/grade-personal-request.service";
import {combineLatest, map, Observable} from "rxjs";
import {GradePersonalInfoViewModel} from "../view-models/grade-personal-info.view-model";
import {UserGradeViewModel} from "../view-models/user-grade.view-model";

@Injectable()
export class GradeInfoService {
	private _gradeRequestService = inject(GradePersonalRequestService);

	public getGradeInfoViewModel(): Observable<GradePersonalInfoViewModel> {
		return combineLatest({
			currentGrade: this._gradeRequestService.currentGrade(),
			nextGrade: this._gradeRequestService.nextGrade()
		})
			.pipe(
				map(({ currentGrade, nextGrade}) => {
					const viewModel = new GradePersonalInfoViewModel();

					viewModel.currentGrade = UserGradeViewModel.fromDTO(currentGrade.grade, currentGrade.receivingDay);
					viewModel.nextGrade = UserGradeViewModel.fromDTO(nextGrade);

					return viewModel
				})
			)
	}
}
