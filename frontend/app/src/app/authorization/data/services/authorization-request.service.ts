import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICreateUserRequestModel} from "../request-models/create-user.request-model";
import {ICreateUserResponseModel} from "../response-models/create-user.response-model";

@Injectable()
export class AuthorizationRequestService {
  private _httpClient: HttpClient = inject(HttpClient);

  public createUser({ username, email }: ICreateUserRequestModel): Observable<ICreateUserResponseModel> {
    return this._httpClient.post('/api/auth/create-user', {
      username,
      email
    })
  }
}
