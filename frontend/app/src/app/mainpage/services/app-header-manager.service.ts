import {inject, Injectable} from "@angular/core";
import {APP_HEADER_BUTTONS} from "../tokens/app-header-buttons.token";
import {catchError, map, of} from "rxjs";
import {UserInfoBufferService} from "../../authorization/data/services/user-info-buffer.service";

@Injectable()
export class AppHeaderManagerService {
	public buttonArray = inject(APP_HEADER_BUTTONS);
	public userInfo = inject(UserInfoBufferService);
	public get filteredButtons$() {
		return this.userInfo.value
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
