import {InjectionToken} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CreateUserSuccessViewModel} from "../view-models/create-user-success.view-model";

export const CREATE_USER_SUCCESS_VM =
	new InjectionToken<BehaviorSubject<CreateUserSuccessViewModel>>('Вью-модель успешного слоя добавления сотрудника')
