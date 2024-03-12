import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButtonModule, TuiLoaderModule} from "@taiga-ui/core";
import {TuiIslandModule} from "@taiga-ui/kit";
import {ADD_USER_SUCCESS_VM} from "../../tokens/add-user-success-vm";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
	selector: 'add-user-success',
	standalone: true,
	templateUrl: './add-user-success.component.html',
	styleUrl: './add-user-success.component.css',
	imports: [
		TuiButtonModule,
		TuiIslandModule,
		NgIf,
		AsyncPipe,
		TuiLoaderModule
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserSuccessComponent {
	protected viewModel = inject(ADD_USER_SUCCESS_VM);
}
