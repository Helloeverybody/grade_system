import {inject, Injectable} from "@angular/core";
import {APP_HEADER_BUTTONS} from "../tokens/app-header-buttons.token";
import {USER_INFO} from "../../authorization/tokens/user-info.token";
import {catchError, map, of} from "rxjs";
import {AuthorizationRequestService} from "../../authorization/data/services/authorization-request.service";

@Injectable()
export class AppHeaderManagerService {
	public buttonArray = inject(APP_HEADER_BUTTONS);
	public userInfo$ = inject(USER_INFO);
	public get filteredButtons$() {
		return this.userInfo$
			.pipe(
				catchError(() => {
					return of({ roles: [] })
				}),
				map((userInfo) => {
					return this.buttonArray.filter(button =>
							!button.role || userInfo.roles.some(role =>
								role.name === button.role
							)
					)
				})
			);
	}
}
