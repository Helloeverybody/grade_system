import {Component, inject, OnInit} from '@angular/core';
import {TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiLabelModule, TuiTooltipModule} from "@taiga-ui/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignInFormManagerService} from "../../services/sign-in-form-manager.service";
import {SignInViewModel} from "../../view-models/sign-in.view-model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationRequestService} from "../../../../data/services/authorization-request.service";

@Component({
	selector: 'sign-in',
	standalone: true,
	imports: [
		TuiInputPasswordModule,
		TuiInputModule,
		TuiLabelModule,
		TuiTooltipModule,
		TuiButtonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		SignInFormManagerService,
		AuthorizationRequestService
	],
	templateUrl: './sign-in-page.component.html',
	styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent implements OnInit {
	protected viewModel: SignInViewModel = new SignInViewModel();
	private _pageToRedirect: string = 'main'

	private _formManager: SignInFormManagerService = inject(SignInFormManagerService);
	private _router: Router = inject(Router);
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	public ngOnInit() {
		this._pageToRedirect = this._activatedRoute.snapshot.queryParamMap.get('next');
	}

	public signIn() {
		this._formManager.submitForm(this.viewModel)
			.subscribe({
				next: () => {
					this._router.navigate([this._pageToRedirect.replace(/^\/+/, '')])
				}
			});
	}
}
