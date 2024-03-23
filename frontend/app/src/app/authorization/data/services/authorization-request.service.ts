import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICreateUserRequestModel} from "../request-models/create-user.request-model";
import {ICreateUserResponseModel} from "../response-models/create-user.response-model";
import {IRoleResponseModel} from "../response-models/role.response-model";
import {ISignInRequestModel} from "../request-models/sign-in.request-model";
import {ISignInResponseModel} from "../response-models/sign-in.response-model";
import {IUserInfoResponseModel} from "../response-models/user-info.response-model";

@Injectable({
	providedIn: 'root'
})
export class AuthorizationRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	/**
	* Создать профиль нового сотрудника
	* */
	public createUser(requestModel: ICreateUserRequestModel): Observable<ICreateUserResponseModel> {
		return this._httpClient.post<ICreateUserResponseModel>('/api/user/create', requestModel)
	}

	/**
	 * Получить все доступные роли
	 * */
	public getRoles(): Observable<IRoleResponseModel[]> {
		return this._httpClient.get<IRoleResponseModel[]>('/api/user/roles')
	}

	/**
	 * Авторизоваться
	 * */
	public signIn(model: ISignInRequestModel): Observable<ISignInResponseModel> {
		return this._httpClient.post<ISignInResponseModel>('/api/auth/sign-in', model)
	}

	/**
	 * Разлогиниться
	 * */
	public signOut(): Observable<void> {
		return this._httpClient.get<void>('/api/auth/sign-out')
	}

	/**
	 * Пинг сервера на авторизацию
	 * */
	public ping(): Observable<void> {
		return this._httpClient.get<void>('/api/auth/ping')
	}

	/**
	 * Информация о текущем авторизованном пользователе
	 * */
	public userInfo(): Observable<IUserInfoResponseModel> {
		return this._httpClient.get<IUserInfoResponseModel>('/api/user/info')
	}
}
