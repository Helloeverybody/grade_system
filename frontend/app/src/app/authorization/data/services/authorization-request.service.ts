import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISignInRequestModel} from "../request-models/sign-in.request-model";
import {ISignInResponseModel} from "../response-models/sign-in.response-model";

@Injectable({
	providedIn: 'root'
})
export class AuthorizationRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

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
}
