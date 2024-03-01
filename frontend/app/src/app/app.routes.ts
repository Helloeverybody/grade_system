import { Routes } from '@angular/router';
import {GridComponent} from "./grid/grid.component";

export const routes: Routes = [
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: '',
    redirectTo: 'grid',
    pathMatch: 'full'
  },
];
