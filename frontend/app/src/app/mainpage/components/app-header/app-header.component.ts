import {Component, inject} from '@angular/core';
import {APP_HEADER_BUTTONS} from "../../tokens/app-header-buttons.token";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TuiButtonModule} from "@taiga-ui/core";
import {USER_INFO} from "../../../authorization/tokens/user-info.token";
import {catchError, map, of, startWith} from "rxjs";
import {AppHeaderManagerService} from "../../services/app-header-manager.service";

@Component({
  selector: 'app-header',
  standalone: true,
	imports: [
		NgForOf,
		RouterLink,
		RouterLinkActive,
		TuiButtonModule,
		AsyncPipe,
		NgIf

	],
	providers: [
		{
			provide: APP_HEADER_BUTTONS,
			useValue: [
				{
					title: 'Мой прогресс',
					link: 'personal',
				},
				{
					title: 'Подчиненные',
					link: 'employee',
					role: 'admin'
				},
				{
					title: 'Процессы',
					link: 'process',
					role: 'admin'
				},
				{
					title: 'Профиль',
					link: 'profile'
				},
			]
		},
		AppHeaderManagerService
	],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
	private _headerManager: AppHeaderManagerService = inject(AppHeaderManagerService)
	protected activatedRoute = inject(ActivatedRoute);

	public filteredButtons$ = this._headerManager.filteredButtons$;
}
