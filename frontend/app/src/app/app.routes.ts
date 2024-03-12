import { Routes } from '@angular/router';
import {GridComponent} from "./grid/grid.component";


export const routes: Routes = [
	{
		path: 'grid',
		component: GridComponent
	},
	{
		path: '',
		redirectTo: 'authorization',
		pathMatch: 'full'
	},
	{
		path: 'authorization',
		loadChildren: () => import('./authorization/authorization.routes').then(m => m.routes)
	}
];
