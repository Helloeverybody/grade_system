import {Observable, switchMap} from "rxjs";
import {inject} from "@angular/core";
import {UserRequestService} from "./user-request.service";
import {BufferedTokenService} from "@libs/utils";
import {IUserInfoResponseModel} from "../response-models/user-info.response-model";

export class UserInfoBufferService extends BufferedTokenService<void, IUserInfoResponseModel> {
	private _userRequestService = inject(UserRequestService);

	constructor() {
		super(void 0);
	}

	protected action() {
		return (source: Observable<void>) => {
			return source
				.pipe(
					switchMap(() => {
						return this._userRequestService.userInfo();
					})
				)
		};
	}
}
