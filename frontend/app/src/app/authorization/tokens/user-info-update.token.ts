import {InjectionToken} from "@angular/core";
import {Subject} from "rxjs";

export const USER_INFO_UPDATE = new InjectionToken<Subject<void>>('Информация об авторизованном пользователе')
