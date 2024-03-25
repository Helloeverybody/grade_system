import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUserHistoryItemResponseModel} from "../response-models/user-history-item.response-model";
import {IGradeResponseModel} from "../response-models/grade.response-model";
import {ITargetResponseModel} from "../response-models/target.response-model";

@Injectable()
export class GradePersonalRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	/**
	 * История грейдирования пользователя
	 * */
	public gradeHistory(): Observable<IUserHistoryItemResponseModel[]> {
		return this._httpClient.get<IUserHistoryItemResponseModel[]>('/api/grade-history')
	}

	/**
	 * Запись о последнем полученном грейде
	 * */
	public currentGrade(): Observable<IUserHistoryItemResponseModel> {
		return this._httpClient.get<IUserHistoryItemResponseModel>('/api/grade-history/personal/last')
	}

	/**
	 * Следующий грейд
	 * */
	public nextGrade(): Observable<IGradeResponseModel> {
		return this._httpClient.get<IGradeResponseModel>('/api/grade/personal/next')
	}

	/**
	 * Цели
	 * */
	public targets(): Observable<ITargetResponseModel> {
		return this._httpClient.get<ITargetResponseModel>('/api/targets/personal')
	}
}
