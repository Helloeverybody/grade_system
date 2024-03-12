import {inject, Injectable} from "@angular/core";
import {SignInViewModel} from "../view-models/sign-in.view-model";
import {AuthorizationRequestService} from "../../../data/services/authorization-request.service";
import {Observable} from "rxjs";

@Injectable()
export class SignInFormManagerService {
	private _authorizationRequestService: AuthorizationRequestService = inject(AuthorizationRequestService);

	public submitForm(viewModel: SignInViewModel): Observable<any> {
		return this._authorizationRequestService.signIn(viewModel.getModel())
			.pipe()
	}
}
