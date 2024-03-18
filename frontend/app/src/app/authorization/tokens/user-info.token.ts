import {InjectionToken} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {IUserInfoResponseModel} from "../data/response-models/user-info.response-model";

export const USER_INFO = new InjectionToken<Observable<IUserInfoResponseModel>>('Информация об авторизованном пользователе')
