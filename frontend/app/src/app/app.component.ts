import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {AuthorizationRequestService} from "./authorization/data/services/authorization-request.service";
import {BehaviorSubject, share, shareReplay, switchAll, switchMap} from "rxjs";
import {USER_INFO} from "./authorization/tokens/user-info.token";
import {USER_INFO_UPDATE} from "./authorization/tokens/user-info-update.token";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    providers: [
		{
			provide: TUI_SANITIZER,
			useClass: NgDompurifySanitizer
		},
		{
			provide: USER_INFO_UPDATE,
			useValue: new BehaviorSubject(void 0)
		},
		{
			provide: USER_INFO,
			useFactory: () => {
				const authRequestService = inject(AuthorizationRequestService);
				const userInfoUpdateSubject = inject(USER_INFO_UPDATE);

				return userInfoUpdateSubject
					.pipe(
						switchMap(() => {
							return authRequestService.userInfo()
						}),
						shareReplay(1)
					)
			}
		}
	]
})
export class AppComponent {

}
