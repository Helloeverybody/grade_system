import {inject, Injectable} from "@angular/core";
import {CreateUserFormViewModel} from "../view-models/create-user-form-view.model";
import {catchError, EMPTY, finalize, map, Observable, tap, throwError} from "rxjs";
import {CreateUserSuccessViewModel} from "../view-models/create-user-success.view-model";
import {ADD_USER_SUCCESS_VM} from "../tokens/add-user-success-vm";
import {IRoleResponseModel} from "../../../data/response-models/role.response-model";
import {AuthorizationRequestService} from "../../../data/services/authorization-request.service";
import {ICreateUserResponseModel} from "../../../data/response-models/create-user.response-model";

@Injectable()
export class CreateUserFormManagerService {
	private _authRequestService: AuthorizationRequestService = inject(AuthorizationRequestService);
	protected successViewModel$ = inject(ADD_USER_SUCCESS_VM);

	public fillViewModel(viewModel: CreateUserFormViewModel): Observable<void> {
		return this._authRequestService.getRoles()
			.pipe(
				tap((values: IRoleResponseModel[]) => {
					viewModel.initialize(values)
				}),
				map(() => void 0)
			)
	}

	public submitForm(viewModel: CreateUserFormViewModel): Observable<void> {
		viewModel.requestError.set('')

		if (viewModel.form.valid) {
			viewModel.submitLoading.set(true)

			return this.createUser(viewModel)
				.pipe(
					tap((data: ICreateUserResponseModel) => {
						const successViewModel: CreateUserSuccessViewModel = new CreateUserSuccessViewModel(data)
						this.successViewModel$.next(successViewModel);
					}),
					map(() => void 0)
				)
		} else {
			return throwError(() => 'Форма заполнена не правильно!')
		}
	}

	private createUser(viewModel: CreateUserFormViewModel): Observable<ICreateUserResponseModel> {
		return this._authRequestService.createUser(viewModel.getModel())
			.pipe(
				catchError(() => {
					viewModel.requestError.set('Не удалось добавить нового сотрудника')

					return EMPTY;
				}),
				finalize(() => {
					viewModel.submitLoading.set(false)
				})
			)
	}
}
