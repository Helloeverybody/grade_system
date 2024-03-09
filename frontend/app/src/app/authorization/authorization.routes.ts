import {Routes} from "@angular/router";
import {AddUserComponent} from "./pages/add-user/add-user.component";

export const routes: Routes = [
  {
    path: 'sign-in',
    component: AddUserComponent
  },
  {
    path: 'sign-up',
    component: AddUserComponent
  }
]
