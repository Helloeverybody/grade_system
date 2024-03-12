import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CreateUserFormManagerService} from "../../services/create-user-form-manager.service";
import {ADD_USER_SUCCESS_VM} from "../../tokens/add-user-success-vm";
import {BehaviorSubject} from "rxjs";
import {AddUserFormComponent} from "../add-user-form/add-user-form.component";
import {AddUserSuccessComponent} from "../add-user-success/add-user-success.component";
import {MultistepFormModule} from "@libs/multistep-form";
import {TuiDropdownModule} from "@taiga-ui/core";
import {AuthorizationRequestService} from "../../../../data/services/authorization-request.service";

@Component({
	selector: 'add-user-page',
	standalone: true,
	providers: [
		AuthorizationRequestService,
		CreateUserFormManagerService,
		{
			provide: ADD_USER_SUCCESS_VM,
			useValue: new BehaviorSubject(null)
		}
	],
	templateUrl: './add-user-page.component.html',
	styleUrl: './add-user-page.component.css',
	imports: [
		AddUserFormComponent,
		AddUserSuccessComponent,
		MultistepFormModule,
		TuiDropdownModule
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserPageComponent {

}
