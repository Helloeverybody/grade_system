import { Component } from '@angular/core';
import {TuiIslandModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-personal-dashboard',
  standalone: true,
	imports: [
		TuiIslandModule,
		TuiButtonModule
	],
  templateUrl: './personal-dashboard.component.html',
  styleUrl: './personal-dashboard.component.scss'
})
export class PersonalDashboardComponent {

}
