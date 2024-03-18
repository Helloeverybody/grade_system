import {Routes} from "@angular/router";
import {PersonalDashboardComponent} from "./components/personal-dashboard/personal-dashboard.component";

export const personalRoutes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: PersonalDashboardComponent
	},
]
