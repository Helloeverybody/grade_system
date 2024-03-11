import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICreateUserRequestModel} from "../request-models/create-user.request-model";
import {ICreateUserResponseModel} from "../response-models/create-user.response-model";
import {IRoleResponseModel} from "../response-models/role.response-model";

@Injectable()
export class AuthorizationRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	/**
	* Создать профиль нового сотрудника
	* */
	public createUser(requestModel: ICreateUserRequestModel): Observable<ICreateUserResponseModel> {
		return this._httpClient.post<ICreateUserResponseModel>('/api/auth/create-user', requestModel)
	}

	/**
	* Получить все доступные роли
	* */
	public getRoles(): Observable<IRoleResponseModel[]> {
		return this._httpClient.get<IRoleResponseModel[]>('/api/auth/roles')
	}
}
