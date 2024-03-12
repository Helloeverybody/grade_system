import { ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
	TuiDataListWrapperModule,
	TuiInputModule,
	TuiMultiSelectModule,
	TuiStringifyContentPipeModule, TuiTagModule
} from "@taiga-ui/kit";
import { ReactiveFormsModule } from "@angular/forms";
import {TuiButtonModule, TuiErrorModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {CreateUserFormViewModel} from "../../view-models/create-user-form-view.model";
import {take} from "rxjs";
import {CreateUserFormManagerService} from "../../services/create-user-form-manager.service";
import {NgForOf} from "@angular/common";
import {MultistepFormManagerService} from "@libs/multistep-form";

@Component({
	selector: 'add-user-form',
	standalone: true,
	imports: [
		TuiInputModule,
		ReactiveFormsModule,
		TuiButtonModule,
		TuiNotificationModule,
		TuiErrorModule,
		TuiTextfieldControllerModule,
		TuiMultiSelectModule,
		TuiDataListWrapperModule,
		TuiStringifyContentPipeModule,
		TuiTagModule,
		NgForOf,
		NgForOf
	],
	templateUrl: './add-user-form.component.html',
	styleUrl: './add-user-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserFormComponent implements OnInit {
	public formManager: CreateUserFormManagerService = inject(CreateUserFormManagerService);
	public viewModel: CreateUserFormViewModel = new CreateUserFormViewModel();
	private _stepFormManager: MultistepFormManagerService = inject(MultistepFormManagerService)

	public ngOnInit() {
		this.formManager.fillViewModel(this.viewModel)
			.subscribe()
	}

	public sendRegistrationForm() {
		this.formManager.submitForm(this.viewModel)
			.pipe(
				take(1)
			)
			.subscribe({
				next: () => {
					this._stepFormManager.nextStep();
				},
				error: (errorText: string) => {
					this.viewModel.requestError.set(errorText)
				}
			})
	}
}
