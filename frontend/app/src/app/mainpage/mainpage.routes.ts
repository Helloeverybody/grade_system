import {Routes} from "@angular/router";
import {MainpageComponent} from "./components/mainpage/mainpage.component";

export const mainpageRoutes: Routes = [
	{
		path: '',
		component: MainpageComponent,
		children: [
			{
				path: '',
				redirectTo: 'progress',
				pathMatch: 'full'
			},
			{
				path: 'personal',
				loadChildren: () => import('./children/personal/personal.routes').then(m => m.personalRoutes)
			},
			{
				path: 'employee',
				component: MainpageComponent
			},
			{
				path: 'process',
				component: MainpageComponent
			},
			{
				path: 'profile',
				component: MainpageComponent
			},
		]
	}
];
