import { Routes } from '@angular/router';
import {GridComponent} from "./grid/grid.component";
import {isAuthorizedGuard} from "./authorization/guards/is-authorized.guard";


export const routes: Routes = [
	{
		path: 'grid',
		component: GridComponent
	},
	{
		path: '',
		redirectTo: 'mainpage',
		pathMatch: 'full'
	},
	{
		path: 'mainpage',
		canActivate: [isAuthorizedGuard],
		loadChildren: () => import('./mainpage/mainpage.routes').then(m => m.mainpageRoutes)
	},
	{
		path: 'authorization',
		loadChildren: () => import('./authorization/authorization.routes').then(m => m.authorizationRoutes)
	}
];
