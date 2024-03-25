import { Component } from '@angular/core';
import {TuiIslandModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";
import {GradePersonalRequestService} from "../../data/services/grade-personal-request.service";

@Component({
	selector: 'app-personal-dashboard',
	standalone: true,
	imports: [
		TuiIslandModule,
		TuiButtonModule
	],
	providers: [
		GradePersonalRequestService
	],
	templateUrl: './personal-dashboard.component.html',
	styleUrl: './personal-dashboard.component.scss'
})
export class PersonalDashboardComponent {

}
